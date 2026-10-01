export function downloadBytes(bytes: Uint8Array, fileName: string, type = "application/octet-stream"): void {
  const blob = new Blob([bytes as Uint8Array<ArrayBuffer>], { type: type || "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

/** Memisahkan nama dan ekstensi: "foto.final.png" menjadi ["foto.final", ".png"]. */
export function splitFileName(name: string): [string, string] {
  const dot = name.lastIndexOf(".");
  if (dot <= 0) return [name, ""];
  return [name.slice(0, dot), name.slice(dot)];
}

const id = (value: number, digits = 0) => value.toLocaleString("id-ID", { maximumFractionDigits: digits });

/** Ukuran dengan format angka Indonesia, misalnya "15,7 KB (16.044 byte)". */
export function formatBytes(size: number): string {
  if (size < 1024) return `${id(size)} byte`;
  if (size < 1024 * 1024) return `${id(size / 1024, 1)} KB (${id(size)} byte)`;
  return `${id(size / 1024 / 1024, 2)} MB (${id(size)} byte)`;
}
