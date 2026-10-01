"use client";

import { useMemo } from "react";
import { lettersToIndices, normalizeAlphabetic } from "@/lib/codecs/alphabet";
import type { CipherId } from "@/lib/crypto/ciphers";
import { buildPlayfairMatrix } from "@/lib/crypto/playfair";
import { type KeyErrors, type KeyField, type KeyFormValues, parseKey } from "@/lib/validation/keys";
import { IconKey } from "./Icons";

interface KeyFieldsProps {
  cipher: CipherId;
  values: KeyFormValues;
  errors: KeyErrors;
  onChange: (field: KeyField, value: KeyFormValues[KeyField]) => void;
}

const HILL_PRESETS: Array<{ label: string; value: string }> = [
  { label: "2 x 2", value: "3 3\n2 5" },
  { label: "3 x 3", value: "6 24 1\n13 16 10\n20 17 15" },
  { label: "2 x 2 [[2,1],[13,7]]", value: "2 1\n13 7" },
];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="field-error" id={id} role="alert">
      {message}
    </p>
  );
}

function ByteKeyField({ values, errors, onChange }: Omit<KeyFieldsProps, "cipher">) {
  return (
    <div className="field">
      <label htmlFor="key-byte">Kunci byte</label>
      <div className="segmented segmented-small" role="radiogroup" aria-label="Format kunci byte">
        <label>
          <input
            type="radio"
            name="byteKeyFormat"
            value="text"
            checked={values.byteKeyFormat === "text"}
            onChange={() => onChange("byteKeyFormat", "text")}
          />
          Teks UTF-8
        </label>
        <label>
          <input
            type="radio"
            name="byteKeyFormat"
            value="hex"
            checked={values.byteKeyFormat === "hex"}
            onChange={() => onChange("byteKeyFormat", "hex")}
          />
          Heksadesimal
        </label>
      </div>
      <input
        id="key-byte"
        className="input input-mono"
        value={values.byteKey}
        onChange={(e) => onChange("byteKey", e.target.value)}
        aria-invalid={Boolean(errors.byteKey)}
        aria-describedby="key-byte-help key-byte-error"
        placeholder={values.byteKeyFormat === "hex" ? "contoh: 01 02 ff" : "contoh: Kunci Rahasia 2026"}
        autoComplete="off"
        spellCheck={false}
      />
      <p className="field-help" id="key-byte-help">
        {values.byteKeyFormat === "hex"
          ? "Dua digit per byte. Byte 00 termasuk nilai kunci yang sah."
          : "Spasi dan huruf besar kecil ikut dipakai sebagai byte kunci."}
      </p>
      <FieldError id="key-byte-error" message={errors.byteKey} />
    </div>
  );
}

