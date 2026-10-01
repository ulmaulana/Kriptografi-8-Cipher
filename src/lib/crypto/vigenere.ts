// Vigenere standar modulo 26 (PRD 5.2).
// C[i] = mod(P[i] + K[i mod m], 26) dan P[i] = mod(C[i] - K[i mod m], 26).

function assertKey(key: Uint8Array): void {
  if (key.length === 0) throw new Error("Kunci Vigenere tidak boleh kosong.");
}

export function vigenereEncrypt(plain: Uint8Array, key: Uint8Array): Uint8Array {
  assertKey(key);
  const out = new Uint8Array(plain.length);
  const m = key.length;
  for (let i = 0; i < plain.length; i++) out[i] = (plain[i]! + key[i % m]!) % 26;
  return out;
}

export function vigenereDecrypt(cipher: Uint8Array, key: Uint8Array): Uint8Array {
  assertKey(key);
  const out = new Uint8Array(cipher.length);
  const m = key.length;
  for (let i = 0; i < cipher.length; i++) out[i] = (cipher[i]! - key[i % m]! + 26) % 26;
  return out;
}
