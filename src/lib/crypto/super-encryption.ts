// Super Enkripsi (PRD 5.8): Extended Vigenere pada byte, kemudian transposisi
// kolom pada byte hasilnya. Dekripsi membalik dengan urutan terbalik.

import { extendedVigenereDecrypt, extendedVigenereEncrypt } from "./extended-vigenere";
import { columnarDecrypt, columnarEncrypt } from "./transposition";

export interface SuperEncryptionStages {
  /** Keluaran tahap Extended Vigenere. */
  vigenere: Uint8Array;
  /** Keluaran akhir setelah transposisi kolom. */
  cipher: Uint8Array;
}

export function superEncryptStages(plain: Uint8Array, byteKey: Uint8Array, columnKey: Uint8Array): SuperEncryptionStages {
  const vigenere = extendedVigenereEncrypt(plain, byteKey);
  return { vigenere, cipher: columnarEncrypt(vigenere, columnKey) };
}

export function superEncrypt(plain: Uint8Array, byteKey: Uint8Array, columnKey: Uint8Array): Uint8Array {
  return superEncryptStages(plain, byteKey, columnKey).cipher;
}

export function superDecrypt(cipher: Uint8Array, byteKey: Uint8Array, columnKey: Uint8Array): Uint8Array {
  const untransposed = columnarDecrypt(cipher, columnKey);
  return extendedVigenereDecrypt(untransposed, byteKey);
}
