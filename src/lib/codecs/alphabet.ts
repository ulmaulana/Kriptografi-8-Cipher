export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const CODE_A = 65;
const CODE_Z = 90;
const CODE_LOWER_A = 97;
const CODE_LOWER_Z = 122;

/**
 * Normalisasi teks alfabet: hanya huruf ASCII A-Z dan a-z yang dipertahankan,
 * lalu huruf kecil diubah menjadi kapital. Penyaringan dilakukan sebelum
 * pengubahan kapitalisasi sehingga karakter Unicode (misalnya "ß" atau "ı")
 * tidak berubah menjadi huruf ASCII baru.
 */
export function normalizeAlphabetic(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= CODE_A && code <= CODE_Z) out += text[i];
    else if (code >= CODE_LOWER_A && code <= CODE_LOWER_Z) out += String.fromCharCode(code - 32);
  }
  return out;
}

/** Sama dengan normalizeAlphabetic tetapi bekerja pada byte (ASCII) dan menghasilkan indeks 0-25. */
export function normalizeAlphabeticBytes(bytes: Uint8Array): Uint8Array {
  const out = new Uint8Array(bytes.length);
  let n = 0;
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i]!;
    if (b >= CODE_A && b <= CODE_Z) out[n++] = b - CODE_A;
    else if (b >= CODE_LOWER_A && b <= CODE_LOWER_Z) out[n++] = b - CODE_LOWER_A;
  }
  return out.slice(0, n);
}

/** Mengubah string A-Z kapital menjadi indeks 0-25. Karakter lain menimbulkan galat. */
export function lettersToIndices(letters: string): Uint8Array {
  const out = new Uint8Array(letters.length);
  for (let i = 0; i < letters.length; i++) {
    const code = letters.charCodeAt(i);
    if (code < CODE_A || code > CODE_Z) {
      throw new Error(`Karakter bukan huruf kapital A-Z pada posisi ${i}.`);
    }
    out[i] = code - CODE_A;
  }
  return out;
}

/** Indeks 0-25 menjadi byte ASCII huruf kapital. */
export function indicesToAscii(indices: Uint8Array): Uint8Array {
  const out = new Uint8Array(indices.length);
  for (let i = 0; i < indices.length; i++) out[i] = indices[i]! + CODE_A;
  return out;
}

/** Byte ASCII yang seluruhnya huruf kapital A-Z menjadi indeks 0-25. Mengembalikan null bila ada byte lain. */
export function strictAsciiToIndices(bytes: Uint8Array): Uint8Array | null {
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i]!;
    if (b < CODE_A || b > CODE_Z) return null;
    out[i] = b - CODE_A;
  }
  return out;
}

const asciiDecoder = new TextDecoder();

export function indicesToLetters(indices: Uint8Array): string {
  return asciiDecoder.decode(indicesToAscii(indices));
}
