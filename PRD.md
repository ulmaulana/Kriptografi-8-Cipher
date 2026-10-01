# PRD Aplikasi Web Kriptografi UTS

## 1. Tujuan dan sumber kebutuhan

Mengembangkan aplikasi web dengan GUI untuk mengenkripsi dan mendekripsi pesan yang diketik maupun file. Aplikasi mencakup tujuh cipher wajib dalam naskah Soal UTS Kriptografi, Bonus 1 berupa Enigma Cipher, dan Bonus 2 berupa penggunaan bahasa Ruby. Jumlah algoritma menjadi delapan. Seluruh algoritma dijalankan oleh backend Ruby, sedangkan antarmuka menggunakan TypeScript, React, dan Next.js.

Pengembangan melanjutkan aplikasi yang sudah ada. Pertahankan tampilan, fitur, dan kompatibilitas hasil tujuh cipher selama penambahan Enigma dan pemindahan mesin kriptografi ke Ruby.

Sumber utama adalah `Soal UTS Kriptografi 20261(1).pdf`, terdiri atas tiga halaman. Nomor halaman dan butir dalam dokumen ini mengacu pada PDF tersebut. Ketentuan dari PDF dibedakan dari keputusan implementasi agar pilihan teknologi, cara pengujian, dan format penyimpanan tidak dianggap sebagai persyaratan tambahan dari dosen.

Hasil pekerjaan implementasi berupa aplikasi yang berjalan, kode sumber, README, pengujian, contoh masukan dan keluaran, serta screenshot aplikasi. Laporan PDF dan prompt penyusunan laporan dikerjakan pada tahap berikutnya setelah aplikasi selesai.

## 2. Pemetaan seluruh ketentuan soal

### 2.1 Program dan algoritma

Tujuh algoritma wajib dan Enigma tersedia dalam satu aplikasi serta mendukung enkripsi dan dekripsi. Kedua bonus tetap berstatus bonus dalam PDF, tetapi dipilih sebagai bagian yang harus diselesaikan pada proyek ini.

| ID | Sumber PDF | Ketentuan | Kriteria penerimaan |
| --- | --- | --- | --- |
| GUI-01 | Halaman 1, paragraf pembuka soal | Program mempunyai GUI berbasis web | Pengguna memilih cipher, memasukkan pesan dan kunci, menjalankan operasi, melihat hasil, dan mengunduh hasil melalui browser |
| ALG-01 | Halaman 1, butir a | Vigenere Cipher standar, 26 huruf alfabet | Vigenere berkunci berulang, modulo 26, dengan enkripsi dan dekripsi yang benar |
| ALG-02 | Halaman 1, butir b | Auto-Key Vigenere Cipher, 26 huruf alfabet | Menggunakan primer dan kelanjutan plainteks sesuai konvensi pada bagian 5 |
| ALG-03 | Halaman 1, butir c | Extended Vigenere Cipher, 256 karakter ASCII | Memproses nilai byte 0 sampai 255 dengan penjumlahan dan pengurangan modulo 256 |
| ALG-04 | Halaman 1, butir d | Playfair Cipher, 26 huruf alfabet | Menerima masukan A sampai Z dengan konvensi matriks, I/J, dan pengisi pada bagian 3 dan 5 |
| ALG-05 | Halaman 1, butir e | Affine Cipher, 26 huruf alfabet | Menggunakan pasangan kunci a dan b yang valid modulo 26 |
| ALG-06 | Halaman 1, butir f | Hill Cipher, 26 huruf alfabet | Menggunakan matriks kunci yang memiliki invers modulo 26 |
| ALG-07 | Halaman 1, butir g | Super enkripsi berupa Extended Vigenere dan transposisi metode kolom | Kedua transformasi benar-benar dijalankan dan dibalik dalam urutan yang tepat |
| OPT-01 | Halaman 1, butir h | Bonus Enigma Cipher | Diimplementasikan sebagai cipher kedelapan, mendukung teks, file, konfigurasi rotor, reflector, ring setting, posisi awal, dan plugboard |
| OPT-02 | Halaman 1, butir i | Bonus penggunaan Ruby | Backend Ruby menjalankan enkripsi dan dekripsi seluruh delapan cipher serta dipanggil oleh aplikasi web |

### 2.2 Sebelas spesifikasi program

| ID | Sumber PDF | Ketentuan | Penerapan dalam produk |
| --- | --- | --- | --- |
| SP-01 | Halaman 1, spesifikasi 1 | Menerima pesan yang diketik atau file sembarang, baik teks maupun biner | Input teks dan unggahan file tersedia. Mode file utuh menerima semua ekstensi |
| SP-02 | Halaman 1, spesifikasi 2 | Cipher alfabet mengenkripsi huruf saja. Angka, spasi, dan tanda baca dibuang dari plainteks dan cipherteks | Mode teks alfabet memakai normalisasi A sampai Z. Perlakuan file utuh dijelaskan pada bagian 3 |
| SP-03 | Halaman 1, spesifikasi 3 | Dekripsi mengembalikan plainteks semula | Mode teks alfabet mengembalikan teks hasil normalisasi. Mode byte mengembalikan byte yang identik. Pemulihan pengisi memakai metadata yang tersedia |
| SP-04 | Halaman 1, spesifikasi 4 | Plainteks dan cipherteks dapat ditampilkan dalam Base64 | Tersedia representasi Base64 dari data yang diproses dan payload hasil cipher |
| SP-05 | Halaman 1, spesifikasi 5 | Cipherteks ditampilkan tanpa spasi dan semuanya huruf kecil atau kapital dalam kode Base64 | Cipherteks alfabet ditampilkan kapital tanpa spasi. Base64 mempertahankan kapitalisasi aslinya, dengan penjelasan pada bagian 3 |
| SP-06 | Halaman 1, spesifikasi 6 | Cipherteks dapat disimpan atau diunduh sebagai file biner | Unduhan `.dat` berisi kontainer biner dan payload cipherteks |
| SP-07 | Halaman 1, spesifikasi 7 | Kunci dimasukkan pengguna dan panjang kunci bebas | Kunci dapat diubah pengguna. Panjang kata kunci tidak dikunci pada jumlah karakter tertentu. Struktur kunci mengikuti algoritma |
| SP-08 | Halaman 2, spesifikasi 8 | Seluruh byte file, termasuk header, dienkripsi dan dapat dipulihkan | File dibaca sebagai byte utuh. Tidak ada bagian isi file asal yang dikecualikan dari jalur enkripsi |
| SP-09 | Halaman 2, spesifikasi 9 | Format file cipherteks bebas. Hasil dekripsi disimpan dengan jenis file asal. Nama atau ekstensi boleh disimpan dalam cipherteks | Proyek memilih `.dat` dengan metadata nama file asal untuk pemulihan nama dan ekstensi |
| SP-10 | Halaman 2, spesifikasi 10 | Pustaka invers modulo, invers matriks, dan aljabar linier diperbolehkan | Pustaka matematika boleh dipakai. Aturan transformasi cipher tetap dapat ditelusuri dalam kode proyek |
| SP-11 | Halaman 2, spesifikasi 11 | Framework bebas | Proyek memakai Ruby dengan Sinatra untuk backend dan TypeScript, React, serta Next.js untuk antarmuka |

### 2.3 Pengumpulan dan penilaian

| ID | Sumber PDF | Ketentuan | Persiapan pada tahap implementasi |
| --- | --- | --- | --- |
| DEL-01 | Halaman 3, isi laporan nomor 1 | Laporan PDF memuat screenshot antarmuka | Simpan screenshot dari aplikasi yang benar-benar berjalan |
| DEL-02 | Halaman 3, isi laporan nomor 2 | Contoh plainteks dan cipherteks berupa teks, gambar, file database, audio, dan video beserta penjelasan | Sediakan kelima jenis contoh, pasangan hasil enkripsi dan dekripsi, serta hasil pemeriksaannya |
| DEL-03 | Halaman 3, isi laporan nomor 3 | Kode program lengkap dengan README cara menjalankan | Sediakan kode sumber lengkap dan README yang cocok dengan perintah yang tersedia |
| DEL-04 | Halaman 3, tabel dan keterangan | Tabel Berhasil, Kurang Berhasil, dan Keterangan untuk tujuh cipher serta dua bonus | Siapkan hasil uji per algoritma sebagai dasar pengisian tabel |
| CTX-01 | Halaman 1, petunjuk umum | Karya sendiri atau kelompok. Plagiarisme atau duplikasi program mendapat nilai 0 | Implementasi inti dibuat dalam proyek dan sumber rujukan teknis dicatat |
| CTX-02 | Halaman 1, petunjuk umum | Batas pengumpulan mengikuti pengumuman Classroom | Tidak menetapkan tanggal pengumpulan berdasarkan tebakan dari tanggal ujian |
| CTX-03 | Halaman 3, paragraf pertama | Dianjurkan kelompok tiga orang, individu diperbolehkan | Aplikasi dapat dikerjakan individu maupun kelompok |

