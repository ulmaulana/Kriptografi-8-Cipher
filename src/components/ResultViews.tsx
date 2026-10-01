"use client";

import { useState } from "react";
import { encodeBase64Preview } from "@/lib/codecs/base64";
import { CIPHERS, isAlphaCipher } from "@/lib/crypto/ciphers";
import { callCrypto } from "@/lib/engine/client";
import type { DecryptResult, EncryptResult } from "@/lib/engine/types";
import { downloadBytes, formatBytes, splitFileName } from "./download";
import { CopyButton, OutputBlock, PREVIEW_CHARS } from "./Output";

const decoder = new TextDecoder();

function asciiPreview(bytes: Uint8Array) {
  const truncated = bytes.length > PREVIEW_CHARS;
  return { text: decoder.decode(bytes.subarray(0, PREVIEW_CHARS)), truncated, total: bytes.length };
}

function textPreview(bytes: Uint8Array) {
  const full = decoder.decode(bytes);
  const truncated = full.length > PREVIEW_CHARS;
  return { text: truncated ? full.slice(0, PREVIEW_CHARS) : full, truncated, total: full.length };
}

function base64Preview(bytes: Uint8Array) {
  const { text, truncated } = encodeBase64Preview(bytes, PREVIEW_CHARS);
  return { text, truncated, total: Math.ceil(bytes.length / 3) * 4 };
}

function fullBase64(bytes: Uint8Array): Promise<string> {
  // Salinan dikirim ke worker agar data hasil di UI tetap utuh.
  return callCrypto({ op: "base64", bytes: bytes.slice() });
}

