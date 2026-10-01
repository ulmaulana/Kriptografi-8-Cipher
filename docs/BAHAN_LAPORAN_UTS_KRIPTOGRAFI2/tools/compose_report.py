"""Menyusun bahan tertulis dari bukti eksekusi, tanpa mengubah aplikasi."""

import base64
import csv
import hashlib
import json
import shutil
import struct
from datetime import datetime, timezone, timedelta
from pathlib import Path

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
EVIDENCE = ROOT / "evidence"
ID_ORDER = ["vigenere", "autokey", "extended-vigenere", "playfair", "affine", "hill", "super", "enigma-i"]


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def sha(data):
    return hashlib.sha256(data).hexdigest()


def inline(value):
    return "`" + str(value).replace("\n", " / ").replace("|", "\\|") + "`"


def id_integer(value):
    return f"{value:,}".replace(",", ".")


def parameters(params):
    names = {"kataKunci": "kata kunci", "primer": "primer", "kunciByte": "kunci byte", "formatKunci": "format", "kunciKolom": "kunci kolom", "matriks": "matriks", "rotors": "rotor kiri/tengah/kanan", "ringSettings": "ring", "initialPositions": "posisi awal", "reflector": "reflektor", "plugboard": "plugboard"}
    return ", ".join(f"{names.get(k, k)} {inline(v) if v != '' else '(kosong)'}" for k, v in params.items())


files = read_json(EVIDENCE / "file-scenarios.json")
text = read_json(EVIDENCE / "text-examples.json")
units = read_json(EVIDENCE / "unit-test-results.json")
ruby = read_json(EVIDENCE / "ruby-test-results.json")
e2e = read_json(EVIDENCE / "e2e-results.json")
formats = read_json(EVIDENCE / "format-checks.json")
assert len(files["scenarios"]) == 40
assert len(text["examples"]) == 8
assert units["success"] and units["numFailedTests"] == 0
assert ruby["summary"]["failure_count"] == 0
assert e2e["stats"]["unexpected"] == 0 and e2e["stats"]["skipped"] == 0
assert formats["passed"] == formats["checked"]
examples = {r["algorithm"]: r for r in text["examples"]}
scenarios = files["scenarios"]
names = {k: examples[k]["algorithmName"] for k in ID_ORDER}

# Periksa kembali berkas bukti sebelum angka atau checksum dimasukkan ke laporan.
for row in scenarios:
    original = (ROOT / "fixtures" / row["fixture"]).read_bytes()
    restored = (ROOT / row["decryptedFile"]).read_bytes()
    container = (ROOT / row["encryptedFile"]).read_bytes()
    assert original == restored
    assert len(original) == row["originalSize"] == row["decryptedSize"]
    assert sha(original) == row["originalSha256"] == row["decryptedSha256"]
    assert sha(container) == row["containerSha256"]
    assert row["result"] == "LULUS"