Contoh antarmuka pada halaman 2 adalah inspirasi. Tampilan AES, mode CBC, dan input hex pada gambar bukan daftar algoritma atau fitur tambahan yang diwajibkan soal.

## 3. Keputusan untuk bagian soal yang ambigu

Keputusan berikut merupakan rancangan teknis proyek. Keputusan ini mempertahankan tujuan soal tanpa mengubah definisi cipher atau merusak data. Jika dosen memberikan konvensi yang lebih khusus, perbarui keputusan terkait beserta pengujiannya.

### 3.1 Kapitalisasi Base64

Spesifikasi 5 menggabungkan ketentuan huruf seragam dengan Base64. Base64 standar membedakan huruf besar dan kecil sehingga hasilnya tidak boleh diubah dengan `toUpperCase()` atau `toLowerCase()`.

Produk menyediakan dua representasi yang jelas.

- Cipherteks alfabet berupa huruf kapital A sampai Z tanpa spasi.
- Cipherteks Base64 berupa encoding byte payload yang valid, tanpa spasi atau pemisah baris tambahan.

Keduanya merepresentasikan payload cipher yang sama untuk algoritma alfabet. Cipher berbasis byte cukup menampilkan Base64 sebagai keluaran utama. Pelipatan baris secara visual tidak menambahkan karakter baris baru pada data yang disalin.

### 3.2 Teks alfabet dan file yang harus pulih utuh

Menghapus semua byte nonhuruf dari gambar, database, audio, atau video akan merusak file. Karena spesifikasi 1, 8, 9, dan rubrik juga meminta pemulihan file sembarang, proyek memakai dua jalur yang dinyatakan secara eksplisit.

| Jalur | Perlakuan masukan | Sasaran hasil dekripsi |
| --- | --- | --- |
| Teks alfabet | Teks ketikan, atau isi file teks yang secara eksplisit dipilih sebagai teks, disaring menjadi A sampai Z | Teks hasil normalisasi, tanpa angka, spasi, dan tanda baca yang sudah dibuang |
| File utuh | Semua byte file dipertahankan, termasuk header | Identik byte demi byte dengan file asal |

Extended Vigenere dan Super Enkripsi memproses file utuh langsung sebagai byte. Untuk enam cipher alfabet, yaitu Vigenere, Auto-Key, Playfair, Affine, Hill, dan Enigma, seluruh byte file dipetakan dahulu ke huruf melalui codec reversibel pada bagian 6. Cipher kemudian tetap bekerja pada alfabet aslinya.

Codec adalah adaptasi format masukan, bukan algoritma kriptografi tambahan. Jangan mengubah Vigenere standar, Affine, atau Hill menjadi modulo 256 lalu tetap memberi label modulo 26. Jangan membatasi dukungan file sembarang hanya pada Extended Vigenere dan Super Enkripsi.

Mode file utuh menjadi pilihan awal saat pengguna mengunggah file, termasuk file `.txt`. Pilihan membaca file sebagai teks alfabet tersedia secara terpisah agar normalisasi bersifat jelas dan disengaja.

### 3.3 Playfair dengan masukan 26 huruf

Soal menyebut 26 huruf tetapi tidak menentukan ukuran matriks atau konvensi I/J. Proyek memilih Playfair klasik dengan matriks 5 x 5, menerima masukan A sampai Z, dan menggabungkan J menjadi I selama transformasi.

Untuk paket yang dibuat aplikasi, posisi J pada teks hasil normalisasi dan posisi huruf pengisi disimpan sebagai metadata pemulihan. Dekripsi paket mengembalikan teks A sampai Z hasil normalisasi sebelum penggabungan I/J dan penyisipan pengisi. File utuh memakai codec tanpa J sehingga tidak kehilangan informasi akibat penggabungan tersebut.

Cipherteks Playfair mentah dari luar aplikasi tidak memuat informasi asal I/J atau asal huruf pengisi. Jalur mentah mengembalikan hasil dekripsi yang masih memuat pengisi dan I hasil penggabungan. Jangan menebak atau menghapus semua X dan Q. Hasil pemulihan penuh dinilai melalui paket aplikasi yang menyertakan metadata.

Matriks 5 x 5 merupakan konvensi implementasi, bukan pernyataan bahwa PDF secara eksplisit mewajibkan penggabungan I/J. Jangan diam-diam menggantinya dengan varian 6 x 6 yang memasukkan angka.

### 3.4 Panjang dan bentuk kunci

Kata kunci Vigenere, Auto-Key, Extended Vigenere, Playfair, dan transposisi kolom boleh mempunyai panjang berbeda, termasuk lebih panjang daripada pesan. Kunci kosong ditolak. Normalisasi kunci alfabet ditampilkan kepada pengguna dan tidak boleh menghasilkan kunci kosong.

Enigma menggunakan konfigurasi mesin sebagai kunci, yaitu urutan rotor, ring setting, posisi awal, reflector, dan pasangan plugboard. Bentuk kunci ini ditampilkan dalam formulir dan dapat diubah pengguna.

Affine tetap menggunakan dua bilangan bulat. Hill tetap menggunakan matriks persegi yang invertibel. Ketentuan panjang bebas tidak menghapus syarat matematis tersebut. Hill menyediakan preset 2 x 2 dan 3 x 3 serta masukan matriks persegi berukuran n x n dengan n minimal 2. Batas sumber daya, jika dibutuhkan, harus dinyatakan sebagai batas implementasi dan tidak mengubah matriks secara diam-diam.

### 3.5 Bonus yang diimplementasikan

Bonus 1 dan Bonus 2 termasuk cakupan yang harus diselesaikan dalam revisi proyek. Enigma menjadi algoritma kedelapan. Ruby menjadi bahasa implementasi mesin kriptografi untuk kedelapan algoritma, codec file, validasi kunci, serta pembentukan dan pembacaan kontainer.

React dan Next.js tetap digunakan sebagai antarmuka aplikasi. Penggunaan Ruby harus terlihat pada kode sumber yang mengeksekusi algoritma dan pada pengujian integrasi aplikasi. Penambahan satu skrip Ruby yang tidak dipanggil oleh alur enkripsi dan dekripsi tidak memenuhi kriteria proyek ini.

Soal tidak menetapkan persentase kode Ruby atau mewajibkan seluruh antarmuka ditulis dalam Ruby. Pembagian teknologi tersebut merupakan keputusan implementasi agar Ruby menjalankan fungsi utama kriptografi. Tabel laporan tetap menggunakan istilah Bonus Enigma Cipher dan Bonus bahasa Ruby sesuai soal.

## 4. Teknologi dan rancangan aplikasi

### 4.1 Pembagian teknologi

| Komponen | Pilihan |
| --- | --- |
| Bahasa mesin kriptografi | Ruby |
| Backend HTTP | Sinatra pada server Rack dengan Puma |
| Antarmuka | TypeScript dengan mode strict, React, dan Next.js App Router |
| Pengelolaan paket frontend | pnpm dengan satu lockfile |
| Pengelolaan paket Ruby | Bundler dengan Gemfile dan Gemfile.lock |
| Pemrosesan cipher | Modul Ruby untuk delapan algoritma, dipanggil melalui API |
| Data biner di browser | Uint8Array, ArrayBuffer, dan Blob |
| Data biner di Ruby | String berencoding ASCII-8BIT, operasi byte, dan ukuran bytesize |
| Pengujian Ruby | RSpec untuk algoritma, codec, kontainer, dan API |
| Pengujian frontend | Vitest untuk komponen dan integrasi klien serta Playwright untuk alur aplikasi lengkap |
| Pemeriksaan kualitas | Typecheck dan ESLint pada frontend, pemeriksaan Ruby, seluruh pengujian, dan build produksi |

