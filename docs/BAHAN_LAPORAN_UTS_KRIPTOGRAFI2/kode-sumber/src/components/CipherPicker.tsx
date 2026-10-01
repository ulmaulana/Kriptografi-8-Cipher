"use client";

import { useMemo } from "react";
import { CIPHER_IDS, CIPHERS, type CipherId, isAlphaCipher } from "@/lib/crypto/ciphers";
import { type KeyFormValues, parseKey } from "@/lib/validation/keys";
import { CipherIcon, IconInfo, IconPlay } from "./Icons";

interface CipherDetail {
  description: string;
  type: string;
  alphabet: string;
  key: string;
}

const DETAILS: Record<CipherId, CipherDetail> = {
  vigenere: {
    description: "Enkripsi 26 huruf dengan kata kunci yang diulang sepanjang pesan.",
    type: "Substitusi polialfabetik",
    alphabet: "26 huruf (A-Z)",
    key: "Kata kunci berulang",
  },
  autokey: {
    description: "Primer dipakai lebih dulu, lalu plainteks melanjutkan aliran kunci.",
    type: "Substitusi polialfabetik",
    alphabet: "26 huruf (A-Z)",
    key: "Primer lalu plainteks",
  },
  "extended-vigenere": {
    description: "Setiap byte digeser dengan byte kunci modulo 256.",
    type: "Substitusi byte",
    alphabet: "256 nilai byte",
    key: "Teks UTF-8 atau heksadesimal",
  },
  playfair: {
    description: "Pasangan huruf dienkripsi dengan matriks 5 x 5 dari kata kunci.",
    type: "Substitusi digraf",
    alphabet: "25 huruf, J digabung ke I",
    key: "Kata kunci matriks",
  },
  affine: {
    description: "Setiap huruf dipetakan dengan C = a·P + b modulo 26.",
    type: "Substitusi monoalfabetik",
    alphabet: "26 huruf (A-Z)",
    key: "Bilangan a dan b",
  },
  hill: {
    description: "Blok huruf dikalikan matriks kunci modulo 26.",
    type: "Substitusi poligraf",
    alphabet: "26 huruf (A-Z)",
    key: "Matriks n x n invertibel",
  },
  super: {
    description: "Extended Vigenere pada byte, lalu transposisi kolom.",
    type: "Substitusi dan transposisi",
    alphabet: "256 nilai byte",
    key: "Kunci byte dan kata kunci kolom",
  },
  "enigma-i": {
    description: "Rotor bergerak setiap huruf. Dekripsi memakai konfigurasi awal yang sama.",
    type: "Substitusi rotor",
    alphabet: "26 huruf (A-Z)",
    key: "Rotor, ring, posisi, reflector, plugboard",
  },
};

