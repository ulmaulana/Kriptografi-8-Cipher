// SHA-256 dipakai untuk memeriksa kesamaan data hasil dekripsi dengan data
// asal. Ini bukan MAC dan bukan bukti autentikasi.

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes as Uint8Array<ArrayBuffer>);
  const view = new Uint8Array(digest);
  let hex = "";
  for (const b of view) hex += b.toString(16).padStart(2, "0");
  return hex;
}
