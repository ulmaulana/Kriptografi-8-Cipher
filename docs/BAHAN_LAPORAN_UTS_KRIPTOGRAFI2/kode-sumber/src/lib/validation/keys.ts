// Validasi dan parsing kunci dari nilai formulir (string) menjadi kunci bertipe.
// Bentuk kunci mengikuti algoritma (PRD 3.4): kata kunci bebas panjang,
// Affine berupa dua bilangan bulat, Hill berupa matriks persegi invertibel.

import { lettersToIndices, normalizeAlphabetic } from "../codecs/alphabet";
import { encodeUtf8 } from "../codecs/utf8";
import { type AffineKey, reduceAffineKey, VALID_AFFINE_A } from "../crypto/affine";
import type { CipherId } from "../crypto/ciphers";
import { UserFacingError } from "../crypto/errors";
import { HILL_MAX_SIZE, hillDeterminantMod26, hillInverseMod26, type Matrix, reduceMatrix } from "../crypto/hill";
import { gcd } from "../crypto/modular";

export interface KeyFormValues {
  /** Kata kunci Vigenere, primer Auto-Key, atau kata kunci Playfair. */
  keyword: string;
  /** Kunci byte Extended Vigenere dan Super Enkripsi. */
  byteKey: string;
  byteKeyFormat: "text" | "hex";
  affineA: string;
  affineB: string;
  hillMatrix: string;
  /** Kata kunci transposisi kolom Super Enkripsi. */
  columnKey: string;
  rotors?: string[];
  ringSettings?: number[];
  initialPositions?: string[];
  reflector?: string;
  plugboard?: string;
}

export type KeyField = keyof KeyFormValues;

export const EMPTY_KEY_VALUES: KeyFormValues = {
  keyword: "",
  byteKey: "",
  byteKeyFormat: "text",
  affineA: "",
  affineB: "",
  hillMatrix: "",
  columnKey: "",
  rotors: ["I", "II", "III"],
  ringSettings: [1, 1, 1],
  initialPositions: ["A", "A", "A"],
  reflector: "B",
  plugboard: "",
};

export type ParsedKey =
  | { cipher: "vigenere"; keyword: Uint8Array }
  | { cipher: "autokey"; primer: Uint8Array }
  | { cipher: "extended-vigenere"; key: Uint8Array }
  | { cipher: "playfair"; keyword: Uint8Array }
  | { cipher: "affine"; key: AffineKey }
  | { cipher: "hill"; matrix: Matrix; inverse: Matrix; determinant: number }
  | { cipher: "super"; key: Uint8Array; columnKey: Uint8Array }
  | { cipher: "enigma-i"; rotors: string[]; ringSettings: number[]; initialPositions: string[]; reflector: string; plugboard: string };

export type KeyErrors = Partial<Record<KeyField, string>>;

export type KeyParseResult = { ok: true; key: ParsedKey; notes: string[] } | { ok: false; errors: KeyErrors };

export class KeyValidationError extends UserFacingError {
  readonly errors: KeyErrors;

  constructor(errors: KeyErrors) {
    super(Object.values(errors)[0] ?? "Kunci tidak valid.", Object.keys(errors)[0]);
    this.name = "KeyValidationError";
    this.errors = errors;
  }
}

export function keyFieldsFor(cipher: CipherId): KeyField[] {
  switch (cipher) {
    case "vigenere":
    case "autokey":
    case "playfair":
      return ["keyword"];
    case "extended-vigenere":
      return ["byteKey", "byteKeyFormat"];
    case "affine":
      return ["affineA", "affineB"];
    case "hill":
      return ["hillMatrix"];
    case "super":
      return ["byteKey", "byteKeyFormat", "columnKey"];
    case "enigma-i":
      return ["rotors", "ringSettings", "initialPositions", "reflector", "plugboard"];
  }
}

type Parsed<T> = { ok: true; value: T; note?: string } | { ok: false; error: string };

function parseAlphaKeyword(raw: string, label: string): Parsed<Uint8Array> {
  if (raw.trim().length === 0) return { ok: false, error: `${label} wajib diisi.` };
  const normalized = normalizeAlphabetic(raw);
  if (normalized.length === 0) {
    return { ok: false, error: `${label} tidak mengandung huruf A-Z sehingga kosong setelah normalisasi.` };
  }
  return { ok: true, value: lettersToIndices(normalized), note: `${label} setelah normalisasi: ${normalized}` };
}

