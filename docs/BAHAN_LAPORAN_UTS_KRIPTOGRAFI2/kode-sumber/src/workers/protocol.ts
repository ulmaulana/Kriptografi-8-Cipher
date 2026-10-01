import { encodeBase64 } from "@/lib/codecs/base64";
import { decryptMessage, inspectPackage } from "@/lib/engine/decrypt";
import { encryptMessage } from "@/lib/engine/encrypt";
import type { DecryptRequest, DecryptResult, EncryptRequest, EncryptResult, PackageSummary } from "@/lib/engine/types";
import type { KeyErrors } from "@/lib/validation/keys";

/** Cipher dan inspeksi memakai HTTP Ruby; hanya encoding Base64 dilakukan lokal. */
export async function runCall(call: WorkerCall): Promise<unknown> {
  switch (call.op) {
    case "encrypt":
      return encryptMessage(call.request);
    case "decrypt":
      return decryptMessage(call.request);
    case "inspect":
      return inspectPackage(call.container);
    case "base64":
      return encodeBase64(call.bytes);
  }
}

export type WorkerCall =
  | { op: "encrypt"; request: EncryptRequest }
  | { op: "decrypt"; request: DecryptRequest }
  | { op: "inspect"; container: Uint8Array }
  | { op: "base64"; bytes: Uint8Array };

export interface WorkerResults {
  encrypt: EncryptResult;
  decrypt: DecryptResult;
  inspect: PackageSummary;
  base64: string;
}

export type WorkerRequest = WorkerCall & { id: number };

export interface WorkerErrorInfo {
  message: string;
  field?: string;
  fieldErrors?: KeyErrors;
}

export type WorkerResponse = { id: number; ok: true; result: unknown } | { id: number; ok: false; error: WorkerErrorInfo };