Gunakan satu repositori yang memuat aplikasi Next.js dan layanan Ruby. Struktur yang disarankan adalah `apps/web` untuk antarmuka, `apps/api` untuk layanan Ruby, serta direktori bersama untuk fixture dan pengujian integrasi. Jika aplikasi sudah mempunyai struktur yang teratur, sesuaikan penempatan layanan Ruby tanpa membangun ulang antarmuka.

Pisahkan implementasi cipher, codec, kontainer, validasi, endpoint, dan komponen UI. Fungsi Ruby yang digunakan endpoint harus sama dengan fungsi yang diuji RSpec. Seluruh hasil cipher yang ditampilkan pada alur aplikasi berasal dari mesin Ruby.

### 4.2 Alur aplikasi dan API

Browser mengirim pesan atau byte file beserta kunci ke endpoint Next.js. Endpoint tersebut meneruskan permintaan ke layanan Ruby. Ruby memvalidasi masukan, menjalankan algoritma, membentuk hasil, dan mengembalikan data untuk ditampilkan atau diunduh.

| Endpoint aplikasi | Tanggung jawab |
| --- | --- |
| `POST /api/crypto/encrypt` | Meneruskan operasi enkripsi teks atau file ke Ruby dan mengembalikan payload serta paket |
| `POST /api/crypto/decrypt` | Meneruskan operasi dekripsi paket atau payload mentah ke Ruby dan mengembalikan data hasil pemulihan |

Endpoint Next.js berfungsi sebagai penghubung HTTP dengan layanan Ruby. Implementasi algoritma tidak diduplikasi di route Next.js. Layanan Sinatra menyediakan endpoint operasi yang sepadan dan memakai kontrak yang didokumentasikan dalam README.

Kontrak permintaan mencakup jenis algoritma, mode masukan, format data, kunci sesuai algoritma, dan metadata nama file bila relevan. File dikirim sebagai bagian biner multipart. Pesan teks dan konfigurasi kunci dapat dikirim sebagai JSON. Semua byte harus diteruskan utuh. Untuk respons JSON, data biner dibawa sebagai Base64 yang valid, dengan nama field berbeda untuk payload cipherteks dan paket lengkap.

Enigma memakai objek konfigurasi kunci dengan field `rotors`, `ringSettings`, `initialPositions`, `reflector`, dan `plugboard`. Urutan tiga rotor serta posisi dan ring setting selalu kiri, tengah, lalu kanan. Kontrak API menggunakan ring setting 1 sampai 26 dan posisi A sampai Z. Konversi ke indeks 0 sampai 25 dilakukan secara eksplisit di Ruby.

Ruby membentuk kontainer dan memeriksa hasil pemulihan. Browser bertugas memilih file, menampilkan hasil, membuat Blob unduhan, dan menyediakan tombol salin. Web Worker dapat dipakai untuk pratinjau atau encoding di browser bila diperlukan, tetapi transformasi cipher tetap dijalankan oleh Ruby.

Setiap permintaan mempunyai state algoritma sendiri. Kunci dan posisi rotor dari suatu permintaan tidak boleh memengaruhi permintaan berikutnya atau pengguna lain. Kunci dikirim dalam body permintaan dan tidak dimasukkan ke URL, log, atau kontainer hasil. Pengolahan file tidak memerlukan penyimpanan permanen. File sementara yang dibuat framework dibersihkan setelah operasi.

Tangani kesalahan masukan, batas ukuran, timeout, dan layanan Ruby yang tidak tersedia dengan pesan yang jelas. Aplikasi tidak boleh diam-diam beralih ke mesin TypeScript ketika Ruby gagal. Pemrosesan kini melibatkan backend sehingga keterangan bahwa seluruh data hanya diproses di browser harus diperbarui pada UI dan dokumentasi. Gunakan HTTPS jika aplikasi diakses melalui jaringan publik.

Aplikasi tidak membutuhkan akun atau database operasional. File database dalam soal tetap menjadi objek yang dienkripsi.

### 4.3 Kompatibilitas dengan aplikasi yang sudah ada

Simpan vektor acuan dan contoh paket dari implementasi tujuh cipher sebelum pemindahan ke Ruby. Gunakan data tersebut untuk memeriksa kesamaan hasil dan kemampuan backend Ruby membaca paket yang sudah dihasilkan aplikasi.

Pertahankan aturan normalisasi, urutan transformasi, codec, format Base64, nama ekstensi, dan struktur paket yang sudah digunakan. Bila perubahan format memang diperlukan, gunakan versi baru dan pertahankan pembacaan versi sebelumnya. Penambahan ID Enigma pada kontainer tidak boleh mengubah makna ID tujuh algoritma sebelumnya.

Setelah jalur Ruby berfungsi, operasi aplikasi memakai Ruby untuk seluruh cipher. Modul TypeScript lama dapat dipakai sementara sebagai pembanding migrasi, tetapi tidak menjadi jalur eksekusi alternatif pada versi akhir. Sinkronkan README dan instruksi proyek yang masih menetapkan pemrosesan cipher hanya di browser.

### 4.4 Menjalankan dan menguji proyek

Tetapkan versi Ruby, Node.js, pnpm, Bundler, dan paket yang kompatibel saat implementasi. Kunci dependensi melalui lockfile masing-masing ekosistem. README menjelaskan instalasi dependensi, konfigurasi alamat layanan Ruby, serta cara menjalankan kedua layanan.

Sediakan satu perintah pengembangan dari root repositori untuk menjalankan frontend dan backend, misalnya `pnpm dev`. Pengujian Ruby dijalankan dengan `bundle exec rspec` dari direktori backend. Perintah pengujian menyeluruh harus mencakup pengujian Ruby, frontend, dan Playwright dengan layanan Ruby yang benar-benar berjalan. Build Next.js yang berhasil tidak menggantikan pengujian backend.

## 5. Spesifikasi algoritma

### 5.1 Aturan bersama

- Alfabet numerik memakai A = 0 sampai Z = 25.
- Normalisasi teks alfabet menyaring karakter ASCII A sampai Z dan a sampai z terlebih dahulu, kemudian mengubah huruf kecil menjadi kapital. Unicode tidak ditransliterasi menjadi huruf baru secara diam-diam.
- Definisikan `mod(x, m) = ((x % m) + m) % m` agar hasil pengurangan tidak negatif.
- Normalisasi alfabet hanya berlaku pada data alfabet yang sudah dipilih atau didekode. Jangan menerapkannya pada string Base64, kontainer, atau byte file utuh.
- Parameter kunci divalidasi sebelum operasi.
- Operasi baru memulai ulang posisi kunci dan state algoritma. Untuk Enigma, posisi awal diambil dari konfigurasi kunci pada permintaan tersebut.
- Semua aturan cipher di bagian ini diterapkan dalam Ruby. Normalisasi dan validasi di browser hanya membantu formulir, sedangkan Ruby tetap memvalidasi permintaan.
- Enkripsi dan dekripsi menerima data melalui kontrak yang sama, termasuk metadata pemulihan bila diperlukan.

### 5.2 Vigenere standar

Untuk kunci K sepanjang m, gunakan `C[i] = mod(P[i] + K[i mod m], 26)` dan `P[i] = mod(C[i] - K[i mod m], 26)`.

Kunci diulang sampai panjang pesan terpenuhi. Karakter yang dibuang saat normalisasi tidak menggeser indeks kunci. Kunci yang lebih panjang dari pesan tetap valid.

### 5.3 Auto-Key Vigenere

Gunakan varian plaintext autokey. Soal tidak merinci jenis autokey, sehingga varian ini merupakan konvensi proyek.

Untuk primer K sepanjang m, aliran kunci S berisi K pada m posisi pertama dan dilanjutkan dengan plainteks. Untuk `i >= m`, gunakan `S[i] = P[i - m]`. Rumus enkripsi dan dekripsi sama seperti Vigenere dengan S sebagai aliran kunci.

Dekripsi membangun lanjutan aliran kunci dari plainteks yang baru berhasil dipulihkan. Jangan mengulang primer seperti Vigenere standar atau memakai cipherteks sebagai pengganti plainteks.

### 5.4 Extended Vigenere

Gunakan `C[i] = mod(P[i] + K[i mod m], 256)` dan `P[i] = mod(C[i] - K[i mod m], 256)` pada byte.

