Proyek aplikasi web kriptografi ini sudah selesai. Kumpulkan informasi implementasi, hasil pengujian, kode program, dan screenshot yang diperlukan untuk menyusun laporan UTS Kriptografi berdasarkan proyek yang benar-benar ada.

Pertahankan kode dan konfigurasi aplikasi. Fokus pekerjaan ini adalah menyiapkan bahan laporan.

1. Baca sumber proyek

Baca PDF soal UTS jika tersedia, CLAUDE.md, prd.md, README, konfigurasi dependensi, implementasi algoritma, antarmuka, serta hasil pengujian.

Gunakan kode dan hasil eksekusi sebagai dasar menjelaskan implementasi. PRD merupakan rencana sehingga fitur yang hanya tercantum di PRD tidak boleh dianggap sudah diterapkan.

2. Jelaskan implementasi aktual

Tuliskan tujuan aplikasi, teknologi yang digunakan, pembagian komponen, serta alur pengguna dari memasukkan pesan dan kunci sampai memperoleh hasil enkripsi atau dekripsi.

Jelaskan implementasi ketujuh cipher wajib berikut.

- Vigenere Cipher standar.
- Auto-Key Vigenere Cipher.
- Extended Vigenere Cipher.
- Playfair Cipher.
- Affine Cipher.
- Hill Cipher.
- Super Enkripsi berupa Extended Vigenere dan transposisi kolom.

Untuk setiap cipher, jelaskan rumus atau aturan transformasi, bentuk kunci, validasi, proses enkripsi, proses dekripsi, serta satu contoh hasil aktual.

Jelaskan juga penerapan Enigma dan penggunaan Ruby jika memang ada. Keduanya merupakan bonus dalam soal.

3. Periksa penanganan teks dan file

Dokumentasikan perilaku aktual aplikasi mengenai normalisasi huruf, pembuangan angka dan tanda baca pada mode alfabet, tampilan Base64, pembacaan seluruh byte file termasuk header, unduhan cipherteks, serta pemulihan nama dan ekstensi file.

Periksa penanganan I/J dan huruf pengisi Playfair, padding Hill, serta urutan transposisi pada Super Enkripsi.

Jika aplikasi menggunakan codec, metadata, atau kontainer untuk memulihkan file, jelaskan fungsinya berdasarkan implementasi. Bedakan Base64 payload dengan Base64 paket apabila keduanya tersedia.

4. Siapkan hasil pengujian yang dapat diperiksa

Gunakan hasil uji yang sesuai dengan kode saat ini. Jalankan pengujian tambahan yang diperlukan untuk melengkapi bukti tugas.

Periksa masukan teks pada setiap cipher serta dukungan terhadap lima kategori file yang disebut dalam soal, yaitu teks, gambar, database, audio, dan video. Gunakan file dengan format yang valid dan aman dibagikan.

Catat masukan, kunci contoh, hasil enkripsi, hasil dekripsi, dan kesimpulan pengujian. Untuk file utuh, bandingkan byte, ukuran, dan SHA-256 file asal dengan hasil dekripsi. Periksa pula dekripsi file hasil unduhan setelah aplikasi dimuat ulang.

Pada mode teks alfabet, bandingkan hasil dekripsi dengan teks yang telah dinormalisasi. Jangan menganggap angka atau spasi yang sengaja dibuang sebagai kegagalan pemulihan file.

Jangan membuat angka pengujian, checksum, waktu pemrosesan, atau status keberhasilan tanpa hasil eksekusi.

Susun tabel dengan kolom No, Spek, Berhasil, Kurang Berhasil, dan Keterangan. Cantumkan tujuh cipher wajib serta dua bonus mengikuti soal. Masalah fungsional yang ditemukan harus dijelaskan secara spesifik.

5. Ambil screenshot aplikasi

Jalankan aplikasi dan ambil screenshot tampilan utama, hasil penggunaan setiap cipher, serta contoh pengolahan kelima kategori file.

Pilih tangkapan yang memperlihatkan algoritma, masukan, keluaran, dan hasil pemulihan dengan jelas. Gunakan screenshot dari aplikasi yang berjalan.

Berikan keterangan setiap gambar berdasarkan isi yang terlihat. Contohnya, “Hasil dekripsi gambar mengembalikan ukuran dan checksum yang sama dengan gambar asal.” Gunakan pernyataan tersebut hanya jika didukung hasil pengujian.

6. Susun bahan tertulis

Buat BAHAN_LAPORAN_UTS_KRIPTOGRAFI2.md yang memuat uraian aplikasi, implementasi algoritma, antarmuka, contoh penggunaan, hasil pengujian, pembahasan, dan kesimpulan berdasarkan temuan aktual.

Gunakan bahasa Indonesia yang natural, netral, dan langsung. Jelaskan bukti melalui hasilnya, bukan hanya menyebut kode seperti E-01 atau nama folder internal. Nama fungsi dan berkas digunakan pada bagian kode atau petunjuk menjalankan jika diperlukan.

Hindari narasi administratif, cerita pengerjaan oleh agen, pengulangan, em dash, en dash, dan titik koma dalam prosa. Keterbatasan dibahas jika memengaruhi kebenaran hasil atau pemenuhan tugas.

7. Siapkan paket untuk penyusunan laporan

Buat BAHAN_LAPORAN_UTS_KRIPTOGRAFI2.zip yang memuat dokumen bahan laporan, screenshot beserta keterangannya, file contoh, hasil enkripsi dan dekripsi, ringkasan pengujian, kode program lengkap milik proyek, dan README cara menjalankan.

Sertakan konfigurasi serta lockfile yang diperlukan. Keluarkan dependensi terpasang, cache, hasil build, kredensial, dan data pribadi dari paket.

Kode sumber lengkap dan README diperlukan karena soal meminta keduanya dalam laporan. Sertakan bentuk teks yang mudah dimasukkan ke lampiran.

Periksa bahwa bahan tertulis, screenshot, contoh hasil, dan status pengujian saling sesuai. Setelah selesai, berikan lokasi paket dan ringkasan singkat isinya.