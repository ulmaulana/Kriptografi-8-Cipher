// Web Worker untuk encoding Base64 di luar thread UI. Bila menerima operasi
// cipher, protocol tetap menghubungi Ruby melalui HTTP.

import { runCall, type WorkerRequest, type WorkerResponse } from "./protocol";

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
  postMessage: (message: WorkerResponse, transfer: Transferable[]) => void;
};

function collectBuffers(value: unknown, out: Set<ArrayBuffer>): void {
  if (value instanceof Uint8Array) {
    if (value.buffer instanceof ArrayBuffer) out.add(value.buffer);
    return;
  }
  if (value && typeof value === "object") {
    for (const v of Object.values(value)) collectBuffers(v, out);
  }
}

scope.onmessage = async (event) => {
  const { id, ...call } = event.data;
  try {
    const result = await runCall(call);
    const buffers = new Set<ArrayBuffer>();
    collectBuffers(result, buffers);
    scope.postMessage({ id, ok: true, result }, [...buffers]);
  } catch (err) {
    const error = err as { message?: string; field?: string; errors?: Record<string, string> };
    scope.postMessage(
      {
        id,
        ok: false,
        error: {
          message: error.message ?? String(err),
          field: error.field,
          fieldErrors: error.errors,
        },
      },
      [],
    );
  }
};