Istilah 256 karakter ASCII dalam soal diterapkan sebagai seluruh nilai byte 0 sampai 255. Pesan yang diketik dan kunci teks diproses sebagai UTF-8. Browser dapat memakai `TextEncoder` untuk pratinjau byte, sedangkan Ruby melakukan operasi cipher pada byte UTF-8 yang sama. Kunci teks mempertahankan spasi dan kapitalisasinya. Kunci dengan nol byte panjangnya ditolak, sedangkan byte bernilai 0 adalah nilai kunci yang valid.

File dapat dibaca di browser dengan `arrayBuffer()` dan dikirim sebagai byte utuh. Ruby mempertahankan data file sebagai String biner berencoding ASCII-8BIT serta menggunakan operasi byte dan `bytesize`. Jangan mengonversi file biner menjadi teks UTF-8 sebelum enkripsi. Hasil dekripsi file langsung menjadi byte unduhan. Teks hasil dekripsi UTF-8 hanya ditampilkan sebagai teks bila decoding valid.

### 5.5 Playfair

1. Normalisasi kata kunci, gabungkan J menjadi I, dan hapus huruf berulang dengan mempertahankan kemunculan pertama.
2. Tambahkan huruf yang tersisa dari `ABCDEFGHIKLMNOPQRSTUVWXYZ` dalam urutan alfabet, kemudian susun matriks 5 x 5 per baris.
3. Catat posisi J pada teks hasil normalisasi, lalu gabungkan J menjadi I untuk transformasi.
4. Bentuk pasangan huruf. Jika pasangan akan berisi huruf sama, sisipkan X setelah huruf pertama dan proses huruf kedua pada pasangan berikutnya.
5. Jika huruf yang memerlukan pengisi adalah X, gunakan Q. Aturan yang sama berlaku pada huruf terakhir tanpa pasangan.
6. Untuk pasangan pada baris yang sama, geser ke kanan saat enkripsi dan ke kiri saat dekripsi.
7. Untuk pasangan pada kolom yang sama, geser ke bawah saat enkripsi dan ke atas saat dekripsi.
8. Untuk pasangan yang membentuk persegi panjang, tukar kolom kedua huruf.
9. Gunakan perputaran indeks modulo 5.

Simpan penanda posisi pengisi secara ringkas, misalnya bitset, dan posisi J untuk paket aplikasi. Saat dekripsi paket, hapus hanya karakter yang tercatat sebagai pengisi, kemudian pulihkan posisi J. X atau Q asli harus tetap ada. Representasi metadata harus terdokumentasi dan terversi.

Cipherteks mentah dengan panjang ganjil ditolak. Jangan menyisipkan pengisi ke cipherteks pada saat dekripsi. Validasi alfabet matriks setelah normalisasi masukan mentah.

### 5.6 Affine

Gunakan `C = mod(a * P + b, 26)` dan `P = mod(aInverse * (C - b), 26)`.

Kedua parameter adalah bilangan bulat. Reduksi a dan b modulo 26 dilakukan secara jelas. Syarat kunci adalah `gcd(a, 26) = 1`. Nilai a yang valid setelah reduksi adalah 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, dan 25. Nilai b berada pada 0 sampai 25 setelah reduksi.

Tolak a yang tidak mempunyai invers. Jangan mengganti kunci yang salah dengan nilai bawaan tanpa memberi tahu pengguna.

### 5.7 Hill

Gunakan vektor kolom dengan ukuran n dan matriks K berukuran n x n. Enkripsi memakai `C = K * P mod 26`. Dekripsi memakai `P = KInverse * C mod 26`.

Syarat valid adalah matriks persegi berisi bilangan bulat dan `gcd(det(K), 26) = 1`. Matriks dapat dimasukkan sebagai grid atau baris angka. Seluruh elemen direduksi modulo 26.

Perhitungan invers harus tepat dalam aritmetika modular. Jangan membulatkan invers matriks bilangan real. Salah satu pendekatan yang dapat dipakai adalah invers pada medan modulo 2 dan modulo 13, kemudian menggabungkan setiap elemen melalui CRT. Ini juga menangani matriks invertibel yang tidak memiliki pivot awal yang invertibel modulo 26.

Tambahkan X hanya bila panjang plainteks bukan kelipatan n. Simpan jumlah pengisi dan panjang sebelum padding dalam paket. Dekripsi paket membuang tepat pengisi yang tercatat. Dekripsi mentah mempertahankan pengisi bila panjang asli tidak tersedia. Panjang cipherteks yang bukan kelipatan n ditolak.

### 5.8 Super Enkripsi

Kunci terdiri atas kunci byte Extended Vigenere dan kata kunci transposisi kolom. Keduanya dimasukkan pengguna.

1. Enkripsi seluruh byte menggunakan Extended Vigenere.
2. Susun hasil secara konseptual per baris dengan lebar sebesar panjang kata kunci kolom.
3. Urutkan kolom berdasarkan huruf kata kunci dari A sampai Z. Untuk huruf yang sama, pertahankan urutan indeks kiri ke kanan.
4. Baca setiap kolom dari atas ke bawah mengikuti urutan tersebut.

Pilih transposisi kolom tanpa padding. Jika panjang data L dan jumlah kolom m, tiap kolom mempunyai `floor(L / m)` byte. Sebanyak `L mod m` kolom paling kiri pada susunan asli mempunyai satu byte tambahan. Saat dekripsi, hitung panjang tersebut menggunakan indeks kolom asli, isi kolom menurut urutan kunci, kemudian baca kembali per baris.

Dekripsi menjalankan invers transposisi terlebih dahulu, kemudian dekripsi Extended Vigenere. Transposisi bekerja pada byte hasil cipher, bukan pada karakter string Base64. Kunci kolom dengan huruf berulang dan kunci yang lebih panjang dari data harus berfungsi.

### 5.9 Enigma Cipher

Implementasikan simulasi Enigma I tiga rotor dalam Ruby sebagai cipher kedelapan. Model ini merupakan pilihan proyek karena PDF hanya menyebut Enigma tanpa menentukan variannya. Gunakan alfabet A sampai Z, entry wheel identitas, tiga rotor berbeda yang dipilih dari I sampai V, dan reflector B atau C.

#### 5.9.1 Kunci dan pemetaan rotor

Kunci terdiri atas urutan rotor dari kiri ke kanan, tiga ring setting, tiga posisi awal, pilihan reflector, serta pasangan plugboard. Nilai awal formulir adalah rotor I, II, III, ring setting 01, 01, 01, posisi A, A, A, reflector B, dan plugboard kosong. Seluruh parameter dapat diubah pengguna.

Ring setting pada formulir dan API memakai 01 sampai 26, setara A sampai Z. Indeks internal memakai 0 sampai 25. Posisi yang ditampilkan adalah huruf pada jendela rotor, bukan indeks inti rotor sebelum koreksi ring setting.

| Rotor | Wiring untuk masukan ABCDEFGHIJKLMNOPQRSTUVWXYZ | Huruf turnover di jendela sebelum langkah |
| --- | --- | --- |
| I | EKMFLGDQVZNTOWYHXUSPAIBRCJ | Q |
| II | AJDKSIRUXBLHWTMCQGZNPYFVOE | E |
| III | BDFHJLCPRTXVZNYEIWGAKMUSQO | V |
| IV | ESOVPZJAYQUIRHXLNFTGKDCMWB | J |
| V | VZBRGITYUPSDNHLXAWMJQOFECK | Z |

| Reflector | Wiring |
| --- | --- |
| B | YRUHQSLDPXNGOKMIEBFZCWVJAT |
| C | FVPJIAOYEDRZXWGCTKUQSBNMHL |

Wiring di atas dibaca dari sisi kanan rotor menuju sisi kiri pada offset nol. Jalur balik memakai invers wiring. Untuk posisi jendela p dan ring setting r dalam indeks internal, offset adalah `mod(p - r, 26)`. Pada lintasan maju, hitung `mod(wiring[mod(x + offset, 26)] - offset, 26)`. Pada lintasan balik gunakan invers wiring dengan koreksi offset yang sama.

#### 5.9.2 Langkah rotor dan lintasan sinyal

