// Auto-Key Vigenere varian plaintext autokey (PRD 5.3).
// Aliran kunci S = primer K diikuti plainteks: S[i] = K[i] untuk i < m,
// S[i] = P[i - m] untuk i >= m.

function assertPrimer(primer: Uint8Array): void {
  if (primer.length === 0) throw new Error("Primer Auto-Key tidak boleh kosong.");
}

export function autokeyEncrypt(plain: Uint8Array, primer: Uint8Array): Uint8Array {
  assertPrimer(primer);
  const m = primer.length;
  const out = new Uint8Array(plain.length);
  for (let i = 0; i < plain.length; i++) {
    const s = i < m ? primer[i]! : plain[i - m]!;
    out[i] = (plain[i]! + s) % 26;
  }
  return out;
}

/**
 * Dekripsi membangun lanjutan aliran kunci dari plainteks yang baru saja
 * dipulihkan, bukan dari cipherteks dan bukan dengan mengulang primer.
 */
export function autokeyDecrypt(cipher: Uint8Array, primer: Uint8Array): Uint8Array {
  assertPrimer(primer);
  const m = primer.length;
  const plain = new Uint8Array(cipher.length);
  for (let i = 0; i < cipher.length; i++) {
    const s = i < m ? primer[i]! : plain[i - m]!;
    plain[i] = (cipher[i]! - s + 26) % 26;
  }
  return plain;
}
