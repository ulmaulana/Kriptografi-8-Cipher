/** Modulo yang selalu non-negatif: mod(-1, 26) = 25. */
export function mod(x: number, m: number): number {
  return ((x % m) + m) % m;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

/** Invers modular dengan algoritma Euclid diperluas. Mengembalikan null bila tidak ada. */
export function modInverse(a: number, m: number): number | null {
  let oldR = mod(a, m);
  let r = m;
  let oldS = 1;
  let s = 0;
  while (r !== 0) {
    const q = Math.floor(oldR / r);
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  if (oldR !== 1) return null;
  return mod(oldS, m);
}