Rotor bergerak sebelum huruf diproses. Ambil kondisi turnover rotor kanan dan tengah dari posisi jendela sebelum pergerakan. Jika rotor tengah berada pada huruf turnover, majukan rotor kiri. Majukan rotor tengah jika rotor kanan atau tengah berada pada turnover. Rotor kanan selalu maju satu langkah. Semua keputusan diambil dari kondisi awal langkah tersebut agar double stepping bekerja dengan benar.

Bandingkan turnover terhadap huruf jendela pada tabel. Perubahan ring setting mengubah offset wiring. Jangan menggeser lagi huruf turnover jendela dengan ring setting pada model Enigma I ini.

Sesudah pergerakan, sinyal melewati plugboard, rotor kanan, tengah, kiri, reflector, invers rotor kiri, tengah, kanan, lalu plugboard kembali. Setiap perubahan posisi dilakukan modulo 26. Huruf yang dibuang saat normalisasi tidak menyebabkan langkah rotor.

Enkripsi dan dekripsi memakai transformasi yang sama. Dekripsi memulai mesin dari konfigurasi awal yang sama dengan enkripsi. Jangan memulai dekripsi dari posisi rotor terakhir hasil enkripsi. Pisahkan konfigurasi awal dari state kerja sehingga pemrosesan tidak mengubah nilai kunci yang tersimpan dalam formulir.

#### 5.9.3 Plugboard, file, dan validasi

Plugboard menerima 0 sampai 13 pasangan dua huruf, misalnya AB dan CD. Setiap huruf hanya boleh digunakan pada satu pasangan. Pasangan AA, huruf yang dipakai ulang, karakter nonalfabet, dan jumlah pasangan berlebih ditolak. Huruf tanpa pasangan dipetakan ke dirinya sendiri.

Tolak rotor duplikat, nama rotor atau reflector yang tidak didukung, ring setting di luar 1 sampai 26, dan posisi awal yang bukan tiga huruf A sampai Z. Tiga rotor harus dinyatakan dalam urutan kiri, tengah, dan kanan secara konsisten pada UI, API, dan pengujian.

Mode teks mengikuti normalisasi A sampai Z. Enigma tidak menggabungkan I/J dan tidak memerlukan padding. Mode file utuh memakai codec pada bagian 6. Satu operasi file mempertahankan state rotor sampai seluruh simbol codec selesai diproses, termasuk bila pengolahan dilakukan dalam beberapa blok internal.

Gunakan ID algoritma `enigma-i` pada kontainer. Model dan ID codec dapat disimpan sebagai metadata format. Konfigurasi kunci tetap dimasukkan pengguna dan tidak dimasukkan ke kontainer. Pemulihan file menggunakan konfigurasi awal yang sama, kemudian decoding codec mengembalikan seluruh byte asal.

## 6. Codec file untuk cipher alfabet

Keenam cipher alfabet, termasuk Enigma, memakai codec yang sama untuk file utuh. Alphabet codec adalah `ABCDEFGHIKLMNOPQRSTUVWXYZ`, berjumlah 25 simbol tanpa J. Pilihan ini memungkinkan Playfair memakai jalur file yang sama tanpa kehilangan byte karena penggabungan I/J.

Untuk setiap byte b, buat dua simbol berurutan dengan indeks `floor(b / 25)` dan `b mod 25`. Setiap pasangan mewakili tepat satu byte. Saat decoding, hitung `b = 25 * indeksPertama + indeksKedua`, lalu pastikan hasil berada pada 0 sampai 255.

Ketentuan codec berlaku sebagai berikut.

- Pemetaan mencakup semua byte 0 sampai 255 dan seluruh posisi file.
- Output codec dienkripsi menggunakan cipher yang dipilih. Encoding saja tidak dianggap enkripsi.
- Sesudah dekripsi, buang pengisi hanya berdasarkan metadata sebelum menjalankan decoding pasangan.
- Panjang ganjil, simbol di luar alphabet codec, atau nilai pasangan di atas 255 menyebabkan kegagalan decoding.
- Byte hasil decoding harus sama persis dengan file awal.
- Codec tidak digunakan untuk mengganti perilaku teks alfabet yang diketik.

Sebagai contoh, byte 0 menjadi AA dan byte 255 menjadi LF. Ini adalah aturan representasi data internal dan tidak perlu ditampilkan sebagai langkah tambahan yang wajib dilakukan pengguna.

## 7. Format kontainer dan pertukaran hasil

### 7.1 Kontainer biner

Format `.dat` adalah pilihan proyek karena PDF membebaskan format file cipherteks. Kontainer menyimpan payload yang sudah dienkripsi dan metadata yang diperlukan agar hasil dapat didekripsi setelah halaman dimuat ulang atau pada sesi baru.

| Urutan | Isi | Format |
| --- | --- | --- |
| 1 | Penanda format | Delapan byte ASCII `UTSKRIPT` |
| 2 | Versi format | Satu byte unsigned, versi awal 1 |
| 3 | Panjang header metadata | Empat byte unsigned big endian |
| 4 | Metadata | JSON UTF-8 sepanjang nilai pada bagian sebelumnya |
| 5 | Payload | Byte cipherteks lengkap |

Metadata memuat ID algoritma, mode masukan, versi codec, panjang payload, ukuran hasil yang diharapkan, serta nama dan MIME file asal bila tersedia. Sertakan metadata Playfair atau Hill hanya jika diperlukan. Untuk mode teks alfabet, ukuran dan checksum mengacu pada hasil normalisasi yang akan dipulihkan. Untuk file utuh, keduanya mengacu pada file asli.

Simpan checksum SHA-256 dari data yang diharapkan sebagai pemeriksaan kesamaan setelah dekripsi. Checksum ini bukan MAC atau bukti autentikasi. Kegagalan checksum tidak selalu berarti kunci salah karena kerusakan file juga dapat menjadi penyebab.

Jangan menyimpan kunci, plainteks lengkap, atau salinan file asli sebagai isi cadangan. Untuk Enigma, urutan rotor, ring setting, posisi awal, reflector, dan plugboard diperlakukan sebagai konfigurasi kunci dan dimasukkan kembali oleh pengguna saat diperlukan. Header file asal tetap termasuk payload terenkripsi. Header kontainer adalah struktur baru untuk membaca paket dan bukan header file asal yang dibiarkan terbuka.

Parser memvalidasi versi, panjang header, metadata, panjang payload, dan batas alokasi sebelum memproses data. Penanda pengisi harus memakai representasi ringkas agar file besar tidak menghasilkan jutaan elemen JSON. Jangan mengambil nama file dari metadata sebagai path untuk menulis ke direktori lain.

### 7.2 Base64 payload dan Base64 paket

Bedakan dua jenis keluaran ini agar pengujian dan tampilan tetap akurat.

| Representasi | Definisi | Tujuan |
| --- | --- | --- |
| Plainteks Base64 | Base64 dari byte yang menjadi isi pesan sebelum cipher atau hasil pemulihan | Memenuhi spesifikasi 4 |
| Cipherteks Base64 | Base64 dari payload cipherteks saja | Memenuhi spesifikasi 4 dan 5 serta memeriksa hasil algoritma |
| Paket Base64 | Base64 dari kontainer lengkap | Menyalin data yang dapat didekripsi dengan metadata pemulihan |

Untuk file utuh, plainteks Base64 mewakili byte file asli, bukan string huruf perantara codec. Untuk teks alfabet, label menyatakan bahwa yang ditampilkan adalah plainteks hasil normalisasi. Untuk payload alfabet, termasuk Enigma, byte cipherteks adalah encoding ASCII huruf hasil cipher.

Sediakan tombol `Salin cipherteks Base64` dan `Salin paket untuk dekripsi` dengan label berbeda. Tombol `Gunakan hasil untuk dekripsi` memakai paket lengkap. Data yang disalin dan diunduh harus lengkap meskipun pratinjau layar dibatasi.

### 7.3 Input dekripsi

Dekripsi mendukung unggahan `.dat` dan teks paket Base64. Pengguna tetap memasukkan kunci. Algoritma dan mode dipulihkan dari metadata paket sehingga sesi dekripsi tidak bergantung pada state enkripsi sebelumnya.

Sediakan input cipherteks alfabet mentah untuk enam cipher alfabet dan input Base64 payload untuk seluruh delapan cipher. Format masukan dipilih secara eksplisit. Jangan menebak bahwa suatu teks A sampai Z pasti bukan Base64.

