# Kriptografi 8 Cipher

Aplikasi web untuk mengenkripsi dan mendekripsi pesan maupun file dengan delapan cipher, yaitu Vigenere, Auto-Key Vigenere, Extended Vigenere, Playfair, Affine, Hill, Super Enkripsi, dan Enigma I. Antarmuka memakai Next.js, sedangkan seluruh proses cipher dijalankan oleh backend Ruby.

## Yang perlu tersedia

Pastikan perangkat berikut sudah terpasang dan bisa dipanggil dari terminal.

- Node.js 22.12 atau lebih baru
- pnpm 10
- Ruby 3.2 atau lebih baru (di bawah 4.0) beserta Bundler

## 1. Pasang dependensi proyek

Jalankan dari folder root proyek. Langkah ini cukup dilakukan sekali.

```bash
pnpm install
cd apps/api
bundle install
cd ../..
```

## 2. Jalankan aplikasi

```bash
pnpm dev
```

Perintah ini menyalakan backend Ruby di `http://127.0.0.1:4567` dan antarmuka web sekaligus. Setelah terminal menampilkan alamat web, buka `http://localhost:3000` di browser. Tekan `Ctrl + C` di terminal untuk menghentikan keduanya.

Untuk menjalankan versi produksi, build terlebih dahulu lalu jalankan.

```bash
pnpm build
pnpm start
```

## 3. Mencoba enkripsi dan dekripsi teks

1. Pada panel **Pilih cipher**, pilih **Vigenere standar**.
2. Pilih operasi **Enkripsi** dan jenis masukan **Teks**.
3. Isi pesan `attack at dawn` dan kata kunci `lemon`.
4. Tekan tombol **Enkripsi**. Cipherteks yang muncul adalah `LXFOPVEFRNHR`.
5. Tekan **Unduh paket .dat** untuk menyimpan hasil.
6. Pilih operasi **Dekripsi** dan format masukan **Paket .dat (unggah file)**, lalu unggah berkas `.dat` tadi.
7. Isi kata kunci `lemon` lalu tekan **Dekripsi**. Plainteks `ATTACKATDAWN` tampil kembali.

Pada cipher huruf, angka, spasi, dan tanda baca dibuang sebelum enkripsi. Karena itu hasil dekripsi berupa huruf kapital tanpa spasi.

## 4. Mencoba enkripsi dan dekripsi file

1. Pilih cipher, operasi **Enkripsi**, dan jenis masukan **File**.
2. Unggah file apa saja, misalnya gambar, audio, video, atau database. Contoh file tersedia di folder `fixtures`.
3. Isi kunci lalu tekan **Enkripsi**. Unduh hasilnya sebagai `<nama file>.dat`.
4. Untuk memulihkan, pilih operasi **Dekripsi**, unggah file `.dat`, isi kunci yang sama, lalu tekan **Dekripsi**.
5. Unduh file hasil. Nama dan ekstensinya kembali seperti file asal.

Untuk Enigma, kunci berupa pengaturan rotor, ring setting, posisi awal, reflector, dan plugboard. Dekripsi harus memakai pengaturan awal yang sama dengan saat enkripsi.

## Jika ada kendala

| Kendala | Cara mengatasi |
| --- | --- |
| Muncul pesan `Backend Ruby gagal dimulai` | Pastikan perintah `ruby -v` berjalan di terminal dan `bundle install` sudah dijalankan di folder `apps/api`. Bila Ruby tidak ada di PATH, isi variabel lingkungan `RUBY_COMMAND` dengan lokasi file `ruby` atau `ruby.exe` |
| Ingin memastikan backend menyala | Buka `http://127.0.0.1:4567/health`. Backend yang aktif membalas `"status":"ok"` |
| Port 4567 sudah dipakai program lain | Salin `.env.example` menjadi `.env.local`, lalu ganti port pada `RUBY_API_URL` |
