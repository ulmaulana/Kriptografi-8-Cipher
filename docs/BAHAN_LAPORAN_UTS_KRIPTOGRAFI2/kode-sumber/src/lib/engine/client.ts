// Operasi cipher memanggil API Ruby. Worker hanya membantu encoding Base64.

import {
  runCall,
  type WorkerCall,
  type WorkerErrorInfo,
  type WorkerRequest,
  type WorkerResponse,
  type WorkerResults,
} from "@/workers/protocol";

export class WorkerCallError extends Error {
  readonly info: WorkerErrorInfo;

  constructor(info: WorkerErrorInfo) {
    super(info.message);
    this.name = "WorkerCallError";
    this.info = info;
  }
}

let worker: Worker | null = null;
let nextId = 1;
const pending = new Map<number, { resolve: (value: unknown) => void; reject: (err: Error) => void }>();

function getWorker(): Worker | null {
  if (typeof Worker === "undefined") return null;
  if (!worker) {
    worker = new Worker(new URL("../../workers/crypto.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const entry = pending.get(event.data.id);
      if (!entry) return;
      pending.delete(event.data.id);
      if (event.data.ok) entry.resolve(event.data.result);
      else entry.reject(new WorkerCallError(event.data.error));
    };
    worker.onerror = (event) => {
      for (const entry of pending.values()) entry.reject(new WorkerCallError({ message: event.message || "Worker gagal." }));
      pending.clear();
      worker?.terminate();
      worker = null;
    };
  }
  return worker;
}

export async function callCrypto<Op extends WorkerCall["op"]>(
  call: Extract<WorkerCall, { op: Op }>,
): Promise<WorkerResults[Op]> {
  const w = call.op === "base64" ? getWorker() : null;
  if (!w) {
    try {
      return (await runCall(call)) as WorkerResults[Op];
    } catch (err) {
      const e = err as { message?: string; field?: string; errors?: Record<string, string> };
      throw new WorkerCallError({ message: e.message ?? String(err), field: e.field, fieldErrors: e.errors });
    }
  }
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve: resolve as (value: unknown) => void, reject });
    const request: WorkerRequest = { ...call, id };
    w.postMessage(request);
  });
}