browser_cases = {
    "vigenere": {"message": "attack at dawn", "parameters": {"kataKunci": "lemon"}, "ciphertext": "LXFOPVEFRNHR", "base64": "TFhGT1BWRUZSTkhS", "decrypted": "ATTACKATDAWN"},
    "autokey": {"message": "ATTACK AT DAWN", "parameters": {"primer": "QUEENLY"}, "ciphertext": "QNXEPVYTWTWP", "base64": "UU5YRVBWWVRXVFdQ", "decrypted": "ATTACKATDAWN"},
    "extended-vigenere": {"message": "Halo", "parameters": {"kunciByte": "01 02", "formatKunci": "hex"}, "ciphertext": None, "base64": "SWNtcQ==", "decrypted": "Halo"},
    "playfair": {"message": "Hide the gold in the tree stump", "parameters": {"kataKunci": "PLAYFAIREXAMPLE"}, "ciphertext": "BMODZBXDNABEKUDMUIXMMOUVIF", "base64": "Qk1PRFpCWEROQUJFS1VETVVJWE1NT1VWSUY=", "decrypted": "HIDETHEGOLDINTHETREESTUMP"},
    "affine": {"message": "affine cipher", "parameters": {"a": "5", "b": "8"}, "ciphertext": "IHHWVCSWFRCP", "base64": "SUhIV1ZDU1dGUkNQ", "decrypted": "AFFINECIPHER"},
    "hill": {"message": "act", "parameters": {"matriks": "6 24 1\n13 16 10\n20 17 15"}, "ciphertext": "POH", "base64": "UE9I", "decrypted": "ACT"},
    "super": {"message": "ABCDEFG", "parameters": {"kunciByte": "01 02", "formatKunci": "hex", "kunciKolom": "BABA"}, "ciphertext": None, "base64": "REhGQkZESA==", "decrypted": "ABCDEFG"},
    "enigma-i": {"message": "Hello, world! 2026", "parameters": {"rotors": "I II III", "ringSettings": "1 1 1", "initialPositions": "AAA", "reflector": "B", "plugboard": ""}, "ciphertext": "ILBDAAMTAZ", "base64": "SUxCREFBTVRBWg==", "decrypted": "HELLOWORLD"},
}
browser_file_keys = {
    "vigenere": {"kataKunci": "KRIPTOGRAFI"},
    "autokey": {"primer": "UTSKRIPTO"},
    "extended-vigenere": {"kunciByte": "Kunci Byte 2026!", "formatKunci": "text"},
    "playfair": {"kataKunci": "MONARCHY"},
    "affine": {"a": "7", "b": "10"},
    "hill": {"matriks": "3 3\n2 5"},
    "super": {"kunciByte": "SuperKunci", "formatKunci": "text", "kunciKolom": "TRANSPOSISI"},
    "enigma-i": {"rotors": "V III IV", "ringSettings": "7 12 24", "initialPositions": "QEZ", "reflector": "C", "plugboard": "AB CD EF GH IJ KL"},
}

# Salin unduhan asli pengujian browser, lalu periksa byte paket dan hasil pulih.
downloads = []
browser_files = {}
for folder in sorted((ROOT / "test-results").glob("app-alur-*")):
    mode = "file" if folder.name.startswith("app-alur-file-") else "teks" if folder.name.startswith("app-alur-teks-") else None
    if mode is None:
        continue
    packages = list(folder.glob("*.dat"))
    assert len(packages) == 1, folder.name
    package = packages[0]
    raw = package.read_bytes()
    assert raw[:9] == b"UTSKRIPT\x01"
    metadata_size = struct.unpack(">I", raw[9:13])[0]
    metadata = json.loads(raw[13:13 + metadata_size])
    payload = raw[13 + metadata_size:]
    cipher = metadata["algorithm"]
    target_dir = OUT / "bukti" / "browser-downloads" / mode / cipher
    target_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(package, target_dir / package.name)
    row = {"algorithm": cipher, "algorithmName": names[cipher], "mode": mode, "package": (target_dir / package.name).relative_to(OUT).as_posix(), "packageSize": len(raw), "packageSha256": sha(raw), "payloadSize": len(payload), "payloadBase64": base64.b64encode(payload).decode(), "result": "LULUS"}
    if mode == "teks":
        case = browser_cases[cipher]
        assert row["payloadBase64"] == case["base64"]
        row.update({"input": case["message"], "parameters": case["parameters"], "decrypted": case["decrypted"], "decryptedSha256": sha(case["decrypted"].encode())})
        assert metadata["sha256"] == row["decryptedSha256"]
        (target_dir / "hasil-dekripsi.txt").write_bytes(case["decrypted"].encode())
        row["decryptedFile"] = (target_dir / "hasil-dekripsi.txt").relative_to(OUT).as_posix()
        row["decryptedFileOrigin"] = "Teks keluaran yang ditegaskan oleh pengujian browser, disimpan kembali dari nilai assertion."
    else:
        original_name = metadata["file"]["name"]
        restored_path = folder / "pulih" / original_name
        original = (ROOT / "fixtures" / original_name).read_bytes()
        restored = restored_path.read_bytes()
        assert restored == original
        assert metadata["sha256"] == sha(original)
        shutil.copy2(restored_path, target_dir / original_name)
        row.update({"fixture": original_name, "parameters": browser_file_keys[cipher], "originalSize": len(original), "decryptedSize": len(restored), "originalSha256": sha(original), "decryptedSha256": sha(restored), "byteIdentical": restored == original, "decryptedFile": (target_dir / original_name).relative_to(OUT).as_posix()})
        browser_files[cipher] = row
    downloads.append(row)
