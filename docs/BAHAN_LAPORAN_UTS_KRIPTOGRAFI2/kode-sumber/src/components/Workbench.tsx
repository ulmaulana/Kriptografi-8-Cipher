"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { normalizeAlphabetic } from "@/lib/codecs/alphabet";
import { decodeBase64 } from "@/lib/codecs/base64";
import { encodeUtf8 } from "@/lib/codecs/utf8";
import { CIPHERS, type CipherId, isAlphaCipher } from "@/lib/crypto/ciphers";
import { callCrypto, WorkerCallError } from "@/lib/engine/client";
import { MAX_FILE_BYTES } from "@/lib/engine/encrypt";
import type { DecryptRequest, DecryptResult, EncryptResult, PackageSummary } from "@/lib/engine/types";
import { EMPTY_KEY_VALUES, type KeyErrors, type KeyField, type KeyFormValues, keyFieldsFor, parseKey } from "@/lib/validation/keys";
import { CipherPicker } from "./CipherPicker";
import { formatBytes, splitFileName } from "./download";
import { IconFile, IconLock, IconPanel, IconPlay, IconText, IconUnlock } from "./Icons";
import { KeyFields } from "./KeyFields";
import { DecryptResultView, EncryptResultView } from "./ResultViews";

type Operation = "encrypt" | "decrypt";
type EncryptSource = "text" | "file";
type DecryptSource = "package-file" | "package-base64" | "raw-letters" | "payload-base64";
type PackageSource = "package-file" | "package-base64";

interface LoadedPackage {
  bytes: Uint8Array;
  label: string;
  summary: PackageSummary;
}

type RunState =
  | { status: "idle" }
  | { status: "running"; operation: Operation }
  | { status: "encrypted"; result: EncryptResult; version: number; initialKey: KeyFormValues }
  | { status: "decrypted"; result: DecryptResult; version: number; seq: number }
  | { status: "error"; message: string; version: number };

type FieldErrors = KeyErrors & { message?: string; file?: string; package?: string; cipherInput?: string; key?: string };

const PREVIEW_LIMIT = 600;

function short(text: string): string {
  return text.length > PREVIEW_LIMIT ? `${text.slice(0, PREVIEW_LIMIT)}…` : text;
}

