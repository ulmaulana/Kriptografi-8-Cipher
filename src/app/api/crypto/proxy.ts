// Route Next.js hanya meneruskan HTTP. Body multipart serta respons besar
// diteruskan sebagai stream agar tidak diduplikasi atau didekode di proxy.
export const MAX_PROXY_BODY_BYTES = 351 * 1024 * 1024;

function timeoutMs(): number {
  const value = Number(process.env.RUBY_API_TIMEOUT_MS ?? 180_000);
  return Number.isSafeInteger(value) && value > 0 && value <= 600_000 ? value : 180_000;
}

function failure(message: string, status: number, field?: string): Response {
  return Response.json({ message, ...(field ? { field } : {}) }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function proxyCrypto(request: Request, operation: "encrypt" | "decrypt" | "inspect"): Promise<Response> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("application/json") && !contentType.startsWith("multipart/form-data")) {
    return failure("Gunakan JSON untuk teks atau multipart untuk file.", 415);
  }
  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > MAX_PROXY_BODY_BYTES) return failure("Permintaan melebihi batas ukuran transport paket.", 413, "file");

  const controller = new AbortController();
  let timedOut = false;
  let tooLarge = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs());
  const cancel = () => controller.abort();
  request.signal.addEventListener("abort", cancel, { once: true });
  const cleanup = () => {
    clearTimeout(timer);
    request.signal.removeEventListener("abort", cancel);
  };

  try {
    let received = 0;
    const body = request.body?.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, stream) {
        received += chunk.byteLength;
        if (received > MAX_PROXY_BODY_BYTES) {
          tooLarge = true;
          controller.abort();
          throw new Error("Batas ukuran transport terlampaui.");
        }
        stream.enqueue(chunk);
      },
    }));
    const base = (process.env.RUBY_API_URL ?? "http://127.0.0.1:4567").replace(/\/$/, "");
    const init: RequestInit & { duplex: "half" } = {
      method: "POST",
      headers: { "Content-Type": contentType, Accept: "application/json" },
      body,
      duplex: "half",
      cache: "no-store",
      signal: controller.signal,
      redirect: "error",
    };
    const upstream = await fetch(`${base}/api/crypto/${operation}`, init);
    const headers = new Headers({
      "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      "Cache-Control": "no-store",
    });
    if (!upstream.body) {
      cleanup();
      return new Response(null, { status: upstream.status, headers });
    }
    const reader = upstream.body.getReader();
    const responseBody = new ReadableStream<Uint8Array>({
      async pull(stream) {
        try {
          const chunk = await reader.read();
          if (chunk.done) {
            cleanup();
            stream.close();
          } else stream.enqueue(chunk.value);
        } catch (error) {
          cleanup();
          stream.error(error);
        }
      },
      async cancel(reason) {
        controller.abort();
        cleanup();
        await reader.cancel(reason);
      },
    });
    return new Response(responseBody, { status: upstream.status, headers });
  } catch {
    cleanup();
    if (tooLarge) return failure("Permintaan melebihi batas ukuran transport paket.", 413, "file");
    if (timedOut) return failure("Pemrosesan layanan Ruby melewati batas waktu. Coba lagi dengan data lebih kecil.", 504);
    return failure("Layanan Ruby tidak dapat dihubungi. Jalankan backend Ruby dengan pnpm dev, lalu coba lagi.", 503);
  }
}
