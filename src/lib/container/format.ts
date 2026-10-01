// Kontainer biner .dat (PRD 7.1):
//   1. Penanda format  : 8 byte ASCII "UTSKRIPT"
//   2. Versi format    : 1 byte unsigned, saat ini 1
//   3. Panjang metadata: 4 byte unsigned big endian
//   4. Metadata        : JSON UTF-8
//   5. Payload         : byte cipherteks lengkap

import { encodeUtf8 } from "../codecs/utf8";
import { ContainerError, type ContainerMetadata, validateMetadata, type ValidatedMetadata } from "./metadata";

export const CONTAINER_MAGIC = "UTSKRIPT";
export const CONTAINER_VERSION = 1;
export const HEADER_FIXED_LENGTH = 13;
export const MAX_METADATA_LENGTH = 64 * 1024 * 1024;

const MAGIC_BYTES = encodeUtf8(CONTAINER_MAGIC);

export function serializeContainer(metadata: ContainerMetadata, payload: Uint8Array): Uint8Array {
  const json = encodeUtf8(JSON.stringify(metadata));
  const out = new Uint8Array(HEADER_FIXED_LENGTH + json.length + payload.length);
  out.set(MAGIC_BYTES, 0);
  out[8] = CONTAINER_VERSION;
  new DataView(out.buffer).setUint32(9, json.length, false);
  out.set(json, HEADER_FIXED_LENGTH);
  out.set(payload, HEADER_FIXED_LENGTH + json.length);
  return out;
}

export interface ParsedContainer extends ValidatedMetadata {
  version: number;
  metadataLength: number;
  payload: Uint8Array;
}

export function isContainer(bytes: Uint8Array): boolean {
  if (bytes.length < MAGIC_BYTES.length) return false;
  for (let i = 0; i < MAGIC_BYTES.length; i++) if (bytes[i] !== MAGIC_BYTES[i]) return false;
  return true;
}

const strictUtf8 = new TextDecoder("utf-8", { fatal: true });

export function parseContainer(bytes: Uint8Array): ParsedContainer {
  if (bytes.length < MAGIC_BYTES.length) {
    throw new ContainerError(`Header paket terpotong: hanya ${bytes.length} byte.`);
  }
  if (!isContainer(bytes)) {
    throw new ContainerError("Data bukan paket UTSKRIPT (penanda format tidak ditemukan).");
  }
  if (bytes.length < HEADER_FIXED_LENGTH) {
    throw new ContainerError(`Header paket terpotong: hanya ${bytes.length} byte, minimal ${HEADER_FIXED_LENGTH} byte.`);
  }
  const version = bytes[8]!;
  if (version !== CONTAINER_VERSION) {
    throw new ContainerError(`Versi paket ${version} tidak didukung. Versi yang didukung: ${CONTAINER_VERSION}.`);
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const metadataLength = view.getUint32(9, false);
  if (metadataLength > MAX_METADATA_LENGTH) {
    throw new ContainerError(`Panjang metadata ${metadataLength} byte melebihi batas.`);
  }
  if (HEADER_FIXED_LENGTH + metadataLength > bytes.length) {
    throw new ContainerError(
      `Paket terpotong: metadata menyatakan ${metadataLength} byte tetapi data hanya ${bytes.length - HEADER_FIXED_LENGTH} byte.`,
    );
  }
  let raw: unknown;
  try {
    const json = strictUtf8.decode(bytes.subarray(HEADER_FIXED_LENGTH, HEADER_FIXED_LENGTH + metadataLength));
    raw = JSON.parse(json);
  } catch {
    throw new ContainerError("Metadata paket rusak: bukan JSON UTF-8 yang valid.");
  }
  const payload = bytes.subarray(HEADER_FIXED_LENGTH + metadataLength);
  const validated = validateMetadata(raw, payload.length);
  return { ...validated, version, metadataLength, payload };
}
