# Bahan Laporan UTS Kriptografi

Aplikasi menyediakan tujuh cipher wajib serta Bonus Enigma Cipher. Mesin delapan cipher, codec file, validasi, dan kontainer menggunakan Ruby. Antarmuka memakai Next.js dan React.

Bahan disusun ulang pada 1 Oktober 2026 pukul 14.33 WIB (2026-10-01T07:33:39.252Z) dari kode dan berkas hasil yang tersedia. Status hanya berasal dari hasil eksekusi. Kode lengkap ada pada `01-LAMPIRAN_KODE_PROGRAM.md`.

## Arsitektur dan cara menjalankan

Browser mengirim teks atau byte file ke route Next.js. Route meneruskan operasi ke Sinatra/Puma. Ruby memvalidasi kunci, menjalankan algoritma, membentuk atau membaca kontainer, dan memeriksa hasil dekripsi. Browser menampilkan hasil dan membuat Blob untuk unduhan. Gangguan Ruby menjadi kesalahan tanpa mesin cipher browser sebagai pengganti.

Jalankan `pnpm install`, lalu `bundle install` dari `apps/api`, kemudian `pnpm dev` dari root. Frontend tersedia pada localhost:3000 dan Ruby pada 127.0.0.1:4567. README menjelaskan runtime, variabel, build, dan kontrak API lengkap.

## Konvensi teks, file, dan kontainer

Teks alfabet hanya mempertahankan ASCII A sampai Z setelah normalisasi. Enigma mempertahankan I dan J sebagai huruf berbeda. File utuh mempertahankan semua byte termasuk header. Enam cipher alfabet memakai codec alpha25-v1, sedangkan Extended Vigenere dan Super Enkripsi bekerja langsung pada byte.

Paket `.dat` memakai UTSKRIPT versi 1, panjang metadata big endian, JSON UTF-8, dan payload biner. Metadata menyimpan mode, codec, ukuran, SHA-256, nama file, serta penanda pemulihan Playfair/Hill yang diperlukan. Kunci dan salinan plainteks tidak disimpan. ID tujuh cipher lama tidak berubah, dan Enigma memakai `enigma-i`.

Base64 plainteks, payload cipherteks, dan paket lengkap memiliki tujuan berbeda. Kapitalisasi Base64 dipertahankan. SHA-256 memeriksa kesamaan hasil dan bukan bukti autentikasi.

## Bonus Enigma dan Ruby

Enigma I memakai tiga rotor berbeda dari I sampai V, ring setting 01 sampai 26, posisi awal A sampai Z, reflector B/C, dan nol sampai 13 pasangan plugboard. Urutan konfigurasi adalah kiri, tengah, kanan. Rotor bergerak sebelum huruf. Kondisi notch dibaca sebelum gerak, sehingga double stepping ADU → ADV → AEW → BFX berjalan benar. Ring mengubah offset wiring tanpa menggeser lagi notch jendela. Dekripsi memulai konfigurasi awal yang sama.

Ruby menjalankan kedelapan algoritma melalui fungsi yang sama dengan pengujian RSpec. Pengujian API, Vitest integrasi, evidence, dan browser memakai layanan nyata. Empat belas paket dari TypeScript sebelum migrasi dibekukan dalam tests/migration untuk pemeriksaan kompatibilitas.

## Vektor acuan

Tabel ini berisi nilai acuan tetap dari PRD, bukan klaim hasil pengujian.

| Cipher | Masukan dan kunci | Cipherteks acuan |
| --- | --- | --- |
| Vigenere | ATTACKATDAWN / LEMON | LXFOPVEFRNHR |
| Auto-Key | ATTACKATDAWN / QUEENLY | QNXEPVYTWTWP |
| Playfair | HIDETHEGOLDINTHETREESTUMP / PLAYFAIREXAMPLE | BMODZBXDNABEKUDMUIXMMOUVIF |
| Affine | AFFINECIPHER / a=5,b=8 | IHHWVCSWFRCP |
| Hill | ACT / matriks TV-06 | POH |
| Enigma I | AAAAA / I-II-III,01-01-01,AAA,B,tanpa plugboard | BDZGO |
| Enigma I | HELLOWORLD / konfigurasi awal yang sama | ILBDAAMTAZ |

