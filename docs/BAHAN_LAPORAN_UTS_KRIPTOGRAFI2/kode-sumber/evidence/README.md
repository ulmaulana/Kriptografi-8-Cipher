# Bahan bukti

Seluruh isi folder ini dihasilkan oleh perintah proyek. Angka, checksum, dan status diambil dari berkas hasil eksekusi, bukan ditulis manual.

| Berkas atau folder | Dihasilkan oleh | Isi |
| --- | --- | --- |
| `unit-test-results.json` | `pnpm test` | Hasil Vitest per tes, termasuk vektor, kasus batas, dan kompatibilitas 14 paket TypeScript lama melalui Ruby |
| `file-scenarios.json` | `pnpm evidence` | 40 skenario file (8 cipher x 5 jenis file) melalui Ruby dengan parameter kunci uji, ukuran asal, ukuran paket, ukuran payload, ukuran hasil, SHA-256 asal dan hasil, kesamaan byte, serta status header file asal di payload |
| `file-scenarios.md` | `pnpm evidence` | Tabel ringkas dari `file-scenarios.json` |
| `text-examples.json` | `pnpm evidence` | Satu contoh teks per cipher: pesan, kunci, plainteks yang diproses, cipherteks huruf, Base64 payload, paket Base64, metadata pemulihan, dan hasil dekripsi |
| `format-checks.json` | `python scripts/verify_samples.py` | Pemeriksaan format file hasil pemulihan: query SQLite dan `integrity_check`, CRC chunk PNG, pembacaan WAV, dan dekode UTF-8 |
| `e2e-results.json` | `pnpm test:e2e` | Hasil Playwright per alur browser |
| `samples/<cipher>/<fixture>.dat` | `pnpm evidence` | Paket terenkripsi untuk setiap cipher dan fixture |
| `samples/<cipher>/pulih-<fixture>` | `pnpm evidence` | File hasil dekripsi dari paket yang dibaca ulang dari disk |
| `samples/teks/<cipher>.dat` | `pnpm evidence` | Paket contoh teks |
| `screenshots/` | `pnpm test:e2e` | Screenshot aplikasi yang berjalan |

## Kunci uji

Kunci berikut tercatat di `tests/unit/helpers.ts` dan dipakai pada skenario file. Kunci ini khusus pengujian.

| Cipher | Kunci |
| --- | --- |
| Vigenere standar | `KRIPTOGRAFI` |
| Auto-Key Vigenere | `UTSKRIPTO` |
| Extended Vigenere | `Kunci Byte 2026!` (teks UTF-8) |
| Playfair | `MONARCHY` |
| Affine | a = 7, b = 10 |
| Hill | `[[6,24,1],[13,16,10],[20,17,15]]` |
| Super Enkripsi | kunci byte `SuperKunci`, kunci kolom `TRANSPOSISI` |
| Enigma I | Rotor I-II-III, ring 01-01-01, posisi AAA, reflector B, plugboard kosong |

## Screenshot

| Berkas | Isi |
| --- | --- |
| `01-tampilan-utama.png` | Tampilan awal dengan tema gelap bawaan |
| `02-tema-terang.png` | Tampilan awal setelah tombol Mode terang ditekan |
| `03-tema-terang-hasil.png` | Hasil enkripsi Vigenere pada tema terang setelah halaman dimuat ulang |
| `teks-<cipher>-enkripsi.png` | Enkripsi teks dengan vektor acuan, menampilkan cipherteks huruf dan Base64 |
| `teks-<cipher>-dekripsi.png` | Dekripsi paket teks pada konteks browser baru |
| `file-<cipher>-enkripsi.png` | Enkripsi file (teks, gambar, database, audio, dan video tersebar pada delapan cipher) |
| `file-<cipher>-dekripsi.png` | Pemulihan file pada konteks browser baru dengan SHA-256 cocok |
| `validasi-affine.png`, `validasi-hill.png` | Kesalahan kunci tidak valid pada kolomnya |
| `validasi-enigma-plugboard.png` | Plugboard dengan huruf berulang ditolak |
| `validasi-kunci-salah.png` | Paket dengan kunci salah ditolak melalui checksum |
| `dekripsi-mentah-playfair.png` | Dekripsi cipherteks huruf mentah Playfair yang masih memuat pengisi |
| `dekripsi-base64-payload.png` | Dekripsi dari Base64 payload yang memuat `+`, `/`, dan `=` |
| `hasil-lama-ditandai.png` | Hasil lama ditandai setelah kunci berubah |
| `layar-sempit.png` | Tata letak lebar 390 piksel |

Pasangan fixture dan cipher pada alur file browser: Vigenere dengan teks, Auto-Key dengan gambar PNG, Extended Vigenere dengan database SQLite, Playfair dengan audio WAV, Affine dengan video WebM, Hill dengan gambar PNG, Super Enkripsi dengan video WebM, serta Enigma dengan gambar PNG dan konfigurasi nonawal. Kombinasi lengkap 40 skenario ada di `file-scenarios.json` setelah perintah bukti versi Ruby selesai dijalankan.

Periksa `generatedAt` dan field `engine` saat menggunakan hasil. Bukti sebelum migrasi hanya berlaku untuk mesin TypeScript lama. Vektor dan paket aslinya dipertahankan di `tests/migration/legacy-typescript-v1.json`.