export function KeyFields({ cipher, values, errors, onChange }: KeyFieldsProps) {
  const live = useMemo(() => parseKey(cipher, values), [cipher, values]);
  const playfairRows = useMemo(() => {
    if (cipher !== "playfair") return null;
    const normalized = normalizeAlphabetic(values.keyword);
    if (!normalized) return null;
    const cells = buildPlayfairMatrix(lettersToIndices(normalized)).cells;
    return Array.from({ length: 5 }, (_, r) => Array.from(cells.subarray(r * 5, r * 5 + 5), (c) => String.fromCharCode(c + 65)));
  }, [cipher, values.keyword]);

  return (
    <fieldset className="keys">
      <legend className="sr-only">Kunci</legend>
      {cipher !== "enigma-i" ? <p className="field-help">Batas implementasi: maksimal 65.536 karakter pada setiap kolom kunci teks.</p> : null}

      {cipher === "enigma-i" ? (
        <div className="enigma-fields">
          <p className="field-help">Urutan kiri, tengah, kanan. Untuk dekripsi, masukkan konfigurasi awal yang sama.</p>
          <div className="enigma-rotors">
            {["Kiri", "Tengah", "Kanan"].map((label, i) => (
              <div className="enigma-rotor" key={label}>
                <div className="field">
                  <label htmlFor={`enigma-rotor-${i}`}>Rotor {label.toLowerCase()}</label>
                  <select id={`enigma-rotor-${i}`} className="input input-mono" value={values.rotors?.[i] ?? ""}
                    aria-invalid={Boolean(errors.rotors)} aria-describedby="enigma-rotors-error"
                    onChange={(e) => onChange("rotors", (values.rotors ?? ["I", "II", "III"]).map((r, j) => j === i ? e.target.value : r))}>
                    {["I", "II", "III", "IV", "V"].map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor={`enigma-ring-${i}`}>Ring {label.toLowerCase()}</label>
                  <input id={`enigma-ring-${i}`} className="input input-mono" type="number" min={1} max={26} step={1}
                    value={Number.isFinite(values.ringSettings?.[i]) ? values.ringSettings![i] : ""}
                    aria-invalid={Boolean(errors.ringSettings)} aria-describedby="enigma-rings-error"
                    onChange={(e) => onChange("ringSettings", (values.ringSettings ?? [1, 1, 1]).map((r, j) => j === i ? e.target.valueAsNumber : r))} />
                </div>
                <div className="field">
                  <label htmlFor={`enigma-position-${i}`}>Posisi {label.toLowerCase()}</label>
                  <input id={`enigma-position-${i}`} className="input input-mono" maxLength={1} autoComplete="off" spellCheck={false}
                    value={values.initialPositions?.[i] ?? ""} aria-invalid={Boolean(errors.initialPositions)} aria-describedby="enigma-positions-error"
                    onChange={(e) => onChange("initialPositions", (values.initialPositions ?? ["A", "A", "A"]).map((p, j) => j === i ? e.target.value.toUpperCase() : p))} />
                </div>
              </div>
            ))}
          </div>
          <FieldError id="enigma-rotors-error" message={errors.rotors} />
          <FieldError id="enigma-rings-error" message={errors.ringSettings} />
          <FieldError id="enigma-positions-error" message={errors.initialPositions} />
          <div className="field">
            <label htmlFor="enigma-reflector">Reflector</label>
            <select id="enigma-reflector" className="input input-mono" value={values.reflector ?? "B"}
              aria-invalid={Boolean(errors.reflector)} aria-describedby="enigma-reflector-error" onChange={(e) => onChange("reflector", e.target.value)}>
              <option value="B">B</option><option value="C">C</option>
            </select>
            <FieldError id="enigma-reflector-error" message={errors.reflector} />
          </div>
          <div className="field">
            <label htmlFor="enigma-plugboard">Plugboard</label>
            <input id="enigma-plugboard" className="input input-mono" value={values.plugboard ?? ""} placeholder="contoh: AB CD EF"
              autoComplete="off" spellCheck={false} aria-invalid={Boolean(errors.plugboard)} aria-describedby="enigma-plugboard-help enigma-plugboard-error"
              onChange={(e) => onChange("plugboard", e.target.value)} />
            <p className="field-help" id="enigma-plugboard-help">Opsional, maksimal 13 pasangan dipisahkan spasi. Setiap huruf hanya dipakai sekali.</p>
            <FieldError id="enigma-plugboard-error" message={errors.plugboard} />
          </div>
          <button type="button" className="btn btn-small" onClick={() => {
            onChange("rotors", ["I", "II", "III"]); onChange("ringSettings", [1, 1, 1]);
            onChange("initialPositions", ["A", "A", "A"]); onChange("reflector", "B"); onChange("plugboard", "");
          }}>Reset konfigurasi Enigma</button>
        </div>
      ) : null}

      {cipher === "vigenere" || cipher === "autokey" || cipher === "playfair" ? (
        <div className="field">
          <label htmlFor="key-keyword">{cipher === "autokey" ? "Primer" : "Kata kunci"}</label>
          <div className="input-icon">
            <IconKey size={18} />
            <input
              id="key-keyword"
              className="input input-mono"
              value={values.keyword}
              onChange={(e) => onChange("keyword", e.target.value)}
              aria-invalid={Boolean(errors.keyword)}
              aria-describedby="key-keyword-help key-keyword-error"
              placeholder={cipher === "autokey" ? "contoh: QUEENLY" : cipher === "playfair" ? "contoh: PLAYFAIREXAMPLE" : "contoh: LEMON"}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <p className="field-help" id="key-keyword-help">
            {cipher === "vigenere" && "Hanya huruf A-Z yang dipakai. Panjang bebas, boleh lebih panjang dari pesan."}
            {cipher === "autokey" && "Primer dipakai lebih dulu, lalu aliran kunci dilanjutkan dengan plainteks."}
            {cipher === "playfair" && "Hanya huruf A-Z yang dipakai. J digabung ke I dan huruf berulang dilewati saat menyusun matriks."}
          </p>
          <FieldError id="key-keyword-error" message={errors.keyword} />
          {playfairRows ? (
            <table className="playfair-grid" aria-label="Matriks Playfair">
              <tbody>
                {playfairRows.map((row, r) => (
                  <tr key={r}>
                    {row.map((ch, c) => (
                      <td key={c}>{ch}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      ) : null}

      {cipher === "extended-vigenere" || cipher === "super" ? <ByteKeyField values={values} errors={errors} onChange={onChange} /> : null}

      {cipher === "super" ? (
        <div className="field">
          <label htmlFor="key-column">Kata kunci kolom</label>
          <input
            id="key-column"
            className="input input-mono"
            value={values.columnKey}
            onChange={(e) => onChange("columnKey", e.target.value)}
            aria-invalid={Boolean(errors.columnKey)}
            aria-describedby="key-column-help key-column-error"
            placeholder="contoh: BABA"
            autoComplete="off"
            spellCheck={false}
          />
          <p className="field-help" id="key-column-help">
            Jumlah huruf menentukan jumlah kolom. Kolom dibaca urut A-Z, huruf sama dibaca dari kiri.
          </p>
          <FieldError id="key-column-error" message={errors.columnKey} />
        </div>
      ) : null}

      {cipher === "affine" ? (
        <div className="field-row">
          <div className="field">
            <label htmlFor="key-a">Nilai a</label>
            <input
              id="key-a"
              className="input input-mono"
              inputMode="numeric"
              value={values.affineA}
              onChange={(e) => onChange("affineA", e.target.value)}
              aria-invalid={Boolean(errors.affineA)}
              aria-describedby="key-a-help key-a-error"
              placeholder="5"
              autoComplete="off"
            />
            <FieldError id="key-a-error" message={errors.affineA} />
          </div>
          <div className="field">
            <label htmlFor="key-b">Nilai b</label>
            <input
              id="key-b"
              className="input input-mono"
              inputMode="numeric"
              value={values.affineB}
              onChange={(e) => onChange("affineB", e.target.value)}
              aria-invalid={Boolean(errors.affineB)}
              aria-describedby="key-a-help key-b-error"
              placeholder="8"
              autoComplete="off"
            />
            <FieldError id="key-b-error" message={errors.affineB} />
          </div>
          <p className="field-help field-row-help" id="key-a-help">
            Bilangan bulat, direduksi modulo 26. Nilai a harus relatif prima terhadap 26: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25.
          </p>
        </div>
      ) : null}

      {cipher === "hill" ? (
        <div className="field">
          <label htmlFor="key-hill">Matriks kunci</label>
          <div className="presets" aria-label="Contoh matriks">
            {HILL_PRESETS.map((preset) => (
              <button key={preset.label} type="button" className="btn btn-chip" onClick={() => onChange("hillMatrix", preset.value)}>
                {preset.label}
              </button>
            ))}
          </div>
          <textarea
            id="key-hill"
            className="input input-mono"
            rows={4}
            value={values.hillMatrix}
            onChange={(e) => onChange("hillMatrix", e.target.value)}
            aria-invalid={Boolean(errors.hillMatrix)}
            aria-describedby="key-hill-help key-hill-error"
            placeholder={"6 24 1\n13 16 10\n20 17 15"}
            spellCheck={false}
          />
          <p className="field-help" id="key-hill-help">
            Satu baris teks untuk satu baris matriks, angka dipisah spasi atau koma. Ukuran n x n dengan n dari 2 sampai 10, determinan
            harus relatif prima terhadap 26.
          </p>
          <FieldError id="key-hill-error" message={errors.hillMatrix} />
        </div>
      ) : null}

      {live.ok && live.notes.length > 0 ? (
        <ul className="key-notes" data-testid="key-notes">
          {live.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </fieldset>
  );
}