Extended Vigenere memakai byte [0,65,255] dan kunci [1,2] dengan keluaran [1,67,0]. Super Enkripsi memakai byte [0,1,2,3,254,255,128], kunci byte [1,2], dan kunci kolom BABA dengan keluaran [3,1,5,1,255,3,129].

## Hasil pengujian aktual

RSpec: 201 contoh, 0 kegagalan, 0 pending.

Vitest: 159 lulus, 0 gagal, 0 pending.

Playwright: 30 lulus, 0 gagal, 0 dilewati. Waktu mulai: 2026-10-01T07:26:36.654Z.

Evidence Ruby: 40 skenario file tersedia, 40 lulus. 8 contoh teks tersedia. Sasaran penerimaan adalah 40 skenario file dan delapan contoh teks.

Pemeriksaan format: 32 dari 32 file lulus pada 2026-10-01T07:23:02.542095+00:00.

| Algoritma | Skenario file aktual | Lulus | Contoh teks |
| --- | --- | --- | --- |
| Vigenere standar | 5 | 5 | LULUS |
| Auto-Key Vigenere | 5 | 5 | LULUS |
| Extended Vigenere | 5 | 5 | LULUS |
| Playfair | 5 | 5 | LULUS |
| Affine | 5 | 5 | LULUS |
| Hill | 5 | 5 | LULUS |
| Super Enkripsi | 5 | 5 | LULUS |
| Bonus Enigma Cipher | 5 | 5 | LULUS |

Rincian ukuran, parameter uji, checksum, dan hasil tersedia di `evidence/file-scenarios.json`. Contoh plainteks, payload, paket Base64, serta hasil pemulihan tersedia di `evidence/text-examples.json`. Gunakan generatedAt pada setiap berkas untuk memastikan bukti berasal dari versi yang sedang dibahas.

## Tabel penilaian

Tanda keberhasilan berikut hanya diberikan ketika pasangan file dan teks tersedia. Penilaian final juga harus memeriksa hasil Ruby dan browser di atas.

| No | Spek | Berhasil | Kurang Berhasil | Keterangan |
| --- | --- | --- | --- | --- |
| 1 | Vigenere standar | ✓ |  | Lima file dan contoh teks pulih melalui Ruby |
| 2 | Auto-Key Vigenere | ✓ |  | Lima file dan contoh teks pulih melalui Ruby |
| 3 | Extended Vigenere | ✓ |  | Lima file dan contoh teks pulih melalui Ruby |
| 4 | Playfair | ✓ |  | Lima file dan contoh teks pulih melalui Ruby |
| 5 | Affine | ✓ |  | Lima file dan contoh teks pulih melalui Ruby |
| 6 | Hill | ✓ |  | Lima file dan contoh teks pulih melalui Ruby |
| 7 | Super Enkripsi | ✓ |  | Lima file dan contoh teks pulih melalui Ruby |
| 8 | Bonus Enigma Cipher | ✓ |  | Lima file dan contoh teks pulih melalui Ruby |
| 9 | Bonus bahasa Ruby | ✓ | | Dinilai dari kode Ruby, RSpec, API, 40 pasangan file, dan alur browser aktual |

## Screenshot dan kode sumber

Screenshot aktual di `evidence/screenshots` dihasilkan oleh Playwright. Screenshot Enigma meliputi teks, file, dan kesalahan plugboard. Screenshot sebelum migrasi serta ZIP lama merupakan arsip versi TypeScript dan tidak membuktikan bonus terbaru.

| Berkas | Isi |
| --- | --- |
| evidence/screenshots/01-tampilan-utama.png | Halaman utama dengan pemilih delapan cipher |
| evidence/screenshots/teks-enigma-i-enkripsi.png | Formulir Enigma, konfigurasi awal, dan hasil teks |
| evidence/screenshots/teks-enigma-i-dekripsi.png | Pemulihan teks Enigma pada konteks baru |
| evidence/screenshots/file-enigma-i-enkripsi.png | Enkripsi gambar melalui Enigma |
| evidence/screenshots/file-enigma-i-dekripsi.png | Pemulihan file dengan ukuran dan SHA-256 cocok |
| evidence/screenshots/validasi-enigma-plugboard.png | Plugboard berulang ditolak |

Lampiran kode dihasilkan dari berkas aplikasi yang tersedia ketika generator berjalan. Jalankan ulang `node scripts/generate-report-materials.mjs` setelah perubahan implementasi atau hasil pengujian. Arsip ZIP lama tidak diperbarui otomatis oleh generator.