Pada input Base64, validasi karakter, padding, dan panjang sebelum decoding. Normalisasi huruf hanya dijalankan setelah byte didekode menjadi payload alfabet. Angka, tanda tambah, garis miring, dan tanda sama dengan pada Base64 tidak boleh dibuang oleh filter alfabet.

Jalur mentah tidak mempunyai metadata nama file atau pemulihan pengisi. Gunakan aturan mentah pada bagian Playfair dan Hill. Jaminan pemulihan file utuh dan teks alfabet lengkap berlaku pada paket yang dibuat aplikasi.

## 8. Antarmuka dan alur pengguna

### 8.1 Komponen utama

Pertahankan halaman kerja yang sudah ada dan tambahkan Enigma pada pemilih cipher sehingga tersedia delapan algoritma. Halaman memuat pilihan Enkripsi atau Dekripsi, pilihan Teks atau File, masukan pesan, formulir kunci sesuai cipher, tombol proses, serta panel hasil.

Panel hasil menampilkan data yang diproses, hasil transformasi, representasi Base64, dan tombol unduh. Pada mode file, tampilkan nama, ekstensi, dan ukuran file. Pada teks alfabet, tampilkan hasil normalisasi sehingga hilangnya spasi atau angka dapat dipahami sebelum proses dijalankan.

Gunakan label bahasa Indonesia yang ringkas. Pertahankan desain antarmuka yang sudah digunakan. Penambahan formulir Enigma mengikuti gaya komponen yang sama, dengan susunan yang tetap terbaca pada desktop dan layar sempit. Warna, tipografi, dan susunan komponen adalah pilihan desain, tidak perlu menyalin gambar contoh PDF. Pastikan formulir, hasil panjang, dan tombol tetap terbaca saat digunakan untuk screenshot.

### 8.2 Enkripsi teks

1. Pengguna memilih cipher dan memasukkan pesan serta kunci.
2. Aplikasi menampilkan normalisasi untuk cipher alfabet atau representasi UTF-8 untuk cipher byte.
3. Pengguna menekan Enkripsi.
4. Backend Ruby menjalankan cipher yang dipilih. Aplikasi menampilkan payload cipherteks, Base64, dan pilihan menyalin atau mengunduh paket.
5. Pengguna dapat mengirim hasil ke formulir dekripsi melalui tombol khusus.

### 8.3 Enkripsi dan dekripsi file

1. Pengguna memilih cipher, mengunggah file, dan memasukkan kunci.
2. Aplikasi meneruskan seluruh byte file ke Ruby. Backend menjalankan jalur file utuh, membentuk paket, lalu aplikasi menyediakan unduhan `.dat`.
3. Pada sesi baru, pengguna mengunggah `.dat` dan memasukkan kembali kunci.
4. Ruby mendekripsi payload, memulihkan padding atau codec, dan memeriksa ukuran serta checksum. Untuk Enigma, pemrosesan dimulai dari konfigurasi awal yang dimasukkan pengguna.
5. Hasil dapat diunduh dengan nama dan ekstensi file asal. Pengguna dapat mengubah nama keluaran tanpa merusak ekstensinya.

Pemeriksaan keberhasilan memakai kesamaan byte dan checksum. Berhasil mengunduh file saja bukan bukti bahwa dekripsi benar.

### 8.4 Validasi dan respons

- Tolak kunci kosong pada cipher berkunci teks, kunci alfabet yang menjadi kosong setelah normalisasi, a Affine yang tidak invertibel, dan matriks Hill yang tidak valid. Enigma memvalidasi konfigurasi mesin, dengan plugboard kosong tetap valid.
- Pesan teks yang kosong atau tidak menyisakan huruf pada mode alfabet menghasilkan pesan validasi yang jelas. File kosong tetap dapat diproses sebagai file berukuran nol byte dengan kunci valid.
- Tampilkan kesalahan ketika Base64 atau kontainer rusak, versi tidak didukung, payload tidak sesuai, atau metadata tidak masuk akal.
- Jika checksum hasil dekripsi paket berbeda, jangan menyatakan pemulihan berhasil. Jelaskan bahwa kunci atau data paket perlu diperiksa.
- Perubahan masukan atau kunci membuat hasil lama ditandai tidak sesuai masukan terbaru sampai operasi diulang.
- Selama proses berjalan, cegah operasi ganda dan sediakan status pemrosesan. Jangan menampilkan kemajuan numerik palsu.
- Tangani ukuran file berdasarkan kapasitas browser, batas request pada Next.js, dan kapasitas layanan Ruby. Setiap batas yang diterapkan harus terlihat sebelum proses dan tidak boleh memotong file diam-diam.
- Ketika layanan Ruby gagal atau tidak tersedia, tampilkan kegagalan operasi yang dapat dipahami dan jangan menampilkan hasil lama sebagai hasil permintaan baru.

### 8.5 Formulir Enigma

Tampilkan tiga pemilih rotor dengan label Kiri, Tengah, dan Kanan, tiga ring setting, tiga posisi awal, pilihan reflector, serta masukan pasangan plugboard. Jelaskan singkat bahwa dekripsi memakai konfigurasi awal yang sama. Sediakan tombol reset ke konfigurasi awal tanpa mengubah konfigurasi pengguna secara diam-diam.

Konfigurasi awal tetap terlihat setelah proses. Posisi akhir rotor, bila ditampilkan, berada pada detail hasil dan tidak menggantikan posisi awal pada formulir. Tombol `Gunakan hasil untuk dekripsi` memakai hasil cipher beserta konfigurasi awal yang sedang digunakan dalam sesi tersebut. Pada sesi baru, pengguna memasukkan kembali konfigurasi kuncinya.

## 9. Pengujian dan kriteria penerimaan

Pengujian berikut adalah cara proyek membuktikan ketentuan soal, bukan daftar alat pengujian yang diwajibkan dosen. Bekukan nilai keluaran acuan dalam pengujian. Jangan menghasilkan expected output dengan fungsi produksi yang sedang diuji.

### 9.1 Vektor acuan algoritma

Vektor berlaku pada fungsi inti sebelum pembungkusan kontainer. Semua huruf memakai A = 0.

| ID | Algoritma | Masukan dan kunci | Cipherteks yang diharapkan |
| --- | --- | --- | --- |
| TV-01 | Vigenere standar | Pesan `ATTACKATDAWN`, kunci `LEMON` | `LXFOPVEFRNHR` |
| TV-02 | Auto-Key plaintext | Pesan `ATTACKATDAWN`, primer `QUEENLY` | `QNXEPVYTWTWP` |
| TV-03 | Extended Vigenere | Byte pesan `[0, 65, 255]`, byte kunci `[1, 2]` | Byte `[1, 67, 0]` |
| TV-04 | Playfair | Pesan `HIDETHEGOLDINTHETREESTUMP`, kunci `PLAYFAIREXAMPLE` | `BMODZBXDNABEKUDMUIXMMOUVIF` |
| TV-05 | Affine | Pesan `AFFINECIPHER`, a = 5, b = 8 | `IHHWVCSWFRCP` |
| TV-06 | Hill | Pesan `ACT`, matriks `[[6,24,1],[13,16,10],[20,17,15]]`, vektor kolom | `POH` |
| TV-07 | Super Enkripsi | Byte pesan `[0,1,2,3,254,255,128]`, byte kunci `[1,2]`, kunci kolom `BABA` | Byte `[3,1,5,1,255,3,129]` |
| TV-08 | Enigma I | Pesan `AAAAA`, rotor I, II, III dari kiri ke kanan, ring 01, 01, 01, posisi AAA, reflector B, plugboard kosong | `BDZGO` |
| TV-09 | Enigma I | Pesan `HELLOWORLD`, konfigurasi sama dengan TV-08 dan mesin direset ke AAA | `ILBDAAMTAZ` |

Untuk TV-04, plainteks setelah persiapan pasangan adalah `HIDETHEGOLDINTHETREXESTUMP`. Dekripsi mentah menghasilkan bentuk tersebut. Dekripsi paket menghapus X sisipan yang tercatat sehingga kembali menjadi masukan normalisasinya.

Untuk TV-07, keluaran tahap Extended Vigenere adalah `[1,3,3,5,255,1,129]`. Urutan indeks kolom berbasis nol adalah `[1,3,0,2]`. Periksa hasil tahap perantara dan inversnya untuk mendeteksi urutan transformasi yang salah.

