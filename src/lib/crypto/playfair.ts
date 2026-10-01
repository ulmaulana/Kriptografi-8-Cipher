// Playfair klasik 5 x 5 dengan penggabungan J ke I (PRD 3.3 dan 5.5).
// Semua huruf direpresentasikan sebagai indeks A=0 sampai Z=25.

import { createBitset, getBit, setBit } from "../codecs/bitset";

export const PLAYFAIR_MATRIX_ALPHABET = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
const I = 8;
const J = 9;
const Q = 16;
const X = 23;

export interface PlayfairMatrix {
  /** 25 indeks huruf, disusun per baris. */
  cells: Uint8Array;
  /** Posisi (0-24) setiap huruf, -1 untuk J. */
  position: Int8Array;
}

export function buildPlayfairMatrix(keyword: Uint8Array): PlayfairMatrix {
  const cells = new Uint8Array(25);
  const position = new Int8Array(26).fill(-1);
  let n = 0;
  const push = (letter: number) => {
    const l = letter === J ? I : letter;
    if (position[l] !== -1) return;
    position[l] = n;
    cells[n++] = l;
  };
  for (const letter of keyword) push(letter);
  for (let i = 0; i < PLAYFAIR_MATRIX_ALPHABET.length; i++) push(PLAYFAIR_MATRIX_ALPHABET.charCodeAt(i) - 65);
  return { cells, position };
}

export function matrixRows(matrix: PlayfairMatrix): string[] {
  const rows: string[] = [];
  for (let r = 0; r < 5; r++) {
    rows.push(Array.from(matrix.cells.subarray(r * 5, r * 5 + 5), (c) => String.fromCharCode(c + 65)).join(" "));
  }
  return rows;
}

export interface PlayfairPrepared {
  /** Teks siap dipasangkan: J sudah digabung ke I dan huruf pengisi sudah disisipkan. */
  prepared: Uint8Array;
  /** Bitset sepanjang prepared.length, bit bernilai 1 menandai huruf pengisi. */
  fillerBits: Uint8Array;
  fillerCount: number;
  /** Bitset sepanjang teks masukan, bit bernilai 1 menandai huruf J asli. */
  jBits: Uint8Array;
  jCount: number;
}

/**
 * Langkah 3 sampai 5 PRD 5.5: catat posisi J, gabungkan J ke I, lalu bentuk
 * pasangan. Pasangan huruf sama disisipi X (atau Q bila hurufnya X). Huruf
 * terakhir tanpa pasangan juga diberi pengisi dengan aturan yang sama.
 */
export function preparePlayfair(letters: Uint8Array): PlayfairPrepared {
  const jBits = createBitset(letters.length);
  let jCount = 0;
  const merged = new Uint8Array(letters.length);
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === J) {
      setBit(jBits, i);
      jCount++;
      merged[i] = I;
    } else {
      merged[i] = letters[i]!;
    }
  }

  // Panjang maksimum terjadi bila setiap huruf membutuhkan pengisi.
  const prepared = new Uint8Array(merged.length * 2);
  const fillerFlags = new Uint8Array(merged.length * 2);
  let n = 0;
  let i = 0;
  while (i < merged.length) {
    const a = merged[i]!;
    const b = i + 1 < merged.length ? merged[i + 1]! : -1;
    if (b === -1 || a === b) {
      prepared[n] = a;
      prepared[n + 1] = a === X ? Q : X;
      fillerFlags[n + 1] = 1;
      n += 2;
      i += 1;
    } else {
      prepared[n] = a;
      prepared[n + 1] = b;
      n += 2;
      i += 2;
    }
  }
  const fillerBits = createBitset(n);
  let fillerCount = 0;
  for (let k = 0; k < n; k++) {
    if (fillerFlags[k]) {
      setBit(fillerBits, k);
      fillerCount++;
    }
  }
  return { prepared: prepared.slice(0, n), fillerBits, fillerCount, jBits, jCount };
}

function transformPairs(text: Uint8Array, matrix: PlayfairMatrix, shift: 1 | 4): Uint8Array {
  if (text.length % 2 !== 0) throw new Error("Panjang teks Playfair harus genap.");
  const { cells, position } = matrix;
  const out = new Uint8Array(text.length);
  for (let k = 0; k < text.length; k += 2) {
    const pa = position[text[k]!]!;
    const pb = position[text[k + 1]!]!;
    if (pa < 0 || pb < 0) throw new Error("Huruf J tidak ada pada matriks Playfair.");
    if (pa === pb) throw new Error("Pasangan Playfair berisi huruf yang sama.");
    const ra = Math.floor(pa / 5);
    const ca = pa % 5;
    const rb = Math.floor(pb / 5);
    const cb = pb % 5;
    if (ra === rb) {
      out[k] = cells[ra * 5 + ((ca + shift) % 5)]!;
      out[k + 1] = cells[rb * 5 + ((cb + shift) % 5)]!;
    } else if (ca === cb) {
      out[k] = cells[((ra + shift) % 5) * 5 + ca]!;
      out[k + 1] = cells[((rb + shift) % 5) * 5 + cb]!;
    } else {
      out[k] = cells[ra * 5 + cb]!;
      out[k + 1] = cells[rb * 5 + ca]!;
    }
  }
  return out;
}

/** Enkripsi teks yang sudah disiapkan: geser kanan, geser bawah, atau tukar kolom. */
export function playfairEncryptPrepared(prepared: Uint8Array, matrix: PlayfairMatrix): Uint8Array {
  return transformPairs(prepared, matrix, 1);
}

/**
 * Dekripsi mentah: geser kiri, geser atas, atau tukar kolom. Hasil masih berisi
 * huruf pengisi dan I hasil penggabungan karena tidak ada metadata pemulihan.
 */
export function playfairDecryptRaw(cipher: Uint8Array, matrix: PlayfairMatrix): Uint8Array {
  return transformPairs(cipher, matrix, 4);
}

export function playfairEncrypt(letters: Uint8Array, keyword: Uint8Array): PlayfairPrepared & { cipher: Uint8Array } {
  const matrix = buildPlayfairMatrix(keyword);
  const prep = preparePlayfair(letters);
  return { ...prep, cipher: playfairEncryptPrepared(prep.prepared, matrix) };
}

/**
 * Pemulihan paket: hapus hanya posisi yang tercatat sebagai pengisi, lalu
 * kembalikan J pada posisi yang tercatat. X atau Q asli tidak disentuh.
 */
export function playfairRestore(
  prepared: Uint8Array,
  fillerBits: Uint8Array,
  jBits: Uint8Array | null,
): Uint8Array {
  const out = new Uint8Array(prepared.length);
  let n = 0;
  for (let k = 0; k < prepared.length; k++) {
    if (!getBit(fillerBits, k)) out[n++] = prepared[k]!;
  }
  const letters = out.slice(0, n);
  if (jBits) {
    for (let i = 0; i < letters.length; i++) {
      if (getBit(jBits, i)) {
        if (letters[i] !== I) {
          throw new Error("Metadata posisi J tidak cocok dengan hasil dekripsi. Periksa kunci.");
        }
        letters[i] = J;
      }
    }
  }
  return letters;
}
