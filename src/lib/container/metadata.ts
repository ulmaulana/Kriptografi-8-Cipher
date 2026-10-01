// Metadata pemulihan kontainer UTSKRIPT versi 1 (PRD 7.1).
// Metadata tidak pernah memuat kunci, plainteks, atau salinan file asal.

import { Base64Error, decodeBase64 } from "../codecs/base64";
import { countBits, hasBitsBeyond } from "../codecs/bitset";
import { type CipherId, isAlphaCipher, isCipherId } from "../crypto/ciphers";
import { UserFacingError } from "../crypto/errors";
import { HILL_MAX_SIZE } from "../crypto/hill";

export type InputMode = "text" | "file";
export type CodecId = "alpha-text-v1" | "alpha25-v1" | "utf8-v1" | "bytes-v1";
export type PayloadEncoding = "ascii-letters" | "bytes";

export interface PlayfairMetadata {
  /** Representasi penanda: bitset LSB-first yang dikode Base64. */
  markers: "bitset-lsb-v1";
  /** Bitset posisi huruf pengisi sepanjang payload. */
  filler: string;
  fillerCount: number;
  /** Bitset posisi J asli sepanjang teks hasil normalisasi. Tidak ada untuk mode file. */
  j?: string;
  jCount: number;
}

export interface HillMetadata {
  n: number;
  padCount: number;
}

export interface ContainerMetadata {
  algorithm: CipherId;
  inputMode: InputMode;
  codec: CodecId;
  payloadEncoding: PayloadEncoding;
  payloadLength: number;
  /** Ukuran data yang akan dipulihkan: teks hasil normalisasi atau file asli. */
  expectedLength: number;
  checksumAlgorithm: "SHA-256";
  /** Checksum data yang akan dipulihkan, heksadesimal huruf kecil. */
  sha256: string;
  file?: { name: string; type: string };
  /** Nama file sumber ketika isi file dibaca sebagai teks alfabet. */
  sourceFileName?: string;
  playfair?: PlayfairMetadata;
  hill?: HillMetadata;
}

export interface ValidatedMetadata {
  metadata: ContainerMetadata;
  /** Bitset yang sudah didekode untuk Playfair. */
  playfairBits?: { filler: Uint8Array; j: Uint8Array | null };
}

export const MAX_PAYLOAD_LENGTH = 256 * 1024 * 1024;

export class ContainerError extends UserFacingError {
  constructor(message: string) {
    super(message, "package");
    this.name = "ContainerError";
  }
}

export function expectedCodec(algorithm: CipherId, inputMode: InputMode): CodecId {
  if (isAlphaCipher(algorithm)) return inputMode === "file" ? "alpha25-v1" : "alpha-text-v1";
  return inputMode === "file" ? "bytes-v1" : "utf8-v1";
}

/**
 * Nama file dari metadata hanya dipakai sebagai nama unduhan. Komponen path,
 * karakter kontrol, dan karakter terlarang Windows dibuang.
 */
