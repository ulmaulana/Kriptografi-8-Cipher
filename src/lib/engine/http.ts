// Klien transport mesin Ruby. Browser memakai proxy Next.js; pengujian Node
// menghubungi layanan yang sama secara langsung, tanpa mesin cipher cadangan.
import { decodeBase64, encodeBase64 } from "../codecs/base64";
import type { DecryptRequest, DecryptResult, EncryptRequest, EncryptResult, PackageSummary } from "./types";
import type { KeyErrors } from "../validation/keys";

export const MAX_FILE_BYTES = 50 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 190_000;

export class RubyApiError extends Error {
  readonly field?: string;
  readonly errors?: KeyErrors;

  constructor(message: string, field?: string, fieldErrors?: KeyErrors) {
    super(message);
    this.name = "RubyApiError";
    this.field = field;
    this.errors = fieldErrors;
  }
}

function browserTransport(): boolean {
  return typeof globalThis.location !== "undefined";
}

function endpoint(operation: string): string {
  if (browserTransport()) return `/api/crypto/${operation}`;
  const base = process.env.RUBY_API_URL ?? "http://127.0.0.1:4567";
  return `${base.replace(/\/$/, "")}/api/crypto/${operation}`;
}

function multipart(metadata: object, bytes: Uint8Array, name: string, type = "application/octet-stream"): FormData {
  const data = new FormData();
  data.set("metadata", JSON.stringify(metadata));
  data.set("file", new Blob([new Uint8Array(bytes)], { type }), name);
  return data;
}

async function post<T>(operation: string, body: object | FormData): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const isMultipart = body instanceof FormData;
    const response = await fetch(endpoint(operation), {
      method: "POST",
      headers: isMultipart ? { Accept: "application/json" } : { "Content-Type": "application/json", Accept: "application/json" },
      body: isMultipart ? body : JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });
    const data: unknown = await response.json().catch(() => {
      throw new RubyApiError("Layanan Ruby mengembalikan respons yang tidak valid. Periksa layanan backend lalu coba lagi.");
    });
    if (!response.ok) {
      const error = data as { message?: unknown; field?: string; fieldErrors?: KeyErrors };
      throw new RubyApiError(
        typeof error?.message === "string" ? error.message : `Layanan Ruby gagal (HTTP ${response.status}).`,
        error?.field,
        error?.fieldErrors,
      );
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new RubyApiError("Layanan Ruby mengembalikan respons yang tidak valid.");
    }
    return data as T;
  } catch (error) {
    if (error instanceof RubyApiError) throw error;
    if (controller.signal.aborted) {
      throw new RubyApiError("Pemrosesan layanan Ruby melewati batas waktu. Coba lagi dengan data lebih kecil.");
    }
    throw new RubyApiError("Layanan Ruby tidak dapat dihubungi. Jalankan backend Ruby dan frontend dengan pnpm dev, lalu coba lagi.");
  } finally {
    clearTimeout(timeout);
  }
}

type EncryptResponse = Omit<EncryptResult, "plainBytes" | "payload" | "container"> & {
  plainBase64: string;
  payloadBase64: string;
  containerBase64: string;
};

type DecryptResponse = Omit<DecryptResult, "bytes" | "payload"> & { bytesBase64: string; payloadBase64: string };

function responseBytes(value: string): Uint8Array {
  try {
    if (typeof value !== "string") throw new Error("Field Base64 tidak ada.");
    return decodeBase64(value);
  } catch {
    throw new RubyApiError("Layanan Ruby mengembalikan data biner Base64 yang tidak valid.");
  }
}

export async function encryptViaRuby(request: EncryptRequest): Promise<EncryptResult> {
  let body: object | FormData = request;
  if (request.input.kind === "file") {
    const { bytes, ...input } = request.input;
    if (bytes.length > MAX_FILE_BYTES) {
      throw new RubyApiError(`Ukuran file ${bytes.length} byte melebihi batas implementasi ${MAX_FILE_BYTES} byte (50 MB).`, "file");
    }
    body = multipart({ ...request, input }, bytes, input.name, input.type);
  }
  const { plainBase64, payloadBase64, containerBase64, ...result } = await post<EncryptResponse>("encrypt", body);
  return { ...result, plainBytes: responseBytes(plainBase64), payload: responseBytes(payloadBase64), container: responseBytes(containerBase64) };
}

export async function decryptViaRuby(request: DecryptRequest): Promise<DecryptResult> {
  let body: object | FormData = request;
  if (request.kind === "package") {
    const { container, ...metadata } = request;
    body = browserTransport()
      ? multipart(metadata, container, "ciphertext.dat")
      : { ...metadata, containerBase64: encodeBase64(container) };
  }
  const { bytesBase64, payloadBase64, ...result } = await post<DecryptResponse>("decrypt", body);
  return { ...result, bytes: responseBytes(bytesBase64), payload: responseBytes(payloadBase64) };
}

export async function inspectViaRuby(container: Uint8Array): Promise<PackageSummary> {
  const body = browserTransport()
    ? multipart({}, container, "ciphertext.dat")
    : { containerBase64: encodeBase64(container) };
  return post<PackageSummary>("inspect", body);
}
