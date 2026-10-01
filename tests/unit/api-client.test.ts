import { afterEach, describe, expect, it, vi } from "vitest";
import { callCrypto, WorkerCallError } from "@/lib/engine/client";
import { encryptMessage } from "@/lib/engine/encrypt";
import { decryptMessage, inspectPackage } from "@/lib/engine/decrypt";
import { MAX_PROXY_BODY_BYTES, proxyCrypto } from "@/app/api/crypto/proxy";
import { EMPTY_KEY_VALUES } from "@/lib/validation/keys";

const key = { ...EMPTY_KEY_VALUES, keyword: "LEMON" };
const metadata = {
  algorithm: "vigenere", inputMode: "text", codec: "alphabet26-v1", payloadEncoding: "ascii-letters",
  payloadLength: 3, expectedLength: 3, checksumAlgorithm: "SHA-256", sha256: "0".repeat(64),
};
const encrypted = {
  cipher: "vigenere", inputMode: "text", plainBase64: "QUJD", payloadBase64: "TEZH", containerBase64: "AP8B",
  metadata, keyNotes: [], details: [],
};
const decrypted = {
  cipher: "vigenere", source: "package", inputMode: "text", representation: "letters", bytesBase64: "QUJD",
  payloadBase64: "TEZH", verified: true, sha256: "0".repeat(64), expectedSha256: "0".repeat(64),
  fileName: null, fileType: null, keyNotes: [], details: [],
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

describe("transport Ruby pada aplikasi", () => {
  it("enkripsi Node menghubungi backend Ruby dan mendekode semua field biner", async () => {
    vi.stubEnv("RUBY_API_URL", "http://127.0.0.1:4789/");
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json(encrypted));
    const request = { cipher: "vigenere" as const, input: { kind: "text" as const, text: "Abc!" }, key };
    const result = await encryptMessage(request);
    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:4789/api/crypto/encrypt", expect.objectContaining({
      method: "POST", body: JSON.stringify(request), cache: "no-store",
    }));
    expect(Array.from(result.plainBytes)).toEqual([65, 66, 67]);
    expect(Array.from(result.payload)).toEqual([76, 70, 71]);
    expect(Array.from(result.container)).toEqual([0, 255, 1]);
  });

  it("file browser dikirim multipart dengan byte nol dan header utuh", async () => {
    vi.stubGlobal("location", { origin: "http://localhost:3000" });
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json(encrypted));
    const bytes = Uint8Array.from([0, 255, 137, 80, 78, 71]);
    await callCrypto({ op: "encrypt", request: {
      cipher: "vigenere", key, input: { kind: "file", bytes, name: "gambar.png", type: "image/png", readAs: "bytes" },
    } });
    expect(fetch.mock.calls[0]?.[0]).toBe("/api/crypto/encrypt");
    const init = fetch.mock.calls[0]?.[1];
    expect(new Headers(init?.headers).has("Content-Type")).toBe(false);
    const form = init?.body as FormData;
    const file = form.get("file") as File;
    expect(file.name).toBe("gambar.png");
    expect(Array.from(new Uint8Array(await file.arrayBuffer()))).toEqual(Array.from(bytes));
    expect(JSON.parse(form.get("metadata") as string)).toEqual({
      cipher: "vigenere", key, input: { kind: "file", name: "gambar.png", type: "image/png", readAs: "bytes" },
    });
  });

  it("file Node memakai kontrak multipart layanan Ruby yang sama", async () => {
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json(encrypted));
    await encryptMessage({ cipher: "vigenere", key, input: {
      kind: "file", bytes: Uint8Array.from([0, 255, 1]), name: "a.bin", type: "", readAs: "bytes",
    } });
    const form = fetch.mock.calls[0]?.[1]?.body as FormData;
    const file = form.get("file") as File;
    expect(Array.from(new Uint8Array(await file.arrayBuffer()))).toEqual([0, 255, 1]);
    expect(JSON.parse(form.get("metadata") as string).input).toEqual({ kind: "file", name: "a.bin", type: "", readAs: "bytes" });
  });

  it("dekripsi dan inspeksi browser mengirim file ke Ruby", async () => {
    vi.stubGlobal("location", { origin: "http://localhost:3000" });
    const summary = { algorithm: "vigenere", inputMode: "text", codec: "alphabet26-v1", payloadLength: 3, expectedLength: 3,
      fileName: null, fileType: null, sourceFileName: null };
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(Response.json(decrypted)).mockResolvedValueOnce(Response.json(summary));
    const container = Uint8Array.from([0, 255, 1]);
    const result = await decryptMessage({ kind: "package", container, key });
    expect(Array.from(result.bytes)).toEqual([65, 66, 67]);
    expect(fetch.mock.calls[0]?.[0]).toBe("/api/crypto/decrypt");
    expect((fetch.mock.calls[0]?.[1]?.body as FormData).get("file")).toBeInstanceOf(Blob);
    expect(await inspectPackage(container)).toEqual(summary);
    expect(fetch.mock.calls[1]?.[0]).toBe("/api/crypto/inspect");
  });

  it("galat Ruby mempertahankan field formulir; tidak menghasilkan cipher lokal", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({
      message: "Ring harus 1 sampai 26.", field: "ringSettings", fieldErrors: { ringSettings: "Ring tidak valid." },
    }, { status: 422 }));
    const failed = callCrypto({ op: "encrypt", request: { cipher: "vigenere", key, input: { kind: "text", text: "ABC" } } });
    await expect(failed).rejects.toBeInstanceOf(WorkerCallError);
    await expect(failed).rejects.toMatchObject({ info: {
      message: "Ring harus 1 sampai 26.", field: "ringSettings", fieldErrors: { ringSettings: "Ring tidak valid." },
    } });
  });

  it("backend mati menghasilkan pesan yang jelas tanpa jalur cipher alternatif", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("fetch failed"));
    await expect(encryptMessage({ cipher: "vigenere", key, input: { kind: "text", text: "ABC" } })).rejects.toThrow(/Ruby tidak dapat dihubungi/);
  });

  it("respons Base64 rusak ditolak", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ ...encrypted, containerBase64: "rusak!" }));
    await expect(encryptMessage({ cipher: "vigenere", key, input: { kind: "text", text: "ABC" } })).rejects.toThrow(/Base64 yang tidak valid/);
  });
});

