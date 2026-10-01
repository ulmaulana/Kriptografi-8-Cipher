"use client";

import { useState } from "react";
import { IconCopy, IconDone } from "./Icons";

export const PREVIEW_CHARS = 4000;

interface OutputBlockProps {
  title: string;
  hint?: string;
  text: string;
  truncated?: boolean;
  totalChars?: number;
  testId: string;
  variant?: "cipher" | "plain" | "code";
  /** Tombol salin yang ditempatkan di pojok kanan atas kotak keluaran. */
  children?: React.ReactNode;
}

/** Blok keluaran dengan pratinjau terbatas. Tombol salin selalu memakai data lengkap. */
export function OutputBlock({ title, hint, text, truncated, totalChars, testId, variant = "code", children }: OutputBlockProps) {
  return (
    <section className={`output output-block-${variant}`}>
      <div className="output-head">
        <h3>{title}</h3>
      </div>
      {hint ? <p className="output-hint">{hint}</p> : null}
      <div className="output-box">
        <pre className={`output-text output-${variant}${children ? " has-copy" : ""}`} data-testid={testId}>
          {text.length > 0 ? text : <span className="output-empty">(kosong)</span>}
        </pre>
        {children ? <div className="output-box-actions">{children}</div> : null}
      </div>
      {truncated ? (
        <p className="output-note">
          Pratinjau menampilkan {text.length.toLocaleString("id-ID")} dari {totalChars?.toLocaleString("id-ID")} karakter. Salin dan unduh
          memuat data lengkap.
        </p>
      ) : null}
    </section>
  );
}

interface CopyButtonProps {
  label: string;
  getText: () => Promise<string> | string;
  testId?: string;
  /** Ikon kecil di dalam kotak keluaran. Label lengkap tetap menjadi tooltip dan nama tombol. */
  compact?: boolean;
}

export function CopyButton({ label, getText, testId, compact = false }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  async function copy() {
    setState("busy");
    try {
      const text = await getText();
      await navigator.clipboard.writeText(text);
      setState("done");
      setTimeout(() => setState("idle"), 1800);
    } catch {
      setState("error");
    }
  }

  if (!compact) {
    return (
      <button type="button" className="btn btn-quiet" onClick={copy} disabled={state === "busy"} data-testid={testId}>
        {state === "done" ? "Tersalin" : state === "error" ? "Gagal menyalin" : label}
      </button>
    );
  }

  const feedback = state === "done" ? "Tersalin" : state === "error" ? "Gagal menyalin" : null;
  return (
    <button
      type="button"
      className={`copy-btn${state === "done" ? " is-done" : state === "error" ? " is-error" : ""}`}
      onClick={copy}
      disabled={state === "busy"}
      title={label}
      data-testid={testId}
    >
      {state === "done" ? <IconDone size={16} /> : <IconCopy size={16} />}
      {feedback ? <span>{feedback}</span> : <span className="sr-only">{label}</span>}
    </button>
  );
}