export function sanitizeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "";
  const cleaned = base.replace(/[\u0000-\u001f\u007f<>:"|?*]/g, "_").replace(/^\.+/, "").trim().slice(0, 200);
  return cleaned.length > 0 ? cleaned : "hasil-dekripsi.bin";
}

function fail(message: string): never {
  throw new ContainerError(`Metadata paket tidak valid: ${message}`);
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function decodeBitset(value: unknown, length: number, label: string): Uint8Array {
  if (typeof value !== "string") fail(`${label} harus berupa string Base64.`);
  let bits: Uint8Array;
  try {
    bits = decodeBase64(value);
  } catch (err) {
    fail(`${label} bukan Base64 yang valid (${err instanceof Base64Error ? err.message : "rusak"}).`);
  }
  if (bits.length !== Math.ceil(length / 8)) fail(`panjang ${label} tidak sesuai dengan panjang data.`);
  if (hasBitsBeyond(bits, length)) fail(`${label} memuat bit di luar panjang data.`);
  return bits;
}

export function validateMetadata(raw: unknown, actualPayloadLength: number): ValidatedMetadata {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) fail("bukan objek JSON.");
  const m = raw as Record<string, unknown>;

  if (!isCipherId(m.algorithm)) fail("algoritma tidak dikenal.");
  const algorithm = m.algorithm;
  const alpha = isAlphaCipher(algorithm);
  if (m.inputMode !== "text" && m.inputMode !== "file") fail("mode masukan tidak dikenal.");
  const inputMode = m.inputMode;
  if (m.codec !== expectedCodec(algorithm, inputMode)) fail("codec tidak sesuai dengan algoritma dan mode.");
  const expectedEncoding: PayloadEncoding = alpha ? "ascii-letters" : "bytes";
  if (m.payloadEncoding !== expectedEncoding) fail("encoding payload tidak sesuai algoritma.");
  if (!isNonNegativeInteger(m.payloadLength) || m.payloadLength > MAX_PAYLOAD_LENGTH) fail("panjang payload tidak masuk akal.");
  if (m.payloadLength !== actualPayloadLength) {
    throw new ContainerError(
      `Panjang payload tidak cocok: metadata menyebut ${m.payloadLength} byte, paket berisi ${actualPayloadLength} byte.`,
    );
  }
  if (!isNonNegativeInteger(m.expectedLength)) fail("ukuran hasil tidak masuk akal.");
  if (m.checksumAlgorithm !== "SHA-256") fail("algoritma checksum tidak didukung.");
  if (typeof m.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(m.sha256)) fail("checksum SHA-256 tidak valid.");

  let file: ContainerMetadata["file"];
  if (m.file !== undefined) {
    const f = m.file as Record<string, unknown>;
    if (typeof f !== "object" || f === null || typeof f.name !== "string" || typeof f.type !== "string") {
      fail("informasi file asal rusak.");
    }
    if (f.name.length > 1024 || f.type.length > 255) fail("informasi file asal terlalu panjang.");
    file = { name: sanitizeFileName(f.name), type: f.type };
  }
  let sourceFileName: string | undefined;
  if (m.sourceFileName !== undefined) {
    if (typeof m.sourceFileName !== "string" || m.sourceFileName.length > 1024) fail("nama file sumber rusak.");
    sourceFileName = sanitizeFileName(m.sourceFileName);
  }

  const payloadLength = m.payloadLength;
  let letterCount = payloadLength;
  let playfair: PlayfairMetadata | undefined;
  let hill: HillMetadata | undefined;
  let playfairBits: ValidatedMetadata["playfairBits"];

  if (algorithm === "playfair") {
    const p = m.playfair as Record<string, unknown> | undefined;
    if (typeof p !== "object" || p === null) fail("metadata Playfair tidak ada.");
    if (p.markers !== "bitset-lsb-v1") fail("representasi penanda Playfair tidak didukung.");
    if (payloadLength % 2 !== 0) fail("payload Playfair harus berpanjang genap.");
    if (!isNonNegativeInteger(p.fillerCount) || !isNonNegativeInteger(p.jCount)) fail("jumlah penanda Playfair rusak.");
    const filler = decodeBitset(p.filler, payloadLength, "bitset pengisi");
    if (countBits(filler, payloadLength) !== p.fillerCount) fail("jumlah pengisi tidak cocok dengan bitset.");
    letterCount = payloadLength - p.fillerCount;
    let j: Uint8Array | null = null;
    if (p.j !== undefined) {
      if (inputMode === "file") fail("mode file tidak memakai penanda J.");
      j = decodeBitset(p.j, letterCount, "bitset J");
      if (countBits(j, letterCount) !== p.jCount) fail("jumlah J tidak cocok dengan bitset.");
    } else if (p.jCount !== 0) {
      fail("bitset J tidak ada.");
    }
    playfair = { markers: "bitset-lsb-v1", filler: p.filler as string, fillerCount: p.fillerCount, jCount: p.jCount };
    if (p.j !== undefined) playfair.j = p.j as string;
    playfairBits = { filler, j };
  } else if (m.playfair !== undefined) {
    fail("metadata Playfair hanya untuk algoritma Playfair.");
  }

  if (algorithm === "hill") {
    const h = m.hill as Record<string, unknown> | undefined;
    if (typeof h !== "object" || h === null) fail("metadata Hill tidak ada.");
    if (!isNonNegativeInteger(h.n) || h.n < 2 || h.n > HILL_MAX_SIZE) fail("ukuran blok Hill tidak valid.");
    if (!isNonNegativeInteger(h.padCount) || h.padCount >= h.n) fail("jumlah padding Hill tidak valid.");
    if (payloadLength % h.n !== 0) fail("panjang payload Hill bukan kelipatan ukuran blok.");
    if (h.padCount > payloadLength) fail("padding Hill melebihi panjang payload.");
    letterCount = payloadLength - h.padCount;
    hill = { n: h.n, padCount: h.padCount };
  } else if (m.hill !== undefined) {
    fail("metadata Hill hanya untuk algoritma Hill.");
  }

  if (alpha) {
    const expectedLetters = inputMode === "file" ? m.expectedLength * 2 : m.expectedLength;
    if (letterCount !== expectedLetters) fail("ukuran hasil tidak konsisten dengan panjang payload.");
  } else if (m.expectedLength !== payloadLength) {
    fail("ukuran hasil harus sama dengan panjang payload untuk cipher byte.");
  }

  const metadata: ContainerMetadata = {
    algorithm,
    inputMode,
    codec: m.codec as CodecId,
    payloadEncoding: expectedEncoding,
    payloadLength,
    expectedLength: m.expectedLength,
    checksumAlgorithm: "SHA-256",
    sha256: m.sha256,
  };
  if (file) metadata.file = file;
  if (sourceFileName) metadata.sourceFileName = sourceFileName;
  if (playfair) metadata.playfair = playfair;
  if (hill) metadata.hill = hill;
  return playfairBits ? { metadata, playfairBits } : { metadata };
}