/** Keterangan tambahan yang muncul lewat ikon info di daftar cipher. */
const INFO: Partial<Record<CipherId, string>> = {
  super: "Gabungan Extended Vigenere Cipher dan cipher transposisi (metode kolom)",
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PLAYFAIR_LETTERS = "ABCDEFGHIKLMNOPQRSTUVWXYZ".split("");
const BYTE_CELLS = Array.from({ length: 16 }, (_, i) => (i * 16).toString(16).toUpperCase().padStart(2, "0"));

/** Deretan simbol yang dipakai cipher, dengan posisi awal kunci ditandai bila kunci sudah valid. */
function useSymbolStrip(cipher: CipherId, values: KeyFormValues) {
  return useMemo(() => {
    const parsed = parseKey(cipher, values);
    const cells = cipher === "playfair" ? PLAYFAIR_LETTERS : isAlphaCipher(cipher) ? LETTERS : BYTE_CELLS;
    if (!parsed.ok) return { cells, active: -1, caption: "Isi kunci untuk melihat posisi awalnya." };
    const key = parsed.key;
    switch (key.cipher) {
      case "enigma-i":
        return { cells, active: key.initialPositions[2]!.charCodeAt(0) - 65, caption: `Rotor ${key.rotors.join(" / ")}, posisi awal ${key.initialPositions.join("")}.` };
      case "vigenere":
      case "autokey": {
        const first = (key.cipher === "vigenere" ? key.keyword : key.primer)[0]!;
        return { cells, active: first, caption: `Huruf kunci pertama ${LETTERS[first]}, geser ${first}.` };
      }
      case "playfair": {
        const letter = LETTERS[key.keyword[0]!] === "J" ? "I" : LETTERS[key.keyword[0]!]!;
        return { cells, active: PLAYFAIR_LETTERS.indexOf(letter), caption: `Matriks dimulai dari huruf ${letter}.` };
      }
      case "affine":
        return { cells, active: key.key.b, caption: `a = ${key.key.a}, b = ${key.key.b}. A menjadi ${LETTERS[key.key.b]}.` };
      case "hill":
        return { cells, active: -1, caption: `Matriks ${key.matrix.length} x ${key.matrix.length}, determinan mod 26 = ${key.determinant}.` };
      case "extended-vigenere":
      case "super": {
        const first = key.key[0]!;
        return {
          cells,
          active: first >> 4,
          caption: `Byte kunci pertama 0x${first.toString(16).toUpperCase().padStart(2, "0")}.`,
        };
      }
    }
  }, [cipher, values]);
}

interface CipherPickerProps {
  active: CipherId;
  locked: boolean;
  keyValues: KeyFormValues;
  onChange: (id: CipherId) => void;
  onContinue: () => void;
}

export function CipherPicker({ active, locked, keyValues, onChange, onContinue }: CipherPickerProps) {
  const detail = DETAILS[active];
  const strip = useSymbolStrip(active, keyValues);
  const alpha = isAlphaCipher(active);

  return (
    <div className="picker">
      <fieldset className="cipher-list">
        <legend className="sr-only">Cipher</legend>
        {CIPHER_IDS.map((id) => {
          const info = INFO[id];
          const infoId = `cipher-info-${id}`;
          return (
            <label key={id} className={`cipher-option${active === id ? " is-active" : ""}`}>
              <input
                type="radio"
                name="cipher"
                value={id}
                checked={active === id}
                disabled={locked}
                onChange={() => onChange(id)}
                aria-describedby={info ? infoId : undefined}
              />
              <span className="cipher-radio" aria-hidden="true" />
              <span className="cipher-icon">
                <CipherIcon id={id} />
              </span>
              <span className="cipher-name">
                {CIPHERS[id].name}
                {info ? (
                  // Klik pada ikon hanya membuka info, tidak ikut memilih cipher.
                  <span className="info-tip" tabIndex={0} onClick={(e) => e.preventDefault()} data-testid={`info-${id}`}>
                    <IconInfo size={16} />
                    <span className="sr-only">Info {CIPHERS[id].name}</span>
                    <span className="info-tip-text" role="tooltip" id={infoId}>
                      {info}
                    </span>
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="cipher-detail" aria-live="polite">
        <div className="cipher-detail-head">
          <span className="cipher-detail-icon">
            <CipherIcon id={active} size={40} />
          </span>
          <div>
            <h3>{CIPHERS[active].name}</h3>
            <p>{detail.description}</p>
          </div>
        </div>

        <div className={`symbol-strip${alpha ? "" : " symbol-strip-bytes"}`} aria-hidden="true">
          {strip.cells.map((cell, i) => (
            <span key={cell} className={i === strip.active ? "is-on" : undefined}>
              {cell}
            </span>
          ))}
        </div>
        <p className="symbol-caption" data-testid="symbol-caption">
          {strip.caption}
        </p>

        <dl className="spec">
          <div>
            <dt>Tipe</dt>
            <dd>{detail.type}</dd>
          </div>
          <div>
            <dt>Alfabet</dt>
            <dd>{detail.alphabet}</dd>
          </div>
          <div>
            <dt>Kunci</dt>
            <dd>{detail.key}</dd>
          </div>
          <div>
            <dt>Masukan</dt>
            <dd>Teks atau file</dd>
          </div>
          <div>
            <dt>Keluaran</dt>
            <dd>{alpha ? "Huruf A-Z, Base64, paket .dat" : "Base64, paket .dat"}</dd>
          </div>
        </dl>

        <button type="button" className="btn btn-accent btn-block" onClick={onContinue}>
          Isi pesan
          <IconPlay size={18} />
        </button>
      </div>
    </div>
  );
}