function Notes({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="result-notes">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function FileFacts({ name, type, size }: { name: string; type: string; size: number }) {
  const [, ext] = splitFileName(name);
  return (
    <dl className="facts" data-testid="file-facts">
      <div>
        <dt>Nama file</dt>
        <dd>{name}</dd>
      </div>
      <div>
        <dt>Ekstensi</dt>
        <dd>{ext || "(tanpa ekstensi)"}</dd>
      </div>
      <div>
        <dt>Jenis</dt>
        <dd>{type || "tidak diketahui"}</dd>
      </div>
      <div>
        <dt>Ukuran</dt>
        <dd>{formatBytes(size)}</dd>
      </div>
    </dl>
  );
}

export function EncryptResultView({ result, onUseForDecrypt }: { result: EncryptResult; onUseForDecrypt: () => void }) {
  const info = CIPHERS[result.cipher];
  const alpha = isAlphaCipher(result.cipher);
  const { metadata } = result;
  const packageName = metadata.file
    ? `${metadata.file.name}.dat`
    : metadata.sourceFileName
      ? `${metadata.sourceFileName}.alfabet.dat`
      : `cipherteks-${result.cipher}.dat`;

  const plainBase64 = base64Preview(result.plainBytes);
  const payloadBase64 = base64Preview(result.payload);
  const cipherLetters = alpha ? asciiPreview(result.payload) : null;

  let plainBlock: React.ReactNode;
  if (result.inputMode === "file" && metadata.file) {
    plainBlock = (
      <section className="output">
        <div className="output-head">
          <h3>File asal</h3>
        </div>
        <FileFacts name={metadata.file.name} type={metadata.file.type} size={result.plainBytes.length} />
        {alpha ? (
          <p className="output-hint">
            Seluruh byte file, termasuk header, dipetakan ke huruf dengan codec alpha25-v1 lalu dienkripsi {info.name} modulo 26.
          </p>
        ) : (
          <p className="output-hint">Seluruh byte file, termasuk header, dienkripsi langsung sebagai byte.</p>
        )}
      </section>
    );
  } else {
    const p = alpha ? asciiPreview(result.plainBytes) : textPreview(result.plainBytes);
    plainBlock = (
      <OutputBlock
        title={alpha ? "Plainteks setelah normalisasi" : "Plainteks (UTF-8)"}
        hint={
          alpha
            ? "Hanya huruf A-Z yang dienkripsi. Angka, spasi, dan tanda baca dibuang."
            : `${result.plainBytes.length} byte UTF-8 diproses apa adanya.`
        }
        text={p.text}
        truncated={p.truncated}
        totalChars={p.total}
        testId="out-plain"
        variant="plain"
      />
    );
  }

  return (
    <div className="result" data-testid="encrypt-result">
      <p className="status status-ok" role="status">
        Enkripsi selesai dengan {info.name}.
      </p>
      <Notes items={[...result.keyNotes, ...result.details]} />
      {plainBlock}
      <OutputBlock
        title="Plainteks Base64"
        hint={result.inputMode === "file" ? "Base64 dari byte file asli." : "Base64 dari byte plainteks di atas."}
        text={plainBase64.text}
        truncated={plainBase64.truncated}
        totalChars={plainBase64.total}
        testId="out-plain-base64"
      >
        <CopyButton compact label="Salin plainteks Base64" getText={() => fullBase64(result.plainBytes)} />
      </OutputBlock>
      {cipherLetters ? (
        <OutputBlock
          title="Cipherteks huruf"
          hint={`Huruf kapital A-Z tanpa spasi, ${result.payload.length.toLocaleString("id-ID")} huruf.`}
          text={cipherLetters.text}
          truncated={cipherLetters.truncated}
          totalChars={cipherLetters.total}
          testId="out-cipher-letters"
          variant="cipher"
        >
          <CopyButton compact label="Salin cipherteks huruf" getText={() => decoder.decode(result.payload)} testId="copy-cipher-letters" />
        </OutputBlock>
      ) : null}
      <OutputBlock
        title="Cipherteks Base64 (payload)"
        hint={
          alpha
            ? "Base64 dari byte ASCII cipherteks huruf. Huruf besar dan kecil pada Base64 dibedakan sehingga tidak diseragamkan."
            : "Base64 dari byte cipherteks. Huruf besar dan kecil pada Base64 dibedakan sehingga tidak diseragamkan."
        }
        text={payloadBase64.text}
        truncated={payloadBase64.truncated}
        totalChars={payloadBase64.total}
        testId="out-payload-base64"
        variant={alpha ? "code" : "cipher"}
      >
        <CopyButton compact label="Salin cipherteks Base64" getText={() => fullBase64(result.payload)} testId="copy-payload-base64" />
      </OutputBlock>
      <section className="output package">
        <div className="output-head">
          <h3>Paket untuk dekripsi</h3>
        </div>
        <p className="output-hint">
          File .dat berisi payload cipherteks dan metadata pemulihan (algoritma, mode, ukuran, SHA-256
          {metadata.file ? ", nama file asal" : ""}
          {metadata.playfair ? ", posisi pengisi Playfair" : ""}
          {metadata.hill ? ", jumlah padding Hill" : ""}). Kunci tidak disimpan. Ukuran paket {formatBytes(result.container.length)}.
        </p>
        <div className="button-row">
          <button
            type="button"
            className="btn btn-primary"
            data-testid="download-package"
            onClick={() => downloadBytes(result.container, packageName)}
          >
            Unduh paket .dat
          </button>
          <CopyButton label="Salin paket untuk dekripsi" getText={() => fullBase64(result.container)} testId="copy-package-base64" />
          <button type="button" className="btn btn-quiet" onClick={onUseForDecrypt} data-testid="use-for-decrypt">
            Gunakan hasil untuk dekripsi
          </button>
        </div>
      </section>
    </div>
  );
}

export function DecryptResultView({ result }: { result: DecryptResult }) {
  const info = CIPHERS[result.cipher];
  const originalName = result.fileName ?? (result.representation === "binary" ? "hasil-dekripsi.bin" : `plainteks-${result.cipher}.txt`);
  const [stem0, ext] = splitFileName(originalName);
  const [stem, setStem] = useState(stem0);
  const downloadName = `${stem.trim() || stem0}${ext}`;
  const plainBase64 = base64Preview(result.bytes);

  let body: React.ReactNode;
  if (result.representation === "binary") {
    body =
      result.fileName !== null ? (
        <section className="output">
          <div className="output-head">
            <h3>File hasil pemulihan</h3>
          </div>
          <FileFacts name={result.fileName} type={result.fileType ?? ""} size={result.bytes.length} />
        </section>
      ) : (
        <p className="output-hint">Hasil berupa byte yang bukan teks UTF-8 valid sehingga hanya ditampilkan sebagai Base64.</p>
      );
  } else {
    const p = result.representation === "letters" ? asciiPreview(result.bytes) : textPreview(result.bytes);
    body = (
      <OutputBlock
        title={result.representation === "letters" ? "Plainteks huruf" : "Plainteks (UTF-8)"}
        hint={
          result.representation === "letters" && result.source === "package"
            ? "Teks hasil normalisasi yang dipulihkan, termasuk X, Q, dan J asli."
            : undefined
        }
        text={p.text}
        truncated={p.truncated}
        totalChars={p.total}
        testId="out-decrypted"
        variant="plain"
      >
        <CopyButton compact label="Salin plainteks" getText={() => decoder.decode(result.bytes)} />
      </OutputBlock>
    );
  }

  return (
    <div className="result" data-testid="decrypt-result">
      {result.verified ? (
        <p className="status status-ok" role="status" data-testid="decrypt-status">
          Pemulihan berhasil dengan {info.name}: ukuran {result.bytes.length.toLocaleString("id-ID")} byte dan SHA-256 cocok dengan paket.
        </p>
      ) : (
        <p className="status status-neutral" role="status" data-testid="decrypt-status">
          Dekripsi mentah selesai dengan {info.name}. Tidak ada checksum untuk memverifikasi hasil.
        </p>
      )}
      <Notes items={[...result.keyNotes, ...result.details]} />
      {body}
      <OutputBlock
        title="Plainteks Base64"
        text={plainBase64.text}
        truncated={plainBase64.truncated}
        totalChars={plainBase64.total}
        testId="out-decrypted-base64"
      >
        <CopyButton compact label="Salin plainteks Base64" getText={() => fullBase64(result.bytes)} />
      </OutputBlock>
      <dl className="facts facts-hash">
        <div>
          <dt>SHA-256 hasil</dt>
          <dd data-testid="decrypted-sha256">{result.sha256}</dd>
        </div>
      </dl>
      <section className="output package">
        <div className="output-head">
          <h3>Simpan hasil</h3>
        </div>
        <div className="name-editor">
          <label htmlFor="out-name">Nama file</label>
          <div className="name-editor-row">
            <input id="out-name" className="input" value={stem} onChange={(e) => setStem(e.target.value)} spellCheck={false} />
            <span className="name-ext" aria-label="Ekstensi tetap">
              {ext || "(tanpa ekstensi)"}
            </span>
          </div>
        </div>
        <div className="button-row">
          <button
            type="button"
            className="btn btn-primary"
            data-testid="download-decrypted"
            onClick={() => downloadBytes(result.bytes, downloadName, result.fileType ?? (result.representation === "binary" ? "" : "text/plain"))}
          >
            Unduh {downloadName}
          </button>
        </div>
      </section>
    </div>
  );
}
