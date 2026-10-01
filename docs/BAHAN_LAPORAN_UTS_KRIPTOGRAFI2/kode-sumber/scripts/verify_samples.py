"""Membuka kembali file hasil dekripsi di evidence/samples untuk memastikan
formatnya masih dapat dibaca: teks UTF-8, PNG, SQLite (dengan query), dan WAV.
Video diperiksa terpisah oleh pengujian browser karena membutuhkan dekoder media.
Hasil ditulis ke evidence/format-checks.json.
"""

import json
import sqlite3
import struct
import wave
import zlib
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SAMPLES = ROOT / "evidence" / "samples"


def check_text(path: Path) -> str:
    text = path.read_bytes().decode("utf-8")
    return f"UTF-8 valid, {len(text.splitlines())} baris"


def check_png(path: Path) -> str:
    data = path.read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", "signature PNG salah"
    pos = 8
    width = height = 0
    idat = b""
    while pos < len(data):
        length = struct.unpack(">I", data[pos : pos + 4])[0]
        kind = data[pos + 4 : pos + 8]
        body = data[pos + 8 : pos + 8 + length]
        crc = struct.unpack(">I", data[pos + 8 + length : pos + 12 + length])[0]
        assert zlib.crc32(kind + body) & 0xFFFFFFFF == crc, f"CRC chunk {kind!r} salah"
        if kind == b"IHDR":
            width, height = struct.unpack(">II", body[:8])
        if kind == b"IDAT":
            idat += body
        pos += 12 + length
    raw = zlib.decompress(idat)
    assert len(raw) == height * (1 + width * 3), "ukuran data piksel tidak sesuai"
    return f"PNG valid {width}x{height}, CRC semua chunk cocok"


def check_sqlite(path: Path) -> str:
    con = sqlite3.connect(f"file:{path}?mode=ro", uri=True)
    try:
        integrity = con.execute("PRAGMA integrity_check").fetchone()[0]
        rows = con.execute("SELECT nim, nama, nilai FROM mahasiswa ORDER BY nim").fetchall()
        avg = con.execute("SELECT AVG(nilai) FROM mahasiswa").fetchone()[0]
    finally:
        con.close()
    assert integrity == "ok"
    return f"integrity_check ok, {len(rows)} baris mahasiswa, rata-rata nilai {avg:.1f}"


def check_wav(path: Path) -> str:
    with wave.open(str(path), "rb") as w:
        frames = w.getnframes()
        rate = w.getframerate()
        w.readframes(frames)
    return f"WAV valid, {frames} frame, {rate} Hz, durasi {frames / rate:.2f} detik"


CHECKS = {".txt": check_text, ".png": check_png, ".sqlite": check_sqlite, ".wav": check_wav}

results = []
for path in sorted(SAMPLES.glob("*/pulih-*")):
    check = CHECKS.get(path.suffix)
    if check is None:
        continue
    try:
        detail = check(path)
        ok = True
    except Exception as exc:  # noqa: BLE001
        detail = f"GAGAL: {exc}"
        ok = False
    results.append({"file": path.relative_to(ROOT).as_posix(), "ok": ok, "detail": detail})
    print(("OK   " if ok else "FAIL ") + path.relative_to(ROOT).as_posix() + ": " + detail)

out = {
    "generatedAt": datetime.now(timezone.utc).isoformat(),
    "command": "python scripts/verify_samples.py",
    "checked": len(results),
    "passed": sum(r["ok"] for r in results),
    "results": results,
}
(ROOT / "evidence" / "format-checks.json").write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
if out["passed"] != out["checked"]:
    raise SystemExit(1)