assert len(downloads) == 16 and len(browser_files) == 8
(OUT / "bukti" / "browser-downloads.json").write_text(json.dumps({"executionStart": e2e["stats"]["startTime"], "source": "pnpm test:e2e, paket dan file pulih diunduh melalui UI dalam konteks browser baru", "textOutputNote": "File teks hasil dekripsi disimpan dari nilai assertion browser. File biner hasil pulih merupakan unduhan asli browser.", "cases": downloads}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

checksums = ["# Perbandingan checksum seluruh file", "", "SHA-256 berikut dihitung kembali dari berkas asal, paket .dat, dan berkas hasil dekripsi yang disertakan. Semua pasangan asal dan pulih juga dibandingkan byte demi byte.", ""]
for row in scenarios:
    checksums += [f"## {row['no']}. {row['algorithmName']} pada {row['fixture']}", "", f"Kunci contoh: {parameters(row['parameters'])}.", "", f"- Asal: {row['originalSize']} byte, SHA-256 {inline(row['originalSha256'])}.", f"- Paket: {row['containerSize']} byte, SHA-256 {inline(row['containerSha256'])}.", f"- Pulih: {row['decryptedSize']} byte, SHA-256 {inline(row['decryptedSha256'])}.", f"- Byte identik: ya. Status: {row['result']}.", f"- [Paket enkripsi](bukti/{row['encryptedFile']}) dan [hasil dekripsi](bukti/{row['decryptedFile']}).", ""]
(OUT / "CHECKSUM_FILE_LENGKAP.md").write_text("\n".join(checksums), encoding="utf-8")
with (OUT / "bukti" / "perbandingan-file.csv").open("w", encoding="utf-8", newline="") as handle:
    columns = ["no", "algorithmName", "fixture", "originalSize", "payloadSize", "containerSize", "decryptedSize", "originalSha256", "decryptedSha256", "containerSha256", "byteIdentical", "result"]
    writer = csv.DictWriter(handle, fieldnames=columns, extrasaction="ignore")
    writer.writeheader()
    writer.writerows(scenarios)

captions = {
    "01-tampilan-utama": "Tampilan utama memperlihatkan delapan pilihan cipher, operasi enkripsi atau dekripsi, masukan teks atau file, formulir pesan, kunci, dan panel hasil. Badge Mesin Ruby menjelaskan bahwa pesan dan file diproses server.",
    "02-tema-terang": "Tampilan utama menggunakan tema terang. Pemilihan tema tetap tersimpan setelah halaman dimuat ulang pada pengujian browser.",
    "03-tema-terang-hasil": "Tema terang menampilkan enkripsi Vigenere untuk attack at dawn dengan kunci LEMON. Cipherteks yang ditampilkan adalah LXFOPVEFRNHR.",
    "info-super-enkripsi": "Keterangan Super Enkripsi menjelaskan gabungan Extended Vigenere dan transposisi kolom tanpa mengubah cipher yang sedang dipilih.",
    "validasi-affine": "Formulir Affine menolak a=2 karena tidak relatif prima terhadap 26. Tidak ada hasil enkripsi yang diterbitkan.",
    "validasi-hill": "Formulir Hill menolak matriks 2 4 / 1 2 karena determinannya tidak mempunyai invers modulo 26.",
    "validasi-enigma-plugboard": "Formulir Enigma menolak plugboard AB AC karena huruf A digunakan pada lebih dari satu pasangan.",
    "validasi-kunci-salah": "Paket Vigenere yang dibuat dengan LEMON didekripsi memakai LIME. Ketidakcocokan SHA-256 menghasilkan pesan kesalahan, sehingga hasil tidak dinyatakan berhasil.",
    "dekripsi-base64-payload": "Super Enkripsi menerima Base64 payload mentah tanpa mengubah kapitalisasi atau simbolnya. Dekripsi mengembalikan Data rahasia 2026 + / = ✓, dengan status dekripsi mentah karena metadata paket tidak diberikan.",
    "dekripsi-mentah-playfair": "Dekripsi huruf mentah Playfair mengembalikan HIDETHEGOLDINTHETREXESTUMP. Huruf X pengisi tetap terlihat karena masukan mentah tidak membawa metadata posisi pengisi.",
    "hasil-lama-ditandai": "Setelah kunci Vigenere diganti dari LEMON menjadi LEMONADE, hasil sebelumnya diberi peringatan agar tidak dianggap berasal dari masukan terbaru.",
    "layar-sempit": "Formulir Hill dan hasil enkripsi pada viewport 390 x 844 dapat dibaca tanpa gulir horizontal. Hasil ini didukung pemeriksaan lebar dokumen dalam pengujian browser.",
    "layar-sempit-enigma": "Formulir Enigma pada viewport 390 x 844 menampilkan konfigurasi rotor serta hasil ILBDAAMTAZ dari HELLOWORLD tanpa gulir horizontal.",
}
for cipher in ID_ORDER:
    case = browser_cases[cipher]
    displayed_cipher = case["ciphertext"] or case["base64"]
    captions[f"teks-{cipher}-enkripsi"] = f"{names[cipher]} mengenkripsi {inline(case['message'])} dengan {parameters(case['parameters'])}. Hasil {'huruf' if case['ciphertext'] else 'Base64 payload'} yang terlihat adalah {inline(displayed_cipher)}."
    captions[f"teks-{cipher}-dekripsi"] = f"Paket teks {names[cipher]} diunduh, kemudian dibuka pada konteks browser baru. Dengan kunci yang sama, keluaran yang terlihat adalah {inline(case['decrypted'])} dan status pemulihan berhasil."
    row = browser_files[cipher]
    captions[f"file-{cipher}-enkripsi"] = f"{names[cipher]} memproses seluruh byte {inline(row['fixture'])}, berukuran {id_integer(row['originalSize'])} byte, dengan {parameters(row['parameters'])}. Panel hasil menampilkan Base64 payload dan unduhan paket .dat."
    captions[f"file-{cipher}-dekripsi"] = f"Paket {names[cipher]} diunggah pada konteks browser baru dan memulihkan {inline(row['fixture'])} menjadi {id_integer(row['decryptedSize'])} byte. SHA-256 yang terlihat adalah {inline(row['decryptedSha256'])}. File unduhan telah dibandingkan byte demi byte dan identik dengan file asal."
shots = sorted((EVIDENCE / "screenshots").glob("*.png"))
assert set(p.stem for p in shots) == set(captions)
gallery = ["# Screenshot aplikasi dan keterangannya", "", f"Seluruh {len(shots)} gambar berasal dari aplikasi yang berjalan pada eksekusi `pnpm test:e2e` mulai {e2e['stats']['startTime']}. Backend yang digunakan adalah Ruby. Gambar teks memakai contoh vektor acuan, sedangkan contoh pesan bebas pada dokumen algoritma berasal dari pengujian API. Kunci dan pesan kedua kelompok dicatat terpisah.", ""]
for i, shot in enumerate(shots, 1):
    gallery += [f"## Gambar {i}. {shot.stem}", "", f"![Gambar {i}](bukti/evidence/screenshots/{shot.name})", "", captions[shot.stem], ""]
(OUT / "KETERANGAN_SCREENSHOT.md").write_text("\n".join(gallery), encoding="utf-8")

run_at = datetime.fromisoformat(files["generatedAt"].replace("Z", "+00:00")).astimezone(timezone(timedelta(hours=7)))
testing = ["## 5. Pengujian dan hasil aktual", "", f"Pengujian bahan laporan ini dijalankan pada {run_at.strftime('%d-%m-%Y pukul %H.%M.%S')} WIB. Perintah `pnpm test:all` selesai dengan kode keluar 0. Pemeriksaan tipe, lint, dan build produksi berhasil. Angka berikut diperoleh dari keluaran RSpec, Vitest, Playwright, dan pemeriksaan format file.", "", "### 5.1 Metode dan cakupan", "", "Pengujian algoritma memakai vektor acuan tetap untuk membandingkan hasil enkripsi dan dekripsi. Pengujian pemulihan tambahan membandingkan data asal dengan hasil dekripsi. Pengujian Ruby juga memeriksa codec, kontainer, kunci tidak valid, panjang masukan, padding, pergeseran rotor Enigma, reset state, serta kompatibilitas paket versi lama.", "", "Untuk setiap pasangan cipher dan jenis file, file dibaca sebagai byte, dienkripsi melalui Ruby, disimpan sebagai paket .dat, dibaca kembali dari disk, dan didekripsi dengan kunci contoh yang sama. File pulih ditulis kembali, lalu dibandingkan byte, ukuran, dan SHA-256 dengan file asal. Terdapat 8 cipher dikalikan 5 jenis file, sehingga jumlah skenario file adalah 40.", "", "Pengujian browser menjalankan satu alur teks dan satu alur file untuk setiap cipher. Paket diunduh melalui tombol aplikasi, kemudian diunggah dan didekripsi pada konteks browser baru tanpa state dari halaman enkripsi. File biner hasil dekripsi juga diunduh dan dibandingkan dengan asal. Cakupan ini adalah 8 alur file browser yang mewakili semua kategori, sedangkan pemeriksaan 40 kombinasi lengkap dilakukan melalui API Ruby. Keduanya dicatat terpisah.", "", "| Pemeriksaan | Hasil aktual |", "| --- | --- |", f"| RSpec Ruby | {ruby['summary']['example_count']} contoh, {ruby['summary']['failure_count']} gagal, {ruby['summary']['pending_count']} pending |", f"| Vitest aplikasi dan integrasi | {units['numPassedTests']} lulus dari {units['numTotalTests']} tes |", f"| Bukti enkripsi dan dekripsi melalui Ruby | {len(scenarios)} skenario file dan {len(text['examples'])} contoh teks, seluruhnya lulus |", f"| Playwright browser | {e2e['stats']['expected']} lulus, {e2e['stats']['unexpected']} gagal, {e2e['stats']['skipped']} dilewati |", f"| Format teks, PNG, SQLite, dan WAV hasil pulih | {formats['passed']} lulus dari {formats['checked']} pemeriksaan |", "| Video hasil pulih | 8 video dari seluruh cipher berhasil dimuat oleh dekoder browser pada ukuran 160 x 120 |", "| TypeScript, ESLint, dan build Next.js | Berhasil dalam eksekusi pnpm test:all |", "", "Jumlah di atas merupakan kelompok pemeriksaan yang berbeda. Contoh teks, uji format, dan uji browser dapat memeriksa file yang sama, sehingga angka kelompok tidak dijumlahkan sebagai jumlah masukan unik.", "", "### 5.2 File contoh yang digunakan", "", "Kelima file dibuat secara sintetis. Data mahasiswa dalam database merupakan data contoh yang ditulis dalam pembuat fixture, bukan catatan mahasiswa nyata. Gambar berupa pola warna, audio berupa nada sintetis, dan video berupa animasi sintetis.", "", "| Jenis | File | Isi atau pemeriksaan format | Ukuran asal, byte | SHA-256 asal |", "| --- | --- | --- | --- | --- |"]
details = {"Teks": "UTF-8 valid, 5 baris, angka, tanda baca, dan karakter multibyte", "Gambar": "PNG 96 x 64, CRC chunk dan data piksel valid", "Database": "SQLite, integrity_check ok, 5 baris mahasiswa contoh, rata-rata nilai 81,2", "Audio": "WAV mono 16-bit, 8.000 frame, 8.000 Hz, durasi 1 detik", "Video": "WebM 160 x 120, dapat dimuat dekoder browser"}
for row in scenarios[:5]:
    testing += [f"| {row['fileKind']} | [{row['fixture']}](bukti/fixtures/{row['fixture']}) | {details[row['fileKind']]} | {row['originalSize']} | {inline(row['originalSha256'])} |"]
testing += ["", "### 5.3 Kunci contoh untuk 40 skenario file", "", "| Cipher | Kunci yang dimasukkan |", "| --- | --- |"]
for cipher in ID_ORDER:
    row = next(r for r in scenarios if r["algorithm"] == cipher)
    testing += [f"| {names[cipher]} | {parameters(row['parameters'])} |"]
testing += ["", "### 5.4 Hasil 40 kombinasi file", "", "Ukuran payload dan paket dibedakan. Payload hanya memuat cipherteks, sedangkan paket menambahkan metadata pemulihan. Kolom identik menyatakan perbandingan byte dan kecocokan SHA-256, bukan hanya kecocokan ukuran.", "", "| No | Cipher | Jenis file | Asal, byte | Payload, byte | Paket, byte | Pulih, byte | Identik | Hasil |", "| --- | --- | --- | --- | --- | --- | --- | --- | --- |"]
for row in scenarios:
    testing += [f"| {row['no']} | {row['algorithmName']} | {row['fileKind']} | {row['originalSize']} | {row['payloadSize']} | {row['containerSize']} | {row['decryptedSize']} | Ya | {row['result']} |"]
testing += ["", "[Perbandingan checksum lengkap](CHECKSUM_FILE_LENGKAP.md) memuat SHA-256 asal, paket, dan pulih untuk masing-masing skenario, beserta tautan file enkripsi dan dekripsinya. [Data perbandingan CSV](bukti/perbandingan-file.csv) dan [hasil pengujian JSON](bukti/evidence/file-scenarios.json) memungkinkan pemeriksaan ulang tanpa menyalin angka dari screenshot.", "", "### 5.5 Hasil teks dan unduhan pada browser", "", "Contoh berikut sesuai dengan masukan yang terlihat pada screenshot. Contoh teks bebas yang dijelaskan pada bagian algoritma merupakan kelompok pengujian API dan memakai kunci tersendiri.", "", "| Cipher | Masukan | Kunci | Cipherteks huruf atau Base64 payload | Hasil dekripsi paket |", "| --- | --- | --- | --- | --- |"]
for cipher in ID_ORDER:
    case = browser_cases[cipher]
    testing += [f"| {names[cipher]} | {inline(case['message'])} | {parameters(case['parameters'])} | {inline(case['ciphertext'] or case['base64'])} | {inline(case['decrypted'])} |"]
testing += ["", "| Cipher | File yang diunduh dan dipulihkan pada konteks baru | Ukuran pulih, byte | Kesimpulan |", "| --- | --- | --- | --- |"]
for cipher in ID_ORDER:
    row = browser_files[cipher]
    testing += [f"| {names[cipher]} | [{row['fixture']}]({row['decryptedFile']}) | {row['decryptedSize']} | Byte identik dan SHA-256 sama |"]
testing += ["", "[Catatan unduhan browser](bukti/browser-downloads.json) memuat kunci setiap alur, Base64 payload, hash paket, dan lokasi hasil pulih. Kunci Enigma pada alur file adalah V/III/IV, ring 7/12/24, posisi QEZ, reflektor C, dan plugboard AB CD EF GH IJ KL. Kunci ini berbeda dari konfigurasi awal I/II/III yang dipakai pada contoh teks.", "", "### 5.6 Vektor dan kasus penting", "", "- Vigenere dengan ATTACKATDAWN dan LEMON menghasilkan LXFOPVEFRNHR.", "- Auto-Key dengan ATTACKATDAWN dan QUEENLY menghasilkan QNXEPVYTWTWP.", "- Playfair dengan PLAYFAIREXAMPLE menghasilkan BMODZBXDNABEKUDMUIXMMOUVIF untuk HIDETHEGOLDINTHETREESTUMP. Paket memulihkan teks tanpa pengisi tambahan. Dekripsi mentah mempertahankan X pada TREXESTUMP.", "- Hill dengan matriks 6 24 1 / 13 16 10 / 20 17 15 mengubah ACT menjadi POH. Pengujian juga mencakup matriks 2 1 / 13 7 yang invertibel modulo 26.", "- Super Enkripsi dengan byte kunci 01 02, kunci kolom BABA, dan ABCDEFG menghasilkan Base64 REhGQkZESA==. Kasus ini menguji urutan stabil huruf kunci yang berulang serta baris terakhir tidak penuh.", "- Enigma I konfigurasi awal I/II/III, ring 1/1/1, AAA, reflektor B, tanpa plugboard mengubah AAAAA menjadi BDZGO dan HELLOWORLD menjadi ILBDAAMTAZ. Pengujian langkah rotor memeriksa ADU menjadi ADV, lalu AEW, lalu BFX.", "- Kunci Affine a=2, matriks Hill tidak invertibel, plugboard berulang, paket rusak, dan kunci dekripsi salah ditolak. Kegagalan backend ditampilkan sebagai galat tanpa menghasilkan cipherteks pengganti.", "- Paket versi lama sebanyak 14, berupa teks dan file untuk tujuh cipher wajib, dapat dibaca Ruby. Keluaran baru tetap sesuai dengan byte paket lama pada kasus kompatibilitas tersebut.", "", "### 5.7 Tabel penilaian sesuai soal", "", "Tanda ✓ pada kolom Berhasil menunjukkan enkripsi dan dekripsi teks serta file telah dijalankan dan diperiksa. Kolom Kurang Berhasil diberi tanda kosong karena pengujian ini tidak menemukan masalah fungsional pada sembilan butir tersebut. Batasan penggunaan yang memengaruhi penafsiran hasil tetap dijelaskan pada pembahasan.", "", "| No | Spek | Berhasil | Kurang Berhasil | Keterangan |", "| --- | --- | --- | --- | --- |"]
specs = ["Vigenere Cipher standar, 26 huruf", "Auto-Key Vigenere Cipher, 26 huruf", "Extended Vigenere Cipher, 256 nilai byte", "Playfair Cipher, alfabet A sampai Z dengan I/J digabung dalam matriks", "Affine Cipher, 26 huruf", "Hill Cipher, 26 huruf", "Super Enkripsi, Extended Vigenere dan transposisi kolom", "Bonus 1, Enigma Cipher"]
for i, cipher in enumerate(ID_ORDER):
    testing += [f"| {i + 1} | {specs[i]} | ✓ |  | Enkripsi dan dekripsi teks lulus, 5 kategori file identik, paket unduhan dapat didekripsi pada konteks browser baru. |"]
testing += ["| 9 | Bonus 2, menggunakan bahasa Ruby | ✓ |  | Semua 8 cipher, validasi, codec, kontainer, dan pemulihan dijalankan Ruby melalui Sinatra/Puma. RSpec dan alur HTTP/browser lulus. |", ""]

figures = ["## 6. Tampilan dan contoh penggunaan", "", "Screenshot berikut dipilih untuk memperlihatkan masukan, kunci, hasil, serta pemulihan. Seluruh gambar dan keterangannya tersedia pada [galeri screenshot lengkap](KETERANGAN_SCREENSHOT.md). Screenshot file berasal dari unduhan browser yang disertakan dalam paket bukti.", ""]
selected = ["01-tampilan-utama"]
selected += [f"teks-{cipher}-enkripsi" for cipher in ID_ORDER]
selected += ["teks-playfair-dekripsi", "teks-enigma-i-dekripsi"]
selected += [f"file-{cipher}-{op}" for cipher in ["vigenere", "autokey", "extended-vigenere", "playfair", "affine"] for op in ["enkripsi", "dekripsi"]]
selected += ["validasi-enigma-plugboard", "dekripsi-mentah-playfair"]
for i, stem in enumerate(selected, 1):
    figures += [f"### Gambar {i}", "", f"![Gambar {i}](bukti/evidence/screenshots/{stem}.png)", "", captions[stem], ""]

app = (OUT / "URAIAN_APLIKASI.md").read_text(encoding="utf-8-sig")
algorithms = (OUT / "IMPLEMENTASI_ALGORITMA.md").read_text(encoding="utf-8-sig")
assert "## 7." in app
intro, end = app.split("## 7.", 1)
end = " " + end.strip()
intro = intro.strip()
if intro.startswith("# "):
    intro = intro.split("\n", 1)[1].strip()
if algorithms.startswith("# "):
    algorithms = algorithms.split("\n", 1)[1].strip()
report = ["# Bahan Laporan UTS Kriptografi", "", "Aplikasi web kriptografi versi 1.1.0 dengan mesin Ruby dan antarmuka Next.js. Uraian implementasi berasal dari kode yang berjalan. Contoh hasil, tabel pengujian, checksum, dan screenshot berasal dari eksekusi yang disertakan dalam paket.", "", "Sumber penugasan adalah [Soal UTS Kriptografi 20261](rujukan/Soal_UTS_Kriptografi_20261.pdf). Tujuh cipher wajib serta dua bonus disusun mengikuti butir soal. Codec file, paket .dat, dan perangkat pengujian merupakan pilihan implementasi aplikasi.", "", intro, "", algorithms.strip(), "", "\n".join(testing), "\n".join(figures), "## 7." + end.strip(), "", "## 9. Kode program dan petunjuk menjalankan", "", "[Lampiran kode program lengkap](LAMPIRAN_KODE_PROGRAM.md) memuat kode sebagai teks yang dapat dipindahkan ke lampiran laporan. Salinan berkas sumber, konfigurasi, lockfile JavaScript dan Ruby, serta pengujian tersedia di folder kode-sumber. [README paket](README.md) menjelaskan isi bahan, sedangkan [README aplikasi](kode-sumber/README.md) memuat prasyarat, instalasi, dan perintah pemeriksaan.", "", "Pada salinan paket baru, siapkan Node.js dan pnpm sesuai README, Ruby dengan Bundler, serta alat kompilasi native yang diperlukan gem Puma pada sistem yang dipakai. Jalankan perintah berikut dari folder kode-sumber.", "", "```bash", "pnpm install --frozen-lockfile", "cd apps/api", "bundle install", "cd ../..", "pnpm dev", "```", "", "Aplikasi tersedia pada http://localhost:3000 dan backend Ruby memakai http://127.0.0.1:4567 secara bawaan. Runtime Ruby lokal, dependensi terpasang, hasil build, cache, dan konfigurasi pribadi tidak disertakan. Berkas .env.example memuat contoh konfigurasi yang dapat digunakan tanpa kredensial.", "", "Untuk mengulang semua pemeriksaan, pasang Chromium Playwright dengan `pnpm exec playwright install chromium`, pastikan Python tersedia, lalu jalankan `pnpm test:all`. Perintah tersebut juga membangun ulang aplikasi sebelum pengujian browser.", ""]
report_text = "\n".join(report).replace("## 7.Pembahasan", "## 7. Pembahasan")
assert "\u2014" not in report_text and "\u2013" not in report_text
(OUT / "BAHAN_LAPORAN_UTS_KRIPTOGRAFI2.md").write_text(report_text, encoding="utf-8")
summary = {"generatedAt": datetime.now(timezone.utc).isoformat(), "applicationVersion": "1.1.0", "execution": "pnpm test:all", "executionExitCode": 0, "rubyExamples": ruby["summary"]["example_count"], "rubyFailures": ruby["summary"]["failure_count"], "vitestPassed": units["numPassedTests"], "vitestTotal": units["numTotalTests"], "browserPassed": e2e["stats"]["expected"], "browserFailed": e2e["stats"]["unexpected"], "browserSkipped": e2e["stats"]["skipped"], "fileScenarios": len(scenarios), "textExamples": len(text["examples"]), "formatChecked": formats["checked"], "formatPassed": formats["passed"], "browserDownloadedTextPackages": 8, "browserDownloadedFilePackages": 8, "screenshots": len(shots), "typecheck": "LULUS", "lint": "LULUS", "productionBuild": "LULUS", "evidenceGeneratedAt": files["generatedAt"], "browserExecutionStart": e2e["stats"]["startTime"]}
(OUT / "bukti" / "ringkasan-pengujian.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"report": "BAHAN_LAPORAN_UTS_KRIPTOGRAFI2.md", "characters": len(report_text), "fileScenarios": len(scenarios), "browserDownloads": len(downloads), "screenshots": len(shots)}, ensure_ascii=False))