describe("proxy Next.js menuju Ruby", () => {
  it("multipart diteruskan persis dan galat validasi Ruby tetap utuh", async () => {
    const form = new FormData();
    form.set("metadata", JSON.stringify({ cipher: "vigenere", key }));
    form.set("file", new Blob([Uint8Array.from([0, 255, 10])]), "a.bin");
    const request = new Request("http://localhost/api/crypto/encrypt", { method: "POST", body: form });
    const original = new Uint8Array(await request.clone().arrayBuffer());
    const error = { message: "Kunci wajib diisi.", field: "keyword", fieldErrors: { keyword: "Wajib." } };
    const fetch = vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
      const forwarded = new Uint8Array(await new Response(init?.body as ReadableStream).arrayBuffer());
      expect(forwarded).toEqual(original);
      expect(new Headers(init?.headers).get("Content-Type")).toBe(request.headers.get("Content-Type"));
      return Response.json(error, { status: 422 });
    });
    const response = await proxyCrypto(request, "encrypt");
    expect(response.status).toBe(422);
    expect(await response.json()).toEqual(error);
    expect(fetch.mock.calls[0]?.[0]).toBe("http://127.0.0.1:4567/api/crypto/encrypt");
  });

  it("backend Ruby mati dikembalikan sebagai HTTP 503", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("connect ECONNREFUSED"));
    const response = await proxyCrypto(new Request("http://localhost/api/crypto/inspect", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: "{}",
    }), "inspect");
    expect(response.status).toBe(503);
    expect((await response.json()).message).toMatch(/Ruby tidak dapat dihubungi/);
  });

  it("timeout backend dikembalikan sebagai HTTP 504", async () => {
    vi.stubEnv("RUBY_API_TIMEOUT_MS", "10");
    vi.spyOn(globalThis, "fetch").mockImplementation((_url, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(new DOMException("Timeout", "AbortError")), { once: true });
    }));
    const response = await proxyCrypto(new Request("http://localhost/api/crypto/encrypt", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: "{}",
    }), "encrypt");
    expect(response.status).toBe(504);
    expect((await response.json()).message).toMatch(/batas waktu/);
  });

  it("ukuran transport terlalu besar ditolak sebelum menghubungi Ruby", async () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    const response = await proxyCrypto(new Request("http://localhost/api/crypto/decrypt", {
      method: "POST", headers: { "Content-Type": "application/json", "Content-Length": String(MAX_PROXY_BODY_BYTES + 1) }, body: "{}",
    }), "decrypt");
    expect(response.status).toBe(413);
    expect(fetch).not.toHaveBeenCalled();
  });
});