export function Workbench() {
  const [operation, setOperation] = useState<Operation>("encrypt");
  const [cipher, setCipher] = useState<CipherId>("vigenere");
  const [keyValues, setKeyValues] = useState<KeyFormValues>(EMPTY_KEY_VALUES);

  const [encSource, setEncSource] = useState<EncryptSource>("text");
  const [message, setMessage] = useState("");
  const [encFile, setEncFile] = useState<File | null>(null);
  const [fileReadAs, setFileReadAs] = useState<"bytes" | "alpha-text">("bytes");

  const [decSource, setDecSource] = useState<DecryptSource>("package-file");
  // Paket disimpan per sumber agar format masukan yang dipilih hanya memakai paketnya sendiri.
  const [packages, setPackages] = useState<Partial<Record<PackageSource, LoadedPackage>>>({});
  const [packageLoading, setPackageLoading] = useState<Partial<Record<PackageSource, boolean>>>({});
  const packageLoadIds = useRef<Record<PackageSource, number>>({ "package-file": 0, "package-base64": 0 });
  const [packageText, setPackageText] = useState("");
  const [cipherInput, setCipherInput] = useState("");

  // Hasil dan versi masukan disimpan per operasi. Berpindah antara Enkripsi dan
  // Dekripsi tidak mengubah masukan sehingga tidak menandai hasil sebagai hasil lama.
  const [runs, setRuns] = useState<Record<Operation, RunState>>({ encrypt: { status: "idle" }, decrypt: { status: "idle" } });
  const [versions, setVersions] = useState<Record<Operation, number>>({ encrypt: 0, decrypt: 0 });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [completed, setCompleted] = useState(0);
  const seq = useRef(0);
  const resultRef = useRef<HTMLElement>(null);

  const alpha = isAlphaCipher(cipher);
  const usesPackage = operation === "decrypt" && (decSource === "package-file" || decSource === "package-base64");
  const pkg = usesPackage ? (packages[decSource as PackageSource] ?? null) : null;
  const inspecting = usesPackage && Boolean(packageLoading[decSource as PackageSource]);
  const activeCipher: CipherId = pkg ? pkg.summary.algorithm : cipher;
  const run = runs[operation];
  const running = runs.encrypt.status === "running" || runs.decrypt.status === "running";
  const stale =
    (run.status === "encrypted" || run.status === "decrypted" || run.status === "error") && run.version !== versions[operation];

  // Pada layar sempit panel hasil berada di bawah formulir. Setelah proses berhasil,
  // gulir ke hasil bila panel tersebut tidak terlihat.
  useEffect(() => {
    if (completed === 0 || !resultRef.current) return;
    const rect = resultRef.current.getBoundingClientRect();
    if (rect.top > window.innerHeight - 80 || rect.bottom < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [completed]);

  function setRunFor(op: Operation, state: RunState) {
    setRuns((prev) => ({ ...prev, [op]: state }));
  }

  /** Menandai masukan berubah untuk operasi tertentu atau keduanya (kunci dan cipher). */
  function touched(scope: Operation | "both", ...fields: string[]) {
    setVersions((v) =>
      scope === "both" ? { encrypt: v.encrypt + 1, decrypt: v.decrypt + 1 } : { ...v, [scope]: v[scope] + 1 },
    );
    if (fields.some((f) => f in errors)) {
      setErrors((prev) => {
        const next = { ...prev } as Record<string, string | undefined>;
        for (const f of fields) delete next[f];
        delete next.key;
        return next as FieldErrors;
      });
    }
  }

  function changeKey(field: KeyField, value: KeyFormValues[KeyField]) {
    setKeyValues((prev) => ({ ...prev, [field]: value }));
    touched("both", field);
  }

  function changeCipher(id: CipherId) {
    setCipher(id);
    if (!isAlphaCipher(id)) {
      if (decSource === "raw-letters") setDecSource("payload-base64");
      setFileReadAs("bytes");
    }
    touched("both", "cipherInput");
  }

  function setPackage(source: PackageSource, value: LoadedPackage | null) {
    setPackages((prev) => {
      const next = { ...prev };
      if (value) next[source] = value;
      else delete next[source];
      return next;
    });
  }

  function beginPackageLoad(source: PackageSource): number {
    const id = ++packageLoadIds.current[source];
    setPackage(source, null);
    setPackageLoading((prev) => ({ ...prev, [source]: true }));
    touched("decrypt", "package");
    return id;
  }

  async function loadPackage(bytes: Uint8Array, label: string, source: PackageSource, loadId = beginPackageLoad(source)) {
    try {
      const summary = await callCrypto({ op: "inspect", container: bytes.slice() });
      if (loadId !== packageLoadIds.current[source]) return;
      setPackage(source, { bytes, label, summary });
      setCipher(summary.algorithm);
    } catch (err) {
      if (loadId !== packageLoadIds.current[source]) return;
      setPackage(source, null);
      setErrors((prev) => ({ ...prev, package: err instanceof Error ? err.message : String(err) }));
    } finally {
      if (loadId === packageLoadIds.current[source]) setPackageLoading((prev) => ({ ...prev, [source]: false }));
    }
  }

  async function onPackageFile(file: File | undefined) {
    if (!file) return;
    const loadId = beginPackageLoad("package-file");
    try {
      if (file.size > 320 * 1024 * 1024 + 13) throw new Error("Ukuran paket melebihi batas 320 MB.");
      await loadPackage(new Uint8Array(await file.arrayBuffer()), file.name, "package-file", loadId);
    } catch (err) {
      if (loadId !== packageLoadIds.current["package-file"]) return;
      setPackageLoading((prev) => ({ ...prev, "package-file": false }));
      setErrors((prev) => ({ ...prev, package: err instanceof Error ? err.message : String(err) }));
    }
  }

  async function onPackageText(text: string) {
    setPackageText(text);
    const loadId = beginPackageLoad("package-base64");
    if (text.trim().length === 0) {
      setPackageLoading((prev) => ({ ...prev, "package-base64": false }));
      return;
    }
    let bytes: Uint8Array;
    try {
      bytes = decodeBase64(text);
    } catch (err) {
      setPackage("package-base64", null);
      setPackageLoading((prev) => ({ ...prev, "package-base64": false }));
      setErrors((prev) => ({ ...prev, package: `Paket Base64 tidak valid: ${(err as Error).message}` }));
      return;
    }
    await loadPackage(bytes, "Paket Base64 yang ditempel", "package-base64", loadId);
  }

  function sendToDecrypt(result: EncryptResult, initialKey: KeyFormValues) {
    if (JSON.stringify(keyValues) !== JSON.stringify(initialKey)) {
      setKeyValues(structuredClone(initialKey));
      touched("both", ...keyFieldsFor(result.cipher));
    }
    setOperation("decrypt");
    setDecSource("package-file");
    void loadPackage(result.container, "Hasil enkripsi terakhir", "package-file");
  }

  function validateKey(target: CipherId): boolean {
    const parsed = parseKey(target, keyValues);
    if (!parsed.ok) {
      setErrors((prev) => ({ ...prev, ...parsed.errors }));
      return false;
    }
    return true;
  }

  async function process() {
    if (running || inspecting) return;
    const op = operation;
    const runVersion = versions[op];
    setErrors({});

    if (operation === "encrypt") {
      const keyOk = validateKey(cipher);
      let inputError: FieldErrors = {};
      if (encSource === "text" && message.length === 0) inputError = { message: "Pesan wajib diisi." };
      else if (encSource === "text" && alpha && normalizeAlphabetic(message).length === 0) {
        inputError = { message: "Pesan tidak menyisakan huruf A-Z setelah normalisasi." };
      } else if (encSource === "file" && !encFile) inputError = { file: "Pilih file terlebih dahulu." };
      else if (encSource === "file" && encFile && encFile.size > MAX_FILE_BYTES) {
        inputError = { file: `Ukuran file melebihi batas ${formatBytes(MAX_FILE_BYTES)}.` };
      }
      if (Object.keys(inputError).length > 0) setErrors((prev) => ({ ...prev, ...inputError }));
      if (!keyOk || Object.keys(inputError).length > 0) return;

      setRunFor(op, { status: "running", operation: op });
      try {
        const input =
          encSource === "text"
            ? ({ kind: "text", text: message } as const)
            : ({
                kind: "file",
                bytes: new Uint8Array(await encFile!.arrayBuffer()),
                name: encFile!.name,
                type: encFile!.type,
                readAs: alpha ? fileReadAs : "bytes",
              } as const);
        const result = await callCrypto({ op: "encrypt", request: { cipher, key: keyValues, input } });
        setRunFor(op, { status: "encrypted", result, version: runVersion, initialKey: structuredClone(keyValues) });
        setCompleted((c) => c + 1);
      } catch (err) {
        fail(err, runVersion, op);
      }
      return;
    }

    let request: DecryptRequest;
    if (usesPackage) {
      if (!pkg) {
        setErrors({ package: decSource === "package-file" ? "Unggah paket .dat terlebih dahulu." : "Tempel paket Base64 terlebih dahulu." });
        return;
      }
      if (!validateKey(pkg.summary.algorithm)) return;
      request = { kind: "package", container: pkg.bytes.slice(), key: keyValues };
    } else {
      const keyOk = validateKey(cipher);
      if (cipherInput.trim().length === 0) {
        setErrors((prev) => ({ ...prev, cipherInput: "Masukkan cipherteks terlebih dahulu." }));
        return;
      }
      if (!keyOk) return;
      request =
        decSource === "raw-letters"
          ? { kind: "raw-letters", cipher, text: cipherInput, key: keyValues }
          : { kind: "payload-base64", cipher, base64: cipherInput, key: keyValues };
    }
    setRunFor(op, { status: "running", operation: op });
    try {
      const result = await callCrypto({ op: "decrypt", request });
      seq.current += 1;
      setRunFor(op, { status: "decrypted", result, version: runVersion, seq: seq.current });
      setCompleted((c) => c + 1);
    } catch (err) {
      fail(err, runVersion, op);
    }
  }

  function fail(err: unknown, runVersion: number, op: Operation) {
    const info = err instanceof WorkerCallError ? err.info : { message: err instanceof Error ? err.message : String(err) };
    const fieldErrors: FieldErrors = { ...(info.fieldErrors ?? {}) };
    if (!info.fieldErrors && info.field) (fieldErrors as Record<string, string>)[info.field] = info.message;
    setErrors(fieldErrors);
    setRunFor(op, { status: "error", message: info.message, version: runVersion });
  }


  const messagePreview = useMemo(() => {
    if (encSource !== "text" || message.length === 0) return null;
    if (alpha) {
      const normalized = normalizeAlphabetic(message);
      return `Setelah normalisasi (${normalized.length} huruf): ${short(normalized) || "(kosong)"}`;
    }
    return `${encodeUtf8(message).length} byte UTF-8 akan dienkripsi apa adanya.`;
  }, [alpha, encSource, message]);

  const keyErrors: KeyErrors = {};
  for (const f of keyFieldsFor(activeCipher)) if (errors[f]) keyErrors[f] = errors[f];
  const generalKeyError = errors.key;

  const encFileExt = encFile ? splitFileName(encFile.name)[1] : "";

  /** Memindahkan fokus ke kolom masukan yang sedang aktif di panel 04. */
  function focusInput() {
    const id =
      operation === "encrypt"
        ? encSource === "text"
          ? "message"
          : "enc-file"
        : decSource === "package-file"
          ? "pkg-file"
          : decSource === "package-base64"
            ? "pkg-text"
            : "cipher-input";
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    el.focus({ preventScroll: true });
  }

  const inputPanel =
    operation === "encrypt"
      ? encSource === "text"
        ? { title: "Pesan", sub: "Masukkan pesan yang akan diproses." }
        : { title: "File", sub: "Unggah file yang akan dienkripsi." }
      : usesPackage
        ? { title: "Paket", sub: "Muat paket hasil enkripsi aplikasi ini." }
        : { title: "Cipherteks", sub: "Tempel cipherteks yang akan didekripsi." };

  const runLabel = operation === "encrypt" ? "Enkripsi" : "Dekripsi";
  const statusChip = running
    ? { label: "Memproses", tone: "busy" }
    : stale
      ? { label: "Hasil lama", tone: "warn" }
      : run.status === "error"
        ? { label: "Gagal", tone: "err" }
        : run.status === "encrypted" || run.status === "decrypted"
          ? { label: "Selesai", tone: "ok" }
          : { label: "Menunggu", tone: "idle" };

  return (
    <div className="workbench">
      <form
        className="col col-input"
        onSubmit={(e) => {
          e.preventDefault();
          void process();
        }}
        noValidate
      >
        <Panel n="01" title="Pilih cipher" sub="Daftar cipher di kiri, detail di kanan." className="panel-cipher">
          {pkg ? (
            <p className="lock-note" data-testid="cipher-locked">
              Algoritma mengikuti paket yang dimuat: <strong>{CIPHERS[pkg.summary.algorithm].name}</strong>.
            </p>
          ) : null}
          <CipherPicker active={activeCipher} locked={pkg !== null} keyValues={keyValues} onChange={changeCipher} onContinue={focusInput} />
        </Panel>

        <div className="row">
          <Panel n="02" title="Operasi" sub="Pilih jenis operasi kriptografi.">
            <div className="segmented segmented-lg" role="radiogroup" aria-label="Operasi">
              {(["encrypt", "decrypt"] as const).map((op) => (
                <label key={op}>
                  <input type="radio" name="operation" value={op} checked={operation === op} onChange={() => setOperation(op)} />
                  {op === "encrypt" ? <IconLock size={18} /> : <IconUnlock size={18} />}
                  {op === "encrypt" ? "Enkripsi" : "Dekripsi"}
                </label>
              ))}
            </div>
          </Panel>

          <Panel
            n="03"
            title={operation === "encrypt" ? "Jenis masukan" : "Format masukan"}
            sub={operation === "encrypt" ? "Pilih format masukan pesan." : "Pilih bentuk cipherteks yang dimiliki."}
          >
            {/* Kedua blok tetap terpasang agar kolom file tidak dipakai ulang oleh blok lain. */}
            <div hidden={operation !== "encrypt"}>
              <div className="segmented segmented-lg" role="radiogroup" aria-label="Jenis masukan">
                <label>
                  <input
                    type="radio"
                    name="encSource"
                    checked={encSource === "text"}
                    onChange={() => {
                      setEncSource("text");
                      touched("encrypt");
                    }}
                  />
                  <IconText size={18} />
                  Teks
                </label>
                <label>
                  <input
                    type="radio"
                    name="encSource"
                    checked={encSource === "file"}
                    onChange={() => {
                      setEncSource("file");
                      touched("encrypt");
                    }}
                  />
                  <IconFile size={18} />
                  File
                </label>
              </div>
            </div>
            <div className="field" hidden={operation !== "decrypt"}>
              <label htmlFor="dec-source" className="sr-only">
                Format masukan
              </label>
              <select
                id="dec-source"
                className="input"
                value={decSource}
                onChange={(e) => {
                  setDecSource(e.target.value as DecryptSource);
                  touched("decrypt", "package", "cipherInput");
                }}
              >
                <option value="package-file">Paket .dat (unggah file)</option>
                <option value="package-base64">Paket Base64 (tempel teks)</option>
                {alpha ? <option value="raw-letters">Cipherteks huruf mentah</option> : null}
                <option value="payload-base64">Cipherteks Base64 (payload saja)</option>
              </select>
              <p className="field-help">
                {usesPackage
                  ? "Paket memuat algoritma, mode, dan data pemulihan. Kunci tetap perlu diisi."
                  : "Tanpa paket tidak ada nama file, checksum, maupun data pemulihan pengisi dan padding."}
              </p>
            </div>
          </Panel>
        </div>

        <div className="row">
          <Panel n="04" title={inputPanel.title} sub={inputPanel.sub}>
            <div className="form-section" hidden={operation !== "encrypt"}>
              <div className="field" hidden={encSource !== "text"}>
                <label htmlFor="message" className="sr-only">
                  Pesan
                </label>
                <div className="textarea-wrap">
                  <textarea
                    id="message"
                    className="input"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      touched("encrypt", "message");
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby="message-preview message-error"
                    placeholder="Ketik pesan yang akan dienkripsi..."
                  />
                  <span className="counter" aria-hidden="true">
                    {message.length.toLocaleString("id-ID")} karakter
                  </span>
                </div>
                {messagePreview ? (
                  <p className="field-help field-preview" id="message-preview" data-testid="message-preview">
                    {messagePreview}
                  </p>
                ) : (
                  <p className="field-help" id="message-preview">
                    {alpha
                      ? "Cipher ini hanya mengenkripsi huruf A-Z. Angka, spasi, dan tanda baca akan dibuang."
                      : "Teks diubah menjadi byte UTF-8 lalu dienkripsi per byte."}
                  </p>
                )}
                {errors.message ? (
                  <p className="field-error" id="message-error" role="alert">
                    {errors.message}
                  </p>
                ) : null}
              </div>
              <div className="field" hidden={encSource !== "file"}>
                <label htmlFor="enc-file" className="sr-only">
                  File
                </label>
                <input
                  id="enc-file"
                  type="file"
                  className="input input-file"
                  onChange={(e) => {
                    setEncFile(e.target.files?.[0] ?? null);
                    touched("encrypt", "file");
                  }}
                  aria-describedby="enc-file-help enc-file-error"
                />
                <p className="field-help" id="enc-file-help">
                  Semua jenis file diterima. Batas ukuran {formatBytes(MAX_FILE_BYTES)} per file.
                </p>
                {encFile ? (
                  <p className="field-help field-preview" data-testid="enc-file-info">
                    {encFile.name} · ekstensi {encFileExt || "(tanpa ekstensi)"} · {formatBytes(encFile.size)}
                  </p>
                ) : null}
                {alpha ? (
                  <div className="choice-list" role="radiogroup" aria-label="Cara membaca file">
                    <label>
                      <input
                        type="radio"
                        name="fileReadAs"
                        checked={fileReadAs === "bytes"}
                        onChange={() => {
                          setFileReadAs("bytes");
                          touched("encrypt");
                        }}
                      />
                      <span>
                        <strong>File utuh</strong>
                        <span className="choice-help">Semua byte ikut dienkripsi dan hasil dekripsi identik dengan file asal.</span>
                      </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="fileReadAs"
                        checked={fileReadAs === "alpha-text"}
                        onChange={() => {
                          setFileReadAs("alpha-text");
                          touched("encrypt");
                        }}
                      />
                      <span>
                        <strong>Isi sebagai teks alfabet</strong>
                        <span className="choice-help">Hanya huruf A-Z dari isi file yang dienkripsi. File asal tidak dapat dipulihkan utuh.</span>
                      </span>
                    </label>
                  </div>
                ) : null}
                {errors.file ? (
                  <p className="field-error" id="enc-file-error" role="alert">
                    {errors.file}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="form-section" hidden={operation !== "decrypt"}>
              <div className="field" hidden={decSource !== "package-file"}>
                <label htmlFor="pkg-file" className="sr-only">
                  Paket .dat
                </label>
                <input
                  id="pkg-file"
                  type="file"
                  className="input input-file"
                  accept=".dat,application/octet-stream"
                  onChange={(e) => void onPackageFile(e.target.files?.[0])}
                  aria-describedby="pkg-error"
                />
              </div>
              {decSource === "package-base64" ? (
                <div className="field">
                  <label htmlFor="pkg-text" className="sr-only">
                    Paket Base64
                  </label>
                  <textarea
                    id="pkg-text"
                    className="input input-mono"
                    rows={5}
                    value={packageText}
                    onChange={(e) => void onPackageText(e.target.value)}
                    placeholder="Tempel hasil tombol Salin paket untuk dekripsi"
                    aria-describedby="pkg-error"
                    spellCheck={false}
                  />
                </div>
              ) : null}
              {pkg ? (
                <dl className="facts facts-compact" data-testid="package-info">
                  <div>
                    <dt>Sumber</dt>
                    <dd>{pkg.label}</dd>
                  </div>
                  <div>
                    <dt>Algoritma</dt>
                    <dd>{CIPHERS[pkg.summary.algorithm].name}</dd>
                  </div>
                  <div>
                    <dt>Mode</dt>
                    <dd>{pkg.summary.inputMode === "file" ? "File utuh" : "Teks"}</dd>
                  </div>
                  {pkg.summary.fileName ? (
                    <div>
                      <dt>File asal</dt>
                      <dd>{pkg.summary.fileName}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>Payload</dt>
                    <dd>{formatBytes(pkg.summary.payloadLength)}</dd>
                  </div>
                </dl>
              ) : null}
              {inspecting ? <p className="field-help" role="status">Memeriksa paket di backend Ruby…</p> : null}
              {usesPackage && errors.package ? (
                <p className="field-error" id="pkg-error" role="alert">
                  {errors.package}
                </p>
              ) : null}
              {!usesPackage ? (
                <div className="field">
                  <label htmlFor="cipher-input" className="sr-only">
                    {decSource === "raw-letters" ? "Cipherteks huruf" : "Cipherteks Base64"}
                  </label>
                  <textarea
                    id="cipher-input"
                    className="input input-mono"
                    rows={5}
                    value={cipherInput}
                    onChange={(e) => {
                      setCipherInput(e.target.value);
                      touched("decrypt", "cipherInput");
                    }}
                    aria-invalid={Boolean(errors.cipherInput)}
                    aria-describedby="cipher-input-help cipher-input-error"
                    placeholder={decSource === "raw-letters" ? "Tempel cipherteks huruf A-Z" : "Tempel cipherteks Base64"}
                    spellCheck={false}
                  />
                  <p className="field-help" id="cipher-input-help">
                    {decSource === "raw-letters"
                      ? "Huruf selain A-Z dibuang sebelum dekripsi."
                      : "Base64 didekode apa adanya tanpa mengubah huruf besar dan kecil. Angka, +, /, dan = tetap dipakai."}
                  </p>
                  {errors.cipherInput ? (
                    <p className="field-error" id="cipher-input-error" role="alert">
                      {errors.cipherInput}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </Panel>

          <Panel n="05" title="Kunci" sub="Masukkan kunci sesuai cipher." className="panel-key">
            <KeyFields cipher={activeCipher} values={keyValues} errors={keyErrors} onChange={changeKey} />
            {generalKeyError ? (
              <p className="field-error" role="alert">
                {generalKeyError}
              </p>
            ) : null}
            <button type="submit" className="btn btn-accent btn-run" disabled={running || inspecting} data-testid="run">
              {running ? "Memproses…" : inspecting ? "Memeriksa paket…" : runLabel}
              {running ? null : <IconPlay size={20} />}
            </button>
          </Panel>
        </div>
      </form>

      <div className="col col-output">
        <section ref={resultRef} className="panel panel-result" aria-live="polite" aria-busy={running}>
          <PanelHead n="06" title="Hasil" sub="Hasil enkripsi atau dekripsi ditampilkan di sini.">
            <span className={`chip chip-${statusChip.tone}`}>{statusChip.label}</span>
          </PanelHead>
          <div className="result-body">
            {stale ? (
              <p className="status status-stale" data-testid="stale-warning">
                Masukan atau kunci berubah sejak proses terakhir. Hasil di bawah belum sesuai masukan terbaru. Jalankan ulang.
              </p>
            ) : null}
            {run.status === "idle" ? (
              <div className="empty">
                <span className="empty-glyph" aria-hidden="true">
                  {CIPHERS[activeCipher].name.charAt(0)}
                </span>
                <p className="empty-title">Hasil akan muncul di sini</p>
                <p className="empty-text">
                  Pilih cipher, isi {operation === "encrypt" ? "pesan" : "cipherteks"} dan kunci, lalu tekan {runLabel}.
                </p>
              </div>
            ) : null}
            {run.status === "running" ? <p className="status status-neutral">Sedang memproses di latar belakang…</p> : null}
            {run.status === "error" ? (
              <p className="status status-error" role="alert" data-testid="run-error">
                {run.message}
              </p>
            ) : null}
            <div className={stale ? "is-stale" : undefined}>
              {run.status === "encrypted" ? <EncryptResultView result={run.result} onUseForDecrypt={() => sendToDecrypt(run.result, run.initialKey)} /> : null}
              {run.status === "decrypted" ? <DecryptResultView key={run.seq} result={run.result} /> : null}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function PanelHead({ n, title, sub, children }: { n: string; title: string; sub: string; children?: React.ReactNode }) {
  return (
    <div className="panel-head">
      <span className="panel-icon">
        <IconPanel size={22} />
      </span>
      <span className="panel-num">{n}</span>
      <div className="panel-heading">
        <h2>{title}</h2>
        <p>{sub}</p>
      </div>
      {children ? <div className="panel-aside">{children}</div> : null}
    </div>
  );
}

function Panel({ n, title, sub, className, children }: { n: string; title: string; sub: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={`panel${className ? ` ${className}` : ""}`}>
      <PanelHead n={n} title={title} sub={sub} />
      <div className="panel-body">{children}</div>
    </section>
  );
}