export function parseHexBytes(raw: string): Parsed<Uint8Array> {
  const clean = raw.replace(/0x/gi, "").replace(/[\s,:]/g, "");
  if (clean.length === 0) return { ok: false, error: "Kunci heksadesimal wajib diisi." };
  if (!/^[0-9a-fA-F]+$/.test(clean)) return { ok: false, error: "Kunci heksadesimal hanya boleh berisi 0-9 dan A-F." };
  if (clean.length % 2 !== 0) return { ok: false, error: "Jumlah digit heksadesimal harus genap (dua digit per byte)." };
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(2 * i, 2 * i + 2), 16);
  return { ok: true, value: out };
}

function parseByteKey(raw: string, format: "text" | "hex"): Parsed<Uint8Array> {
  if (format === "hex") {
    const parsed = parseHexBytes(raw);
    if (!parsed.ok) return parsed;
    return { ...parsed, note: `Kunci byte: ${parsed.value.length} byte dari heksadesimal.` };
  }
  const bytes = encodeUtf8(raw);
  if (bytes.length === 0) return { ok: false, error: "Kunci byte wajib diisi (minimal satu byte)." };
  return { ok: true, value: bytes, note: `Kunci byte: ${bytes.length} byte UTF-8, spasi dan kapitalisasi dipertahankan.` };
}

function parseInteger(raw: string, label: string): Parsed<number> {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return { ok: false, error: `${label} wajib diisi.` };
  if (!/^[+-]?\d+$/.test(trimmed)) return { ok: false, error: `${label} harus bilangan bulat.` };
  const value = Number(trimmed);
  if (!Number.isSafeInteger(value)) return { ok: false, error: `${label} terlalu besar.` };
  return { ok: true, value };
}

/**
 * Matriks dapat ditulis per baris (baris baru atau ";" sebagai pemisah baris,
 * spasi atau koma sebagai pemisah elemen) maupun seperti [[6,24,1],[13,16,10],[20,17,15]].
 */
export function parseMatrixText(raw: string): Parsed<Matrix> {
  const rowsText = raw
    .replace(/\[/g, "")
    .split(/[\];\n]/)
    .map((row) => row.replace(/^[\s,]+|[\s,]+$/g, ""))
    .filter((row) => row.length > 0);
  if (rowsText.length === 0) return { ok: false, error: "Matriks Hill wajib diisi." };
  const matrix: Matrix = [];
  for (const rowText of rowsText) {
    const cells = rowText.split(/[\s,]+/);
    const row: number[] = [];
    for (const cell of cells) {
      if (!/^[+-]?\d+$/.test(cell)) return { ok: false, error: `Elemen "${cell}" bukan bilangan bulat.` };
      const value = Number(cell);
      if (!Number.isSafeInteger(value)) return { ok: false, error: `Elemen "${cell}" terlalu besar.` };
      row.push(value);
    }
    matrix.push(row);
  }
  const n = matrix.length;
  if (n < 2) return { ok: false, error: "Matriks Hill minimal berukuran 2 x 2." };
  if (n > HILL_MAX_SIZE) return { ok: false, error: `Batas implementasi: ukuran matriks maksimal ${HILL_MAX_SIZE} x ${HILL_MAX_SIZE}.` };
  for (let r = 0; r < n; r++) {
    if (matrix[r]!.length !== n) {
      return { ok: false, error: `Matriks harus persegi: ada ${n} baris tetapi baris ${r + 1} berisi ${matrix[r]!.length} elemen.` };
    }
  }
  return { ok: true, value: matrix };
}

function formatMatrix(matrix: Matrix): string {
  return `[${matrix.map((row) => `[${row.join(",")}]`).join(",")}]`;
}

