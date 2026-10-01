import type { ContainerMetadata, InputMode } from "../container/metadata";
import type { CipherId } from "../crypto/ciphers";
import type { KeyFormValues } from "../validation/keys";

export type EncryptInput =
  | { kind: "text"; text: string }
  | {
      kind: "file";
      bytes: Uint8Array;
      name: string;
      type: string;
      /** "bytes" = file utuh. "alpha-text" = isi dibaca sebagai teks alfabet (hanya cipher alfabet). */
      readAs: "bytes" | "alpha-text";
    };

export interface EncryptRequest {
  cipher: CipherId;
  key: KeyFormValues;
  input: EncryptInput;
}

export interface EncryptResult {
  cipher: CipherId;
  inputMode: InputMode;
  /** Byte isi pesan sebelum cipher: huruf hasil normalisasi (ASCII), UTF-8, atau file asli. */
  plainBytes: Uint8Array;
  /** Payload cipherteks. Untuk cipher alfabet berisi huruf A-Z dalam ASCII. */
  payload: Uint8Array;
  /** Kontainer .dat lengkap. */
  container: Uint8Array;
  metadata: ContainerMetadata;
  keyNotes: string[];
  details: string[];
}

export type DecryptRequest =
  | { kind: "package"; container: Uint8Array; key: KeyFormValues }
  | { kind: "raw-letters"; cipher: CipherId; text: string; key: KeyFormValues }
  | { kind: "payload-base64"; cipher: CipherId; base64: string; key: KeyFormValues };

export type Representation = "letters" | "utf8" | "binary";

export interface DecryptResult {
  cipher: CipherId;
  source: DecryptRequest["kind"];
  inputMode: InputMode | "raw";
  /** Cara menampilkan hasil. */
  representation: Representation;
  /** Byte hasil dekripsi: huruf ASCII, teks UTF-8, atau file. */
  bytes: Uint8Array;
  /** Payload cipherteks yang diproses. */
  payload: Uint8Array;
  /** true bila ukuran dan SHA-256 cocok dengan metadata paket. Selalu false untuk jalur mentah. */
  verified: boolean;
  sha256: string;
  expectedSha256: string | null;
  fileName: string | null;
  fileType: string | null;
  keyNotes: string[];
  details: string[];
}

export interface PackageSummary {
  algorithm: CipherId;
  inputMode: InputMode;
  codec: string;
  payloadLength: number;
  expectedLength: number;
  fileName: string | null;
  fileType: string | null;
  sourceFileName: string | null;
}
