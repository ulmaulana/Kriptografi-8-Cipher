// Affine modulo 26 (PRD 5.6).
// C = mod(a * P + b, 26) dan P = mod(aInverse * (C - b), 26), syarat gcd(a, 26) = 1.

import { mod, modInverse } from "./modular";

export interface AffineKey {
  /** Nilai a setelah direduksi modulo 26. */
  a: number;
  /** Nilai b setelah direduksi modulo 26. */
  b: number;
}

export const VALID_AFFINE_A = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25] as const;

export function reduceAffineKey(a: number, b: number): AffineKey {
  return { a: mod(a, 26), b: mod(b, 26) };
}

function inverseOrThrow(a: number): number {
  const inv = modInverse(a, 26);
  if (inv === null) throw new Error(`a = ${a} tidak mempunyai invers modulo 26.`);
  return inv;
}

export function affineEncrypt(plain: Uint8Array, key: AffineKey): Uint8Array {
  inverseOrThrow(key.a);
  const out = new Uint8Array(plain.length);
  for (let i = 0; i < plain.length; i++) out[i] = mod(key.a * plain[i]! + key.b, 26);
  return out;
}

export function affineDecrypt(cipher: Uint8Array, key: AffineKey): Uint8Array {
  const inv = inverseOrThrow(key.a);
  const out = new Uint8Array(cipher.length);
  for (let i = 0; i < cipher.length; i++) out[i] = mod(inv * (cipher[i]! - key.b), 26);
  return out;
}