TV-08 dan TV-09 diperiksa langsung pada mesin Ruby dan melalui API yang dipakai UI. Arah dekripsi memakai konfigurasi awal yang sama dan harus mengembalikan masing-masing masukan. Expected output disimpan sebagai konstanta pengujian, bukan dihasilkan dengan fungsi Enigma produksi.

### 9.2 Kasus batas yang wajib diperiksa dalam proyek

| ID | Area | Kasus dan hasil yang diperiksa |
| --- | --- | --- |
| TC-01 | Normalisasi | `Serang pukul 10.30!` menjadi `SERANGPUKUL`. Huruf non-ASCII tidak diam-diam ditransliterasi |
| TC-02 | Kunci kata | Kunci satu huruf, lebih pendek dari pesan, sama panjang, dan lebih panjang dari pesan |
| TC-03 | Auto-Key | Pesan melampaui primer beberapa kali dan dekripsi membangun ulang aliran kunci dari plainteks |
| TC-04 | Extended | Seluruh nilai byte 0 sampai 255, byte nol, byte 255, dan teks UTF-8 multibyte |
| TC-05 | Playfair | `BALLOON`, `JIG`, `XX`, `XQX`, panjang ganjil, serta X atau Q asli di akhir tetap pulih melalui paket |
| TC-06 | Affine | a = 2 ditolak. Parameter bulat negatif atau lebih dari 25 dinormalisasi modulo 26 secara benar |
| TC-07 | Hill | Matriks singular dan determinan yang tidak relatif prima terhadap 26 ditolak |
| TC-08 | Hill | Matriks `[[2,1],[13,7]]` diterima karena determinannya 1, walaupun kolom pertama tidak memiliki elemen yang invertibel modulo 26 |
| TC-09 | Padding Hill | Pesan kelipatan dan bukan kelipatan n, termasuk pesan dengan X asli di akhir |
| TC-10 | Transposisi | Kata kunci berulang seperti `BABA`, kolom lebih banyak daripada byte, dan baris terakhir tidak penuh |
| TC-11 | Codec | Setiap nilai byte dapat melalui encode lalu decode tanpa perubahan. Pasangan tidak valid ditolak |
| TC-12 | Base64 | Encoding dan decoding byte identik, kapitalisasi tidak diubah, input rusak ditolak |
| TC-13 | Kontainer | Ekspor lalu impor pada sesi baru tanpa memakai state enkripsi lama |
| TC-14 | File | File kosong, satu byte, semua nilai byte, file biner bukan UTF-8, dan file berukuran beberapa megabyte |
| TC-15 | Kesalahan | Kunci salah, header terpotong, versi tidak didukung, panjang tidak cocok, dan metadata rusak tidak menghasilkan status sukses palsu |
| TC-16 | Perbandingan tampilan | Base64 payload setelah decoding sama dengan payload dalam kontainer. Unduhan tidak berisi teks Base64 yang sekadar diberi ekstensi `.dat` |
| TC-17 | Double stepping Enigma | Rotor I, II, III, ring 01, 01, 01, posisi awal ADU. Setelah tiga huruf diproses, posisi berturut-turut ADV, AEW, dan BFX |
| TC-18 | Ring setting dan wiring Enigma | Uji ring setting selain 01, rotor IV dan V, serta reflector C terhadap vektor tetap dari simulator rujukan yang independen |
| TC-19 | Plugboard Enigma | Uji pasangan valid, tanpa pasangan, penggunaan huruf berulang, pasangan huruf sama, dan lebih dari 13 pasangan |
| TC-20 | Reset Enigma | Dua permintaan identik menghasilkan hasil sama. Dekripsi dari konfigurasi awal memulihkan pesan. State dari permintaan lain tidak ikut terbawa |
| TC-21 | Normalisasi Enigma | Angka, spasi, dan tanda baca yang dibuang tidak menggerakkan rotor. Huruf I dan J tetap berbeda |
| TC-22 | Byte dan state file Enigma | Seluruh nilai byte 0 sampai 255 pulih melalui codec. Pemrosesan satu blok dan beberapa blok internal memberi hasil sama tanpa reset rotor di batas blok |
| TC-23 | Jalur Ruby | Seluruh delapan cipher menghasilkan respons melalui backend Ruby nyata. Kegagalan backend menampilkan kesalahan dan tidak mengaktifkan cipher TypeScript sebagai pengganti |
| TC-24 | Kompatibilitas migrasi | Paket dan vektor tujuh cipher dari aplikasi sebelumnya dapat diproses Ruby dengan hasil yang sama, termasuk padding, I/J, Base64, dan pemulihan nama file |

Kunci yang berbeda belum tentu menghasilkan transformasi berbeda untuk semua cipher dan semua pesan. Pengujian kunci salah memakai pasangan data dan kunci yang diketahui menghasilkan keluaran berbeda. Untuk cipherteks mentah tanpa checksum, jangan mengklaim dapat mengenali setiap kunci salah.

### 9.3 Lima jenis file dari soal

Siapkan fixture valid yang benar-benar memiliki format berikut, bukan file acak yang hanya diganti ekstensi.

| Jenis dari soal | Contoh fixture | Pemeriksaan |
| --- | --- | --- |
| Teks | `.txt` UTF-8 dengan huruf, angka, spasi, baris baru, dan karakter multibyte | Semua byte dan isi kembali sama pada mode file utuh |
| Gambar | `.png` atau `.jpg` yang valid | Dapat dibuka kembali dan byte identik |
| Database | `.sqlite` atau `.db` SQLite dengan tabel dan beberapa baris | Dapat dibuka, query contoh berhasil, dan byte identik |
| Audio | `.wav` yang valid | Dapat dibaca atau diputar kembali dan byte identik |
| Video | `.mp4` atau `.webm` yang valid | Dapat dibaca atau diputar kembali dan byte identik |

Jalankan kedelapan cipher pada kelima jenis file menggunakan backend Ruby dan mode file utuh, sehingga ada sedikitnya 40 skenario pasangan enkripsi dan dekripsi file. Jumlah ini mencakup 35 skenario tujuh cipher sebelumnya dan lima skenario Enigma. Gunakan kunci uji yang tercatat dan bukan kunci pribadi pengguna.

Untuk setiap skenario, simpan algoritma, mode, parameter uji, nama contoh, ukuran asal, ukuran cipherteks, ukuran hasil dekripsi, checksum asal, checksum hasil, kesamaan byte, dan hasil pengujian aktual. Checksum serta perbandingan byte dihitung dari keluaran yang benar-benar dihasilkan.

### 9.4 Pengujian browser

Gunakan Playwright untuk menjalankan paling sedikit satu alur teks dan satu alur file melalui UI pada setiap dari delapan cipher. Jalankan layanan Ruby nyata dan jangan mengganti responsnya dengan mock pada pengujian penerimaan. Periksa pemilihan algoritma, formulir kunci, proses, ekspor, impor pada konteks baru, dan unduhan pemulihan.

Periksa juga respons formulir pada kunci tidak valid, pemulihan nama file, penyalinan Base64 tanpa perubahan, dan layout pada desktop serta layar sempit. Screenshot berasal dari sesi aplikasi tersebut.

### 9.5 Bukti penggunaan Ruby

Pengujian API memanggil delapan implementasi cipher di Ruby dengan vektor acuan, masukan tidak valid, dan kasus pemulihan file. Pengujian integrasi harus memperlihatkan bahwa hasil yang diterima frontend berasal dari jalur tersebut. Respons atau label bertuliskan Ruby saja tidak menjadi bukti eksekusi.

Sertakan hasil RSpec, pengujian API, dan alur Playwright yang menjalankan layanan Ruby. Tampilkan cuplikan kode Ruby yang relevan pada pembahasan implementasi dan sertakan kode lengkap pada lampiran. Parameter kunci uji harus berupa data contoh yang aman dibagikan.

## 10. Bahan yang disiapkan untuk laporan berikutnya

Simpan bahan berikut secara teratur bersama proyek.

