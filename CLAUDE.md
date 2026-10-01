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
