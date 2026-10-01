// Transposisi kolom tanpa padding (PRD 5.8).
// Data ditulis per baris dengan lebar m = panjang kata kunci, kolom dibaca dari
// atas ke bawah menurut urutan huruf kunci A-Z. Huruf kunci yang sama
// diurutkan stabil dari kiri ke kanan. Sebanyak L mod m kolom paling kiri
// memiliki satu byte tambahan.

export function columnOrder(key: Uint8Array): number[] {
  if (key.length === 0) throw new Error("Kata kunci transposisi tidak boleh kosong.");
  const idx = Array.from(key, (_, i) => i);
  // Array.prototype.sort stabil sejak ES2019, ditambah pembanding indeks agar eksplisit.
  idx.sort((a, b) => key[a]! - key[b]! || a - b);
  return idx;
}

function columnLength(length: number, m: number, col: number): number {
  return Math.floor(length / m) + (col < length % m ? 1 : 0);
}

export function columnarEncrypt(data: Uint8Array, key: Uint8Array): Uint8Array {
  const m = key.length;
  const order = columnOrder(key);
  const out = new Uint8Array(data.length);
  let o = 0;
  for (const col of order) {
    for (let pos = col; pos < data.length; pos += m) out[o++] = data[pos]!;
  }
  return out;
}

export function columnarDecrypt(data: Uint8Array, key: Uint8Array): Uint8Array {
  const m = key.length;
  const order = columnOrder(key);
  const out = new Uint8Array(data.length);
  let o = 0;
  for (const col of order) {
    const len = columnLength(data.length, m, col);
    for (let row = 0; row < len; row++) out[row * m + col] = data[o++]!;
  }
  return out;
}
