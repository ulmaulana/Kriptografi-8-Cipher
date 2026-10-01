// Dispatch cipher untuk data indeks huruf (cipher alfabet) dan byte (cipher byte).

import { autokeyDecrypt, autokeyEncrypt } from "../crypto/autokey";
import { affineDecrypt, affineEncrypt } from "../crypto/affine";
import { extendedVigenereDecrypt, extendedVigenereEncrypt } from "../crypto/extended-vigenere";
import { hillApply, hillEncrypt } from "../crypto/hill";
import {
  buildPlayfairMatrix,
  matrixRows,
  type PlayfairPrepared,
  playfairDecryptRaw,
  playfairEncryptPrepared,
  playfairRestore,
  preparePlayfair,
} from "../crypto/playfair";
import { superDecrypt, superEncrypt } from "../crypto/super-encryption";
import { UserFacingError } from "../crypto/errors";
import { vigenereDecrypt, vigenereEncrypt } from "../crypto/vigenere";
import type { ParsedKey } from "../validation/keys";

export interface AlphaEncryptOutput {
  cipher: Uint8Array;
  playfair?: PlayfairPrepared;
  hill?: { n: number; padCount: number };
  details: string[];
}

export function encryptLetters(key: ParsedKey, letters: Uint8Array): AlphaEncryptOutput {
  switch (key.cipher) {
    case "vigenere":
      return { cipher: vigenereEncrypt(letters, key.keyword), details: [] };
    case "autokey":
      return { cipher: autokeyEncrypt(letters, key.primer), details: [] };
    case "affine":
      return { cipher: affineEncrypt(letters, key.key), details: [] };
    case "playfair": {
      const matrix = buildPlayfairMatrix(key.keyword);
      const prep = preparePlayfair(letters);
      return {
        cipher: playfairEncryptPrepared(prep.prepared, matrix),
        playfair: prep,
        details: [
          `Matriks Playfair: ${matrixRows(matrix).join(" / ")}`,
          `Huruf pengisi disisipkan: ${prep.fillerCount}. Huruf J digabung ke I: ${prep.jCount}.`,
        ],
      };
    }
    case "hill": {
      const { cipher, padCount } = hillEncrypt(letters, key.matrix);
      return {
        cipher,
        hill: { n: key.matrix.length, padCount },
        details: [`Padding X ditambahkan: ${padCount} huruf (blok ${key.matrix.length} huruf).`],
      };
    }
    default:
      throw new Error(`Cipher ${key.cipher} bukan cipher alfabet.`);
  }
}

/** Dekripsi tanpa metadata pemulihan. Playfair mempertahankan pengisi, Hill mempertahankan padding. */
export function decryptLettersRaw(key: ParsedKey, cipher: Uint8Array): Uint8Array {
  switch (key.cipher) {
    case "vigenere":
      return vigenereDecrypt(cipher, key.keyword);
    case "autokey":
      return autokeyDecrypt(cipher, key.primer);
    case "affine":
      return affineDecrypt(cipher, key.key);
    case "playfair": {
      if (cipher.length % 2 !== 0) {
        throw new UserFacingError(`Cipherteks Playfair harus berpanjang genap (saat ini ${cipher.length} huruf).`, "cipherInput");
      }
      if (cipher.includes(9)) {
        throw new UserFacingError("Cipherteks Playfair tidak boleh memuat J karena J tidak ada pada matriks 5 x 5.", "cipherInput");
      }
      for (let k = 0; k < cipher.length; k += 2) {
        if (cipher[k] === cipher[k + 1]) {
          throw new UserFacingError(`Pasangan ke-${k / 2 + 1} berisi huruf sama sehingga bukan cipherteks Playfair yang valid.`, "cipherInput");
        }
      }
      return playfairDecryptRaw(cipher, buildPlayfairMatrix(key.keyword));
    }
    case "hill": {
      const n = key.matrix.length;
      if (cipher.length % n !== 0) {
        throw new UserFacingError(`Panjang cipherteks Hill (${cipher.length}) bukan kelipatan ${n}.`, "cipherInput");
      }
      return hillApply(cipher, key.inverse);
    }
    default:
      throw new Error(`Cipher ${key.cipher} bukan cipher alfabet.`);
  }
}

export interface LetterRecoveryInfo {
  playfairBits?: { filler: Uint8Array; j: Uint8Array | null };
  hillPadCount?: number;
}

/** Dekripsi paket: pengisi Playfair dan padding Hill dibuang tepat sesuai metadata. */
export function decryptLettersPackage(key: ParsedKey, cipher: Uint8Array, info: LetterRecoveryInfo): Uint8Array {
  const raw = decryptLettersRaw(key, cipher);
  if (key.cipher === "playfair") {
    if (!info.playfairBits) throw new Error("Metadata Playfair tidak tersedia.");
    try {
      return playfairRestore(raw, info.playfairBits.filler, info.playfairBits.j);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      throw new UserFacingError(
        `Dekripsi gagal: posisi huruf J dari paket tidak cocok dengan hasil. Kemungkinan kunci salah atau data paket rusak. (Detail: ${detail})`,
        "key",
      );
    }
  }
  if (key.cipher === "hill") {
    const pad = info.hillPadCount ?? 0;
    return raw.slice(0, raw.length - pad);
  }
  return raw;
}

export function encryptBytes(key: ParsedKey, bytes: Uint8Array): Uint8Array {
  if (key.cipher === "extended-vigenere") return extendedVigenereEncrypt(bytes, key.key);
  if (key.cipher === "super") return superEncrypt(bytes, key.key, key.columnKey);
  throw new Error(`Cipher ${key.cipher} bukan cipher byte.`);
}

export function decryptBytes(key: ParsedKey, bytes: Uint8Array): Uint8Array {
  if (key.cipher === "extended-vigenere") return extendedVigenereDecrypt(bytes, key.key);
  if (key.cipher === "super") return superDecrypt(bytes, key.key, key.columnKey);
  throw new Error(`Cipher ${key.cipher} bukan cipher byte.`);
}
