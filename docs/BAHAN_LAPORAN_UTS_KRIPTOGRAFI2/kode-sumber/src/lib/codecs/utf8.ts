const encoder = new TextEncoder();
const strictDecoder = new TextDecoder("utf-8", { fatal: true });

export function encodeUtf8(text: string): Uint8Array {
  return encoder.encode(text);
}

/** Dekode UTF-8 yang valid saja. Mengembalikan null bila byte bukan UTF-8 yang sah. */
export function decodeUtf8Strict(bytes: Uint8Array): string | null {
  try {
    return strictDecoder.decode(bytes);
  } catch {
    return null;
  }
}