export function parseKey(cipher: CipherId, values: KeyFormValues): KeyParseResult {
  const errors: KeyErrors = {};
  const notes: string[] = [];

  switch (cipher) {
    case "enigma-i": {
      const { rotors, ringSettings, initialPositions, reflector } = values;
      if (!rotors || rotors.length !== 3 || rotors.some((r) => !["I", "II", "III", "IV", "V"].includes(r)) || new Set(rotors).size !== 3) {
        errors.rotors = "Pilih tiga rotor berbeda dari I sampai V.";
      }
      if (!ringSettings || ringSettings.length !== 3 || ringSettings.some((r) => !Number.isInteger(r) || r < 1 || r > 26)) {
        errors.ringSettings = "Setiap ring setting harus bilangan bulat 1 sampai 26.";
      }
      if (!initialPositions || initialPositions.length !== 3 || initialPositions.some((p) => !/^[A-Za-z]$/.test(p))) {
        errors.initialPositions = "Setiap posisi awal harus satu huruf A sampai Z.";
      }
      if (reflector !== "B" && reflector !== "C") errors.reflector = "Pilih reflector B atau C.";
      const rawPlugboard = values.plugboard ?? "";
      if (!/^[A-Za-z\s]*$/.test(rawPlugboard)) errors.plugboard = "Plugboard hanya boleh berisi huruf ASCII A-Z dan spasi.";
      const plugboard = rawPlugboard.trim().toUpperCase();
      const pairs = plugboard ? plugboard.split(/\s+/) : [];
      const used = new Set<string>();
      if (pairs.length > 13) errors.plugboard = "Plugboard maksimal 13 pasangan.";
      for (const pair of pairs) {
        if (!/^[A-Z]{2}$/.test(pair) || pair[0] === pair[1] || used.has(pair[0]!) || used.has(pair[1]!)) {
          errors.plugboard = "Gunakan pasangan seperti AB CD. Setiap huruf hanya boleh dipakai sekali, tanpa pasangan AA.";
          break;
        }
        used.add(pair[0]!);
        used.add(pair[1]!);
      }
      if (Object.keys(errors).length) return { ok: false, errors };
      return { ok: true, key: { cipher, rotors: [...rotors!], ringSettings: [...ringSettings!], initialPositions: initialPositions!.map((p) => p.toUpperCase()), reflector: reflector!, plugboard }, notes: [] };
    }
    case "vigenere":
    case "autokey":
    case "playfair": {
      const label = cipher === "autokey" ? "Primer" : "Kata kunci";
      const parsed = parseAlphaKeyword(values.keyword, label);
      if (!parsed.ok) return { ok: false, errors: { keyword: parsed.error } };
      if (parsed.note) notes.push(parsed.note);
      if (cipher === "vigenere") return { ok: true, key: { cipher, keyword: parsed.value }, notes };
      if (cipher === "autokey") return { ok: true, key: { cipher, primer: parsed.value }, notes };
      return { ok: true, key: { cipher, keyword: parsed.value }, notes };
    }
    case "extended-vigenere": {
      const parsed = parseByteKey(values.byteKey, values.byteKeyFormat);
      if (!parsed.ok) return { ok: false, errors: { byteKey: parsed.error } };
      if (parsed.note) notes.push(parsed.note);
      return { ok: true, key: { cipher, key: parsed.value }, notes };
    }
    case "affine": {
      const a = parseInteger(values.affineA, "Nilai a");
      const b = parseInteger(values.affineB, "Nilai b");
      if (!a.ok) errors.affineA = a.error;
      if (!b.ok) errors.affineB = b.error;
      if (!a.ok || !b.ok) return { ok: false, errors };
      const key = reduceAffineKey(a.value, b.value);
      if (gcd(key.a, 26) !== 1) {
        return {
          ok: false,
          errors: {
            affineA: `a = ${a.value} (mod 26 = ${key.a}) tidak relatif prima terhadap 26. Nilai a yang valid: ${VALID_AFFINE_A.join(", ")}.`,
          },
        };
      }
      if (key.a !== a.value || key.b !== b.value) notes.push(`Kunci direduksi modulo 26: a = ${key.a}, b = ${key.b}.`);
      return { ok: true, key: { cipher, key }, notes };
    }
    case "hill": {
      const parsed = parseMatrixText(values.hillMatrix);
      if (!parsed.ok) return { ok: false, errors: { hillMatrix: parsed.error } };
      const matrix = reduceMatrix(parsed.value);
      const determinant = hillDeterminantMod26(matrix);
      const inverse = hillInverseMod26(matrix);
      if (!inverse) {
        return {
          ok: false,
          errors: {
            hillMatrix: `Determinan mod 26 = ${determinant}, tidak relatif prima terhadap 26 sehingga matriks tidak mempunyai invers.`,
          },
        };
      }
      notes.push(`Matriks ${matrix.length} x ${matrix.length} mod 26: ${formatMatrix(matrix)}, determinan mod 26 = ${determinant}.`);
      notes.push(`Invers modulo 26: ${formatMatrix(inverse)}.`);
      return { ok: true, key: { cipher, matrix, inverse, determinant }, notes };
    }
    case "super": {
      const byteKey = parseByteKey(values.byteKey, values.byteKeyFormat);
      const columnKey = parseAlphaKeyword(values.columnKey, "Kata kunci kolom");
      if (!byteKey.ok) errors.byteKey = byteKey.error;
      if (!columnKey.ok) errors.columnKey = columnKey.error;
      if (!byteKey.ok || !columnKey.ok) return { ok: false, errors };
      if (byteKey.note) notes.push(byteKey.note);
      if (columnKey.note) notes.push(columnKey.note);
      return { ok: true, key: { cipher, key: byteKey.value, columnKey: columnKey.value }, notes };
    }
  }
}

export function parseKeyOrThrow(cipher: CipherId, values: KeyFormValues): { key: ParsedKey; notes: string[] } {
  const result = parseKey(cipher, values);
  if (!result.ok) throw new KeyValidationError(result.errors);
  return { key: result.key, notes: result.notes };
}
