// Bitset ringkas "bitset-lsb-v1": bit ke-i disimpan pada byte floor(i / 8),
// posisi bit (i mod 8) dihitung dari bit paling tidak signifikan.

export function createBitset(length: number): Uint8Array {
  return new Uint8Array(Math.ceil(length / 8));
}

export function setBit(bits: Uint8Array, index: number): void {
  bits[index >> 3]! |= 1 << (index & 7);
}

export function getBit(bits: Uint8Array, index: number): boolean {
  return ((bits[index >> 3] ?? 0) & (1 << (index & 7))) !== 0;
}

export function countBits(bits: Uint8Array, length: number): number {
  let count = 0;
  for (let i = 0; i < length; i++) if (getBit(bits, i)) count++;
  return count;
}

/** Memastikan bit di luar panjang logis bernilai nol. */
export function hasBitsBeyond(bits: Uint8Array, length: number): boolean {
  for (let i = length; i < bits.length * 8; i++) if (getBit(bits, i)) return true;
  return false;
}