| Bahan | Isi |
| --- | --- |
| Kode sumber | Frontend Next.js, backend Ruby untuk delapan cipher, konfigurasi, pnpm lockfile, Gemfile, dan Gemfile.lock |
| README | Prasyarat Ruby dan Node.js, instalasi, menjalankan kedua layanan, build, pengujian, kontrak API, bentuk kunci, dan konvensi algoritma |
| Fixture | Lima jenis file contoh yang valid serta pesan teks uji |
| Hasil contoh | File terenkripsi dan hasil dekripsi yang benar-benar dihasilkan |
| Hasil uji | Ringkasan delapan algoritma, 40 skenario file, hasil pengujian Ruby, integrasi API, dan pengujian browser yang aktual |
| Screenshot | Tampilan delapan cipher, formulir Enigma, hasil teks, alur file, dan contoh validasi dari aplikasi yang berjalan |
| Catatan teknis | Rumus, konvensi I/J dan padding, rotor dan stepping Enigma, codec file, format kontainer, serta pembagian frontend dan backend Ruby |

Screenshot yang disarankan mencakup tampilan utama, hasil teks untuk setiap cipher, dan contoh file untuk kelima kategori soal. Jumlah screenshot bukan ketentuan angka dari PDF. Pilih tangkapan yang cukup untuk memperlihatkan masukan, algoritma, keluaran, dan pemulihan dengan jelas.

README harus menjelaskan perbedaan ciphertext alfabet, Base64 payload, dan paket Base64, serta pengisian konfigurasi Enigma. Cantumkan cara memasang dependensi Ruby, menjalankan layanan API bersama frontend, dan menjalankan pengujian kedua bagian. Sertakan satu contoh perintah dan alur penggunaan yang benar-benar dapat diikuti dari salinan proyek baru.

Pada tahap laporan, PDF harus memuat screenshot, contoh beserta penjelasan, kode program, README, dan tabel penilaian sesuai soal. Tautan repositori tidak otomatis menggantikan permintaan kode program dalam laporan. Instruksi format laporan lain hanya ditambahkan bila pengguna atau dosen memberikan template tambahan.

### 10.1 Bentuk tabel dari soal

Isi tanda centang berdasarkan bukti setelah implementasi. Tabel berikut adalah struktur, bukan klaim keberhasilan.

| No | Spek | Berhasil | Kurang Berhasil | Keterangan |
| --- | --- | --- | --- | --- |
| 1 | Vigenere Cipher standard (26 huruf alfabet) | | | |
| 2 | Varian Vigenere Cipher standard (26 huruf alfabet), Auto-Key Vigenere Cipher | | | |
| 3 | Extended Vigenere Cipher (256 karakter ASCII) | | | |
| 4 | Playfair Cipher (26 huruf alfabet) | | | |
| 5 | Affine Cipher (26 huruf alfabet) | | | |
| 6 | Hill Cipher (26 huruf alfabet) | | | |
| 7 | Super enkripsi | | | |
| 8 | Bonus Enigma Cipher | | | |
| 9 | Bonus bahasa Ruby | | | |

Menurut PDF, Berhasil berarti sesuai spesifikasi dan benar pada enkripsi serta dekripsi, baik pesan yang diketik maupun file. Kurang Berhasil mencakup program tidak selesai, tidak berjalan, hasil salah, hanya dapat mengenkripsi, atau dukungan masukan yang terbatas. Masalah fungsional yang masih ada harus diterangkan pada laporan. Kedua bonus diambil dalam cakupan proyek ini. Baris Enigma dinilai dari hasil enkripsi dan dekripsi teks serta file. Baris Ruby dinilai dari implementasi mesin kriptografi dan integrasi web yang benar-benar menjalankan Ruby. Keduanya ditandai Berhasil hanya setelah bukti yang sesuai tersedia.

## 11. Urutan implementasi

1. Periksa aplikasi yang sudah ada, dokumentasikan kontrak masukan dan keluaran, serta simpan vektor dan paket contoh sebagai acuan kompatibilitas.
2. Tambahkan layanan Ruby dengan Sinatra dan Bundler dalam repositori yang sama. Pertahankan antarmuka Next.js yang sudah digunakan.
3. Pindahkan mesin tujuh cipher, codec, validasi, dan kontainer ke Ruby. Bandingkan hasilnya dengan vektor acuan dan contoh aplikasi sebelumnya.
4. Implementasikan Enigma I dalam Ruby beserta rotor, reflector, ring setting, plugboard, stepping, dan reset state per operasi.
5. Hubungkan alur aplikasi dengan API Ruby untuk seluruh delapan cipher dan tambahkan formulir Enigma pada UI yang ada.
6. Buktikan pemulihan lintas sesi pada 40 skenario file, pengujian Enigma, kompatibilitas paket, serta penanganan kegagalan backend.
7. Jalankan RSpec, pengujian frontend, integrasi API, Playwright, lint, typecheck, dan build yang relevan. Perbaiki regresi yang ditemukan.
8. Perbarui README dan instruksi implementasi proyek agar mencerminkan Ruby dan kedua bonus. Ambil screenshot aktual serta lengkapi bahan laporan berdasarkan hasil versi baru.

## 12. Definisi selesai

- Tujuh cipher wajib dan Enigma tersedia dalam satu antarmuka, sehingga total delapan algoritma.
- Enkripsi dan dekripsi seluruh cipher dijalankan oleh kode Ruby yang dipanggil aplikasi melalui API.
- Enigma memakai model, wiring, konfigurasi, dan mekanisme double stepping pada bagian 5.9 serta lulus TV-08, TV-09, dan kasus batas terkait.
- Ketujuh cipher sebelumnya tetap lulus vektor acuan dan paket lama dapat dipulihkan sesuai kriteria kompatibilitas.
- Input teks, Base64, file utuh, kunci pengguna, unduhan biner, serta pemulihan ekstensi bekerja melalui UI.
- Sebanyak 40 skenario file membuktikan kesamaan byte asal dan hasil dekripsi pada kedelapan cipher.
- Playfair dan Hill memulihkan pengisi melalui metadata, termasuk huruf X asli dan posisi J yang relevan.
- Paket yang diunduh dapat didekripsi pada sesi baru dengan paket dan kunci pengguna. Enigma memakai konfigurasi awal yang sama.
- State setiap operasi terisolasi dan kegagalan layanan Ruby tidak menghasilkan status sukses palsu atau jalur cipher pengganti di browser.
- Pengujian Ruby, frontend, integrasi API, dan browser berhasil, disertai pemeriksaan kode serta build produksi yang relevan.
- README dapat dipakai untuk menjalankan frontend dan backend dari awal dengan dependensi yang terkunci.
- Kode Ruby, hasil uji, dan screenshot aktual cukup untuk menjelaskan dua baris bonus pada laporan.

## 13. Rujukan teknis pendukung

Ketentuan penugasan tetap berasal dari PDF. Tautan berikut hanya mendukung definisi teknis dan tidak menambahkan syarat dari tugas lain.

- [RFC 4648, bagian 4 tentang Base64](https://www.rfc-editor.org/rfc/rfc4648#section-4) untuk alfabet Base64, pembedaan kapitalisasi, dan padding.
- [MDN TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) untuk konversi teks menjadi byte UTF-8.
- [MDN Blob arrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer) untuk pembacaan file sebagai byte.
- [CrypTool Hill](https://legacy.cryptool.org/en/cto/hill) untuk aritmetika Hill modulo 26, syarat invers, dan contoh ACT menjadi POH.
- [Auburn University, contoh Vigenere dan transposisi kolom](https://www.eng.auburn.edu/~xqin/research/qosec/all_labs/project6/index.html) untuk contoh ATTACKATDAWN dengan kunci LEMON dan konsep pengurutan kolom.

- [Crypto Museum, wiring Enigma I](https://www.cryptomuseum.com/crypto/enigma/wiring.htm) untuk pemetaan rotor, reflector, dan huruf turnover.
- [Crypto Museum, cara kerja Enigma](https://www.cryptomuseum.com/crypto/enigma/working.htm) untuk lintasan sinyal, plugboard, dan double stepping.
- [Py-Enigma, dokumentasi konfigurasi mesin](https://py-enigma.readthedocs.io/en/latest/reference.html) untuk konvensi ring setting, posisi rotor, serta pemeriksaan hasil dengan implementasi independen.
- [Dokumentasi Sinatra](https://sinatrarb.com/intro.html) untuk backend HTTP Ruby, Rack, dan Bundler.
- [Dokumentasi String Ruby](https://docs.ruby-lang.org/en/master/String.html) untuk pengolahan encoding, byte, dan ukuran data biner.
