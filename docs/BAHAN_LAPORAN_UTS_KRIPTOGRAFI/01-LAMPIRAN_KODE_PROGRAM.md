# Lampiran Kode Program

Disusun pada 1 Oktober 2026 pukul 14.33 WIB (2026-10-01T07:33:39.252Z) dari kode frontend Next.js dan backend Ruby. Dependensi dikunci pada pnpm-lock.yaml dan apps/api/Gemfile.lock di repositori. Berkas konfigurasi pribadi, runtime lokal, node_modules, dan vendor tidak dimuat.

## Daftar berkas

| No | Berkas | Jumlah baris |
| --- | --- | --- |
| 1 | .env.example | 5 |
| 2 | .gitignore | 13 |
| 3 | CLAUDE.md | 168 |
| 4 | README.md | 232 |
| 5 | apps/api/.ruby-version | 2 |
| 6 | apps/api/Gemfile | 13 |
| 7 | apps/api/Gemfile.lock | 62 |
| 8 | apps/api/app.rb | 121 |
| 9 | apps/api/config.ru | 3 |
| 10 | apps/api/config/puma.rb | 4 |
| 11 | apps/api/lib/uts_crypto/ciphers/classical.rb | 91 |
| 12 | apps/api/lib/uts_crypto/ciphers/enigma.rb | 72 |
| 13 | apps/api/lib/uts_crypto/ciphers/modular.rb | 69 |
| 14 | apps/api/lib/uts_crypto/ciphers/playfair.rb | 97 |
| 15 | apps/api/lib/uts_crypto/codecs.rb | 86 |
| 16 | apps/api/lib/uts_crypto/container.rb | 167 |
| 17 | apps/api/lib/uts_crypto/engine.rb | 273 |
| 18 | apps/api/lib/uts_crypto/errors.rb | 24 |
| 19 | apps/api/lib/uts_crypto/keys.rb | 193 |
| 20 | apps/api/spec/api_spec.rb | 185 |
| 21 | apps/api/spec/ciphers_spec.rb | 109 |
| 22 | apps/api/spec/codecs_spec.rb | 48 |
| 23 | apps/api/spec/container_spec.rb | 88 |
| 24 | apps/api/spec/engine_spec.rb | 86 |
| 25 | apps/api/spec/enigma_spec.rb | 63 |
| 26 | apps/api/spec/keys_spec.rb | 83 |
| 27 | apps/api/spec/legacy_compatibility_spec.rb | 28 |
| 28 | apps/api/spec/spec_helper.rb | 63 |
| 29 | apps/api/spec/support/capture_enigma_reference.py | 34 |
| 30 | apps/api/spec/support/enigma_reference.json | 79 |
| 31 | docs/catatan-teknis.md | 115 |
| 32 | eslint.config.mjs | 23 |
| 33 | next.config.ts | 12 |
| 34 | package.json | 41 |
| 35 | playwright.config.ts | 25 |
| 36 | scripts/check-denylist.mjs | 28 |
| 37 | scripts/dev.mjs | 41 |
| 38 | scripts/generate-report-materials.mjs | 141 |
| 39 | scripts/generate-video.mjs | 64 |
| 40 | scripts/generate_fixtures.py | 95 |
| 41 | scripts/ruby-service.mjs | 104 |
| 42 | scripts/run-rspec.rb | 5 |
| 43 | scripts/serve-api.rb | 5 |
| 44 | scripts/test-ruby.mjs | 19 |
| 45 | scripts/verify_samples.py | 92 |
| 46 | scripts/with-ruby.mjs | 38 |
| 47 | src/app/api/crypto/decrypt/route.ts | 9 |
| 48 | src/app/api/crypto/encrypt/route.ts | 9 |
| 49 | src/app/api/crypto/inspect/route.ts | 9 |
| 50 | src/app/api/crypto/proxy.ts | 96 |
| 51 | src/app/globals.css | 1488 |
| 52 | src/app/icon.svg | 24 |
| 53 | src/app/layout.tsx | 30 |
| 54 | src/app/page.tsx | 6 |
| 55 | src/components/AppShell.tsx | 202 |
| 56 | src/components/CipherPicker.tsx | 217 |
| 57 | src/components/Icons.tsx | 189 |
| 58 | src/components/KeyFields.tsx | 289 |
| 59 | src/components/Output.tsx | 89 |
| 60 | src/components/ResultViews.tsx | 290 |
| 61 | src/components/ThemeToggle.tsx | 55 |
| 62 | src/components/Workbench.tsx | 719 |
| 63 | src/components/download.ts | 28 |
| 64 | src/lib/codecs/alpha25.ts | 58 |
| 65 | src/lib/codecs/alphabet.ts | 72 |
| 66 | src/lib/codecs/base64.ts | 105 |
| 67 | src/lib/codecs/bitset.ts | 27 |
| 68 | src/lib/codecs/utf8.ts | 16 |
| 69 | src/lib/container/checksum.ts | 11 |
| 70 | src/lib/container/format.ts | 78 |
| 71 | src/lib/container/metadata.ts | 202 |
| 72 | src/lib/crypto/affine.ts | 38 |
| 73 | src/lib/crypto/autokey.ts | 34 |
| 74 | src/lib/crypto/ciphers.ts | 81 |
| 75 | src/lib/crypto/errors.ts | 14 |
| 76 | src/lib/crypto/extended-vigenere.ts | 23 |
| 77 | src/lib/crypto/hill.ts | 140 |
| 78 | src/lib/crypto/modular.ts | 31 |
| 79 | src/lib/crypto/playfair.ts | 177 |
| 80 | src/lib/crypto/super-encryption.ts | 27 |
| 81 | src/lib/crypto/transposition.ts | 41 |
| 82 | src/lib/crypto/vigenere.ts | 23 |
| 83 | src/lib/engine/client.ts | 66 |
| 84 | src/lib/engine/decrypt.ts | 3 |
| 85 | src/lib/engine/encrypt.ts | 3 |
| 86 | src/lib/engine/http.ts | 125 |
| 87 | src/lib/engine/letters.ts | 134 |
| 88 | src/lib/engine/types.ts | 73 |
| 89 | src/lib/validation/keys.ts | 275 |
| 90 | src/workers/crypto.worker.ts | 44 |
| 91 | src/workers/protocol.ts | 43 |
| 92 | tests/e2e/app.spec.ts | 496 |
| 93 | tests/evidence/scenarios.test.ts | 233 |
| 94 | tests/migration/README.md | 8 |
| 95 | tests/migration/legacy-typescript-v1.json | 490 |
| 96 | tests/unit/api-client.test.ts | 160 |
| 97 | tests/unit/container-files.test.ts | 154 |
| 98 | tests/unit/edge-cases.test.ts | 260 |
| 99 | tests/unit/helpers.ts | 47 |
| 100 | tests/unit/migration-compatibility.test.ts | 45 |
| 101 | tests/unit/vectors.test.ts | 103 |
| 102 | tsconfig.json | 25 |
| 103 | vitest.config.ts | 16 |
| 104 | vitest.evidence.config.ts | 17 |

## .env.example

```example
# Backend Ruby yang dipanggil route Next.js. Alamat ini hanya digunakan server.
RUBY_API_URL=http://127.0.0.1:4567
# Batas waktu proxy dalam milidetik.
RUBY_API_TIMEOUT_MS=180000
```

## .gitignore

```
node_modules/
.next/
out/
next-env.d.ts
*.tsbuildinfo
test-results/
playwright-report/
.vitest/
.tools/
apps/api/vendor/
apps/api/.bundle/
*.log
```

## CLAUDE.md

```md
# Panduan Implementasi Aplikasi Web Kriptografi UTS

@prd.md

## Tujuan pekerjaan

Bangun aplikasi yang benar-benar berjalan berdasarkan `prd.md` di direktori yang sama. Baca seluruh PRD sebelum menulis kode. Pekerjaan saat ini mencakup aplikasi, kode sumber, README, pengujian, contoh hasil, dan screenshot aktual sebagai bahan laporan. Pengguna akan meminta prompt penyusunan laporan pada tahap berikutnya setelah aplikasi selesai.

Gunakan `prd.md` sebagai spesifikasi produk. Sumber penugasan adalah `Soal UTS Kriptografi 20261(1).pdf` bila tersedia di proyek. Pemetaan seluruh butir PDF sudah dicantumkan di PRD sehingga implementasi dapat dimulai dengan kedua dokumen Markdown ini.

Jika ditemukan perbedaan, pertahankan ketentuan eksplisit PDF dan jelaskan bagian yang bertentangan. Jangan mengganti syarat tugas secara diam-diam. Keputusan teknis untuk Base64, file biner, Playfair, bentuk kunci, dan bonus mengikuti bagian 3 PRD sampai ada klarifikasi lain dari pengguna atau dosen.

## Cakupan wajib

Implementasikan tujuh cipher wajib dan Bonus Enigma dalam satu aplikasi web. Mesin seluruh delapan cipher menggunakan Ruby sesuai PRD terbaru dan permintaan pengguna.

1. Vigenere Cipher standar modulo 26.
2. Auto-Key Vigenere varian plaintext autokey modulo 26.
3. Extended Vigenere modulo 256 pada byte.
4. Playfair dengan konvensi matriks dan pemulihan pada PRD.
5. Affine modulo 26.
6. Hill modulo 26 dengan matriks invertibel.
7. Super Enkripsi berupa Extended Vigenere kemudian transposisi kolom.
8. Enigma I tiga rotor dengan wiring, reflector, ring setting, plugboard, dan double stepping sesuai PRD.

Semua harus mempunyai enkripsi, dekripsi, input teks, dukungan file utuh, tampilan Base64, masukan kunci pengguna, serta unduhan hasil. Enigma dan bahasa Ruby tetap disebut bonus dalam tabel soal, tetapi keduanya termasuk cakupan implementasi yang dipilih pengguna. Ruby menjalankan algoritma, codec, validasi, pembentukan kontainer, dan pemulihan.

## Teknologi

- Gunakan TypeScript dengan mode strict, React, dan Next.js App Router.
- Gunakan pnpm dengan satu lockfile. Pilih versi paket yang kompatibel berdasarkan dokumentasi resmi saat implementasi.
- Pertahankan proyek Next.js dalam repositori yang sama dengan layanan Ruby `apps/api`.
- Jalankan kriptografi melalui Sinatra pada Rack/Puma. Route Next.js meneruskan request HTTP. Jangan memakai fallback mesin TypeScript ketika backend gagal.
- Gunakan Bundler dengan Gemfile dan Gemfile.lock, serta RSpec untuk cipher, codec, kontainer, dan API Ruby.
- Pakai `Uint8Array`, `ArrayBuffer`, dan `Blob` untuk data biner.
- Gunakan Vitest untuk fungsi dan Playwright untuk alur browser.
- Sediakan perintah `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, dan `pnpm test:e2e` yang benar-benar tersedia.
- README harus cocok dengan versi runtime dan perintah proyek yang aktual.

## Pembagian kode

Gunakan struktur yang sederhana dan konsisten. Susunan berikut adalah rekomendasi implementasi.

| Lokasi | Tanggung jawab |
| --- | --- |
| `src/app` | Halaman dan kerangka Next.js |
| `src/app/api/crypto` | Penghubung HTTP dengan layanan Ruby |
| `apps/api` | Sinatra, mesin delapan cipher Ruby, codec, kontainer, validasi, dan RSpec |
| `src/components` | Formulir pesan, kunci, pemilih cipher, hasil, dan unduhan |
| `src/lib/crypto` | Implementasi setiap cipher dan matematika modular |
| `src/lib/codecs` | Normalisasi, UTF-8, Base64, dan codec byte ke alfabet |
| `src/lib/container` | Serialisasi, parsing, versi, dan metadata pemulihan |
| `src/lib/validation` | Validasi parameter dan masukan |
| `src/lib/engine` | Klien HTTP operasi enkripsi, dekripsi, dan pemeriksaan paket |
| `tests/migration` | Paket dan vektor TypeScript lama yang dibekukan sebelum migrasi |
| `tests/unit` | Vektor acuan, kasus batas, dan pemulihan file |
| `tests/e2e` | Alur browser termasuk ekspor dan impor pada sesi baru |
| `fixtures` | File contoh valid untuk teks, gambar, database, audio, dan video |
| `evidence` | Hasil aktual dan screenshot untuk penyusunan laporan berikutnya |

Logika inti Ruby tidak bergantung pada React. Endpoint memakai fungsi yang sama dengan pengujian RSpec. UI memakai API yang benar-benar menjalankan Ruby. Jangan menulis jalur demo dengan hasil statis yang berbeda dari jalur aplikasi.

## Aturan yang tidak boleh dilanggar

### Base64 dan normalisasi

- Teks alfabet disaring menjadi ASCII A sampai Z setelah konversi huruf kecil yang valid. Angka, spasi, dan tanda baca dibuang sesuai soal.
- Saring huruf ASCII sebelum mengubah kapitalisasi agar karakter Unicode tidak berubah menjadi huruf baru yang tidak ada pada masukan.
- Jangan mengubah huruf besar atau kecil pada Base64. Jangan membuang angka dan simbol Base64 dengan filter alfabet.
- Tampilkan cipherteks alfabet kapital tanpa spasi dan Base64 payload yang valid sebagai representasi berbeda.
- Bedakan Base64 payload dengan Base64 kontainer lengkap. Tombol salin dan format input harus menyebut perbedaan tersebut.

### Byte dan file

- Mode file utuh membaca semua byte termasuk header. Jangan memakai `readAsText()` atau decoding UTF-8 untuk menggantikan pembacaan file biner.
- Extended Vigenere dan Super Enkripsi bekerja langsung pada byte.
- Enam cipher alfabet, termasuk Enigma, memakai codec reversibel `alpha25-v1` dari bagian 6 PRD pada mode file utuh. Definisi cipher aslinya tetap dipertahankan.
- Jangan menganggap Base64, kompresi, atau pergantian ekstensi sebagai enkripsi.
- Jangan hanya mengenkripsi nama file, isi teks yang terbaca, atau header tertentu.
- File database harus benar-benar file database yang valid. Audio dan video juga harus berupa format media yang valid.
- File hasil dekripsi harus identik byte demi byte dengan file asal pada mode file utuh.

### Algoritma dan kunci

- Kunci dimasukkan pengguna, tidak disembunyikan sebagai konstanta produksi.
- Kata kunci boleh lebih panjang dari pesan. Validasi mengikuti jenis algoritma, bukan memaksakan semua kunci menjadi satu string dengan panjang tetap.
- Auto-Key melanjutkan primer dengan plainteks. Pada dekripsi, bangun kembali plainteks secara bertahap.
- Playfair memakai matriks 5 x 5, penggabungan I/J, dan pengisi sesuai PRD. Simpan metadata pemulihan. Jangan menghapus semua X atau Q dari hasil dekripsi.
- Affine mensyaratkan a relatif prima terhadap 26.
- Hill memakai invers modular yang tepat. Jangan memakai invers bilangan real yang dibulatkan. Uji matriks `[[2,1],[13,7]]` yang invertibel meskipun pivot awal naif modulo 26 dapat gagal.
- Hill memakai vektor kolom. Jangan mengubah orientasi tanpa mengubah spesifikasi dan seluruh vektor uji yang relevan.
- Transposisi kolom harus menangani huruf kunci berulang secara stabil dan panjang baris terakhir yang tidak penuh.
- Super Enkripsi memproses byte hasil Extended Vigenere. Jangan melakukan transposisi terhadap representasi Base64.
- Enigma memakai rotor berbeda I sampai V, reflector B/C, ring setting API 1 sampai 26, posisi awal A sampai Z, dan 0 sampai 13 pasangan plugboard. Urutan konfigurasi selalu kiri, tengah, kanan.
- Ambil kondisi turnover Enigma sebelum langkah, lalu gerakkan rotor sebelum huruf. Ring setting memengaruhi offset wiring, tanpa menggeser lagi notch terhadap jendela.
- Dekripsi Enigma memakai konfigurasi awal yang sama. State tidak bocor antaroperasi dan tidak direset pada batas blok dalam satu file.

### Kontainer dan pemulihan

- Terapkan format `.dat` terversi pada bagian 7 PRD.
- Simpan hanya metadata pemulihan yang diperlukan bersama payload. Jangan menyimpan kunci atau salinan plainteks sebagai jalan pintas dekripsi.
- Metadata nama file asal digunakan untuk memulihkan nama dan ekstensi unduhan.
- Gunakan representasi ringkas untuk penanda pengisi Playfair agar dapat menangani file yang lebih besar.
- Pemulihan harus berhasil setelah refresh atau pada konteks browser baru. Jangan bergantung pada pesan asli yang masih tersimpan dalam state React.
- Validasi kontainer, panjang data, codec, padding, dan checksum sebelum memberi status pemulihan berhasil.
- SHA-256 dipakai untuk kesamaan data, bukan diklaim sebagai autentikasi.
- Input mentah Playfair dan Hill tidak memiliki informasi pemulihan lengkap. Terapkan perilaku mentah yang dijelaskan PRD dan jangan menebak huruf yang harus dibuang.

## Urutan kerja

1. Periksa kondisi repositori dan instruksi yang sudah ada. Pertahankan pekerjaan pengguna yang tidak terkait dengan perubahan.
2. Baca PRD dan buat daftar implementasi yang mengacu pada GUI-01, ALG-01 sampai ALG-07, OPT-01, OPT-02, SP-01 sampai SP-11, serta DEL-01 sampai DEL-04.
3. Siapkan proyek dan perintah pemeriksaan.
4. Implementasikan fungsi dasar dan cipher satu per satu bersama vektor acuan PRD.
5. Implementasikan codec, kontainer, metadata, dan pemulihan file pada sesi baru.
6. Integrasikan antarmuka dan jalankan alur enkripsi serta dekripsi melalui browser.
7. Jalankan kasus batas dan kelima jenis file pada seluruh cipher.
8. Ambil screenshot dari aplikasi yang berjalan, simpan contoh hasil, dan tulis README berdasarkan penggunaan aktual.
9. Jalankan typecheck, lint, seluruh pengujian yang relevan, dan build. Perbaiki kegagalan yang ditemukan.
10. Sampaikan fitur yang selesai, cara menjalankan, hasil verifikasi aktual, serta masalah fungsional yang masih memengaruhi penggunaan jika ada.

Lanjutkan sampai cakupan wajib benar-benar berfungsi. Jangan berhenti pada kerangka proyek, halaman statis, tombol tanpa perilaku, mock enkripsi, atau rencana implementasi.

## Verifikasi yang harus menghasilkan bukti

- Semua vektor TV-01 sampai TV-09 pada PRD harus diperiksa sebagai keluaran acuan tetap melalui Ruby.
- Lakukan pengujian arah enkripsi dan dekripsi. Round-trip saja tidak cukup karena dua fungsi yang sama-sama salah dapat saling membalik.
- Periksa TC-01 sampai TC-24, termasuk double stepping, ring setting, reset Enigma, kegagalan backend, dan kompatibilitas paket lama.
- Jalankan sedikitnya 40 skenario file, yaitu delapan cipher dikalikan lima jenis file, melalui backend Ruby nyata.
- Bandingkan byte, panjang, dan SHA-256 file asal dengan hasil dekripsi. Jangan menyimpulkan file benar hanya karena nama atau ukurannya sama.
- Pengujian browser menjalankan satu alur teks dan satu alur file pada tiap dari delapan cipher, termasuk unduh lalu unggah kembali pada konteks baru, dengan layanan Ruby nyata.
- Catat hasil aktual dalam data terstruktur. Jangan menulis jumlah pengujian, waktu eksekusi, persentase keberhasilan, atau checksum yang tidak berasal dari eksekusi.
- Expected output tidak boleh dihitung dengan memanggil implementasi produksi yang diuji.

Gunakan data contoh yang aman dibagikan. Kunci contoh untuk reproduksi boleh disimpan bersama kasus uji. Jangan merekam kunci pribadi pengguna.

## Antarmuka

Gunakan bahasa Indonesia yang singkat dan jelas. Formulir harus menunjukkan pesan, cipher, jenis operasi, jenis input, dan kunci yang relevan. Tampilkan kesalahan pada kolom yang bermasalah.

Sediakan penjelasan pendek yang membantu keputusan pengguna, seperti normalisasi teks alfabet, perbedaan paket dan payload, serta syarat kunci. Rumus rinci, nama modul, struktur penyimpanan internal, dan daftar uji ditempatkan di dokumentasi teknis, bukan memenuhi halaman utama.

Pastikan hasil panjang dapat dibaca tanpa merusak layout. Pratinjau boleh dibatasi bila dinyatakan dengan jelas, tetapi salin dan unduhan harus memuat seluruh data. Tampilkan status pemrosesan nyata dan tandai hasil lama ketika masukan berubah.

## Bahan laporan

Siapkan kode, README, fixture, hasil enkripsi, hasil dekripsi, hasil uji, dan screenshot sebagaimana bagian 10 PRD. Screenshot harus berasal dari aplikasi yang dijalankan, bukan gambar antarmuka buatan.

Tuliskan README dan catatan teknis berdasarkan perilaku aplikasi yang ada. Bahasa dokumentasi harus menjelaskan pekerjaan, metode, hasil, dan bukti secara langsung. Hindari narasi administratif, klaim keberhasilan tanpa bukti, serta pengulangan instruksi pengguna. Gunakan bahasa Indonesia tanpa em dash, en dash, atau titik koma dalam prosa.

Kesalahan fungsional yang nyata tidak boleh disembunyikan. PDF mewajibkan masalah program dijelaskan dalam laporan. Bedakan masalah tersebut dari bonus yang memang opsional.

Laporan akademik, slide, video, dan prompt penyusunan laporan tidak dibuat pada tahap implementasi ini. Simpan bahan yang diperlukan agar pengguna dapat meminta penyusunan laporan setelah aplikasi selesai.

## Kriteria penyelesaian

Pekerjaan selesai setelah seluruh butir Definisi selesai pada PRD terpenuhi, termasuk Enigma dan penggunaan Ruby. README, hasil pengujian, screenshot, dan perilaku aplikasi harus saling sesuai. Bukti versi lama tidak boleh dipakai untuk mengklaim keberhasilan versi Ruby.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
```

## README.md

````md
# Kriptografi

Aplikasi web untuk mengenkripsi dan mendekripsi pesan ketikan maupun file sembarang dengan tujuh cipher wajib UTS Kriptografi dan Bonus Enigma Cipher. Backend Ruby menjalankan kedelapan algoritma, validasi, codec file, dan kontainer. Antarmuka Next.js meneruskan operasi ke layanan Ruby melalui API, lalu menampilkan hasil dan menyediakan unduhan.

| Cipher | Data yang diproses | Bentuk kunci |
| --- | --- | --- |
| Vigenere standar | Huruf A-Z, modulo 26 | Kata kunci huruf, panjang bebas |
| Auto-Key Vigenere | Huruf A-Z, modulo 26, varian plaintext autokey | Primer huruf, panjang bebas |
| Extended Vigenere | Byte 0-255, modulo 256 | Kunci byte dari teks UTF-8 atau heksadesimal |
| Playfair | Huruf A-Z, matriks 5 x 5, J digabung ke I | Kata kunci huruf, panjang bebas |
| Affine | Huruf A-Z, modulo 26 | Bilangan bulat a dan b, a relatif prima terhadap 26 |
| Hill | Huruf A-Z, modulo 26, vektor kolom | Matriks n x n invertibel modulo 26, n dari 2 sampai 10 |
| Super Enkripsi | Byte, Extended Vigenere lalu transposisi kolom | Kunci byte dan kata kunci kolom |
| Enigma I | Huruf A-Z, tiga rotor, reflector, dan plugboard | Tiga rotor berbeda I–V, ring setting, posisi awal, reflector B/C, dan pasangan plugboard |

Setiap cipher mendukung enkripsi, dekripsi, masukan teks, file utuh, tampilan Base64, kunci dari pengguna, serta unduhan hasil.

## Prasyarat

Versi yang dipakai saat pengembangan dan pengujian:

| Perangkat | Versi |
| --- | --- |
| Node.js | 24.21.0 (minimal 22.12.0 sesuai `engines`) |
| pnpm | 10.19.0 |
| Ruby dan Bundler | Ruby 3.4.5 dan Bundler 2.6.9 saat implementasi. Ruby yang didukung 3.2 atau lebih baru, di bawah 4.0 |
| Python | 3.13.13, hanya untuk membuat ulang fixture dan memeriksa format sampel |
| Chromium Playwright | dipasang dengan `pnpm exec playwright install chromium` |

Paket utama yang terkunci di `pnpm-lock.yaml`: Next.js 16.3.7, React 19.3.0, TypeScript 5.9.3, Vitest 5.0.3, Playwright 1.63.0, ESLint 9.39.5.

## Instalasi dan menjalankan

Pada workspace yang sudah memuat runtime `.tools` dan dependensi Ruby lokal, jalankan `pnpm dev` dari root. Runner menemukan Ruby lokal secara otomatis.

Untuk salinan baru tanpa runtime lokal, setelah Ruby dan Bundler tersedia:

```bash
pnpm install
cd apps/api
bundle install
cd ../..
pnpm dev
```

Buka `http://localhost:3000`. Untuk versi produksi:

```bash
pnpm build
pnpm start
```

`pnpm dev` dan `pnpm start` menjalankan web bersama layanan Ruby. Layanan memakai `http://127.0.0.1:4567` secara bawaan. Endpoint `GET /health` membantu memeriksa apakah backend sudah tersedia.

Runner otomatis memakai runtime lokal `.tools/rubyinstaller-3.4.5-1-x64/bin/ruby.exe` bila tersedia. Instalasi Ruby global tidak diperlukan untuk salinan workspace yang sudah memuat runtime dan gem lokal. Untuk salinan repositori baru tanpa `.tools`, pasang Ruby sesuai prasyarat lalu jalankan `bundle install` dari `apps/api`.

Gunakan `pnpm dev` dan `pnpm test:ruby` pada Windows, termasuk bila lokasi proyek mengandung spasi. Runner memuat `bundler/setup` dalam proses Ruby melalui `scripts/serve-api.rb` dan `scripts/run-rspec.rb`, sehingga path tidak diteruskan lewat `RUBYOPT` dari subprocess `bundle exec`. Untuk menjalankan Ruby terpisah, dari `apps/api` jalankan `ruby ../../scripts/serve-api.rb -C config/puma.rb config.ru`, menggunakan executable runtime lokal bila Ruby tidak ada di PATH.

| Variabel | Nilai awal | Fungsi |
| --- | --- | --- |
| `RUBY_API_URL` | `http://127.0.0.1:4567` | Alamat Sinatra yang dipakai Next.js dan pengujian Node |
| `API_HOST`, `API_PORT` | `127.0.0.1`, `4567` | Host dan port Puma |
| `API_THREADS` | `4` | Jumlah thread layanan Ruby |
| `RUBY_API_TIMEOUT_MS` | `180000` | Batas waktu proxy, dalam milidetik |
| `RUBY_COMMAND` | `ruby` atau runtime lokal yang ditemukan runner | Lokasi executable Ruby bila tidak ada di PATH |

Salin `.env.example` menjadi `.env.local` bila perlu mengubah konfigurasi dev atau produksi. Variabel shell memiliki prioritas tertinggi. Pengujian mengikuti mode Next.js `test` dan membaca `.env.test.local`, `.env.test`, serta `.env`, tanpa `.env.local`.

## Perintah pemeriksaan

| Perintah | Fungsi |
| --- | --- |
| `pnpm typecheck` | Pemeriksaan tipe TypeScript mode strict |
| `pnpm lint` | ESLint dengan konfigurasi Next.js |
| `pnpm test` | Pengujian Vitest, termasuk jalur API Ruby dan kompatibilitas 14 paket lama. Hasil JSON ditulis ke `evidence/unit-test-results.json` |
| `cd apps/api && bundle exec rspec` | Pengujian Ruby untuk algoritma, codec, kontainer, dan API |
| `pnpm test:ruby` | RSpec dari root, dengan hasil JSON di `evidence/ruby-test-results.json` |
| `pnpm test:all` | Typecheck, lint, RSpec, Vitest, 40 file, pemeriksaan format, dan browser |
| `pnpm test:e2e` | Pengujian browser Playwright. Perintah ini membangun aplikasi lalu menjalankannya di port 3100 secara otomatis. Screenshot ditulis ke `evidence/screenshots` |
| `pnpm evidence` | Menjalankan 40 skenario file (8 cipher x 5 jenis file) dan 8 contoh teks melalui Ruby, lalu menulis hasil aktual ke `evidence/` |
| `python scripts/verify_samples.py` | Membuka kembali file hasil pemulihan (query SQLite, CRC PNG, WAV, UTF-8) dan menulis `evidence/format-checks.json` |
| `pnpm fixtures` | Membuat ulang lima fixture di `fixtures/` |
| `pnpm check:deps` | Memeriksa `pnpm-lock.yaml` terhadap daftar versi paket terlarang di `security/malicious-packages.txt` |
| `node scripts/generate-report-materials.mjs` | Menyusun ulang bahan laporan dan lampiran kode dari sumber serta hasil aktual |

Urutan untuk menghasilkan ulang bukti adalah RSpec, `pnpm test`, `pnpm evidence`, `python scripts/verify_samples.py`, lalu `pnpm test:e2e`. Pengujian integrasi memerlukan Ruby dan runner memulai layanan bila belum tersedia. Pengujian browser memeriksa video hasil pemulihan dari `pnpm evidence`. Berkas hasil dan screenshot lama hanya membuktikan versi aplikasi yang menghasilkan berkas tersebut.

## Contoh penggunaan dari salinan baru

```bash
pnpm install
cd apps/api
bundle install
cd ../..
pnpm build
pnpm start
```

1. Buka `http://localhost:3000`. Pilih **Vigenere standar**, operasi **Enkripsi**, jenis masukan **Teks**.
2. Isi pesan `attack at dawn` dan kata kunci `lemon`. Di bawah kolom pesan tampil hasil normalisasi `ATTACKATDAWN`.
3. Tekan **Enkripsi**. Cipherteks huruf yang tampil adalah `LXFOPVEFRNHR` dan cipherteks Base64 adalah `TFhGT1BWRUZSTkhS`.
4. Tekan **Unduh paket .dat**. Berkas `cipherteks-vigenere.dat` tersimpan.
5. Muat ulang halaman atau buka jendela penyamaran. Pilih **Dekripsi**, format masukan **Paket .dat**, lalu unggah berkas tadi. Algoritma terisi otomatis dari paket.
6. Isi kata kunci `lemon` lalu tekan **Dekripsi**. Status menyatakan ukuran dan SHA-256 cocok, dan plainteks `ATTACKATDAWN` tampil.

Alur file sama. Pilih jenis masukan **File**, unggah berkas apa pun, lalu enkripsi. Unduhan bernama `<nama asal>.dat`. Saat didekripsi, hasil dapat diunduh dengan nama dan ekstensi asal. Nama boleh diubah pada kolom nama file, sedangkan ekstensi tetap.

## Tata letak antarmuka

Tab **Beranda** berisi meja kerja bertema gelap dengan enam panel bernomor sesuai urutan kerja.

| Panel | Isi |
| --- | --- |
| 01 Pilih cipher | Daftar delapan cipher dan detail cipher aktif. Deretan simbol menandai posisi awal kunci yang sudah valid, misalnya huruf kunci pertama Vigenere atau nilai b Affine |
| 02 Operasi | Enkripsi atau Dekripsi |
| 03 Jenis masukan | Teks atau File untuk enkripsi. Format masukan paket atau cipherteks untuk dekripsi |
| 04 Pesan | Kolom pesan, file, paket, atau cipherteks sesuai pilihan panel 02 dan 03 |
| 05 Kunci | Kolom kunci sesuai cipher dan tombol proses |
| 06 Hasil | Status proses, keluaran, tombol salin, dan unduhan |

Tab **Panduan** merangkum cara memakai, tiga bentuk keluaran, dan bentuk kunci. Tab **Tentang** menjelaskan pemrosesan backend Ruby dan daftar cipher.

Tema bawaan adalah gelap. Tombol di ujung kanan baris tab berganti antara **Mode terang** dan **Mode gelap**. Pilihan disimpan di `localStorage` browser dengan kunci `theme` dan diterapkan oleh skrip kecil di `<head>` sebelum halaman digambar, sehingga tema tetap sama setelah muat ulang tanpa berkedip. Bila penyimpanan browser tidak tersedia, tema tetap dapat diganti tetapi kembali gelap setelah muat ulang. Pada layar di bawah 1180 px panel hasil pindah ke bawah formulir, dan di bawah 760 px setiap panel tersusun satu kolom.

## Tiga bentuk keluaran

| Bentuk | Isi | Kegunaan |
| --- | --- | --- |
| Cipherteks huruf | Huruf kapital A-Z tanpa spasi. Untuk enam cipher alfabet termasuk Enigma | Tampilan cipherteks sesuai spesifikasi 5 |
| Cipherteks Base64 (payload) | Base64 dari byte payload saja. Untuk cipher alfabet, byte payload adalah kode ASCII huruf cipherteks | Tampilan Base64 sesuai spesifikasi 4 dan 5, dapat didekripsi lewat format masukan Cipherteks Base64 |
| Paket (.dat atau Base64 paket) | Kontainer biner berisi metadata pemulihan dan payload | Dekripsi lengkap pada sesi baru, termasuk nama file, pemulihan pengisi Playfair, padding Hill, dan pemeriksaan SHA-256 |

Tombol **Salin cipherteks Base64** menyalin payload saja. Tombol **Salin paket untuk dekripsi** menyalin Base64 dari seluruh kontainer. Tombol **Gunakan hasil untuk dekripsi** mengirim paket lengkap ke formulir dekripsi.

Spesifikasi 5 meminta cipherteks seragam huruf kecil atau kapital dalam Base64. Base64 standar membedakan huruf besar dan kecil sehingga mengubah kapitalisasinya akan merusak data. Aplikasi menampilkan cipherteks huruf dalam kapital tanpa spasi dan menampilkan Base64 apa adanya sebagai representasi terpisah. Pratinjau di layar dibatasi 4.000 karakter dengan keterangan yang jelas. Salin dan unduh selalu memuat data lengkap.

## Teks alfabet dan file utuh

Teks ketikan pada cipher alfabet dinormalisasi. Hanya huruf ASCII A-Z dan a-z yang dipertahankan lalu diubah menjadi kapital. Angka, spasi, tanda baca, dan huruf non-ASCII dibuang tanpa transliterasi. Hasil dekripsi adalah teks hasil normalisasi tersebut.

File diproses sebagai byte utuh termasuk header. Extended Vigenere dan Super Enkripsi mengenkripsi byte secara langsung. Enam cipher alfabet memetakan setiap byte menjadi dua huruf dengan codec `alpha25-v1`, lalu menjalankan cipher alfabet pada huruf tersebut. Codec ini hanya adaptasi format. Hasil dekripsi file diperiksa terhadap ukuran dan SHA-256 asal. Untuk cipher alfabet tersedia pilihan terpisah **Isi sebagai teks alfabet** yang hanya mengenkripsi huruf A-Z dari isi file.

## Konvensi algoritma

Rincian rumus, codec, dan format kontainer ada di [docs/catatan-teknis.md](docs/catatan-teknis.md). Ringkasannya sebagai berikut.

- A = 0 sampai Z = 25. Karakter yang dibuang saat normalisasi tidak menggeser indeks kunci.
- Auto-Key memakai primer lalu plainteks. Dekripsi membangun aliran kunci dari plainteks yang baru dipulihkan.
- Playfair memakai matriks 5 x 5 dengan J digabung ke I. Pasangan huruf sama disisipi X, atau Q bila hurufnya X. Huruf terakhir tanpa pasangan diberi pengisi dengan aturan yang sama. Paket menyimpan posisi pengisi dan posisi J sebagai bitset sehingga X dan Q asli serta J tetap pulih.
- Hill memakai vektor kolom `C = K * P mod 26`. Invers dihitung tepat modulo 2 dan modulo 13 lalu digabung dengan CRT, sehingga matriks seperti `[[2,1],[13,7]]` diterima. Padding X hanya ditambahkan bila panjang bukan kelipatan n, dan jumlahnya disimpan di paket.
- Super Enkripsi menjalankan Extended Vigenere lalu transposisi kolom tanpa padding. Kolom diurutkan menurut huruf kunci A-Z dan huruf yang sama diurutkan dari kiri.
- Enigma I bergerak sebelum setiap huruf, memakai double stepping, dan tidak menggabungkan I/J. Dekripsi memakai konfigurasi awal yang sama dengan enkripsi. Ring setting mengubah offset wiring, sementara turnover dibandingkan terhadap huruf jendela.

## Batas implementasi

- Ukuran file maksimal 50 MB per file. Batas ini ditampilkan di formulir dan file yang lebih besar ditolak, bukan dipotong.
- Ukuran matriks Hill 2 x 2 sampai 10 x 10.
- Kunci teks maksimal 65.536 karakter sebagai batas sumber daya backend. Panjang kata kunci boleh lebih panjang daripada pesan.
- Jalur dekripsi tanpa paket (cipherteks huruf atau Base64 payload) tidak memiliki checksum. Kunci salah pada jalur ini tidak selalu dapat dikenali. Playfair mentah tetap memuat huruf pengisi dan I hasil penggabungan J, dan Hill mentah tetap memuat padding X.
- Pada mode file, payload cipher alfabet berukuran sekitar dua kali ukuran file karena codec `alpha25-v1`, ditambah huruf pengisi pada Playfair.
- SHA-256 hanya memeriksa kesamaan data hasil dekripsi. Checksum ini bukan MAC dan bukan bukti autentikasi.
- Tombol salin memerlukan akses clipboard browser, yang tersedia pada `localhost` atau HTTPS.

## Konfigurasi Enigma

Urutan pengaturan selalu **Kiri, Tengah, Kanan**. Nilai awalnya rotor I, II, III, ring 01, 01, 01, posisi A, A, A, reflector B, dan plugboard kosong. Pilih tiga rotor berbeda dari I sampai V, ring 01 sampai 26, posisi A sampai Z, reflector B atau C, serta nol sampai 13 pasangan seperti `AB CD`. Pasangan `AA`, huruf yang dipakai ulang, dan karakter nonalfabet ditolak.

Pesan `AAAAA` dengan nilai awal menghasilkan `BDZGO`. Pesan `HELLOWORLD` menghasilkan `ILBDAAMTAZ` setelah mesin dimulai kembali dari AAA. Untuk dekripsi, masukkan kembali konfigurasi awal. Posisi akhir tidak menggantikan konfigurasi pada formulir. Konfigurasi kunci tidak disimpan dalam `.dat`.

## Pembagian frontend dan Ruby

Browser mengirim teks atau seluruh byte file ke endpoint Next.js, yang meneruskan request ke Sinatra. Setiap operasi mempunyai state sendiri. Ketika Ruby tidak tersedia, UI menampilkan kesalahan. Aplikasi tidak menjalankan mesin cipher TypeScript sebagai pengganti.

| Endpoint | Operasi |
| --- | --- |
| `POST /api/crypto/encrypt` | Enkripsi teks atau file, mengembalikan payload dan paket |
| `POST /api/crypto/decrypt` | Dekripsi paket, cipherteks huruf, atau Base64 payload |
| `POST /api/crypto/inspect` | Membaca metadata paket tanpa mendekripsi payload |

Teks memakai JSON. Seluruh file enkripsi, baik dari browser maupun pengujian Node, memakai multipart dengan field `metadata` berisi JSON dan field `file` berisi byte biner. Dekripsi dan pemeriksaan paket pada integrasi Node juga dapat memakai `containerBase64` dalam JSON. Respons enkripsi memiliki `plainBase64`, `payloadBase64`, dan `containerBase64`, serta `metadata`, `keyNotes`, dan `details`. Respons dekripsi memiliki `bytesBase64`, `payloadBase64`, `verified`, `sha256`, nama file, dan detail pemulihan. Error memakai status HTTP non-2xx dengan `message`, serta `field` atau `fieldErrors` bila relevan.

Contoh body untuk `POST /api/crypto/encrypt`:

```json
{
  "cipher": "enigma-i",
  "input": { "kind": "text", "text": "HELLOWORLD" },
  "key": {
    "rotors": ["I", "II", "III"],
    "ringSettings": [1, 1, 1],
    "initialPositions": ["A", "A", "A"],
    "reflector": "B",
    "plugboard": ""
  }
}
```

Dekripsi paket memakai `kind: "package"`, `containerBase64`, dan `key`. Jalur mentah memakai `kind: "raw-letters"`, `cipher`, `text`, dan `key`, atau `kind: "payload-base64"`, `cipher`, `base64`, dan `key`. Pesan, file, serta kunci diteruskan ke backend untuk diproses. Gunakan HTTPS bila layanan dibuka melalui jaringan publik.

## Struktur proyek

| Lokasi | Isi |
| --- | --- |
| `src/app` | Halaman dan kerangka Next.js |
| `src/app/api/crypto` | Route penghubung HTTP ke Ruby |
| `apps/api` | Layanan Sinatra/Puma, delapan cipher Ruby, codec, kontainer, validasi, dan RSpec |
| `src/components` | Formulir, kunci, panel hasil, salin, dan unduh |
| `src/lib/crypto` | Implementasi TypeScript lama sebagai pembanding migrasi dan pratinjau formulir |
| `src/lib/codecs` | Encoding browser dan pembanding codec untuk pengujian |
| `src/lib/container` | Tipe dan pembanding format kontainer untuk pengujian |
| `src/lib/validation` | Validasi formulir, diikuti validasi otoritatif Ruby |
| `src/lib/engine` | Klien HTTP untuk jalur enkripsi dan dekripsi Ruby |
| `tests/unit` | Vektor acuan, kasus batas, dan kompatibilitas paket lama melalui Ruby |
| `tests/migration` | 14 paket TypeScript asli yang dibekukan sebelum migrasi |
| `tests/evidence` | Skenario bukti 40 file dan contoh teks |
| `tests/e2e` | Alur browser Playwright |
| `fixtures` | Contoh teks, gambar PNG, database SQLite, audio WAV, dan video WebM yang valid |
| `evidence` | Hasil uji aktual, sampel terenkripsi dan terdekripsi, serta screenshot |

## Keamanan dependensi

`pnpm check:deps` membandingkan setiap paket di `pnpm-lock.yaml` dengan `security/malicious-packages.txt`. Pemeriksaan terakhir tidak menemukan versi terlarang. pnpm 10 tidak menjalankan skrip instalasi dependensi kecuali diizinkan, dan skrip `unrs-resolver` dibiarkan tidak dijalankan.

## Rujukan teknis

- [RFC 4648 bagian 4](https://www.rfc-editor.org/rfc/rfc4648#section-4) untuk Base64.
- [MDN TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) dan [MDN Blob arrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer) untuk UTF-8 dan pembacaan byte file.
- [CrypTool Hill](https://legacy.cryptool.org/en/cto/hill) untuk contoh ACT menjadi POH.
- [Auburn University](https://www.eng.auburn.edu/~xqin/research/qosec/all_labs/project6/index.html) untuk contoh ATTACKATDAWN dengan kunci LEMON.
- [Crypto Museum](https://www.cryptomuseum.com/crypto/enigma/wiring.htm) untuk wiring rotor, reflector, dan turnover Enigma.
- [Sinatra](https://sinatrarb.com/intro.html) untuk backend HTTP Ruby.
````

## apps/api/.ruby-version

```
3.4.5
```

## apps/api/Gemfile

```ruby
source "https://rubygems.org"

ruby ">= 3.2", "< 4.0"

gem "sinatra", "~> 4.1"
gem "puma", "~> 6.6"
gem "rackup", "~> 2.2"

group :test do
  gem "rspec", "~> 3.13"
  gem "rack-test", "~> 2.2"
end
```

## apps/api/Gemfile.lock

```lock
GEM
  remote: https://rubygems.org/
  specs:
    base64 (0.3.0)
    diff-lcs (1.6.2)
    logger (1.7.0)
    mustermann (3.1.1)
    nio4r (2.7.5)
    puma (6.6.1)
      nio4r (~> 2.0)
    rack (3.2.7)
    rack-protection (4.2.1)
      base64 (>= 0.1.0)
      logger (>= 1.6.0)
      rack (>= 3.0.0, < 4)
    rack-session (2.1.2)
      base64 (>= 0.1.0)
      rack (>= 3.0.0)
    rack-test (2.2.0)
      rack (>= 1.3)
    rackup (2.3.1)
      rack (>= 3)
    rspec (3.13.2)
      rspec-core (~> 3.13.0)
      rspec-expectations (~> 3.13.0)
      rspec-mocks (~> 3.13.0)
    rspec-core (3.13.6)
      rspec-support (~> 3.13.0)
    rspec-expectations (3.13.5)
      diff-lcs (>= 1.2.0, < 2.0)
      rspec-support (~> 3.13.0)
    rspec-mocks (3.13.8)
      diff-lcs (>= 1.2.0, < 2.0)
      rspec-support (~> 3.13.0)
    rspec-support (3.13.7)
    sinatra (4.2.1)
      logger (>= 1.6.0)
      mustermann (~> 3.0)
      rack (>= 3.0.0, < 4)
      rack-protection (= 4.2.1)
      rack-session (>= 2.0.0, < 3)
      tilt (~> 2.0)
    tilt (2.9.0)

PLATFORMS
  ruby
  x64-mingw-ucrt
  x86_64-linux

DEPENDENCIES
  puma (~> 6.6)
  rack-test (~> 2.2)
  rackup (~> 2.2)
  rspec (~> 3.13)
  sinatra (~> 4.1)

RUBY VERSION
   ruby 3.4.5p51

BUNDLED WITH
   2.6.9
```

## apps/api/app.rb

```ruby
require "sinatra/base"
require "rack/tempfile_reaper"
require "json"
require_relative "lib/uts_crypto/engine"

module UtsCrypto
  class App < Sinatra::Base
    # Maximum file 50 MiB; Playfair/codec packages may expand up to fourfold.
    MAX_REQUEST_BYTES = 400 * 1024 * 1024
    use Rack::TempfileReaper

    set :show_exceptions, false
    set :raise_errors, false
    set :logging, false # Request bodies and keys are never logged.
    set :dump_errors, false
    set :host_authorization, { permitted_hosts: ["localhost", "127.0.0.1", "::1", "example.org"] }

    before do
      content_type :json
      cache_control :no_store
      headers "X-Content-Type-Options" => "nosniff"
      if request.content_length.to_i > MAX_REQUEST_BYTES
        halt 413, JSON.generate(message: "Ukuran request melebihi batas 400 MiB.", field: "file")
      end
    end

    helpers do
      def parse_json(text)
        value = JSON.parse(text, max_nesting: 100)
        raise InputError.new("Body request harus berupa objek JSON.", "request") unless value.is_a?(Hash)
        value
      rescue JSON::ParserError
        raise InputError.new("Request bukan JSON yang valid.", "request")
      end

      def crypto_request(operation)
        if request.media_type == "multipart/form-data"
          metadata = params["metadata"]
          value = metadata.is_a?(String) ? parse_json(metadata) : {}
          upload = params["file"]
          unless upload.is_a?(Hash) && upload[:tempfile].respond_to?(:read)
            raise InputError.new("Unggah bagian biner file pada request multipart.", "file")
          end
          tempfile = upload[:tempfile]
          bound = operation == :encrypt ? Engine::MAX_FILE_BYTES : Container::MAX_PAYLOAD_LENGTH + Container::MAX_METADATA_LENGTH + Container::FIXED_HEADER_LENGTH
          tempfile.rewind
          bytes = (tempfile.read(bound + 1) || "").b
          if bytes.bytesize > bound
            raise InputError.new("Ukuran file melebihi batas implementasi #{bound} byte.", "file")
          end
          if operation == :encrypt
            input = Engine.object!(value["input"], "input")
            raise InputError.new("Request multipart enkripsi harus memakai input.kind=file.", "input") unless input["kind"] == "file"
            input["bytes"] = bytes
          else
            value["kind"] = "package" if operation == :decrypt
            value["container"] = bytes
          end
          value
        elsif request.media_type == "application/json"
          body = request.body.read(MAX_REQUEST_BYTES + 1)
          raise InputError.new("Ukuran request melebihi batas 400 MiB.", "request") if body.bytesize > MAX_REQUEST_BYTES
          value = parse_json(body)
          if operation == :encrypt && value["input"].is_a?(Hash) && value["input"]["kind"] == "file"
            raise InputError.new("File harus dikirim sebagai bagian biner multipart.", "file")
          end
          value
        else
          raise InputError.new("Gunakan application/json untuk teks atau multipart/form-data untuk file.", "request")
        end
      ensure
        # Rack multipart uses temporary files; no input is persisted after processing.
        tempfile&.close!
      end

      def respond_crypto(operation)
        value = crypto_request(operation)
        JSON.generate(Engine.public_send(operation, value))
      end
    end

    get "/health" do
      JSON.generate(status: "ok", engine: "ruby", rubyVersion: RUBY_VERSION, algorithms: Keys::CIPHER_IDS)
    end

    post "/api/crypto/encrypt" do
      respond_crypto(:encrypt)
    end

    post "/api/crypto/decrypt" do
      respond_crypto(:decrypt)
    end

    post "/api/crypto/inspect" do
      respond_crypto(:inspect)
    end

    error InputError do
      exception = env["sinatra.error"]
      status 422
      result = { message: exception.message, field: exception.field }
      result[:fieldErrors] = exception.field_errors if exception.field_errors
      JSON.generate(result)
    end

    error Rack::Multipart::EmptyContentError, Rack::Multipart::MultipartPartLimitError, Rack::Multipart::MultipartTotalPartLimitError do
      status 400
      JSON.generate(message: "Request multipart tidak valid atau terlalu banyak bagian.", field: "file")
    end

    error do
      status 500
      JSON.generate(message: "Layanan Ruby gagal memproses permintaan.", field: "request")
    end

    not_found do
      JSON.generate(message: "Endpoint tidak ditemukan.", field: "request")
    end
  end
end
```

## apps/api/config.ru

```ruby
require_relative "app"
run UtsCrypto::App
```

## apps/api/config/puma.rb

```ruby
bind "tcp://#{ENV.fetch('API_HOST', '127.0.0.1')}:#{ENV.fetch('API_PORT', '4567')}"
threads 1, Integer(ENV.fetch("API_THREADS", "4"))
environment ENV.fetch("APP_ENV", "development")
```

## apps/api/lib/uts_crypto/ciphers/classical.rb

```ruby
require_relative "../errors"
require_relative "../codecs"
require_relative "modular"

module UtsCrypto
  module Classical
    module_function

    def vigenere(text, keyword, decrypt: false, autokey: false)
      out = "\0".b * text.bytesize
      text.each_byte.with_index do |byte, i|
        shift = if autokey && i >= keyword.bytesize
                  (decrypt ? out : text).getbyte(i - keyword.bytesize) - 65
                else
                  keyword.getbyte(i % keyword.bytesize) - 65
                end
        value = byte - 65 + (decrypt ? -shift : shift)
        out.setbyte(i, value % 26 + 65)
      end
      out
    end

    def extended(bytes, key, decrypt: false)
      out = "\0".b * bytes.bytesize
      bytes.each_byte.with_index do |byte, i|
        shift = key.getbyte(i % key.bytesize)
        out.setbyte(i, (byte + (decrypt ? -shift : shift)) % 256)
      end
      out
    end

    def affine(text, a, b, decrypt: false)
      out = "\0".b * text.bytesize
      inv = Modular.inverse(a, 26) if decrypt
      text.each_byte.with_index do |byte, i|
        value = byte - 65
        out.setbyte(i, (decrypt ? inv * (value - b) : a * value + b) % 26 + 65)
      end
      out
    end

    def hill(text, matrix)
      n = matrix.length
      unless (text.bytesize % n).zero?
        raise InputError.new("Panjang cipherteks Hill (#{text.bytesize}) bukan kelipatan #{n}.", "cipherInput")
      end
      out = "\0".b * text.bytesize
      (0...text.bytesize).step(n) do |base|
        n.times do |r|
          sum = 0
          n.times { |c| sum += matrix[r][c] * (text.getbyte(base + c) - 65) }
          out.setbyte(base + r, sum % 26 + 65)
        end
      end
      out
    end

    def column_order(keyword)
      (0...keyword.bytesize).sort_by { |index| [keyword.getbyte(index), index] }
    end

    def transpose(bytes, keyword, decrypt: false)
      n = keyword.bytesize
      order = column_order(keyword)
      out = "\0".b * bytes.bytesize
      cursor = 0
      order.each do |column|
        index = column
        while index < bytes.bytesize
          if decrypt
            out.setbyte(index, bytes.getbyte(cursor))
          else
            out.setbyte(cursor, bytes.getbyte(index))
          end
          cursor += 1
          index += n
        end
      end
      out
    end

    def super_cipher(bytes, key, column_key, decrypt: false)
      if decrypt
        extended(transpose(bytes, column_key, decrypt: true), key, decrypt: true)
      else
        transpose(extended(bytes, key), column_key)
      end
    end
  end
end
```

## apps/api/lib/uts_crypto/ciphers/enigma.rb

```ruby
module UtsCrypto
  # Enigma I, entry wheel identity, three rotors (left/middle/right).
  # A machine instance owns the running positions; its initial key is never mutated.
  class Enigma
    ROTORS = {
      "I" => ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", "Q"],
      "II" => ["AJDKSIRUXBLHWTMCQGZNPYFVOE", "E"],
      "III" => ["BDFHJLCPRTXVZNYEIWGAKMUSQO", "V"],
      "IV" => ["ESOVPZJAYQUIRHXLNFTGKDCMWB", "J"],
      "V" => ["VZBRGITYUPSDNHLXAWMJQOFECK", "Z"]
    }.transform_values do |(wiring, notch)|
      forward = wiring.bytes.map { |v| v - 65 }.freeze
      reverse = Array.new(26)
      forward.each_with_index { |value, index| reverse[value] = index }
      { forward: forward, reverse: reverse.freeze, notch: notch.ord - 65 }.freeze
    end.freeze
    REFLECTORS = {
      "B" => "YRUHQSLDPXNGOKMIEBFZCWVJAT",
      "C" => "FVPJIAOYEDRZXWGCTKUQSBNMHL"
    }.transform_values { |s| s.bytes.map { |v| v - 65 }.freeze }.freeze

    def initialize(config)
      @rotors = config.fetch(:rotors).map { |name| ROTORS.fetch(name) }
      @rings = config.fetch(:rings).dup
      @positions = config.fetch(:positions).dup
      @reflector = REFLECTORS.fetch(config.fetch(:reflector))
      @plugboard = config.fetch(:plugboard).dup
    end

    def positions
      @positions.map { |p| (p + 65).chr }.join
    end

    def step
      advance
      positions
    end

    def transform(letters)
      out = "\0".b * letters.bytesize
      letters.each_byte.with_index do |byte, index|
        advance
        signal = @plugboard[byte - 65]
        signal = through(signal, 2, :forward)
        signal = through(signal, 1, :forward)
        signal = through(signal, 0, :forward)
        signal = @reflector[signal]
        signal = through(signal, 0, :reverse)
        signal = through(signal, 1, :reverse)
        signal = through(signal, 2, :reverse)
        out.setbyte(index, @plugboard[signal] + 65)
      end
      out
    end

    private

    def advance
      right_turnover = @positions[2] == @rotors[2][:notch]
      middle_turnover = @positions[1] == @rotors[1][:notch]
      @positions[0] = (@positions[0] + 1) % 26 if middle_turnover
      @positions[1] = (@positions[1] + 1) % 26 if right_turnover || middle_turnover
      @positions[2] = (@positions[2] + 1) % 26
    end

    def through(signal, index, direction)
      offset = (@positions[index] - @rings[index]) % 26
      (@rotors[index][direction][(signal + offset) % 26] - offset) % 26
    end
  end
end
```

## apps/api/lib/uts_crypto/ciphers/modular.rb

```ruby
module UtsCrypto
  module Modular
    module_function

    def inverse(value, modulus)
      old_r, r = value % modulus, modulus
      old_s, s = 1, 0
      until r.zero?
        quotient = old_r / r
        old_r, r = r, old_r - quotient * r
        old_s, s = s, old_s - quotient * s
      end
      old_r == 1 ? old_s % modulus : nil
    end

    def solve_prime(matrix, prime)
      n = matrix.length
      work = matrix.map { |row| row.map { |v| v % prime } }
      result = Array.new(n) { |r| Array.new(n) { |c| r == c ? 1 : 0 } }
      determinant = 1
      n.times do |column|
        pivot = (column...n).find { |row| work[row][column] != 0 }
        return [0, nil] unless pivot

        if pivot != column
          work[pivot], work[column] = work[column], work[pivot]
          result[pivot], result[column] = result[column], result[pivot]
          determinant = -determinant % prime
        end
        value = work[column][column]
        determinant = determinant * value % prime
        scale = inverse(value, prime)
        n.times do |c|
          work[column][c] = work[column][c] * scale % prime
          result[column][c] = result[column][c] * scale % prime
        end
        n.times do |row|
          next if row == column

          factor = work[row][column]
          n.times do |c|
            work[row][c] = (work[row][c] - factor * work[column][c]) % prime
            result[row][c] = (result[row][c] - factor * result[column][c]) % prime
          end
        end
      end
      [determinant, result]
    end

    def crt26(mod2, mod13)
      (mod13 + 13 * ((mod2 - mod13) % 2)) % 26
    end

    # Work on the fields F2 and F13, then combine by CRT; no real-number inverse.
    def matrix_inverse(matrix)
      d2, inverse2 = solve_prime(matrix, 2)
      d13, inverse13 = solve_prime(matrix, 13)
      determinant = crt26(d2, d13)
      return [determinant, nil] unless inverse2 && inverse13

      n = matrix.length
      result = Array.new(n) do |r|
        Array.new(n) { |c| crt26(inverse2[r][c], inverse13[r][c]) }
      end
      [determinant, result]
    end
  end
end
```

## apps/api/lib/uts_crypto/ciphers/playfair.rb

```ruby
require_relative "../codecs"

module UtsCrypto
  module Playfair
    module_function

    def matrix(keyword)
      cells = (keyword.tr("J", "I") + Codecs::ALPHA25).bytes.uniq
      positions = Array.new(256, -1)
      cells.each_with_index { |letter, i| positions[letter] = i }
      [cells, positions]
    end

    def prepare(text)
      merged = text.tr("J", "I")
      prepared = String.new(encoding: Encoding::BINARY, capacity: text.bytesize * 2)
      fillers = Codecs.bitset(text.bytesize * 2)
      js = Codecs.bitset(text.bytesize)
      j_count = 0
      filler_count = 0
      text.each_byte.with_index do |byte, i|
        next unless byte == 74

        Codecs.set_bit(js, i)
        j_count += 1
      end
      i = 0
      while i < merged.bytesize
        a = merged.getbyte(i)
        b = merged.getbyte(i + 1)
        prepared << a
        if b.nil? || a == b
          prepared << (a == 88 ? 81 : 88)
          Codecs.set_bit(fillers, prepared.bytesize - 1)
          filler_count += 1
          i += 1
        else
          prepared << b
          i += 2
        end
      end
      {
        prepared: prepared, filler: fillers.byteslice(0, (prepared.bytesize + 7) / 8),
        j: js, filler_count: filler_count, j_count: j_count
      }
    end

    def transform(text, keyword, decrypt: false)
      if text.bytesize.odd?
        raise InputError.new("Cipherteks Playfair harus berpanjang genap.", "cipherInput")
      end
      cells, positions = matrix(keyword)
      out = "\0".b * text.bytesize
      shift = decrypt ? 4 : 1
      (0...text.bytesize).step(2) do |index|
        a = positions[text.getbyte(index)]
        b = positions[text.getbyte(index + 1)]
        if a.negative? || b.negative?
          raise InputError.new("Cipherteks Playfair tidak boleh memuat J.", "cipherInput")
        end
        if a == b
          raise InputError.new("Pasangan Playfair berisi huruf sama.", "cipherInput")
        end
        ra, ca = a.divmod(5)
        rb, cb = b.divmod(5)
        if ra == rb
          a = ra * 5 + (ca + shift) % 5
          b = rb * 5 + (cb + shift) % 5
        elsif ca == cb
          a = ((ra + shift) % 5) * 5 + ca
          b = ((rb + shift) % 5) * 5 + cb
        else
          a = ra * 5 + cb
          b = rb * 5 + ca
        end
        out.setbyte(index, cells[a])
        out.setbyte(index + 1, cells[b])
      end
      out
    end

    def restore(prepared, filler, js)
      out = String.new(encoding: Encoding::BINARY, capacity: prepared.bytesize)
      prepared.each_byte.with_index { |byte, i| out << byte unless Codecs.get_bit(filler, i) }
      out.bytesize.times do |i|
        next unless Codecs.get_bit(js, i)

        unless out.getbyte(i) == 73
          raise InputError.new("Metadata posisi J tidak cocok dengan hasil dekripsi. Periksa kunci atau data paket.", "key")
        end
        out.setbyte(i, 74)
      end
      out
    end
  end
end
```

## apps/api/lib/uts_crypto/codecs.rb

```ruby
require "base64"
require_relative "errors"

module UtsCrypto
  module Codecs
    ALPHA25 = "ABCDEFGHIKLMNOPQRSTUVWXYZ".b.freeze
    ALPHA25_INVERSE = Array.new(256, -1).tap do |table|
      ALPHA25.each_byte.with_index { |value, index| table[value] = index }
    end.freeze
    module_function

    # Filter ASCII first: Unicode uppercase expansions must not create new letters.
    def normalize(text)
      text.b.gsub(/[^A-Za-z]/n, "").upcase
    end

    def base64(bytes)
      Base64.strict_encode64(bytes)
    end

    def unbase64(text, field = "cipherInput")
      raise InputError.new("Base64 harus berupa teks.", field) unless text.is_a?(String)

      clean = text.delete(" \t\r\n")
      unless clean.match?(/\A(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?\z/)
        raise InputError.new("Base64 tidak valid: periksa karakter, panjang, dan padding.", field)
      end
      bytes = Base64.strict_decode64(clean).b
      unless base64(bytes) == clean
        raise InputError.new("Bit sisa sebelum padding tidak nol. Base64 rusak.", field)
      end
      bytes
    rescue ArgumentError
      raise InputError.new("Base64 tidak valid.", field)
    end

    def alpha25_encode(bytes)
      out = "\0".b * (bytes.bytesize * 2)
      bytes.each_byte.with_index do |byte, i|
        out.setbyte(i * 2, ALPHA25.getbyte(byte / 25))
        out.setbyte(i * 2 + 1, ALPHA25.getbyte(byte % 25))
      end
      out
    end

    def alpha25_decode(letters)
      raise InputError, "Panjang codec alpha25 harus genap." if letters.bytesize.odd?

      out = "\0".b * (letters.bytesize / 2)
      out.bytesize.times do |i|
        first = ALPHA25_INVERSE[letters.getbyte(i * 2)]
        second = ALPHA25_INVERSE[letters.getbyte(i * 2 + 1)]
        if first.negative? || second.negative?
          raise InputError, "Simbol codec alpha25 di luar alfabet tanpa J."
        end
        value = first * 25 + second
        raise InputError, "Pasangan codec alpha25 melebihi nilai byte 255." if value > 255

        out.setbyte(i, value)
      end
      out
    end

    def bitset(length)
      "\0".b * ((length + 7) / 8)
    end

    def set_bit(bits, index)
      offset = index / 8
      bits.setbyte(offset, bits.getbyte(offset) | (1 << (index % 8)))
    end

    def get_bit(bits, index)
      !bits.nil? && (bits.getbyte(index / 8).to_i & (1 << (index % 8))) != 0
    end

    def count_bits(bits)
      bits.each_byte.sum { |byte| byte.digits(2).sum }
    end

    def utf8?(bytes)
      bytes.dup.force_encoding(Encoding::UTF_8).valid_encoding?
    end
  end
end
```

## apps/api/lib/uts_crypto/container.rb

```ruby
require "json"
require_relative "keys"

module UtsCrypto
  module Container
    MAGIC = "UTSKRIPT".b.freeze
    VERSION = 1
    FIXED_HEADER_LENGTH = 13
    MAX_METADATA_LENGTH = 64 * 1024 * 1024
    MAX_PAYLOAD_LENGTH = 256 * 1024 * 1024
    module_function

    def codec(cipher, mode)
      if Keys.alpha?(cipher)
        mode == "file" ? "alpha25-v1" : "alpha-text-v1"
      else
        mode == "file" ? "bytes-v1" : "utf8-v1"
      end
    end

    def sanitize_filename(name)
      base = name.split(/[\\\/]/).last.to_s
      result = base.gsub(/[\x00-\x1f\x7f<>:"|?*]/, "_").sub(/\A\.+/, "").strip[0, 200]
      result.empty? ? "hasil-dekripsi.bin" : result
    end

    def serialize(metadata, payload)
      header = JSON.generate(metadata).encode(Encoding::UTF_8).b
      raise ContainerError, "Panjang metadata melebihi batas." if header.bytesize > MAX_METADATA_LENGTH
      raise ContainerError, "Panjang payload melebihi batas." if payload.bytesize > MAX_PAYLOAD_LENGTH

      MAGIC + [VERSION, header.bytesize].pack("CN") + header + payload.b
    end

    def fail!(message)
      raise ContainerError, "Metadata paket tidak valid: #{message}"
    end

    def nonnegative?(value)
      value.is_a?(Integer) && value.between?(0, Keys::MAX_SAFE_INTEGER)
    end

    def decode_bitset(value, length, label)
      begin
        bits = Codecs.unbase64(value, "package")
      rescue InputError => e
        fail!("#{label} bukan Base64 yang valid (#{e.message}).")
      end
      fail!("panjang #{label} tidak sesuai dengan panjang data.") unless bits.bytesize == (length + 7) / 8
      remainder = length % 8
      if remainder != 0 && (bits.getbyte(-1) >> remainder) != 0
        fail!("#{label} memuat bit di luar panjang data.")
      end
      bits
    end

    def validate(raw, payload_length)
      fail!("bukan objek JSON.") unless raw.is_a?(Hash)
      algorithm = raw["algorithm"]
      fail!("algoritma tidak dikenal.") unless Keys::CIPHER_IDS.include?(algorithm)
      mode = raw["inputMode"]
      fail!("mode masukan tidak dikenal.") unless %w[text file].include?(mode)
      alpha = Keys.alpha?(algorithm)
      fail!("codec tidak sesuai dengan algoritma dan mode.") unless raw["codec"] == codec(algorithm, mode)
      encoding = alpha ? "ascii-letters" : "bytes"
      fail!("encoding payload tidak sesuai algoritma.") unless raw["payloadEncoding"] == encoding
      length = raw["payloadLength"]
      fail!("panjang payload tidak masuk akal.") unless nonnegative?(length) && length <= MAX_PAYLOAD_LENGTH
      unless length == payload_length
        raise ContainerError, "Panjang payload tidak cocok: metadata menyebut #{length} byte, paket berisi #{payload_length} byte."
      end
      expected = raw["expectedLength"]
      fail!("ukuran hasil tidak masuk akal.") unless nonnegative?(expected) && expected <= MAX_PAYLOAD_LENGTH
      fail!("algoritma checksum tidak didukung.") unless raw["checksumAlgorithm"] == "SHA-256"
      checksum = raw["sha256"]
      fail!("checksum SHA-256 tidak valid.") unless checksum.is_a?(String) && checksum.match?(/\A[0-9a-f]{64}\z/)
      metadata = {
        "algorithm" => algorithm, "inputMode" => mode, "codec" => raw["codec"],
        "payloadEncoding" => encoding, "payloadLength" => length, "expectedLength" => expected,
        "checksumAlgorithm" => "SHA-256", "sha256" => checksum
      }
      if raw.key?("file")
        file = raw["file"]
        unless file.is_a?(Hash) && file["name"].is_a?(String) && file["type"].is_a?(String) && file["name"].length <= 1024 && file["type"].length <= 255
          fail!("informasi file asal rusak atau terlalu panjang.")
        end
        metadata["file"] = { "name" => sanitize_filename(file["name"]), "type" => file["type"] }
      end
      if raw.key?("sourceFileName")
        name = raw["sourceFileName"]
        fail!("nama file sumber rusak.") unless name.is_a?(String) && name.length <= 1024
        metadata["sourceFileName"] = sanitize_filename(name)
      end
      letters_length = length
      playfair_bits = nil
      if algorithm == "playfair"
        p = raw["playfair"]
        fail!("metadata Playfair tidak ada.") unless p.is_a?(Hash)
        fail!("representasi penanda Playfair tidak didukung.") unless p["markers"] == "bitset-lsb-v1"
        fail!("payload Playfair harus berpanjang genap.") if length.odd?
        unless nonnegative?(p["fillerCount"]) && nonnegative?(p["jCount"])
          fail!("jumlah penanda Playfair rusak.")
        end
        filler = decode_bitset(p["filler"], length, "bitset pengisi")
        fail!("jumlah pengisi tidak cocok dengan bitset.") unless Codecs.count_bits(filler) == p["fillerCount"]
        letters_length = length - p["fillerCount"]
        js = nil
        if p.key?("j")
          fail!("mode file tidak memakai penanda J.") if mode == "file"
          js = decode_bitset(p["j"], letters_length, "bitset J")
          fail!("jumlah J tidak cocok dengan bitset.") unless Codecs.count_bits(js) == p["jCount"]
        elsif p["jCount"] != 0
          fail!("bitset J tidak ada.")
        end
        metadata["playfair"] = p.slice("markers", "filler", "fillerCount", "jCount", "j")
        playfair_bits = { filler: filler, j: js }
      elsif raw.key?("playfair")
        fail!("metadata Playfair hanya untuk algoritma Playfair.")
      end
      if algorithm == "hill"
        h = raw["hill"]
        fail!("metadata Hill tidak ada.") unless h.is_a?(Hash)
        n = h["n"]
        fail!("ukuran blok Hill tidak valid.") unless n.is_a?(Integer) && n.between?(2, Keys::HILL_MAX_SIZE)
        pad = h["padCount"]
        fail!("jumlah padding Hill tidak valid.") unless nonnegative?(pad) && pad < n && pad <= length
        fail!("panjang payload Hill bukan kelipatan ukuran blok.") unless (length % n).zero?
        letters_length = length - pad
        metadata["hill"] = { "n" => n, "padCount" => pad }
      elsif raw.key?("hill")
        fail!("metadata Hill hanya untuk algoritma Hill.")
      end
      if alpha
        expected_letters = mode == "file" ? expected * 2 : expected
        fail!("ukuran hasil tidak konsisten dengan panjang payload.") unless letters_length == expected_letters
      elsif expected != length
        fail!("ukuran hasil harus sama dengan panjang payload untuk cipher byte.")
      end
      { metadata: metadata, playfair_bits: playfair_bits }
    end

    def parse(bytes)
      if bytes.bytesize < MAGIC.bytesize
        raise ContainerError, "Header paket terpotong: hanya #{bytes.bytesize} byte."
      end
      raise ContainerError, "Data bukan paket UTSKRIPT (penanda format tidak ditemukan)." unless bytes.start_with?(MAGIC)
      raise ContainerError, "Header paket terpotong: minimal #{FIXED_HEADER_LENGTH} byte." if bytes.bytesize < FIXED_HEADER_LENGTH
      version = bytes.getbyte(8)
      raise ContainerError, "Versi paket #{version} tidak didukung. Versi yang didukung: #{VERSION}." unless version == VERSION
      metadata_length = bytes.byteslice(9, 4).unpack1("N")
      raise ContainerError, "Panjang metadata #{metadata_length} byte melebihi batas." if metadata_length > MAX_METADATA_LENGTH
      if FIXED_HEADER_LENGTH + metadata_length > bytes.bytesize
        raise ContainerError, "Paket terpotong: metadata menyatakan #{metadata_length} byte tetapi data tidak mencukupi."
      end
      header = bytes.byteslice(FIXED_HEADER_LENGTH, metadata_length).force_encoding(Encoding::UTF_8)
      raise ContainerError, "Metadata paket rusak: bukan JSON UTF-8 yang valid." unless header.valid_encoding?
      begin
        raw = JSON.parse(header, max_nesting: 100)
      rescue JSON::ParserError
        raise ContainerError, "Metadata paket rusak: bukan JSON UTF-8 yang valid."
      end
      payload = bytes.byteslice(FIXED_HEADER_LENGTH + metadata_length..).b
      validate(raw, payload.bytesize).merge(payload: payload, version: version, metadata_length: metadata_length)
    end
  end
end
```

## apps/api/lib/uts_crypto/engine.rb

```ruby
require "digest"
require_relative "container"
require_relative "ciphers/classical"
require_relative "ciphers/playfair"
require_relative "ciphers/enigma"

module UtsCrypto
  module Engine
    MAX_FILE_BYTES = 50 * 1024 * 1024
    CHECK_KEY_HINT = "Kemungkinan kunci salah atau data paket rusak."
    module_function

    def object!(value, field)
      raise InputError.new("#{field} harus berupa objek.", field) unless value.is_a?(Hash)
      value
    end

    def string!(value, field)
      raise InputError.new("#{field} harus berupa teks.", field) unless value.is_a?(String)
      value
    end

    def limit!(bytes, field = "file")
      if bytes.bytesize > MAX_FILE_BYTES
        raise InputError.new("Ukuran masukan #{bytes.bytesize} byte melebihi batas implementasi #{MAX_FILE_BYTES} byte (50 MiB).", field)
      end
    end

    def encrypt_letters(key, text, input_mode)
      details = []
      recovery = {}
      payload = case key[:cipher]
                when "vigenere", "autokey"
                  Classical.vigenere(text, key[:keyword], autokey: key[:cipher] == "autokey")
                when "affine"
                  Classical.affine(text, key[:a], key[:b])
                when "hill"
                  n = key[:matrix].length
                  pad = (n - text.bytesize % n) % n
                  recovery["hill"] = { "n" => n, "padCount" => pad }
                  details << "Padding X ditambahkan: #{pad} huruf (blok #{n} huruf)."
                  Classical.hill(text + "X".b * pad, key[:matrix])
                when "playfair"
                  prep = Playfair.prepare(text)
                  recovery["playfair"] = {
                    "markers" => "bitset-lsb-v1", "filler" => Codecs.base64(prep[:filler]),
                    "fillerCount" => prep[:filler_count], "jCount" => prep[:j_count]
                  }
                  recovery["playfair"]["j"] = Codecs.base64(prep[:j]) if input_mode == "text"
                  rows = Playfair.matrix(key[:keyword]).first.each_slice(5).map { |row| row.pack("C*").chars.join(" ") }
                  details << "Matriks Playfair: #{rows.join(' / ')}"
                  details << "Huruf pengisi disisipkan: #{prep[:filler_count]}. Huruf J digabung ke I: #{prep[:j_count]}."
                  Playfair.transform(prep[:prepared], key[:keyword])
                when "enigma-i"
                  machine = Enigma.new(key[:enigma])
                  result = machine.transform(text)
                  details << "Posisi akhir rotor: #{machine.positions} (kiri, tengah, kanan). Dekripsi memakai posisi awal yang sama."
                  result
                end
      [payload, recovery, details]
    end

    def decrypt_letters(key, text, parsed = nil)
      result = case key[:cipher]
               when "vigenere", "autokey"
                 Classical.vigenere(text, key[:keyword], decrypt: true, autokey: key[:cipher] == "autokey")
               when "affine"
                 Classical.affine(text, key[:a], key[:b], decrypt: true)
               when "hill"
                 if parsed && key[:matrix].length != parsed[:metadata]["hill"]["n"]
                   raise InputError.new("Paket dibuat dengan matriks #{parsed[:metadata]['hill']['n']} x #{parsed[:metadata]['hill']['n']}, sedangkan kunci berukuran #{key[:matrix].length} x #{key[:matrix].length}.", "hillMatrix")
                 end
                 Classical.hill(text, key[:inverse])
               when "playfair"
                 Playfair.transform(text, key[:keyword], decrypt: true)
               when "enigma-i"
                 Enigma.new(key[:enigma]).transform(text)
               end
      if parsed && key[:cipher] == "playfair"
        bits = parsed[:playfair_bits]
        result = Playfair.restore(result, bits[:filler], bits[:j])
      elsif parsed && key[:cipher] == "hill"
        result = result.byteslice(0, result.bytesize - parsed[:metadata]["hill"]["padCount"])
      end
      result
    end

    def bytes_cipher(key, bytes, decrypt: false)
      if key[:cipher] == "super"
        Classical.super_cipher(bytes, key[:bytes], key[:column], decrypt: decrypt)
      else
        Classical.extended(bytes, key[:bytes], decrypt: decrypt)
      end
    end

    def encrypt(request)
      object!(request, "request")
      cipher = Keys.cipher!(request["cipher"])
      key, notes = Keys.parse(cipher, request["key"])
      input = object!(request["input"], "input")
      unless %w[text file].include?(input["kind"])
        raise InputError.new("Mode masukan harus text atau file.", "input")
      end
      alpha = Keys.alpha?(cipher)
      details = []
      if input["kind"] == "text"
        original = string!(input["text"], "message").encode(Encoding::UTF_8).b
        limit!(original, "message")
        mode = "text"
        plain = alpha ? Codecs.normalize(original) : original
        if plain.empty?
          raise InputError.new(original.empty? ? "Pesan wajib diisi." : "Pesan tidak menyisakan huruf A-Z setelah normalisasi.", "message")
        end
        letters = plain if alpha
      else
        original = string!(input["bytes"], "file").b
        limit!(original)
        read_as = input["readAs"]
        unless %w[bytes alpha-text].include?(read_as)
          raise InputError.new("Cara membaca file harus bytes atau alpha-text.", "file")
        end
        name = string!(input["name"], "file")
        type = string!(input["type"], "file")
        raise InputError.new("Nama atau MIME file terlalu panjang.", "file") if name.length > 1024 || type.length > 255
        if alpha && read_as == "alpha-text"
          mode = "text"
          plain = Codecs.normalize(original)
          raise InputError.new("Isi file tidak menyisakan huruf A-Z setelah normalisasi.", "file") if plain.empty?
          letters = plain
        else
          mode = "file"
          plain = original
          if alpha
            letters = Codecs.alpha25_encode(original)
            details << "Codec alpha25-v1: #{plain.bytesize} byte menjadi #{letters.bytesize} huruf sebelum cipher."
          end
        end
      end
      recovery = {}
      if alpha
        payload, recovery, algorithm_details = encrypt_letters(key, letters, mode)
        details.concat(algorithm_details)
      else
        payload = bytes_cipher(key, plain)
      end
      metadata = {
        "algorithm" => cipher, "inputMode" => mode, "codec" => Container.codec(cipher, mode),
        "payloadEncoding" => alpha ? "ascii-letters" : "bytes", "payloadLength" => payload.bytesize,
        "expectedLength" => plain.bytesize, "checksumAlgorithm" => "SHA-256", "sha256" => Digest::SHA256.hexdigest(plain)
      }
      if input["kind"] == "file"
        if mode == "file"
          metadata["file"] = { "name" => Container.sanitize_filename(name), "type" => type }
        else
          metadata["sourceFileName"] = Container.sanitize_filename(name)
        end
      end
      metadata.merge!(recovery)
      {
        "cipher" => cipher, "inputMode" => mode,
        "plainBase64" => Codecs.base64(plain), "payloadBase64" => Codecs.base64(payload),
        "containerBase64" => Codecs.base64(Container.serialize(metadata, payload)),
        "metadata" => metadata, "keyNotes" => notes, "details" => details
      }
    end

    def package_bytes(request)
      return request["container"].b if request["container"].is_a?(String)
      Codecs.unbase64(request["containerBase64"], "package")
    end

    def inspect(request)
      object!(request, "request")
      metadata = Container.parse(package_bytes(request))[:metadata]
      {
        "algorithm" => metadata["algorithm"], "inputMode" => metadata["inputMode"], "codec" => metadata["codec"],
        "payloadLength" => metadata["payloadLength"], "expectedLength" => metadata["expectedLength"],
        "fileName" => metadata.dig("file", "name"), "fileType" => metadata.dig("file", "type"),
        "sourceFileName" => metadata["sourceFileName"]
      }
    end

    def decrypt_package(request)
      parsed = Container.parse(package_bytes(request))
      metadata = parsed[:metadata]
      payload = parsed[:payload]
      cipher = metadata["algorithm"]
      key, notes = Keys.parse(cipher, request["key"])
      details = []
      if Keys.alpha?(cipher)
        unless payload.match?(/\A[A-Z]*\z/n)
          raise ContainerError, "Payload cipher alfabet berisi karakter selain A-Z."
        end
        letters = decrypt_letters(key, payload, parsed)
        if metadata["playfair"]
          p = metadata["playfair"]
          details << "Pengisi dibuang sesuai metadata: #{p['fillerCount']}. J dipulihkan: #{p['jCount']}."
        end
        if metadata["hill"]
          details << "Padding X dibuang sesuai metadata: #{metadata['hill']['padCount']}."
        end
        if metadata["codec"] == "alpha25-v1"
          begin
            bytes = Codecs.alpha25_decode(letters)
          rescue InputError => e
            raise InputError.new("Dekripsi gagal: hasil tidak dapat dikembalikan menjadi byte file. #{CHECK_KEY_HINT} (Detail: #{e.message})", "key")
          end
          details << "Codec alpha25-v1: #{letters.bytesize} huruf dikembalikan menjadi #{bytes.bytesize} byte."
        else
          bytes = letters
        end
      else
        bytes = bytes_cipher(key, payload, decrypt: true)
      end
      unless bytes.bytesize == metadata["expectedLength"]
        raise InputError.new("Ukuran hasil #{bytes.bytesize} byte tidak sama dengan ukuran yang diharapkan #{metadata['expectedLength']} byte. #{CHECK_KEY_HINT}", "key")
      end
      checksum = Digest::SHA256.hexdigest(bytes)
      unless checksum == metadata["sha256"]
        raise InputError.new("Checksum SHA-256 hasil dekripsi tidak cocok dengan paket sehingga pemulihan tidak dinyatakan berhasil. #{CHECK_KEY_HINT}", "key")
      end
      representation = metadata["inputMode"] == "file" ? "binary" : (Keys.alpha?(cipher) ? "letters" : "utf8")
      {
        "cipher" => cipher, "source" => "package", "inputMode" => metadata["inputMode"],
        "representation" => representation, "bytesBase64" => Codecs.base64(bytes), "payloadBase64" => Codecs.base64(payload),
        "verified" => true, "sha256" => checksum, "expectedSha256" => metadata["sha256"],
        "fileName" => metadata.dig("file", "name"), "fileType" => metadata.dig("file", "type"),
        "keyNotes" => notes, "details" => details
      }
    end

    def decrypt(request)
      object!(request, "request")
      kind = request["kind"]
      return decrypt_package(request) if kind == "package"
      unless %w[raw-letters payload-base64].include?(kind)
        raise InputError.new("Format dekripsi tidak dikenal.", "cipherInput")
      end
      cipher = Keys.cipher!(request["cipher"])
      alpha = Keys.alpha?(cipher)
      if kind == "raw-letters"
        raise InputError.new("Cipherteks alfabet mentah hanya untuk enam cipher alfabet.", "cipherInput") unless alpha
        payload = Codecs.normalize(string!(request["text"], "cipherInput"))
      else
        payload = Codecs.unbase64(request["base64"])
      end
      if payload.bytesize > Container::MAX_PAYLOAD_LENGTH
        raise InputError.new("Panjang payload melebihi batas 256 MiB.", "cipherInput")
      end
      key, notes = Keys.parse(cipher, request["key"])
      details = []
      if alpha
        letters = Codecs.normalize(payload)
        raise InputError.new("Cipherteks tidak berisi huruf A-Z.", "cipherInput") if letters.empty?
        bytes = decrypt_letters(key, letters)
        representation = "letters"
        details << "Tanpa metadata, huruf pengisi dan I hasil penggabungan J tetap ada pada hasil." if cipher == "playfair"
        details << "Tanpa metadata, padding X di akhir tetap ada pada hasil." if cipher == "hill"
      else
        bytes = bytes_cipher(key, payload, decrypt: true)
        representation = Codecs.utf8?(bytes) ? "utf8" : "binary"
      end
      details << "Jalur mentah tidak memiliki checksum sehingga kunci salah tidak selalu dapat dikenali."
      {
        "cipher" => cipher, "source" => kind, "inputMode" => "raw", "representation" => representation,
        "bytesBase64" => Codecs.base64(bytes), "payloadBase64" => Codecs.base64(payload), "verified" => false,
        "sha256" => Digest::SHA256.hexdigest(bytes), "expectedSha256" => nil, "fileName" => nil, "fileType" => nil,
        "keyNotes" => notes, "details" => details
      }
    end
  end
end
```

## apps/api/lib/uts_crypto/errors.rb

```ruby
module UtsCrypto
  class InputError < StandardError
    attr_reader :field, :field_errors

    def initialize(message, field = nil, field_errors: nil)
      super(message)
      @field = field
      @field_errors = field_errors
    end
  end

  class KeyError < InputError
    def initialize(errors)
      super(errors.values.first || "Kunci tidak valid.", errors.keys.first, field_errors: errors)
    end
  end

  class ContainerError < InputError
    def initialize(message)
      super(message, "package")
    end
  end
end
```

## apps/api/lib/uts_crypto/keys.rb

```ruby
require_relative "codecs"
require_relative "ciphers/modular"
require_relative "ciphers/enigma"

module UtsCrypto
  module Keys
    HILL_MAX_SIZE = 10
    MAX_SAFE_INTEGER = (1 << 53) - 1
    MAX_KEY_CHARACTERS = 65_536
    CIPHER_IDS = %w[vigenere autokey extended-vigenere playfair affine hill super enigma-i].freeze
    BYTE_CIPHERS = %w[extended-vigenere super].freeze
    module_function

    def alpha?(cipher)
      !BYTE_CIPHERS.include?(cipher)
    end

    def cipher!(cipher)
      unless CIPHER_IDS.include?(cipher)
        raise InputError.new("Algoritma tidak dikenal.", "cipher")
      end
      cipher
    end

    def error!(field, message)
      raise KeyError.new({ field => message })
    end

    def text!(values, field)
      value = values[field]
      error!(field, "Kunci #{field} harus berupa teks.") unless value.is_a?(String)
      error!(field, "Batas implementasi: kunci maksimal #{MAX_KEY_CHARACTERS} karakter.") if value.length > MAX_KEY_CHARACTERS
      value
    end

    def alphabetic(values, field, label)
      raw = text!(values, field)
      error!(field, "#{label} wajib diisi.") if raw.strip.empty?
      result = Codecs.normalize(raw)
      error!(field, "#{label} tidak mengandung huruf A-Z sehingga kosong setelah normalisasi.") if result.empty?
      result
    end

    def integer(values, field, label)
      raw = text!(values, field).strip
      error!(field, "#{label} wajib diisi.") if raw.empty?
      error!(field, "#{label} harus bilangan bulat.") unless raw.match?(/\A[+-]?\d+\z/)
      value = raw.to_i
      error!(field, "#{label} terlalu besar.") if value.abs > MAX_SAFE_INTEGER
      value
    end

    def byte_key(values)
      raw = text!(values, "byteKey")
      format = values["byteKeyFormat"]
      unless %w[text hex].include?(format)
        error!("byteKeyFormat", "Format kunci byte harus text atau hex.")
      end
      if format == "hex"
        clean = raw.gsub(/0x/i, "").gsub(/[\s,:]/, "")
        error!("byteKey", "Kunci heksadesimal wajib diisi.") if clean.empty?
        error!("byteKey", "Kunci heksadesimal hanya boleh berisi 0-9 dan A-F.") unless clean.match?(/\A[0-9a-fA-F]+\z/)
        error!("byteKey", "Jumlah digit heksadesimal harus genap (dua digit per byte).") if clean.length.odd?
        [clean].pack("H*").b
      else
        error!("byteKey", "Kunci byte wajib diisi (minimal satu byte).") if raw.empty?
        raw.encode(Encoding::UTF_8).b
      end
    end

    def matrix(values)
      raw = text!(values, "hillMatrix")
      rows = raw.delete("[").split(/[\];\n]/).map { |row| row.gsub(/\A[\s,]+|[\s,]+\z/, "") }.reject(&:empty?)
      error!("hillMatrix", "Matriks Hill wajib diisi.") if rows.empty?
      n = rows.length
      error!("hillMatrix", "Matriks Hill minimal berukuran 2 x 2.") if n < 2
      error!("hillMatrix", "Batas implementasi: ukuran matriks maksimal #{HILL_MAX_SIZE} x #{HILL_MAX_SIZE}.") if n > HILL_MAX_SIZE
      rows.map.with_index do |row, index|
        cells = row.split(/[\s,]+/)
        unless cells.length == n
          error!("hillMatrix", "Matriks harus persegi: ada #{n} baris tetapi baris #{index + 1} berisi #{cells.length} elemen.")
        end
        cells.map do |cell|
          error!("hillMatrix", "Elemen #{cell.inspect} bukan bilangan bulat.") unless cell.match?(/\A[+-]?\d+\z/)
          value = cell.to_i
          error!("hillMatrix", "Elemen #{cell.inspect} terlalu besar.") if value.abs > MAX_SAFE_INTEGER
          value % 26
        end
      end
    end

    def enigma(values)
      errors = {}
      rotors = values["rotors"]
      if !rotors.is_a?(Array) || rotors.length != 3 || !rotors.all? { |r| Enigma::ROTORS.key?(r) }
        errors["rotors"] = "Pilih tepat tiga rotor I sampai V dalam urutan kiri, tengah, kanan."
      elsif rotors.uniq.length != 3
        errors["rotors"] = "Ketiga rotor harus berbeda."
      end
      rings = values["ringSettings"]
      unless rings.is_a?(Array) && rings.length == 3 && rings.all? { |r| r.is_a?(Integer) && r.between?(1, 26) }
        errors["ringSettings"] = "Ring setting harus tiga bilangan bulat 1 sampai 26 (kiri, tengah, kanan)."
      end
      positions = values["initialPositions"]
      unless positions.is_a?(Array) && positions.length == 3 && positions.all? { |p| p.is_a?(String) && p.match?(/\A[A-Z]\z/) }
        errors["initialPositions"] = "Posisi awal harus tiga huruf A sampai Z (kiri, tengah, kanan)."
      end
      reflector = values["reflector"]
      errors["reflector"] = "Reflector harus B atau C." unless Enigma::REFLECTORS.key?(reflector)
      raw_board = values["plugboard"]
      board = (0...26).to_a
      pair_count = 0
      if !raw_board.is_a?(String)
        errors["plugboard"] = "Plugboard harus berupa teks pasangan dua huruf; boleh kosong."
      elsif raw_board.length > MAX_KEY_CHARACTERS
        errors["plugboard"] = "Plugboard terlalu panjang."
      else
        pairs = raw_board.strip.split(/\s+/)
        pair_count = pairs.length
        if pair_count > 13
          errors["plugboard"] = "Plugboard maksimal 13 pasangan."
        else
          used = []
          pairs.each do |pair|
            unless pair.match?(/\A[A-Za-z]{2}\z/)
              errors["plugboard"] = "Setiap pasangan plugboard harus tepat dua huruf A sampai Z."
              break
            end
            a, b = pair.upcase.bytes.map { |v| v - 65 }
            if a == b
              errors["plugboard"] = "Pasangan plugboard tidak boleh memasangkan huruf dengan dirinya sendiri."
              break
            elsif used.include?(a) || used.include?(b)
              errors["plugboard"] = "Setiap huruf hanya boleh digunakan pada satu pasangan plugboard."
              break
            end
            used.concat([a, b])
            board[a], board[b] = b, a
          end
        end
      end
      raise KeyError.new(errors) unless errors.empty?

      {
        rotors: rotors.dup.freeze, rings: rings.map { |r| r - 1 }.freeze,
        positions: positions.map { |p| p.ord - 65 }.freeze,
        reflector: reflector, plugboard: board.freeze, pair_count: pair_count
      }.freeze
    end

    def parse(cipher, values)
      cipher!(cipher)
      raise KeyError.new({ "key" => "Konfigurasi kunci harus berupa objek." }) unless values.is_a?(Hash)

      key = { cipher: cipher }
      notes = []
      case cipher
      when "vigenere", "autokey", "playfair"
        label = cipher == "autokey" ? "Primer" : "Kata kunci"
        key[:keyword] = alphabetic(values, "keyword", label)
        notes << "#{label} setelah normalisasi: #{key[:keyword]}"
      when "extended-vigenere", "super"
        key[:bytes] = byte_key(values)
        notes << "Kunci byte: #{key[:bytes].bytesize} byte #{values['byteKeyFormat'] == 'hex' ? 'dari heksadesimal' : 'UTF-8; spasi dan kapitalisasi dipertahankan'}."
        if cipher == "super"
          key[:column] = alphabetic(values, "columnKey", "Kata kunci kolom")
          notes << "Kata kunci kolom setelah normalisasi: #{key[:column]}"
        end
      when "affine"
        raw_a = integer(values, "affineA", "Nilai a")
        raw_b = integer(values, "affineB", "Nilai b")
        key[:a], key[:b] = raw_a % 26, raw_b % 26
        if key[:a].gcd(26) != 1
          error!("affineA", "a = #{raw_a} (mod 26 = #{key[:a]}) tidak relatif prima terhadap 26. Nilai a valid: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25.")
        end
        notes << "Kunci direduksi modulo 26: a = #{key[:a]}, b = #{key[:b]}." if raw_a != key[:a] || raw_b != key[:b]
      when "hill"
        key[:matrix] = matrix(values)
        key[:determinant], key[:inverse] = Modular.matrix_inverse(key[:matrix])
        unless key[:inverse]
          error!("hillMatrix", "Determinan mod 26 = #{key[:determinant]}, tidak relatif prima terhadap 26 sehingga matriks tidak mempunyai invers.")
        end
        notes << "Matriks #{key[:matrix].length} x #{key[:matrix].length} mod 26: #{key[:matrix].inspect}, determinan mod 26 = #{key[:determinant]}."
        notes << "Invers modulo 26: #{key[:inverse].inspect}."
      when "enigma-i"
        key[:enigma] = enigma(values)
        notes << "Enigma I: tiga rotor kiri, tengah, kanan; #{key[:enigma][:pair_count]} pasangan plugboard. Setiap operasi dimulai dari konfigurasi awal."
      end
      [key, notes]
    end
  end
end
```

## apps/api/spec/api_spec.rb

```ruby
RSpec.describe UtsCrypto::App do
  include Rack::Test::Methods

  def app
    described_class
  end

  def post_json(path, body)
    post path, JSON.generate(body), { "CONTENT_TYPE" => "application/json" }
  end

  def response
    JSON.parse(last_response.body)
  end

  def multipart(path, metadata, bytes, name: "file.bin", type: "application/octet-stream")
    Tempfile.create(["uts-crypto-spec", ".bin"]) do |file|
      file.binmode
      file.write(bytes)
      file.flush
      upload = Rack::Test::UploadedFile.new(file.path, type, true, original_filename: name)
      post path, { "metadata" => JSON.generate(metadata), "file" => upload }
    end
  end

  it "Health menyatakan mesin Ruby nyata dan delapan cipher" do
    get "/health"
    expect(last_response.status).to eq(200)
    expect(response).to include("engine" => "ruby", "rubyVersion" => RUBY_VERSION)
    expect(response["algorithms"]).to eq(UtsCrypto::Keys::CIPHER_IDS)
    expect(last_response.headers["cache-control"]).to include("no-store")
  end

  {
    "vigenere" => ["ATTACKATDAWN", "LXFOPVEFRNHR"],
    "autokey" => ["ATTACKATDAWN", "QNXEPVYTWTWP"],
    "playfair" => ["HIDETHEGOLDINTHETREESTUMP", "BMODZBXDNABEKUDMUIXMMOUVIF"],
    "affine" => ["AFFINECIPHER", "IHHWVCSWFRCP"],
    "hill" => ["ACT", "POH"], "enigma-i" => ["HELLOWORLD", "ILBDAAMTAZ"]
  }.each do |cipher, (plain, expected)|
    it "#{cipher} API JSON menggunakan keluaran acuan Ruby dan memulihkannya" do
      post_json("/api/crypto/encrypt", "cipher" => cipher, "key" => test_key(cipher), "input" => { "kind" => "text", "text" => plain })
      expect(last_response.status).to eq(200)
      result = response
      expect(decode(result["payloadBase64"])).to eq(expected)
      post_json("/api/crypto/decrypt", "kind" => "package", "containerBase64" => result["containerBase64"], "key" => test_key(cipher))
      expect(last_response.status).to eq(200)
      expect(decode(response["bytesBase64"])).to eq(plain)
      expect(response["verified"]).to be(true)
    end
  end

  it "Enigma TV-08 melalui API menghasilkan BDZGO dan reset permintaan" do
    2.times do
      post_json("/api/crypto/encrypt", "cipher" => "enigma-i", "key" => default_enigma_key, "input" => { "kind" => "text", "text" => "A A! 3A AA" })
      expect(last_response.status).to eq(200)
      expect(decode(response["payloadBase64"])).to eq("BDZGO")
    end
  end

  UtsCrypto::Keys::CIPHER_IDS.each do |cipher|
    it "#{cipher} menerima seluruh byte multipart dan memulihkan nama file pada sesi baru" do
      plain = (0..255).to_a.pack("C*")
      request = {
        "cipher" => cipher, "key" => test_key(cipher),
        "input" => { "kind" => "file", "readAs" => "bytes", "name" => "arsip.data.bin", "type" => "application/octet-stream" }
      }
      multipart("/api/crypto/encrypt", request, plain)
      expect(last_response.status).to eq(200)
      encrypted = response
      expect(decode(encrypted["plainBase64"])).to eq(plain)
      container = decode(encrypted["containerBase64"])
      multipart("/api/crypto/inspect", {}, container)
      expect(last_response.status).to eq(200)
      expect(response).to include("algorithm" => cipher, "fileName" => "arsip.data.bin", "expectedLength" => 256)
      multipart("/api/crypto/decrypt", { "kind" => "package", "key" => test_key(cipher) }, container)
      expect(last_response.status).to eq(200)
      expect(response).to include("fileName" => "arsip.data.bin", "verified" => true)
      expect(decode(response["bytesBase64"])).to eq(plain)
    end
  end

  it "API menerima file nol byte multipart" do
    metadata = { "cipher" => "enigma-i", "key" => default_enigma_key, "input" => { "kind" => "file", "readAs" => "bytes", "name" => "empty.bin", "type" => "application/octet-stream" } }
    multipart("/api/crypto/encrypt", metadata, "".b)
    expect(last_response.status).to eq(200)
    expect(response["metadata"]["expectedLength"]).to eq(0)
    container = decode(response["containerBase64"])
    multipart("/api/crypto/decrypt", { "key" => default_enigma_key }, container)
    expect(last_response.status).to eq(200)
    expect(response["bytesBase64"]).to eq("")
    expect(response["verified"]).to be(true)
  end

  it "Membersihkan seluruh tempfile multipart, termasuk bagian tambahan dan request gagal" do
    created = []
    paths = []
    factory = lambda do |_filename, _content_type|
      file = Tempfile.new("uts-multipart-cleanup")
      paths << file.path
      created << file
      file
    end
    Tempfile.create(["uts-cleanup-source", ".bin"]) do |source|
      source.write("binary contents")
      source.flush
      file = Rack::Test::UploadedFile.new(source.path, "application/octet-stream", true)
      invalid = { "cipher" => "enigma-i", "key" => {}, "input" => { "kind" => "file", "readAs" => "bytes", "name" => "test.bin", "type" => "application/octet-stream" } }
      post "/api/crypto/encrypt", { "metadata" => JSON.generate(invalid), "file" => file, "extra" => file }, { "rack.multipart.tempfile_factory" => factory }
      expect(last_response.status).to eq(422)
    end
    expect(created.length).to eq(2)
    expect(created).to all(be_closed)
    expect(paths.none? { |path| File.exist?(path) }).to be(true)
  end

  it "Byte cipher TV-03 dan TV-07 melalui file API" do
    [
      ["extended-vigenere", [0, 65, 255], [1, 67, 0]],
      ["super", [0, 1, 2, 3, 254, 255, 128], [3, 1, 5, 1, 255, 3, 129]]
    ].each do |cipher, plain, expected|
      metadata = { "cipher" => cipher, "key" => test_key(cipher), "input" => { "kind" => "file", "readAs" => "bytes", "name" => "vector.bin", "type" => "application/octet-stream" } }
      multipart("/api/crypto/encrypt", metadata, plain.pack("C*"))
      expect(last_response.status).to eq(200)
      expect(decode(response["payloadBase64"]).bytes).to eq(expected)
    end
  end

  it "API raw dan payload-base64 Enigma memakai konfigurasi awal" do
    [
      { "kind" => "raw-letters", "cipher" => "enigma-i", "text" => "ILBDAAMTAZ", "key" => default_enigma_key },
      { "kind" => "payload-base64", "cipher" => "enigma-i", "base64" => "SUxCREFBTVRBWg==", "key" => default_enigma_key }
    ].each do |body|
      post_json("/api/crypto/decrypt", body)
      expect(last_response.status).to eq(200)
      expect(decode(response["bytesBase64"])).to eq("HELLOWORLD")
      expect(response["verified"]).to be(false)
    end
  end

  it "API memberikan fieldErrors untuk rotor duplikat tanpa hasil palsu" do
    post_json("/api/crypto/encrypt", "cipher" => "enigma-i", "key" => default_enigma_key.merge("rotors" => %w[I I III]), "input" => { "kind" => "text", "text" => "HELLO" })
    expect(last_response.status).to eq(422)
    expect(response["fieldErrors"]).to have_key("rotors")
    expect(response).not_to have_key("payloadBase64")
  end

  it "Checksum salah melalui API gagal sebagai kesalahan kunci atau paket" do
    encrypted = encrypt_text("enigma-i", "HELLOWORLD")
    post_json("/api/crypto/decrypt", "kind" => "package", "containerBase64" => encrypted["containerBase64"], "key" => default_enigma_key.merge("ringSettings" => [2, 2, 2]))
    expect(last_response.status).to eq(422)
    expect(response["message"]).to include("Checksum", "kunci salah atau data paket rusak")
    expect(response).not_to have_key("verified")
  end

  it "API memvalidasi Base64 dan paket sebelum memproses" do
    post_json("/api/crypto/inspect", "containerBase64" => "AB==")
    expect(last_response.status).to eq(422)
    post_json("/api/crypto/decrypt", "kind" => "package", "containerBase64" => "QUFBQQ==", "key" => default_enigma_key)
    expect(last_response.status).to eq(422)
    expect(response["field"]).to eq("package")
  end

  it "API menolak JSON file karena file harus multipart biner" do
    post_json("/api/crypto/encrypt", "cipher" => "vigenere", "key" => test_key("vigenere"), "input" => { "kind" => "file", "bytesBase64" => "AA==" })
    expect(last_response.status).to eq(422)
    expect(response["message"]).to include("multipart")
  end

  it "API menolak tipe nested yang tidak sesuai kontrak dan JSON rusak" do
    [[], { "cipher" => "vigenere", "key" => nil, "input" => [] },
     { "cipher" => "vigenere", "key" => test_key("vigenere"), "input" => [] }].each do |body|
      post_json("/api/crypto/encrypt", body)
      expect(last_response.status).to eq(422)
    end
    post "/api/crypto/encrypt", "{broken", { "CONTENT_TYPE" => "application/json" }
    expect(last_response.status).to eq(422)
  end

  it "API menolak request terlalu besar sebelum membaca body" do
    post "/api/crypto/encrypt", "{}", { "CONTENT_TYPE" => "application/json", "CONTENT_LENGTH" => (described_class::MAX_REQUEST_BYTES + 1).to_s }
    expect(last_response.status).to eq(413)
  end
end
```

## apps/api/spec/ciphers_spec.rb

```ruby
RSpec.describe "Vektor cipher Ruby" do
  [
    ["vigenere", "ATTACKATDAWN", "LXFOPVEFRNHR"],
    ["autokey", "ATTACKATDAWN", "QNXEPVYTWTWP"],
    ["playfair", "HIDETHEGOLDINTHETREESTUMP", "BMODZBXDNABEKUDMUIXMMOUVIF"],
    ["affine", "AFFINECIPHER", "IHHWVCSWFRCP"],
    ["hill", "ACT", "POH"],
    ["enigma-i", "AAAAA", "BDZGO"],
    ["enigma-i", "HELLOWORLD", "ILBDAAMTAZ"]
  ].each do |cipher, plain, expected|
    it "#{cipher}: #{plain} menjadi #{expected} dan pulih melalui paket" do
      encrypted = encrypt_text(cipher, plain)
      expect(decode(encrypted["payloadBase64"])).to eq(expected)
      result = decrypt_package(encrypted, test_key(cipher))
      expect(decode(result["bytesBase64"])).to eq(plain)
      expect(result["verified"]).to be(true)
    end
  end

  it "Extended Vigenere menambah byte modulo 256 (TV-03)" do
    plain = [0, 65, 255].pack("C*")
    key = [1, 2].pack("C*")
    expect(UtsCrypto::Classical.extended(plain, key).bytes).to eq([1, 67, 0])
    expect(UtsCrypto::Classical.extended([1, 67, 0].pack("C*"), key, decrypt: true)).to eq(plain)
  end

  it "Super menjalankan Extended lalu transposisi stable tanpa padding (TV-07)" do
    plain = [0, 1, 2, 3, 254, 255, 128].pack("C*")
    key = [1, 2].pack("C*")
    intermediate = UtsCrypto::Classical.extended(plain, key)
    expect(intermediate.bytes).to eq([1, 3, 3, 5, 255, 1, 129])
    expect(UtsCrypto::Classical.column_order("BABA")).to eq([1, 3, 0, 2])
    output = UtsCrypto::Classical.super_cipher(plain, key, "BABA")
    expect(output.bytes).to eq([3, 1, 5, 1, 255, 3, 129])
    expect(UtsCrypto::Classical.super_cipher(output, key, "BABA", decrypt: true)).to eq(plain)
  end

  it "Playfair mentah mempertahankan pengisi dan I yang berasal dari J" do
    result = UtsCrypto::Engine.decrypt(
      "kind" => "raw-letters", "cipher" => "playfair", "text" => "BMODZBXDNABEKUDMUIXMMOUVIF", "key" => test_key("playfair")
    )
    expect(decode(result["bytesBase64"])).to eq("HIDETHEGOLDINTHETREXESTUMP")
    expect(result["verified"]).to be(false)
  end

  %w[BALLOON JIG XX XQX X Q AXQX].each do |plain|
    it "Playfair memulihkan #{plain} tepat melalui marker I/J dan pengisi" do
      encrypted = encrypt_text("playfair", plain)
      result = decrypt_package(encrypted, test_key("playfair"))
      expect(decode(result["bytesBase64"])).to eq(plain)
    end
  end

  it "Hill menangani matriks invertibel tanpa pivot invertibel modulo 26" do
    key = { "hillMatrix" => "2 1;13 7" }
    parsed, = UtsCrypto::Keys.parse("hill", key)
    expect(parsed[:determinant]).to eq(1)
    expect(parsed[:inverse]).to eq([[7, 25], [13, 2]])
    result = decrypt_package(encrypt_text("hill", "ACTX", key), key)
    expect(decode(result["bytesBase64"])).to eq("ACTX")
  end

  %w[ACT ACTX ACTXXX].each do |plain|
    it "Hill mempertahankan X asli dalam #{plain} dan membuang tepat padding tercatat" do
      encrypted = encrypt_text("hill", plain)
      result = decrypt_package(encrypted, test_key("hill"))
      expect(decode(result["bytesBase64"])).to eq(plain)
      raw = UtsCrypto::Engine.decrypt(
        "kind" => "payload-base64", "cipher" => "hill", "base64" => encrypted["payloadBase64"], "key" => test_key("hill")
      )
      expect(decode(raw["bytesBase64"])).to eq(plain + "X" * ((3 - plain.length % 3) % 3))
    end
  end

  it "Normalisasi menyaring ASCII sebelum uppercase Unicode" do
    expect(UtsCrypto::Codecs.normalize("Serang pukul 10.30! é ß ı ﬀ" )).to eq("SERANGPUKUL")
  end

  %w[A ABCDEFGH ABCDEFGHIJKLMNOPQRSTUVWXYZ].each do |keyword|
    %w[vigenere autokey playfair].each do |cipher|
      it "#{cipher} menerima kunci #{keyword.length} huruf, termasuk lebih panjang dari pesan" do
        key = { "keyword" => keyword }
        plain = "LONGPLAINTEXTFORAUTOKEY"
        expect(decode(decrypt_package(encrypt_text(cipher, plain, key), key)["bytesBase64"])).to eq(plain)
      end
    end
  end

  ["BABA", "Z", "KEYLONGERTHANINPUT", "BANANA"].each do |column_key|
    it "Transposisi #{column_key} membalik data pendek dan baris tidak penuh" do
      ["", "\0".b, (0..10).to_a.pack("C*")].each do |bytes|
        cipher = UtsCrypto::Classical.transpose(bytes, column_key)
        expect(UtsCrypto::Classical.transpose(cipher, column_key, decrypt: true)).to eq(bytes)
        expect(cipher.bytesize).to eq(bytes.bytesize)
      end
    end
  end

  it "Extended menerima byte 0-255 dan teks UTF-8 multibyte" do
    all_bytes = (0..255).to_a.pack("C*")
    key = [0, 255, 1].pack("C*")
    cipher = UtsCrypto::Classical.extended(all_bytes, key)
    expect(UtsCrypto::Classical.extended(cipher, key, decrypt: true)).to eq(all_bytes)
    plain = "Ruby, kriptografi — é✓🎉\n"
    encrypted = encrypt_text("extended-vigenere", plain)
    expect(decode(decrypt_package(encrypted, test_key("extended-vigenere"))["bytesBase64"])).to eq(plain.b)
  end
end
```

## apps/api/spec/codecs_spec.rb

```ruby
RSpec.describe UtsCrypto::Codecs do
  it "Codec alpha25 mencakup semua byte dan tidak mengandung J" do
    bytes = (0..255).to_a.pack("C*")
    encoded = described_class.alpha25_encode(bytes)
    expect(encoded.bytesize).to eq(512)
    expect(encoded).not_to include("J")
    expect(encoded.byteslice(0, 2)).to eq("AA")
    expect(encoded.byteslice(-2, 2)).to eq("LF")
    expect(described_class.alpha25_decode(encoded)).to eq(bytes)
  end

  ["A", "AJ", "ZA", "LZ", "AA!A"].each do |invalid|
    it "Codec menolak #{invalid.inspect}" do
      expect { described_class.alpha25_decode(invalid) }.to raise_error(UtsCrypto::InputError)
    end
  end

  it "Codec menerima file nol byte" do
    expect(described_class.alpha25_encode("".b)).to eq("")
    expect(described_class.alpha25_decode("".b)).to eq("")
  end

  it "Base64 seluruh byte mempertahankan kapitalisasi dan whitespace copy diterima" do
    bytes = (0..255).to_a.pack("C*")
    encoded = described_class.base64(bytes)
    expect(described_class.unbase64(encoded)).to eq(bytes)
    expect(described_class.base64([0, 65, 255].pack("C*"))).to eq("AEH/")
    expect(described_class.unbase64(" A E\r\nH/\t").bytes).to eq([0, 65, 255])
    expect(described_class.unbase64("YWJj")).to eq("abc")
    expect(described_class.unbase64("" )).to eq("")
  end

  ["a", "AA===", "=AAA", "AA=A", "A===", "AA$=", "AB==", "AAB=", "YWJj-", "éAAA"].each do |invalid|
    it "Base64 menolak #{invalid.inspect}, termasuk bit sisa nonzero" do
      expect { described_class.unbase64(invalid) }.to raise_error(UtsCrypto::InputError)
    end
  end

  it "Bitset LSB-first memakai representasi ringkas dan dapat menghitung marker" do
    bits = described_class.bitset(10)
    [0, 7, 9].each { |i| described_class.set_bit(bits, i) }
    expect(bits.bytes).to eq([129, 2])
    expect(described_class.count_bits(bits)).to eq(3)
    expect(described_class.get_bit(bits, 9)).to be(true)
    expect(described_class.get_bit(bits, 8)).to be(false)
  end
end
```

## apps/api/spec/container_spec.rb

```ruby
RSpec.describe UtsCrypto::Container do
  def mutate_package(encrypted)
    parsed = parsed_package(encrypted)
    yield parsed[:metadata], parsed[:payload]
    described_class.serialize(parsed[:metadata], parsed[:payload])
  end

  it "Menyimpan layout biner v1 dan Base64 payload terpisah dari paket" do
    encrypted = encrypt_text("vigenere", "ATTACKATDAWN")
    bytes = decode(encrypted["containerBase64"])
    expect(bytes.byteslice(0, 8)).to eq("UTSKRIPT")
    expect(bytes.getbyte(8)).to eq(1)
    length = bytes.byteslice(9, 4).unpack1("N")
    header = JSON.parse(bytes.byteslice(13, length))
    expect(header).to eq(encrypted["metadata"])
    expect(bytes.byteslice(13 + length..)).to eq("LXFOPVEFRNHR")
    expect(described_class.parse(bytes)[:payload]).to eq(decode(encrypted["payloadBase64"]))
    expect(bytes).not_to eq(encrypted["payloadBase64"])
  end

  it "Kontainer tidak menyimpan kunci, posisi rotor, plainteks, atau file asli" do
    key = default_enigma_key.merge("plugboard" => "AB CD", "ringSettings" => [13, 22, 7])
    encrypted = encrypt_text("enigma-i", "SOMELONGSECRETPLAINTEXT", key)
    metadata = parsed_package(encrypted)[:metadata]
    expect(metadata.keys).to contain_exactly("algorithm", "inputMode", "codec", "payloadEncoding", "payloadLength", "expectedLength", "checksumAlgorithm", "sha256")
    expect(JSON.generate(metadata)).not_to include("rotors", "ringSettings", "initialPositions", "reflector", "plugboard", "SOMELONGSECRETPLAINTEXT")
  end

  it "Membersihkan nama file dari path dan karakter terlarang" do
    expect(described_class.sanitize_filename("../../.secret:?.bin")).to eq("secret__.bin")
    expect(described_class.sanitize_filename("C:\\dir\\laporan.txt")).to eq("laporan.txt")
    expect(described_class.sanitize_filename(".. ")).to eq("hasil-dekripsi.bin")
  end

  it "Menolak header terpotong, magic salah, versi baru, dan alokasi tidak masuk akal" do
    valid = decode(encrypt_text("vigenere", "HELLOWORLD")["containerBase64"])
    [valid.byteslice(0, 7), valid.byteslice(0, 12), "BADMAGIC" + valid.byteslice(8..),
     "UTSKRIPT" + [2, 0].pack("CN"), "UTSKRIPT" + [1, described_class::MAX_METADATA_LENGTH + 1].pack("CN"),
     "UTSKRIPT" + [1, 1000].pack("CN") + "{}"].each do |invalid|
      expect { described_class.parse(invalid) }.to raise_error(UtsCrypto::ContainerError)
    end
  end

  it "Menolak JSON rusak dan metadata UTF-8 invalid" do
    ["{garbage}", "\xff".b].each do |header|
      invalid = "UTSKRIPT".b + [1, header.bytesize].pack("CN") + header
      expect { described_class.parse(invalid) }.to raise_error(UtsCrypto::ContainerError)
    end
  end

  {
    "algorithm" => "aes", "inputMode" => "raw", "codec" => "bytes-v1", "payloadEncoding" => "bytes",
    "payloadLength" => 999, "expectedLength" => -1, "checksumAlgorithm" => "MD5", "sha256" => "a" * 63,
    "playfair" => {}, "hill" => {}, "file" => { "name" => [], "type" => "" }, "sourceFileName" => 12
  }.each do |field, value|
    it "Menolak metadata #{field} yang tidak valid" do
      encrypted = encrypt_text("vigenere", "HELLOWORLD")
      bytes = mutate_package(encrypted) { |metadata, _| metadata[field] = value }
      expect { described_class.parse(bytes) }.to raise_error(UtsCrypto::ContainerError)
    end
  end

  it "Memastikan padding Hill dan panjang hasil konsisten" do
    encrypted = encrypt_text("hill", "ACTX")
    [{ "n" => 1, "padCount" => 0 }, { "n" => 3, "padCount" => 3 }, { "n" => 2, "padCount" => 0 }].each do |hill|
      bytes = mutate_package(encrypted) { |metadata, _| metadata["hill"] = hill }
      expect { described_class.parse(bytes) }.to raise_error(UtsCrypto::ContainerError)
    end
  end

  it "Memastikan bitset Playfair panjang, jumlah, dan bit sisanya konsisten" do
    encrypted = encrypt_text("playfair", "JIG")
    [{ "filler" => "" }, { "fillerCount" => 0 }, { "filler" => "/w==" },
     { "jCount" => 0 }, { "j" => "gA==" }, { "markers" => "positions-v0" }].each do |change|
      bytes = mutate_package(encrypted) { |metadata, _| metadata["playfair"].merge!(change) }
      expect { described_class.parse(bytes) }.to raise_error(UtsCrypto::ContainerError)
    end
  end

  it "Marker pengisi Playfair skala bitset, bukan array setiap huruf" do
    encrypted = encrypt_text("playfair", "X" * 8000)
    metadata = encrypted["metadata"]
    expect(metadata["playfair"]["fillerCount"]).to eq(8000)
    expect(decode(metadata["playfair"]["filler"]).bytesize).to eq(2000)
    expect(JSON.generate(metadata).bytesize).to be < 5000
  end
end
```

## apps/api/spec/engine_spec.rb

```ruby
RSpec.describe UtsCrypto::Engine do
  UtsCrypto::Keys::CIPHER_IDS.each do |cipher|
    ["".b, "\xff".b, (0..255).to_a.pack("C*")].each do |bytes|
      it "#{cipher}: file #{bytes.bytesize} byte (termasuk kosong/bukan UTF-8) pulih seluruhnya" do
        encrypted = encrypt_file(cipher, bytes, name: "foto.data.png", type: "image/png")
        recovered = decrypt_package(encrypted, test_key(cipher))
        expect(decode(recovered["bytesBase64"])).to eq(bytes)
        expect(recovered["fileName"]).to eq("foto.data.png")
        expect(recovered["fileType"]).to eq("image/png")
        expect(recovered["representation"]).to eq("binary")
        expect(recovered["verified"]).to be(true)
        expect(recovered["sha256"]).to eq(Digest::SHA256.hexdigest(bytes))
      end
    end
  end

  it "Mode file utuh default memproses seluruh header, mode alpha-text disengaja menormalisasi" do
    bytes = "Serang pukul 10.30! é\n".b
    whole = encrypt_file("enigma-i", bytes, name: "pesan.txt", type: "text/plain")
    expect(whole["inputMode"]).to eq("file")
    expect(decode(decrypt_package(whole, default_enigma_key)["bytesBase64"])).to eq(bytes)
    text = encrypt_file("enigma-i", bytes, name: "pesan.txt", type: "text/plain", read_as: "alpha-text")
    expect(text["inputMode"]).to eq("text")
    expect(text["metadata"]["sourceFileName"]).to eq("pesan.txt")
    expect(decode(decrypt_package(text, default_enigma_key)["bytesBase64"])).to eq("SERANGPUKUL")
  end

  it "Base64 alfabet didekode dulu; filter tidak membuang simbol Base64" do
    request = { "kind" => "payload-base64", "cipher" => "vigenere", "base64" => "TFhGT1BWRUZSTkhS", "key" => test_key("vigenere") }
    result = described_class.decrypt(request)
    expect(decode(result["bytesBase64"])).to eq("ATTACKATDAWN")
    expect(result["verified"]).to be(false)
  end

  it "Inspector memulihkan algoritma, mode, dan nama dari paket tanpa state lama" do
    encrypted = encrypt_file("enigma-i", "\x89PNG\r\n\x1a\n\xff".b, name: "gambar.png", type: "image/png")
    summary = described_class.inspect("containerBase64" => encrypted["containerBase64"])
    expect(summary).to include("algorithm" => "enigma-i", "inputMode" => "file", "codec" => "alpha25-v1", "fileName" => "gambar.png")
  end

  it "Kunci salah dan payload rusak gagal checksum tanpa klaim berhasil" do
    encrypted = encrypt_text("enigma-i", "HELLOWORLD")
    wrong_key = default_enigma_key.merge("initialPositions" => %w[A A B])
    expect { decrypt_package(encrypted, wrong_key) }.to raise_error(UtsCrypto::InputError, /Checksum/)
    parsed = parsed_package(encrypted)
    parsed[:payload].setbyte(0, 65)
    corrupt = { "containerBase64" => UtsCrypto::Codecs.base64(UtsCrypto::Container.serialize(parsed[:metadata], parsed[:payload])) }
    expect { decrypt_package(corrupt, default_enigma_key) }.to raise_error(UtsCrypto::InputError, /Checksum/)
  end

  it "Menolak payload package alfabet nonhuruf sebelum cipher" do
    encrypted = encrypt_text("enigma-i", "HELLOWORLD")
    parsed = parsed_package(encrypted)
    parsed[:payload].setbyte(0, 0)
    corrupt = { "containerBase64" => UtsCrypto::Codecs.base64(UtsCrypto::Container.serialize(parsed[:metadata], parsed[:payload])) }
    expect { decrypt_package(corrupt, default_enigma_key) }.to raise_error(UtsCrypto::ContainerError, /selain A-Z/)
  end

  it "Matriks Hill berbeda ukuran ditolak sesuai metadata" do
    encrypted = encrypt_text("hill", "ACT")
    expect { decrypt_package(encrypted, { "hillMatrix" => "2 1;13 7" }) }.to raise_error(UtsCrypto::InputError) { |error| expect(error.field).to eq("hillMatrix") }
  end

  it "Menolak pesan kosong/tanpa huruf serta jenis request tidak dikenal" do
    ["", "123?!", "éßﬀ"].each do |text|
      expect { encrypt_text("enigma-i", text) }.to raise_error(UtsCrypto::InputError)
    end
    expect { encrypt_text("extended-vigenere", "") }.to raise_error(UtsCrypto::InputError)
    expect { described_class.encrypt("cipher" => "aes", "input" => {}) }.to raise_error(UtsCrypto::InputError)
    expect { described_class.decrypt("kind" => "guess") }.to raise_error(UtsCrypto::InputError)
    expect { described_class.encrypt([]) }.to raise_error(UtsCrypto::InputError)
  end

  it "Batas input 50 MiB ditolak sebelum cipher tanpa memotong file" do
    oversized = "\0".b * (described_class::MAX_FILE_BYTES + 1)
    expect { encrypt_file("enigma-i", oversized) }.to raise_error(UtsCrypto::InputError, /50 MiB/)
  end

  it "Jalur mentah Playfair dan Hill menolak panjang yang salah" do
    %w[playfair hill].each do |cipher|
      expect { described_class.decrypt("kind" => "raw-letters", "cipher" => cipher, "text" => "A", "key" => test_key(cipher)) }.to raise_error(UtsCrypto::InputError)
    end
    expect { described_class.decrypt("kind" => "raw-letters", "cipher" => "playfair", "text" => "AA", "key" => test_key("playfair")) }.to raise_error(UtsCrypto::InputError)
  end
end
```

## apps/api/spec/enigma_spec.rb

```ruby
RSpec.describe UtsCrypto::Enigma do
  def machine(key = default_enigma_key)
    parsed, = UtsCrypto::Keys.parse("enigma-i", key)
    described_class.new(parsed[:enigma])
  end

  it "Double stepping ADU menghasilkan ADV, AEW, BFX sebelum sinyal" do
    key = default_enigma_key.merge("initialPositions" => %w[A D U])
    engine = machine(key)
    expect(engine.step).to eq("ADV")
    expect(engine.step).to eq("AEW")
    expect(engine.step).to eq("BFX")
  end

  it "Ring setting tidak menggeser turnover terhadap huruf jendela" do
    engine = machine(default_enigma_key.merge("initialPositions" => %w[A D U], "ringSettings" => [4, 18, 26]))
    expect([engine.step, engine.step, engine.step]).to eq(%w[ADV AEW BFX])
  end

  reference = JSON.parse(File.read(File.join(__dir__, "support", "enigma_reference.json"), encoding: "bom|utf-8"))
  reference["cases"].each_with_index do |vector, index|
    it "Cocok dengan Py-Enigma 1.0.2 vektor independen non-default #{index + 1}" do
      engine = machine(vector["key"])
      expect(engine.transform(vector["plain"])).to eq(vector["cipher"])
      expect(engine.positions).to eq(vector["finalPositions"])
      expect(machine(vector["key"]).transform(vector["cipher"])).to eq(vector["plain"])
    end
  end

  it "Mesin tetap berjalan saat file diproses dalam blok dan mempertahankan state" do
    letters = UtsCrypto::Codecs.alpha25_encode((0..255).to_a.pack("C*") * 4)
    whole = machine.transform(letters)
    engine = machine
    segmented = (0...letters.length).step(37).map { |i| engine.transform(letters.byteslice(i, 37)) }.join
    expect(segmented).to eq(whole)
    expect(UtsCrypto::Codecs.alpha25_decode(machine.transform(whole))).to eq((0..255).to_a.pack("C*") * 4)
  end

  it "Angka dan tanda baca tidak menggerakkan rotor dan I/J tidak digabung" do
    a = encrypt_text("enigma-i", "H E L L O 12! WORLD")
    b = encrypt_text("enigma-i", "HELLOWORLD")
    expect(a["payloadBase64"]).to eq(b["payloadBase64"])
    original = "IJJIJ"
    result = decrypt_package(encrypt_text("enigma-i", original), default_enigma_key)
    expect(decode(result["bytesBase64"])).to eq(original)
  end

  it "Permintaan identik dan paralel selalu reset tanpa mengubah konfigurasi awal" do
    key = default_enigma_key.merge("plugboard" => "AB CD EF GH IJ KL MN OP QR ST UV WX YZ")
    original = Marshal.load(Marshal.dump(key))
    expected = encrypt_text("enigma-i", "HELLOWORLD", key)["payloadBase64"]
    outputs = 12.times.map do |i|
      Thread.new do
        encrypt_text("enigma-i", "OTHERREQUEST", key.merge("initialPositions" => ["Z", "Z", (65 + i).chr]))
        encrypt_text("enigma-i", "HELLOWORLD", key)["payloadBase64"]
      end
    end.map(&:value)
    expect(outputs).to all(eq(expected))
    expect(key).to eq(original)
    expect(decode(decrypt_package(encrypt_text("enigma-i", "HELLOWORLD", key), key)["bytesBase64"])).to eq("HELLOWORLD")
  end
end
```

## apps/api/spec/keys_spec.rb

```ruby
RSpec.describe UtsCrypto::Keys do
  {
    "vigenere" => [{ "keyword" => "" }, "keyword"],
    "autokey" => [{ "keyword" => "123é" }, "keyword"],
    "playfair" => [{ "keyword" => "!?" }, "keyword"],
    "extended-vigenere" => [{ "byteKey" => "A", "byteKeyFormat" => "hex" }, "byteKey"],
    "affine" => [{ "affineA" => "2", "affineB" => "8" }, "affineA"],
    "hill" => [{ "hillMatrix" => "1 2;2 4" }, "hillMatrix"],
    "super" => [{ "byteKey" => "key", "byteKeyFormat" => "text", "columnKey" => "123" }, "columnKey"]
  }.each do |cipher, (key, field)|
    it "Menolak kunci #{cipher} yang tidak valid dengan field #{field}" do
      expect { described_class.parse(cipher, key) }.to raise_error(UtsCrypto::KeyError) { |error| expect(error.field).to eq(field) }
    end
  end

  [
    [{ "rotors" => %w[I I III] }, "rotors"],
    [{ "rotors" => %w[I II VI] }, "rotors"],
    [{ "rotors" => %w[I II] }, "rotors"],
    [{ "ringSettings" => [0, 1, 1] }, "ringSettings"],
    [{ "ringSettings" => [1, 27, 1] }, "ringSettings"],
    [{ "ringSettings" => [1.0, 1, 1] }, "ringSettings"],
    [{ "ringSettings" => ["01", 1, 1] }, "ringSettings"],
    [{ "initialPositions" => %w[A B 1] }, "initialPositions"],
    [{ "initialPositions" => "AAA" }, "initialPositions"],
    [{ "initialPositions" => %w[a A A] }, "initialPositions"],
    [{ "reflector" => "A" }, "reflector"],
    [{ "plugboard" => "AA" }, "plugboard"],
    [{ "plugboard" => "AB AC" }, "plugboard"],
    [{ "plugboard" => "AB BA" }, "plugboard"],
    [{ "plugboard" => "A1" }, "plugboard"],
    [{ "plugboard" => "ABC" }, "plugboard"],
    [{ "plugboard" => "Aß" }, "plugboard"],
    [{ "plugboard" => ["AB"] }, "plugboard"],
    [{ "plugboard" => (["AB"] * 14).join(" ") }, "plugboard"]
  ].each do |changes, field|
    it "Enigma menolak #{changes.inspect}" do
      expect { described_class.parse("enigma-i", default_enigma_key.merge(changes)) }.to raise_error(UtsCrypto::KeyError) do |error|
        expect(error.field_errors).to have_key(field)
      end
    end
  end

  it "Mengumpulkan seluruh kesalahan konfigurasi Enigma" do
    expect { described_class.parse("enigma-i", {}) }.to raise_error(UtsCrypto::KeyError) do |error|
      expect(error.field_errors.keys).to contain_exactly("rotors", "ringSettings", "initialPositions", "reflector", "plugboard")
    end
  end

  it "Menerima 0-13 pasangan dan menormalisasi lowercase plugboard" do
    ["", "ab cd", "AB CD EF GH IJ KL MN OP QR ST UV WX YZ"].each do |board|
      key, = described_class.parse("enigma-i", default_enigma_key.merge("plugboard" => board))
      expect(key[:enigma][:pair_count]).to eq(board.split.length)
      expect(key[:enigma][:rings]).to eq([0, 0, 0])
    end
  end

  it "Affine negatif dan besar direduksi dengan modulo nonnegatif" do
    key, = described_class.parse("affine", { "affineA" => "-21", "affineB" => "34" })
    expect([key[:a], key[:b]]).to eq([5, 8])
    expect(decode(encrypt_text("affine", "AFFINECIPHER", { "affineA" => "-21", "affineB" => "34" })["payloadBase64"])).to eq("IHHWVCSWFRCP")
  end

  it "Menerima grid dan matriks bracket, menolak singular dan n di luar 2-10" do
    ["2 1;13 7", "[[2,1],[13,7]]", "2,1\n13,7"].each do |matrix|
      key, = described_class.parse("hill", { "hillMatrix" => matrix })
      expect(key[:matrix]).to eq([[2, 1], [13, 7]])
    end
    ["2 0;0 1", "1", "1 2;3 4 5", "1e2 0;0 1", Array.new(11, Array.new(11, "1").join(" ")).join(";")].each do |matrix|
      expect { described_class.parse("hill", { "hillMatrix" => matrix }) }.to raise_error(UtsCrypto::KeyError)
    end
  end

  it "Kunci hex mengikuti kompatibilitas format lama dan menolak invalid format" do
    key, = described_class.parse("extended-vigenere", { "byteKey" => "0x00: FF, 01", "byteKeyFormat" => "hex" })
    expect(key[:bytes].bytes).to eq([0, 255, 1])
    ["", "A", "FG"].each do |hex|
      expect { described_class.parse("extended-vigenere", { "byteKey" => hex, "byteKeyFormat" => "hex" }) }.to raise_error(UtsCrypto::KeyError)
    end
    expect { described_class.parse("extended-vigenere", { "byteKey" => "abc", "byteKeyFormat" => "bogus" }) }.to raise_error(UtsCrypto::KeyError)
  end
end
```

## apps/api/spec/legacy_compatibility_spec.rb

```ruby
RSpec.describe "Kompatibilitas paket TypeScript UTSKRIPT v1 sebelum migrasi" do
  fixture_path = File.expand_path("../../../tests/migration/legacy-typescript-v1.json", __dir__)
  fixtures = JSON.parse(File.read(fixture_path, encoding: "bom|utf-8"))["cases"]

  fixtures.each do |item|
    it "Ruby membaca paket legacy #{item['cipher']} #{item['mode']}" do
      result = UtsCrypto::Engine.decrypt("kind" => "package", "containerBase64" => item["packageBase64"], "key" => item["key"])
      expect(result["bytesBase64"]).to eq(item["plainBase64"])
      expect(result["sha256"]).to eq(item["sha256"])
      expect(result["verified"]).to be(true)
    end

    it "Ruby mempertahankan keluaran byte/paket legacy #{item['cipher']} #{item['mode']}" do
      input = if item["mode"] == "text"
                { "kind" => "text", "text" => item["input"]["text"] }
              else
                { "kind" => "file", "bytes" => decode(item["input"]["bytesBase64"]), "readAs" => "bytes",
                  "name" => item["input"]["name"], "type" => item["input"]["type"] }
              end
      result = UtsCrypto::Engine.encrypt("cipher" => item["cipher"], "key" => item["key"], "input" => input)
      expect(result["payloadBase64"]).to eq(item["payloadBase64"])
      expect(result["plainBase64"]).to eq(item["plainBase64"])
      expect(result["metadata"]).to eq(item["metadata"])
      expect(result["containerBase64"]).to eq(item["packageBase64"])
    end
  end
end
```

## apps/api/spec/spec_helper.rb

```ruby
ENV["APP_ENV"] = "test"
require "rspec"
require "json"
require "tempfile"
require "rack/test"
require_relative "../app"

module CryptoSpecHelpers
  def default_enigma_key
    {
      "rotors" => %w[I II III], "ringSettings" => [1, 1, 1],
      "initialPositions" => %w[A A A], "reflector" => "B", "plugboard" => ""
    }
  end

  def test_key(cipher)
    case cipher
    when "vigenere" then { "keyword" => "LEMON" }
    when "autokey" then { "keyword" => "QUEENLY" }
    when "playfair" then { "keyword" => "PLAYFAIREXAMPLE" }
    when "extended-vigenere" then { "byteKey" => "0102", "byteKeyFormat" => "hex" }
    when "super" then { "byteKey" => "0102", "byteKeyFormat" => "hex", "columnKey" => "BABA" }
    when "affine" then { "affineA" => "5", "affineB" => "8" }
    when "hill" then { "hillMatrix" => "6 24 1;13 16 10;20 17 15" }
    when "enigma-i" then default_enigma_key
    end
  end

  def encrypt_text(cipher, text, key = test_key(cipher))
    UtsCrypto::Engine.encrypt("cipher" => cipher, "key" => key, "input" => { "kind" => "text", "text" => text })
  end

  def encrypt_file(cipher, bytes, key = test_key(cipher), name: "semua-byte.bin", type: "application/octet-stream", read_as: "bytes")
    UtsCrypto::Engine.encrypt(
      "cipher" => cipher, "key" => key,
      "input" => { "kind" => "file", "bytes" => bytes, "readAs" => read_as, "name" => name, "type" => type }
    )
  end

  def decrypt_package(encrypted, key)
    UtsCrypto::Engine.decrypt("kind" => "package", "containerBase64" => encrypted["containerBase64"], "key" => key)
  end

  def decode(value)
    UtsCrypto::Codecs.unbase64(value)
  end

  def parsed_package(encrypted)
    UtsCrypto::Container.parse(decode(encrypted["containerBase64"]))
  end

  def json_fixture(path)
    JSON.parse(File.read(path, encoding: "bom|utf-8"))
  end
end

RSpec.configure do |config|
  config.include CryptoSpecHelpers
  config.order = :random
  config.disable_monkey_patching!
  config.expect_with(:rspec) { |expectations| expectations.syntax = :expect }
end
```

## apps/api/spec/support/capture_enigma_reference.py

```py
"""Reproduce frozen vectors with independent Py-Enigma 1.0.2 (test tooling only).

pip install py-enigma==1.0.2
python apps/api/spec/support/capture_enigma_reference.py
Reference implementation: https://github.com/gremmie/enigma
Documentation: https://py-enigma.readthedocs.io/en/latest/reference.html
"""
import json
from enigma.machine import EnigmaMachine

cases = [
    (["V", "IV", "II"], [2, 3, 4], "QEZ", "C", "AB CD EF GH IJ", "HELLOWORLD"),
    (["IV", "V", "I"], [13, 1, 26], "JZQ", "C", "", "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    (["I", "II", "III"], [2, 12, 26], "ADU", "B", "AV BS CG DL FU HZ IN KM OW RX", "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG"),
]
out = []
for rotors, rings, positions, reflector, plugboard, text in cases:
    machine = EnigmaMachine.from_key_sheet(
        rotors=rotors,
        ring_settings=" ".join(map(str, rings)),
        reflector=reflector,
        plugboard_settings=plugboard,
    )
    machine.set_display(positions)
    ciphertext = machine.process_text(text)
    out.append({
        "key": {"rotors": rotors, "ringSettings": rings,
                "initialPositions": list(positions), "reflector": reflector,
                "plugboard": plugboard},
        "plain": text, "cipher": ciphertext, "finalPositions": machine.get_display(),
    })
print(json.dumps({"source": "Py-Enigma 1.0.2, independent Python simulator",
                  "url": "https://github.com/gremmie/enigma", "cases": out}, indent=2))
```

## apps/api/spec/support/enigma_reference.json

```json
﻿{
  "source": "Py-Enigma 1.0.2, independent Python simulator",
  "url": "https://github.com/gremmie/enigma",
  "cases": [
    {
      "key": {
        "rotors": [
          "V",
          "IV",
          "II"
        ],
        "ringSettings": [
          2,
          3,
          4
        ],
        "initialPositions": [
          "Q",
          "E",
          "Z"
        ],
        "reflector": "C",
        "plugboard": "AB CD EF GH IJ"
      },
      "plain": "HELLOWORLD",
      "cipher": "KTMFGJXFVR",
      "finalPositions": "QFJ"
    },
    {
      "key": {
        "rotors": [
          "IV",
          "V",
          "I"
        ],
        "ringSettings": [
          13,
          1,
          26
        ],
        "initialPositions": [
          "J",
          "Z",
          "Q"
        ],
        "reflector": "C",
        "plugboard": ""
      },
      "plain": "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "cipher": "RSXNDQHFQCDRIFYVCWBHJHSLQYDYOSBSCPVHLBSZMEJOOLJIEWOJ",
      "finalPositions": "KBQ"
    },
    {
      "key": {
        "rotors": [
          "I",
          "II",
          "III"
        ],
        "ringSettings": [
          2,
          12,
          26
        ],
        "initialPositions": [
          "A",
          "D",
          "U"
        ],
        "reflector": "B",
        "plugboard": "AV BS CG DL FU HZ IN KM OW RX"
      },
      "plain": "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG",
      "cipher": "WOXZPNURAMKIADTSTELKFMLQKYOFIXAZLBD",
      "finalPositions": "BGD"
    }
  ]
}
```

## docs/catatan-teknis.md

```md
# Catatan teknis

Dokumen ini menjelaskan aturan mesin Ruby di `apps/api` dan kontrak antarmuka Next.js. Modul TypeScript algoritma lama dipertahankan sebagai pembanding pengujian, sementara alur aplikasi menjalankan API Ruby.

## Aturan bersama

- Alfabet numerik A = 0 sampai Z = 25. Browser memakai `Uint8Array`, sementara Ruby menangani byte dalam `String` berencoding ASCII-8BIT.
- `mod(x, m) = ((x % m) + m) % m`. Invers modular memakai algoritma Euclid diperluas.
- Normalisasi teks alfabet menyaring karakter ASCII A-Z dan a-z terlebih dahulu, kemudian mengubah huruf kecil menjadi kapital. Karakter lain dibuang tanpa transliterasi. Contoh `Serang pukul 10.30!` menjadi `SERANGPUKUL` dan `Straße` menjadi `STRAE`. Browser menampilkan pratinjau dengan aturan yang sama.
- Normalisasi tidak pernah diterapkan pada string Base64, kontainer, atau byte file utuh.
- Setiap operasi dimulai dari posisi kunci nol. Tidak ada state yang dibawa antaroperasi.

## Rumus cipher

| Cipher | Enkripsi | Dekripsi |
| --- | --- | --- |
| Vigenere | `C[i] = (P[i] + K[i mod m]) mod 26` | `P[i] = (C[i] - K[i mod m]) mod 26` |
| Auto-Key | `C[i] = (P[i] + S[i]) mod 26` dengan `S[i] = K[i]` untuk `i < m` dan `S[i] = P[i - m]` untuk `i >= m` | `P[i] = (C[i] - S[i]) mod 26`, `S[i]` untuk `i >= m` diambil dari plainteks yang baru dipulihkan |
| Extended Vigenere | `C[i] = (P[i] + K[i mod m]) mod 256` | `P[i] = (C[i] - K[i mod m]) mod 256` |
| Affine | `C = (a * P + b) mod 26` | `P = aInverse * (C - b) mod 26` |
| Hill | `C = K * P mod 26` per blok vektor kolom berukuran n | `P = KInverse * C mod 26` |
| Super Enkripsi | Extended Vigenere, lalu transposisi kolom | Invers transposisi kolom, lalu dekripsi Extended Vigenere |
| Enigma I | Plugboard, rotor kanan-tengah-kiri, reflector, rotor balik kiri-tengah-kanan, plugboard | Transformasi yang sama, dimulai dari konfigurasi awal yang sama |

### Kunci

- Kata kunci Vigenere, primer Auto-Key, kata kunci Playfair, dan kata kunci kolom dinormalisasi seperti teks alfabet. Kunci kosong atau kunci yang kosong setelah normalisasi ditolak.
- Kunci byte Extended Vigenere dan Super Enkripsi diambil dari teks UTF-8 apa adanya (spasi dan kapitalisasi dipertahankan) atau dari heksadesimal. Byte bernilai 00 sah, sedangkan kunci nol byte ditolak.
- Affine menerima bilangan bulat apa pun lalu mereduksinya modulo 26. Nilai a harus salah satu dari 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25.
- Matriks Hill dapat ditulis per baris (`6 24 1` pada baris terpisah atau dipisah `;`) atau dalam bentuk `[[6,24,1],[13,16,10],[20,17,15]]`. Semua elemen direduksi modulo 26.

### Playfair

1. Kata kunci dinormalisasi, J diganti I, huruf berulang dilewati. Sisa huruf dari `ABCDEFGHIKLMNOPQRSTUVWXYZ` ditambahkan berurutan dan matriks disusun per baris.
2. Posisi J pada teks hasil normalisasi dicatat, lalu J diganti I.
3. Pasangan dibentuk dari kiri. Bila dua huruf pasangan sama, X disisipkan setelah huruf pertama (Q bila huruf itu X) dan huruf kedua diproses pada pasangan berikutnya. Huruf terakhir tanpa pasangan diberi pengisi dengan aturan yang sama.
4. Pasangan sebaris digeser ke kanan saat enkripsi dan ke kiri saat dekripsi. Pasangan sekolom digeser ke bawah saat enkripsi dan ke atas saat dekripsi. Pasangan persegi panjang menukar kolom. Semua indeks memakai modulo 5.
5. Dekripsi paket membuang hanya posisi yang tercatat sebagai pengisi, lalu mengembalikan J pada posisi yang tercatat. Dekripsi mentah tidak membuang apa pun.

Cipherteks mentah berpanjang ganjil, memuat J, atau memiliki pasangan huruf sama ditolak.

Contoh dengan kunci `PLAYFAIREXAMPLE`: `BALLOON` disiapkan menjadi `BALXLOON` dan dienkripsi menjadi `DPYRANQO`. `XX` disiapkan menjadi `XQXQ`. `XQX` juga disiapkan menjadi `XQXQ`, tetapi hanya Q terakhir yang tercatat sebagai pengisi sehingga paket memulihkan `XQX`.

### Hill

Invers matriks dihitung dengan eliminasi Gauss-Jordan pada medan modulo 2 dan modulo 13. Setiap elemen invers digabung dengan CRT `x = (r13 + 13 * ((r2 - r13) mod 2)) mod 26`. Determinan modulo 26 dihitung dengan cara yang sama. Matriks valid bila determinan tidak nol modulo 2 dan modulo 13, yang setara dengan `gcd(det, 26) = 1`. Tidak ada invers bilangan real atau pembulatan.

Bila panjang plainteks bukan kelipatan n, X ditambahkan sampai kelipatan n. Jumlah padding disimpan di paket. Contoh `ACTX` dengan matriks TV-06 menjadi `ACTXXX` lalu `POHLNA`, dan paket memulihkan `ACTX`.

### Transposisi kolom

Data ditulis per baris selebar m = panjang kata kunci kolom. Urutan kolom adalah indeks yang diurutkan menurut huruf kunci, dengan indeks kiri lebih dulu untuk huruf sama. Tidak ada padding. Untuk panjang L, setiap kolom berisi `floor(L / m)` byte dan `L mod m` kolom paling kiri pada susunan asli mendapat satu byte tambahan. Contoh kunci `BABA` menghasilkan urutan `[1,3,0,2]`.

### Enigma I

Tiga rotor berbeda dipilih dari I sampai V dalam urutan kiri, tengah, kanan. Rotor I, II, III, IV, dan V memiliki notch jendela Q, E, V, J, dan Z. Reflector B atau C dan entry wheel identitas mengikuti wiring PRD. Ring setting 1 sampai 26 dikonversi ke indeks 0 sampai 25.

Sebelum setiap huruf, simpan kondisi notch kanan dan tengah. Rotor kiri maju bila tengah pada notch. Rotor tengah maju bila kanan atau tengah pada notch. Rotor kanan selalu maju. Ini menghasilkan double stepping, misalnya ADU → ADV → AEW → BFX. Ring setting mengubah offset wiring `mod(position - ring, 26)`, tanpa menggeser lagi notch jendela.

Sesudah langkah, sinyal melalui plugboard, rotor kanan, tengah, kiri, reflector, invers rotor kiri, tengah, kanan, dan plugboard lagi. Jalur maju menghitung `mod(wiring[mod(x + offset, 26)] - offset, 26)` dan jalur balik memakai invers wiring. I dan J tetap berbeda. Karakter yang dibuang saat normalisasi tidak menggerakkan rotor.

Plugboard berisi nol sampai 13 pasangan huruf, tanpa pasangan sama seperti AA atau huruf yang dipakai pada lebih dari satu pasangan. Mesin dimulai dari konfigurasi awal setiap operasi. Dalam satu file, state berlanjut sampai semua simbol codec selesai. Konfigurasi kunci tidak dimasukkan ke kontainer.

Vektor awal I-II-III, ring 01-01-01, AAA, reflector B, tanpa plugboard menghasilkan AAAAA → BDZGO dan HELLOWORLD → ILBDAAMTAZ. Vektor tambahan independen direkam dari Py-Enigma pada `apps/api/spec/support/enigma_reference.json` dengan skrip pembangkit pendamping.

## Codec file alpha25-v1

Alfabet codec adalah `ABCDEFGHIKLMNOPQRSTUVWXYZ` (25 simbol tanpa J). Byte b menjadi dua simbol dengan indeks `floor(b / 25)` dan `b mod 25`. Byte 0 menjadi `AA` dan byte 255 menjadi `LF`. Decoding menghitung `25 * indeksPertama + indeksKedua` dan menolak panjang ganjil, simbol J, atau nilai di atas 255. Codec dipakai untuk mode file utuh pada enam cipher alfabet, termasuk Enigma. Codec tanpa J membuat Playfair mode file tidak kehilangan informasi akibat penggabungan I dan J.

## Kontainer .dat versi 1

| Urutan | Isi | Format |
| --- | --- | --- |
| 1 | Penanda format | 8 byte ASCII `UTSKRIPT` |
| 2 | Versi format | 1 byte, nilai 1 |
| 3 | Panjang metadata | 4 byte unsigned big endian |
| 4 | Metadata | JSON UTF-8 |
| 5 | Payload | Byte cipherteks |

Isi metadata:

| Kolom | Keterangan |
| --- | --- |
| `algorithm` | `vigenere`, `autokey`, `extended-vigenere`, `playfair`, `affine`, `hill`, `super`, atau `enigma-i` |
| `inputMode` | `text` atau `file` |
| `codec` | `alpha-text-v1` (teks alfabet), `alpha25-v1` (file pada cipher alfabet), `utf8-v1` (teks pada cipher byte), `bytes-v1` (file pada cipher byte) |
| `payloadEncoding` | `ascii-letters` untuk cipher alfabet, `bytes` untuk cipher byte |
| `payloadLength` | Panjang payload dalam byte |
| `expectedLength` | Panjang data yang akan dipulihkan (teks hasil normalisasi atau file asli) |
| `checksumAlgorithm`, `sha256` | SHA-256 dari data yang akan dipulihkan, heksadesimal huruf kecil |
| `file` | Nama dan tipe MIME file asal, hanya pada mode file |
| `sourceFileName` | Nama file sumber bila isi file dibaca sebagai teks alfabet |
| `playfair` | `markers: "bitset-lsb-v1"`, `filler` (bitset Base64 sepanjang payload), `fillerCount`, `j` (bitset Base64 sepanjang teks hasil normalisasi, hanya mode teks), `jCount` |
| `hill` | `n` (ukuran blok) dan `padCount` (jumlah X padding) |

Bitset `bitset-lsb-v1` menyimpan bit ke-i pada byte `floor(i / 8)` di posisi bit `i mod 8` dari bit paling tidak signifikan, lalu dikode Base64. Satu huruf membutuhkan satu bit sehingga file besar tidak menghasilkan jutaan elemen JSON.

Kunci, plainteks, dan salinan file asli tidak disimpan. Header file asal ikut terenkripsi di dalam payload.

Parser Ruby memeriksa penanda, versi, batas panjang metadata (64 MiB), batas payload (256 MiB), JSON, kecocokan algoritma dengan codec dan encoding, panjang payload, konsistensi ukuran hasil dengan panjang payload, panjang dan jumlah bit bitset Playfair, serta parameter Hill. Nama file dari metadata dibersihkan dari komponen path dan karakter terlarang, lalu hanya dipakai sebagai nama unduhan. Parser TypeScript lama dipakai sebagai pembanding pada pengujian format.

Dekripsi paket gagal bila payload cipher alfabet memuat karakter selain A-Z, codec tidak dapat didekode, ukuran hasil tidak cocok, atau SHA-256 tidak cocok. Pada kondisi itu aplikasi tidak menampilkan hasil sebagai pemulihan yang berhasil.

## Base64

`codecs/base64.ts` mengikuti RFC 4648 bagian 4 dengan padding `=`. Decoder mengabaikan spasi dan baris baru di antara karakter, lalu menolak panjang yang bukan kelipatan 4, karakter di luar alfabet Base64, `=` di tengah, dan bit sisa yang tidak nol. Kapitalisasi tidak pernah diubah. Pada format masukan Cipherteks Base64 untuk cipher alfabet, huruf baru dinormalisasi setelah Base64 didekode menjadi byte payload.

## Arsitektur pemrosesan

UI (`components/Workbench.tsx`) memvalidasi formulir untuk menampilkan kesalahan pada kolomnya, lalu mengirim request melalui klien HTTP (`src/lib/engine`). Route `POST /api/crypto/encrypt` dan `POST /api/crypto/decrypt` meneruskan body ke Sinatra. Ruby kembali memvalidasi kunci, menyiapkan data, menjalankan cipher, membentuk atau membaca kontainer, dan memeriksa checksum. Endpoint pemeriksaan paket mendukung pemulihan algoritma dan mode dari metadata sebelum dekripsi.

File dibaca dengan `File.arrayBuffer()`, diteruskan sebagai multipart biner, dan hasil diunduh sebagai `Blob`. Respons JSON memisahkan Base64 payload dari Base64 kontainer. Pesan dan kunci ditempatkan dalam body, bukan URL. Request memiliki state sendiri. Gangguan koneksi, timeout, dan kegagalan Ruby menjadi pesan kesalahan tanpa fallback cipher browser.

Pengujian RSpec memanggil fungsi Ruby yang digunakan endpoint. Vitest integrasi dan Playwright menggunakan layanan Ruby nyata. `tests/migration/legacy-typescript-v1.json` membekukan 14 paket lama sebelum migrasi, dan pengujian kompatibilitas memeriksa dekripsi serta payload baru terhadap nilai tetap. Skenario evidence menjalankan delapan cipher pada lima jenis file, sehingga ada 40 pasangan file.
```

## eslint.config.mjs

```javascript
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "next-env.d.ts",
      "evidence/**",
      "test-results/**",
      "playwright-report/**",
      ".tools/**",
      "apps/api/vendor/**",
    ],
  },
];

export default config;
```

## next.config.ts

```ts
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
};

export default nextConfig;
```

## package.json

```json
{
  "name": "uts-kriptografi",
  "version": "1.1.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@10.19.0",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "node scripts/dev.mjs",
    "build": "next build",
    "start": "node scripts/dev.mjs --production",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "node scripts/with-ruby.mjs pnpm exec vitest run",
    "test:ruby": "node scripts/test-ruby.mjs",
    "test:all": "pnpm typecheck && pnpm lint && pnpm test:ruby && pnpm test && pnpm evidence && python scripts/verify_samples.py && pnpm test:e2e",
    "test:e2e": "playwright test",
    "evidence": "node scripts/with-ruby.mjs pnpm exec vitest run --config vitest.evidence.config.ts",
    "fixtures": "python scripts/generate_fixtures.py && node scripts/generate-video.mjs",
    "check:deps": "node scripts/check-denylist.mjs"
  },
  "dependencies": {
    "next": "16.3.7",
    "react": "19.3.0",
    "react-dom": "19.3.0"
  },
  "devDependencies": {
    "@playwright/test": "1.63.0",
    "@types/node": "24.19.0",
    "@types/react": "19.3.0",
    "@types/react-dom": "19.3.0",
    "eslint": "9.39.5",
    "eslint-config-next": "16.3.7",
    "typescript": "5.9.3",
    "vite": "8.3.1",
    "vitest": "5.0.3"
  }
}
```

## playwright.config.ts

```ts
import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["json", { outputFile: "evidence/e2e-results.json" }]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    acceptDownloads: true,
    ...devices["Desktop Chrome"],
    viewport: { width: 1440, height: 1000 },
  },
  webServer: {
    command: `pnpm build && node scripts/dev.mjs --production -p ${PORT} -H 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}`,
    // Selalu membangun ulang agar pengujian dan screenshot memakai kode terbaru.
    reuseExistingServer: false,
    timeout: 300_000,
  },
});
```

## scripts/check-denylist.mjs

```javascript
// Memeriksa pnpm-lock.yaml terhadap security/malicious-packages.txt.
// Keluar dengan kode 1 bila ada versi paket terlarang yang ter-resolve.
import { readFileSync } from "node:fs";

const deny = new Set(
  readFileSync("security/malicious-packages.txt", "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#")),
);

const lock = readFileSync("pnpm-lock.yaml", "utf8");
// Entri paket pada lockfile pnpm v9: "  name@version:" atau "  'name@version':"
// dengan kemungkinan sufiks peer "(peer@x)".
const resolved = new Set();
for (const match of lock.matchAll(/^\s{2}'?(@?[^@\s'(]+(?:\/[^@\s'(]+)?)@([^\s'(:]+)/gm)) {
  resolved.add(`${match[1]}@${match[2]}`);
}

const hits = [...resolved].filter((entry) => deny.has(entry));
console.log(`Paket ter-resolve: ${resolved.size}. Entri denylist: ${deny.size}.`);
if (hits.length > 0) {
  console.error("DITEMUKAN paket terlarang:");
  for (const hit of hits) console.error(`  ${hit}`);
  process.exit(1);
}
console.log("Tidak ada versi terlarang pada pnpm-lock.yaml.");
```

## scripts/dev.mjs

```javascript
// One command starts Sinatra/Puma and Next.js, and stops both on exit.
import { fileURLToPath } from "node:url";
import { ensureRuby, spawnCommand, stopProcess } from "./ruby-service.mjs";

let ruby;
let next;
let stopping = false;

function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  stopProcess(next);
  stopProcess(ruby);
  process.exitCode = code;
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());

try {
  ruby = await ensureRuby();
  const arguments_ = process.argv.slice(2);
  const production = arguments_.includes("--production");
  const nextPath = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
  next = spawnCommand(process.execPath, [nextPath, production ? "start" : "dev", ...arguments_.filter((argument) => argument !== "--production")]);
  next.on("error", (error) => {
    console.error(error.message);
    shutdown(1);
  });
  next.on("exit", (code) => shutdown(code ?? 1));
  ruby?.on("exit", (code) => {
    if (!stopping) {
      console.error("Layanan Ruby berhenti; frontend dihentikan.");
      shutdown(code || 1);
    }
  });
} catch (error) {
  console.error(error.message);
  shutdown(1);
}
```

## scripts/generate-report-materials.mjs

```javascript
// Menyusun ulang bahan laporan dari sumber dan hasil eksekusi yang tersedia.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const target = path.resolve(root, "docs/BAHAN_LAPORAN_UTS_KRIPTOGRAFI");
if (!target.startsWith(`${path.resolve(root)}${path.sep}`)) throw new Error("Bahan laporan harus berada dalam repositori.");
mkdirSync(target, { recursive: true });
const generatedAt = new Date().toISOString();
const generatedWib = new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", dateStyle: "long", timeStyle: "short" }).format(new Date());
const readJson = (file) => {
  try { return JSON.parse(readFileSync(path.join(root, file), "utf8")); }
  catch { return null; }
};
const filesEvidence = readJson("evidence/file-scenarios.json");
const textEvidence = readJson("evidence/text-examples.json");
const rubyEvidence = readJson("evidence/ruby-test-results.json");
const unitEvidence = readJson("evidence/unit-test-results.json");
const e2eEvidence = readJson("evidence/e2e-results.json");
const formatEvidence = readJson("evidence/format-checks.json");
const currentFiles = filesEvidence?.engine === "Ruby via HTTP" ? filesEvidence.scenarios ?? [] : [];
const currentTexts = textEvidence?.engine === "Ruby via HTTP" ? textEvidence.examples ?? [] : [];
const algorithms = [
  ["vigenere", "Vigenere standar"], ["autokey", "Auto-Key Vigenere"],
  ["extended-vigenere", "Extended Vigenere"], ["playfair", "Playfair"],
  ["affine", "Affine"], ["hill", "Hill"], ["super", "Super Enkripsi"], ["enigma-i", "Bonus Enigma Cipher"],
];
const testsInSuites = (suites) => (suites ?? []).flatMap((suite) => [
  ...(suite.specs ?? []).map((spec) => ({ title: spec.title, ok: spec.ok, tests: spec.tests ?? [] })),
  ...testsInSuites(suite.suites),
]);
const browserSpecs = testsInSuites(e2eEvidence?.suites);
const currentBrowser = browserSpecs.some((spec) => spec.title.includes("enigma-i"));
const browserSummary = currentBrowser && e2eEvidence?.stats
  ? `${e2eEvidence.stats.expected} lulus, ${e2eEvidence.stats.unexpected} gagal, ${e2eEvidence.stats.skipped} dilewati. Waktu mulai: ${e2eEvidence.stats.startTime}.`
  : "Hasil browser untuk versi delapan cipher belum tersedia. Hasil lama tidak membuktikan integrasi Ruby.";
const rubySummary = rubyEvidence?.summary
  ? `${rubyEvidence.summary.example_count} contoh, ${rubyEvidence.summary.failure_count} kegagalan, ${rubyEvidence.summary.pending_count} pending.`
  : "Hasil RSpec belum tersedia.";
const unitSummary = unitEvidence && JSON.stringify(unitEvidence).includes("migration-compatibility")
  ? `${unitEvidence.numPassedTests} lulus, ${unitEvidence.numFailedTests} gagal, ${unitEvidence.numPendingTests} pending.`
  : "Hasil Vitest setelah migrasi belum tersedia.";
const alphabetVectors = [
  ["Vigenere", "ATTACKATDAWN / LEMON", "LXFOPVEFRNHR"],
  ["Auto-Key", "ATTACKATDAWN / QUEENLY", "QNXEPVYTWTWP"],
  ["Playfair", "HIDETHEGOLDINTHETREESTUMP / PLAYFAIREXAMPLE", "BMODZBXDNABEKUDMUIXMMOUVIF"],
  ["Affine", "AFFINECIPHER / a=5,b=8", "IHHWVCSWFRCP"],
  ["Hill", "ACT / matriks TV-06", "POH"],
  ["Enigma I", "AAAAA / I-II-III,01-01-01,AAA,B,tanpa plugboard", "BDZGO"],
  ["Enigma I", "HELLOWORLD / konfigurasi awal yang sama", "ILBDAAMTAZ"],
];

const summary = [
  "# Bahan Laporan UTS Kriptografi", "",
  "Aplikasi menyediakan tujuh cipher wajib serta Bonus Enigma Cipher. Mesin delapan cipher, codec file, validasi, dan kontainer menggunakan Ruby. Antarmuka memakai Next.js dan React.", "",
  `Bahan disusun ulang pada ${generatedWib} WIB (${generatedAt}) dari kode dan berkas hasil yang tersedia. Status hanya berasal dari hasil eksekusi. Kode lengkap ada pada \`01-LAMPIRAN_KODE_PROGRAM.md\`.`, "",
  "## Arsitektur dan cara menjalankan", "",
  "Browser mengirim teks atau byte file ke route Next.js. Route meneruskan operasi ke Sinatra/Puma. Ruby memvalidasi kunci, menjalankan algoritma, membentuk atau membaca kontainer, dan memeriksa hasil dekripsi. Browser menampilkan hasil dan membuat Blob untuk unduhan. Gangguan Ruby menjadi kesalahan tanpa mesin cipher browser sebagai pengganti.", "",
  "Jalankan `pnpm install`, lalu `bundle install` dari `apps/api`, kemudian `pnpm dev` dari root. Frontend tersedia pada localhost:3000 dan Ruby pada 127.0.0.1:4567. README menjelaskan runtime, variabel, build, dan kontrak API lengkap.", "",
  "## Konvensi teks, file, dan kontainer", "",
  "Teks alfabet hanya mempertahankan ASCII A sampai Z setelah normalisasi. Enigma mempertahankan I dan J sebagai huruf berbeda. File utuh mempertahankan semua byte termasuk header. Enam cipher alfabet memakai codec alpha25-v1, sedangkan Extended Vigenere dan Super Enkripsi bekerja langsung pada byte.", "",
  "Paket `.dat` memakai UTSKRIPT versi 1, panjang metadata big endian, JSON UTF-8, dan payload biner. Metadata menyimpan mode, codec, ukuran, SHA-256, nama file, serta penanda pemulihan Playfair/Hill yang diperlukan. Kunci dan salinan plainteks tidak disimpan. ID tujuh cipher lama tidak berubah, dan Enigma memakai `enigma-i`.", "",
  "Base64 plainteks, payload cipherteks, dan paket lengkap memiliki tujuan berbeda. Kapitalisasi Base64 dipertahankan. SHA-256 memeriksa kesamaan hasil dan bukan bukti autentikasi.", "",
  "## Bonus Enigma dan Ruby", "",
  "Enigma I memakai tiga rotor berbeda dari I sampai V, ring setting 01 sampai 26, posisi awal A sampai Z, reflector B/C, dan nol sampai 13 pasangan plugboard. Urutan konfigurasi adalah kiri, tengah, kanan. Rotor bergerak sebelum huruf. Kondisi notch dibaca sebelum gerak, sehingga double stepping ADU → ADV → AEW → BFX berjalan benar. Ring mengubah offset wiring tanpa menggeser lagi notch jendela. Dekripsi memulai konfigurasi awal yang sama.", "",
  "Ruby menjalankan kedelapan algoritma melalui fungsi yang sama dengan pengujian RSpec. Pengujian API, Vitest integrasi, evidence, dan browser memakai layanan nyata. Empat belas paket dari TypeScript sebelum migrasi dibekukan dalam tests/migration untuk pemeriksaan kompatibilitas.", "",
  "## Vektor acuan", "",
  "Tabel ini berisi nilai acuan tetap dari PRD, bukan klaim hasil pengujian.", "",
  "| Cipher | Masukan dan kunci | Cipherteks acuan |", "| --- | --- | --- |",
  ...alphabetVectors.map(([cipher, input, output]) => `| ${cipher} | ${input} | ${output} |`), "",
  "Extended Vigenere memakai byte [0,65,255] dan kunci [1,2] dengan keluaran [1,67,0]. Super Enkripsi memakai byte [0,1,2,3,254,255,128], kunci byte [1,2], dan kunci kolom BABA dengan keluaran [3,1,5,1,255,3,129].", "",
  "## Hasil pengujian aktual", "",
  `RSpec: ${rubySummary}`, "", `Vitest: ${unitSummary}`, "", `Playwright: ${browserSummary}`, "",
  `Evidence Ruby: ${currentFiles.length} skenario file tersedia, ${currentFiles.filter((row) => row.result === "LULUS").length} lulus. ${currentTexts.length} contoh teks tersedia. Sasaran penerimaan adalah 40 skenario file dan delapan contoh teks.`, "",
  formatEvidence && currentFiles.length === 40 && formatEvidence.generatedAt >= filesEvidence.generatedAt ? `Pemeriksaan format: ${formatEvidence.passed} dari ${formatEvidence.checked} file lulus pada ${formatEvidence.generatedAt}.` : "Hasil pemeriksaan format setelah 40 skenario Ruby belum tersedia.", "",
  "| Algoritma | Skenario file aktual | Lulus | Contoh teks |", "| --- | --- | --- | --- |",
  ...algorithms.map(([id, name]) => {
    const rows = currentFiles.filter((row) => row.algorithm === id);
    const text = currentTexts.find((row) => row.algorithm === id);
    return `| ${name} | ${rows.length} | ${rows.filter((row) => row.result === "LULUS").length} | ${text?.result ?? "Belum tersedia"} |`;
  }), "",
  "Rincian ukuran, parameter uji, checksum, dan hasil tersedia di `evidence/file-scenarios.json`. Contoh plainteks, payload, paket Base64, serta hasil pemulihan tersedia di `evidence/text-examples.json`. Gunakan generatedAt pada setiap berkas untuk memastikan bukti berasal dari versi yang sedang dibahas.", "",
  "## Tabel penilaian", "",
  "Tanda keberhasilan berikut hanya diberikan ketika pasangan file dan teks tersedia. Penilaian final juga harus memeriksa hasil Ruby dan browser di atas.", "",
  "| No | Spek | Berhasil | Kurang Berhasil | Keterangan |", "| --- | --- | --- | --- | --- |",
  ...algorithms.map(([id, name], i) => {
    const rows = currentFiles.filter((row) => row.algorithm === id);
    const text = currentTexts.find((row) => row.algorithm === id);
    const complete = rows.length === 5 && rows.every((row) => row.result === "LULUS") && text?.result === "LULUS";
    return `| ${i + 1} | ${name} | ${complete ? "✓" : ""} | ${rows.some((row) => row.result !== "LULUS") || text?.result === "GAGAL" ? "✓" : ""} | ${complete ? "Lima file dan contoh teks pulih melalui Ruby" : "Bukti lengkap belum tersedia atau perlu diperiksa"} |`;
  }),
  `| 9 | Bonus bahasa Ruby | ${currentFiles.length === 40 && currentFiles.every((row) => row.result === "LULUS") && rubyEvidence?.summary?.example_count > 0 && rubyEvidence?.summary?.failure_count === 0 && currentBrowser && e2eEvidence.stats.unexpected === 0 ? "✓" : ""} | | Dinilai dari kode Ruby, RSpec, API, 40 pasangan file, dan alur browser aktual |`, "",
  "## Screenshot dan kode sumber", "",
  "Screenshot aktual di `evidence/screenshots` dihasilkan oleh Playwright. Screenshot Enigma meliputi teks, file, dan kesalahan plugboard. Screenshot sebelum migrasi serta ZIP lama merupakan arsip versi TypeScript dan tidak membuktikan bonus terbaru.", "",
  "| Berkas | Isi |", "| --- | --- |",
  "| evidence/screenshots/01-tampilan-utama.png | Halaman utama dengan pemilih delapan cipher |",
  "| evidence/screenshots/teks-enigma-i-enkripsi.png | Formulir Enigma, konfigurasi awal, dan hasil teks |",
  "| evidence/screenshots/teks-enigma-i-dekripsi.png | Pemulihan teks Enigma pada konteks baru |",
  "| evidence/screenshots/file-enigma-i-enkripsi.png | Enkripsi gambar melalui Enigma |",
  "| evidence/screenshots/file-enigma-i-dekripsi.png | Pemulihan file dengan ukuran dan SHA-256 cocok |",
  "| evidence/screenshots/validasi-enigma-plugboard.png | Plugboard berulang ditolak |", "",
  "Lampiran kode dihasilkan dari berkas aplikasi yang tersedia ketika generator berjalan. Jalankan ulang `node scripts/generate-report-materials.mjs` setelah perubahan implementasi atau hasil pengujian. Arsip ZIP lama tidak diperbarui otomatis oleh generator.", "",
];
writeFileSync(path.join(target, "00-BAHAN_LAPORAN_UTS_KRIPTOGRAFI.md"), summary.join("\n"));

const sourceFiles = [];
const walk = (directory, accept) => {
  if (!existsSync(path.join(root, directory))) return;
  for (const entry of readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!["vendor", ".bundle", "node_modules", ".git"].includes(entry.name)) walk(relative, accept);
    } else if (entry.isFile() && accept(relative)) sourceFiles.push(relative.replaceAll("\\", "/"));
  }
};
walk("src", (file) => /\.(ts|tsx|css|svg)$/.test(file));
walk("apps/api", (file) => /\.(rb|ru|py|json)$/.test(file) || ["Gemfile", "Gemfile.lock", ".ruby-version"].includes(path.basename(file)));
walk("tests", (file) => /\.(ts|json|md)$/.test(file));
walk("scripts", (file) => /\.(mjs|py|rb)$/.test(file));
for (const file of ["README.md", "CLAUDE.md", "docs/catatan-teknis.md", "package.json", "tsconfig.json", "next.config.ts", "eslint.config.mjs", "vitest.config.ts", "vitest.evidence.config.ts", "playwright.config.ts", ".gitignore", ".env.example"]) {
  if (existsSync(path.join(root, file))) sourceFiles.push(file);
}
sourceFiles.sort();
const code = ["# Lampiran Kode Program", "", `Disusun pada ${generatedWib} WIB (${generatedAt}) dari kode frontend Next.js dan backend Ruby. Dependensi dikunci pada pnpm-lock.yaml dan apps/api/Gemfile.lock di repositori. Berkas konfigurasi pribadi, runtime lokal, node_modules, dan vendor tidak dimuat.`, "", "## Daftar berkas", "", "| No | Berkas | Jumlah baris |", "| --- | --- | --- |"];
for (const [index, file] of sourceFiles.entries()) {
  const contents = readFileSync(path.join(root, file), "utf8");
  code.push(`| ${index + 1} | ${file} | ${contents.split("\n").length} |`);
}
for (const file of sourceFiles) {
  const contents = readFileSync(path.join(root, file), "utf8");
  const longestFence = Math.max(2, ...(contents.match(/`+/g) ?? []).map((match) => match.length));
  const fence = "`".repeat(longestFence + 1);
  const extension = path.extname(file).slice(1);
  const language = ["rb", "ru"].includes(extension) || path.basename(file) === "Gemfile" ? "ruby" : extension === "mjs" ? "javascript" : extension;
  code.push("", `## ${file}`, "", `${fence}${language}`, contents.trimEnd(), fence);
}
code.push("");
writeFileSync(path.join(target, "01-LAMPIRAN_KODE_PROGRAM.md"), code.join("\n"));
console.log(`Bahan laporan diperbarui: ${sourceFiles.length} berkas sumber, ${currentFiles.length} skenario file Ruby aktual.`);
```

## scripts/generate-video.mjs

```javascript
// Membuat fixtures/video-contoh.webm: animasi kanvas 2 detik yang direkam
// dengan MediaRecorder Chromium (VP8/VP9 dalam kontainer WebM). Video lalu
// dimuat ulang di elemen <video> untuk memastikan berkas dapat dibaca.
import { writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent("<!doctype html><canvas id='c' width='160' height='120'></canvas>");

const base64 = await page.evaluate(async () => {
  const canvas = document.getElementById("c");
  const ctx = canvas.getContext("2d");
  const stream = canvas.captureStream(15);
  const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  const chunks = [];
  recorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data);
  const stopped = new Promise((resolve) => (recorder.onstop = resolve));
  recorder.start(250);
  const start = performance.now();
  await new Promise((resolve) => {
    function frame() {
      const t = (performance.now() - start) / 1000;
      ctx.fillStyle = `hsl(${(t * 180) % 360}, 70%, 45%)`;
      ctx.fillRect(0, 0, 160, 120);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("UTS", 20 + t * 40, 60);
      ctx.fillText("KRIPTO", 30, 100 - t * 20);
      if (t < 2) requestAnimationFrame(frame);
      else resolve();
    }
    frame();
  });
  recorder.stop();
  await stopped;
  const blob = new Blob(chunks, { type: "video/webm" });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
});

const bytes = Buffer.from(base64, "base64");
writeFileSync("fixtures/video-contoh.webm", bytes);

// Verifikasi: video dapat dimuat dan memiliki dimensi.
const check = await page.evaluate(async (b64) => {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  const url = URL.createObjectURL(new Blob([arr], { type: "video/webm" }));
  const video = document.createElement("video");
  video.src = url;
  await new Promise((resolve, reject) => {
    video.onloadeddata = resolve;
    video.onerror = () => reject(new Error("video tidak dapat dimuat"));
  });
  return { width: video.videoWidth, height: video.videoHeight };
}, base64);

console.log(`video-contoh.webm: ${bytes.length} byte, ${check.width}x${check.height}`);
await browser.close();
```

## scripts/generate_fixtures.py

```py
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
```

## scripts/ruby-service.mjs

```javascript
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { dirname, delimiter, join } from "node:path";
import { createRequire } from "node:module";

export const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const apiDirectory = fileURLToPath(new URL("../apps/api/", import.meta.url));

// Use Next.js' installed environment loader so custom URLs and interpolation
// follow the same precedence in the runner, web server, and integration tests.
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("next/package.json"));
const { loadEnvConfig } = nextRequire("@next/env");
const testing = process.argv[1]?.endsWith("with-ruby.mjs");
if (testing && !process.env.NODE_ENV) process.env.NODE_ENV = "test";
loadEnvConfig(projectRoot, !testing && !process.argv.includes("--production") && process.env.NODE_ENV !== "production");

// RUBY_API_URL is read by both the Next.js proxy and Node integration tests.
export function apiAddress() {
  const address = new URL(process.env.RUBY_API_URL ?? "http://127.0.0.1:4567");
  if (!["http:", "https:"].includes(address.protocol)) throw new Error("RUBY_API_URL harus berupa URL HTTP/HTTPS.");
  return address;
}

export async function healthy() {
  try {
    const response = await fetch(new URL("/health", apiAddress()), { signal: AbortSignal.timeout(1000), cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
}

export function stopProcess(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === "win32") {
    // Only terminate the process tree that this runner started.
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
  } else child.kill("SIGTERM");
}

export async function ensureRuby({ reuse = true } = {}) {
  if (await healthy()) {
    if (reuse) return null;
    throw new Error(`Alamat Ruby ${apiAddress().origin} sudah dipakai. Hentikan layanan lama atau ganti RUBY_API_URL.`);
  }
  const address = apiAddress();
  if (!["127.0.0.1", "localhost", "[::1]"].includes(address.hostname)) {
    throw new Error(`Layanan Ruby ${address.origin} tidak tersedia. Runner hanya memulai backend pada localhost.`);
  }
  if (address.protocol !== "http:") {
    throw new Error("Backend lokal otomatis memakai HTTP. Untuk HTTPS, jalankan layanan Ruby secara terpisah terlebih dahulu.");
  }
  const gemfile = fileURLToPath(new URL("../apps/api/Gemfile", import.meta.url));
  if (!existsSync(gemfile)) throw new Error("Gemfile backend Ruby belum tersedia pada apps/api.");
  const portableRuby = fileURLToPath(new URL("../.tools/rubyinstaller-3.4.5-1-x64/bin/ruby.exe", import.meta.url));
  const command = process.env.RUBY_COMMAND ?? (existsSync(portableRuby) ? portableRuby : "ruby");
  const localPath = existsSync(command) ? `${dirname(command)}${delimiter}${process.env.PATH ?? ""}` : process.env.PATH;
  // Load Bundler within Ruby to keep paths containing spaces out of RUBYOPT.
  const serveScript = fileURLToPath(new URL("./serve-api.rb", import.meta.url));
  const child = spawn(command, [serveScript, "-C", "config/puma.rb", "config.ru"], {
    cwd: apiDirectory,
    stdio: "inherit",
    windowsHide: true,
    env: { ...process.env, PATH: localPath, BUNDLE_GEMFILE: gemfile, API_HOST: address.hostname, API_PORT: address.port || "80" },
  });
  let startupError;
  child.on("error", (error) => { startupError = error; });
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (startupError || child.exitCode !== null) {
      stopProcess(child);
      throw new Error(`Backend Ruby gagal dimulai. Instal Ruby dan jalankan bundle install di apps/api. ${startupError?.message ?? ""}`);
    }
    if (await healthy()) return child;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  stopProcess(child);
  throw new Error("Backend Ruby belum siap setelah 30 detik. Periksa instalasi Ruby dan dependensi Bundler.");
}

export function spawnCommand(command, args, options = {}) {
  if (process.platform === "win32" && /^(pnpm|pnpm\.cmd)$/.test(command)) {
    const candidates = [
      process.env.npm_execpath,
      ...(process.env.PATH ?? "").split(delimiter).flatMap((entry) => [
        join(entry, "node_modules/pnpm/bin/pnpm.cjs"),
        join(entry, "node_modules/corepack/dist/pnpm.js"),
        join(entry, "pnpm.cjs"),
      ]),
    ];
    const cli = candidates.find((candidate) => candidate && /pnpm\.(?:cjs|js)$/.test(candidate) && existsSync(candidate));
    if (cli) return spawnCommand(process.execPath, [cli, ...args], options);
  }
  return spawn(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    windowsHide: true,
    shell: process.platform === "win32" && /^(pnpm|bundle)(\.cmd|\.bat)?$/.test(command),
    ...options,
  });
}
```

## scripts/run-rspec.rb

```ruby
# Load the locked bundle in this process. This also supports Windows paths
# containing spaces, without passing Bundler's RUBYOPT to another Ruby process.
require "bundler/setup"
load Gem.bin_path("rspec-core", "rspec")
```

## scripts/serve-api.rb

```ruby
# Bundler resolves Gemfile.lock in this process. Loading Puma directly avoids
# a Windows bundle-exec sub-process interpreting spaces in RUBYOPT paths.
require "bundler/setup"
load Gem.bin_path("puma", "puma")
```

## scripts/test-ruby.mjs

```javascript
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, delimiter } from "node:path";
import { fileURLToPath } from "node:url";

const portable = fileURLToPath(new URL("../.tools/rubyinstaller-3.4.5-1-x64/bin/ruby.exe", import.meta.url));
const command = process.env.RUBY_COMMAND ?? (existsSync(portable) ? portable : "ruby");
const api = fileURLToPath(new URL("../apps/api", import.meta.url));
mkdirSync(fileURLToPath(new URL("../evidence", import.meta.url)), { recursive: true });
const runner = fileURLToPath(new URL("./run-rspec.rb", import.meta.url));
const child = spawn(command, [runner, "spec", "--format", "progress", "--format", "json", "--out", "../../evidence/ruby-test-results.json"], {
  cwd: api,
  stdio: "inherit",
  windowsHide: true,
  env: { ...process.env, PATH: existsSync(command) ? `${dirname(command)}${delimiter}${process.env.PATH ?? ""}` : process.env.PATH },
});
child.on("error", (error) => { console.error(`Ruby gagal dimulai: ${error.message}`); process.exitCode = 1; });
child.on("exit", (code) => { process.exitCode = code ?? 1; });
```

## scripts/verify_samples.py

```py
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
```

## scripts/with-ruby.mjs

```javascript
// Run Node checks against the actual Ruby backend. An existing healthy backend
// is reused; a backend started by this runner is cleaned up afterwards.
import { ensureRuby, spawnCommand, stopProcess } from "./ruby-service.mjs";

let ruby;
let command;
let stopping = false;
function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  stopProcess(command);
  stopProcess(ruby);
  process.exitCode = code;
}
process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());

try {
  const [executable, ...args] = process.argv.slice(2);
  if (!executable) throw new Error("Sertakan perintah yang akan dijalankan dengan layanan Ruby.");
  ruby = await ensureRuby();
  command = spawnCommand(executable, args);
  command.on("error", (error) => {
    console.error(error.message);
    shutdown(1);
  });
  command.on("exit", (code) => shutdown(code ?? 1));
  ruby?.on("exit", () => {
    if (!stopping) {
      console.error("Backend Ruby berhenti selama pengujian.");
      shutdown(1);
    }
  });
} catch (error) {
  console.error(error.message);
  shutdown(1);
}
```

## src/app/api/crypto/decrypt/route.ts

```ts
import { proxyCrypto } from "../proxy";

export const runtime = "nodejs";
export const maxDuration = 190;

export async function POST(request: Request): Promise<Response> {
  return proxyCrypto(request, "decrypt");
}
```

## src/app/api/crypto/encrypt/route.ts

```ts
import { proxyCrypto } from "../proxy";

export const runtime = "nodejs";
export const maxDuration = 190;

export async function POST(request: Request): Promise<Response> {
  return proxyCrypto(request, "encrypt");
}
```

## src/app/api/crypto/inspect/route.ts

```ts
import { proxyCrypto } from "../proxy";

export const runtime = "nodejs";
export const maxDuration = 190;

export async function POST(request: Request): Promise<Response> {
  return proxyCrypto(request, "inspect");
}
```

## src/app/api/crypto/proxy.ts

```ts
// Route Next.js hanya meneruskan HTTP. Body multipart serta respons besar
// diteruskan sebagai stream agar tidak diduplikasi atau didekode di proxy.
export const MAX_PROXY_BODY_BYTES = 351 * 1024 * 1024;

function timeoutMs(): number {
  const value = Number(process.env.RUBY_API_TIMEOUT_MS ?? 180_000);
  return Number.isSafeInteger(value) && value > 0 && value <= 600_000 ? value : 180_000;
}

function failure(message: string, status: number, field?: string): Response {
  return Response.json({ message, ...(field ? { field } : {}) }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function proxyCrypto(request: Request, operation: "encrypt" | "decrypt" | "inspect"): Promise<Response> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("application/json") && !contentType.startsWith("multipart/form-data")) {
    return failure("Gunakan JSON untuk teks atau multipart untuk file.", 415);
  }
  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > MAX_PROXY_BODY_BYTES) return failure("Permintaan melebihi batas ukuran transport paket.", 413, "file");

  const controller = new AbortController();
  let timedOut = false;
  let tooLarge = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs());
  const cancel = () => controller.abort();
  request.signal.addEventListener("abort", cancel, { once: true });
  const cleanup = () => {
    clearTimeout(timer);
    request.signal.removeEventListener("abort", cancel);
  };

  try {
    let received = 0;
    const body = request.body?.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, stream) {
        received += chunk.byteLength;
        if (received > MAX_PROXY_BODY_BYTES) {
          tooLarge = true;
          controller.abort();
          throw new Error("Batas ukuran transport terlampaui.");
        }
        stream.enqueue(chunk);
      },
    }));
    const base = (process.env.RUBY_API_URL ?? "http://127.0.0.1:4567").replace(/\/$/, "");
    const init: RequestInit & { duplex: "half" } = {
      method: "POST",
      headers: { "Content-Type": contentType, Accept: "application/json" },
      body,
      duplex: "half",
      cache: "no-store",
      signal: controller.signal,
      redirect: "error",
    };
    const upstream = await fetch(`${base}/api/crypto/${operation}`, init);
    const headers = new Headers({
      "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      "Cache-Control": "no-store",
    });
    if (!upstream.body) {
      cleanup();
      return new Response(null, { status: upstream.status, headers });
    }
    const reader = upstream.body.getReader();
    const responseBody = new ReadableStream<Uint8Array>({
      async pull(stream) {
        try {
          const chunk = await reader.read();
          if (chunk.done) {
            cleanup();
            stream.close();
          } else stream.enqueue(chunk.value);
        } catch (error) {
          cleanup();
          stream.error(error);
        }
      },
      async cancel(reason) {
        controller.abort();
        cleanup();
        await reader.cancel(reason);
      },
    });
    return new Response(responseBody, { status: upstream.status, headers });
  } catch {
    cleanup();
    if (tooLarge) return failure("Permintaan melebihi batas ukuran transport paket.", 413, "file");
    if (timedOut) return failure("Pemrosesan layanan Ruby melewati batas waktu. Coba lagi dengan data lebih kecil.", 504);
    return failure("Layanan Ruby tidak dapat dihubungi. Jalankan backend Ruby dengan pnpm dev, lalu coba lagi.", 503);
  }
}
```

## src/app/globals.css

```css
/* Tema gelap adalah bawaan. Tema terang dipilih lewat atribut data-theme pada <html>. */
:root {
  --bg: #0a0f15;
  --panel: #0e151d;
  --inset: #0a1017;
  --raise: #141e29;
  --line: #1d2935;
  --line-strong: #2b3948;
  --ink: #e6eaef;
  --ink-2: #bfc7d1;
  --muted: #7d8a98;
  --accent: #ff5317;
  --accent-hi: #ff6c37;
  --accent-ink: #1a0800;
  --accent-soft: rgba(255, 83, 23, 0.1);
  --accent-line: rgba(255, 83, 23, 0.45);
  --ok: #3ddc84;
  --ok-soft: rgba(61, 220, 132, 0.08);
  --err: #ff6b5a;
  --err-soft: rgba(255, 107, 90, 0.09);
  --warn: #f2b441;
  --warn-soft: rgba(242, 180, 65, 0.09);
  --on-accent: #ffffff;
  --grid: rgba(255, 255, 255, 0.03);
  --radius: 3px;
  --font: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace;
  color-scheme: dark;
}

:root[data-theme="light"] {
  --bg: #eef1f5;
  --panel: #ffffff;
  --inset: #f5f7fa;
  --raise: #e9edf2;
  --line: #dbe1e8;
  --line-strong: #c2cbd6;
  --ink: #111a24;
  --ink-2: #36424f;
  --muted: #5f6b78;
  --accent: #d63d0a;
  --accent-hi: #bb3406;
  --accent-ink: #ffffff;
  --accent-soft: rgba(214, 61, 10, 0.07);
  --accent-line: rgba(214, 61, 10, 0.4);
  --ok: #11774a;
  --ok-soft: rgba(17, 119, 74, 0.08);
  --err: #c0271a;
  --err-soft: rgba(192, 39, 26, 0.07);
  --warn: #8a5a06;
  --warn-soft: rgba(176, 116, 8, 0.09);
  --grid: rgba(17, 26, 36, 0.05);
  color-scheme: light;
}

* {
  box-sizing: border-box;
}

/* Atribut hidden harus menang atas aturan display seperti .field { display: flex }. */
[hidden] {
  display: none !important;
}

html,
body {
  margin: 0;
}

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1,
h2,
h3 {
  font-weight: 600;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Kerangka halaman */

.app {
  max-width: 1680px;
  margin: 0 auto;
  padding: 0 20px;
}

.topbar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px 8px 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  width: 42px;
  height: 42px;
  flex: none;
}

.logo-on {
  fill: var(--accent);
}

.logo-off {
  fill: var(--accent);
  opacity: 0.35;
}

.brand h1 {
  font-size: 34px;
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.brand p {
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--ink-2);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.topbar-hatch {
  margin-left: auto;
  width: 110px;
  height: 26px;
  background: repeating-linear-gradient(-60deg, transparent 0 9px, var(--line-strong) 9px 10.5px);
}

.local-badge {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
}

.local-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}

.local-badge strong {
  display: block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.local-badge span {
  display: block;
  font-size: 10.5px;
  color: var(--muted);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.navbar {
  display: flex;
  align-items: stretch;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.tabs {
  display: flex;
  min-width: 0;
  overflow-x: auto;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
  padding: 0 18px;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-2);
  background: none;
  border: 0;
  border-left: 1px solid var(--line);
  cursor: pointer;
  white-space: nowrap;
}

.theme-toggle:hover {
  color: var(--accent);
}

.theme-toggle:focus-visible {
  outline-offset: -2px;
}

.theme-toggle span {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

/* Tombol menampilkan tema tujuan. Dipilih lewat CSS agar render server dan klien sama. */
.theme-toggle .theme-to-dark,
:root[data-theme="light"] .theme-toggle .theme-to-light {
  display: none;
}

:root[data-theme="light"] .theme-toggle .theme-to-dark {
  display: inline-flex;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-2);
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  white-space: nowrap;
}

.tab + .tab {
  border-left: 1px solid var(--line);
}

.tab:hover {
  color: var(--ink);
}

.tab[aria-selected="true"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
  background: linear-gradient(to top, var(--accent-soft), transparent 70%);
}

.tab:focus-visible {
  outline-offset: -2px;
}

main {
  padding: 16px 0;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 14px 8px 22px;
  border-top: 1px solid var(--line);
  font-size: 11.5px;
  color: var(--muted);
}

.footer strong {
  color: var(--ink-2);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer-sep {
  width: 1px;
  height: 14px;
  background: var(--line-strong);
}

/* Meja kerja */

.workbench {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
}

.panel {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 16px 18px 18px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.panel-head {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr) auto;
  align-items: start;
  column-gap: 14px;
  margin-bottom: 12px;
}

.panel-icon {
  color: var(--muted);
  padding-top: 1px;
}

.panel-num {
  font-size: 19px;
  line-height: 1.2;
  font-weight: 500;
  color: var(--ink-2);
}

.panel-heading h2 {
  font-size: 17px;
  line-height: 1.3;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.panel-heading p {
  margin-top: 2px;
  font-size: 12.5px;
  color: var(--muted);
}

.panel-aside {
  justify-self: end;
}

.panel-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

.enigma-fields { display: flex; flex-direction: column; gap: 14px; }
.enigma-rotors { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.enigma-rotor { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
@media (max-width: 420px) {
  .enigma-rotors { gap: 6px; }
  .enigma-rotors label { font-size: 11px; }
}

.lock-note {
  padding: 8px 12px;
  font-size: 12.5px;
  color: var(--ink-2);
  background: var(--accent-soft);
  border: 1px solid var(--accent-line);
  border-radius: var(--radius);
}

.lock-note strong {
  color: var(--ink);
}

/* 01 Pilih cipher */

.picker {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 16px;
}

fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.cipher-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 16px;
  border-right: 1px solid var(--line);
}

.cipher-option {
  position: relative;
  display: grid;
  grid-template-columns: 18px 28px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  padding: 7px 14px;
  /* Bingkai transparan agar bingkai item aktif tidak menggeser tata letak. */
  border: 1px solid transparent;
  border-radius: var(--radius);
  cursor: pointer;
}

.cipher-option input,
.segmented input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.cipher-option:hover {
  background: var(--raise);
}

.cipher-radio {
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--muted);
  border-radius: 50%;
}

.cipher-icon {
  display: grid;
  place-items: center;
  color: var(--ink-2);
}

.cipher-name {
  font-size: 14px;
  font-weight: 500;
}

/* Ikon info di samping nama cipher. Teksnya muncul di bawah item selebar item sehingga tidak keluar layar. */
.info-tip {
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  vertical-align: -3px;
  color: var(--muted);
  cursor: help;
  border-radius: 50%;
}

.info-tip:hover,
.info-tip:focus {
  color: var(--accent);
}

.info-tip:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.info-tip-text {
  display: none;
  position: absolute;
  top: calc(100% + 4px);
  left: 14px;
  right: 14px;
  z-index: 5;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bg);
  background: var(--ink);
  border-radius: var(--radius);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  cursor: default;
}

.info-tip:hover .info-tip-text,
.info-tip:focus .info-tip-text {
  display: block;
}

.cipher-option.is-active {
  background: var(--accent-soft);
  border-color: var(--accent-line);
}

.cipher-option.is-active .cipher-radio {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}

.cipher-option.is-active .cipher-icon {
  color: var(--ink);
}

.cipher-option:has(input:focus-visible) {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.cipher-option:has(input:disabled) {
  cursor: default;
}

.cipher-option:has(input:disabled):not(.is-active) {
  opacity: 0.45;
}

.cipher-option:has(input:disabled):hover:not(.is-active) {
  background: none;
}

.cipher-detail {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.cipher-detail-head {
  display: flex;
  gap: 16px;
}

.cipher-detail-icon {
  flex: none;
  color: var(--accent);
}

.cipher-detail-head h3 {
  font-size: 17px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.cipher-detail-head p {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--ink-2);
}

.symbol-strip {
  display: grid;
  grid-template-columns: repeat(13, minmax(0, 1fr));
  gap: 2px;
  padding: 4px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.symbol-strip-bytes {
  grid-template-columns: repeat(8, minmax(0, 1fr));
}

.symbol-strip span {
  padding: 3px 0;
  font-size: 12.5px;
  text-align: center;
  color: var(--ink-2);
  border-radius: 2px;
}

.symbol-strip span.is-on {
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 700;
}

.symbol-caption {
  margin-top: -6px;
  font-size: 12px;
  color: var(--muted);
}

.spec {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
}

.spec div {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 10px;
}

.spec dt {
  font-size: 12.5px;
  color: var(--muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.spec dt::after {
  content: " :";
  float: right;
}

.spec dd {
  margin: 0;
  font-size: 13px;
}

/* Tombol */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 9px 16px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: var(--radius);
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.6;
  cursor: progress;
}

.btn-accent,
.btn-primary {
  color: var(--accent-ink);
  background: var(--accent);
}

.btn-accent:hover:not(:disabled),
.btn-primary:hover:not(:disabled) {
  background: var(--accent-hi);
}

.btn-quiet {
  color: var(--ink);
  background: transparent;
  border-color: var(--line-strong);
}

.btn-quiet:hover:not(:disabled) {
  border-color: var(--ink-2);
}

.btn-chip {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-2);
  background: var(--inset);
  border-color: var(--line-strong);
}

.btn-chip:hover {
  color: var(--ink);
  border-color: var(--ink-2);
}

.btn-block {
  width: 100%;
  padding: 11px 16px;
  font-size: 15px;
  letter-spacing: 0.04em;
}

.btn-run {
  width: 100%;
  margin-top: auto;
  padding: 15px 18px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 02 dan 03 pilihan tersegmentasi */

.segmented {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.segmented label {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 9px 12px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--ink-2);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  cursor: pointer;
}

.segmented label:hover {
  color: var(--ink);
}

.segmented label:has(input:checked) {
  color: var(--accent);
  background: var(--accent-soft);
  border-color: var(--accent);
}

.segmented label:has(input:focus-visible) {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.segmented-small {
  display: inline-grid;
  grid-template-columns: repeat(2, auto);
  justify-content: start;
  gap: 6px;
  margin-bottom: 8px;
}

.segmented-small label {
  padding: 4px 10px;
  font-size: 12px;
}

/* Kolom masukan */

.form-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.field > label,
.name-editor > label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-2);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field-row-help {
  grid-column: 1 / -1;
}

.input {
  width: 100%;
  padding: 10px 12px;
  font: inherit;
  font-size: 13.5px;
  color: var(--ink);
  background: var(--inset);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
}

.input::placeholder {
  color: var(--muted);
}

.input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 0;
  border-color: var(--accent);
}

textarea.input {
  resize: vertical;
  min-height: 96px;
}

select.input {
  cursor: pointer;
}

.input[aria-invalid="true"] {
  border-color: var(--err);
}

.input-file {
  padding: 8px;
}

.input-file::file-selector-button {
  margin-right: 12px;
  padding: 6px 12px;
  font: inherit;
  font-size: 12.5px;
  color: var(--ink);
  background: var(--raise);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  cursor: pointer;
}

.input-icon {
  position: relative;
}

.input-icon svg {
  position: absolute;
  top: 50%;
  left: 13px;
  color: var(--muted);
  transform: translateY(-50%);
  pointer-events: none;
}

.input-icon .input {
  padding-left: 42px;
}

.textarea-wrap {
  position: relative;
}

.textarea-wrap textarea {
  padding-bottom: 28px;
}

.counter {
  position: absolute;
  right: 12px;
  bottom: 9px;
  font-size: 11px;
  color: var(--muted);
  pointer-events: none;
}

.field-help {
  margin-top: 6px;
  font-size: 12.5px;
  color: var(--muted);
}

.field-preview {
  color: var(--ink-2);
  overflow-wrap: anywhere;
}

.field-error {
  margin-top: 6px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--err);
}

.choice-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
}

.choice-list label {
  display: flex;
  gap: 10px;
  padding: 9px 12px;
  font-size: 13px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  cursor: pointer;
}

.choice-list label:has(input:checked) {
  border-color: var(--accent-line);
  background: var(--accent-soft);
}

.choice-list input {
  accent-color: var(--accent);
}

.choice-help {
  display: block;
  font-size: 12px;
  color: var(--muted);
}

.keys {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.presets {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.key-notes,
.result-notes {
  margin: 0;
  padding: 10px 12px 10px 28px;
  font-size: 12.5px;
  color: var(--ink-2);
  background: var(--inset);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow-wrap: anywhere;
}

.playfair-grid {
  align-self: flex-start;
  margin-top: 10px;
  font-size: 13px;
  border-collapse: collapse;
}

.playfair-grid td {
  width: 28px;
  height: 28px;
  text-align: center;
  border: 1px solid var(--line-strong);
}

/* 06 Hasil */

.panel-result {
  flex: 1;
  min-height: 460px;
}

.result-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
}

.chip::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.chip-idle {
  color: var(--muted);
}

.chip-busy {
  color: var(--accent);
  border-color: var(--accent-line);
}

.chip-busy::before {
  animation: pulse 1s ease-in-out infinite alternate;
}

.chip-ok {
  color: var(--ok);
}

.chip-err {
  color: var(--err);
}

.chip-warn {
  color: var(--warn);
}

@keyframes pulse {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.25;
  }
}

.empty {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 300px;
  text-align: center;
}

.empty-glyph {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-bottom: 14px;
  font-size: 26px;
  font-weight: 700;
  border: 3px dotted var(--ink-2);
}

.empty-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink-2);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.empty-text {
  max-width: 46ch;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--muted);
}

.status {
  margin-bottom: 12px;
  padding: 10px 12px;
  font-size: 13px;
  /* Bingkai tipis merata di keempat sisi dengan warna status yang dilunakkan. */
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: var(--radius);
  overflow-wrap: anywhere;
}

.status-ok {
  color: var(--ok);
  background: var(--ok-soft);
}

.status-error {
  color: var(--err);
  background: var(--err-soft);
}

.status-stale {
  color: var(--warn);
  background: var(--warn-soft);
}

.status-neutral {
  color: var(--ink-2);
  background: var(--inset);
  border-color: var(--line);
}

.is-stale {
  opacity: 0.5;
}

.result {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.result > .status {
  margin-bottom: 0;
}

.output {
  min-width: 0;
}

.output-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.output-head h3 {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-2);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.output-block-cipher .output-head h3 {
  color: var(--accent);
}

/* Tombol salin berada di pojok kanan atas kotak keluaran, tidak menutupi teks. */
.output-box {
  position: relative;
}

.output-text.has-copy {
  padding-right: 56px;
}

.output-box-actions {
  position: absolute;
  top: 7px;
  right: 12px;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  min-width: 30px;
  padding: 0 7px;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-2);
  background: var(--panel);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  cursor: pointer;
}

.copy-btn:hover:not(:disabled) {
  color: var(--accent);
  border-color: var(--accent-line);
}

.copy-btn.is-done {
  color: var(--ok);
  border-color: var(--ok);
}

.copy-btn.is-error {
  color: var(--err);
  border-color: var(--err);
}

.output-hint,
.output-note {
  margin-bottom: 6px;
  font-size: 12.5px;
  color: var(--muted);
}

.output-note {
  margin: 6px 0 0;
}

.output-text {
  margin: 0;
  padding: 10px 12px;
  max-height: 220px;
  overflow: auto;
  font-family: var(--font);
  font-size: 13px;
  white-space: pre-wrap;
  word-break: break-all;
  background: var(--inset);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

/* Cipherteks ditulis di atas kertas grafik tipis, seperti lembar kerja kriptanalisis. */
.output-cipher {
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.08em;
  color: var(--accent);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 13px 13px;
  border-color: var(--line-strong);
}

.output-plain {
  color: var(--ink);
}

.output-empty {
  color: var(--muted);
}

.package {
  padding-top: 16px;
  border-top: 1px solid var(--line);
}

.facts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px 16px;
  margin: 0;
}

.facts div {
  min-width: 0;
}

.facts dt {
  font-size: 11.5px;
  color: var(--muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.facts dd {
  margin: 0;
  font-size: 13px;
  overflow-wrap: anywhere;
}

.facts-hash {
  grid-template-columns: 1fr;
}

.facts-compact {
  padding: 10px 12px;
  background: var(--inset);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.name-editor {
  margin-bottom: 10px;
}

.name-editor-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-ext {
  color: var(--muted);
  white-space: nowrap;
}

/* Panduan dan Tentang */

.doc {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
  align-items: start;
}

.doc-title {
  margin-bottom: 14px;
  font-size: 15px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.doc-steps {
  margin: 0;
  padding-left: 20px;
}

.doc-steps li {
  margin-bottom: 12px;
  font-size: 13px;
  line-height: 1.65;
  color: var(--ink-2);
}

.doc-steps li::marker {
  color: var(--accent);
}

.doc-steps strong {
  color: var(--ink);
}

.doc-defs {
  margin: 0;
}

.doc-defs div {
  padding: 10px 0;
  border-top: 1px solid var(--line);
}

.doc-defs dt {
  font-size: 13px;
  font-weight: 600;
}

.doc-defs dd {
  margin: 3px 0 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--muted);
}

.doc-text {
  max-width: 70ch;
  font-size: 13px;
  line-height: 1.7;
  color: var(--ink-2);
}

.doc-text + .doc-text {
  margin-top: 12px;
}

/* Layar sempit */

@media (max-width: 1180px) {
  .workbench {
    grid-template-columns: minmax(0, 1fr);
  }

  .panel-result {
    min-height: 0;
  }
}

@media (max-width: 760px) {
  .app {
    padding: 0 16px;
  }

  .topbar {
    flex-wrap: wrap;
    gap: 14px;
    padding: 16px 0 14px;
  }

  .brand {
    gap: 14px;
  }

  .brand h1 {
    font-size: 26px;
  }

  .brand p {
    font-size: 11px;
    letter-spacing: 0.1em;
  }

  .topbar-hatch {
    display: none;
  }

  .local-badge {
    width: 100%;
  }

  .tab {
    padding: 11px 14px;
  }

  .theme-toggle {
    padding: 0 14px;
  }

  /* Pada layar sempit hanya ikon tema yang tampil. Teksnya tetap dibaca pembaca layar. */
  .theme-toggle span {
    font-size: 0;
    gap: 0;
  }

  .row,
  .picker,
  .field-row {
    grid-template-columns: minmax(0, 1fr);
  }

  .panel {
    padding: 14px;
  }

  .panel-head {
    column-gap: 10px;
  }

  .cipher-list {
    padding: 0 0 12px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .cipher-option {
    padding: 8px 10px;
    gap: 12px;
  }

  .cipher-detail {
    padding: 14px;
  }

  .empty {
    min-height: 200px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}
```

## src/app/icon.svg

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <!-- Logo Kriptografi: grid titik 4 x 4, segitiga kiri atas menyala seperti logo di header. -->
  <g fill="#ff5317">
    <circle cx="4" cy="4" r="3.2"/>
    <circle cx="12" cy="4" r="3.2"/>
    <circle cx="20" cy="4" r="3.2"/>
    <circle cx="4" cy="12" r="3.2"/>
    <circle cx="12" cy="12" r="3.2"/>
    <circle cx="4" cy="20" r="3.2"/>
  </g>
  <g fill="#ff5317" fill-opacity="0.35">
    <circle cx="28" cy="4" r="3.2"/>
    <circle cx="20" cy="12" r="3.2"/>
    <circle cx="28" cy="12" r="3.2"/>
    <circle cx="12" cy="20" r="3.2"/>
    <circle cx="20" cy="20" r="3.2"/>
    <circle cx="28" cy="20" r="3.2"/>
    <circle cx="4" cy="28" r="3.2"/>
    <circle cx="12" cy="28" r="3.2"/>
    <circle cx="20" cy="28" r="3.2"/>
    <circle cx="28" cy="28" r="3.2"/>
  </g>
</svg>
```

## src/app/layout.tsx

```tsx
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Kriptografi",
  description: "Enkripsi dan dekripsi teks serta file dengan delapan cipher klasik, termasuk Enigma, menggunakan backend Ruby.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={mono.variable} data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Menerapkan tema tersimpan sebelum paint pertama agar tidak berkedip. Kunci sama dengan THEME_KEY. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## src/app/page.tsx

```tsx
import { AppShell } from "@/components/AppShell";

export default function Home() {
  return <AppShell />;
}
```

## src/components/AppShell.tsx

```tsx
"use client";

import { useState } from "react";
import { CIPHER_IDS, CIPHERS } from "@/lib/crypto/ciphers";
import { IconBook, IconHome, IconInfo } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";
import { Workbench } from "./Workbench";

type Tab = "home" | "guide" | "about";

const TABS: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
  { id: "home", label: "Beranda", icon: <IconHome size={18} /> },
  { id: "guide", label: "Panduan", icon: <IconBook size={18} /> },
  { id: "about", label: "Tentang", icon: <IconInfo size={18} /> },
];

const VERSION = "1.1.0";

function Logo() {
  return (
    <svg className="logo" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      {Array.from({ length: 16 }, (_, i) => {
        const x = (i % 4) * 11 + 3.5;
        const y = Math.floor(i / 4) * 11 + 3.5;
        // Pola diagonal dari kiri atas, seperti kunci yang bergeser per baris.
        const on = (i % 4) + Math.floor(i / 4) < 3;
        return <circle key={i} cx={x} cy={y} r="2.6" className={on ? "logo-on" : "logo-off"} />;
      })}
    </svg>
  );
}

function Guide() {
  return (
    <div className="doc">
      <section className="panel doc-panel">
        <h2 className="doc-title">Cara memakai</h2>
        <ol className="doc-steps">
          <li>
            <strong>Enkripsi teks.</strong> Pilih cipher, ketik pesan, isi kunci, lalu tekan Enkripsi. Cipher 26 huruf hanya memakai huruf A-Z.
            Angka, spasi, dan tanda baca dibuang sebelum enkripsi.
          </li>
          <li>
            <strong>Enkripsi file.</strong> Pilih File lalu unggah file apa saja. Semua byte termasuk header ikut dienkripsi. Unduh paket .dat
            sebagai hasilnya.
          </li>
          <li>
            <strong>Dekripsi.</strong> Pilih Dekripsi, unggah paket .dat atau tempel paket Base64, lalu isi kunci yang sama. Algoritma dan nama
            file asal dibaca dari paket.
          </li>
          <li>
            <strong>Periksa hasil.</strong> Dekripsi paket dinyatakan berhasil hanya jika ukuran dan SHA-256 hasil cocok dengan paket.
          </li>
        </ol>
      </section>
      <section className="panel doc-panel">
        <h2 className="doc-title">Tiga bentuk keluaran</h2>
        <dl className="doc-defs">
          <div>
            <dt>Cipherteks huruf</dt>
            <dd>Huruf kapital A-Z tanpa spasi. Hanya ada pada cipher 26 huruf.</dd>
          </div>
          <div>
            <dt>Cipherteks Base64</dt>
            <dd>Base64 dari payload cipherteks saja. Huruf besar dan kecil dibedakan sehingga tidak diseragamkan.</dd>
          </div>
          <div>
            <dt>Paket Base64</dt>
            <dd>Base64 dari paket .dat lengkap, berisi payload dan data pemulihan. Pakai ini untuk dekripsi di sesi lain.</dd>
          </div>
        </dl>
      </section>
      <section className="panel doc-panel">
        <h2 className="doc-title">Bentuk kunci</h2>
        <dl className="doc-defs">
          <div>
            <dt>Vigenere, Auto-Key, Playfair</dt>
            <dd>Kata kunci huruf dengan panjang bebas, boleh lebih panjang dari pesan.</dd>
          </div>
          <div>
            <dt>Extended Vigenere</dt>
            <dd>Teks UTF-8 atau heksadesimal. Spasi dan kapitalisasi ikut dipakai.</dd>
          </div>
          <div>
            <dt>Affine</dt>
            <dd>Bilangan a dan b. Nilai a harus relatif prima terhadap 26.</dd>
          </div>
          <div>
            <dt>Hill</dt>
            <dd>Matriks n x n dengan determinan relatif prima terhadap 26.</dd>
          </div>
          <div>
            <dt>Super Enkripsi</dt>
            <dd>Kunci byte Extended Vigenere dan kata kunci transposisi kolom.</dd>
          </div>
          <div>
            <dt>Enigma I</dt>
            <dd>Tiga rotor dari kiri ke kanan, ring setting, posisi awal, reflector, dan plugboard. Dekripsi memakai konfigurasi awal yang sama.</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function About() {
  return (
    <div className="doc">
      <section className="panel doc-panel">
        <h2 className="doc-title">Tentang aplikasi</h2>
        <p className="doc-text">
          Aplikasi tugas UTS Kriptografi untuk mengenkripsi dan mendekripsi pesan atau file dengan delapan cipher klasik, termasuk Enigma I.
          Pesan, file, dan kunci dikirim ke backend Ruby untuk diproses. File tidak disimpan secara permanen.
        </p>
        <p className="doc-text">
          Paket .dat menyimpan payload cipherteks dan data pemulihan seperti nama file asal dan posisi pengisi. Kunci tidak disimpan. SHA-256
          dipakai untuk memeriksa kesamaan hasil, bukan sebagai autentikasi.
        </p>
      </section>
      <section className="panel doc-panel">
        <h2 className="doc-title">Cipher yang tersedia</h2>
        <dl className="doc-defs">
          {CIPHER_IDS.map((id) => (
            <div key={id}>
              <dt>{CIPHERS[id].name}</dt>
              <dd>{CIPHERS[id].summary}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

export function AppShell() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <Logo />
          <div>
            <h1>Kriptografi</h1>
            <p>Enkripsi dan dekripsi teks serta file</p>
          </div>
        </div>
        <div className="topbar-hatch" aria-hidden="true" />
        <div className="local-badge">
          <span className="local-dot" aria-hidden="true" />
          <div>
            <strong>Mesin Ruby</strong>
            <span>Pesan dan file diproses server</span>
          </div>
        </div>
      </header>

      <div className="navbar">
        <nav className="tabs" role="tablist" aria-label="Halaman">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`view-${t.id}`}
              className="tab"
              onClick={() => setTab(t.id)}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>
        <ThemeToggle />
      </div>

      {/* Meja kerja tetap terpasang saat berpindah tab agar masukan dan hasil tidak hilang. */}
      <main>
        <div id="view-home" role="tabpanel" aria-labelledby="tab-home" hidden={tab !== "home"}>
          <Workbench />
        </div>
        <div id="view-guide" role="tabpanel" aria-labelledby="tab-guide" hidden={tab !== "guide"}>
          <Guide />
        </div>
        <div id="view-about" role="tabpanel" aria-labelledby="tab-about" hidden={tab !== "about"}>
          <About />
        </div>
      </main>

      <footer className="footer">
        <span>
          <strong>Kriptografi</strong> v{VERSION}
        </span>
        <span className="footer-sep" aria-hidden="true" />
        <span>Tugas UTS Kriptografi, delapan cipher klasik untuk teks dan file.</span>
      </footer>
    </div>
  );
}
```

## src/components/CipherPicker.tsx

```tsx
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
```

## src/components/Icons.tsx

```tsx
// Ikon garis sederhana. Semua memakai currentColor agar mengikuti warna teks.

import type { CipherId } from "@/lib/crypto/ciphers";

type IconProps = { size?: number; className?: string };

function Svg({ size = 20, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const IconHome = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 11 12 3l9 8" />
    <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
  </Svg>
);

export const IconBook = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5c-3-.5-6 0-8 1.5Z" />
    <path d="M12 6v14.5" />
  </Svg>
);

export const IconInfo = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.5" />
  </Svg>
);

export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="1" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </Svg>
);

export const IconUnlock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="1" />
    <path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7" />
  </Svg>
);

export const IconText = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3h8l4 4v14H6Z" />
    <path d="M14 3v4h4M9 12h6M9 15.5h6M9 19h4" />
  </Svg>
);

export const IconFile = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3h8l4 4v14H6Z" />
    <path d="M14 3v4h4" />
  </Svg>
);

export const IconKey = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8" cy="15" r="4" />
    <path d="m11 12 8-8M16 7l2 2M14 9l1.5 1.5" />
  </Svg>
);

export const IconPlay = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7.5 5v14L19 12Z" fill="currentColor" />
  </Svg>
);

export const IconCopy = (p: IconProps) => (
  <Svg {...p}>
    <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="1.5" />
    <path d="M15.5 8.5V5.5A1.5 1.5 0 0 0 14 4H5.5A1.5 1.5 0 0 0 4 5.5V14a1.5 1.5 0 0 0 1.5 1.5h3" />
  </Svg>
);

export const IconDone = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const IconSun = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </Svg>
);

export const IconMoon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Svg>
);

export const IconPanel = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 9.5 10.5 12 8 14.5M12.5 15h3.5" />
  </Svg>
);

/** Ikon tiap cipher, dipilih untuk menggambarkan bentuk kunci atau transformasinya. */
export function CipherIcon({ id, size = 26 }: { id: CipherId; size?: number }) {
  switch (id) {
    case "enigma-i":
      return (
        <Svg size={size}>
          <circle cx="6" cy="12" r="3.5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="18" cy="12" r="3.5" />
          <path d="M6 5v3.5M12 5v3.5M18 5v3.5M6 15.5V19M12 15.5V19M18 15.5V19" />
        </Svg>
      );
    case "vigenere":
      // Tabel huruf yang berulang.
      return (
        <Svg size={size}>
          {[5, 9.5, 14.5, 19].flatMap((y) => [5, 9.5, 14.5, 19].map((x) => <path key={`${x}-${y}`} d={`M${x} ${y}h.01`} strokeWidth={2} />))}
        </Svg>
      );
    case "autokey":
      return (
        <Svg size={size}>
          <circle cx="12" cy="6" r="3" />
          <path d="M12 9v12M12 15h3M12 18.5h2.5" />
        </Svg>
      );
    case "extended-vigenere":
      return (
        <Svg size={size}>
          <rect x="4" y="8" width="12" height="12" />
          <path d="M8 8V4h12v12h-4" />
          <path d="M8 12h4M8 16h4" />
        </Svg>
      );
    case "playfair":
      return (
        <Svg size={size}>
          <rect x="3.5" y="3.5" width="17" height="17" />
          <path d="M12 3.5v17M3.5 12h17" strokeDasharray="2 2" />
          <path d="M6.5 7h2M15.5 17h2" />
        </Svg>
      );
    case "affine":
      return (
        <Svg size={size}>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
          <path d="M11 7 6 17M13 7l5 10M7 19h10" />
        </Svg>
      );
    case "hill":
      return (
        <Svg size={size}>
          <path d="M6 3.5H3.5v17H6M18 3.5h2.5v17H18" />
          <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" />
        </Svg>
      );
    case "super":
      return (
        <Svg size={size}>
          <path d="m12 3 9 4.5-9 4.5-9-4.5Z" />
          <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
        </Svg>
      );
  }
}
```

## src/components/KeyFields.tsx

```tsx
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
```

## src/components/Output.tsx

```tsx
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
```

## src/components/ResultViews.tsx

```tsx
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
```

## src/components/ThemeToggle.tsx

```tsx
"use client";

import { useLayoutEffect } from "react";
import { IconMoon, IconSun } from "./Icons";

/** Kunci localStorage. Harus sama dengan skrip awal di app/layout.tsx. */
export const THEME_KEY = "theme";

type Theme = "light" | "dark";

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Tombol ganti tema. Label yang tampil dipilih lewat CSS berdasarkan atribut
 * data-theme sehingga hasil render server dan klien selalu sama.
 */
export function ThemeToggle() {
  // Strict Mode pada mode pengembangan me-remount <html> dan menghapus atribut
  // dari skrip awal. Terapkan lagi sebelum paint. Tidak berpengaruh di produksi.
  useLayoutEffect(() => {
    const theme = storedTheme();
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }, []);

  function toggle() {
    const next: Theme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Penyimpanan tidak tersedia, misalnya jendela privat. Tema tetap berganti untuk sesi ini.
    }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} data-testid="theme-toggle">
      <span className="theme-to-light">
        <IconSun size={18} />
        Mode terang
      </span>
      <span className="theme-to-dark">
        <IconMoon size={18} />
        Mode gelap
      </span>
    </button>
  );
}
```

## src/components/Workbench.tsx

```tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { normalizeAlphabetic } from "@/lib/codecs/alphabet";
import { decodeBase64 } from "@/lib/codecs/base64";
import { encodeUtf8 } from "@/lib/codecs/utf8";
import { CIPHERS, type CipherId, isAlphaCipher } from "@/lib/crypto/ciphers";
import { callCrypto, WorkerCallError } from "@/lib/engine/client";
import { MAX_FILE_BYTES } from "@/lib/engine/encrypt";
import type { DecryptRequest, DecryptResult, EncryptResult, PackageSummary } from "@/lib/engine/types";
import { EMPTY_KEY_VALUES, type KeyErrors, type KeyField, type KeyFormValues, keyFieldsFor, parseKey } from "@/lib/validation/keys";
import { CipherPicker } from "./CipherPicker";
import { formatBytes, splitFileName } from "./download";
import { IconFile, IconLock, IconPanel, IconPlay, IconText, IconUnlock } from "./Icons";
import { KeyFields } from "./KeyFields";
import { DecryptResultView, EncryptResultView } from "./ResultViews";

type Operation = "encrypt" | "decrypt";
type EncryptSource = "text" | "file";
type DecryptSource = "package-file" | "package-base64" | "raw-letters" | "payload-base64";
type PackageSource = "package-file" | "package-base64";

interface LoadedPackage {
  bytes: Uint8Array;
  label: string;
  summary: PackageSummary;
}

type RunState =
  | { status: "idle" }
  | { status: "running"; operation: Operation }
  | { status: "encrypted"; result: EncryptResult; version: number; initialKey: KeyFormValues }
  | { status: "decrypted"; result: DecryptResult; version: number; seq: number }
  | { status: "error"; message: string; version: number };

type FieldErrors = KeyErrors & { message?: string; file?: string; package?: string; cipherInput?: string; key?: string };

const PREVIEW_LIMIT = 600;

function short(text: string): string {
  return text.length > PREVIEW_LIMIT ? `${text.slice(0, PREVIEW_LIMIT)}…` : text;
}

export function Workbench() {
  const [operation, setOperation] = useState<Operation>("encrypt");
  const [cipher, setCipher] = useState<CipherId>("vigenere");
  const [keyValues, setKeyValues] = useState<KeyFormValues>(EMPTY_KEY_VALUES);

  const [encSource, setEncSource] = useState<EncryptSource>("text");
  const [message, setMessage] = useState("");
  const [encFile, setEncFile] = useState<File | null>(null);
  const [fileReadAs, setFileReadAs] = useState<"bytes" | "alpha-text">("bytes");

  const [decSource, setDecSource] = useState<DecryptSource>("package-file");
  // Paket disimpan per sumber agar format masukan yang dipilih hanya memakai paketnya sendiri.
  const [packages, setPackages] = useState<Partial<Record<PackageSource, LoadedPackage>>>({});
  const [packageLoading, setPackageLoading] = useState<Partial<Record<PackageSource, boolean>>>({});
  const packageLoadIds = useRef<Record<PackageSource, number>>({ "package-file": 0, "package-base64": 0 });
  const [packageText, setPackageText] = useState("");
  const [cipherInput, setCipherInput] = useState("");

  // Hasil dan versi masukan disimpan per operasi. Berpindah antara Enkripsi dan
  // Dekripsi tidak mengubah masukan sehingga tidak menandai hasil sebagai hasil lama.
  const [runs, setRuns] = useState<Record<Operation, RunState>>({ encrypt: { status: "idle" }, decrypt: { status: "idle" } });
  const [versions, setVersions] = useState<Record<Operation, number>>({ encrypt: 0, decrypt: 0 });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [completed, setCompleted] = useState(0);
  const seq = useRef(0);
  const resultRef = useRef<HTMLElement>(null);

  const alpha = isAlphaCipher(cipher);
  const usesPackage = operation === "decrypt" && (decSource === "package-file" || decSource === "package-base64");
  const pkg = usesPackage ? (packages[decSource as PackageSource] ?? null) : null;
  const inspecting = usesPackage && Boolean(packageLoading[decSource as PackageSource]);
  const activeCipher: CipherId = pkg ? pkg.summary.algorithm : cipher;
  const run = runs[operation];
  const running = runs.encrypt.status === "running" || runs.decrypt.status === "running";
  const stale =
    (run.status === "encrypted" || run.status === "decrypted" || run.status === "error") && run.version !== versions[operation];

  // Pada layar sempit panel hasil berada di bawah formulir. Setelah proses berhasil,
  // gulir ke hasil bila panel tersebut tidak terlihat.
  useEffect(() => {
    if (completed === 0 || !resultRef.current) return;
    const rect = resultRef.current.getBoundingClientRect();
    if (rect.top > window.innerHeight - 80 || rect.bottom < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [completed]);

  function setRunFor(op: Operation, state: RunState) {
    setRuns((prev) => ({ ...prev, [op]: state }));
  }

  /** Menandai masukan berubah untuk operasi tertentu atau keduanya (kunci dan cipher). */
  function touched(scope: Operation | "both", ...fields: string[]) {
    setVersions((v) =>
      scope === "both" ? { encrypt: v.encrypt + 1, decrypt: v.decrypt + 1 } : { ...v, [scope]: v[scope] + 1 },
    );
    if (fields.some((f) => f in errors)) {
      setErrors((prev) => {
        const next = { ...prev } as Record<string, string | undefined>;
        for (const f of fields) delete next[f];
        delete next.key;
        return next as FieldErrors;
      });
    }
  }

  function changeKey(field: KeyField, value: KeyFormValues[KeyField]) {
    setKeyValues((prev) => ({ ...prev, [field]: value }));
    touched("both", field);
  }

  function changeCipher(id: CipherId) {
    setCipher(id);
    if (!isAlphaCipher(id)) {
      if (decSource === "raw-letters") setDecSource("payload-base64");
      setFileReadAs("bytes");
    }
    touched("both", "cipherInput");
  }

  function setPackage(source: PackageSource, value: LoadedPackage | null) {
    setPackages((prev) => {
      const next = { ...prev };
      if (value) next[source] = value;
      else delete next[source];
      return next;
    });
  }

  function beginPackageLoad(source: PackageSource): number {
    const id = ++packageLoadIds.current[source];
    setPackage(source, null);
    setPackageLoading((prev) => ({ ...prev, [source]: true }));
    touched("decrypt", "package");
    return id;
  }

  async function loadPackage(bytes: Uint8Array, label: string, source: PackageSource, loadId = beginPackageLoad(source)) {
    try {
      const summary = await callCrypto({ op: "inspect", container: bytes.slice() });
      if (loadId !== packageLoadIds.current[source]) return;
      setPackage(source, { bytes, label, summary });
      setCipher(summary.algorithm);
    } catch (err) {
      if (loadId !== packageLoadIds.current[source]) return;
      setPackage(source, null);
      setErrors((prev) => ({ ...prev, package: err instanceof Error ? err.message : String(err) }));
    } finally {
      if (loadId === packageLoadIds.current[source]) setPackageLoading((prev) => ({ ...prev, [source]: false }));
    }
  }

  async function onPackageFile(file: File | undefined) {
    if (!file) return;
    const loadId = beginPackageLoad("package-file");
    try {
      if (file.size > 320 * 1024 * 1024 + 13) throw new Error("Ukuran paket melebihi batas 320 MB.");
      await loadPackage(new Uint8Array(await file.arrayBuffer()), file.name, "package-file", loadId);
    } catch (err) {
      if (loadId !== packageLoadIds.current["package-file"]) return;
      setPackageLoading((prev) => ({ ...prev, "package-file": false }));
      setErrors((prev) => ({ ...prev, package: err instanceof Error ? err.message : String(err) }));
    }
  }

  async function onPackageText(text: string) {
    setPackageText(text);
    const loadId = beginPackageLoad("package-base64");
    if (text.trim().length === 0) {
      setPackageLoading((prev) => ({ ...prev, "package-base64": false }));
      return;
    }
    let bytes: Uint8Array;
    try {
      bytes = decodeBase64(text);
    } catch (err) {
      setPackage("package-base64", null);
      setPackageLoading((prev) => ({ ...prev, "package-base64": false }));
      setErrors((prev) => ({ ...prev, package: `Paket Base64 tidak valid: ${(err as Error).message}` }));
      return;
    }
    await loadPackage(bytes, "Paket Base64 yang ditempel", "package-base64", loadId);
  }

  function sendToDecrypt(result: EncryptResult, initialKey: KeyFormValues) {
    if (JSON.stringify(keyValues) !== JSON.stringify(initialKey)) {
      setKeyValues(structuredClone(initialKey));
      touched("both", ...keyFieldsFor(result.cipher));
    }
    setOperation("decrypt");
    setDecSource("package-file");
    void loadPackage(result.container, "Hasil enkripsi terakhir", "package-file");
  }

  function validateKey(target: CipherId): boolean {
    const parsed = parseKey(target, keyValues);
    if (!parsed.ok) {
      setErrors((prev) => ({ ...prev, ...parsed.errors }));
      return false;
    }
    return true;
  }

  async function process() {
    if (running || inspecting) return;
    const op = operation;
    const runVersion = versions[op];
    setErrors({});

    if (operation === "encrypt") {
      const keyOk = validateKey(cipher);
      let inputError: FieldErrors = {};
      if (encSource === "text" && message.length === 0) inputError = { message: "Pesan wajib diisi." };
      else if (encSource === "text" && alpha && normalizeAlphabetic(message).length === 0) {
        inputError = { message: "Pesan tidak menyisakan huruf A-Z setelah normalisasi." };
      } else if (encSource === "file" && !encFile) inputError = { file: "Pilih file terlebih dahulu." };
      else if (encSource === "file" && encFile && encFile.size > MAX_FILE_BYTES) {
        inputError = { file: `Ukuran file melebihi batas ${formatBytes(MAX_FILE_BYTES)}.` };
      }
      if (Object.keys(inputError).length > 0) setErrors((prev) => ({ ...prev, ...inputError }));
      if (!keyOk || Object.keys(inputError).length > 0) return;

      setRunFor(op, { status: "running", operation: op });
      try {
        const input =
          encSource === "text"
            ? ({ kind: "text", text: message } as const)
            : ({
                kind: "file",
                bytes: new Uint8Array(await encFile!.arrayBuffer()),
                name: encFile!.name,
                type: encFile!.type,
                readAs: alpha ? fileReadAs : "bytes",
              } as const);
        const result = await callCrypto({ op: "encrypt", request: { cipher, key: keyValues, input } });
        setRunFor(op, { status: "encrypted", result, version: runVersion, initialKey: structuredClone(keyValues) });
        setCompleted((c) => c + 1);
      } catch (err) {
        fail(err, runVersion, op);
      }
      return;
    }

    let request: DecryptRequest;
    if (usesPackage) {
      if (!pkg) {
        setErrors({ package: decSource === "package-file" ? "Unggah paket .dat terlebih dahulu." : "Tempel paket Base64 terlebih dahulu." });
        return;
      }
      if (!validateKey(pkg.summary.algorithm)) return;
      request = { kind: "package", container: pkg.bytes.slice(), key: keyValues };
    } else {
      const keyOk = validateKey(cipher);
      if (cipherInput.trim().length === 0) {
        setErrors((prev) => ({ ...prev, cipherInput: "Masukkan cipherteks terlebih dahulu." }));
        return;
      }
      if (!keyOk) return;
      request =
        decSource === "raw-letters"
          ? { kind: "raw-letters", cipher, text: cipherInput, key: keyValues }
          : { kind: "payload-base64", cipher, base64: cipherInput, key: keyValues };
    }
    setRunFor(op, { status: "running", operation: op });
    try {
      const result = await callCrypto({ op: "decrypt", request });
      seq.current += 1;
      setRunFor(op, { status: "decrypted", result, version: runVersion, seq: seq.current });
      setCompleted((c) => c + 1);
    } catch (err) {
      fail(err, runVersion, op);
    }
  }

  function fail(err: unknown, runVersion: number, op: Operation) {
    const info = err instanceof WorkerCallError ? err.info : { message: err instanceof Error ? err.message : String(err) };
    const fieldErrors: FieldErrors = { ...(info.fieldErrors ?? {}) };
    if (!info.fieldErrors && info.field) (fieldErrors as Record<string, string>)[info.field] = info.message;
    setErrors(fieldErrors);
    setRunFor(op, { status: "error", message: info.message, version: runVersion });
  }


  const messagePreview = useMemo(() => {
    if (encSource !== "text" || message.length === 0) return null;
    if (alpha) {
      const normalized = normalizeAlphabetic(message);
      return `Setelah normalisasi (${normalized.length} huruf): ${short(normalized) || "(kosong)"}`;
    }
    return `${encodeUtf8(message).length} byte UTF-8 akan dienkripsi apa adanya.`;
  }, [alpha, encSource, message]);

  const keyErrors: KeyErrors = {};
  for (const f of keyFieldsFor(activeCipher)) if (errors[f]) keyErrors[f] = errors[f];
  const generalKeyError = errors.key;

  const encFileExt = encFile ? splitFileName(encFile.name)[1] : "";

  /** Memindahkan fokus ke kolom masukan yang sedang aktif di panel 04. */
  function focusInput() {
    const id =
      operation === "encrypt"
        ? encSource === "text"
          ? "message"
          : "enc-file"
        : decSource === "package-file"
          ? "pkg-file"
          : decSource === "package-base64"
            ? "pkg-text"
            : "cipher-input";
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    el.focus({ preventScroll: true });
  }

  const inputPanel =
    operation === "encrypt"
      ? encSource === "text"
        ? { title: "Pesan", sub: "Masukkan pesan yang akan diproses." }
        : { title: "File", sub: "Unggah file yang akan dienkripsi." }
      : usesPackage
        ? { title: "Paket", sub: "Muat paket hasil enkripsi aplikasi ini." }
        : { title: "Cipherteks", sub: "Tempel cipherteks yang akan didekripsi." };

  const runLabel = operation === "encrypt" ? "Enkripsi" : "Dekripsi";
  const statusChip = running
    ? { label: "Memproses", tone: "busy" }
    : stale
      ? { label: "Hasil lama", tone: "warn" }
      : run.status === "error"
        ? { label: "Gagal", tone: "err" }
        : run.status === "encrypted" || run.status === "decrypted"
          ? { label: "Selesai", tone: "ok" }
          : { label: "Menunggu", tone: "idle" };

  return (
    <div className="workbench">
      <form
        className="col col-input"
        onSubmit={(e) => {
          e.preventDefault();
          void process();
        }}
        noValidate
      >
        <Panel n="01" title="Pilih cipher" sub="Daftar cipher di kiri, detail di kanan." className="panel-cipher">
          {pkg ? (
            <p className="lock-note" data-testid="cipher-locked">
              Algoritma mengikuti paket yang dimuat: <strong>{CIPHERS[pkg.summary.algorithm].name}</strong>.
            </p>
          ) : null}
          <CipherPicker active={activeCipher} locked={pkg !== null} keyValues={keyValues} onChange={changeCipher} onContinue={focusInput} />
        </Panel>

        <div className="row">
          <Panel n="02" title="Operasi" sub="Pilih jenis operasi kriptografi.">
            <div className="segmented segmented-lg" role="radiogroup" aria-label="Operasi">
              {(["encrypt", "decrypt"] as const).map((op) => (
                <label key={op}>
                  <input type="radio" name="operation" value={op} checked={operation === op} onChange={() => setOperation(op)} />
                  {op === "encrypt" ? <IconLock size={18} /> : <IconUnlock size={18} />}
                  {op === "encrypt" ? "Enkripsi" : "Dekripsi"}
                </label>
              ))}
            </div>
          </Panel>

          <Panel
            n="03"
            title={operation === "encrypt" ? "Jenis masukan" : "Format masukan"}
            sub={operation === "encrypt" ? "Pilih format masukan pesan." : "Pilih bentuk cipherteks yang dimiliki."}
          >
            {/* Kedua blok tetap terpasang agar kolom file tidak dipakai ulang oleh blok lain. */}
            <div hidden={operation !== "encrypt"}>
              <div className="segmented segmented-lg" role="radiogroup" aria-label="Jenis masukan">
                <label>
                  <input
                    type="radio"
                    name="encSource"
                    checked={encSource === "text"}
                    onChange={() => {
                      setEncSource("text");
                      touched("encrypt");
                    }}
                  />
                  <IconText size={18} />
                  Teks
                </label>
                <label>
                  <input
                    type="radio"
                    name="encSource"
                    checked={encSource === "file"}
                    onChange={() => {
                      setEncSource("file");
                      touched("encrypt");
                    }}
                  />
                  <IconFile size={18} />
                  File
                </label>
              </div>
            </div>
            <div className="field" hidden={operation !== "decrypt"}>
              <label htmlFor="dec-source" className="sr-only">
                Format masukan
              </label>
              <select
                id="dec-source"
                className="input"
                value={decSource}
                onChange={(e) => {
                  setDecSource(e.target.value as DecryptSource);
                  touched("decrypt", "package", "cipherInput");
                }}
              >
                <option value="package-file">Paket .dat (unggah file)</option>
                <option value="package-base64">Paket Base64 (tempel teks)</option>
                {alpha ? <option value="raw-letters">Cipherteks huruf mentah</option> : null}
                <option value="payload-base64">Cipherteks Base64 (payload saja)</option>
              </select>
              <p className="field-help">
                {usesPackage
                  ? "Paket memuat algoritma, mode, dan data pemulihan. Kunci tetap perlu diisi."
                  : "Tanpa paket tidak ada nama file, checksum, maupun data pemulihan pengisi dan padding."}
              </p>
            </div>
          </Panel>
        </div>

        <div className="row">
          <Panel n="04" title={inputPanel.title} sub={inputPanel.sub}>
            <div className="form-section" hidden={operation !== "encrypt"}>
              <div className="field" hidden={encSource !== "text"}>
                <label htmlFor="message" className="sr-only">
                  Pesan
                </label>
                <div className="textarea-wrap">
                  <textarea
                    id="message"
                    className="input"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      touched("encrypt", "message");
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby="message-preview message-error"
                    placeholder="Ketik pesan yang akan dienkripsi..."
                  />
                  <span className="counter" aria-hidden="true">
                    {message.length.toLocaleString("id-ID")} karakter
                  </span>
                </div>
                {messagePreview ? (
                  <p className="field-help field-preview" id="message-preview" data-testid="message-preview">
                    {messagePreview}
                  </p>
                ) : (
                  <p className="field-help" id="message-preview">
                    {alpha
                      ? "Cipher ini hanya mengenkripsi huruf A-Z. Angka, spasi, dan tanda baca akan dibuang."
                      : "Teks diubah menjadi byte UTF-8 lalu dienkripsi per byte."}
                  </p>
                )}
                {errors.message ? (
                  <p className="field-error" id="message-error" role="alert">
                    {errors.message}
                  </p>
                ) : null}
              </div>
              <div className="field" hidden={encSource !== "file"}>
                <label htmlFor="enc-file" className="sr-only">
                  File
                </label>
                <input
                  id="enc-file"
                  type="file"
                  className="input input-file"
                  onChange={(e) => {
                    setEncFile(e.target.files?.[0] ?? null);
                    touched("encrypt", "file");
                  }}
                  aria-describedby="enc-file-help enc-file-error"
                />
                <p className="field-help" id="enc-file-help">
                  Semua jenis file diterima. Batas ukuran {formatBytes(MAX_FILE_BYTES)} per file.
                </p>
                {encFile ? (
                  <p className="field-help field-preview" data-testid="enc-file-info">
                    {encFile.name} · ekstensi {encFileExt || "(tanpa ekstensi)"} · {formatBytes(encFile.size)}
                  </p>
                ) : null}
                {alpha ? (
                  <div className="choice-list" role="radiogroup" aria-label="Cara membaca file">
                    <label>
                      <input
                        type="radio"
                        name="fileReadAs"
                        checked={fileReadAs === "bytes"}
                        onChange={() => {
                          setFileReadAs("bytes");
                          touched("encrypt");
                        }}
                      />
                      <span>
                        <strong>File utuh</strong>
                        <span className="choice-help">Semua byte ikut dienkripsi dan hasil dekripsi identik dengan file asal.</span>
                      </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="fileReadAs"
                        checked={fileReadAs === "alpha-text"}
                        onChange={() => {
                          setFileReadAs("alpha-text");
                          touched("encrypt");
                        }}
                      />
                      <span>
                        <strong>Isi sebagai teks alfabet</strong>
                        <span className="choice-help">Hanya huruf A-Z dari isi file yang dienkripsi. File asal tidak dapat dipulihkan utuh.</span>
                      </span>
                    </label>
                  </div>
                ) : null}
                {errors.file ? (
                  <p className="field-error" id="enc-file-error" role="alert">
                    {errors.file}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="form-section" hidden={operation !== "decrypt"}>
              <div className="field" hidden={decSource !== "package-file"}>
                <label htmlFor="pkg-file" className="sr-only">
                  Paket .dat
                </label>
                <input
                  id="pkg-file"
                  type="file"
                  className="input input-file"
                  accept=".dat,application/octet-stream"
                  onChange={(e) => void onPackageFile(e.target.files?.[0])}
                  aria-describedby="pkg-error"
                />
              </div>
              {decSource === "package-base64" ? (
                <div className="field">
                  <label htmlFor="pkg-text" className="sr-only">
                    Paket Base64
                  </label>
                  <textarea
                    id="pkg-text"
                    className="input input-mono"
                    rows={5}
                    value={packageText}
                    onChange={(e) => void onPackageText(e.target.value)}
                    placeholder="Tempel hasil tombol Salin paket untuk dekripsi"
                    aria-describedby="pkg-error"
                    spellCheck={false}
                  />
                </div>
              ) : null}
              {pkg ? (
                <dl className="facts facts-compact" data-testid="package-info">
                  <div>
                    <dt>Sumber</dt>
                    <dd>{pkg.label}</dd>
                  </div>
                  <div>
                    <dt>Algoritma</dt>
                    <dd>{CIPHERS[pkg.summary.algorithm].name}</dd>
                  </div>
                  <div>
                    <dt>Mode</dt>
                    <dd>{pkg.summary.inputMode === "file" ? "File utuh" : "Teks"}</dd>
                  </div>
                  {pkg.summary.fileName ? (
                    <div>
                      <dt>File asal</dt>
                      <dd>{pkg.summary.fileName}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>Payload</dt>
                    <dd>{formatBytes(pkg.summary.payloadLength)}</dd>
                  </div>
                </dl>
              ) : null}
              {inspecting ? <p className="field-help" role="status">Memeriksa paket di backend Ruby…</p> : null}
              {usesPackage && errors.package ? (
                <p className="field-error" id="pkg-error" role="alert">
                  {errors.package}
                </p>
              ) : null}
              {!usesPackage ? (
                <div className="field">
                  <label htmlFor="cipher-input" className="sr-only">
                    {decSource === "raw-letters" ? "Cipherteks huruf" : "Cipherteks Base64"}
                  </label>
                  <textarea
                    id="cipher-input"
                    className="input input-mono"
                    rows={5}
                    value={cipherInput}
                    onChange={(e) => {
                      setCipherInput(e.target.value);
                      touched("decrypt", "cipherInput");
                    }}
                    aria-invalid={Boolean(errors.cipherInput)}
                    aria-describedby="cipher-input-help cipher-input-error"
                    placeholder={decSource === "raw-letters" ? "Tempel cipherteks huruf A-Z" : "Tempel cipherteks Base64"}
                    spellCheck={false}
                  />
                  <p className="field-help" id="cipher-input-help">
                    {decSource === "raw-letters"
                      ? "Huruf selain A-Z dibuang sebelum dekripsi."
                      : "Base64 didekode apa adanya tanpa mengubah huruf besar dan kecil. Angka, +, /, dan = tetap dipakai."}
                  </p>
                  {errors.cipherInput ? (
                    <p className="field-error" id="cipher-input-error" role="alert">
                      {errors.cipherInput}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </Panel>

          <Panel n="05" title="Kunci" sub="Masukkan kunci sesuai cipher." className="panel-key">
            <KeyFields cipher={activeCipher} values={keyValues} errors={keyErrors} onChange={changeKey} />
            {generalKeyError ? (
              <p className="field-error" role="alert">
                {generalKeyError}
              </p>
            ) : null}
            <button type="submit" className="btn btn-accent btn-run" disabled={running || inspecting} data-testid="run">
              {running ? "Memproses…" : inspecting ? "Memeriksa paket…" : runLabel}
              {running ? null : <IconPlay size={20} />}
            </button>
          </Panel>
        </div>
      </form>

      <div className="col col-output">
        <section ref={resultRef} className="panel panel-result" aria-live="polite" aria-busy={running}>
          <PanelHead n="06" title="Hasil" sub="Hasil enkripsi atau dekripsi ditampilkan di sini.">
            <span className={`chip chip-${statusChip.tone}`}>{statusChip.label}</span>
          </PanelHead>
          <div className="result-body">
            {stale ? (
              <p className="status status-stale" data-testid="stale-warning">
                Masukan atau kunci berubah sejak proses terakhir. Hasil di bawah belum sesuai masukan terbaru. Jalankan ulang.
              </p>
            ) : null}
            {run.status === "idle" ? (
              <div className="empty">
                <span className="empty-glyph" aria-hidden="true">
                  {CIPHERS[activeCipher].name.charAt(0)}
                </span>
                <p className="empty-title">Hasil akan muncul di sini</p>
                <p className="empty-text">
                  Pilih cipher, isi {operation === "encrypt" ? "pesan" : "cipherteks"} dan kunci, lalu tekan {runLabel}.
                </p>
              </div>
            ) : null}
            {run.status === "running" ? <p className="status status-neutral">Sedang memproses di latar belakang…</p> : null}
            {run.status === "error" ? (
              <p className="status status-error" role="alert" data-testid="run-error">
                {run.message}
              </p>
            ) : null}
            <div className={stale ? "is-stale" : undefined}>
              {run.status === "encrypted" ? <EncryptResultView result={run.result} onUseForDecrypt={() => sendToDecrypt(run.result, run.initialKey)} /> : null}
              {run.status === "decrypted" ? <DecryptResultView key={run.seq} result={run.result} /> : null}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function PanelHead({ n, title, sub, children }: { n: string; title: string; sub: string; children?: React.ReactNode }) {
  return (
    <div className="panel-head">
      <span className="panel-icon">
        <IconPanel size={22} />
      </span>
      <span className="panel-num">{n}</span>
      <div className="panel-heading">
        <h2>{title}</h2>
        <p>{sub}</p>
      </div>
      {children ? <div className="panel-aside">{children}</div> : null}
    </div>
  );
}

function Panel({ n, title, sub, className, children }: { n: string; title: string; sub: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={`panel${className ? ` ${className}` : ""}`}>
      <PanelHead n={n} title={title} sub={sub} />
      <div className="panel-body">{children}</div>
    </section>
  );
}
```

## src/components/download.ts

```ts
export function downloadBytes(bytes: Uint8Array, fileName: string, type = "application/octet-stream"): void {
  const blob = new Blob([bytes as Uint8Array<ArrayBuffer>], { type: type || "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

/** Memisahkan nama dan ekstensi: "foto.final.png" menjadi ["foto.final", ".png"]. */
export function splitFileName(name: string): [string, string] {
  const dot = name.lastIndexOf(".");
  if (dot <= 0) return [name, ""];
  return [name.slice(0, dot), name.slice(dot)];
}

const id = (value: number, digits = 0) => value.toLocaleString("id-ID", { maximumFractionDigits: digits });

/** Ukuran dengan format angka Indonesia, misalnya "15,7 KB (16.044 byte)". */
export function formatBytes(size: number): string {
  if (size < 1024) return `${id(size)} byte`;
  if (size < 1024 * 1024) return `${id(size / 1024, 1)} KB (${id(size)} byte)`;
  return `${id(size / 1024 / 1024, 2)} MB (${id(size)} byte)`;
}
```

## src/lib/codecs/alpha25.ts

```ts
// Codec alpha25-v1 (PRD bagian 6): setiap byte b menjadi dua simbol dari
// alfabet 25 huruf tanpa J, dengan indeks floor(b / 25) dan b mod 25.
// Keluaran berupa indeks alfabet standar A=0 sampai Z=25 agar dapat langsung
// diproses cipher modulo 26. Codec ini representasi data, bukan enkripsi.

export const ALPHA25_ID = "alpha25-v1";
export const ALPHA25_ALPHABET = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

const J_INDEX = 9;
// Indeks codec (0-24) ke indeks alfabet standar (0-25).
const CODEC_TO_STD = new Uint8Array(25);
// Indeks alfabet standar ke indeks codec, -1 untuk J.
const STD_TO_CODEC = new Int8Array(26).fill(-1);
for (let i = 0; i < 25; i++) {
  const std = ALPHA25_ALPHABET.charCodeAt(i) - 65;
  CODEC_TO_STD[i] = std;
  STD_TO_CODEC[std] = i;
}

export function alpha25Encode(bytes: Uint8Array): Uint8Array {
  const out = new Uint8Array(bytes.length * 2);
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i]!;
    out[2 * i] = CODEC_TO_STD[Math.floor(b / 25)]!;
    out[2 * i + 1] = CODEC_TO_STD[b % 25]!;
  }
  return out;
}

export class CodecError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CodecError";
  }
}

export function alpha25Decode(indices: Uint8Array): Uint8Array {
  if (indices.length % 2 !== 0) {
    throw new CodecError(`Codec alpha25-v1: jumlah simbol ${indices.length} ganjil.`);
  }
  const out = new Uint8Array(indices.length / 2);
  for (let i = 0; i < out.length; i++) {
    const hi = STD_TO_CODEC[indices[2 * i]!] ?? -1;
    const lo = STD_TO_CODEC[indices[2 * i + 1]!] ?? -1;
    if (hi < 0 || lo < 0) {
      throw new CodecError(`Codec alpha25-v1: simbol di luar alfabet codec (J) pada pasangan ke-${i}.`);
    }
    const value = 25 * hi + lo;
    if (value > 255) {
      throw new CodecError(`Codec alpha25-v1: nilai pasangan ke-${i} adalah ${value}, melebihi 255.`);
    }
    out[i] = value;
  }
  return out;
}

export { J_INDEX };
```

## src/lib/codecs/alphabet.ts

```ts
export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const CODE_A = 65;
const CODE_Z = 90;
const CODE_LOWER_A = 97;
const CODE_LOWER_Z = 122;

/**
 * Normalisasi teks alfabet: hanya huruf ASCII A-Z dan a-z yang dipertahankan,
 * lalu huruf kecil diubah menjadi kapital. Penyaringan dilakukan sebelum
 * pengubahan kapitalisasi sehingga karakter Unicode (misalnya "ß" atau "ı")
 * tidak berubah menjadi huruf ASCII baru.
 */
export function normalizeAlphabetic(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= CODE_A && code <= CODE_Z) out += text[i];
    else if (code >= CODE_LOWER_A && code <= CODE_LOWER_Z) out += String.fromCharCode(code - 32);
  }
  return out;
}

/** Sama dengan normalizeAlphabetic tetapi bekerja pada byte (ASCII) dan menghasilkan indeks 0-25. */
export function normalizeAlphabeticBytes(bytes: Uint8Array): Uint8Array {
  const out = new Uint8Array(bytes.length);
  let n = 0;
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i]!;
    if (b >= CODE_A && b <= CODE_Z) out[n++] = b - CODE_A;
    else if (b >= CODE_LOWER_A && b <= CODE_LOWER_Z) out[n++] = b - CODE_LOWER_A;
  }
  return out.slice(0, n);
}

/** Mengubah string A-Z kapital menjadi indeks 0-25. Karakter lain menimbulkan galat. */
export function lettersToIndices(letters: string): Uint8Array {
  const out = new Uint8Array(letters.length);
  for (let i = 0; i < letters.length; i++) {
    const code = letters.charCodeAt(i);
    if (code < CODE_A || code > CODE_Z) {
      throw new Error(`Karakter bukan huruf kapital A-Z pada posisi ${i}.`);
    }
    out[i] = code - CODE_A;
  }
  return out;
}

/** Indeks 0-25 menjadi byte ASCII huruf kapital. */
export function indicesToAscii(indices: Uint8Array): Uint8Array {
  const out = new Uint8Array(indices.length);
  for (let i = 0; i < indices.length; i++) out[i] = indices[i]! + CODE_A;
  return out;
}

/** Byte ASCII yang seluruhnya huruf kapital A-Z menjadi indeks 0-25. Mengembalikan null bila ada byte lain. */
export function strictAsciiToIndices(bytes: Uint8Array): Uint8Array | null {
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i]!;
    if (b < CODE_A || b > CODE_Z) return null;
    out[i] = b - CODE_A;
  }
  return out;
}

const asciiDecoder = new TextDecoder();

export function indicesToLetters(indices: Uint8Array): string {
  return asciiDecoder.decode(indicesToAscii(indices));
}
```

## src/lib/codecs/base64.ts

```ts
// Base64 standar RFC 4648 bagian 4 dengan padding "=".
// Kapitalisasi dipertahankan apa adanya karena "A" dan "a" mewakili nilai berbeda.

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const ENCODE_TABLE = new Uint8Array(64);
const DECODE_TABLE = new Int16Array(128).fill(-1);
for (let i = 0; i < 64; i++) {
  const code = CHARS.charCodeAt(i);
  ENCODE_TABLE[i] = code;
  DECODE_TABLE[code] = i;
}
const PAD = 61; // "="

const asciiDecoder = new TextDecoder();

export function encodeBase64(bytes: Uint8Array): string {
  const outLength = Math.ceil(bytes.length / 3) * 4;
  const out = new Uint8Array(outLength);
  let o = 0;
  let i = 0;
  const full = bytes.length - (bytes.length % 3);
  for (; i < full; i += 3) {
    const n = (bytes[i]! << 16) | (bytes[i + 1]! << 8) | bytes[i + 2]!;
    out[o++] = ENCODE_TABLE[(n >> 18) & 63]!;
    out[o++] = ENCODE_TABLE[(n >> 12) & 63]!;
    out[o++] = ENCODE_TABLE[(n >> 6) & 63]!;
    out[o++] = ENCODE_TABLE[n & 63]!;
  }
  const rest = bytes.length - full;
  if (rest === 1) {
    const n = bytes[i]! << 16;
    out[o++] = ENCODE_TABLE[(n >> 18) & 63]!;
    out[o++] = ENCODE_TABLE[(n >> 12) & 63]!;
    out[o++] = PAD;
    out[o++] = PAD;
  } else if (rest === 2) {
    const n = (bytes[i]! << 16) | (bytes[i + 1]! << 8);
    out[o++] = ENCODE_TABLE[(n >> 18) & 63]!;
    out[o++] = ENCODE_TABLE[(n >> 12) & 63]!;
    out[o++] = ENCODE_TABLE[(n >> 6) & 63]!;
    out[o++] = PAD;
  }
  return asciiDecoder.decode(out);
}

/** Base64 dari sebagian awal data, untuk pratinjau tanpa mengode seluruh data. */
export function encodeBase64Preview(bytes: Uint8Array, maxChars: number): { text: string; truncated: boolean } {
  const fullLength = Math.ceil(bytes.length / 3) * 4;
  if (fullLength <= maxChars) return { text: encodeBase64(bytes), truncated: false };
  const byteCount = Math.floor(maxChars / 4) * 3;
  return { text: encodeBase64(bytes.subarray(0, byteCount)), truncated: true };
}

export class Base64Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Base64Error";
  }
}

/**
 * Dekode Base64 secara ketat. Spasi dan baris baru di antara karakter diabaikan
 * (sering terbawa saat menyalin), tetapi karakter lain di luar alfabet Base64,
 * padding yang salah letak, panjang yang bukan kelipatan 4, dan bit sisa yang
 * tidak nol ditolak. Tidak ada huruf yang diubah kapitalisasinya atau dibuang.
 */
export function decodeBase64(input: string): Uint8Array {
  const clean = input.replace(/[ \t\r\n]/g, "");
  if (clean.length % 4 !== 0) {
    throw new Base64Error(`Panjang Base64 (${clean.length} karakter) bukan kelipatan 4.`);
  }
  let padding = 0;
  if (clean.endsWith("==")) padding = 2;
  else if (clean.endsWith("=")) padding = 1;
  const body = clean.length - padding;
  for (let i = 0; i < body; i++) {
    const code = clean.charCodeAt(i);
    if (code >= 128 || DECODE_TABLE[code] === -1) {
      const ch = clean[i];
      if (ch === "=") throw new Base64Error(`Tanda "=" hanya boleh berada di akhir (posisi ${i}).`);
      throw new Base64Error(`Karakter "${ch}" pada posisi ${i} bukan karakter Base64.`);
    }
  }
  const outLength = (clean.length / 4) * 3 - padding;
  const out = new Uint8Array(outLength);
  let o = 0;
  for (let i = 0; i < clean.length; i += 4) {
    const a = DECODE_TABLE[clean.charCodeAt(i)]!;
    const b = DECODE_TABLE[clean.charCodeAt(i + 1)]!;
    const cCode = clean.charCodeAt(i + 2);
    const dCode = clean.charCodeAt(i + 3);
    const c = cCode === PAD ? 0 : DECODE_TABLE[cCode]!;
    const d = dCode === PAD ? 0 : DECODE_TABLE[dCode]!;
    const n = (a << 18) | (b << 12) | (c << 6) | d;
    out[o++] = (n >> 16) & 255;
    if (cCode !== PAD) out[o++] = (n >> 8) & 255;
    if (dCode !== PAD) out[o++] = n & 255;
    if (cCode === PAD && (b & 15) !== 0) throw new Base64Error("Bit sisa sebelum padding tidak nol. Base64 rusak.");
    if (cCode !== PAD && dCode === PAD && (c & 3) !== 0) {
      throw new Base64Error("Bit sisa sebelum padding tidak nol. Base64 rusak.");
    }
  }
  return out;
}
```

## src/lib/codecs/bitset.ts

```ts
// Bitset ringkas "bitset-lsb-v1": bit ke-i disimpan pada byte floor(i / 8),
// posisi bit (i mod 8) dihitung dari bit paling tidak signifikan.

export function createBitset(length: number): Uint8Array {
  return new Uint8Array(Math.ceil(length / 8));
}

export function setBit(bits: Uint8Array, index: number): void {
  bits[index >> 3]! |= 1 << (index & 7);
}

export function getBit(bits: Uint8Array, index: number): boolean {
  return ((bits[index >> 3] ?? 0) & (1 << (index & 7))) !== 0;
}

export function countBits(bits: Uint8Array, length: number): number {
  let count = 0;
  for (let i = 0; i < length; i++) if (getBit(bits, i)) count++;
  return count;
}

/** Memastikan bit di luar panjang logis bernilai nol. */
export function hasBitsBeyond(bits: Uint8Array, length: number): boolean {
  for (let i = length; i < bits.length * 8; i++) if (getBit(bits, i)) return true;
  return false;
}
```

## src/lib/codecs/utf8.ts

```ts
const encoder = new TextEncoder();
const strictDecoder = new TextDecoder("utf-8", { fatal: true });

export function encodeUtf8(text: string): Uint8Array {
  return encoder.encode(text);
}

/** Dekode UTF-8 yang valid saja. Mengembalikan null bila byte bukan UTF-8 yang sah. */
export function decodeUtf8Strict(bytes: Uint8Array): string | null {
  try {
    return strictDecoder.decode(bytes);
  } catch {
    return null;
  }
}
```

## src/lib/container/checksum.ts

```ts
// SHA-256 dipakai untuk memeriksa kesamaan data hasil dekripsi dengan data
// asal. Ini bukan MAC dan bukan bukti autentikasi.

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes as Uint8Array<ArrayBuffer>);
  const view = new Uint8Array(digest);
  let hex = "";
  for (const b of view) hex += b.toString(16).padStart(2, "0");
  return hex;
}
```

## src/lib/container/format.ts

```ts
// Kontainer biner .dat (PRD 7.1):
//   1. Penanda format  : 8 byte ASCII "UTSKRIPT"
//   2. Versi format    : 1 byte unsigned, saat ini 1
//   3. Panjang metadata: 4 byte unsigned big endian
//   4. Metadata        : JSON UTF-8
//   5. Payload         : byte cipherteks lengkap

import { encodeUtf8 } from "../codecs/utf8";
import { ContainerError, type ContainerMetadata, validateMetadata, type ValidatedMetadata } from "./metadata";

export const CONTAINER_MAGIC = "UTSKRIPT";
export const CONTAINER_VERSION = 1;
export const HEADER_FIXED_LENGTH = 13;
export const MAX_METADATA_LENGTH = 64 * 1024 * 1024;

const MAGIC_BYTES = encodeUtf8(CONTAINER_MAGIC);

export function serializeContainer(metadata: ContainerMetadata, payload: Uint8Array): Uint8Array {
  const json = encodeUtf8(JSON.stringify(metadata));
  const out = new Uint8Array(HEADER_FIXED_LENGTH + json.length + payload.length);
  out.set(MAGIC_BYTES, 0);
  out[8] = CONTAINER_VERSION;
  new DataView(out.buffer).setUint32(9, json.length, false);
  out.set(json, HEADER_FIXED_LENGTH);
  out.set(payload, HEADER_FIXED_LENGTH + json.length);
  return out;
}

export interface ParsedContainer extends ValidatedMetadata {
  version: number;
  metadataLength: number;
  payload: Uint8Array;
}

export function isContainer(bytes: Uint8Array): boolean {
  if (bytes.length < MAGIC_BYTES.length) return false;
  for (let i = 0; i < MAGIC_BYTES.length; i++) if (bytes[i] !== MAGIC_BYTES[i]) return false;
  return true;
}

const strictUtf8 = new TextDecoder("utf-8", { fatal: true });

export function parseContainer(bytes: Uint8Array): ParsedContainer {
  if (bytes.length < MAGIC_BYTES.length) {
    throw new ContainerError(`Header paket terpotong: hanya ${bytes.length} byte.`);
  }
  if (!isContainer(bytes)) {
    throw new ContainerError("Data bukan paket UTSKRIPT (penanda format tidak ditemukan).");
  }
  if (bytes.length < HEADER_FIXED_LENGTH) {
    throw new ContainerError(`Header paket terpotong: hanya ${bytes.length} byte, minimal ${HEADER_FIXED_LENGTH} byte.`);
  }
  const version = bytes[8]!;
  if (version !== CONTAINER_VERSION) {
    throw new ContainerError(`Versi paket ${version} tidak didukung. Versi yang didukung: ${CONTAINER_VERSION}.`);
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const metadataLength = view.getUint32(9, false);
  if (metadataLength > MAX_METADATA_LENGTH) {
    throw new ContainerError(`Panjang metadata ${metadataLength} byte melebihi batas.`);
  }
  if (HEADER_FIXED_LENGTH + metadataLength > bytes.length) {
    throw new ContainerError(
      `Paket terpotong: metadata menyatakan ${metadataLength} byte tetapi data hanya ${bytes.length - HEADER_FIXED_LENGTH} byte.`,
    );
  }
  let raw: unknown;
  try {
    const json = strictUtf8.decode(bytes.subarray(HEADER_FIXED_LENGTH, HEADER_FIXED_LENGTH + metadataLength));
    raw = JSON.parse(json);
  } catch {
    throw new ContainerError("Metadata paket rusak: bukan JSON UTF-8 yang valid.");
  }
  const payload = bytes.subarray(HEADER_FIXED_LENGTH + metadataLength);
  const validated = validateMetadata(raw, payload.length);
  return { ...validated, version, metadataLength, payload };
}
```

## src/lib/container/metadata.ts

```ts
// Metadata pemulihan kontainer UTSKRIPT versi 1 (PRD 7.1).
// Metadata tidak pernah memuat kunci, plainteks, atau salinan file asal.

import { Base64Error, decodeBase64 } from "../codecs/base64";
import { countBits, hasBitsBeyond } from "../codecs/bitset";
import { type CipherId, isAlphaCipher, isCipherId } from "../crypto/ciphers";
import { UserFacingError } from "../crypto/errors";
import { HILL_MAX_SIZE } from "../crypto/hill";

export type InputMode = "text" | "file";
export type CodecId = "alpha-text-v1" | "alpha25-v1" | "utf8-v1" | "bytes-v1";
export type PayloadEncoding = "ascii-letters" | "bytes";

export interface PlayfairMetadata {
  /** Representasi penanda: bitset LSB-first yang dikode Base64. */
  markers: "bitset-lsb-v1";
  /** Bitset posisi huruf pengisi sepanjang payload. */
  filler: string;
  fillerCount: number;
  /** Bitset posisi J asli sepanjang teks hasil normalisasi. Tidak ada untuk mode file. */
  j?: string;
  jCount: number;
}

export interface HillMetadata {
  n: number;
  padCount: number;
}

export interface ContainerMetadata {
  algorithm: CipherId;
  inputMode: InputMode;
  codec: CodecId;
  payloadEncoding: PayloadEncoding;
  payloadLength: number;
  /** Ukuran data yang akan dipulihkan: teks hasil normalisasi atau file asli. */
  expectedLength: number;
  checksumAlgorithm: "SHA-256";
  /** Checksum data yang akan dipulihkan, heksadesimal huruf kecil. */
  sha256: string;
  file?: { name: string; type: string };
  /** Nama file sumber ketika isi file dibaca sebagai teks alfabet. */
  sourceFileName?: string;
  playfair?: PlayfairMetadata;
  hill?: HillMetadata;
}

export interface ValidatedMetadata {
  metadata: ContainerMetadata;
  /** Bitset yang sudah didekode untuk Playfair. */
  playfairBits?: { filler: Uint8Array; j: Uint8Array | null };
}

export const MAX_PAYLOAD_LENGTH = 256 * 1024 * 1024;

export class ContainerError extends UserFacingError {
  constructor(message: string) {
    super(message, "package");
    this.name = "ContainerError";
  }
}

export function expectedCodec(algorithm: CipherId, inputMode: InputMode): CodecId {
  if (isAlphaCipher(algorithm)) return inputMode === "file" ? "alpha25-v1" : "alpha-text-v1";
  return inputMode === "file" ? "bytes-v1" : "utf8-v1";
}

/**
 * Nama file dari metadata hanya dipakai sebagai nama unduhan. Komponen path,
 * karakter kontrol, dan karakter terlarang Windows dibuang.
 */
export function sanitizeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "";
  const cleaned = base.replace(/[\u0000-\u001f\u007f<>:"|?*]/g, "_").replace(/^\.+/, "").trim().slice(0, 200);
  return cleaned.length > 0 ? cleaned : "hasil-dekripsi.bin";
}

function fail(message: string): never {
  throw new ContainerError(`Metadata paket tidak valid: ${message}`);
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function decodeBitset(value: unknown, length: number, label: string): Uint8Array {
  if (typeof value !== "string") fail(`${label} harus berupa string Base64.`);
  let bits: Uint8Array;
  try {
    bits = decodeBase64(value);
  } catch (err) {
    fail(`${label} bukan Base64 yang valid (${err instanceof Base64Error ? err.message : "rusak"}).`);
  }
  if (bits.length !== Math.ceil(length / 8)) fail(`panjang ${label} tidak sesuai dengan panjang data.`);
  if (hasBitsBeyond(bits, length)) fail(`${label} memuat bit di luar panjang data.`);
  return bits;
}

export function validateMetadata(raw: unknown, actualPayloadLength: number): ValidatedMetadata {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) fail("bukan objek JSON.");
  const m = raw as Record<string, unknown>;

  if (!isCipherId(m.algorithm)) fail("algoritma tidak dikenal.");
  const algorithm = m.algorithm;
  const alpha = isAlphaCipher(algorithm);
  if (m.inputMode !== "text" && m.inputMode !== "file") fail("mode masukan tidak dikenal.");
  const inputMode = m.inputMode;
  if (m.codec !== expectedCodec(algorithm, inputMode)) fail("codec tidak sesuai dengan algoritma dan mode.");
  const expectedEncoding: PayloadEncoding = alpha ? "ascii-letters" : "bytes";
  if (m.payloadEncoding !== expectedEncoding) fail("encoding payload tidak sesuai algoritma.");
  if (!isNonNegativeInteger(m.payloadLength) || m.payloadLength > MAX_PAYLOAD_LENGTH) fail("panjang payload tidak masuk akal.");
  if (m.payloadLength !== actualPayloadLength) {
    throw new ContainerError(
      `Panjang payload tidak cocok: metadata menyebut ${m.payloadLength} byte, paket berisi ${actualPayloadLength} byte.`,
    );
  }
  if (!isNonNegativeInteger(m.expectedLength)) fail("ukuran hasil tidak masuk akal.");
  if (m.checksumAlgorithm !== "SHA-256") fail("algoritma checksum tidak didukung.");
  if (typeof m.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(m.sha256)) fail("checksum SHA-256 tidak valid.");

  let file: ContainerMetadata["file"];
  if (m.file !== undefined) {
    const f = m.file as Record<string, unknown>;
    if (typeof f !== "object" || f === null || typeof f.name !== "string" || typeof f.type !== "string") {
      fail("informasi file asal rusak.");
    }
    if (f.name.length > 1024 || f.type.length > 255) fail("informasi file asal terlalu panjang.");
    file = { name: sanitizeFileName(f.name), type: f.type };
  }
  let sourceFileName: string | undefined;
  if (m.sourceFileName !== undefined) {
    if (typeof m.sourceFileName !== "string" || m.sourceFileName.length > 1024) fail("nama file sumber rusak.");
    sourceFileName = sanitizeFileName(m.sourceFileName);
  }

  const payloadLength = m.payloadLength;
  let letterCount = payloadLength;
  let playfair: PlayfairMetadata | undefined;
  let hill: HillMetadata | undefined;
  let playfairBits: ValidatedMetadata["playfairBits"];

  if (algorithm === "playfair") {
    const p = m.playfair as Record<string, unknown> | undefined;
    if (typeof p !== "object" || p === null) fail("metadata Playfair tidak ada.");
    if (p.markers !== "bitset-lsb-v1") fail("representasi penanda Playfair tidak didukung.");
    if (payloadLength % 2 !== 0) fail("payload Playfair harus berpanjang genap.");
    if (!isNonNegativeInteger(p.fillerCount) || !isNonNegativeInteger(p.jCount)) fail("jumlah penanda Playfair rusak.");
    const filler = decodeBitset(p.filler, payloadLength, "bitset pengisi");
    if (countBits(filler, payloadLength) !== p.fillerCount) fail("jumlah pengisi tidak cocok dengan bitset.");
    letterCount = payloadLength - p.fillerCount;
    let j: Uint8Array | null = null;
    if (p.j !== undefined) {
      if (inputMode === "file") fail("mode file tidak memakai penanda J.");
      j = decodeBitset(p.j, letterCount, "bitset J");
      if (countBits(j, letterCount) !== p.jCount) fail("jumlah J tidak cocok dengan bitset.");
    } else if (p.jCount !== 0) {
      fail("bitset J tidak ada.");
    }
    playfair = { markers: "bitset-lsb-v1", filler: p.filler as string, fillerCount: p.fillerCount, jCount: p.jCount };
    if (p.j !== undefined) playfair.j = p.j as string;
    playfairBits = { filler, j };
  } else if (m.playfair !== undefined) {
    fail("metadata Playfair hanya untuk algoritma Playfair.");
  }

  if (algorithm === "hill") {
    const h = m.hill as Record<string, unknown> | undefined;
    if (typeof h !== "object" || h === null) fail("metadata Hill tidak ada.");
    if (!isNonNegativeInteger(h.n) || h.n < 2 || h.n > HILL_MAX_SIZE) fail("ukuran blok Hill tidak valid.");
    if (!isNonNegativeInteger(h.padCount) || h.padCount >= h.n) fail("jumlah padding Hill tidak valid.");
    if (payloadLength % h.n !== 0) fail("panjang payload Hill bukan kelipatan ukuran blok.");
    if (h.padCount > payloadLength) fail("padding Hill melebihi panjang payload.");
    letterCount = payloadLength - h.padCount;
    hill = { n: h.n, padCount: h.padCount };
  } else if (m.hill !== undefined) {
    fail("metadata Hill hanya untuk algoritma Hill.");
  }

  if (alpha) {
    const expectedLetters = inputMode === "file" ? m.expectedLength * 2 : m.expectedLength;
    if (letterCount !== expectedLetters) fail("ukuran hasil tidak konsisten dengan panjang payload.");
  } else if (m.expectedLength !== payloadLength) {
    fail("ukuran hasil harus sama dengan panjang payload untuk cipher byte.");
  }

  const metadata: ContainerMetadata = {
    algorithm,
    inputMode,
    codec: m.codec as CodecId,
    payloadEncoding: expectedEncoding,
    payloadLength,
    expectedLength: m.expectedLength,
    checksumAlgorithm: "SHA-256",
    sha256: m.sha256,
  };
  if (file) metadata.file = file;
  if (sourceFileName) metadata.sourceFileName = sourceFileName;
  if (playfair) metadata.playfair = playfair;
  if (hill) metadata.hill = hill;
  return playfairBits ? { metadata, playfairBits } : { metadata };
}
```

## src/lib/crypto/affine.ts

```ts
// Affine modulo 26 (PRD 5.6).
// C = mod(a * P + b, 26) dan P = mod(aInverse * (C - b), 26), syarat gcd(a, 26) = 1.

import { mod, modInverse } from "./modular";

export interface AffineKey {
  /** Nilai a setelah direduksi modulo 26. */
  a: number;
  /** Nilai b setelah direduksi modulo 26. */
  b: number;
}

export const VALID_AFFINE_A = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25] as const;

export function reduceAffineKey(a: number, b: number): AffineKey {
  return { a: mod(a, 26), b: mod(b, 26) };
}

function inverseOrThrow(a: number): number {
  const inv = modInverse(a, 26);
  if (inv === null) throw new Error(`a = ${a} tidak mempunyai invers modulo 26.`);
  return inv;
}

export function affineEncrypt(plain: Uint8Array, key: AffineKey): Uint8Array {
  inverseOrThrow(key.a);
  const out = new Uint8Array(plain.length);
  for (let i = 0; i < plain.length; i++) out[i] = mod(key.a * plain[i]! + key.b, 26);
  return out;
}

export function affineDecrypt(cipher: Uint8Array, key: AffineKey): Uint8Array {
  const inv = inverseOrThrow(key.a);
  const out = new Uint8Array(cipher.length);
  for (let i = 0; i < cipher.length; i++) out[i] = mod(inv * (cipher[i]! - key.b), 26);
  return out;
}
```

## src/lib/crypto/autokey.ts

```ts
// Auto-Key Vigenere varian plaintext autokey (PRD 5.3).
// Aliran kunci S = primer K diikuti plainteks: S[i] = K[i] untuk i < m,
// S[i] = P[i - m] untuk i >= m.

function assertPrimer(primer: Uint8Array): void {
  if (primer.length === 0) throw new Error("Primer Auto-Key tidak boleh kosong.");
}

export function autokeyEncrypt(plain: Uint8Array, primer: Uint8Array): Uint8Array {
  assertPrimer(primer);
  const m = primer.length;
  const out = new Uint8Array(plain.length);
  for (let i = 0; i < plain.length; i++) {
    const s = i < m ? primer[i]! : plain[i - m]!;
    out[i] = (plain[i]! + s) % 26;
  }
  return out;
}

/**
 * Dekripsi membangun lanjutan aliran kunci dari plainteks yang baru saja
 * dipulihkan, bukan dari cipherteks dan bukan dengan mengulang primer.
 */
export function autokeyDecrypt(cipher: Uint8Array, primer: Uint8Array): Uint8Array {
  assertPrimer(primer);
  const m = primer.length;
  const plain = new Uint8Array(cipher.length);
  for (let i = 0; i < cipher.length; i++) {
    const s = i < m ? primer[i]! : plain[i - m]!;
    plain[i] = (cipher[i]! - s + 26) % 26;
  }
  return plain;
}
```

## src/lib/crypto/ciphers.ts

```ts
export const CIPHER_IDS = [
  "vigenere",
  "autokey",
  "extended-vigenere",
  "playfair",
  "affine",
  "hill",
  "super",
  "enigma-i",
] as const;

export type CipherId = (typeof CIPHER_IDS)[number];

export type CipherKind = "alpha" | "byte";

export interface CipherInfo {
  id: CipherId;
  name: string;
  kind: CipherKind;
  summary: string;
}

export const CIPHERS: Record<CipherId, CipherInfo> = {
  vigenere: {
    id: "vigenere",
    name: "Vigenere standar",
    kind: "alpha",
    summary: "26 huruf, kata kunci diulang sepanjang pesan.",
  },
  autokey: {
    id: "autokey",
    name: "Auto-Key Vigenere",
    kind: "alpha",
    summary: "26 huruf, primer lalu dilanjutkan plainteks sebagai kunci.",
  },
  "extended-vigenere": {
    id: "extended-vigenere",
    name: "Extended Vigenere",
    kind: "byte",
    summary: "256 nilai byte, bekerja langsung pada byte data.",
  },
  playfair: {
    id: "playfair",
    name: "Playfair",
    kind: "alpha",
    summary: "Matriks 5 x 5, J digabung ke I, pengisi X atau Q.",
  },
  affine: {
    id: "affine",
    name: "Affine",
    kind: "alpha",
    summary: "C = a·P + b mod 26, a harus relatif prima terhadap 26.",
  },
  hill: {
    id: "hill",
    name: "Hill",
    kind: "alpha",
    summary: "Matriks n x n invertibel modulo 26, vektor kolom.",
  },
  super: {
    id: "super",
    name: "Super Enkripsi",
    kind: "byte",
    summary: "Extended Vigenere lalu transposisi kolom pada byte.",
  },
  "enigma-i": {
    id: "enigma-i",
    name: "Enigma I",
    kind: "alpha",
    summary: "Tiga rotor, reflector, ring setting, dan plugboard pada huruf A-Z.",
  },
};

export function isCipherId(value: unknown): value is CipherId {
  return typeof value === "string" && (CIPHER_IDS as readonly string[]).includes(value);
}

export function isAlphaCipher(id: CipherId): boolean {
  return CIPHERS[id].kind === "alpha";
}
```

## src/lib/crypto/errors.ts

```ts
/**
 * Galat yang pesannya aman ditampilkan kepada pengguna. `field` menunjuk
 * kolom formulir yang bermasalah bila ada.
 */
export class UserFacingError extends Error {
  readonly field: string | undefined;

  constructor(message: string, field?: string) {
    super(message);
    this.name = "UserFacingError";
    this.field = field;
  }
}
```

## src/lib/crypto/extended-vigenere.ts

```ts
// Extended Vigenere modulo 256 pada byte (PRD 5.4).
// C[i] = mod(P[i] + K[i mod m], 256) dan P[i] = mod(C[i] - K[i mod m], 256).

function assertKey(key: Uint8Array): void {
  if (key.length === 0) throw new Error("Kunci Extended Vigenere harus berisi minimal satu byte.");
}

export function extendedVigenereEncrypt(plain: Uint8Array, key: Uint8Array): Uint8Array {
  assertKey(key);
  const out = new Uint8Array(plain.length);
  const m = key.length;
  for (let i = 0; i < plain.length; i++) out[i] = (plain[i]! + key[i % m]!) & 255;
  return out;
}

export function extendedVigenereDecrypt(cipher: Uint8Array, key: Uint8Array): Uint8Array {
  assertKey(key);
  const out = new Uint8Array(cipher.length);
  const m = key.length;
  for (let i = 0; i < cipher.length; i++) out[i] = (cipher[i]! - key[i % m]! + 256) & 255;
  return out;
}
```

## src/lib/crypto/hill.ts

```ts
// Hill modulo 26 dengan vektor kolom (PRD 5.7).
// Enkripsi C = K * P mod 26, dekripsi P = KInverse * C mod 26.
//
// Invers dihitung tepat dalam aritmetika modular: eliminasi Gauss-Jordan pada
// medan modulo 2 dan modulo 13, lalu setiap elemen digabung dengan CRT.
// Pendekatan ini menangani matriks invertibel seperti [[2,1],[13,7]] yang
// tidak memiliki pivot awal yang invertibel modulo 26.

import { mod, modInverse } from "./modular";

export type Matrix = number[][];

export const HILL_MAX_SIZE = 10;
const X = 23;

export function reduceMatrix(matrix: Matrix): Matrix {
  return matrix.map((row) => row.map((v) => mod(v, 26)));
}

interface FieldResult {
  det: number;
  inverse: Matrix | null;
}

/** Determinan dan invers pada medan prima p dengan eliminasi Gauss-Jordan. */
function solveOverPrime(matrix: Matrix, p: number): FieldResult {
  const n = matrix.length;
  const a = matrix.map((row) => row.map((v) => mod(v, p)));
  const inv: Matrix = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (r === c ? 1 : 0)));
  let det = 1;
  for (let col = 0; col < n; col++) {
    let pivot = -1;
    for (let r = col; r < n; r++) {
      if (a[r]![col] !== 0) {
        pivot = r;
        break;
      }
    }
    if (pivot === -1) return { det: 0, inverse: null };
    if (pivot !== col) {
      [a[pivot], a[col]] = [a[col]!, a[pivot]!];
      [inv[pivot], inv[col]] = [inv[col]!, inv[pivot]!];
      det = mod(-det, p);
    }
    const pv = a[col]![col]!;
    det = mod(det * pv, p);
    const pvInv = modInverse(pv, p)!;
    for (let c = 0; c < n; c++) {
      a[col]![c] = mod(a[col]![c]! * pvInv, p);
      inv[col]![c] = mod(inv[col]![c]! * pvInv, p);
    }
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = a[r]![col]!;
      if (factor === 0) continue;
      for (let c = 0; c < n; c++) {
        a[r]![c] = mod(a[r]![c]! - factor * a[col]![c]!, p);
        inv[r]![c] = mod(inv[r]![c]! - factor * inv[col]![c]!, p);
      }
    }
  }
  return { det, inverse: inv };
}

/** Gabungan CRT: x = r2 (mod 2) dan x = r13 (mod 13) menjadi x mod 26. */
function crt26(r2: number, r13: number): number {
  return mod(r13 + 13 * mod(r2 - r13, 2), 26);
}

export function hillDeterminantMod26(matrix: Matrix): number {
  const d2 = solveOverPrime(matrix, 2).det;
  const d13 = solveOverPrime(matrix, 13).det;
  return crt26(d2, d13);
}

export function hillInverseMod26(matrix: Matrix): Matrix | null {
  const m2 = solveOverPrime(matrix, 2);
  const m13 = solveOverPrime(matrix, 13);
  if (!m2.inverse || !m13.inverse) return null;
  const n = matrix.length;
  const inv: Matrix = [];
  for (let r = 0; r < n; r++) {
    const row: number[] = [];
    for (let c = 0; c < n; c++) row.push(crt26(m2.inverse[r]![c]!, m13.inverse[r]![c]!));
    inv.push(row);
  }
  return inv;
}

export function multiplyMatrixMod26(a: Matrix, b: Matrix): Matrix {
  const n = a.length;
  return Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => {
      let sum = 0;
      for (let k = 0; k < n; k++) sum += a[r]![k]! * b[k]![c]!;
      return mod(sum, 26);
    }),
  );
}

/** Mengalikan setiap blok n huruf (vektor kolom) dengan matriks. Panjang harus kelipatan n. */
export function hillApply(text: Uint8Array, matrix: Matrix): Uint8Array {
  const n = matrix.length;
  if (text.length % n !== 0) throw new Error(`Panjang teks Hill harus kelipatan ${n}.`);
  const flat = new Int32Array(n * n);
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) flat[r * n + c] = mod(matrix[r]![c]!, 26);
  const out = new Uint8Array(text.length);
  for (let base = 0; base < text.length; base += n) {
    for (let r = 0; r < n; r++) {
      let sum = 0;
      for (let c = 0; c < n; c++) sum += flat[r * n + c]! * text[base + c]!;
      out[base + r] = sum % 26;
    }
  }
  return out;
}

/** Menambahkan X hanya bila panjang bukan kelipatan n. */
export function hillPad(letters: Uint8Array, n: number): { padded: Uint8Array; padCount: number } {
  const padCount = (n - (letters.length % n)) % n;
  if (padCount === 0) return { padded: letters, padCount };
  const padded = new Uint8Array(letters.length + padCount);
  padded.set(letters);
  padded.fill(X, letters.length);
  return { padded, padCount };
}

export function hillEncrypt(letters: Uint8Array, matrix: Matrix): { cipher: Uint8Array; padCount: number } {
  if (!hillInverseMod26(matrix)) throw new Error("Matriks Hill tidak invertibel modulo 26.");
  const { padded, padCount } = hillPad(letters, matrix.length);
  return { cipher: hillApply(padded, matrix), padCount };
}

/** Dekripsi mentah: pengisi X tetap ada karena panjang asli tidak diketahui. */
export function hillDecryptRaw(cipher: Uint8Array, matrix: Matrix): Uint8Array {
  const inverse = hillInverseMod26(matrix);
  if (!inverse) throw new Error("Matriks Hill tidak invertibel modulo 26.");
  return hillApply(cipher, inverse);
}
```

## src/lib/crypto/modular.ts

```ts
/** Modulo yang selalu non-negatif: mod(-1, 26) = 25. */
export function mod(x: number, m: number): number {
  return ((x % m) + m) % m;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

/** Invers modular dengan algoritma Euclid diperluas. Mengembalikan null bila tidak ada. */
export function modInverse(a: number, m: number): number | null {
  let oldR = mod(a, m);
  let r = m;
  let oldS = 1;
  let s = 0;
  while (r !== 0) {
    const q = Math.floor(oldR / r);
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  if (oldR !== 1) return null;
  return mod(oldS, m);
}
```

## src/lib/crypto/playfair.ts

```ts
// Playfair klasik 5 x 5 dengan penggabungan J ke I (PRD 3.3 dan 5.5).
// Semua huruf direpresentasikan sebagai indeks A=0 sampai Z=25.

import { createBitset, getBit, setBit } from "../codecs/bitset";

export const PLAYFAIR_MATRIX_ALPHABET = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
const I = 8;
const J = 9;
const Q = 16;
const X = 23;

export interface PlayfairMatrix {
  /** 25 indeks huruf, disusun per baris. */
  cells: Uint8Array;
  /** Posisi (0-24) setiap huruf, -1 untuk J. */
  position: Int8Array;
}

export function buildPlayfairMatrix(keyword: Uint8Array): PlayfairMatrix {
  const cells = new Uint8Array(25);
  const position = new Int8Array(26).fill(-1);
  let n = 0;
  const push = (letter: number) => {
    const l = letter === J ? I : letter;
    if (position[l] !== -1) return;
    position[l] = n;
    cells[n++] = l;
  };
  for (const letter of keyword) push(letter);
  for (let i = 0; i < PLAYFAIR_MATRIX_ALPHABET.length; i++) push(PLAYFAIR_MATRIX_ALPHABET.charCodeAt(i) - 65);
  return { cells, position };
}

export function matrixRows(matrix: PlayfairMatrix): string[] {
  const rows: string[] = [];
  for (let r = 0; r < 5; r++) {
    rows.push(Array.from(matrix.cells.subarray(r * 5, r * 5 + 5), (c) => String.fromCharCode(c + 65)).join(" "));
  }
  return rows;
}

export interface PlayfairPrepared {
  /** Teks siap dipasangkan: J sudah digabung ke I dan huruf pengisi sudah disisipkan. */
  prepared: Uint8Array;
  /** Bitset sepanjang prepared.length, bit bernilai 1 menandai huruf pengisi. */
  fillerBits: Uint8Array;
  fillerCount: number;
  /** Bitset sepanjang teks masukan, bit bernilai 1 menandai huruf J asli. */
  jBits: Uint8Array;
  jCount: number;
}

/**
 * Langkah 3 sampai 5 PRD 5.5: catat posisi J, gabungkan J ke I, lalu bentuk
 * pasangan. Pasangan huruf sama disisipi X (atau Q bila hurufnya X). Huruf
 * terakhir tanpa pasangan juga diberi pengisi dengan aturan yang sama.
 */
export function preparePlayfair(letters: Uint8Array): PlayfairPrepared {
  const jBits = createBitset(letters.length);
  let jCount = 0;
  const merged = new Uint8Array(letters.length);
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === J) {
      setBit(jBits, i);
      jCount++;
      merged[i] = I;
    } else {
      merged[i] = letters[i]!;
    }
  }

  // Panjang maksimum terjadi bila setiap huruf membutuhkan pengisi.
  const prepared = new Uint8Array(merged.length * 2);
  const fillerFlags = new Uint8Array(merged.length * 2);
  let n = 0;
  let i = 0;
  while (i < merged.length) {
    const a = merged[i]!;
    const b = i + 1 < merged.length ? merged[i + 1]! : -1;
    if (b === -1 || a === b) {
      prepared[n] = a;
      prepared[n + 1] = a === X ? Q : X;
      fillerFlags[n + 1] = 1;
      n += 2;
      i += 1;
    } else {
      prepared[n] = a;
      prepared[n + 1] = b;
      n += 2;
      i += 2;
    }
  }
  const fillerBits = createBitset(n);
  let fillerCount = 0;
  for (let k = 0; k < n; k++) {
    if (fillerFlags[k]) {
      setBit(fillerBits, k);
      fillerCount++;
    }
  }
  return { prepared: prepared.slice(0, n), fillerBits, fillerCount, jBits, jCount };
}

function transformPairs(text: Uint8Array, matrix: PlayfairMatrix, shift: 1 | 4): Uint8Array {
  if (text.length % 2 !== 0) throw new Error("Panjang teks Playfair harus genap.");
  const { cells, position } = matrix;
  const out = new Uint8Array(text.length);
  for (let k = 0; k < text.length; k += 2) {
    const pa = position[text[k]!]!;
    const pb = position[text[k + 1]!]!;
    if (pa < 0 || pb < 0) throw new Error("Huruf J tidak ada pada matriks Playfair.");
    if (pa === pb) throw new Error("Pasangan Playfair berisi huruf yang sama.");
    const ra = Math.floor(pa / 5);
    const ca = pa % 5;
    const rb = Math.floor(pb / 5);
    const cb = pb % 5;
    if (ra === rb) {
      out[k] = cells[ra * 5 + ((ca + shift) % 5)]!;
      out[k + 1] = cells[rb * 5 + ((cb + shift) % 5)]!;
    } else if (ca === cb) {
      out[k] = cells[((ra + shift) % 5) * 5 + ca]!;
      out[k + 1] = cells[((rb + shift) % 5) * 5 + cb]!;
    } else {
      out[k] = cells[ra * 5 + cb]!;
      out[k + 1] = cells[rb * 5 + ca]!;
    }
  }
  return out;
}

/** Enkripsi teks yang sudah disiapkan: geser kanan, geser bawah, atau tukar kolom. */
export function playfairEncryptPrepared(prepared: Uint8Array, matrix: PlayfairMatrix): Uint8Array {
  return transformPairs(prepared, matrix, 1);
}

/**
 * Dekripsi mentah: geser kiri, geser atas, atau tukar kolom. Hasil masih berisi
 * huruf pengisi dan I hasil penggabungan karena tidak ada metadata pemulihan.
 */
export function playfairDecryptRaw(cipher: Uint8Array, matrix: PlayfairMatrix): Uint8Array {
  return transformPairs(cipher, matrix, 4);
}

export function playfairEncrypt(letters: Uint8Array, keyword: Uint8Array): PlayfairPrepared & { cipher: Uint8Array } {
  const matrix = buildPlayfairMatrix(keyword);
  const prep = preparePlayfair(letters);
  return { ...prep, cipher: playfairEncryptPrepared(prep.prepared, matrix) };
}

/**
 * Pemulihan paket: hapus hanya posisi yang tercatat sebagai pengisi, lalu
 * kembalikan J pada posisi yang tercatat. X atau Q asli tidak disentuh.
 */
export function playfairRestore(
  prepared: Uint8Array,
  fillerBits: Uint8Array,
  jBits: Uint8Array | null,
): Uint8Array {
  const out = new Uint8Array(prepared.length);
  let n = 0;
  for (let k = 0; k < prepared.length; k++) {
    if (!getBit(fillerBits, k)) out[n++] = prepared[k]!;
  }
  const letters = out.slice(0, n);
  if (jBits) {
    for (let i = 0; i < letters.length; i++) {
      if (getBit(jBits, i)) {
        if (letters[i] !== I) {
          throw new Error("Metadata posisi J tidak cocok dengan hasil dekripsi. Periksa kunci.");
        }
        letters[i] = J;
      }
    }
  }
  return letters;
}
```

## src/lib/crypto/super-encryption.ts

```ts
// Super Enkripsi (PRD 5.8): Extended Vigenere pada byte, kemudian transposisi
// kolom pada byte hasilnya. Dekripsi membalik dengan urutan terbalik.

import { extendedVigenereDecrypt, extendedVigenereEncrypt } from "./extended-vigenere";
import { columnarDecrypt, columnarEncrypt } from "./transposition";

export interface SuperEncryptionStages {
  /** Keluaran tahap Extended Vigenere. */
  vigenere: Uint8Array;
  /** Keluaran akhir setelah transposisi kolom. */
  cipher: Uint8Array;
}

export function superEncryptStages(plain: Uint8Array, byteKey: Uint8Array, columnKey: Uint8Array): SuperEncryptionStages {
  const vigenere = extendedVigenereEncrypt(plain, byteKey);
  return { vigenere, cipher: columnarEncrypt(vigenere, columnKey) };
}

export function superEncrypt(plain: Uint8Array, byteKey: Uint8Array, columnKey: Uint8Array): Uint8Array {
  return superEncryptStages(plain, byteKey, columnKey).cipher;
}

export function superDecrypt(cipher: Uint8Array, byteKey: Uint8Array, columnKey: Uint8Array): Uint8Array {
  const untransposed = columnarDecrypt(cipher, columnKey);
  return extendedVigenereDecrypt(untransposed, byteKey);
}
```

## src/lib/crypto/transposition.ts

```ts
// Transposisi kolom tanpa padding (PRD 5.8).
// Data ditulis per baris dengan lebar m = panjang kata kunci, kolom dibaca dari
// atas ke bawah menurut urutan huruf kunci A-Z. Huruf kunci yang sama
// diurutkan stabil dari kiri ke kanan. Sebanyak L mod m kolom paling kiri
// memiliki satu byte tambahan.

export function columnOrder(key: Uint8Array): number[] {
  if (key.length === 0) throw new Error("Kata kunci transposisi tidak boleh kosong.");
  const idx = Array.from(key, (_, i) => i);
  // Array.prototype.sort stabil sejak ES2019, ditambah pembanding indeks agar eksplisit.
  idx.sort((a, b) => key[a]! - key[b]! || a - b);
  return idx;
}

function columnLength(length: number, m: number, col: number): number {
  return Math.floor(length / m) + (col < length % m ? 1 : 0);
}

export function columnarEncrypt(data: Uint8Array, key: Uint8Array): Uint8Array {
  const m = key.length;
  const order = columnOrder(key);
  const out = new Uint8Array(data.length);
  let o = 0;
  for (const col of order) {
    for (let pos = col; pos < data.length; pos += m) out[o++] = data[pos]!;
  }
  return out;
}

export function columnarDecrypt(data: Uint8Array, key: Uint8Array): Uint8Array {
  const m = key.length;
  const order = columnOrder(key);
  const out = new Uint8Array(data.length);
  let o = 0;
  for (const col of order) {
    const len = columnLength(data.length, m, col);
    for (let row = 0; row < len; row++) out[row * m + col] = data[o++]!;
  }
  return out;
}
```

## src/lib/crypto/vigenere.ts

```ts
// Vigenere standar modulo 26 (PRD 5.2).
// C[i] = mod(P[i] + K[i mod m], 26) dan P[i] = mod(C[i] - K[i mod m], 26).

function assertKey(key: Uint8Array): void {
  if (key.length === 0) throw new Error("Kunci Vigenere tidak boleh kosong.");
}

export function vigenereEncrypt(plain: Uint8Array, key: Uint8Array): Uint8Array {
  assertKey(key);
  const out = new Uint8Array(plain.length);
  const m = key.length;
  for (let i = 0; i < plain.length; i++) out[i] = (plain[i]! + key[i % m]!) % 26;
  return out;
}

export function vigenereDecrypt(cipher: Uint8Array, key: Uint8Array): Uint8Array {
  assertKey(key);
  const out = new Uint8Array(cipher.length);
  const m = key.length;
  for (let i = 0; i < cipher.length; i++) out[i] = (cipher[i]! - key[i % m]! + 26) % 26;
  return out;
}
```

## src/lib/engine/client.ts

```ts
// Operasi cipher memanggil API Ruby. Worker hanya membantu encoding Base64.

import {
  runCall,
  type WorkerCall,
  type WorkerErrorInfo,
  type WorkerRequest,
  type WorkerResponse,
  type WorkerResults,
} from "@/workers/protocol";

export class WorkerCallError extends Error {
  readonly info: WorkerErrorInfo;

  constructor(info: WorkerErrorInfo) {
    super(info.message);
    this.name = "WorkerCallError";
    this.info = info;
  }
}

let worker: Worker | null = null;
let nextId = 1;
const pending = new Map<number, { resolve: (value: unknown) => void; reject: (err: Error) => void }>();

function getWorker(): Worker | null {
  if (typeof Worker === "undefined") return null;
  if (!worker) {
    worker = new Worker(new URL("../../workers/crypto.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const entry = pending.get(event.data.id);
      if (!entry) return;
      pending.delete(event.data.id);
      if (event.data.ok) entry.resolve(event.data.result);
      else entry.reject(new WorkerCallError(event.data.error));
    };
    worker.onerror = (event) => {
      for (const entry of pending.values()) entry.reject(new WorkerCallError({ message: event.message || "Worker gagal." }));
      pending.clear();
      worker?.terminate();
      worker = null;
    };
  }
  return worker;
}

export async function callCrypto<Op extends WorkerCall["op"]>(
  call: Extract<WorkerCall, { op: Op }>,
): Promise<WorkerResults[Op]> {
  const w = call.op === "base64" ? getWorker() : null;
  if (!w) {
    try {
      return (await runCall(call)) as WorkerResults[Op];
    } catch (err) {
      const e = err as { message?: string; field?: string; errors?: Record<string, string> };
      throw new WorkerCallError({ message: e.message ?? String(err), field: e.field, fieldErrors: e.errors });
    }
  }
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve: resolve as (value: unknown) => void, reject });
    const request: WorkerRequest = { ...call, id };
    w.postMessage(request);
  });
}
```

## src/lib/engine/decrypt.ts

```ts
// Pembacaan paket dan operasi dekripsi dijalankan oleh backend Ruby.
export { decryptViaRuby as decryptMessage, inspectViaRuby as inspectPackage } from "./http";
```

## src/lib/engine/encrypt.ts

```ts
// Seluruh operasi enkripsi dijalankan oleh backend Ruby.
export { encryptViaRuby as encryptMessage, MAX_FILE_BYTES } from "./http";
```

## src/lib/engine/http.ts

```ts
// Klien transport mesin Ruby. Browser memakai proxy Next.js; pengujian Node
// menghubungi layanan yang sama secara langsung, tanpa mesin cipher cadangan.
import { decodeBase64, encodeBase64 } from "../codecs/base64";
import type { DecryptRequest, DecryptResult, EncryptRequest, EncryptResult, PackageSummary } from "./types";
import type { KeyErrors } from "../validation/keys";

export const MAX_FILE_BYTES = 50 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 190_000;

export class RubyApiError extends Error {
  readonly field?: string;
  readonly errors?: KeyErrors;

  constructor(message: string, field?: string, fieldErrors?: KeyErrors) {
    super(message);
    this.name = "RubyApiError";
    this.field = field;
    this.errors = fieldErrors;
  }
}

function browserTransport(): boolean {
  return typeof globalThis.location !== "undefined";
}

function endpoint(operation: string): string {
  if (browserTransport()) return `/api/crypto/${operation}`;
  const base = process.env.RUBY_API_URL ?? "http://127.0.0.1:4567";
  return `${base.replace(/\/$/, "")}/api/crypto/${operation}`;
}

function multipart(metadata: object, bytes: Uint8Array, name: string, type = "application/octet-stream"): FormData {
  const data = new FormData();
  data.set("metadata", JSON.stringify(metadata));
  data.set("file", new Blob([new Uint8Array(bytes)], { type }), name);
  return data;
}

async function post<T>(operation: string, body: object | FormData): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const isMultipart = body instanceof FormData;
    const response = await fetch(endpoint(operation), {
      method: "POST",
      headers: isMultipart ? { Accept: "application/json" } : { "Content-Type": "application/json", Accept: "application/json" },
      body: isMultipart ? body : JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });
    const data: unknown = await response.json().catch(() => {
      throw new RubyApiError("Layanan Ruby mengembalikan respons yang tidak valid. Periksa layanan backend lalu coba lagi.");
    });
    if (!response.ok) {
      const error = data as { message?: unknown; field?: string; fieldErrors?: KeyErrors };
      throw new RubyApiError(
        typeof error?.message === "string" ? error.message : `Layanan Ruby gagal (HTTP ${response.status}).`,
        error?.field,
        error?.fieldErrors,
      );
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new RubyApiError("Layanan Ruby mengembalikan respons yang tidak valid.");
    }
    return data as T;
  } catch (error) {
    if (error instanceof RubyApiError) throw error;
    if (controller.signal.aborted) {
      throw new RubyApiError("Pemrosesan layanan Ruby melewati batas waktu. Coba lagi dengan data lebih kecil.");
    }
    throw new RubyApiError("Layanan Ruby tidak dapat dihubungi. Jalankan backend Ruby dan frontend dengan pnpm dev, lalu coba lagi.");
  } finally {
    clearTimeout(timeout);
  }
}

type EncryptResponse = Omit<EncryptResult, "plainBytes" | "payload" | "container"> & {
  plainBase64: string;
  payloadBase64: string;
  containerBase64: string;
};

type DecryptResponse = Omit<DecryptResult, "bytes" | "payload"> & { bytesBase64: string; payloadBase64: string };

function responseBytes(value: string): Uint8Array {
  try {
    if (typeof value !== "string") throw new Error("Field Base64 tidak ada.");
    return decodeBase64(value);
  } catch {
    throw new RubyApiError("Layanan Ruby mengembalikan data biner Base64 yang tidak valid.");
  }
}

export async function encryptViaRuby(request: EncryptRequest): Promise<EncryptResult> {
  let body: object | FormData = request;
  if (request.input.kind === "file") {
    const { bytes, ...input } = request.input;
    if (bytes.length > MAX_FILE_BYTES) {
      throw new RubyApiError(`Ukuran file ${bytes.length} byte melebihi batas implementasi ${MAX_FILE_BYTES} byte (50 MB).`, "file");
    }
    body = multipart({ ...request, input }, bytes, input.name, input.type);
  }
  const { plainBase64, payloadBase64, containerBase64, ...result } = await post<EncryptResponse>("encrypt", body);
  return { ...result, plainBytes: responseBytes(plainBase64), payload: responseBytes(payloadBase64), container: responseBytes(containerBase64) };
}

export async function decryptViaRuby(request: DecryptRequest): Promise<DecryptResult> {
  let body: object | FormData = request;
  if (request.kind === "package") {
    const { container, ...metadata } = request;
    body = browserTransport()
      ? multipart(metadata, container, "ciphertext.dat")
      : { ...metadata, containerBase64: encodeBase64(container) };
  }
  const { bytesBase64, payloadBase64, ...result } = await post<DecryptResponse>("decrypt", body);
  return { ...result, bytes: responseBytes(bytesBase64), payload: responseBytes(payloadBase64) };
}

export async function inspectViaRuby(container: Uint8Array): Promise<PackageSummary> {
  const body = browserTransport()
    ? multipart({}, container, "ciphertext.dat")
    : { containerBase64: encodeBase64(container) };
  return post<PackageSummary>("inspect", body);
}
```

## src/lib/engine/letters.ts

```ts
// Dispatch cipher untuk data indeks huruf (cipher alfabet) dan byte (cipher byte).

import { autokeyDecrypt, autokeyEncrypt } from "../crypto/autokey";
import { affineDecrypt, affineEncrypt } from "../crypto/affine";
import { extendedVigenereDecrypt, extendedVigenereEncrypt } from "../crypto/extended-vigenere";
import { hillApply, hillEncrypt } from "../crypto/hill";
import {
  buildPlayfairMatrix,
  matrixRows,
  type PlayfairPrepared,
  playfairDecryptRaw,
  playfairEncryptPrepared,
  playfairRestore,
  preparePlayfair,
} from "../crypto/playfair";
import { superDecrypt, superEncrypt } from "../crypto/super-encryption";
import { UserFacingError } from "../crypto/errors";
import { vigenereDecrypt, vigenereEncrypt } from "../crypto/vigenere";
import type { ParsedKey } from "../validation/keys";

export interface AlphaEncryptOutput {
  cipher: Uint8Array;
  playfair?: PlayfairPrepared;
  hill?: { n: number; padCount: number };
  details: string[];
}

export function encryptLetters(key: ParsedKey, letters: Uint8Array): AlphaEncryptOutput {
  switch (key.cipher) {
    case "vigenere":
      return { cipher: vigenereEncrypt(letters, key.keyword), details: [] };
    case "autokey":
      return { cipher: autokeyEncrypt(letters, key.primer), details: [] };
    case "affine":
      return { cipher: affineEncrypt(letters, key.key), details: [] };
    case "playfair": {
      const matrix = buildPlayfairMatrix(key.keyword);
      const prep = preparePlayfair(letters);
      return {
        cipher: playfairEncryptPrepared(prep.prepared, matrix),
        playfair: prep,
        details: [
          `Matriks Playfair: ${matrixRows(matrix).join(" / ")}`,
          `Huruf pengisi disisipkan: ${prep.fillerCount}. Huruf J digabung ke I: ${prep.jCount}.`,
        ],
      };
    }
    case "hill": {
      const { cipher, padCount } = hillEncrypt(letters, key.matrix);
      return {
        cipher,
        hill: { n: key.matrix.length, padCount },
        details: [`Padding X ditambahkan: ${padCount} huruf (blok ${key.matrix.length} huruf).`],
      };
    }
    default:
      throw new Error(`Cipher ${key.cipher} bukan cipher alfabet.`);
  }
}

/** Dekripsi tanpa metadata pemulihan. Playfair mempertahankan pengisi, Hill mempertahankan padding. */
export function decryptLettersRaw(key: ParsedKey, cipher: Uint8Array): Uint8Array {
  switch (key.cipher) {
    case "vigenere":
      return vigenereDecrypt(cipher, key.keyword);
    case "autokey":
      return autokeyDecrypt(cipher, key.primer);
    case "affine":
      return affineDecrypt(cipher, key.key);
    case "playfair": {
      if (cipher.length % 2 !== 0) {
        throw new UserFacingError(`Cipherteks Playfair harus berpanjang genap (saat ini ${cipher.length} huruf).`, "cipherInput");
      }
      if (cipher.includes(9)) {
        throw new UserFacingError("Cipherteks Playfair tidak boleh memuat J karena J tidak ada pada matriks 5 x 5.", "cipherInput");
      }
      for (let k = 0; k < cipher.length; k += 2) {
        if (cipher[k] === cipher[k + 1]) {
          throw new UserFacingError(`Pasangan ke-${k / 2 + 1} berisi huruf sama sehingga bukan cipherteks Playfair yang valid.`, "cipherInput");
        }
      }
      return playfairDecryptRaw(cipher, buildPlayfairMatrix(key.keyword));
    }
    case "hill": {
      const n = key.matrix.length;
      if (cipher.length % n !== 0) {
        throw new UserFacingError(`Panjang cipherteks Hill (${cipher.length}) bukan kelipatan ${n}.`, "cipherInput");
      }
      return hillApply(cipher, key.inverse);
    }
    default:
      throw new Error(`Cipher ${key.cipher} bukan cipher alfabet.`);
  }
}

export interface LetterRecoveryInfo {
  playfairBits?: { filler: Uint8Array; j: Uint8Array | null };
  hillPadCount?: number;
}

/** Dekripsi paket: pengisi Playfair dan padding Hill dibuang tepat sesuai metadata. */
export function decryptLettersPackage(key: ParsedKey, cipher: Uint8Array, info: LetterRecoveryInfo): Uint8Array {
  const raw = decryptLettersRaw(key, cipher);
  if (key.cipher === "playfair") {
    if (!info.playfairBits) throw new Error("Metadata Playfair tidak tersedia.");
    try {
      return playfairRestore(raw, info.playfairBits.filler, info.playfairBits.j);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      throw new UserFacingError(
        `Dekripsi gagal: posisi huruf J dari paket tidak cocok dengan hasil. Kemungkinan kunci salah atau data paket rusak. (Detail: ${detail})`,
        "key",
      );
    }
  }
  if (key.cipher === "hill") {
    const pad = info.hillPadCount ?? 0;
    return raw.slice(0, raw.length - pad);
  }
  return raw;
}

export function encryptBytes(key: ParsedKey, bytes: Uint8Array): Uint8Array {
  if (key.cipher === "extended-vigenere") return extendedVigenereEncrypt(bytes, key.key);
  if (key.cipher === "super") return superEncrypt(bytes, key.key, key.columnKey);
  throw new Error(`Cipher ${key.cipher} bukan cipher byte.`);
}

export function decryptBytes(key: ParsedKey, bytes: Uint8Array): Uint8Array {
  if (key.cipher === "extended-vigenere") return extendedVigenereDecrypt(bytes, key.key);
  if (key.cipher === "super") return superDecrypt(bytes, key.key, key.columnKey);
  throw new Error(`Cipher ${key.cipher} bukan cipher byte.`);
}
```

## src/lib/engine/types.ts

```ts
import type { ContainerMetadata, InputMode } from "../container/metadata";
import type { CipherId } from "../crypto/ciphers";
import type { KeyFormValues } from "../validation/keys";

export type EncryptInput =
  | { kind: "text"; text: string }
  | {
      kind: "file";
      bytes: Uint8Array;
      name: string;
      type: string;
      /** "bytes" = file utuh. "alpha-text" = isi dibaca sebagai teks alfabet (hanya cipher alfabet). */
      readAs: "bytes" | "alpha-text";
    };

export interface EncryptRequest {
  cipher: CipherId;
  key: KeyFormValues;
  input: EncryptInput;
}

export interface EncryptResult {
  cipher: CipherId;
  inputMode: InputMode;
  /** Byte isi pesan sebelum cipher: huruf hasil normalisasi (ASCII), UTF-8, atau file asli. */
  plainBytes: Uint8Array;
  /** Payload cipherteks. Untuk cipher alfabet berisi huruf A-Z dalam ASCII. */
  payload: Uint8Array;
  /** Kontainer .dat lengkap. */
  container: Uint8Array;
  metadata: ContainerMetadata;
  keyNotes: string[];
  details: string[];
}

export type DecryptRequest =
  | { kind: "package"; container: Uint8Array; key: KeyFormValues }
  | { kind: "raw-letters"; cipher: CipherId; text: string; key: KeyFormValues }
  | { kind: "payload-base64"; cipher: CipherId; base64: string; key: KeyFormValues };

export type Representation = "letters" | "utf8" | "binary";

export interface DecryptResult {
  cipher: CipherId;
  source: DecryptRequest["kind"];
  inputMode: InputMode | "raw";
  /** Cara menampilkan hasil. */
  representation: Representation;
  /** Byte hasil dekripsi: huruf ASCII, teks UTF-8, atau file. */
  bytes: Uint8Array;
  /** Payload cipherteks yang diproses. */
  payload: Uint8Array;
  /** true bila ukuran dan SHA-256 cocok dengan metadata paket. Selalu false untuk jalur mentah. */
  verified: boolean;
  sha256: string;
  expectedSha256: string | null;
  fileName: string | null;
  fileType: string | null;
  keyNotes: string[];
  details: string[];
}

export interface PackageSummary {
  algorithm: CipherId;
  inputMode: InputMode;
  codec: string;
  payloadLength: number;
  expectedLength: number;
  fileName: string | null;
  fileType: string | null;
  sourceFileName: string | null;
}
```

## src/lib/validation/keys.ts

```ts
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
```

## src/workers/crypto.worker.ts

```ts
// Web Worker untuk encoding Base64 di luar thread UI. Bila menerima operasi
// cipher, protocol tetap menghubungi Ruby melalui HTTP.

import { runCall, type WorkerRequest, type WorkerResponse } from "./protocol";

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
  postMessage: (message: WorkerResponse, transfer: Transferable[]) => void;
};

function collectBuffers(value: unknown, out: Set<ArrayBuffer>): void {
  if (value instanceof Uint8Array) {
    if (value.buffer instanceof ArrayBuffer) out.add(value.buffer);
    return;
  }
  if (value && typeof value === "object") {
    for (const v of Object.values(value)) collectBuffers(v, out);
  }
}

scope.onmessage = async (event) => {
  const { id, ...call } = event.data;
  try {
    const result = await runCall(call);
    const buffers = new Set<ArrayBuffer>();
    collectBuffers(result, buffers);
    scope.postMessage({ id, ok: true, result }, [...buffers]);
  } catch (err) {
    const error = err as { message?: string; field?: string; errors?: Record<string, string> };
    scope.postMessage(
      {
        id,
        ok: false,
        error: {
          message: error.message ?? String(err),
          field: error.field,
          fieldErrors: error.errors,
        },
      },
      [],
    );
  }
};
```

## src/workers/protocol.ts

```ts
import { encodeBase64 } from "@/lib/codecs/base64";
import { decryptMessage, inspectPackage } from "@/lib/engine/decrypt";
import { encryptMessage } from "@/lib/engine/encrypt";
import type { DecryptRequest, DecryptResult, EncryptRequest, EncryptResult, PackageSummary } from "@/lib/engine/types";
import type { KeyErrors } from "@/lib/validation/keys";

/** Cipher dan inspeksi memakai HTTP Ruby; hanya encoding Base64 dilakukan lokal. */
export async function runCall(call: WorkerCall): Promise<unknown> {
  switch (call.op) {
    case "encrypt":
      return encryptMessage(call.request);
    case "decrypt":
      return decryptMessage(call.request);
    case "inspect":
      return inspectPackage(call.container);
    case "base64":
      return encodeBase64(call.bytes);
  }
}

export type WorkerCall =
  | { op: "encrypt"; request: EncryptRequest }
  | { op: "decrypt"; request: DecryptRequest }
  | { op: "inspect"; container: Uint8Array }
  | { op: "base64"; bytes: Uint8Array };

export interface WorkerResults {
  encrypt: EncryptResult;
  decrypt: DecryptResult;
  inspect: PackageSummary;
  base64: string;
}

export type WorkerRequest = WorkerCall & { id: number };

export interface WorkerErrorInfo {
  message: string;
  field?: string;
  fieldErrors?: KeyErrors;
}

export type WorkerResponse = { id: number; ok: true; result: unknown } | { id: number; ok: false; error: WorkerErrorInfo };
```

## tests/e2e/app.spec.ts

```ts
// Pengujian alur browser (PRD 9.4). Setiap cipher wajib menjalankan satu alur
// teks dan satu alur file: enkripsi, unduh paket .dat, lalu unggah kembali pada
// konteks browser baru dan dekripsi hanya dengan paket serta kunci.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { type Browser, expect, type Page, test } from "@playwright/test";

const SHOTS = path.join("evidence", "screenshots");
mkdirSync(SHOTS, { recursive: true });

type CipherId = "vigenere" | "autokey" | "extended-vigenere" | "playfair" | "affine" | "hill" | "super" | "enigma-i";
const CIPHER_IDS_ALL: CipherId[] = ["vigenere", "autokey", "extended-vigenere", "playfair", "affine", "hill", "super", "enigma-i"];

interface KeySpec {
  keyword?: string;
  byteKey?: string;
  hex?: boolean;
  a?: string;
  b?: string;
  matrix?: string;
  columnKey?: string;
  enigma?: {
    rotors: string[];
    ringSettings: number[];
    initialPositions: string[];
    reflector: string;
    plugboard: string;
  };
}

const ENIGMA_DEFAULT: NonNullable<KeySpec["enigma"]> = {
  rotors: ["I", "II", "III"], ringSettings: [1, 1, 1], initialPositions: ["A", "A", "A"], reflector: "B", plugboard: "",
};

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

async function shot(page: Page, name: string) {
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
}

async function selectCipher(page: Page, cipher: CipherId) {
  await page.locator(`label.cipher-option:has(input[value="${cipher}"])`).click();
}

async function selectOperation(page: Page, op: "Enkripsi" | "Dekripsi") {
  await page.locator(".segmented label", { hasText: new RegExp(`^${op}$`) }).click();
}

async function fillKeys(page: Page, key: KeySpec) {
  if (key.keyword !== undefined) await page.locator("#key-keyword").fill(key.keyword);
  if (key.byteKey !== undefined) {
    await page.locator(".segmented label", { hasText: key.hex ? "Heksadesimal" : "Teks UTF-8" }).click();
    await page.locator("#key-byte").fill(key.byteKey);
  }
  if (key.columnKey !== undefined) await page.locator("#key-column").fill(key.columnKey);
  if (key.a !== undefined) await page.locator("#key-a").fill(key.a);
  if (key.b !== undefined) await page.locator("#key-b").fill(key.b);
  if (key.matrix !== undefined) await page.locator("#key-hill").fill(key.matrix);
  if (key.enigma) {
    for (let i = 0; i < 3; i++) {
      await page.locator(`#enigma-rotor-${i}`).selectOption(key.enigma.rotors[i]!);
      await page.locator(`#enigma-ring-${i}`).fill(String(key.enigma.ringSettings[i]));
      await page.locator(`#enigma-position-${i}`).fill(key.enigma.initialPositions[i]!);
    }
    await page.locator("#enigma-reflector").selectOption(key.enigma.reflector);
    await page.locator("#enigma-plugboard").fill(key.enigma.plugboard);
  }
}

async function downloadFrom(page: Page, testId: string, dir: string) {
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByTestId(testId).click()]);
  const target = path.join(dir, download.suggestedFilename());
  await download.saveAs(target);
  return { path: target, name: download.suggestedFilename() };
}

/** Membuka konteks browser baru (sesi baru tanpa state), mengunggah paket, lalu mendekripsi. */
async function decryptInNewContext(browser: Browser, packagePath: string, key: KeySpec, cipher: CipherId) {
  const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto("/");
  await selectOperation(page, "Dekripsi");
  await page.locator("#pkg-file").setInputFiles(packagePath);
  await expect(page.getByTestId("package-info")).toBeVisible();
  await expect(page.locator(`input[name=cipher][value="${cipher}"]`)).toBeChecked();
  await fillKeys(page, key);
  await page.getByTestId("run").click();
  await expect(page.getByTestId("decrypt-status")).toContainText("Pemulihan berhasil");
  return { context, page };
}

const TEXT_CASES: Array<{
  cipher: CipherId;
  message: string;
  key: KeySpec;
  letters?: string;
  payloadBase64: string;
  recovered: string;
}> = [
  { cipher: "vigenere", message: "attack at dawn", key: { keyword: "lemon" }, letters: "LXFOPVEFRNHR", payloadBase64: "TFhGT1BWRUZSTkhS", recovered: "ATTACKATDAWN" },
  { cipher: "autokey", message: "ATTACK AT DAWN", key: { keyword: "QUEENLY" }, letters: "QNXEPVYTWTWP", payloadBase64: "UU5YRVBWWVRXVFdQ", recovered: "ATTACKATDAWN" },
  { cipher: "extended-vigenere", message: "Halo", key: { byteKey: "01 02", hex: true }, payloadBase64: "SWNtcQ==", recovered: "Halo" },
  {
    cipher: "playfair",
    message: "Hide the gold in the tree stump",
    key: { keyword: "PLAYFAIREXAMPLE" },
    letters: "BMODZBXDNABEKUDMUIXMMOUVIF",
    payloadBase64: "Qk1PRFpCWEROQUJFS1VETVVJWE1NT1VWSUY=",
    recovered: "HIDETHEGOLDINTHETREESTUMP",
  },
  { cipher: "affine", message: "affine cipher", key: { a: "5", b: "8" }, letters: "IHHWVCSWFRCP", payloadBase64: "SUhIV1ZDU1dGUkNQ", recovered: "AFFINECIPHER" },
  { cipher: "hill", message: "act", key: { matrix: "6 24 1\n13 16 10\n20 17 15" }, letters: "POH", payloadBase64: "UE9I", recovered: "ACT" },
  { cipher: "super", message: "ABCDEFG", key: { byteKey: "01 02", hex: true, columnKey: "BABA" }, payloadBase64: "REhGQkZESA==", recovered: "ABCDEFG" },
  { cipher: "enigma-i", message: "Hello, world! 2026", key: { enigma: ENIGMA_DEFAULT }, letters: "ILBDAAMTAZ", payloadBase64: "SUxCREFBTVRBWg==", recovered: "HELLOWORLD" },
];

const FILE_CASES: Array<{ cipher: CipherId; fixture: string; key: KeySpec }> = [
  { cipher: "vigenere", fixture: "teks-contoh.txt", key: { keyword: "KRIPTOGRAFI" } },
  { cipher: "autokey", fixture: "gambar-contoh.png", key: { keyword: "UTSKRIPTO" } },
  { cipher: "extended-vigenere", fixture: "database-contoh.sqlite", key: { byteKey: "Kunci Byte 2026!" } },
  { cipher: "playfair", fixture: "audio-contoh.wav", key: { keyword: "MONARCHY" } },
  { cipher: "affine", fixture: "video-contoh.webm", key: { a: "7", b: "10" } },
  { cipher: "hill", fixture: "gambar-contoh.png", key: { matrix: "3 3\n2 5" } },
  { cipher: "super", fixture: "video-contoh.webm", key: { byteKey: "SuperKunci", columnKey: "TRANSPOSISI" } },
  { cipher: "enigma-i", fixture: "gambar-contoh.png", key: { enigma: { rotors: ["V", "III", "IV"], ringSettings: [7, 12, 24], initialPositions: ["Q", "E", "Z"], reflector: "C", plugboard: "AB CD EF GH IJ KL" } } },
];

test("tampilan utama", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Kriptografi" })).toBeVisible();
  // Favicon berasal dari src/app/icon.svg, yaitu logo titik tanpa tulisan.
  const icon = page.locator('link[rel="icon"][type="image/svg+xml"]');
  await expect(icon).toHaveCount(1);
  const iconResponse = await page.request.get((await icon.getAttribute("href"))!);
  expect(iconResponse.status()).toBe(200);
  expect(await iconResponse.text()).toContain("<circle");
  await shot(page, "01-tampilan-utama");
});

test("Enigma memakai konfigurasi awal yang sama, reset, dan menolak plugboard berulang", async ({ page }) => {
  await page.goto("/");
  await selectCipher(page, "enigma-i");
  await page.locator("#message").fill("A A A A A! 123");
  await fillKeys(page, { enigma: ENIGMA_DEFAULT });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-cipher-letters")).toHaveText("BDZGO");
  for (let i = 0; i < 3; i++) await expect(page.locator(`#enigma-position-${i}`)).toHaveValue("A");
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-cipher-letters")).toHaveText("BDZGO");
  await page.locator("#enigma-position-0").fill("Z");
  await page.getByTestId("use-for-decrypt").click();
  await expect(page.getByTestId("package-info")).toBeVisible();
  await expect(page.locator("#enigma-position-0")).toHaveValue("A");
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-decrypted")).toHaveText("AAAAA");
  await selectOperation(page, "Enkripsi");
  await page.locator("#enigma-plugboard").fill("AB AC");
  await page.getByTestId("run").click();
  await expect(page.getByRole("alert").filter({ hasText: /plugboard|huruf|pasangan/i }).first()).toBeVisible();
  await shot(page, "validasi-enigma-plugboard");
  await page.getByRole("button", { name: "Reset konfigurasi Enigma" }).click();
  await expect(page.locator("#enigma-plugboard")).toHaveValue("");
  await expect(page.locator("#enigma-rotor-0")).toHaveValue("I");
});

test("kegagalan backend menghasilkan kesalahan tanpa hasil cipher pengganti", async ({ page }) => {
  await page.goto("/");
  await page.locator("#message").fill("ATTACKATDAWN");
  await fillKeys(page, { keyword: "LEMON" });
  await page.route("**/api/crypto/encrypt", (route) => route.abort("failed"));
  await page.getByTestId("run").click();
  await expect(page.getByTestId("run-error")).toBeVisible();
  await expect(page.getByTestId("encrypt-result")).toHaveCount(0);
});

test("ikon info Super Enkripsi menampilkan keterangan tanpa memilih cipher", async ({ page }) => {
  await page.goto("/");
  const text = "Gabungan Extended Vigenere Cipher dan cipher transposisi (metode kolom)";
  const tip = page.locator("#cipher-info-super");
  await expect(tip).toBeHidden();
  await page.getByTestId("info-super").hover();
  await expect(tip).toBeVisible();
  await expect(tip).toHaveText(text);
  await shot(page, "info-super-enkripsi");
  await page.getByTestId("info-super").click();
  await expect(page.locator('input[name=cipher][value="vigenere"]')).toBeChecked();
  await expect(page.locator('input[name=cipher][value="super"]')).toHaveAccessibleDescription(text);
});

test("tema terang dan gelap dapat dipilih dan tersimpan setelah muat ulang", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(page.getByTestId("theme-toggle")).toHaveAccessibleName("Mode terang");

  await page.getByTestId("theme-toggle").click();
  await expect(html).toHaveAttribute("data-theme", "light");
  await expect(page.getByTestId("theme-toggle")).toHaveAccessibleName("Mode gelap");
  const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(lightBg).toBe("rgb(238, 241, 245)");
  await shot(page, "02-tema-terang");

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.locator("#message").fill("attack at dawn");
  await fillKeys(page, { keyword: "LEMON" });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-cipher-letters")).toHaveText("LXFOPVEFRNHR");
  await shot(page, "03-tema-terang-hasil");

  await page.getByTestId("theme-toggle").click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(darkBg).toBe("rgb(10, 15, 21)");
});

for (const tc of TEXT_CASES) {
  test(`alur teks ${tc.cipher}: enkripsi, unduh, dekripsi di konteks baru`, async ({ page, browser }, testInfo) => {
    await page.goto("/");
    await selectCipher(page, tc.cipher);
    await page.locator("#message").fill(tc.message);
    await fillKeys(page, tc.key);
    await page.getByTestId("run").click();
    await expect(page.getByTestId("encrypt-result")).toBeVisible();
    if (tc.letters) await expect(page.getByTestId("out-cipher-letters")).toHaveText(tc.letters);
    await expect(page.getByTestId("out-payload-base64")).toHaveText(tc.payloadBase64);
    await shot(page, `teks-${tc.cipher}-enkripsi`);

    const pkg = await downloadFrom(page, "download-package", testInfo.outputDir);
    expect(pkg.name).toBe(`cipherteks-${tc.cipher}.dat`);
    const bytes = readFileSync(pkg.path);
    expect(bytes.subarray(0, 8).toString("latin1")).toBe("UTSKRIPT");

    const { context, page: fresh } = await decryptInNewContext(browser, pkg.path, tc.key, tc.cipher);
    await expect(fresh.getByTestId("out-decrypted")).toHaveText(tc.recovered);
    await shot(fresh, `teks-${tc.cipher}-dekripsi`);
    await context.close();
  });
}

for (const fc of FILE_CASES) {
  test(`alur file ${fc.cipher}: ${fc.fixture} pulih identik pada konteks baru`, async ({ page, browser }, testInfo) => {
    const original = readFileSync(path.join("fixtures", fc.fixture));
    await page.goto("/");
    await selectCipher(page, fc.cipher);
    await page.locator(".segmented label", { hasText: /^File$/ }).click();
    await page.locator("#enc-file").setInputFiles(path.join("fixtures", fc.fixture));
    await fillKeys(page, fc.key);
    await page.getByTestId("run").click();
    await expect(page.getByTestId("encrypt-result")).toBeVisible();
    await expect(page.getByTestId("file-facts")).toContainText(fc.fixture);
    await shot(page, `file-${fc.cipher}-enkripsi`);

    const pkg = await downloadFrom(page, "download-package", testInfo.outputDir);
    expect(pkg.name).toBe(`${fc.fixture}.dat`);

    const { context, page: fresh } = await decryptInNewContext(browser, pkg.path, fc.key, fc.cipher);
    await expect(fresh.getByTestId("file-facts")).toContainText(fc.fixture);
    await shot(fresh, `file-${fc.cipher}-dekripsi`);
    const restoredDir = path.join(testInfo.outputDir, "pulih");
    mkdirSync(restoredDir, { recursive: true });
    const restored = await downloadFrom(fresh, "download-decrypted", restoredDir);
    expect(restored.name).toBe(fc.fixture);
    const restoredBytes = readFileSync(restored.path);
    expect(restoredBytes.length).toBe(original.length);
    expect(sha256(restoredBytes)).toBe(sha256(original));
    expect(restoredBytes.equals(original)).toBe(true);
    await expect(fresh.getByTestId("decrypted-sha256")).toHaveText(sha256(original));

    if (fc.fixture.endsWith(".webm")) {
      // File video hasil pemulihan dapat dimuat oleh elemen video browser.
      const size = await fresh.evaluate(async (b64) => {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        const video = document.createElement("video");
        video.src = URL.createObjectURL(new Blob([arr], { type: "video/webm" }));
        await new Promise((resolve, reject) => {
          video.onloadeddata = resolve;
          video.onerror = () => reject(new Error("video gagal dimuat"));
        });
        return `${video.videoWidth}x${video.videoHeight}`;
      }, restoredBytes.toString("base64"));
      expect(size).toBe("160x120");
    }
    await context.close();
  });
}

test("nama file keluaran dapat diubah tanpa mengubah ekstensi", async ({ page, browser }, testInfo) => {
  await page.goto("/");
  await selectCipher(page, "extended-vigenere");
  await page.locator(".segmented label", { hasText: /^File$/ }).click();
  await page.locator("#enc-file").setInputFiles(path.join("fixtures", "gambar-contoh.png"));
  await fillKeys(page, { byteKey: "kunci" });
  await page.getByTestId("run").click();
  const pkg = await downloadFrom(page, "download-package", testInfo.outputDir);
  // Kolom paket .dat tidak boleh mewarisi file dari kolom file enkripsi.
  await page.getByTestId("use-for-decrypt").click();
  await expect(page.getByTestId("package-info")).toBeVisible();
  expect(await page.locator("#pkg-file").evaluate((el: HTMLInputElement) => el.files?.length ?? 0)).toBe(0);
  await selectOperation(page, "Enkripsi");
  await expect(page.getByTestId("encrypt-result")).toBeVisible();
  await expect(page.getByTestId("stale-warning")).toHaveCount(0);
  const { context, page: fresh } = await decryptInNewContext(browser, pkg.path, { byteKey: "kunci" }, "extended-vigenere");
  await fresh.locator("#out-name").fill("foto-pulih");
  const restored = await downloadFrom(fresh, "download-decrypted", testInfo.outputDir);
  expect(restored.name).toBe("foto-pulih.png");
  await context.close();
});

test("validasi kunci tidak valid ditampilkan pada kolomnya", async ({ page }) => {
  await page.goto("/");
  await selectCipher(page, "affine");
  await page.locator("#message").fill("pesan rahasia");
  await fillKeys(page, { a: "2", b: "3" });
  await page.getByTestId("run").click();
  await expect(page.locator("#key-a-error")).toContainText("tidak relatif prima terhadap 26");
  await expect(page.getByTestId("encrypt-result")).toHaveCount(0);
  await shot(page, "validasi-affine");

  await selectCipher(page, "hill");
  await fillKeys(page, { matrix: "2 4\n1 2" });
  await page.getByTestId("run").click();
  await expect(page.locator("#key-hill-error")).toContainText("tidak relatif prima terhadap 26");
  await shot(page, "validasi-hill");

  await selectCipher(page, "vigenere");
  await fillKeys(page, { keyword: "123 !!" });
  await page.getByTestId("run").click();
  await expect(page.locator("#key-keyword-error")).toContainText("kosong setelah normalisasi");
});

test("kunci salah pada paket tidak dinyatakan berhasil", async ({ page, browser }, testInfo) => {
  await page.goto("/");
  await page.locator("#message").fill("attack at dawn");
  await fillKeys(page, { keyword: "LEMON" });
  await page.getByTestId("run").click();
  const pkg = await downloadFrom(page, "download-package", testInfo.outputDir);
  const context = await browser.newContext();
  const fresh = await context.newPage();
  await fresh.goto("/");
  await selectOperation(fresh, "Dekripsi");
  await fresh.locator("#pkg-file").setInputFiles(pkg.path);
  await fillKeys(fresh, { keyword: "LIME" });
  await fresh.getByTestId("run").click();
  await expect(fresh.getByTestId("run-error")).toContainText("Checksum SHA-256");
  await expect(fresh.getByTestId("decrypt-result")).toHaveCount(0);
  await shot(fresh, "validasi-kunci-salah");
  await context.close();
});

test("Base64 disalin tanpa perubahan dan paket Base64 dapat ditempel di sesi baru", async ({ browser }) => {
  const context = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
  const page = await context.newPage();
  await page.goto("/");
  await selectCipher(page, "super");
  await page.locator("#message").fill("Data rahasia 2026 + / = ✓");
  await fillKeys(page, { byteKey: "Kunci+/=", columnKey: "ZEBRA" });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("encrypt-result")).toBeVisible();

  await page.getByTestId("copy-payload-base64").click();
  await expect(page.getByTestId("copy-payload-base64")).toHaveText("Tersalin");
  const payloadB64 = await page.evaluate(() => navigator.clipboard.readText());
  expect(payloadB64).toBe(await page.getByTestId("out-payload-base64").innerText());
  expect(payloadB64).toMatch(/^[A-Za-z0-9+/]+=*$/);

  await page.getByTestId("copy-package-base64").click();
  await expect(page.getByTestId("copy-package-base64")).toHaveText("Tersalin");
  const packageB64 = await page.evaluate(() => navigator.clipboard.readText());
  const packageBytes = Buffer.from(packageB64, "base64");
  expect(packageBytes.subarray(0, 8).toString("latin1")).toBe("UTSKRIPT");
  // Payload di akhir paket sama dengan Base64 payload yang disalin.
  expect(packageBytes.subarray(packageBytes.length - Buffer.from(payloadB64, "base64").length).toString("base64")).toBe(payloadB64);

  const other = await browser.newContext();
  const fresh = await other.newPage();
  await fresh.goto("/");
  await selectOperation(fresh, "Dekripsi");
  await fresh.locator("#dec-source").selectOption("package-base64");
  await fresh.locator("#pkg-text").fill(packageB64);
  await expect(fresh.getByTestId("package-info")).toContainText("Super Enkripsi");
  await fillKeys(fresh, { byteKey: "Kunci+/=", columnKey: "ZEBRA" });
  await fresh.getByTestId("run").click();
  await expect(fresh.getByTestId("out-decrypted")).toHaveText("Data rahasia 2026 + / = ✓");

  // Jalur Base64 payload mentah juga menerima karakter +, /, dan =.
  await fresh.locator("#dec-source").selectOption("payload-base64");
  await fresh.locator("#cipher-input").fill(payloadB64);
  await selectCipher(fresh, "super");
  await fresh.getByTestId("run").click();
  await expect(fresh.getByTestId("decrypt-status")).toContainText("Dekripsi mentah");
  await expect(fresh.getByTestId("out-decrypted")).toHaveText("Data rahasia 2026 + / = ✓");
  await shot(fresh, "dekripsi-base64-payload");
  await other.close();
  await context.close();
});

test("setiap format paket hanya memakai paketnya sendiri", async ({ page }) => {
  await page.goto("/");
  await page.locator("#message").fill("attack at dawn");
  await fillKeys(page, { keyword: "LEMON" });
  await page.getByTestId("run").click();
  await page.getByTestId("use-for-decrypt").click();
  await expect(page.getByTestId("package-info")).toBeVisible();
  // Berpindah ke dekripsi bukan perubahan masukan: tidak ada peringatan hasil lama.
  await expect(page.getByTestId("stale-warning")).toHaveCount(0);
  // Paket Base64 masih kosong: paket dari sumber file tidak boleh dipakai.
  await page.locator("#dec-source").selectOption("package-base64");
  await expect(page.getByTestId("package-info")).toHaveCount(0);
  await page.getByTestId("run").click();
  await expect(page.locator("#pkg-error")).toContainText("Tempel paket Base64");
  await expect(page.getByTestId("decrypt-result")).toHaveCount(0);
  // Kembali ke sumber file: paket yang dimuat sebelumnya tersedia lagi.
  await page.locator("#dec-source").selectOption("package-file");
  await expect(page.getByTestId("package-info")).toContainText("Hasil enkripsi terakhir");
});

test("cipherteks huruf mentah Playfair mempertahankan pengisi", async ({ page }) => {
  await page.goto("/");
  await selectCipher(page, "playfair");
  await selectOperation(page, "Dekripsi");
  await page.locator("#dec-source").selectOption("raw-letters");
  await page.locator("#cipher-input").fill("BMODZBXDNABEKUDMUIXMMOUVIF");
  await fillKeys(page, { keyword: "PLAYFAIREXAMPLE" });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-decrypted")).toHaveText("HIDETHEGOLDINTHETREXESTUMP");
  await shot(page, "dekripsi-mentah-playfair");
});

test("hasil lama ditandai ketika masukan berubah", async ({ page }) => {
  await page.goto("/");
  await page.locator("#message").fill("attack at dawn");
  await fillKeys(page, { keyword: "LEMON" });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("encrypt-result")).toBeVisible();
  await expect(page.getByTestId("stale-warning")).toHaveCount(0);
  await page.locator("#key-keyword").fill("LEMONADE");
  await expect(page.getByTestId("stale-warning")).toBeVisible();
  await shot(page, "hasil-lama-ditandai");
  await page.getByTestId("run").click();
  await expect(page.getByTestId("stale-warning")).toHaveCount(0);
});

test("video hasil pemulihan pada evidence/samples dapat dimuat browser", async ({ page }) => {
  const videos = CIPHER_IDS_ALL.map((c) => path.join("evidence", "samples", c, "pulih-video-contoh.webm")).filter((p) => existsSync(p));
  test.skip(videos.length === 0, "Jalankan pnpm evidence terlebih dahulu.");
  await page.goto("/");
  for (const file of videos) {
    const size = await page.evaluate(async (b64) => {
      const bin = atob(b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      const video = document.createElement("video");
      video.src = URL.createObjectURL(new Blob([arr], { type: "video/webm" }));
      await new Promise((resolve, reject) => {
        video.onloadeddata = resolve;
        video.onerror = () => reject(new Error("video gagal dimuat"));
      });
      return `${video.videoWidth}x${video.videoHeight}`;
    }, readFileSync(file).toString("base64"));
    expect(size, file).toBe("160x120");
  }
  expect(videos.length).toBe(8);
});

test("layout layar sempit tanpa gulir horizontal", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto("/");
  await selectCipher(page, "hill");
  await page.locator("#message").fill("Serang pukul 10.30! Kirim bantuan ke gerbang timur secepatnya.");
  await fillKeys(page, { matrix: "6 24 1\n13 16 10\n20 17 15" });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("encrypt-result")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await shot(page, "layar-sempit");
  await selectCipher(page, "enigma-i");
  await page.locator("#message").fill("HELLOWORLD");
  await fillKeys(page, { enigma: ENIGMA_DEFAULT });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-cipher-letters")).toHaveText("ILBDAAMTAZ");
  const enigmaOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(enigmaOverflow).toBeLessThanOrEqual(0);
  await shot(page, "layar-sempit-enigma");
  await context.close();
});
```

## tests/evidence/scenarios.test.ts

```ts
// Skenario bukti untuk laporan (PRD 9.3 dan 10). Menjalankan 8 cipher x 5
// fixture pada mode file utuh, ditambah satu contoh teks per cipher. Semua
// nilai pada berkas bukti berasal dari eksekusi ini. Checksum dan perbandingan
// byte dihitung dengan node:crypto dan Buffer, bukan dengan kode produksi.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { parseContainer } from "@/lib/container/format";
import { CIPHER_IDS, CIPHERS, type CipherId, isAlphaCipher } from "@/lib/crypto/ciphers";
import { decryptMessage } from "@/lib/engine/decrypt";
import { encryptMessage } from "@/lib/engine/encrypt";
import type { KeyFormValues } from "@/lib/validation/keys";
import { keys, TEST_KEYS } from "../unit/helpers";

const EVIDENCE = "evidence";
const SAMPLES = path.join(EVIDENCE, "samples");
const FIXTURES = [
  { file: "teks-contoh.txt", type: "text/plain", kind: "Teks" },
  { file: "gambar-contoh.png", type: "image/png", kind: "Gambar" },
  { file: "database-contoh.sqlite", type: "application/vnd.sqlite3", kind: "Database" },
  { file: "audio-contoh.wav", type: "audio/wav", kind: "Audio" },
  { file: "video-contoh.webm", type: "video/webm", kind: "Video" },
];

const sha256 = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");

function keyParams(cipher: CipherId, k: KeyFormValues): Record<string, string> {
  switch (cipher) {
    case "vigenere":
    case "playfair":
      return { kataKunci: k.keyword };
    case "autokey":
      return { primer: k.keyword };
    case "extended-vigenere":
      return { kunciByte: k.byteKey, formatKunci: k.byteKeyFormat };
    case "affine":
      return { a: k.affineA, b: k.affineB };
    case "hill":
      return { matriks: k.hillMatrix.replace(/\n/g, "; ") };
    case "super":
      return { kunciByte: k.byteKey, formatKunci: k.byteKeyFormat, kunciKolom: k.columnKey };
    case "enigma-i":
      return {
        rotors: (k.rotors ?? ["I", "II", "III"]).join(" "),
        ringSettings: (k.ringSettings ?? [1, 1, 1]).join(" "),
        initialPositions: (k.initialPositions ?? ["A", "A", "A"]).join(""),
        reflector: k.reflector ?? "B",
        plugboard: k.plugboard ?? "",
      };
  }
}

interface FileScenario {
  no: number;
  algorithm: CipherId;
  algorithmName: string;
  mode: "file";
  codec: string;
  parameters: Record<string, string>;
  fileKind: string;
  fixture: string;
  originalSize: number;
  containerSize: number;
  payloadSize: number;
  decryptedSize: number;
  originalSha256: string;
  decryptedSha256: string;
  containerSha256: string;
  byteIdentical: boolean;
  headerChanged: boolean;
  encryptedFile: string;
  decryptedFile: string;
  result: "LULUS" | "GAGAL";
}

const scenarios: FileScenario[] = [];
const textExamples: Array<Record<string, unknown>> = [];

const resolvedSamples = path.resolve(SAMPLES);
const workspace = path.resolve(".");
if (!resolvedSamples.startsWith(`${workspace}${path.sep}`) || path.dirname(resolvedSamples) !== path.resolve(EVIDENCE)) {
  throw new Error("Skenario bukti hanya boleh mengganti evidence/samples di dalam repositori.");
}
rmSync(resolvedSamples, { recursive: true, force: true });
mkdirSync(SAMPLES, { recursive: true });

describe("40 skenario file Ruby (8 cipher x 5 jenis file)", () => {
  for (const cipher of CIPHER_IDS) {
    for (const fx of FIXTURES) {
      it(`${cipher} - ${fx.file}`, async () => {
        const health = await fetch(`${process.env.RUBY_API_URL ?? "http://127.0.0.1:4567"}/health`);
        expect(health.ok).toBe(true);
        const original = new Uint8Array(readFileSync(path.join("fixtures", fx.file)));
        const key = TEST_KEYS[cipher];
        const enc = await encryptMessage({
          cipher,
          key,
          input: { kind: "file", bytes: original, name: fx.file, type: fx.type, readAs: "bytes" },
        });
        const dir = path.join(SAMPLES, cipher);
        mkdirSync(dir, { recursive: true });
        const encryptedFile = path.join(dir, `${fx.file}.dat`);
        writeFileSync(encryptedFile, enc.container);

        // Sesi baru: paket dibaca kembali dari disk, kunci dibuat ulang dari nilai tercatat.
        const fromDisk = new Uint8Array(readFileSync(encryptedFile));
        const dec = await decryptMessage({ kind: "package", container: fromDisk, key: JSON.parse(JSON.stringify(key)) });
        const decryptedFile = path.join(dir, `pulih-${dec.fileName}`);
        writeFileSync(decryptedFile, dec.bytes);
        const restored = readFileSync(decryptedFile);

        const payload = parseContainer(fromDisk).payload;
        const identical = Buffer.from(restored).equals(Buffer.from(original));
        // Header file asal (16 byte pertama) tidak muncul apa adanya di dalam payload.
        const header = Buffer.from(original.subarray(0, 16));
        const headerChanged = Buffer.from(payload).indexOf(header) === -1;
        scenarios.push({
          no: scenarios.length + 1,
          algorithm: cipher,
          algorithmName: CIPHERS[cipher].name,
          mode: "file",
          codec: enc.metadata.codec,
          parameters: keyParams(cipher, key),
          fileKind: fx.kind,
          fixture: fx.file,
          originalSize: original.length,
          containerSize: fromDisk.length,
          payloadSize: payload.length,
          decryptedSize: restored.length,
          originalSha256: sha256(original),
          decryptedSha256: sha256(restored),
          containerSha256: sha256(fromDisk),
          byteIdentical: identical,
          headerChanged,
          encryptedFile: encryptedFile.replace(/\\/g, "/"),
          decryptedFile: decryptedFile.replace(/\\/g, "/"),
          result: identical && dec.verified && headerChanged ? "LULUS" : "GAGAL",
        });
        expect(identical).toBe(true);
        expect(headerChanged).toBe(true);
        expect(dec.fileName).toBe(fx.file);
      });
    }
  }
});

const TEXT_SAMPLES: Array<{ cipher: CipherId; message: string; key: KeyFormValues }> = [
  { cipher: "vigenere", message: "Serang pukul 10.30!", key: keys({ keyword: "KRIPTO" }) },
  { cipher: "autokey", message: "Ujian tengah semester kriptografi", key: keys({ keyword: "UTS" }) },
  { cipher: "extended-vigenere", message: "Halo, Dunia! Byte 0-255 ✓", key: keys({ byteKey: "kunci" }) },
  { cipher: "playfair", message: "Jangan lewatkan pesan XX ini", key: keys({ keyword: "MONARCHY" }) },
  { cipher: "affine", message: "Affine cipher", key: keys({ affineA: "5", affineB: "8" }) },
  { cipher: "hill", message: "Kriptografi klasik", key: keys({ hillMatrix: "6 24 1\n13 16 10\n20 17 15" }) },
  { cipher: "super", message: "Super enkripsi pada byte", key: keys({ byteKey: "SuperKunci", columnKey: "TRANSPOSISI" }) },
  { cipher: "enigma-i", message: "HELLOWORLD", key: TEST_KEYS["enigma-i"] },
];

describe("contoh teks per cipher", () => {
  for (const sample of TEXT_SAMPLES) {
    it(sample.cipher, async () => {
      const enc = await encryptMessage({ cipher: sample.cipher, key: sample.key, input: { kind: "text", text: sample.message } });
      const dir = path.join(SAMPLES, "teks");
      mkdirSync(dir, { recursive: true });
      const file = path.join(dir, `${sample.cipher}.dat`);
      writeFileSync(file, enc.container);
      const dec = await decryptMessage({ kind: "package", container: new Uint8Array(readFileSync(file)), key: sample.key });
      const alpha = isAlphaCipher(sample.cipher);
      const plain = Buffer.from(enc.plainBytes).toString("utf8");
      const recovered = Buffer.from(dec.bytes).toString("utf8");
      textExamples.push({
        algorithm: sample.cipher,
        algorithmName: CIPHERS[sample.cipher].name,
        message: sample.message,
        parameters: keyParams(sample.cipher, sample.key),
        processedPlaintext: plain,
        plaintextBase64: Buffer.from(enc.plainBytes).toString("base64"),
        ciphertextLetters: alpha ? Buffer.from(enc.payload).toString("latin1") : null,
        ciphertextBase64: Buffer.from(enc.payload).toString("base64"),
        packageFile: file.replace(/\\/g, "/"),
        packageSize: enc.container.length,
        packageBase64: Buffer.from(enc.container).toString("base64"),
        recoveryMetadata: {
          playfair: enc.metadata.playfair ?? null,
          hill: enc.metadata.hill ?? null,
        },
        decrypted: recovered,
        checksumVerified: dec.verified,
        result: recovered === plain && dec.verified ? "LULUS" : "GAGAL",
      });
      expect(recovered).toBe(plain);
      if (sample.cipher === "enigma-i") expect(Buffer.from(enc.payload).toString("ascii")).toBe("ILBDAAMTAZ");
    });
  }
});

afterAll(() => {
  const generatedAt = new Date().toISOString();
  const summary = CIPHER_IDS.map((cipher) => {
    const rows = scenarios.filter((s) => s.algorithm === cipher);
    return {
      algorithm: cipher,
      algorithmName: CIPHERS[cipher].name,
      fileScenarios: rows.length,
      passed: rows.filter((s) => s.result === "LULUS").length,
      textExample: textExamples.find((t) => t.algorithm === cipher)?.result ?? "TIDAK DIJALANKAN",
    };
  });
  writeFileSync(
    path.join(EVIDENCE, "file-scenarios.json"),
    `${JSON.stringify({ generatedAt, command: "pnpm evidence", engine: "Ruby via HTTP", node: process.version, summary, scenarios }, null, 2)}\n`,
  );
  writeFileSync(
    path.join(EVIDENCE, "text-examples.json"),
    `${JSON.stringify({ generatedAt, command: "pnpm evidence", engine: "Ruby via HTTP", examples: textExamples }, null, 2)}\n`,
  );
  const lines = [
    "# Hasil skenario file",
    "",
    `Dihasilkan oleh \`pnpm evidence\` pada ${generatedAt} dengan Node.js ${process.version}. Data lengkap ada di \`file-scenarios.json\`.`,
    "",
    "| No | Algoritma | Jenis | Fixture | Ukuran asal | Ukuran paket | Ukuran pulih | SHA-256 asal (12 digit awal) | Identik | Hasil |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...scenarios.map(
      (s) =>
        `| ${s.no} | ${s.algorithmName} | ${s.fileKind} | ${s.fixture} | ${s.originalSize} | ${s.containerSize} | ${s.decryptedSize} | ${s.originalSha256.slice(0, 12)} | ${s.byteIdentical ? "Ya" : "Tidak"} | ${s.result} |`,
    ),
    "",
  ];
  writeFileSync(path.join(EVIDENCE, "file-scenarios.md"), lines.join("\n"));
});
```

## tests/migration/README.md

```md
# Acuan kompatibilitas sebelum migrasi

`legacy-typescript-v1.json` dibekukan dari implementasi TypeScript sebelum penggantian engine oleh Ruby. Berkas memuat 14 paket aktual, yaitu tujuh cipher masing-masing pada mode teks dan file utuh. Waktu pengambilan ada pada `capturedAt`.

Teks memuat J, pasangan berulang Playfair, X dan Q asli, padding Hill, tanda baca, angka, dan Unicode. File memuat seluruh nilai byte 0 sampai 255 dengan nama `semua-byte.bin`. Kunci adalah data contoh untuk pengujian.

`tests/unit/migration-compatibility.test.ts` memeriksa dekripsi paket lama melalui backend Ruby dan membandingkan payload enkripsi baru dengan nilai tetap. Berkas acuan tidak boleh dihasilkan ulang dengan mesin Ruby yang sedang diuji.
```

## tests/migration/legacy-typescript-v1.json

```json
{
  "capturedAt": "2026-10-01T07:07:07.743Z",
  "source": "Original TypeScript implementation, before Ruby engine migration",
  "cases": [
    {
      "cipher": "vigenere",
      "mode": "text",
      "key": {
        "keyword": "KRIPTOGRAFI",
        "byteKey": "",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "",
        "columnKey": ""
      },
      "input": {
        "text": "JIG BALLOON XQX XX ACTX, 2026! é✓"
      },
      "packageBase64": "VVRTS1JJUFQBAAAA9nsiYWxnb3JpdGhtIjoidmlnZW5lcmUiLCJpbnB1dE1vZGUiOiJ0ZXh0IiwiY29kZWMiOiJhbHBoYS10ZXh0LXYxIiwicGF5bG9hZEVuY29kaW5nIjoiYXNjaWktbGV0dGVycyIsInBheWxvYWRMZW5ndGgiOjE5LCJleHBlY3RlZExlbmd0aCI6MTksImNoZWNrc3VtQWxnb3JpdGhtIjoiU0hBLTI1NiIsInNoYTI1NiI6IjQ5NmU3ZTM5OWNmZWYwODc0MjUxMWZkYzBkOTcxYjFhMWIwMjI3ZjJlZGU5NDdmOTVmMjYyN2JlYTIwOWI1ODUifVRaT1FUWlJGT1NGQU9GTVRRWk8=",
      "payloadBase64": "VFpPUVRaUkZPU0ZBT0ZNVFFaTw==",
      "plainBase64": "SklHQkFMTE9PTlhRWFhYQUNUWA==",
      "sha256": "496e7e399cfef08742511fdc0d971b1a1b0227f2ede947f95f2627bea209b585",
      "metadata": {
        "algorithm": "vigenere",
        "inputMode": "text",
        "codec": "alpha-text-v1",
        "payloadEncoding": "ascii-letters",
        "payloadLength": 19,
        "expectedLength": 19,
        "checksumAlgorithm": "SHA-256",
        "sha256": "496e7e399cfef08742511fdc0d971b1a1b0227f2ede947f95f2627bea209b585"
      }
    },
    {
      "cipher": "vigenere",
      "mode": "file",
      "key": {
        "keyword": "KRIPTOGRAFI",
        "byteKey": "",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "",
        "columnKey": ""
      },
      "input": {
        "bytesBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
        "name": "semua-byte.bin",
        "type": "application/octet-stream"
      },
      "packageBase64": "VVRTS1JJUFQBAAABOHsiYWxnb3JpdGhtIjoidmlnZW5lcmUiLCJpbnB1dE1vZGUiOiJmaWxlIiwiY29kZWMiOiJhbHBoYTI1LXYxIiwicGF5bG9hZEVuY29kaW5nIjoiYXNjaWktbGV0dGVycyIsInBheWxvYWRMZW5ndGgiOjUxMiwiZXhwZWN0ZWRMZW5ndGgiOjI1NiwiY2hlY2tzdW1BbGdvcml0aG0iOiJTSEEtMjU2Iiwic2hhMjU2IjoiNDBhZmYyZTlkMmQ4OTIyZTQ3YWZkNDY0OGU2OTY3NDk3MTU4Nzg1ZmJkMWRhODcwZTcxMTAyNjZiZjk0NDg4MCIsImZpbGUiOnsibmFtZSI6InNlbXVhLWJ5dGUuYmluIiwidHlwZSI6ImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSJ9fUtSSVFUUUdVQUpJUFJPUEFPT1JLRlRLRElDVENHR0FWSUJSQVBNT0FSVkZFS09JTlROSFJCR0pNU0xRWFBMU0dHUExaSlpVWkhEQlNKWVNYUUpQWFNTR0JMTEpLVUtIT0JESkpUSVJVUUlUREhNTVdLVlZWSVpDUEtWVFVSR1FVVFBIWU1JS0hWSElMQ0FLR1RGUlJRRlVBSUpOVExTV1NKV0RMTFJVUVNEUlJVTUlWTkZMRVdFSklEWExEVUNTT1JDVVhJR05RTVBYUEtURUlNT1ZOVFpTTlZJSlNPQ01CWEJLRkVVTUFWWlRMU1pWVUpET05NTVhNS1FGRk5MV0tVV1RLV0ZLT1BZTlhZWUxDRlJOWFdXVUlUV1dSS0FQS05KWUpMTkZDTklXSFZUVUhYQ0xMUVZPVVpVTVlHTk9VWFRWRlVUWE9MWFFIT0daR01LR1pPRlhFVlFVRVhaTUlSU1BSQVJOVkhLUFFZUFdCVlFZTE1VUkVQREFETkhIV1BDWUJXTlZCWVdNRlJQUE9CT09TSUhRTlpNWFlXTVpITlFTQlFBQkFPRUlUUVpaWVhLV1laVE5DU01RTEJMT1BJRVNLQkpaVllKQkVQTlVYU1dEV1FCS1FTV0JWWkhZVkJRUFpVSlNJRElRTUtCU0hCR1pTWkdDQlFLVlVUVEVU",
      "payloadBase64": "S1JJUVRRR1VBSklQUk9QQU9PUktGVEtESUNUQ0dHQVZJQlJBUE1PQVJWRkVLT0lOVE5IUkJHSk1TTFFYUExTR0dQTFpKWlVaSERCU0pZU1hRSlBYU1NHQkxMSktVS0hPQkRKSlRJUlVRSVRESE1NV0tWVlZJWkNQS1ZUVVJHUVVUUEhZTUlLSFZISUxDQUtHVEZSUlFGVUFJSk5UTFNXU0pXRExMUlVRU0RSUlVNSVZORkxFV0VKSURYTERVQ1NPUkNVWElHTlFNUFhQS1RFSU1PVk5UWlNOVklKU09DTUJYQktGRVVNQVZaVExTWlZVSkRPTk1NWE1LUUZGTkxXS1VXVEtXRktPUFlOWFlZTENGUk5YV1dVSVRXV1JLQVBLTkpZSkxORkNOSVdIVlRVSFhDTExRVk9VWlVNWUdOT1VYVFZGVVRYT0xYUUhPR1pHTUtHWk9GWEVWUVVFWFpNSVJTUFJBUk5WSEtQUVlQV0JWUVlMTVVSRVBEQUROSEhXUENZQldOVkJZV01GUlBQT0JPT1NJSFFOWk1YWVdNWkhOUVNCUUFCQU9FSVRRWlpZWEtXWVpUTkNTTVFMQkxPUElFU0tCSlpWWUpCRVBOVVhTV0RXUUJLUVNXQlZaSFlWQlFQWlVKU0lESVFNS0JTSEJHWlNaR0NCUUtWVVRURVQ=",
      "plainBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
      "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
      "metadata": {
        "algorithm": "vigenere",
        "inputMode": "file",
        "codec": "alpha25-v1",
        "payloadEncoding": "ascii-letters",
        "payloadLength": 512,
        "expectedLength": 256,
        "checksumAlgorithm": "SHA-256",
        "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
        "file": {
          "name": "semua-byte.bin",
          "type": "application/octet-stream"
        }
      }
    },
    {
      "cipher": "autokey",
      "mode": "text",
      "key": {
        "keyword": "UTSKRIPTO",
        "byteKey": "",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "",
        "columnKey": ""
      },
      "input": {
        "text": "JIG BALLOON XQX XX ACTX, 2026! é✓"
      },
      "packageBase64": "VVRTS1JJUFQBAAAA9XsiYWxnb3JpdGhtIjoiYXV0b2tleSIsImlucHV0TW9kZSI6InRleHQiLCJjb2RlYyI6ImFscGhhLXRleHQtdjEiLCJwYXlsb2FkRW5jb2RpbmciOiJhc2NpaS1sZXR0ZXJzIiwicGF5bG9hZExlbmd0aCI6MTksImV4cGVjdGVkTGVuZ3RoIjoxOSwiY2hlY2tzdW1BbGdvcml0aG0iOiJTSEEtMjU2Iiwic2hhMjU2IjoiNDk2ZTdlMzk5Y2ZlZjA4NzQyNTExZmRjMGQ5NzFiMWExYjAyMjdmMmVkZTk0N2Y5NWYyNjI3YmVhMjA5YjU4NSJ9REJZTFJUQUhDV0ZXWVhJTFFISw==",
      "payloadBase64": "REJZTFJUQUhDV0ZXWVhJTFFISw==",
      "plainBase64": "SklHQkFMTE9PTlhRWFhYQUNUWA==",
      "sha256": "496e7e399cfef08742511fdc0d971b1a1b0227f2ede947f95f2627bea209b585",
      "metadata": {
        "algorithm": "autokey",
        "inputMode": "text",
        "codec": "alpha-text-v1",
        "payloadEncoding": "ascii-letters",
        "payloadLength": 19,
        "expectedLength": 19,
        "checksumAlgorithm": "SHA-256",
        "sha256": "496e7e399cfef08742511fdc0d971b1a1b0227f2ede947f95f2627bea209b585"
      }
    },
    {
      "cipher": "autokey",
      "mode": "file",
      "key": {
        "keyword": "UTSKRIPTO",
        "byteKey": "",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "",
        "columnKey": ""
      },
      "input": {
        "bytesBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
        "name": "semua-byte.bin",
        "type": "application/octet-stream"
      },
      "packageBase64": "VVRTS1JJUFQBAAABN3siYWxnb3JpdGhtIjoiYXV0b2tleSIsImlucHV0TW9kZSI6ImZpbGUiLCJjb2RlYyI6ImFscGhhMjUtdjEiLCJwYXlsb2FkRW5jb2RpbmciOiJhc2NpaS1sZXR0ZXJzIiwicGF5bG9hZExlbmd0aCI6NTEyLCJleHBlY3RlZExlbmd0aCI6MjU2LCJjaGVja3N1bUFsZ29yaXRobSI6IlNIQS0yNTYiLCJzaGEyNTYiOiI0MGFmZjJlOWQyZDg5MjJlNDdhZmQ0NjQ4ZTY5Njc0OTcxNTg3ODVmYmQxZGE4NzBlNzExMDI2NmJmOTQ0ODgwIiwiZmlsZSI6eyJuYW1lIjoic2VtdWEtYnl0ZS5iaW4iLCJ0eXBlIjoiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtIn19VVRTTFJLUFdPRUFGQkdDSERJRUtGTEdNSE5JT0tQTFFNUk5TT1RQVVFWUldTWFRZVVpXQVhCWUNaREFGQkdDSERJRUpGTEdNSE5JT0pQTFFNUk5TT1RQVVFWUldTWFRZVVpWQVhCWUNaREFFQkdDSERJRUpGS0dNSE5JT0pQS1FNUk5TT1RQVVFWUldTWFRZVVpWQVdCWUNaREFFQkZDSERJRUpGS0dMSE5JT0pQS1FMUk5TT1RQVVFWUldTWFRZVVpWQVdCWENaREFFQkZDR0RJRUpGS0dMSE1JT0pQS1FMUk1TT1RQVVFWUldTWFRZVVpWQVdCWENZREFFQkZDR0RIRUpGS0dMSE1JTkpQS1FMUk1TTlRQVVFWUldTWFRZVVpWQVdCWENZRFpFQkZDR0RIRUlGS0dMSE1JTkpPS1FMUk1TTlRPVVFWUldTWFRZVVpWQVdCWENZRFpFQUZDR0RIRUlGSkdMSE1JTkpPS1BMUk1TTlRPVVBWUldTWFRZVVpWQVdCWENZRFpFQUZCR0RIRUlGSkdLSE1JTkpPS1BMUU1TTlRPVVBWUVdTWFRZVVpWQVdCWENZRFpFQUZCR0NIRklHSkhLSUxKT0tQTFFNUk5TT1VQVlFXUlhTWVVaVkFXQlhDWURaRUFGQkdDSERJRUpHS0hMSU1KTktQTFE=",
      "payloadBase64": "VVRTTFJLUFdPRUFGQkdDSERJRUtGTEdNSE5JT0tQTFFNUk5TT1RQVVFWUldTWFRZVVpXQVhCWUNaREFGQkdDSERJRUpGTEdNSE5JT0pQTFFNUk5TT1RQVVFWUldTWFRZVVpWQVhCWUNaREFFQkdDSERJRUpGS0dNSE5JT0pQS1FNUk5TT1RQVVFWUldTWFRZVVpWQVdCWUNaREFFQkZDSERJRUpGS0dMSE5JT0pQS1FMUk5TT1RQVVFWUldTWFRZVVpWQVdCWENaREFFQkZDR0RJRUpGS0dMSE1JT0pQS1FMUk1TT1RQVVFWUldTWFRZVVpWQVdCWENZREFFQkZDR0RIRUpGS0dMSE1JTkpQS1FMUk1TTlRQVVFWUldTWFRZVVpWQVdCWENZRFpFQkZDR0RIRUlGS0dMSE1JTkpPS1FMUk1TTlRPVVFWUldTWFRZVVpWQVdCWENZRFpFQUZDR0RIRUlGSkdMSE1JTkpPS1BMUk1TTlRPVVBWUldTWFRZVVpWQVdCWENZRFpFQUZCR0RIRUlGSkdLSE1JTkpPS1BMUU1TTlRPVVBWUVdTWFRZVVpWQVdCWENZRFpFQUZCR0NIRklHSkhLSUxKT0tQTFFNUk5TT1VQVlFXUlhTWVVaVkFXQlhDWURaRUFGQkdDSERJRUpHS0hMSU1KTktQTFE=",
      "plainBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
      "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
      "metadata": {
        "algorithm": "autokey",
        "inputMode": "file",
        "codec": "alpha25-v1",
        "payloadEncoding": "ascii-letters",
        "payloadLength": 512,
        "expectedLength": 256,
        "checksumAlgorithm": "SHA-256",
        "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
        "file": {
          "name": "semua-byte.bin",
          "type": "application/octet-stream"
        }
      }
    },
    {
      "cipher": "extended-vigenere",
      "mode": "text",
      "key": {
        "keyword": "",
        "byteKey": "Kunci Byte 2026!",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "",
        "columnKey": ""
      },
      "input": {
        "text": "JIG BALLOON XQX XX ACTX, 2026! é✓"
      },
      "packageBase64": "VVRTS1JJUFQBAAAA8XsiYWxnb3JpdGhtIjoiZXh0ZW5kZWQtdmlnZW5lcmUiLCJpbnB1dE1vZGUiOiJ0ZXh0IiwiY29kZWMiOiJ1dGY4LXYxIiwicGF5bG9hZEVuY29kaW5nIjoiYnl0ZXMiLCJwYXlsb2FkTGVuZ3RoIjozNiwiZXhwZWN0ZWRMZW5ndGgiOjM2LCJjaGVja3N1bUFsZ29yaXRobSI6IlNIQS0yNTYiLCJzaGEyNTYiOiIxYTk1YjMzOWQ2Y2UxYThiOTVhZmFiZTNkZDIyMjQ3ZmE4MTI4MTQzNDBkYWY0Njc4NWExMzUwZmExMzNiOTRhIn2VvrWDq2GOxcO0blKIg45Bo82OpKx0mqWUl1BkZlNW5PRXCvY=",
      "payloadBase64": "lb61g6thjsXDtG5SiIOOQaPNjqSsdJqllJdQZGZTVuT0Vwr2",
      "plainBase64": "SklHIEJBTExPT04gWFFYIFhYIEFDVFgsIDIwMjYhIMOp4pyT",
      "sha256": "1a95b339d6ce1a8b95afabe3dd22247fa812814340daf46785a1350fa133b94a",
      "metadata": {
        "algorithm": "extended-vigenere",
        "inputMode": "text",
        "codec": "utf8-v1",
        "payloadEncoding": "bytes",
        "payloadLength": 36,
        "expectedLength": 36,
        "checksumAlgorithm": "SHA-256",
        "sha256": "1a95b339d6ce1a8b95afabe3dd22247fa812814340daf46785a1350fa133b94a"
      }
    },
    {
      "cipher": "extended-vigenere",
      "mode": "file",
      "key": {
        "keyword": "",
        "byteKey": "Kunci Byte 2026!",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "",
        "columnKey": ""
      },
      "input": {
        "bytesBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
        "name": "semua-byte.bin",
        "type": "application/octet-stream"
      },
      "packageBase64": "VVRTS1JJUFQBAAABN3siYWxnb3JpdGhtIjoiZXh0ZW5kZWQtdmlnZW5lcmUiLCJpbnB1dE1vZGUiOiJmaWxlIiwiY29kZWMiOiJieXRlcy12MSIsInBheWxvYWRFbmNvZGluZyI6ImJ5dGVzIiwicGF5bG9hZExlbmd0aCI6MjU2LCJleHBlY3RlZExlbmd0aCI6MjU2LCJjaGVja3N1bUFsZ29yaXRobSI6IlNIQS0yNTYiLCJzaGEyNTYiOiI0MGFmZjJlOWQyZDg5MjJlNDdhZmQ0NjQ4ZTY5Njc0OTcxNTg3ODVmYmQxZGE4NzBlNzExMDI2NmJmOTQ0ODgwIiwiZmlsZSI6eyJuYW1lIjoic2VtdWEtYnl0ZS5iaW4iLCJ0eXBlIjoiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtIn19S3ZwZm0lSIB8bio9PD9EMFuGgHZ9NViQjH46TUxPVEBrlpCGjUVooJyOSl1cX2RQe6aglp1VeLCsnlptbG90YIu2sKatZYjAvK5qfXx/hHCbxsC2vXWY0My+eo2Mj5SAq9bQxs2FqODczoqdnJ+kkLvm4Nbdlbjw7N6arayvtKDL9vDm7aXIAPzuqr28v8Sw2wYA9v212BAM/rrNzM/UwOsWEAYNxeggHA7K3dzf5ND7JiAWHdX4MCwe2u3s7/TgCzYwJi3lCEA8Lur9/P8E8BtGQDY99RhQTD76DQwPFAArVlBGTQUoYFxOCh0cHyQQO2ZgVl0VOHBsXhotLC80IA==",
      "payloadBase64": "S3ZwZm0lSIB8bio9PD9EMFuGgHZ9NViQjH46TUxPVEBrlpCGjUVooJyOSl1cX2RQe6aglp1VeLCsnlptbG90YIu2sKatZYjAvK5qfXx/hHCbxsC2vXWY0My+eo2Mj5SAq9bQxs2FqODczoqdnJ+kkLvm4Nbdlbjw7N6arayvtKDL9vDm7aXIAPzuqr28v8Sw2wYA9v212BAM/rrNzM/UwOsWEAYNxeggHA7K3dzf5ND7JiAWHdX4MCwe2u3s7/TgCzYwJi3lCEA8Lur9/P8E8BtGQDY99RhQTD76DQwPFAArVlBGTQUoYFxOCh0cHyQQO2ZgVl0VOHBsXhotLC80IA==",
      "plainBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
      "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
      "metadata": {
        "algorithm": "extended-vigenere",
        "inputMode": "file",
        "codec": "bytes-v1",
        "payloadEncoding": "bytes",
        "payloadLength": 256,
        "expectedLength": 256,
        "checksumAlgorithm": "SHA-256",
        "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
        "file": {
          "name": "semua-byte.bin",
          "type": "application/octet-stream"
        }
      }
    },
    {
      "cipher": "playfair",
      "mode": "text",
      "key": {
        "keyword": "MONARCHY",
        "byteKey": "",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "",
        "columnKey": ""
      },
      "input": {
        "text": "JIG BALLOON XQX XX ACTX, 2026! é✓"
      },
      "packageBase64": "VVRTS1JJUFQBAAABU3siYWxnb3JpdGhtIjoicGxheWZhaXIiLCJpbnB1dE1vZGUiOiJ0ZXh0IiwiY29kZWMiOiJhbHBoYS10ZXh0LXYxIiwicGF5bG9hZEVuY29kaW5nIjoiYXNjaWktbGV0dGVycyIsInBheWxvYWRMZW5ndGgiOjI0LCJleHBlY3RlZExlbmd0aCI6MTksImNoZWNrc3VtQWxnb3JpdGhtIjoiU0hBLTI1NiIsInNoYTI1NiI6IjQ5NmU3ZTM5OWNmZWYwODc0MjUxMWZkYzBkOTcxYjFhMWIwMjI3ZjJlZGU5NDdmOTVmMjYyN2JlYTIwOWI1ODUiLCJwbGF5ZmFpciI6eyJtYXJrZXJzIjoiYml0c2V0LWxzYi12MSIsImZpbGxlciI6ImdvQ0MiLCJmaWxsZXJDb3VudCI6NSwiakNvdW50IjoxLCJqIjoiQVFBQSJ9fVNBS0lJQlNVUE1OQVdTV1NXU0FCRExXUw==",
      "payloadBase64": "U0FLSUlCU1VQTU5BV1NXU1dTQUJETFdT",
      "plainBase64": "SklHQkFMTE9PTlhRWFhYQUNUWA==",
      "sha256": "496e7e399cfef08742511fdc0d971b1a1b0227f2ede947f95f2627bea209b585",
      "metadata": {
        "algorithm": "playfair",
        "inputMode": "text",
        "codec": "alpha-text-v1",
        "payloadEncoding": "ascii-letters",
        "payloadLength": 24,
        "expectedLength": 19,
        "checksumAlgorithm": "SHA-256",
        "sha256": "496e7e399cfef08742511fdc0d971b1a1b0227f2ede947f95f2627bea209b585",
        "playfair": {
          "markers": "bitset-lsb-v1",
          "filler": "goCC",
          "fillerCount": 5,
          "jCount": 1,
          "j": "AQAA"
        }
      }
    },
    {
      "cipher": "playfair",
      "mode": "file",
      "key": {
        "keyword": "MONARCHY",
        "byteKey": "",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "",
        "columnKey": ""
      },
      "input": {
        "bytesBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
        "name": "semua-byte.bin",
        "type": "application/octet-stream"
      },
      "packageBase64": "VVRTS1JJUFQBAAAB43siYWxnb3JpdGhtIjoicGxheWZhaXIiLCJpbnB1dE1vZGUiOiJmaWxlIiwiY29kZWMiOiJhbHBoYTI1LXYxIiwicGF5bG9hZEVuY29kaW5nIjoiYXNjaWktbGV0dGVycyIsInBheWxvYWRMZW5ndGgiOjUzMiwiZXhwZWN0ZWRMZW5ndGgiOjI1NiwiY2hlY2tzdW1BbGdvcml0aG0iOiJTSEEtMjU2Iiwic2hhMjU2IjoiNDBhZmYyZTlkMmQ4OTIyZTQ3YWZkNDY0OGU2OTY3NDk3MTU4Nzg1ZmJkMWRhODcwZTcxMTAyNjZiZjk0NDg4MCIsImZpbGUiOnsibmFtZSI6InNlbXVhLWJ5dGUuYmluIiwidHlwZSI6ImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSJ9LCJwbGF5ZmFpciI6eyJtYXJrZXJzIjoiYml0c2V0LWxzYi12MSIsImZpbGxlciI6IkNnQUFBQUFBZ0FJQUFBQUFBS0FBQUFBQUFBQW9BQUFBQUFBQUNnQUFBQUFBZ0FJQUFBQUFBS0FBQUFBQUFBQW9BQUFBQUFBQUNnQUFBQUFBZ0FJQUFBQUFBQT09IiwiZmlsbGVyQ291bnQiOjIwLCJqQ291bnQiOjB9fUJBQkFCSU1CUkJNSU9JTklPQkJTUklNU1JPUkFSTk9TTlNSTUJYUlNNWE9YTlhCQU5CUlhJQklBSUFESERDQ0lISVlJRFlJU0RJQ1NDQVlBSEFIU1lTREFJWERTQ1hIWFlYSUFEQkRYQk1IREJVQlVIQ0VMSEVZRUhZQkVERUVVRUNZTUhNSExZTERNQkxETEVNSFVZVUJVSEJEVUJSQ0RDSEJaQlpDS0hLWUtDWUJLS1RDVENSWVJIUkhUWVRLREJUS1pDWkhaWVpCWkNCS1JJTUlDTEVLQ0lVSVVGR0ZJRkNGS0ZFTFVMQ0dNRk1GTEdMS01JTEtMTE1GVUdVSVVHQ0tVSU9JSEVIS0hHRklWSVZHSVBGR0tHRUVQRU9HT1BIUFZHUEtPSVBLUEVWUE9HVklWR0hLVklOSVlFWUtZSUZJR0lXSVdGWUlLSUVFUUVOUVlGTkZRUVdLTklRS1FFV0ZXUU5JV1FHS1dCT1lEWUhZQ0NGRlBZRkJWQlZCRkRGQ1BDT1lPRkhGVllQRE9CUERQQ1ZGT1lWQlZZQkRWU0JTSUVCS0JLRktHS0lGQlNBU0FLRUVTRUFHQUZBRlNHU0tBU1hLU0VYRlhHWFNBR0JLWElSSURFRFRLRUZFR0VJRkRFS0laSVpFVEVSR1JGUkZUR1RURElUVFpFWkZaR1pJWkdEVFJTTVNDVUVUQ1VMUEU=",
      "payloadBase64": "QkFCQUJJTUJSQk1JT0lOSU9CQlNSSU1TUk9SQVJOT1NOU1JNQlhSU01YT1hOWEJBTkJSWElCSUFJQURIRENDSUhJWUlEWUlTRElDU0NBWUFIQUhTWVNEQUlYRFNDWEhYWVhJQURCRFhCTUhEQlVCVUhDRUxIRVlFSFlCRURFRVVFQ1lNSE1ITFlMRE1CTERMRU1IVVlVQlVIQkRVQlJDRENIQlpCWkNLSEtZS0NZQktLVENUQ1JZUkhSSFRZVEtEQlRLWkNaSFpZWkJaQ0JLUklNSUNMRUtDSVVJVUZHRklGQ0ZLRkVMVUxDR01GTUZMR0xLTUlMS0xMTUZVR1VJVUdDS1VJT0lIRUhLSEdGSVZJVkdJUEZHS0dFRVBFT0dPUEhQVkdQS09JUEtQRVZQT0dWSVZHSEtWSU5JWUVZS1lJRklHSVdJV0ZZSUtJRUVRRU5RWUZORlFRV0tOSVFLUUVXRldRTklXUUdLV0JPWURZSFlDQ0ZGUFlGQlZCVkJGREZDUENPWU9GSEZWWVBET0JQRFBDVkZPWVZCVllCRFZTQlNJRUJLQktGS0dLSUZCU0FTQUtFRVNFQUdBRkFGU0dTS0FTWEtTRVhGWEdYU0FHQktYSVJJREVEVEtFRkVHRUlGREVLSVpJWkVURVJHUkZSRlRHVFRESVRUWkVaRlpHWklaR0RUUlNNU0NVRVRDVUxQRQ==",
      "plainBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
      "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
      "metadata": {
        "algorithm": "playfair",
        "inputMode": "file",
        "codec": "alpha25-v1",
        "payloadEncoding": "ascii-letters",
        "payloadLength": 532,
        "expectedLength": 256,
        "checksumAlgorithm": "SHA-256",
        "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
        "file": {
          "name": "semua-byte.bin",
          "type": "application/octet-stream"
        },
        "playfair": {
          "markers": "bitset-lsb-v1",
          "filler": "CgAAAAAAgAIAAAAAAKAAAAAAAAAoAAAAAAAACgAAAAAAgAIAAAAAAKAAAAAAAAAoAAAAAAAACgAAAAAAgAIAAAAAAA==",
          "fillerCount": 20,
          "jCount": 0
        }
      }
    },
    {
      "cipher": "affine",
      "mode": "text",
      "key": {
        "keyword": "",
        "byteKey": "",
        "byteKeyFormat": "text",
        "affineA": "7",
        "affineB": "10",
        "hillMatrix": "",
        "columnKey": ""
      },
      "input": {
        "text": "JIG BALLOON XQX XX ACTX, 2026! é✓"
      },
      "packageBase64": "VVRTS1JJUFQBAAAA9HsiYWxnb3JpdGhtIjoiYWZmaW5lIiwiaW5wdXRNb2RlIjoidGV4dCIsImNvZGVjIjoiYWxwaGEtdGV4dC12MSIsInBheWxvYWRFbmNvZGluZyI6ImFzY2lpLWxldHRlcnMiLCJwYXlsb2FkTGVuZ3RoIjoxOSwiZXhwZWN0ZWRMZW5ndGgiOjE5LCJjaGVja3N1bUFsZ29yaXRobSI6IlNIQS0yNTYiLCJzaGEyNTYiOiI0OTZlN2UzOTljZmVmMDg3NDI1MTFmZGMwZDk3MWIxYTFiMDIyN2YyZWRlOTQ3Zjk1ZjI2MjdiZWEyMDliNTg1In1WT0FSS0pKRUVYUFNQUFBLWU5Q",
      "payloadBase64": "Vk9BUktKSkVFWFBTUFBQS1lOUA==",
      "plainBase64": "SklHQkFMTE9PTlhRWFhYQUNUWA==",
      "sha256": "496e7e399cfef08742511fdc0d971b1a1b0227f2ede947f95f2627bea209b585",
      "metadata": {
        "algorithm": "affine",
        "inputMode": "text",
        "codec": "alpha-text-v1",
        "payloadEncoding": "ascii-letters",
        "payloadLength": 19,
        "expectedLength": 19,
        "checksumAlgorithm": "SHA-256",
        "sha256": "496e7e399cfef08742511fdc0d971b1a1b0227f2ede947f95f2627bea209b585"
      }
    },
    {
      "cipher": "affine",
      "mode": "file",
      "key": {
        "keyword": "",
        "byteKey": "",
        "byteKeyFormat": "text",
        "affineA": "7",
        "affineB": "10",
        "hillMatrix": "",
        "columnKey": ""
      },
      "input": {
        "bytesBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
        "name": "semua-byte.bin",
        "type": "application/octet-stream"
      },
      "packageBase64": "VVRTS1JJUFQBAAABNnsiYWxnb3JpdGhtIjoiYWZmaW5lIiwiaW5wdXRNb2RlIjoiZmlsZSIsImNvZGVjIjoiYWxwaGEyNS12MSIsInBheWxvYWRFbmNvZGluZyI6ImFzY2lpLWxldHRlcnMiLCJwYXlsb2FkTGVuZ3RoIjo1MTIsImV4cGVjdGVkTGVuZ3RoIjoyNTYsImNoZWNrc3VtQWxnb3JpdGhtIjoiU0hBLTI1NiIsInNoYTI1NiI6IjQwYWZmMmU5ZDJkODkyMmU0N2FmZDQ2NDhlNjk2NzQ5NzE1ODc4NWZiZDFkYTg3MGU3MTEwMjY2YmY5NDQ4ODAiLCJmaWxlIjp7Im5hbWUiOiJzZW11YS1ieXRlLmJpbiIsInR5cGUiOiJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0ifX1LS0tSS1lLRktNS1RLQUtIS09LQ0tKS1FLWEtFS0xLU0taS0dLTktVS0JLSUtQS1dLRFJLUlJSWVJGUk1SVFJBUkhST1JDUkpSUVJYUkVSTFJTUlpSR1JOUlVSQlJJUlBSV1JEWUtZUllZWUZZTVlUWUFZSFlPWUNZSllRWVhZRVlMWVNZWllHWU5ZVVlCWUlZUFlXWURGS0ZSRllGRkZNRlRGQUZIRk9GQ0ZKRlFGWEZFRkxGU0ZaRkdGTkZVRkJGSUZQRldGRE1LTVJNWU1GTU1NVE1BTUhNT01DTUpNUU1YTUVNTE1TTVpNR01OTVVNQk1JTVBNV01EVEtUUlRZVEZUTVRUVEFUSFRPVENUSlRRVFhURVRMVFNUWlRHVE5UVVRCVElUUFRXVERBS0FSQVlBRkFNQVRBQUFIQU9BQ0FKQVFBWEFFQUxBU0FaQUdBTkFVQUJBSUFQQVdBREhLSFJIWUhGSE1IVEhBSEhIT0hDSEpIUUhYSEVITEhTSFpIR0hOSFVIQkhJSFBIV0hET0tPUk9ZT0ZPTU9UT0FPSE9PT0NPSk9RT1hPRU9MT1NPWk9HT05PVU9CT0lPUE9XT0RDS0NSQ1lDRkNNQ1RDQUNIQ09DQ0NKQ1FDWENFQ0xDU0NaQ0dDTkNVQ0JDSUNQQ1dDREpLSlJKWUpGSk1KVA==",
      "payloadBase64": "S0tLUktZS0ZLTUtUS0FLSEtPS0NLSktRS1hLRUtMS1NLWktHS05LVUtCS0lLUEtXS0RSS1JSUllSRlJNUlRSQVJIUk9SQ1JKUlFSWFJFUkxSU1JaUkdSTlJVUkJSSVJQUldSRFlLWVJZWVlGWU1ZVFlBWUhZT1lDWUpZUVlYWUVZTFlTWVpZR1lOWVVZQllJWVBZV1lERktGUkZZRkZGTUZURkFGSEZPRkNGSkZRRlhGRUZMRlNGWkZHRk5GVUZCRklGUEZXRkRNS01STVlNRk1NTVRNQU1ITU9NQ01KTVFNWE1FTUxNU01aTUdNTk1VTUJNSU1QTVdNRFRLVFJUWVRGVE1UVFRBVEhUT1RDVEpUUVRYVEVUTFRTVFpUR1ROVFVUQlRJVFBUV1REQUtBUkFZQUZBTUFUQUFBSEFPQUNBSkFRQVhBRUFMQVNBWkFHQU5BVUFCQUlBUEFXQURIS0hSSFlIRkhNSFRIQUhISE9IQ0hKSFFIWEhFSExIU0haSEdITkhVSEJISUhQSFdIRE9LT1JPWU9GT01PVE9BT0hPT09DT0pPUU9YT0VPTE9TT1pPR09OT1VPQk9JT1BPV09EQ0tDUkNZQ0ZDTUNUQ0FDSENPQ0NDSkNRQ1hDRUNMQ1NDWkNHQ05DVUNCQ0lDUENXQ0RKS0pSSllKRkpNSlQ=",
      "plainBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
      "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
      "metadata": {
        "algorithm": "affine",
        "inputMode": "file",
        "codec": "alpha25-v1",
        "payloadEncoding": "ascii-letters",
        "payloadLength": 512,
        "expectedLength": 256,
        "checksumAlgorithm": "SHA-256",
        "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
        "file": {
          "name": "semua-byte.bin",
          "type": "application/octet-stream"
        }
      }
    },
    {
      "cipher": "hill",
      "mode": "text",
      "key": {
        "keyword": "",
        "byteKey": "",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "6 24 1\n13 16 10\n20 17 15",
        "columnKey": ""
      },
      "input": {
        "text": "JIG BALLOON XQX XX ACTX, 2026! é✓"
      },
      "packageBase64": "VVRTS1JJUFQBAAABDnsiYWxnb3JpdGhtIjoiaGlsbCIsImlucHV0TW9kZSI6InRleHQiLCJjb2RlYyI6ImFscGhhLXRleHQtdjEiLCJwYXlsb2FkRW5jb2RpbmciOiJhc2NpaS1sZXR0ZXJzIiwicGF5bG9hZExlbmd0aCI6MjEsImV4cGVjdGVkTGVuZ3RoIjoxOSwiY2hlY2tzdW1BbGdvcml0aG0iOiJTSEEtMjU2Iiwic2hhMjU2IjoiNDk2ZTdlMzk5Y2ZlZjA4NzQyNTExZmRjMGQ5NzFiMWExYjAyMjdmMmVkZTk0N2Y5NWYyNjI3YmVhMjA5YjU4NSIsImhpbGwiOnsibiI6MywicGFkQ291bnQiOjJ9fVNUUVJUREFOU1dWSExOQVBPSExOQQ==",
      "payloadBase64": "U1RRUlREQU5TV1ZITE5BUE9ITE5B",
      "plainBase64": "SklHQkFMTE9PTlhRWFhYQUNUWA==",
      "sha256": "496e7e399cfef08742511fdc0d971b1a1b0227f2ede947f95f2627bea209b585",
      "metadata": {
        "algorithm": "hill",
        "inputMode": "text",
        "codec": "alpha-text-v1",
        "payloadEncoding": "ascii-letters",
        "payloadLength": 21,
        "expectedLength": 19,
        "checksumAlgorithm": "SHA-256",
        "sha256": "496e7e399cfef08742511fdc0d971b1a1b0227f2ede947f95f2627bea209b585",
        "hill": {
          "n": 3,
          "padCount": 2
        }
      }
    },
    {
      "cipher": "hill",
      "mode": "file",
      "key": {
        "keyword": "",
        "byteKey": "",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "6 24 1\n13 16 10\n20 17 15",
        "columnKey": ""
      },
      "input": {
        "bytesBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
        "name": "semua-byte.bin",
        "type": "application/octet-stream"
      },
      "packageBase64": "VVRTS1JJUFQBAAABUHsiYWxnb3JpdGhtIjoiaGlsbCIsImlucHV0TW9kZSI6ImZpbGUiLCJjb2RlYyI6ImFscGhhMjUtdjEiLCJwYXlsb2FkRW5jb2RpbmciOiJhc2NpaS1sZXR0ZXJzIiwicGF5bG9hZExlbmd0aCI6NTEzLCJleHBlY3RlZExlbmd0aCI6MjU2LCJjaGVja3N1bUFsZ29yaXRobSI6IlNIQS0yNTYiLCJzaGEyNTYiOiI0MGFmZjJlOWQyZDg5MjJlNDdhZmQ0NjQ4ZTY5Njc0OTcxNTg3ODVmYmQxZGE4NzBlNzExMDI2NmJmOTQ0ODgwIiwiZmlsZSI6eyJuYW1lIjoic2VtdWEtYnl0ZS5iaW4iLCJ0eXBlIjoiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtIn0sImhpbGwiOnsibiI6MywicGFkQ291bnQiOjF9fUFBQUlIWVVXWkRZWk9TWVlQQUdFT0FES0FBTlZVTFVXTVFMTU9TTExDTklPS0dUT0RVWVpBR0REUlVSSFhaUVBJSVJWUFJXU0pIRk1OVERERUhFVVhaRENWVlJWQ1hNV0xSQlFUT01LSkxLUEdHSUdCUUFDSENDR1NPWERHQk1LV1lYQ0dHVlRPREFDVU9GRVVZVEpXRlZSQkNEWFBOQVhVWUpKWlNMWkJWUFVaSlZST1BRS1BOTktITEpKTUZZTURGTEFQTllMWlRXRllVU09OR1NRUkpFSE1NUUxTUkVZR0dKU1lVRkJBVFNRRVdSVU1NRFJJVkdJQ0tQTkhCS0ZHT0JYSkFYUFZUSVdZRk5GWVhDQUhCWFNUQkJYV05LQ1ZUVklCRFBQVURTRVFJQ1daV0tFQlJRWEVBQU1IWVdNUU9WSVFJUEpNSktFT0VES0VBTlpVTFlXTVVMTVRDQU5TRVRMVElKRk5IU0RBR0hEUkZPUVpQSEFGUlRMR1ZXU05IRlFOVEhERUxFVUJaREVMTUNTTFpDTldPS1VUT1FLSlFVRUlXWlJZWkNTWU1QQVdPWEhHQlFLV0NYQ0tHVlhPRFNXTU9MTU1TTEpDTkdPS0VUT1lBQUdIWVNXWkJZWk1TWVdQQUdPWFJHQkFLV01YQ1ZRS0ZFVVZaREFWVkJMQQ==",
      "payloadBase64": "QUFBSUhZVVdaRFlaT1NZWVBBR0VPQURLQUFOVlVMVVdNUUxNT1NMTENOSU9LR1RPRFVZWkFHRERSVVJIWFpRUElJUlZQUldTSkhGTU5URERFSEVVWFpEQ1ZWUlZDWE1XTFJCUVRPTUtKTEtQR0dJR0JRQUNIQ0NHU09YREdCTUtXWVhDR0dWVE9EQUNVT0ZFVVlUSldGVlJCQ0RYUE5BWFVZSkpaU0xaQlZQVVpKVlJPUFFLUE5OS0hMSkpNRllNREZMQVBOWUxaVFdGWVVTT05HU1FSSkVITU1RTFNSRVlHR0pTWVVGQkFUU1FFV1JVTU1EUklWR0lDS1BOSEJLRkdPQlhKQVhQVlRJV1lGTkZZWENBSEJYU1RCQlhXTktDVlRWSUJEUFBVRFNFUUlDV1pXS0VCUlFYRUFBTUhZV01RT1ZJUUlQSk1KS0VPRURLRUFOWlVMWVdNVUxNVENBTlNFVExUSUpGTkhTREFHSERSRk9RWlBIQUZSVExHVldTTkhGUU5USERFTEVVQlpERUxNQ1NMWkNOV09LVVRPUUtKUVVFSVdaUllaQ1NZTVBBV09YSEdCUUtXQ1hDS0dWWE9EU1dNT0xNTVNMSkNOR09LRVRPWUFBR0hZU1daQllaTVNZV1BBR09YUkdCQUtXTVhDVlFLRkVVVlpEQVZWQkxB",
      "plainBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
      "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
      "metadata": {
        "algorithm": "hill",
        "inputMode": "file",
        "codec": "alpha25-v1",
        "payloadEncoding": "ascii-letters",
        "payloadLength": 513,
        "expectedLength": 256,
        "checksumAlgorithm": "SHA-256",
        "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
        "file": {
          "name": "semua-byte.bin",
          "type": "application/octet-stream"
        },
        "hill": {
          "n": 3,
          "padCount": 1
        }
      }
    },
    {
      "cipher": "super",
      "mode": "text",
      "key": {
        "keyword": "",
        "byteKey": "SuperKunci",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "",
        "columnKey": "TRANSPOSISI"
      },
      "input": {
        "text": "JIG BALLOON XQX XX ACTX, 2026! é✓"
      },
      "packageBase64": "VVRTS1JJUFQBAAAA5XsiYWxnb3JpdGhtIjoic3VwZXIiLCJpbnB1dE1vZGUiOiJ0ZXh0IiwiY29kZWMiOiJ1dGY4LXYxIiwicGF5bG9hZEVuY29kaW5nIjoiYnl0ZXMiLCJwYXlsb2FkTGVuZ3RoIjozNiwiZXhwZWN0ZWRMZW5ndGgiOjM2LCJjaGVja3N1bUFsZ29yaXRobSI6IlNIQS0yNTYiLCJzaGEyNTYiOiIxYTk1YjMzOWQ2Y2UxYThiOTVhZmFiZTNkZDIyMjQ3ZmE4MTI4MTQzNDBkYWY0Njc4NWExMzUwZmExMzNiOTRhIn23tpLesqpzockZhcp9wcaZjM2gvsiRDrRrpbqDiriWOJ2VyEc=",
      "payloadBase64": "t7aS3rKqc6HJGYXKfcHGmYzNoL7IkQ60a6W6g4q4ljidlchH",
      "plainBase64": "SklHIEJBTExPT04gWFFYIFhYIEFDVFgsIDIwMjYhIMOp4pyT",
      "sha256": "1a95b339d6ce1a8b95afabe3dd22247fa812814340daf46785a1350fa133b94a",
      "metadata": {
        "algorithm": "super",
        "inputMode": "text",
        "codec": "utf8-v1",
        "payloadEncoding": "bytes",
        "payloadLength": 36,
        "expectedLength": 36,
        "checksumAlgorithm": "SHA-256",
        "sha256": "1a95b339d6ce1a8b95afabe3dd22247fa812814340daf46785a1350fa133b94a"
      }
    },
    {
      "cipher": "super",
      "mode": "file",
      "key": {
        "keyword": "",
        "byteKey": "SuperKunci",
        "byteKeyFormat": "text",
        "affineA": "",
        "affineB": "",
        "hillMatrix": "",
        "columnKey": "TRANSPOSISI"
      },
      "input": {
        "bytesBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
        "name": "semua-byte.bin",
        "type": "application/octet-stream"
      },
      "packageBase64": "VVRTS1JJUFQBAAABK3siYWxnb3JpdGhtIjoic3VwZXIiLCJpbnB1dE1vZGUiOiJmaWxlIiwiY29kZWMiOiJieXRlcy12MSIsInBheWxvYWRFbmNvZGluZyI6ImJ5dGVzIiwicGF5bG9hZExlbmd0aCI6MjU2LCJleHBlY3RlZExlbmd0aCI6MjU2LCJjaGVja3N1bUFsZ29yaXRobSI6IlNIQS0yNTYiLCJzaGEyNTYiOiI0MGFmZjJlOWQyZDg5MjJlNDdhZmQ0NjQ4ZTY5Njc0OTcxNTg3ODVmYmQxZGE4NzBlNzExMDI2NmJmOTQ0ODgwIiwiZmlsZSI6eyJuYW1lIjoic2VtdWEtYnl0ZS5iaW4iLCJ0eXBlIjoiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtIn19cnKKbqOnp7it2uDg+NwRFRUmG0hOTmZKa3xxnqSkvKDV2dnq3wwSEioOQ0dHWE1dipCQqIzBxcXWy/j+/hb6LzMzRDlmbGiAZJmdna6j0NbW7tIHCwscET5ERFxAe39/kIWyuLjQtOnt7f7zICYmPiJXW1tQhYmJmo+8wsLavvP39wj9KjAwSCxhZXZ8fJR4rbGxwrfk6uoC5hsfHzAlUlhYcHZaj5OTpJnGzMzkyP0BARIHNDo6UjZrdXWGe6iursaq3+Pj9OkWHBw0GE1RUWJyZ5SamrKWy8/P4NUCCAggBDk9PU5DcFOAhoaegre7u8zB7vT0DPAlKSk6L1xiYg==",
      "payloadBase64": "cnKKbqOnp7it2uDg+NwRFRUmG0hOTmZKa3xxnqSkvKDV2dnq3wwSEioOQ0dHWE1dipCQqIzBxcXWy/j+/hb6LzMzRDlmbGiAZJmdna6j0NbW7tIHCwscET5ERFxAe39/kIWyuLjQtOnt7f7zICYmPiJXW1tQhYmJmo+8wsLavvP39wj9KjAwSCxhZXZ8fJR4rbGxwrfk6uoC5hsfHzAlUlhYcHZaj5OTpJnGzMzkyP0BARIHNDo6UjZrdXWGe6iursaq3+Pj9OkWHBw0GE1RUWJyZ5SamrKWy8/P4NUCCAggBDk9PU5DcFOAhoaegre7u8zB7vT0DPAlKSk6L1xiYg==",
      "plainBase64": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==",
      "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
      "metadata": {
        "algorithm": "super",
        "inputMode": "file",
        "codec": "bytes-v1",
        "payloadEncoding": "bytes",
        "payloadLength": 256,
        "expectedLength": 256,
        "checksumAlgorithm": "SHA-256",
        "sha256": "40aff2e9d2d8922e47afd4648e6967497158785fbd1da870e7110266bf944880",
        "file": {
          "name": "semua-byte.bin",
          "type": "application/octet-stream"
        }
      }
    }
  ]
}
```

## tests/unit/api-client.test.ts

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import { callCrypto, WorkerCallError } from "@/lib/engine/client";
import { encryptMessage } from "@/lib/engine/encrypt";
import { decryptMessage, inspectPackage } from "@/lib/engine/decrypt";
import { MAX_PROXY_BODY_BYTES, proxyCrypto } from "@/app/api/crypto/proxy";
import { EMPTY_KEY_VALUES } from "@/lib/validation/keys";

const key = { ...EMPTY_KEY_VALUES, keyword: "LEMON" };
const metadata = {
  algorithm: "vigenere", inputMode: "text", codec: "alphabet26-v1", payloadEncoding: "ascii-letters",
  payloadLength: 3, expectedLength: 3, checksumAlgorithm: "SHA-256", sha256: "0".repeat(64),
};
const encrypted = {
  cipher: "vigenere", inputMode: "text", plainBase64: "QUJD", payloadBase64: "TEZH", containerBase64: "AP8B",
  metadata, keyNotes: [], details: [],
};
const decrypted = {
  cipher: "vigenere", source: "package", inputMode: "text", representation: "letters", bytesBase64: "QUJD",
  payloadBase64: "TEZH", verified: true, sha256: "0".repeat(64), expectedSha256: "0".repeat(64),
  fileName: null, fileType: null, keyNotes: [], details: [],
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

describe("transport Ruby pada aplikasi", () => {
  it("enkripsi Node menghubungi backend Ruby dan mendekode semua field biner", async () => {
    vi.stubEnv("RUBY_API_URL", "http://127.0.0.1:4789/");
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json(encrypted));
    const request = { cipher: "vigenere" as const, input: { kind: "text" as const, text: "Abc!" }, key };
    const result = await encryptMessage(request);
    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:4789/api/crypto/encrypt", expect.objectContaining({
      method: "POST", body: JSON.stringify(request), cache: "no-store",
    }));
    expect(Array.from(result.plainBytes)).toEqual([65, 66, 67]);
    expect(Array.from(result.payload)).toEqual([76, 70, 71]);
    expect(Array.from(result.container)).toEqual([0, 255, 1]);
  });

  it("file browser dikirim multipart dengan byte nol dan header utuh", async () => {
    vi.stubGlobal("location", { origin: "http://localhost:3000" });
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json(encrypted));
    const bytes = Uint8Array.from([0, 255, 137, 80, 78, 71]);
    await callCrypto({ op: "encrypt", request: {
      cipher: "vigenere", key, input: { kind: "file", bytes, name: "gambar.png", type: "image/png", readAs: "bytes" },
    } });
    expect(fetch.mock.calls[0]?.[0]).toBe("/api/crypto/encrypt");
    const init = fetch.mock.calls[0]?.[1];
    expect(new Headers(init?.headers).has("Content-Type")).toBe(false);
    const form = init?.body as FormData;
    const file = form.get("file") as File;
    expect(file.name).toBe("gambar.png");
    expect(Array.from(new Uint8Array(await file.arrayBuffer()))).toEqual(Array.from(bytes));
    expect(JSON.parse(form.get("metadata") as string)).toEqual({
      cipher: "vigenere", key, input: { kind: "file", name: "gambar.png", type: "image/png", readAs: "bytes" },
    });
  });

  it("file Node memakai kontrak multipart layanan Ruby yang sama", async () => {
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json(encrypted));
    await encryptMessage({ cipher: "vigenere", key, input: {
      kind: "file", bytes: Uint8Array.from([0, 255, 1]), name: "a.bin", type: "", readAs: "bytes",
    } });
    const form = fetch.mock.calls[0]?.[1]?.body as FormData;
    const file = form.get("file") as File;
    expect(Array.from(new Uint8Array(await file.arrayBuffer()))).toEqual([0, 255, 1]);
    expect(JSON.parse(form.get("metadata") as string).input).toEqual({ kind: "file", name: "a.bin", type: "", readAs: "bytes" });
  });

  it("dekripsi dan inspeksi browser mengirim file ke Ruby", async () => {
    vi.stubGlobal("location", { origin: "http://localhost:3000" });
    const summary = { algorithm: "vigenere", inputMode: "text", codec: "alphabet26-v1", payloadLength: 3, expectedLength: 3,
      fileName: null, fileType: null, sourceFileName: null };
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(Response.json(decrypted)).mockResolvedValueOnce(Response.json(summary));
    const container = Uint8Array.from([0, 255, 1]);
    const result = await decryptMessage({ kind: "package", container, key });
    expect(Array.from(result.bytes)).toEqual([65, 66, 67]);
    expect(fetch.mock.calls[0]?.[0]).toBe("/api/crypto/decrypt");
    expect((fetch.mock.calls[0]?.[1]?.body as FormData).get("file")).toBeInstanceOf(Blob);
    expect(await inspectPackage(container)).toEqual(summary);
    expect(fetch.mock.calls[1]?.[0]).toBe("/api/crypto/inspect");
  });

  it("galat Ruby mempertahankan field formulir; tidak menghasilkan cipher lokal", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({
      message: "Ring harus 1 sampai 26.", field: "ringSettings", fieldErrors: { ringSettings: "Ring tidak valid." },
    }, { status: 422 }));
    const failed = callCrypto({ op: "encrypt", request: { cipher: "vigenere", key, input: { kind: "text", text: "ABC" } } });
    await expect(failed).rejects.toBeInstanceOf(WorkerCallError);
    await expect(failed).rejects.toMatchObject({ info: {
      message: "Ring harus 1 sampai 26.", field: "ringSettings", fieldErrors: { ringSettings: "Ring tidak valid." },
    } });
  });

  it("backend mati menghasilkan pesan yang jelas tanpa jalur cipher alternatif", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("fetch failed"));
    await expect(encryptMessage({ cipher: "vigenere", key, input: { kind: "text", text: "ABC" } })).rejects.toThrow(/Ruby tidak dapat dihubungi/);
  });

  it("respons Base64 rusak ditolak", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ ...encrypted, containerBase64: "rusak!" }));
    await expect(encryptMessage({ cipher: "vigenere", key, input: { kind: "text", text: "ABC" } })).rejects.toThrow(/Base64 yang tidak valid/);
  });
});

describe("proxy Next.js menuju Ruby", () => {
  it("multipart diteruskan persis dan galat validasi Ruby tetap utuh", async () => {
    const form = new FormData();
    form.set("metadata", JSON.stringify({ cipher: "vigenere", key }));
    form.set("file", new Blob([Uint8Array.from([0, 255, 10])]), "a.bin");
    const request = new Request("http://localhost/api/crypto/encrypt", { method: "POST", body: form });
    const original = new Uint8Array(await request.clone().arrayBuffer());
    const error = { message: "Kunci wajib diisi.", field: "keyword", fieldErrors: { keyword: "Wajib." } };
    const fetch = vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
      const forwarded = new Uint8Array(await new Response(init?.body as ReadableStream).arrayBuffer());
      expect(forwarded).toEqual(original);
      expect(new Headers(init?.headers).get("Content-Type")).toBe(request.headers.get("Content-Type"));
      return Response.json(error, { status: 422 });
    });
    const response = await proxyCrypto(request, "encrypt");
    expect(response.status).toBe(422);
    expect(await response.json()).toEqual(error);
    expect(fetch.mock.calls[0]?.[0]).toBe("http://127.0.0.1:4567/api/crypto/encrypt");
  });

  it("backend Ruby mati dikembalikan sebagai HTTP 503", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("connect ECONNREFUSED"));
    const response = await proxyCrypto(new Request("http://localhost/api/crypto/inspect", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: "{}",
    }), "inspect");
    expect(response.status).toBe(503);
    expect((await response.json()).message).toMatch(/Ruby tidak dapat dihubungi/);
  });

  it("timeout backend dikembalikan sebagai HTTP 504", async () => {
    vi.stubEnv("RUBY_API_TIMEOUT_MS", "10");
    vi.spyOn(globalThis, "fetch").mockImplementation((_url, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(new DOMException("Timeout", "AbortError")), { once: true });
    }));
    const response = await proxyCrypto(new Request("http://localhost/api/crypto/encrypt", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: "{}",
    }), "encrypt");
    expect(response.status).toBe(504);
    expect((await response.json()).message).toMatch(/batas waktu/);
  });

  it("ukuran transport terlalu besar ditolak sebelum menghubungi Ruby", async () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    const response = await proxyCrypto(new Request("http://localhost/api/crypto/decrypt", {
      method: "POST", headers: { "Content-Type": "application/json", "Content-Length": String(MAX_PROXY_BODY_BYTES + 1) }, body: "{}",
    }), "decrypt");
    expect(response.status).toBe(413);
    expect(fetch).not.toHaveBeenCalled();
  });
});
```

## tests/unit/container-files.test.ts

```ts
// TC-13 sampai TC-16 (PRD 9.2): kontainer, file, kesalahan, dan tampilan.

import { describe, expect, it } from "vitest";
import { CIPHER_IDS, type CipherId, isAlphaCipher } from "@/lib/crypto/ciphers";
import { parseContainer } from "@/lib/container/format";
import { decryptMessage } from "@/lib/engine/decrypt";
import { encryptMessage } from "@/lib/engine/encrypt";
import { keys, pseudoRandomBytes, sha256, TEST_KEYS } from "./helpers";

const TEXT = "Ujian Tengah Semester Kriptografi, Rabu 30 September 2026. XQ jaJa ZZ!";

/** Menyalin byte ke buffer baru agar tidak ada referensi ke objek hasil enkripsi. */
function fresh(bytes: Uint8Array): Uint8Array {
  return new Uint8Array(Array.from(bytes));
}

function freshKey(cipher: CipherId) {
  return JSON.parse(JSON.stringify(TEST_KEYS[cipher]));
}

describe("TC-13 kontainer lintas sesi", () => {
  for (const cipher of CIPHER_IDS) {
    it(`${cipher}: paket teks didekripsi hanya dengan paket dan kunci`, async () => {
      const enc = await encryptMessage({ cipher, key: TEST_KEYS[cipher], input: { kind: "text", text: TEXT } });
      const container = fresh(enc.container);
      const dec = await decryptMessage({ kind: "package", container, key: freshKey(cipher) });
      expect(dec.cipher).toBe(cipher);
      expect(dec.verified).toBe(true);
      const expected = isAlphaCipher(cipher) ? "UJIANTENGAHSEMESTERKRIPTOGRAFIRABUSEPTEMBERXQJAJAZZ" : TEXT;
      expect(new TextDecoder().decode(dec.bytes)).toBe(expected);
      expect(dec.sha256).toBe(sha256(new TextEncoder().encode(expected)));
    });
  }
  it("metadata tidak memuat kunci atau plainteks", async () => {
    const enc = await encryptMessage({ cipher: "vigenere", key: keys({ keyword: "RAHASIASEKALI" }), input: { kind: "text", text: "PESANYANGSANGATRAHASIA" } });
    const json = JSON.stringify(parseContainer(enc.container).metadata);
    expect(json).not.toContain("RAHASIASEKALI");
    expect(json).not.toContain("PESANYANGSANGATRAHASIA");
  });
});

describe("TC-14 file", () => {
  const files: Array<[string, Uint8Array]> = [
    ["kosong", new Uint8Array(0)],
    ["satu byte", Uint8Array.from([0xff])],
    ["semua nilai byte", Uint8Array.from({ length: 256 }, (_, i) => i)],
    ["biner bukan UTF-8", Uint8Array.from([0xc3, 0x28, 0xa0, 0xa1, 0xe2, 0x28, 0xa1, 0xf0, 0x90, 0x28, 0xbc, 0xfe, 0xff])],
  ];
  for (const cipher of CIPHER_IDS) {
    for (const [label, bytes] of files) {
      it(`${cipher}: ${label}`, async () => {
        const enc = await encryptMessage({
          cipher,
          key: TEST_KEYS[cipher],
          input: { kind: "file", bytes, name: "contoh.bin", type: "application/octet-stream", readAs: "bytes" },
        });
        const dec = await decryptMessage({ kind: "package", container: fresh(enc.container), key: freshKey(cipher) });
        expect(dec.fileName).toBe("contoh.bin");
        expect(dec.bytes.length).toBe(bytes.length);
        expect(sha256(dec.bytes)).toBe(sha256(bytes));
        expect(Buffer.from(dec.bytes).equals(Buffer.from(bytes))).toBe(true);
      });
    }
  }
  it("file beberapa megabyte pada setiap cipher", async () => {
    const big = pseudoRandomBytes(3 * 1024 * 1024, 2026);
    for (const cipher of CIPHER_IDS) {
      const enc = await encryptMessage({
        cipher,
        key: TEST_KEYS[cipher],
        input: { kind: "file", bytes: big, name: "besar.bin", type: "", readAs: "bytes" },
      });
      // Seluruh byte, termasuk "header", ikut berubah: payload tidak memuat 64 byte awal file apa adanya.
      if (!isAlphaCipher(cipher)) expect(Buffer.from(enc.payload.subarray(0, 64)).equals(Buffer.from(big.subarray(0, 64)))).toBe(false);
      const dec = await decryptMessage({ kind: "package", container: enc.container, key: freshKey(cipher) });
      expect(sha256(dec.bytes)).toBe(sha256(big));
    }
  }, 120_000);
});

describe("TC-15 kesalahan tidak menghasilkan sukses palsu", () => {
  async function sample() {
    return encryptMessage({ cipher: "vigenere", key: keys({ keyword: "LEMON" }), input: { kind: "text", text: "ATTACKATDAWN" } });
  }
  it("kunci salah ditolak melalui checksum", async () => {
    const enc = await sample();
    await expect(decryptMessage({ kind: "package", container: enc.container, key: keys({ keyword: "LIME" }) })).rejects.toThrow(/Checksum/);
  });
  it("kunci salah pada file alpha25 ditolak", async () => {
    const bytes = Uint8Array.from({ length: 64 }, (_, i) => i * 3);
    for (const cipher of ["vigenere", "autokey", "playfair", "affine", "hill", "extended-vigenere", "super"] as const) {
      const enc = await encryptMessage({ cipher, key: TEST_KEYS[cipher], input: { kind: "file", bytes, name: "a.bin", type: "", readAs: "bytes" } });
      const wrong = {
        vigenere: keys({ keyword: "SALAH" }),
        autokey: keys({ keyword: "SALAH" }),
        playfair: keys({ keyword: "SALAH" }),
        affine: keys({ affineA: "5", affineB: "1" }),
        hill: keys({ hillMatrix: "3 3 1\n2 5 1\n1 1 1" }),
        "extended-vigenere": keys({ byteKey: "salah" }),
        super: keys({ byteKey: "SuperKunci", columnKey: "SALAH" }),
      }[cipher];
      await expect(decryptMessage({ kind: "package", container: enc.container, key: wrong })).rejects.toThrow();
    }
  });
  it("header terpotong", async () => {
    const enc = await sample();
    await expect(decryptMessage({ kind: "package", container: enc.container.slice(0, 10), key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/terpotong/);
    await expect(decryptMessage({ kind: "package", container: enc.container.slice(0, 20), key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/terpotong/);
  });
  it("bukan paket", async () => {
    await expect(decryptMessage({ kind: "package", container: new TextEncoder().encode("halo dunia bukan paket"), key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/bukan paket/);
  });
  it("versi tidak didukung", async () => {
    const c = (await sample()).container.slice();
    c[8] = 2;
    await expect(decryptMessage({ kind: "package", container: c, key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/Versi paket 2/);
  });
  it("panjang payload tidak cocok", async () => {
    const c = (await sample()).container;
    await expect(decryptMessage({ kind: "package", container: c.slice(0, c.length - 1), key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/Panjang payload/);
  });
  it("metadata rusak", async () => {
    const c = (await sample()).container.slice();
    c[13] = 0x7b + 1; // karakter pertama JSON "{" diganti "|"
    await expect(decryptMessage({ kind: "package", container: c, key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/Metadata paket rusak/);
  });
  it("checksum dalam metadata diubah", async () => {
    const enc = await sample();
    const tampered = Buffer.from(enc.container);
    const at = tampered.indexOf(enc.metadata.sha256, 0, "latin1");
    expect(at).toBeGreaterThan(13);
    tampered.write("0".repeat(64), at, "latin1");
    await expect(decryptMessage({ kind: "package", container: tampered, key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/Checksum/);
  });
});

describe("TC-16 perbandingan tampilan", () => {
  for (const cipher of CIPHER_IDS) {
    it(`${cipher}: Base64 payload sama dengan payload dalam kontainer`, async () => {
      const enc = await encryptMessage({ cipher, key: TEST_KEYS[cipher], input: { kind: "text", text: TEXT } });
      const parsed = parseContainer(enc.container);
      expect(Buffer.from(parsed.payload).toString("base64")).toBe(Buffer.from(enc.payload).toString("base64"));
      // Unduhan .dat adalah kontainer biner, bukan teks Base64.
      expect(new TextDecoder().decode(enc.container.subarray(0, 8))).toBe("UTSKRIPT");
      expect(enc.container[8]).toBe(1);
      // Payload Base64 yang didekode lalu didekripsi mentah memberi hasil yang sama.
      if (cipher !== "playfair" && cipher !== "hill") {
        const dec = await decryptMessage({ kind: "payload-base64", cipher, base64: Buffer.from(enc.payload).toString("base64"), key: TEST_KEYS[cipher] });
        expect(Buffer.from(dec.bytes).equals(Buffer.from(enc.plainBytes))).toBe(true);
      }
    });
  }
});
```

## tests/unit/edge-cases.test.ts

```ts
// Kasus batas TC-01 sampai TC-12 (PRD 9.2). Nilai acuan dihitung manual.

import { describe, expect, it } from "vitest";
import { alpha25Decode, alpha25Encode } from "@/lib/codecs/alpha25";
import { normalizeAlphabetic } from "@/lib/codecs/alphabet";
import { decodeBase64, encodeBase64 } from "@/lib/codecs/base64";
import { autokeyDecrypt, autokeyEncrypt } from "@/lib/crypto/autokey";
import { extendedVigenereDecrypt, extendedVigenereEncrypt } from "@/lib/crypto/extended-vigenere";
import { hillApply, hillDecryptRaw, hillEncrypt, hillInverseMod26 } from "@/lib/crypto/hill";
import { buildPlayfairMatrix, playfairDecryptRaw, playfairEncrypt, playfairRestore } from "@/lib/crypto/playfair";
import { columnarDecrypt, columnarEncrypt } from "@/lib/crypto/transposition";
import { vigenereDecrypt, vigenereEncrypt } from "@/lib/crypto/vigenere";
import { decryptMessage } from "@/lib/engine/decrypt";
import { encryptMessage } from "@/lib/engine/encrypt";
import { parseKey } from "@/lib/validation/keys";
import { idx, keys, str } from "./helpers";

describe("TC-01 normalisasi", () => {
  it("Serang pukul 10.30! menjadi SERANGPUKUL", () => {
    expect(normalizeAlphabetic("Serang pukul 10.30!")).toBe("SERANGPUKUL");
  });
  it("huruf non-ASCII tidak ditransliterasi", () => {
    expect(normalizeAlphabetic("Straße ıi Ärger ﬁ")).toBe("STRAEIRGER");
  });
});

describe("TC-02 panjang kata kunci", () => {
  it("kunci satu huruf", () => {
    expect(str(vigenereEncrypt(idx("HELLO"), idx("B")))).toBe("IFMMP");
  });
  it("kunci lebih pendek (TV-01)", () => {
    expect(str(vigenereEncrypt(idx("ATTACKATDAWN"), idx("LEMON")))).toBe("LXFOPVEFRNHR");
  });
  it("kunci sama panjang", () => {
    expect(str(vigenereEncrypt(idx("HELLO"), idx("WORLD")))).toBe("DSCWR");
    expect(str(vigenereDecrypt(idx("DSCWR"), idx("WORLD")))).toBe("HELLO");
  });
  it("kunci lebih panjang dari pesan", () => {
    expect(str(vigenereEncrypt(idx("HELLO"), idx("ABCDEFGHIJ")))).toBe("HFNOS");
    expect(str(vigenereDecrypt(idx("HFNOS"), idx("ABCDEFGHIJ")))).toBe("HELLO");
  });
  it("karakter yang dibuang tidak menggeser indeks kunci", async () => {
    const res = await encryptMessage({ cipher: "vigenere", key: keys({ keyword: "lemon" }), input: { kind: "text", text: "attack at dawn!" } });
    expect(new TextDecoder().decode(res.payload)).toBe("LXFOPVEFRNHR");
  });
});

describe("TC-03 Auto-Key", () => {
  it("pesan melampaui primer beberapa kali", () => {
    expect(str(autokeyEncrypt(idx("ATTACKATDAWN"), idx("K")))).toBe("KTMTCMKTWDWJ");
    expect(str(autokeyDecrypt(idx("KTMTCMKTWDWJ"), idx("K")))).toBe("ATTACKATDAWN");
  });
  it("dekripsi tidak sama dengan mengulang primer seperti Vigenere", () => {
    expect(str(vigenereDecrypt(idx("KTMTCMKTWDWJ"), idx("K")))).not.toBe("ATTACKATDAWN");
  });
});

describe("TC-04 Extended Vigenere", () => {
  const all = Uint8Array.from({ length: 256 }, (_, i) => i);
  it("seluruh nilai byte 0-255 dengan kunci berisi byte nol", () => {
    const key = Uint8Array.from([0, 255, 128]);
    const enc = extendedVigenereEncrypt(all, key);
    expect(enc[0]).toBe(0);
    expect(enc[1]).toBe(0); // 1 + 255 = 256 mod 256
    expect(enc[2]).toBe(130);
    expect(enc[255]).toBe(255); // 255 + 0
    expect(Array.from(extendedVigenereDecrypt(enc, key))).toEqual(Array.from(all));
  });
  it("teks UTF-8 multibyte melalui paket", async () => {
    const text = "Kriptografi 漢字 é 🔐";
    const enc = await encryptMessage({ cipher: "extended-vigenere", key: keys({ byteKey: "kunci" }), input: { kind: "text", text } });
    expect(enc.plainBytes.length).toBe(Buffer.from(text, "utf8").length);
    const dec = await decryptMessage({ kind: "package", container: enc.container, key: keys({ byteKey: "kunci" }) });
    expect(new TextDecoder().decode(dec.bytes)).toBe(text);
    expect(dec.representation).toBe("utf8");
  });
  it("kunci heksadesimal 00 valid, kunci kosong ditolak", () => {
    expect(parseKey("extended-vigenere", keys({ byteKey: "00", byteKeyFormat: "hex" })).ok).toBe(true);
    expect(parseKey("extended-vigenere", keys({ byteKey: "" })).ok).toBe(false);
    expect(parseKey("extended-vigenere", keys({ byteKey: "0", byteKeyFormat: "hex" })).ok).toBe(false);
  });
});

describe("TC-05 Playfair", () => {
  const key = idx("PLAYFAIREXAMPLE");
  const matrix = buildPlayfairMatrix(key);
  const cases: Array<[string, string, string]> = [
    // [masukan, teks siap pasangan, cipherteks]
    ["BALLOON", "BALXLOON", "DPYRANQO"],
    ["JIG", "IXIG", "RMXB"],
    ["XX", "XQXQ", "GWGW"],
    ["XQX", "XQXQ", "GWGW"],
  ];
  for (const [input, prepared, cipher] of cases) {
    it(`${input} dienkripsi dan dipulihkan tepat`, () => {
      const out = playfairEncrypt(idx(input), key);
      expect(str(out.prepared)).toBe(prepared);
      expect(str(out.cipher)).toBe(cipher);
      const raw = playfairDecryptRaw(out.cipher, matrix);
      expect(str(raw)).toBe(prepared);
      expect(str(playfairRestore(raw, out.fillerBits, out.jBits))).toBe(input);
    });
  }
  for (const input of ["HELLOX", "TESQ", "QUIZX", "ABC", "JJJ", "XXQQJ"]) {
    it(`X, Q, J asli dan panjang ganjil pulih melalui paket: ${input}`, async () => {
      const k = keys({ keyword: "PLAYFAIREXAMPLE" });
      const enc = await encryptMessage({ cipher: "playfair", key: k, input: { kind: "text", text: input } });
      const dec = await decryptMessage({ kind: "package", container: enc.container, key: k });
      expect(new TextDecoder().decode(dec.bytes)).toBe(input);
    });
  }
  it("cipherteks mentah berpanjang ganjil ditolak", async () => {
    await expect(
      decryptMessage({ kind: "raw-letters", cipher: "playfair", text: "BMO", key: keys({ keyword: "PLAYFAIREXAMPLE" }) }),
    ).rejects.toThrow(/genap/);
  });
});

describe("TC-06 Affine", () => {
  it("a = 2 ditolak", () => {
    const res = parseKey("affine", keys({ affineA: "2", affineB: "3" }));
    expect(res.ok).toBe(false);
  });
  it("a = 13 ditolak", () => {
    expect(parseKey("affine", keys({ affineA: "13", affineB: "0" })).ok).toBe(false);
  });
  it("a = -21 dan b = 34 direduksi menjadi a = 5, b = 8", async () => {
    const res = parseKey("affine", keys({ affineA: "-21", affineB: "34" }));
    expect(res.ok && res.key.cipher === "affine" && res.key.key).toEqual({ a: 5, b: 8 });
    const enc = await encryptMessage({ cipher: "affine", key: keys({ affineA: "-21", affineB: "34" }), input: { kind: "text", text: "AFFINECIPHER" } });
    expect(new TextDecoder().decode(enc.payload)).toBe("IHHWVCSWFRCP");
  });
  it("a = 31 dan b = -18 direduksi menjadi a = 5, b = 8", () => {
    const res = parseKey("affine", keys({ affineA: "31", affineB: "-18" }));
    expect(res.ok && res.key.cipher === "affine" && res.key.key).toEqual({ a: 5, b: 8 });
  });
  it("bukan bilangan bulat ditolak", () => {
    expect(parseKey("affine", keys({ affineA: "5.5", affineB: "1" })).ok).toBe(false);
  });
});

describe("TC-07 Hill matriks tidak valid", () => {
  for (const matrix of ["1 2\n2 4", "2 0\n0 1", "13 0\n0 1", "1 2 3\n4 5 6"]) {
    it(`ditolak: ${matrix.replace(/\n/g, " / ")}`, () => {
      expect(parseKey("hill", keys({ hillMatrix: matrix })).ok).toBe(false);
    });
  }
  it("matriks 1 x 1 ditolak", () => {
    expect(parseKey("hill", keys({ hillMatrix: "3" })).ok).toBe(false);
  });
});

describe("TC-08 Hill [[2,1],[13,7]]", () => {
  const K = [
    [2, 1],
    [13, 7],
  ];
  it("diterima dengan invers [[7,25],[13,2]]", () => {
    expect(hillInverseMod26(K)).toEqual([
      [7, 25],
      [13, 2],
    ]);
    expect(parseKey("hill", keys({ hillMatrix: "[[2,1],[13,7]]" })).ok).toBe(true);
  });
  it("HI menjadi WR dan kembali", () => {
    expect(str(hillEncrypt(idx("HI"), K).cipher)).toBe("WR");
    expect(str(hillDecryptRaw(idx("WR"), K))).toBe("HI");
  });
});

describe("TC-09 padding Hill", () => {
  const K = [
    [6, 24, 1],
    [13, 16, 10],
    [20, 17, 15],
  ];
  it("ACTX dengan X asli dipadding dua X", () => {
    const out = hillEncrypt(idx("ACTX"), K);
    expect(out.padCount).toBe(2);
    expect(str(out.cipher)).toBe("POHLNA");
    expect(str(hillApply(out.cipher, hillInverseMod26(K)!))).toBe("ACTXXX");
  });
  it("paket membuang tepat padding dan mempertahankan X asli", async () => {
    const k = keys({ hillMatrix: "6 24 1; 13 16 10; 20 17 15" });
    for (const text of ["ACT", "ACTX", "ACTXX", "XXXX"]) {
      const enc = await encryptMessage({ cipher: "hill", key: k, input: { kind: "text", text } });
      const dec = await decryptMessage({ kind: "package", container: enc.container, key: k });
      expect(new TextDecoder().decode(dec.bytes)).toBe(text);
    }
  });
  it("dekripsi mentah mempertahankan padding, panjang bukan kelipatan n ditolak", async () => {
    const k = keys({ hillMatrix: "6 24 1; 13 16 10; 20 17 15" });
    const dec = await decryptMessage({ kind: "raw-letters", cipher: "hill", text: "POHLNA", key: k });
    expect(new TextDecoder().decode(dec.bytes)).toBe("ACTXXX");
    await expect(decryptMessage({ kind: "raw-letters", cipher: "hill", text: "POHL", key: k })).rejects.toThrow(/kelipatan/);
  });
});

describe("TC-10 transposisi kolom", () => {
  it("kolom lebih banyak daripada byte", () => {
    const enc = columnarEncrypt(Uint8Array.from([10, 20]), idx("DCBA"));
    expect(Array.from(enc)).toEqual([20, 10]);
    expect(Array.from(columnarDecrypt(enc, idx("DCBA")))).toEqual([10, 20]);
  });
  it("baris terakhir tidak penuh", () => {
    const data = Uint8Array.from({ length: 10 }, (_, i) => i);
    const enc = columnarEncrypt(data, idx("CAB"));
    expect(Array.from(enc)).toEqual([1, 4, 7, 2, 5, 8, 0, 3, 6, 9]);
    expect(Array.from(columnarDecrypt(enc, idx("CAB")))).toEqual(Array.from(data));
  });
  it("huruf kunci berulang BABA stabil", () => {
    const data = Uint8Array.from([1, 3, 3, 5, 255, 1, 129]);
    expect(Array.from(columnarEncrypt(data, idx("BABA")))).toEqual([3, 1, 5, 1, 255, 3, 129]);
  });
});

describe("TC-11 codec alpha25-v1", () => {
  it("setiap nilai byte pulih tanpa perubahan", () => {
    const all = Uint8Array.from({ length: 256 }, (_, i) => i);
    const letters = alpha25Encode(all);
    expect(str(letters.subarray(0, 2))).toBe("AA");
    expect(str(letters.subarray(510, 512))).toBe("LF");
    expect(letters.includes(9)).toBe(false);
    expect(Array.from(alpha25Decode(letters))).toEqual(Array.from(all));
  });
  it("pasangan tidak valid ditolak", () => {
    expect(() => alpha25Decode(idx("ABC"))).toThrow(/ganjil/);
    expect(() => alpha25Decode(idx("AJ"))).toThrow(/J/);
    expect(() => alpha25Decode(idx("LG"))).toThrow(/256/);
    expect(() => alpha25Decode(idx("ZZ"))).toThrow(/624/);
  });
});

describe("TC-12 Base64", () => {
  it("cocok dengan Buffer Node dan kapitalisasi dipertahankan", () => {
    const data = Uint8Array.from([0, 1, 2, 250, 251, 252, 253, 254, 255, 77, 97, 110]);
    for (let len = 0; len <= data.length; len++) {
      const part = data.subarray(0, len);
      const b64 = encodeBase64(part);
      expect(b64).toBe(Buffer.from(part).toString("base64"));
      expect(Array.from(decodeBase64(b64))).toEqual(Array.from(part));
    }
    expect(encodeBase64(new TextEncoder().encode("Man"))).toBe("TWFu");
    expect(Array.from(decodeBase64("twfu"))).not.toEqual(Array.from(decodeBase64("TWFu")));
  });
  it("input rusak ditolak", () => {
    expect(() => decodeBase64("TWF")).toThrow(/kelipatan 4/);
    expect(() => decodeBase64("TW=u")).toThrow();
    expect(() => decodeBase64("TWF!")).toThrow(/bukan karakter Base64/);
    expect(() => decodeBase64("TR==")).toThrow(/Bit sisa/);
  });
  it("angka, +, /, = tidak dibuang saat dekripsi Base64 payload", async () => {
    const payload = Uint8Array.from([0xfb, 0xff, 0xbf, 0x3e]); // "+/+/Pg=="
    const b64 = Buffer.from(payload).toString("base64");
    expect(b64).toBe("+/+/Pg==");
    const dec = await decryptMessage({ kind: "payload-base64", cipher: "extended-vigenere", base64: b64, key: keys({ byteKey: "01", byteKeyFormat: "hex" }) });
    expect(Array.from(dec.bytes)).toEqual([0xfa, 0xfe, 0xbe, 0x3d]);
  });
});
```

## tests/unit/helpers.ts

```ts
import { createHash } from "node:crypto";
import { EMPTY_KEY_VALUES, type KeyFormValues } from "@/lib/validation/keys";

/** Indeks huruf dihitung langsung dari kode karakter, tanpa memanggil kode produksi. */
export function idx(letters: string): Uint8Array {
  return Uint8Array.from(letters, (ch) => ch.charCodeAt(0) - 65);
}

export function str(indices: Uint8Array): string {
  return String.fromCharCode(...Array.from(indices, (i) => i + 65));
}

export function keys(values: Partial<KeyFormValues>): KeyFormValues {
  return { ...EMPTY_KEY_VALUES, ...values };
}

/** SHA-256 dari node:crypto sebagai pembanding independen. */
export function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

/** PRNG deterministik (mulberry32) untuk data uji berukuran besar. */
export function pseudoRandomBytes(length: number, seed: number): Uint8Array {
  const out = new Uint8Array(length);
  let a = seed >>> 0;
  for (let i = 0; i < length; i++) {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    out[i] = ((t ^ (t >>> 14)) >>> 0) & 255;
  }
  return out;
}

/** Kunci uji yang tercatat untuk setiap cipher. */
export const TEST_KEYS = {
  vigenere: keys({ keyword: "KRIPTOGRAFI" }),
  autokey: keys({ keyword: "UTSKRIPTO" }),
  "extended-vigenere": keys({ byteKey: "Kunci Byte 2026!", byteKeyFormat: "text" }),
  playfair: keys({ keyword: "MONARCHY" }),
  affine: keys({ affineA: "7", affineB: "10" }),
  hill: keys({ hillMatrix: "6 24 1\n13 16 10\n20 17 15" }),
  super: keys({ byteKey: "SuperKunci", byteKeyFormat: "text", columnKey: "TRANSPOSISI" }),
  "enigma-i": keys({ rotors: ["I", "II", "III"], ringSettings: [1, 1, 1], initialPositions: ["A", "A", "A"], reflector: "B", plugboard: "" }),
} as const;
```

## tests/unit/migration-compatibility.test.ts

```ts
// Paket dan payload ini dibekukan sebelum implementasi Ruby, memakai mesin
// TypeScript lama. Expected output tidak dihitung dengan mesin yang diuji.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { CipherId } from "@/lib/crypto/ciphers";
import { decryptMessage } from "@/lib/engine/decrypt";
import { encryptMessage } from "@/lib/engine/encrypt";
import type { KeyFormValues } from "@/lib/validation/keys";

interface LegacyCase {
  cipher: CipherId;
  mode: "text" | "file";
  key: KeyFormValues;
  input: { text?: string; bytesBase64?: string; name?: string; type?: string };
  packageBase64: string;
  payloadBase64: string;
  plainBase64: string;
  sha256: string;
}

const baseline = JSON.parse(readFileSync("tests/migration/legacy-typescript-v1.json", "utf8")) as { cases: LegacyCase[] };
const bytes = (base64: string) => new Uint8Array(Buffer.from(base64, "base64"));

describe("TC-24 Ruby compatible with original seven-cipher packages", () => {
  for (const legacy of baseline.cases) {
    it(`${legacy.cipher} ${legacy.mode}: old package recovers original bytes and name`, async () => {
      const result = await decryptMessage({ kind: "package", container: bytes(legacy.packageBase64), key: legacy.key });
      expect(Buffer.from(result.bytes).toString("base64")).toBe(legacy.plainBase64);
      expect(result.sha256).toBe(legacy.sha256);
      expect(result.verified).toBe(true);
      if (legacy.mode === "file") expect(result.fileName).toBe(legacy.input.name);
    });

    it(`${legacy.cipher} ${legacy.mode}: new encryption retains original payload`, async () => {
      const input = legacy.mode === "text"
        ? { kind: "text" as const, text: legacy.input.text! }
        : { kind: "file" as const, bytes: bytes(legacy.input.bytesBase64!), name: legacy.input.name!, type: legacy.input.type!, readAs: "bytes" as const };
      const result = await encryptMessage({ cipher: legacy.cipher, key: legacy.key, input });
      expect(Buffer.from(result.payload).toString("base64")).toBe(legacy.payloadBase64);
      expect(Buffer.from(result.plainBytes).toString("base64")).toBe(legacy.plainBase64);
      expect(result.metadata.sha256).toBe(legacy.sha256);
    });
  }
});
```

## tests/unit/vectors.test.ts

```ts
// Vektor acuan TV-01 sampai TV-07 (PRD 9.1). Nilai yang diharapkan dibekukan
// sebagai literal dan diperiksa pada arah enkripsi maupun dekripsi.

import { describe, expect, it } from "vitest";
import { affineDecrypt, affineEncrypt } from "@/lib/crypto/affine";
import { autokeyDecrypt, autokeyEncrypt } from "@/lib/crypto/autokey";
import { extendedVigenereDecrypt, extendedVigenereEncrypt } from "@/lib/crypto/extended-vigenere";
import { hillDecryptRaw, hillEncrypt } from "@/lib/crypto/hill";
import { buildPlayfairMatrix, playfairDecryptRaw, playfairEncrypt, playfairRestore } from "@/lib/crypto/playfair";
import { superDecrypt, superEncryptStages } from "@/lib/crypto/super-encryption";
import { columnOrder } from "@/lib/crypto/transposition";
import { vigenereDecrypt, vigenereEncrypt } from "@/lib/crypto/vigenere";
import { idx, str } from "./helpers";

describe("TV-01 Vigenere standar", () => {
  it("ATTACKATDAWN + LEMON = LXFOPVEFRNHR", () => {
    expect(str(vigenereEncrypt(idx("ATTACKATDAWN"), idx("LEMON")))).toBe("LXFOPVEFRNHR");
  });
  it("dekripsi LXFOPVEFRNHR", () => {
    expect(str(vigenereDecrypt(idx("LXFOPVEFRNHR"), idx("LEMON")))).toBe("ATTACKATDAWN");
  });
});

describe("TV-02 Auto-Key plaintext", () => {
  it("ATTACKATDAWN + QUEENLY = QNXEPVYTWTWP", () => {
    expect(str(autokeyEncrypt(idx("ATTACKATDAWN"), idx("QUEENLY")))).toBe("QNXEPVYTWTWP");
  });
  it("dekripsi QNXEPVYTWTWP", () => {
    expect(str(autokeyDecrypt(idx("QNXEPVYTWTWP"), idx("QUEENLY")))).toBe("ATTACKATDAWN");
  });
});

describe("TV-03 Extended Vigenere", () => {
  it("[0,65,255] + [1,2] = [1,67,0]", () => {
    expect(Array.from(extendedVigenereEncrypt(Uint8Array.from([0, 65, 255]), Uint8Array.from([1, 2])))).toEqual([1, 67, 0]);
  });
  it("dekripsi [1,67,0]", () => {
    expect(Array.from(extendedVigenereDecrypt(Uint8Array.from([1, 67, 0]), Uint8Array.from([1, 2])))).toEqual([0, 65, 255]);
  });
});

describe("TV-04 Playfair", () => {
  const key = idx("PLAYFAIREXAMPLE");
  it("matriks per baris", () => {
    expect(str(buildPlayfairMatrix(key).cells)).toBe("PLAYFIREXMBCDGHKNOQSTUVWZ");
  });
  it("HIDETHEGOLDINTHETREESTUMP menjadi BMODZBXDNABEKUDMUIXMMOUVIF", () => {
    const out = playfairEncrypt(idx("HIDETHEGOLDINTHETREESTUMP"), key);
    expect(str(out.prepared)).toBe("HIDETHEGOLDINTHETREXESTUMP");
    expect(str(out.cipher)).toBe("BMODZBXDNABEKUDMUIXMMOUVIF");
  });
  it("dekripsi mentah mempertahankan pengisi, dekripsi paket membuangnya", () => {
    const raw = playfairDecryptRaw(idx("BMODZBXDNABEKUDMUIXMMOUVIF"), buildPlayfairMatrix(key));
    expect(str(raw)).toBe("HIDETHEGOLDINTHETREXESTUMP");
    const { fillerBits, jBits } = playfairEncrypt(idx("HIDETHEGOLDINTHETREESTUMP"), key);
    expect(str(playfairRestore(raw, fillerBits, jBits))).toBe("HIDETHEGOLDINTHETREESTUMP");
  });
});

describe("TV-05 Affine", () => {
  it("AFFINECIPHER, a=5, b=8 = IHHWVCSWFRCP", () => {
    expect(str(affineEncrypt(idx("AFFINECIPHER"), { a: 5, b: 8 }))).toBe("IHHWVCSWFRCP");
  });
  it("dekripsi IHHWVCSWFRCP", () => {
    expect(str(affineDecrypt(idx("IHHWVCSWFRCP"), { a: 5, b: 8 }))).toBe("AFFINECIPHER");
  });
});

describe("TV-06 Hill vektor kolom", () => {
  const K = [
    [6, 24, 1],
    [13, 16, 10],
    [20, 17, 15],
  ];
  it("ACT menjadi POH", () => {
    const out = hillEncrypt(idx("ACT"), K);
    expect(str(out.cipher)).toBe("POH");
    expect(out.padCount).toBe(0);
  });
  it("dekripsi POH", () => {
    expect(str(hillDecryptRaw(idx("POH"), K))).toBe("ACT");
  });
});

describe("TV-07 Super Enkripsi", () => {
  const plain = Uint8Array.from([0, 1, 2, 3, 254, 255, 128]);
  const byteKey = Uint8Array.from([1, 2]);
  const colKey = idx("BABA");
  it("urutan kolom BABA adalah [1,3,0,2]", () => {
    expect(columnOrder(colKey)).toEqual([1, 3, 0, 2]);
  });
  it("tahap perantara dan hasil akhir", () => {
    const stages = superEncryptStages(plain, byteKey, colKey);
    expect(Array.from(stages.vigenere)).toEqual([1, 3, 3, 5, 255, 1, 129]);
    expect(Array.from(stages.cipher)).toEqual([3, 1, 5, 1, 255, 3, 129]);
  });
  it("dekripsi [3,1,5,1,255,3,129]", () => {
    expect(Array.from(superDecrypt(Uint8Array.from([3, 1, 5, 1, 255, 3, 129]), byteKey, colKey))).toEqual([
      0, 1, 2, 3, 254, 255, 128,
    ]);
  });
});
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext", "webworker"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx", "tests/**/*.ts", "*.ts", ".next/types/**/*.ts", ".next/dev/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## vitest.config.ts

```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
    testTimeout: 60_000,
    reporters: ["default", "json"],
    outputFile: { json: "evidence/unit-test-results.json" },
  },
});
```

## vitest.evidence.config.ts

```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Menjalankan skenario bukti (40 skenario file Ruby dan contoh teks) lalu menulis
// hasil aktual ke folder evidence/.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/evidence/**/*.test.ts"],
    environment: "node",
    testTimeout: 300_000,
    fileParallelism: false,
  },
});
```
