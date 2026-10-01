// Extended Vigenere modulo 256 pada byte (PRD 5.4).
// C[i] = mod(P[i] + K[i mod m], 256) dan P[i] = mod(C[i] - K[i mod m], 256).

function assertKey(key: Uint8Array): void {
  if (key.length === 0) throw new Error("Kunci Extended Vigenere harus berisi minimal satu byte.");
}

export function extendedVigenereEncrypt(plain: Uint8Array, key: Uint8Array): Uint8Array {
  assertKey(key);
  const out = new Uint8Array(plain.length);
  const m = key.length;
  for (let i = 0; i < plain.length; i++) out[i] = (plain[i]! + key[i % m]!) & 255;
  return out;
}

export function extendedVigenereDecrypt(cipher: Uint8Array, key: Uint8Array): Uint8Array {
  assertKey(key);
  const out = new Uint8Array(cipher.length);
  const m = key.length;
  for (let i = 0; i < cipher.length; i++) out[i] = (cipher[i]! - key[i % m]! + 256) & 255;
  return out;
}
