// Paket dan payload ini dibekukan sebelum implementasi Ruby, memakai mesin
// TypeScript lama. Expected output tidak dihitung dengan mesin yang diuji.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { CipherId } from "@/lib/crypto/ciphers";
import { decryptMessage } from "@/lib/engine/decrypt";
import { encryptMessage } from "@/lib/engine/encrypt";
import type { KeyFormValues } from "@/lib/validation/keys";

interface LegacyCase {
  cipher: CipherId;
  mode: "text" | "file";
  key: KeyFormValues;
  input: { text?: string; bytesBase64?: string; name?: string; type?: string };
  packageBase64: string;
  payloadBase64: string;
  plainBase64: string;
  sha256: string;
}

const baseline = JSON.parse(readFileSync("tests/migration/legacy-typescript-v1.json", "utf8")) as { cases: LegacyCase[] };
const bytes = (base64: string) => new Uint8Array(Buffer.from(base64, "base64"));

describe("TC-24 Ruby compatible with original seven-cipher packages", () => {
  for (const legacy of baseline.cases) {
    it(`${legacy.cipher} ${legacy.mode}: old package recovers original bytes and name`, async () => {
      const result = await decryptMessage({ kind: "package", container: bytes(legacy.packageBase64), key: legacy.key });
      expect(Buffer.from(result.bytes).toString("base64")).toBe(legacy.plainBase64);
      expect(result.sha256).toBe(legacy.sha256);
      expect(result.verified).toBe(true);
      if (legacy.mode === "file") expect(result.fileName).toBe(legacy.input.name);
    });

    it(`${legacy.cipher} ${legacy.mode}: new encryption retains original payload`, async () => {
      const input = legacy.mode === "text"
        ? { kind: "text" as const, text: legacy.input.text! }
        : { kind: "file" as const, bytes: bytes(legacy.input.bytesBase64!), name: legacy.input.name!, type: legacy.input.type!, readAs: "bytes" as const };
      const result = await encryptMessage({ cipher: legacy.cipher, key: legacy.key, input });
      expect(Buffer.from(result.payload).toString("base64")).toBe(legacy.payloadBase64);
      expect(Buffer.from(result.plainBytes).toString("base64")).toBe(legacy.plainBase64);
      expect(result.metadata.sha256).toBe(legacy.sha256);
    });
  }
});
