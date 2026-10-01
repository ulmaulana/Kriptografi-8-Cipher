// Hill modulo 26 dengan vektor kolom (PRD 5.7).
// Enkripsi C = K * P mod 26, dekripsi P = KInverse * C mod 26.
//
// Invers dihitung tepat dalam aritmetika modular: eliminasi Gauss-Jordan pada
// medan modulo 2 dan modulo 13, lalu setiap elemen digabung dengan CRT.
// Pendekatan ini menangani matriks invertibel seperti [[2,1],[13,7]] yang
// tidak memiliki pivot awal yang invertibel modulo 26.

import { mod, modInverse } from "./modular";

export type Matrix = number[][];

export const HILL_MAX_SIZE = 10;
const X = 23;

export function reduceMatrix(matrix: Matrix): Matrix {
  return matrix.map((row) => row.map((v) => mod(v, 26)));
}

interface FieldResult {
  det: number;
  inverse: Matrix | null;
}

/** Determinan dan invers pada medan prima p dengan eliminasi Gauss-Jordan. */
function solveOverPrime(matrix: Matrix, p: number): FieldResult {
  const n = matrix.length;
  const a = matrix.map((row) => row.map((v) => mod(v, p)));
  const inv: Matrix = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (r === c ? 1 : 0)));
  let det = 1;
  for (let col = 0; col < n; col++) {
    let pivot = -1;
    for (let r = col; r < n; r++) {
      if (a[r]![col] !== 0) {
        pivot = r;
        break;
      }
    }
    if (pivot === -1) return { det: 0, inverse: null };
    if (pivot !== col) {
      [a[pivot], a[col]] = [a[col]!, a[pivot]!];
      [inv[pivot], inv[col]] = [inv[col]!, inv[pivot]!];
      det = mod(-det, p);
    }
    const pv = a[col]![col]!;
    det = mod(det * pv, p);
    const pvInv = modInverse(pv, p)!;
    for (let c = 0; c < n; c++) {
      a[col]![c] = mod(a[col]![c]! * pvInv, p);
      inv[col]![c] = mod(inv[col]![c]! * pvInv, p);
    }
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = a[r]![col]!;
      if (factor === 0) continue;
      for (let c = 0; c < n; c++) {
        a[r]![c] = mod(a[r]![c]! - factor * a[col]![c]!, p);
        inv[r]![c] = mod(inv[r]![c]! - factor * inv[col]![c]!, p);
      }
    }
  }
  return { det, inverse: inv };
}

/** Gabungan CRT: x = r2 (mod 2) dan x = r13 (mod 13) menjadi x mod 26. */
function crt26(r2: number, r13: number): number {
  return mod(r13 + 13 * mod(r2 - r13, 2), 26);
}

export function hillDeterminantMod26(matrix: Matrix): number {
  const d2 = solveOverPrime(matrix, 2).det;
  const d13 = solveOverPrime(matrix, 13).det;
  return crt26(d2, d13);
}

export function hillInverseMod26(matrix: Matrix): Matrix | null {
  const m2 = solveOverPrime(matrix, 2);
  const m13 = solveOverPrime(matrix, 13);
  if (!m2.inverse || !m13.inverse) return null;
  const n = matrix.length;
  const inv: Matrix = [];
  for (let r = 0; r < n; r++) {
    const row: number[] = [];
    for (let c = 0; c < n; c++) row.push(crt26(m2.inverse[r]![c]!, m13.inverse[r]![c]!));
    inv.push(row);
  }
  return inv;
}

export function multiplyMatrixMod26(a: Matrix, b: Matrix): Matrix {
  const n = a.length;
  return Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => {
      let sum = 0;
      for (let k = 0; k < n; k++) sum += a[r]![k]! * b[k]![c]!;
      return mod(sum, 26);
    }),
  );
}

/** Mengalikan setiap blok n huruf (vektor kolom) dengan matriks. Panjang harus kelipatan n. */
export function hillApply(text: Uint8Array, matrix: Matrix): Uint8Array {
  const n = matrix.length;
  if (text.length % n !== 0) throw new Error(`Panjang teks Hill harus kelipatan ${n}.`);
  const flat = new Int32Array(n * n);
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) flat[r * n + c] = mod(matrix[r]![c]!, 26);
  const out = new Uint8Array(text.length);
  for (let base = 0; base < text.length; base += n) {
    for (let r = 0; r < n; r++) {
      let sum = 0;
      for (let c = 0; c < n; c++) sum += flat[r * n + c]! * text[base + c]!;
      out[base + r] = sum % 26;
    }
  }
  return out;
}

/** Menambahkan X hanya bila panjang bukan kelipatan n. */
export function hillPad(letters: Uint8Array, n: number): { padded: Uint8Array; padCount: number } {
  const padCount = (n - (letters.length % n)) % n;
  if (padCount === 0) return { padded: letters, padCount };
  const padded = new Uint8Array(letters.length + padCount);
  padded.set(letters);
  padded.fill(X, letters.length);
  return { padded, padCount };
}

export function hillEncrypt(letters: Uint8Array, matrix: Matrix): { cipher: Uint8Array; padCount: number } {
  if (!hillInverseMod26(matrix)) throw new Error("Matriks Hill tidak invertibel modulo 26.");
  const { padded, padCount } = hillPad(letters, matrix.length);
  return { cipher: hillApply(padded, matrix), padCount };
}

/** Dekripsi mentah: pengisi X tetap ada karena panjang asli tidak diketahui. */
export function hillDecryptRaw(cipher: Uint8Array, matrix: Matrix): Uint8Array {
  const inverse = hillInverseMod26(matrix);
  if (!inverse) throw new Error("Matriks Hill tidak invertibel modulo 26.");
  return hillApply(cipher, inverse);
}
