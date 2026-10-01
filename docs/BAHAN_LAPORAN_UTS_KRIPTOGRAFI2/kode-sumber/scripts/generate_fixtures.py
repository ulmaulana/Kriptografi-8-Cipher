"""Membuat fixture teks, gambar, database, dan audio yang valid di folder fixtures/.

Semua isi bersifat sintetis dan aman dibagikan. Video dibuat terpisah oleh
scripts/generate-video.mjs karena membutuhkan encoder browser.
"""

import math
import sqlite3
import struct
import wave
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "fixtures"
OUT.mkdir(exist_ok=True)


def write_text() -> None:
    text = (
        "Contoh berkas teks untuk UTS Kriptografi.\n"
        "Baris kedua memuat angka 1234567890 dan tanda baca: ,.;:!?()[]{}\n"
        "Karakter multibyte: café, naïve, 漢字, Ελληνικά, emoji 🔐🗝️\n"
        "\tBaris dengan tab dan spasi di akhir.   \n"
        "SERANG PUKUL 10.30 DI GERBANG TIMUR\n"
    )
    (OUT / "teks-contoh.txt").write_bytes(text.encode("utf-8"))


def png_chunk(kind: bytes, data: bytes) -> bytes:
    crc = zlib.crc32(kind + data) & 0xFFFFFFFF
    return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", crc)


def write_png() -> None:
    width, height = 96, 64
    rows = []
    for y in range(height):
        row = bytearray([0])  # filter type 0
        for x in range(width):
            r = int(255 * x / (width - 1))
            g = int(255 * y / (height - 1))
            b = 255 if (x // 12 + y // 12) % 2 == 0 else 60
            row += bytes([r, g, b])
        rows.append(bytes(row))
    raw = b"".join(rows)
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + png_chunk(b"IHDR", ihdr) + png_chunk(b"IDAT", zlib.compress(raw, 9)) + png_chunk(b"IEND", b"")
    (OUT / "gambar-contoh.png").write_bytes(png)


def write_sqlite() -> None:
    path = OUT / "database-contoh.sqlite"
    if path.exists():
        path.unlink()
    con = sqlite3.connect(path)
    con.execute("CREATE TABLE mahasiswa (nim TEXT PRIMARY KEY, nama TEXT NOT NULL, nilai INTEGER NOT NULL)")
    rows = [
        ("A11.2023.00001", "Andi Pratama", 88),
        ("A11.2023.00002", "Budi Santoso", 76),
        ("A11.2023.00003", "Citra Lestari", 92),
        ("A11.2023.00004", "Dewi Anggraini", 81),
        ("A11.2023.00005", "Eko Saputra", 69),
    ]
    con.executemany("INSERT INTO mahasiswa VALUES (?, ?, ?)", rows)
    con.execute("CREATE TABLE mata_kuliah (kode TEXT PRIMARY KEY, nama TEXT NOT NULL, sks INTEGER NOT NULL)")
    con.execute("INSERT INTO mata_kuliah VALUES ('IF4020', 'Kriptografi', 3)")
    con.commit()
    con.close()


def write_wav() -> None:
    rate = 8000
    seconds = 1.0
    frames = bytearray()
    for i in range(int(rate * seconds)):
        t = i / rate
        envelope = min(1.0, t * 20) * min(1.0, (seconds - t) * 20)
        sample = 0.35 * math.sin(2 * math.pi * 440 * t) + 0.25 * math.sin(2 * math.pi * 660 * t)
        frames += struct.pack("<h", int(32767 * envelope * sample))
    with wave.open(str(OUT / "audio-contoh.wav"), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(bytes(frames))


if __name__ == "__main__":
    write_text()
    write_png()
    write_sqlite()
    write_wav()
    for f in sorted(OUT.iterdir()):
        print(f"{f.name}: {f.stat().st_size} byte")
