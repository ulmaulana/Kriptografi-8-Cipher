# Bahan Laporan UTS Kriptografi

Aplikasi web kriptografi versi 1.1.0 dengan mesin Ruby dan antarmuka Next.js. Uraian implementasi berasal dari kode yang berjalan. Contoh hasil, tabel pengujian, checksum, dan screenshot berasal dari eksekusi yang disertakan dalam paket.

Sumber penugasan adalah [Soal UTS Kriptografi 20261](rujukan/Soal_UTS_Kriptografi_20261.pdf). Tujuh cipher wajib serta dua bonus disusun mengikuti butir soal. Codec file, paket .dat, dan perangkat pengujian merupakan pilihan implementasi aplikasi.

## 1. Tujuan dan Uraian Aplikasi

Kriptografi mengubah pesan menjadi cipherteks dengan menggunakan aturan transformasi dan kunci tertentu. Proses dekripsi menerapkan transformasi balik agar pesan dapat dipulihkan. Pada cipher klasik, hubungan antara bentuk data, pilihan kunci, dan aturan transformasi dapat diamati melalui contoh pesan maupun file.

Aplikasi ini menyediakan antarmuka web untuk menjalankan tujuh algoritma yang disebutkan dalam soal UTS Kriptografi, yaitu Vigenere standar, Auto-Key Vigenere, Extended Vigenere, Playfair, Affine, Hill, dan Super Enkripsi. Bonus Enigma Cipher diterapkan sebagai algoritma kedelapan. Bonus penggunaan bahasa Ruby diterapkan melalui backend yang menjalankan seluruh mesin kriptografi.

Masukan aplikasi dapat berupa pesan yang diketik atau file. Pengguna memilih algoritma, memasukkan kunci, menjalankan enkripsi atau dekripsi, kemudian melihat dan mengunduh hasilnya. Pemisahan antara mode teks alfabet dan file utuh memungkinkan aplikasi mengikuti aturan pembuangan karakter nonhuruf pada pesan alfabet sekaligus memulihkan file biner tanpa kehilangan byte.

Aplikasi bertujuan menyediakan sarana untuk mempelajari dan memeriksa proses enkripsi serta dekripsi delapan cipher melalui satu antarmuka. Perubahan hasil dapat diamati ketika pengguna mengganti pesan, algoritma, atau kunci.

Tujuan lain adalah mendukung pengolahan seluruh byte file, termasuk header, sehingga teks, gambar, database, audio, dan video dapat dikembalikan ke bentuk asal. Hasil pemulihan diperiksa menggunakan ukuran data, SHA-256, dan perbandingan byte. Nama serta ekstensi file asal dipertahankan melalui metadata paket.

Aplikasi juga menyediakan representasi Base64 untuk plainteks dan cipherteks. Representasi ini memudahkan penyalinan data biner melalui teks. Paket hasil enkripsi dapat diunduh atau disalin, lalu didekripsi pada sesi baru dengan kunci pengguna.

## 2. Teknologi, Komponen, dan Alur Penggunaan

### 2.1 Teknologi dan Pembagian Komponen

Antarmuka dibangun menggunakan TypeScript, React, dan Next.js App Router. Mesin kriptografi menggunakan Ruby, sedangkan layanan HTTP memakai Sinatra pada Rack dan Puma. Node.js dan pnpm digunakan untuk menjalankan aplikasi web, sementara Bundler mengelola dependensi Ruby.

Browser menangani formulir, pemilihan file, pratinjau masukan, penyalinan hasil, dan unduhan. Route Next.js meneruskan permintaan ke layanan Ruby. Ruby memvalidasi kunci, menyiapkan data, menjalankan algoritma, membentuk atau membaca kontainer, serta memeriksa hasil dekripsi. Dengan pembagian ini, keluaran cipher yang diterima antarmuka berasal dari backend Ruby.

File dibaca sebagai byte melalui `File.arrayBuffer()` dan dikirim sebagai bagian biner dalam request multipart. Hasil biner dibawa dalam respons JSON menggunakan Base64, kemudian dikembalikan menjadi byte untuk ditampilkan atau diunduh. Data unduhan dibentuk melalui `Blob`.

Setiap operasi mempunyai state sendiri. Khusus Enigma, posisi rotor kerja dibuat dari konfigurasi awal pada setiap permintaan. Posisi akhir suatu operasi tidak menjadi posisi awal permintaan berikutnya. Ketika layanan Ruby tidak tersedia atau melewati batas waktu, aplikasi menampilkan kegagalan operasi tanpa menjalankan mesin cipher pengganti di browser.

### 2.2 Antarmuka

Halaman aplikasi memiliki tiga tab, yaitu Beranda, Panduan, dan Tentang. Tab Beranda berisi meja kerja enkripsi serta dekripsi. Panduan menjelaskan alur penggunaan, bentuk keluaran, dan bentuk kunci. Tentang menjelaskan fungsi aplikasi, daftar cipher, serta penggunaan backend Ruby. Masukan pada meja kerja tetap tersimpan ketika pengguna berpindah tab.

Meja kerja tersusun dalam enam panel berikut.

| Panel | Fungsi |
| --- | --- |
| 01 Pilih cipher | Menampilkan delapan algoritma dan informasi cipher yang sedang dipilih |
| 02 Operasi | Memilih Enkripsi atau Dekripsi |
| 03 Jenis masukan | Memilih Teks atau File saat enkripsi, atau bentuk paket dan cipherteks saat dekripsi |
| 04 Masukan | Mengetik pesan, mengunggah file, menempelkan paket Base64, atau memasukkan cipherteks |
| 05 Kunci | Mengisi parameter sesuai algoritma dan menjalankan operasi |
| 06 Hasil | Menampilkan status, data hasil, representasi Base64, tombol salin, dan unduhan |

Formulir kunci menyesuaikan algoritma. Vigenere, Auto-Key, dan Playfair menerima kata kunci. Extended Vigenere menerima kunci byte dari teks UTF-8 atau heksadesimal. Affine memakai bilangan a dan b. Hill memakai matriks persegi dengan beberapa preset. Super Enkripsi memakai kunci byte dan kata kunci transposisi kolom.

Enigma menyediakan tiga pemilih rotor, tiga ring setting, tiga posisi awal, pilihan reflector, dan masukan plugboard. Urutan pengaturan selalu kiri, tengah, lalu kanan. Tombol reset mengembalikan pengaturan ke rotor I, II, III, ring 01, 01, 01, posisi AAA, reflector B, dan plugboard kosong. Posisi awal tetap terlihat setelah proses, sementara posisi akhir muncul sebagai detail hasil.

Kesalahan kunci ditampilkan pada kolom yang terkait. Selama proses berjalan, tombol operasi dinonaktifkan agar pengguna tidak mengirim permintaan ganda. Perubahan pesan atau kunci menandai hasil sebelumnya sebagai hasil lama sampai operasi dijalankan kembali.

Tema gelap dan terang dapat dipilih. Pada layar sempit, panel disusun secara vertikal agar formulir dan hasil tetap dapat dibaca. Pratinjau keluaran panjang dibatasi hingga 4.000 karakter dengan keterangan jumlah data yang ditampilkan. Penyalinan dan unduhan menggunakan data lengkap.

### 2.3 Alur Enkripsi Teks

Pengguna memilih cipher, operasi Enkripsi, dan masukan Teks. Pesan dimasukkan pada kolom yang tersedia, kemudian kunci diisi sesuai algoritma. Pada cipher alfabet, pratinjau normalisasi menunjukkan huruf yang akan diproses. Pada cipher byte, teks dikonversi menjadi byte UTF-8 dengan spasi dan tanda baca tetap dipertahankan.

Setelah tombol Enkripsi ditekan, backend memvalidasi kunci dan menjalankan transformasi. Panel hasil menampilkan plainteks yang diproses, plainteks Base64, cipherteks huruf apabila algoritmanya berbasis alfabet, dan cipherteks Base64. Pengguna dapat mengunduh paket `.dat`, menyalin paket lengkap, atau memakai tombol Gunakan hasil untuk dekripsi.

Contoh aktual Vigenere dengan pesan `Serang pukul 10.30!` dan kunci `KRIPTO` memproses plainteks `SERANGPUKUL` menjadi cipherteks `CVZPGUZLSJE`. Representasi Base64 payloadnya adalah `Q1ZaUEdVWkxTSkU=`. Dekripsi paket mengembalikan `SERANGPUKUL` dengan pemeriksaan checksum yang cocok.

Contoh aktual Enigma dengan pesan `HELLOWORLD`, rotor I, II, III, ring 01, 01, 01, posisi AAA, reflector B, dan plugboard kosong menghasilkan `ILBDAAMTAZ`. Dekripsi menggunakan konfigurasi awal yang sama dan mengembalikan `HELLOWORLD`.

### 2.4 Alur Enkripsi dan Dekripsi File

Untuk mengenkripsi file, pengguna memilih masukan File, mengunggah file, lalu mengisi kunci. Mode File utuh menjadi pilihan awal. Aplikasi menampilkan nama, ekstensi, dan ukuran file sebelum memproses seluruh byte. Hasil enkripsi diunduh sebagai paket dengan tambahan ekstensi `.dat`.

Dekripsi dapat dilakukan setelah halaman dimuat ulang atau pada konteks browser baru. Pengguna memilih Dekripsi, mengunggah paket `.dat` atau menempelkan paket Base64, lalu memasukkan kembali kunci. Algoritma, mode masukan, dan nama file dibaca dari metadata paket. Backend mendekripsi payload, memulihkan penanda pengisi bila ada, membalik codec, dan memeriksa ukuran serta SHA-256.

Hasil dinyatakan pulih apabila pemeriksaan sesuai dengan metadata. File dapat diunduh memakai nama dan ekstensi asal. Pengguna juga dapat mengganti bagian nama keluaran tanpa mengubah ekstensi yang diperlukan untuk membuka file tersebut.

Pada contoh gambar PNG yang diproses dengan Enigma, file asal dan hasil pemulihan sama-sama berukuran 13.519 byte. Pengujian mencatat kesamaan byte dan checksum. Pada kategori lain, Enigma juga memulihkan file teks 263 byte, database SQLite 20.480 byte, audio WAV 16.044 byte, dan video WebM 43.791 byte. Kelima file kembali identik dengan masukan.

## 3. Implementasi algoritma

Aplikasi menjalankan delapan algoritma pada backend Ruby. Tujuh algoritma utama adalah Vigenere standar, Auto-Key Vigenere, Extended Vigenere, Playfair, Affine, Hill, dan Super Enkripsi. Enigma I menjadi algoritma tambahan untuk bonus Enigma. Bonus bahasa Ruby diterapkan pada bagian yang memproses data, yaitu transformasi cipher, validasi kunci, codec file, pembuatan paket, pembacaan paket, dan pemeriksaan hasil dekripsi.

### 3.1 Aturan bersama dan validasi kunci

Cipher alfabet memakai nilai A = 0 sampai Z = 25. Cipher byte memakai nilai 0 sampai 255.

Kunci diperiksa oleh Ruby sebelum operasi. Formulir melakukan validasi awal untuk membantu pengguna, tetapi hasil operasi tetap mengikuti validasi backend. Kata kunci alfabet yang tidak menyisakan huruf ditolak. Kunci byte harus menghasilkan sedikitnya satu byte. Pesan teks kosong ditolak, termasuk pesan alfabet yang habis setelah normalisasi. File berukuran nol byte tetap dapat dienkripsi dan didekripsi dengan kunci yang valid.

Untuk pembahasan rumus, `P[i]` menyatakan simbol plainteks, `C[i]` simbol cipherteks, `K[i]` simbol kunci, dan `mod` menghasilkan sisa yang tidak negatif. Pada cipher alfabet modulusnya 26, sedangkan pada cipher byte modulusnya 256. Setiap operasi baru memulai indeks kunci dari awal.

### 3.2 Vigenere Cipher standar

Vigenere standar memakai kata kunci alfabet yang diulang sepanjang pesan. Jika panjang kunci adalah m, enkripsi memakai `C[i] = mod(P[i] + K[i mod m], 26)`. Dekripsi memakai `P[i] = mod(C[i] - K[i mod m], 26)`. Ruby membaca huruf sebagai kode ASCII, mengurangi 65 untuk memperoleh nilai 0 sampai 25, melakukan transformasi, kemudian menambahkan 65 untuk membentuk huruf hasil.

Kata kunci dinormalisasi dengan aturan yang sama seperti pesan alfabet. Kunci satu huruf maupun kunci yang lebih panjang daripada pesan diterima selama tidak kosong. Huruf yang dibuang dari pesan tidak menggeser indeks kunci karena transformasi dimulai setelah normalisasi selesai.

Pada contoh operasi yang tersimpan, pesan `Serang pukul 10.30!` dengan kunci `KRIPTO` diproses sebagai `SERANGPUKUL`. Cipherteksnya adalah `CVZPGUZLSJE`, dengan Base64 payload `Q1ZaUEdVWkxTSkU=`. Dekripsi paket mengembalikan `SERANGPUKUL` dan pemeriksaan checksum sesuai dengan data yang diproses.

### 3.3 Auto-Key Vigenere Cipher

Auto-Key memakai primer alfabet di awal aliran kunci, kemudian melanjutkannya dengan plainteks. Jika panjang primer adalah m, nilai aliran kunci untuk posisi i adalah `K[i] = primer[i]` ketika `i < m`. Setelah primer habis, alirannya menjadi `K[i] = P[i - m]`. Enkripsi tetap memakai penjumlahan modulo 26.

Dekripsi berjalan dari kiri ke kanan. Pada bagian awal, cipherteks dikurangi dengan primer. Pada posisi setelah primer, pengurang diambil dari huruf plainteks yang sudah dipulihkan pada posisi `i - m`. Dengan demikian, backend membangun kembali aliran kunci dari hasil dekripsi. Primer tidak diulang seperti kata kunci Vigenere standar.

Primer dinormalisasi menjadi huruf kapital A sampai Z dan ditolak apabila hasilnya kosong. Primer yang lebih panjang daripada pesan tetap valid. Pada kondisi tersebut, seluruh pesan memakai bagian awal primer.

Contoh pesan `Ujian tengah semester kriptografi` dengan primer `UTS` dinormalisasi menjadi `UJIANTENGAHSEMESTERKRIPTOGRAFI`. Hasil enkripsinya `OCAUWBEAZEUYETWWFIJDVZZKWVKOLZ`. Dekripsi paket mengembalikan teks normalisasi yang sama. Base64 payload pada contoh ini adalah `T0NBVVdCRUFaRVVZRVRXV0ZJSkRWWlpLV1ZLT0xa`.

### 3.4 Extended Vigenere Cipher

Extended Vigenere memakai nilai byte 0 sampai 255. Untuk kunci byte sepanjang m, rumus enkripsi adalah `C[i] = mod(P[i] + K[i mod m], 256)`. Dekripsi memakai `P[i] = mod(C[i] - K[i mod m], 256)`. Setiap posisi byte diproses, termasuk byte nol dan byte 255.

Pengguna dapat memasukkan kunci sebagai teks atau heksadesimal. Kunci teks diubah menjadi UTF-8 dengan spasi dan kapitalisasi tetap dipertahankan. Pada kunci heksadesimal, backend mengabaikan penanda `0x`, spasi, koma, dan titik dua, lalu memeriksa apakah seluruh digit tersisa termasuk 0 sampai 9 atau A sampai F. Jumlah digit harus genap karena dua digit mewakili satu byte. Kunci yang menghasilkan nol byte ditolak.

Teks ketikan juga diubah menjadi UTF-8. File utuh tidak melewati normalisasi huruf atau decoding teks. Cipherteks dapat berisi byte yang bukan UTF-8 sehingga representasi utama hasil enkripsi adalah Base64. Base64 hanya menampilkan byte hasil cipher, tanpa menambahkan tahap kriptografi.

Contoh pesan `Halo, Dunia! Byte 0-255 ✓` dengan kunci teks `kunci` menghasilkan Base64 payload `s9ba0pWLuePR0syWjqXi39qOk5adqqODSwcI`. Dekripsi paket mengembalikan pesan lengkap, termasuk spasi, tanda baca, dan karakter ✓.

### 3.5 Playfair Cipher

Playfair memakai matriks 5 x 5 dengan alfabet `ABCDEFGHIKLMNOPQRSTUVWXYZ`. Huruf J digabung menjadi I saat pembentukan matriks dan persiapan pasangan. Kata kunci dinormalisasi, J pada kunci diubah menjadi I, dan kemunculan huruf yang sama diabaikan setelah kemunculan pertamanya. Sisa huruf alfabet kemudian ditambahkan hingga matriks berisi 25 huruf.

Pesan yang sudah dinormalisasi diproses dari kiri ke kanan untuk membentuk pasangan. Apabila dua huruf pada pasangan yang sedang dibentuk sama, backend menyisipkan X sebagai huruf kedua dan meneruskan pemrosesan dari huruf masukan berikutnya. Jika huruf pertamanya X, pengisi yang dipilih adalah Q. Huruf terakhir yang tidak mempunyai pasangan juga diberi pengisi dengan aturan yang sama. Dua huruf berurutan yang sama tidak selalu memerlukan pengisi apabila keduanya berada pada pasangan yang berbeda.

Enkripsi mengikuti tiga aturan. Dua huruf pada baris yang sama digeser satu kolom ke kanan. Dua huruf pada kolom yang sama digeser satu baris ke bawah. Untuk dua huruf yang membentuk persegi panjang, setiap huruf tetap pada barisnya tetapi memakai kolom huruf pasangannya. Pergeseran pada tepi matriks berputar ke awal baris atau kolom.

Dekripsi menggeser pasangan pada baris yang sama satu kolom ke kiri dan pasangan pada kolom yang sama satu baris ke atas. Aturan persegi panjang memakai pertukaran kolom yang sama seperti enkripsi. Payload dengan panjang ganjil, huruf J, atau dua huruf identik dalam satu pasangan ditolak.

Paket aplikasi menyimpan posisi huruf pengisi dan posisi J asli dalam bentuk bitset. Setelah pasangan didekripsi, backend membuang hanya huruf pada posisi yang ditandai sebagai pengisi. Backend kemudian mengembalikan I menjadi J hanya pada posisi J yang tercatat. Huruf X dan Q asli tetap dipertahankan. Pada mode file utuh, codec tidak menghasilkan J sehingga penanda J tidak diperlukan.

Contoh pesan `Jangan lewatkan pesan XX ini` dengan kunci `MONARCHY` diproses sebagai `JANGANLEWATKANPESANXXINI`. Cipherteksnya `SBYQRAULXNZTRALFXBAWASAG`, dengan Base64 payload `U0JZUVJBVUxYTlpUUkFMRlhCQVdBU0FH`. Metadata pada contoh ini mencatat satu J dan nol huruf pengisi. Kedua X berurutan berada pada pasangan berbeda. Dekripsi paket mengembalikan J dan mempertahankan kedua X asli.

Cipherteks Playfair mentah tidak mempunyai penanda pengisi dan J. Karena itu, hasil dekripsi mentah tetap berisi huruf pengisi dan I hasil penggabungan J. Backend tidak menebak apakah sebuah X atau Q berasal dari pesan atau dari persiapan pasangan.

### 3.6 Affine Cipher

Affine memakai dua bilangan bulat a dan b. Enkripsi memakai `C[i] = mod(a × P[i] + b, 26)`. Dekripsi memakai `P[i] = mod(a^-1 × (C[i] - b), 26)`, dengan `a^-1` sebagai invers perkalian a modulo 26.

Backend menerima a dan b sebagai bilangan bulat, kemudian mereduksi keduanya modulo 26. Nilai negatif dan nilai di atas 25 dapat digunakan selama bentuk masukan tetap bilangan bulat. Syarat untuk a adalah `gcd(a, 26) = 1`. Setelah reduksi, nilai a yang valid adalah 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, dan 25. Nilai a yang tidak mempunyai invers ditolak. Backend menghitung invers memakai algoritma Euclid diperluas.

Contoh pesan `Affine cipher` dengan a = 5 dan b = 8 dinormalisasi menjadi `AFFINECIPHER`. Enkripsi menghasilkan `IHHWVCSWFRCP` dan Base64 payload `SUhIV1ZDU1dGUkNQ`. Dekripsi paket mengembalikan `AFFINECIPHER`.

### 3.7 Hill Cipher

Hill memakai matriks kunci persegi K berukuran n x n. Pesan dibagi menjadi blok n huruf yang diperlakukan sebagai vektor kolom. Enkripsi memakai `C = K × P mod 26`. Dekripsi memakai `P = K^-1 × C mod 26`.

Seluruh elemen matriks harus berupa bilangan bulat, kemudian direduksi modulo 26. Backend memeriksa jumlah baris dan kolom, ukuran matriks, dan keberadaan invers. Ukuran yang diterima adalah 2 x 2 sampai 10 x 10. Matriks dapat ditulis sebagai baris angka yang dipisahkan baris baru atau dalam bentuk bracket. Matriks ditolak apabila singular atau determinannya tidak relatif prima terhadap 26.

Invers dihitung dengan eliminasi Gauss-Jordan pada medan modulo 2 dan modulo 13. Setiap elemen dari kedua invers digabung dengan Chinese Remainder Theorem. Jika suatu elemen mempunyai residu r2 modulo 2 dan r13 modulo 13, penggabungannya memakai `x = mod(r13 + 13 × mod(r2 - r13, 2), 26)`. Cara ini memakai aritmetika modular yang tepat dan tidak membulatkan invers matriks bilangan real. Matriks `[[2,1],[13,7]]` dapat diterima karena determinannya 1, walaupun elemen pada kolom pertamanya tidak invertibel secara individual modulo 26.

Huruf X ditambahkan hanya apabila panjang pesan bukan kelipatan n. Jumlah pengisi dihitung sebagai `padCount = mod(n - mod(L, n), n)`, dengan L sebagai panjang pesan yang masuk ke Hill. Ukuran blok dan jumlah pengisi disimpan dalam metadata paket. Dekripsi paket membuang tepat jumlah pengisi tersebut. Dekripsi mentah mempertahankan padding X karena panjang pesan asli tidak tersedia. Cipherteks yang panjangnya bukan kelipatan ukuran matriks ditolak.

Contoh pesan `Kriptografi klasik` dinormalisasi menjadi `KRIPTOGRAFIKLASIK`, sepanjang 17 huruf. Matriks yang digunakan adalah `[[6,24,1],[13,16,10],[20,17,15]]`. Backend menambahkan satu X untuk membentuk enam blok berukuran tiga huruf, lalu menghasilkan `IOLOPBCMTYHWGLWZAZ`. Base64 payloadnya `SU9MT1BCQ01UWUhXR0xXWkFa`. Dekripsi paket membuang satu padding yang tercatat dan mengembalikan `KRIPTOGRAFIKLASIK`.

### 3.8 Super Enkripsi

Super Enkripsi menggabungkan Extended Vigenere dan transposisi kolom. Pengguna memasukkan kunci byte untuk Extended Vigenere serta kata kunci alfabet untuk transposisi. Keduanya harus valid dan tidak kosong. Kunci byte mengikuti pilihan teks atau heksadesimal, sedangkan kata kunci kolom dinormalisasi menjadi huruf kapital A sampai Z.

Tahap pertama menjumlahkan setiap byte plainteks dengan byte kunci secara berulang modulo 256. Tahap kedua mengubah urutan byte hasil Extended Vigenere. Jika kata kunci kolom mempunyai m huruf, data ditempatkan secara konseptual dari kiri ke kanan per baris dengan lebar m. Kolom diurutkan menurut huruf kata kunci. Apabila terdapat huruf yang sama, kolom dengan indeks lebih kecil dibaca lebih dahulu. Setiap kolom dibaca dari atas ke bawah untuk membentuk payload akhir.

Transposisi tidak menambahkan padding. Kolom paling kiri pada susunan asli memperoleh satu byte tambahan apabila baris terakhir belum penuh. Kunci kolom yang lebih panjang daripada data tetap diterima, dengan sebagian kolom berisi nol byte. Sebagai contoh urutan kolom, kata kunci `BABA` menghasilkan urutan indeks `[1,3,0,2]`, dengan indeks pertama bernilai nol.

Dekripsi membalik transposisi lebih dahulu. Implementasi menempatkan kembali setiap byte pada indeks kolom aslinya, kemudian menjalankan pengurangan Extended Vigenere modulo 256. Transposisi bekerja pada byte hasil cipher, bukan pada karakter string Base64.

Contoh pesan `Super enkripsi pada byte` dengan kunci byte teks `SuperKunci` dan kata kunci kolom `TRANSPOSISI` menghasilkan Base64 payload `4M7OibzuypLa0mvW6uPK5LvcxNu1puXk`. Dekripsi paket mengembalikan pesan lengkap dengan spasinya.

### 3.9 Enigma Cipher sebagai bonus

Implementasi bonus menggunakan simulasi Enigma I dengan tiga rotor dan entry wheel identitas. Kuncinya mencakup urutan rotor, tiga ring setting, tiga posisi awal, reflector, dan pasangan plugboard. Urutan tiga rotor selalu dinyatakan dari kiri ke kanan. Rotor dipilih dari I sampai V dan ketiganya harus berbeda. Reflector yang tersedia adalah B dan C.

| Rotor | Wiring untuk masukan ABCDEFGHIJKLMNOPQRSTUVWXYZ | Huruf turnover pada jendela |
| --- | --- | --- |
| I | `EKMFLGDQVZNTOWYHXUSPAIBRCJ` | Q |
| II | `AJDKSIRUXBLHWTMCQGZNPYFVOE` | E |
| III | `BDFHJLCPRTXVZNYEIWGAKMUSQO` | V |
| IV | `ESOVPZJAYQUIRHXLNFTGKDCMWB` | J |
| V | `VZBRGITYUPSDNHLXAWMJQOFECK` | Z |

Reflector B memakai wiring `YRUHQSLDPXNGOKMIEBFZCWVJAT`, sedangkan reflector C memakai `FVPJIAOYEDRZXWGCTKUQSBNMHL`. Wiring balik rotor dibentuk dengan menghitung invers permutasi wiring maju.

Ring setting pada formulir dan API bernilai 1 sampai 26, lalu dikurangi satu di Ruby untuk memperoleh indeks internal 0 sampai 25. Posisi awal berupa tiga huruf A sampai Z. Jika posisi jendela rotor adalah p dan ring setting internal adalah r, offset wiring adalah `o = mod(p - r, 26)`. Untuk wiring maju W, lintasannya menjadi `y = mod(W[mod(x + o, 26)] - o, 26)`. Lintasan balik memakai invers W dengan koreksi offset yang sama.

Rotor bergerak sebelum setiap huruf diproses. Backend membaca kondisi turnover rotor kanan dan rotor tengah dari posisi sebelum pergerakan. Rotor kanan selalu maju satu langkah. Rotor tengah maju apabila rotor kanan atau rotor tengah berada pada turnover. Rotor kiri maju apabila rotor tengah berada pada turnover. Semua keputusan dibuat dari kondisi awal langkah yang sama sehingga double stepping dapat terjadi. Ring setting mengubah offset wiring, sedangkan pemeriksaan turnover tetap memakai huruf pada jendela rotor.

Setelah rotor bergerak, sinyal melewati plugboard, rotor kanan, tengah, kiri, reflector, invers rotor kiri, tengah, kanan, dan plugboard kembali. Plugboard menerima nol sampai 13 pasangan seperti `AB CD`. Setiap pasangan harus berisi dua huruf ASCII yang berbeda. Huruf yang sudah dipakai pada suatu pasangan tidak boleh dipakai lagi. Huruf tanpa pasangan dipetakan ke dirinya sendiri. Kunci dengan rotor duplikat, pilihan reflector tidak dikenal, ring setting di luar rentang, posisi awal tidak valid, atau pasangan plugboard yang salah ditolak.

Enkripsi dan dekripsi memakai transformasi yang sama. Dekripsi harus memulai rotor dari konfigurasi awal yang sama dengan enkripsi. Backend membuat objek mesin baru untuk setiap operasi dan menyalin posisi awal ke state kerja. Posisi yang berubah selama pemrosesan tidak mengubah konfigurasi pengguna. Dalam satu operasi file, state mesin berjalan sampai semua huruf hasil codec selesai diproses. Huruf yang dibuang ketika normalisasi tidak menyebabkan rotor bergerak. Enigma mempertahankan perbedaan I dan J serta tidak menambahkan padding.

Contoh pesan `HELLOWORLD` dengan rotor I, II, III, ring 01, 01, 01, posisi awal AAA, reflector B, dan plugboard kosong menghasilkan `ILBDAAMTAZ`. Base64 payloadnya adalah `SUxCREFBTVRBWg==`. Dekripsi dengan konfigurasi awal yang sama mengembalikan `HELLOWORLD`. Konfigurasi kunci Enigma tidak disimpan di dalam paket.

## 4. Penanganan teks dan file

### 4.1 Teks alfabet dan file utuh

Vigenere, Auto-Key, Playfair, Affine, Hill, dan Enigma merupakan cipher alfabet. Pada masukan teks, aplikasi mempertahankan hanya huruf ASCII A sampai Z dan a sampai z, kemudian mengubah huruf kecil menjadi kapital. Angka, spasi, tanda baca, dan karakter non-ASCII dibuang. Penyaringan dilakukan sebelum perubahan kapitalisasi sehingga karakter seperti ß tidak berubah menjadi huruf tambahan. Sebagai contoh, `Serang pukul 10.30!` menjadi `SERANGPUKUL`. Hasil dekripsinya dibandingkan dengan bentuk yang telah dinormalisasi.

Extended Vigenere dan Super Enkripsi bekerja pada byte. Teks ketikan diubah menjadi UTF-8 sehingga spasi, tanda baca, angka, dan karakter multibyte tetap menjadi bagian data. Pada mode file utuh, seluruh algoritma memproses semua byte file, termasuk header. Keenam cipher alfabet memakai codec byte ke huruf sebelum transformasi cipher. Extended Vigenere dan Super Enkripsi memproses byte tersebut secara langsung.

Mode file utuh menjadi jalur awal untuk unggahan file, termasuk file teks. Pengguna cipher alfabet dapat memilih membaca isi file sebagai teks alfabet. Pilihan itu menerapkan penyaringan huruf seperti masukan teks ketikan. Hasilnya diperiksa terhadap teks normalisasi, sedangkan pemulihan identik byte demi byte berlaku pada mode file utuh.

### 4.2 Codec untuk file utuh

Codec `alpha25-v1` memetakan seluruh byte file menjadi huruf pada alfabet `ABCDEFGHIKLMNOPQRSTUVWXYZ`. Alfabet ini mempunyai 25 simbol tanpa J sehingga dapat dipakai oleh Playfair dan kelima cipher alfabet lainnya.

Untuk byte b, simbol pertama mempunyai indeks `floor(b / 25)` dan simbol kedua mempunyai indeks `b mod 25`. Setiap byte menghasilkan tepat dua huruf sebelum cipher dijalankan. Byte 0 menjadi `AA` dan byte 255 menjadi `LF`. Kedua huruf tersebut tetap dienkripsi dengan algoritma yang dipilih. Codec sendiri merupakan representasi data yang dapat dibalik.

Setelah dekripsi alfabet dan pemulihan pengisi selesai, setiap pasangan dikembalikan menjadi byte dengan `b = 25 × indeksPertama + indeksKedua`. Backend menolak panjang huruf ganjil, simbol di luar alfabet codec, dan pasangan yang menghasilkan nilai lebih dari 255. Dengan mekanisme ini, file gambar, database, audio, video, dan teks tetap dapat dipulihkan sebagai byte utuh melalui cipher alfabet.

Codec memperbesar masukan menjadi dua huruf per byte. Playfair dapat menambahkan pengisi sehingga payloadnya lebih panjang lagi. Hill dapat menambahkan paling banyak n - 1 huruf X untuk melengkapi blok. Vigenere, Auto-Key, Affine, dan Enigma mempertahankan jumlah huruf setelah codec. Extended Vigenere dan Super Enkripsi mempertahankan panjang byte file karena keduanya tidak menggunakan codec atau padding.

### 4.3 Paket biner dan metadata pemulihan

Unduhan cipherteks `.dat` berisi kontainer biner versi 1. Kontainer dimulai dengan delapan byte ASCII `UTSKRIPT`, diikuti satu byte versi, empat byte panjang metadata dalam urutan big endian, metadata JSON UTF-8, lalu payload cipherteks. Bagian tetap header berukuran 13 byte.

| Bagian | Isi |
| --- | --- |
| Penanda format | `UTSKRIPT`, delapan byte |
| Versi | Nilai 1, satu byte |
| Panjang metadata | Bilangan unsigned big endian, empat byte |
| Metadata | JSON UTF-8 dengan panjang sesuai header |
| Payload | Seluruh byte cipherteks |

Metadata memuat ID algoritma, mode masukan, codec, encoding payload, panjang payload, ukuran data yang diharapkan, dan SHA-256 data yang akan dipulihkan. Pada file utuh, metadata juga memuat nama dan MIME file asal. Pada file yang sengaja dibaca sebagai teks alfabet, metadata menyimpan nama file sumber. Metadata Playfair berisi bitset posisi pengisi serta bitset J ketika dibutuhkan. Metadata Hill berisi ukuran blok dan jumlah padding.

Bitset memakai satu bit per posisi dengan urutan bit paling rendah lebih dahulu. Array byte bitset dikodekan menjadi Base64 sebelum ditempatkan dalam JSON. Representasi ini menjaga ukuran metadata pengisi agar tidak memerlukan satu elemen JSON untuk setiap huruf. Parser memeriksa panjang bitset, jumlah bit aktif, dan ketiadaan bit aktif di luar panjang data.

Parser memvalidasi penanda format, versi, batas panjang header, JSON UTF-8, algoritma, codec, encoding payload, panjang payload, dan konsistensi metadata pemulihan. Paket terpotong atau metadata yang tidak sesuai ditolak sebelum pemulihan. Payload alfabet dalam paket harus berisi huruf kapital A sampai Z.

Setelah dekripsi, backend membandingkan ukuran hasil dengan ukuran yang tercatat, lalu menghitung SHA-256 hasil dan membandingkannya dengan checksum paket. Status pemulihan berhasil hanya diberikan apabila keduanya sesuai. Checksum yang berbeda menghasilkan pesan bahwa kunci atau data paket perlu diperiksa. SHA-256 pada paket digunakan untuk pemeriksaan kesamaan hasil. Implementasi tidak menambahkan MAC sehingga checksum tersebut tidak menjadi bukti autentikasi paket.

Kunci, plainteks lengkap, dan salinan file asli tidak menjadi bagian metadata. Header file asal tetap berada dalam data yang dienkripsi. Header kontainer adalah struktur baru untuk membaca paket. Nama file dari metadata diperlakukan sebagai nama unduhan, dengan komponen path dan karakter terlarang dibersihkan. Hasil dekripsi file dapat diunduh dengan nama dan ekstensi asal.

### 4.4 Base64 dan dekripsi tanpa paket

Aplikasi membedakan Base64 plainteks, Base64 payload cipherteks, dan Base64 paket. Base64 plainteks mewakili byte sebelum cipher, yaitu teks normalisasi, UTF-8, atau file asli sesuai mode. Base64 payload hanya mewakili byte hasil cipher. Base64 paket memuat seluruh kontainer, termasuk metadata pemulihan. Paket dipakai untuk dekripsi lengkap setelah halaman dimuat ulang.

Kapitalisasi Base64 dipertahankan karena huruf besar dan kecil mempunyai arti berbeda. Decoder menerima spasi, tab, dan baris baru yang terbawa saat menyalin, tetapi menolak karakter di luar alfabet Base64, panjang yang salah, padding yang tidak sesuai, serta bit sisa sebelum padding yang tidak nol. Normalisasi alfabet pada payload mentah dilakukan setelah decoding Base64.

Dekripsi tersedia dari paket `.dat`, Base64 paket, cipherteks alfabet mentah, atau Base64 payload. Algoritma dan mode untuk paket diambil dari metadata, sedangkan pengguna tetap memasukkan kunci. Cipherteks alfabet mentah hanya berlaku pada enam cipher alfabet. Jalur mentah tidak memiliki nama file, informasi padding lengkap, dan checksum asal untuk pembandingan. Statusnya tidak menyatakan pemulihan yang terverifikasi meskipun fungsi dekripsi selesai.

### 4.5 Batas implementasi yang memengaruhi penggunaan

| Bagian | Batas aktual |
| --- | --- |
| Pesan atau file sebelum enkripsi | 50 MiB, setara 52.428.800 byte |
| Kunci berbentuk teks | 65.536 karakter pada backend |
| Matriks Hill | Ukuran 2 x 2 sampai 10 x 10 |
| Bilangan pada Affine dan Hill | Nilai absolut paling besar 2^53 - 1 sebelum reduksi modulo 26 |
| Metadata kontainer | Paling besar 64 MiB |
| Payload kontainer | Paling besar 256 MiB |
| Body permintaan ke proxy Next.js | Paling besar 351 MiB |
| Body permintaan langsung ke Ruby | Paling besar 400 MiB |

Kata kunci boleh lebih panjang daripada pesan selama masih berada dalam batas sumber daya tersebut. Batas ukuran berlaku tanpa memotong file. Ukuran payload dan paket dapat melebihi ukuran file asal karena codec, pengisi, metadata, dan representasi Base64.

Pemrosesan menggunakan backend sehingga data dan kunci dikirim ke layanan Ruby. Layanan tidak menyimpan file masukan secara permanen. Tempfile multipart dibersihkan, termasuk ketika request gagal. Layanan diperlukan selama operasi. Kegagalan koneksi atau waktu tunggu menghasilkan kesalahan pada antarmuka. Proxy mempunyai waktu tunggu bawaan 180 detik, sedangkan klien operasi memakai 190 detik. Pengaturan waktu tunggu proxy dapat diubah melalui konfigurasi aplikasi.

### 4.6 Sumber pemeriksaan implementasi

Uraian ini mengikuti kode Ruby dan jalur HTTP aktual. Contoh pesan, parameter, cipherteks, hasil dekripsi, dan status checksum berasal dari [hasil contoh teks](bukti/evidence/text-examples.json). Paket contoh tersedia bersama hasil operasi pada direktori sampel bukti.

| Sumber kode | Bagian yang diperiksa |
| --- | --- |
| `apps/api/lib/uts_crypto/ciphers/classical.rb` | Vigenere, Auto-Key, Extended Vigenere, Affine, Hill, transposisi, dan Super Enkripsi |
| `apps/api/lib/uts_crypto/ciphers/playfair.rb` | Matriks, pembentukan pasangan, bitset pengisi, dan pemulihan J |
| `apps/api/lib/uts_crypto/ciphers/enigma.rb` | Wiring, ring setting, pergerakan rotor, lintasan sinyal, dan state mesin |
| `apps/api/lib/uts_crypto/ciphers/modular.rb` | Invers modular, eliminasi pada medan prima, dan CRT |
| `apps/api/lib/uts_crypto/keys.rb` | Validasi kunci dan batas parameter |
| `apps/api/lib/uts_crypto/codecs.rb` | Normalisasi, Base64, bitset, dan codec alpha25 |
| `apps/api/lib/uts_crypto/container.rb` | Format paket, validasi metadata, dan pembersihan nama file |
| `apps/api/lib/uts_crypto/engine.rb` | Pemilihan jalur data, metadata pemulihan, dan verifikasi dekripsi |
| `apps/api/app.rb` | Endpoint Sinatra, parsing JSON dan multipart, serta pembersihan tempfile |
| `src/app/api/crypto/proxy.ts` | Penerusan request, batas transport, dan waktu tunggu layanan |
| `src/lib/engine/http.ts` | Pengiriman data dari antarmuka dan pembacaan respons Ruby |

## 5. Pengujian dan hasil aktual

Pengujian bahan laporan ini dijalankan pada 01-10-2026 pukul 16.33.01 WIB. Perintah `pnpm test:all` selesai dengan kode keluar 0. Pemeriksaan tipe, lint, dan build produksi berhasil. Angka berikut diperoleh dari keluaran RSpec, Vitest, Playwright, dan pemeriksaan format file.

### 5.1 Metode dan cakupan

Pengujian algoritma memakai vektor acuan tetap untuk membandingkan hasil enkripsi dan dekripsi. Pengujian pemulihan tambahan membandingkan data asal dengan hasil dekripsi. Pengujian Ruby juga memeriksa codec, kontainer, kunci tidak valid, panjang masukan, padding, pergeseran rotor Enigma, reset state, serta kompatibilitas paket versi lama.

Untuk setiap pasangan cipher dan jenis file, file dibaca sebagai byte, dienkripsi melalui Ruby, disimpan sebagai paket .dat, dibaca kembali dari disk, dan didekripsi dengan kunci contoh yang sama. File pulih ditulis kembali, lalu dibandingkan byte, ukuran, dan SHA-256 dengan file asal. Terdapat 8 cipher dikalikan 5 jenis file, sehingga jumlah skenario file adalah 40.

Pengujian browser menjalankan satu alur teks dan satu alur file untuk setiap cipher. Paket diunduh melalui tombol aplikasi, kemudian diunggah dan didekripsi pada konteks browser baru tanpa state dari halaman enkripsi. File biner hasil dekripsi juga diunduh dan dibandingkan dengan asal. Cakupan ini adalah 8 alur file browser yang mewakili semua kategori, sedangkan pemeriksaan 40 kombinasi lengkap dilakukan melalui API Ruby. Keduanya dicatat terpisah.

| Pemeriksaan | Hasil aktual |
| --- | --- |
| RSpec Ruby | 201 contoh, 0 gagal, 0 pending |
| Vitest aplikasi dan integrasi | 159 lulus dari 159 tes |
| Bukti enkripsi dan dekripsi melalui Ruby | 40 skenario file dan 8 contoh teks, seluruhnya lulus |
| Playwright browser | 30 lulus, 0 gagal, 0 dilewati |
| Format teks, PNG, SQLite, dan WAV hasil pulih | 32 lulus dari 32 pemeriksaan |
| Video hasil pulih | 8 video dari seluruh cipher berhasil dimuat oleh dekoder browser pada ukuran 160 x 120 |
| TypeScript, ESLint, dan build Next.js | Berhasil dalam eksekusi pnpm test:all |

Jumlah di atas merupakan kelompok pemeriksaan yang berbeda. Contoh teks, uji format, dan uji browser dapat memeriksa file yang sama, sehingga angka kelompok tidak dijumlahkan sebagai jumlah masukan unik.

### 5.2 File contoh yang digunakan

Kelima file dibuat secara sintetis. Data mahasiswa dalam database merupakan data contoh yang ditulis dalam pembuat fixture, bukan catatan mahasiswa nyata. Gambar berupa pola warna, audio berupa nada sintetis, dan video berupa animasi sintetis.

| Jenis | File | Isi atau pemeriksaan format | Ukuran asal, byte | SHA-256 asal |
| --- | --- | --- | --- | --- |
| Teks | [teks-contoh.txt](bukti/fixtures/teks-contoh.txt) | UTF-8 valid, 5 baris, angka, tanda baca, dan karakter multibyte | 263 | `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68` |
| Gambar | [gambar-contoh.png](bukti/fixtures/gambar-contoh.png) | PNG 96 x 64, CRC chunk dan data piksel valid | 13519 | `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7` |
| Database | [database-contoh.sqlite](bukti/fixtures/database-contoh.sqlite) | SQLite, integrity_check ok, 5 baris mahasiswa contoh, rata-rata nilai 81,2 | 20480 | `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669` |
| Audio | [audio-contoh.wav](bukti/fixtures/audio-contoh.wav) | WAV mono 16-bit, 8.000 frame, 8.000 Hz, durasi 1 detik | 16044 | `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46` |
| Video | [video-contoh.webm](bukti/fixtures/video-contoh.webm) | WebM 160 x 120, dapat dimuat dekoder browser | 43791 | `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed` |

### 5.3 Kunci contoh untuk 40 skenario file

| Cipher | Kunci yang dimasukkan |
| --- | --- |
| Vigenere standar | kata kunci `KRIPTOGRAFI` |
| Auto-Key Vigenere | primer `UTSKRIPTO` |
| Extended Vigenere | kunci byte `Kunci Byte 2026!`, format `text` |
| Playfair | kata kunci `MONARCHY` |
| Affine | a `7`, b `10` |
| Hill | matriks `6 24 1; 13 16 10; 20 17 15` |
| Super Enkripsi | kunci byte `SuperKunci`, format `text`, kunci kolom `TRANSPOSISI` |
| Enigma I | rotor kiri/tengah/kanan `I II III`, ring `1 1 1`, posisi awal `AAA`, reflektor `B`, plugboard (kosong) |

### 5.4 Hasil 40 kombinasi file

Ukuran payload dan paket dibedakan. Payload hanya memuat cipherteks, sedangkan paket menambahkan metadata pemulihan. Kolom identik menyatakan perbandingan byte dan kecocokan SHA-256, bukan hanya kecocokan ukuran.

| No | Cipher | Jenis file | Asal, byte | Payload, byte | Paket, byte | Pulih, byte | Identik | Hasil |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Vigenere standar | Teks | 263 | 526 | 838 | 263 | Ya | LULUS |
| 2 | Vigenere standar | Gambar | 13519 | 27038 | 27355 | 13519 | Ya | LULUS |
| 3 | Vigenere standar | Database | 20480 | 40960 | 41296 | 20480 | Ya | LULUS |
| 4 | Vigenere standar | Audio | 16044 | 32088 | 32404 | 16044 | Ya | LULUS |
| 5 | Vigenere standar | Video | 43791 | 87582 | 87900 | 43791 | Ya | LULUS |
| 6 | Auto-Key Vigenere | Teks | 263 | 526 | 837 | 263 | Ya | LULUS |
| 7 | Auto-Key Vigenere | Gambar | 13519 | 27038 | 27354 | 13519 | Ya | LULUS |
| 8 | Auto-Key Vigenere | Database | 20480 | 40960 | 41295 | 20480 | Ya | LULUS |
| 9 | Auto-Key Vigenere | Audio | 16044 | 32088 | 32403 | 16044 | Ya | LULUS |
| 10 | Auto-Key Vigenere | Video | 43791 | 87582 | 87899 | 43791 | Ya | LULUS |
| 11 | Extended Vigenere | Teks | 263 | 263 | 574 | 263 | Ya | LULUS |
| 12 | Extended Vigenere | Gambar | 13519 | 13519 | 13835 | 13519 | Ya | LULUS |
| 13 | Extended Vigenere | Database | 20480 | 20480 | 20815 | 20480 | Ya | LULUS |
| 14 | Extended Vigenere | Audio | 16044 | 16044 | 16359 | 16044 | Ya | LULUS |
| 15 | Extended Vigenere | Video | 43791 | 43791 | 44108 | 43791 | Ya | LULUS |
| 16 | Playfair | Teks | 263 | 534 | 1016 | 263 | Ya | LULUS |
| 17 | Playfair | Gambar | 13519 | 27612 | 32613 | 13519 | Ya | LULUS |
| 18 | Playfair | Database | 20480 | 80480 | 94314 | 20480 | Ya | LULUS |
| 19 | Playfair | Audio | 16044 | 33266 | 39211 | 16044 | Ya | LULUS |
| 20 | Playfair | Video | 43791 | 89604 | 104939 | 43791 | Ya | LULUS |
| 21 | Affine | Teks | 263 | 526 | 836 | 263 | Ya | LULUS |
| 22 | Affine | Gambar | 13519 | 27038 | 27353 | 13519 | Ya | LULUS |
| 23 | Affine | Database | 20480 | 40960 | 41294 | 20480 | Ya | LULUS |
| 24 | Affine | Audio | 16044 | 32088 | 32402 | 16044 | Ya | LULUS |
| 25 | Affine | Video | 43791 | 87582 | 87898 | 43791 | Ya | LULUS |
| 26 | Hill | Teks | 263 | 528 | 864 | 263 | Ya | LULUS |
| 27 | Hill | Gambar | 13519 | 27039 | 27380 | 13519 | Ya | LULUS |
| 28 | Hill | Database | 20480 | 40962 | 41322 | 20480 | Ya | LULUS |
| 29 | Hill | Audio | 16044 | 32088 | 32428 | 16044 | Ya | LULUS |
| 30 | Hill | Video | 43791 | 87582 | 87924 | 43791 | Ya | LULUS |
| 31 | Super Enkripsi | Teks | 263 | 263 | 562 | 263 | Ya | LULUS |
| 32 | Super Enkripsi | Gambar | 13519 | 13519 | 13823 | 13519 | Ya | LULUS |
| 33 | Super Enkripsi | Database | 20480 | 20480 | 20803 | 20480 | Ya | LULUS |
| 34 | Super Enkripsi | Audio | 16044 | 16044 | 16347 | 16044 | Ya | LULUS |
| 35 | Super Enkripsi | Video | 43791 | 43791 | 44096 | 43791 | Ya | LULUS |
| 36 | Enigma I | Teks | 263 | 526 | 838 | 263 | Ya | LULUS |
| 37 | Enigma I | Gambar | 13519 | 27038 | 27355 | 13519 | Ya | LULUS |
| 38 | Enigma I | Database | 20480 | 40960 | 41296 | 20480 | Ya | LULUS |
| 39 | Enigma I | Audio | 16044 | 32088 | 32404 | 16044 | Ya | LULUS |
| 40 | Enigma I | Video | 43791 | 87582 | 87900 | 43791 | Ya | LULUS |

[Perbandingan checksum lengkap](CHECKSUM_FILE_LENGKAP.md) memuat SHA-256 asal, paket, dan pulih untuk masing-masing skenario, beserta tautan file enkripsi dan dekripsinya. [Data perbandingan CSV](bukti/perbandingan-file.csv) dan [hasil pengujian JSON](bukti/evidence/file-scenarios.json) memungkinkan pemeriksaan ulang tanpa menyalin angka dari screenshot.

### 5.5 Hasil teks dan unduhan pada browser

Contoh berikut sesuai dengan masukan yang terlihat pada screenshot. Contoh teks bebas yang dijelaskan pada bagian algoritma merupakan kelompok pengujian API dan memakai kunci tersendiri.

| Cipher | Masukan | Kunci | Cipherteks huruf atau Base64 payload | Hasil dekripsi paket |
| --- | --- | --- | --- | --- |
| Vigenere standar | `attack at dawn` | kata kunci `lemon` | `LXFOPVEFRNHR` | `ATTACKATDAWN` |
| Auto-Key Vigenere | `ATTACK AT DAWN` | primer `QUEENLY` | `QNXEPVYTWTWP` | `ATTACKATDAWN` |
| Extended Vigenere | `Halo` | kunci byte `01 02`, format `hex` | `SWNtcQ==` | `Halo` |
| Playfair | `Hide the gold in the tree stump` | kata kunci `PLAYFAIREXAMPLE` | `BMODZBXDNABEKUDMUIXMMOUVIF` | `HIDETHEGOLDINTHETREESTUMP` |
| Affine | `affine cipher` | a `5`, b `8` | `IHHWVCSWFRCP` | `AFFINECIPHER` |
| Hill | `act` | matriks `6 24 1 / 13 16 10 / 20 17 15` | `POH` | `ACT` |
| Super Enkripsi | `ABCDEFG` | kunci byte `01 02`, format `hex`, kunci kolom `BABA` | `REhGQkZESA==` | `ABCDEFG` |
| Enigma I | `Hello, world! 2026` | rotor kiri/tengah/kanan `I II III`, ring `1 1 1`, posisi awal `AAA`, reflektor `B`, plugboard (kosong) | `ILBDAAMTAZ` | `HELLOWORLD` |

| Cipher | File yang diunduh dan dipulihkan pada konteks baru | Ukuran pulih, byte | Kesimpulan |
| --- | --- | --- | --- |
| Vigenere standar | [teks-contoh.txt](bukti/browser-downloads/file/vigenere/teks-contoh.txt) | 263 | Byte identik dan SHA-256 sama |
| Auto-Key Vigenere | [gambar-contoh.png](bukti/browser-downloads/file/autokey/gambar-contoh.png) | 13519 | Byte identik dan SHA-256 sama |
| Extended Vigenere | [database-contoh.sqlite](bukti/browser-downloads/file/extended-vigenere/database-contoh.sqlite) | 20480 | Byte identik dan SHA-256 sama |
| Playfair | [audio-contoh.wav](bukti/browser-downloads/file/playfair/audio-contoh.wav) | 16044 | Byte identik dan SHA-256 sama |
| Affine | [video-contoh.webm](bukti/browser-downloads/file/affine/video-contoh.webm) | 43791 | Byte identik dan SHA-256 sama |
| Hill | [gambar-contoh.png](bukti/browser-downloads/file/hill/gambar-contoh.png) | 13519 | Byte identik dan SHA-256 sama |
| Super Enkripsi | [video-contoh.webm](bukti/browser-downloads/file/super/video-contoh.webm) | 43791 | Byte identik dan SHA-256 sama |
| Enigma I | [gambar-contoh.png](bukti/browser-downloads/file/enigma-i/gambar-contoh.png) | 13519 | Byte identik dan SHA-256 sama |

[Catatan unduhan browser](bukti/browser-downloads.json) memuat kunci setiap alur, Base64 payload, hash paket, dan lokasi hasil pulih. Kunci Enigma pada alur file adalah V/III/IV, ring 7/12/24, posisi QEZ, reflektor C, dan plugboard AB CD EF GH IJ KL. Kunci ini berbeda dari konfigurasi awal I/II/III yang dipakai pada contoh teks.

### 5.6 Vektor dan kasus penting

- Vigenere dengan ATTACKATDAWN dan LEMON menghasilkan LXFOPVEFRNHR.
- Auto-Key dengan ATTACKATDAWN dan QUEENLY menghasilkan QNXEPVYTWTWP.
- Playfair dengan PLAYFAIREXAMPLE menghasilkan BMODZBXDNABEKUDMUIXMMOUVIF untuk HIDETHEGOLDINTHETREESTUMP. Paket memulihkan teks tanpa pengisi tambahan. Dekripsi mentah mempertahankan X pada TREXESTUMP.
- Hill dengan matriks 6 24 1 / 13 16 10 / 20 17 15 mengubah ACT menjadi POH. Pengujian juga mencakup matriks 2 1 / 13 7 yang invertibel modulo 26.
- Super Enkripsi dengan byte kunci 01 02, kunci kolom BABA, dan ABCDEFG menghasilkan Base64 REhGQkZESA==. Kasus ini menguji urutan stabil huruf kunci yang berulang serta baris terakhir tidak penuh.
- Enigma I konfigurasi awal I/II/III, ring 1/1/1, AAA, reflektor B, tanpa plugboard mengubah AAAAA menjadi BDZGO dan HELLOWORLD menjadi ILBDAAMTAZ. Pengujian langkah rotor memeriksa ADU menjadi ADV, lalu AEW, lalu BFX.
- Kunci Affine a=2, matriks Hill tidak invertibel, plugboard berulang, paket rusak, dan kunci dekripsi salah ditolak. Kegagalan backend ditampilkan sebagai galat tanpa menghasilkan cipherteks pengganti.
- Paket versi lama sebanyak 14, berupa teks dan file untuk tujuh cipher wajib, dapat dibaca Ruby. Keluaran baru tetap sesuai dengan byte paket lama pada kasus kompatibilitas tersebut.

### 5.7 Tabel penilaian sesuai soal

Tanda ✓ pada kolom Berhasil menunjukkan enkripsi dan dekripsi teks serta file telah dijalankan dan diperiksa. Kolom Kurang Berhasil diberi tanda kosong karena pengujian ini tidak menemukan masalah fungsional pada sembilan butir tersebut. Batasan penggunaan yang memengaruhi penafsiran hasil tetap dijelaskan pada pembahasan.

| No | Spek | Berhasil | Kurang Berhasil | Keterangan |
| --- | --- | --- | --- | --- |
| 1 | Vigenere Cipher standar, 26 huruf | ✓ |  | Enkripsi dan dekripsi teks lulus, 5 kategori file identik, paket unduhan dapat didekripsi pada konteks browser baru. |
| 2 | Auto-Key Vigenere Cipher, 26 huruf | ✓ |  | Enkripsi dan dekripsi teks lulus, 5 kategori file identik, paket unduhan dapat didekripsi pada konteks browser baru. |
| 3 | Extended Vigenere Cipher, 256 nilai byte | ✓ |  | Enkripsi dan dekripsi teks lulus, 5 kategori file identik, paket unduhan dapat didekripsi pada konteks browser baru. |
| 4 | Playfair Cipher, alfabet A sampai Z dengan I/J digabung dalam matriks | ✓ |  | Enkripsi dan dekripsi teks lulus, 5 kategori file identik, paket unduhan dapat didekripsi pada konteks browser baru. |
| 5 | Affine Cipher, 26 huruf | ✓ |  | Enkripsi dan dekripsi teks lulus, 5 kategori file identik, paket unduhan dapat didekripsi pada konteks browser baru. |
| 6 | Hill Cipher, 26 huruf | ✓ |  | Enkripsi dan dekripsi teks lulus, 5 kategori file identik, paket unduhan dapat didekripsi pada konteks browser baru. |
| 7 | Super Enkripsi, Extended Vigenere dan transposisi kolom | ✓ |  | Enkripsi dan dekripsi teks lulus, 5 kategori file identik, paket unduhan dapat didekripsi pada konteks browser baru. |
| 8 | Bonus 1, Enigma Cipher | ✓ |  | Enkripsi dan dekripsi teks lulus, 5 kategori file identik, paket unduhan dapat didekripsi pada konteks browser baru. |
| 9 | Bonus 2, menggunakan bahasa Ruby | ✓ |  | Semua 8 cipher, validasi, codec, kontainer, dan pemulihan dijalankan Ruby melalui Sinatra/Puma. RSpec dan alur HTTP/browser lulus. |

## 6. Tampilan dan contoh penggunaan

Screenshot berikut dipilih untuk memperlihatkan masukan, kunci, hasil, serta pemulihan. Seluruh gambar dan keterangannya tersedia pada [galeri screenshot lengkap](KETERANGAN_SCREENSHOT.md). Screenshot file berasal dari unduhan browser yang disertakan dalam paket bukti.

### Gambar 1

![Gambar 1](bukti/evidence/screenshots/01-tampilan-utama.png)

Tampilan utama memperlihatkan delapan pilihan cipher, operasi enkripsi atau dekripsi, masukan teks atau file, formulir pesan, kunci, dan panel hasil. Badge Mesin Ruby menjelaskan bahwa pesan dan file diproses server.

### Gambar 2

![Gambar 2](bukti/evidence/screenshots/teks-vigenere-enkripsi.png)

Vigenere standar mengenkripsi `attack at dawn` dengan kata kunci `lemon`. Hasil huruf yang terlihat adalah `LXFOPVEFRNHR`.

### Gambar 3

![Gambar 3](bukti/evidence/screenshots/teks-autokey-enkripsi.png)

Auto-Key Vigenere mengenkripsi `ATTACK AT DAWN` dengan primer `QUEENLY`. Hasil huruf yang terlihat adalah `QNXEPVYTWTWP`.

### Gambar 4

![Gambar 4](bukti/evidence/screenshots/teks-extended-vigenere-enkripsi.png)

Extended Vigenere mengenkripsi `Halo` dengan kunci byte `01 02`, format `hex`. Hasil Base64 payload yang terlihat adalah `SWNtcQ==`.

### Gambar 5

![Gambar 5](bukti/evidence/screenshots/teks-playfair-enkripsi.png)

Playfair mengenkripsi `Hide the gold in the tree stump` dengan kata kunci `PLAYFAIREXAMPLE`. Hasil huruf yang terlihat adalah `BMODZBXDNABEKUDMUIXMMOUVIF`.

### Gambar 6

![Gambar 6](bukti/evidence/screenshots/teks-affine-enkripsi.png)

Affine mengenkripsi `affine cipher` dengan a `5`, b `8`. Hasil huruf yang terlihat adalah `IHHWVCSWFRCP`.

### Gambar 7

![Gambar 7](bukti/evidence/screenshots/teks-hill-enkripsi.png)

Hill mengenkripsi `act` dengan matriks `6 24 1 / 13 16 10 / 20 17 15`. Hasil huruf yang terlihat adalah `POH`.

### Gambar 8

![Gambar 8](bukti/evidence/screenshots/teks-super-enkripsi.png)

Super Enkripsi mengenkripsi `ABCDEFG` dengan kunci byte `01 02`, format `hex`, kunci kolom `BABA`. Hasil Base64 payload yang terlihat adalah `REhGQkZESA==`.

### Gambar 9

![Gambar 9](bukti/evidence/screenshots/teks-enigma-i-enkripsi.png)

Enigma I mengenkripsi `Hello, world! 2026` dengan rotor kiri/tengah/kanan `I II III`, ring `1 1 1`, posisi awal `AAA`, reflektor `B`, plugboard (kosong). Hasil huruf yang terlihat adalah `ILBDAAMTAZ`.

### Gambar 10

![Gambar 10](bukti/evidence/screenshots/teks-playfair-dekripsi.png)

Paket teks Playfair diunduh, kemudian dibuka pada konteks browser baru. Dengan kunci yang sama, keluaran yang terlihat adalah `HIDETHEGOLDINTHETREESTUMP` dan status pemulihan berhasil.

### Gambar 11

![Gambar 11](bukti/evidence/screenshots/teks-enigma-i-dekripsi.png)

Paket teks Enigma I diunduh, kemudian dibuka pada konteks browser baru. Dengan kunci yang sama, keluaran yang terlihat adalah `HELLOWORLD` dan status pemulihan berhasil.

### Gambar 12

![Gambar 12](bukti/evidence/screenshots/file-vigenere-enkripsi.png)

Vigenere standar memproses seluruh byte `teks-contoh.txt`, berukuran 263 byte, dengan kata kunci `KRIPTOGRAFI`. Panel hasil menampilkan Base64 payload dan unduhan paket .dat.

### Gambar 13

![Gambar 13](bukti/evidence/screenshots/file-vigenere-dekripsi.png)

Paket Vigenere standar diunggah pada konteks browser baru dan memulihkan `teks-contoh.txt` menjadi 263 byte. SHA-256 yang terlihat adalah `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`. File unduhan telah dibandingkan byte demi byte dan identik dengan file asal.

### Gambar 14

![Gambar 14](bukti/evidence/screenshots/file-autokey-enkripsi.png)

Auto-Key Vigenere memproses seluruh byte `gambar-contoh.png`, berukuran 13.519 byte, dengan primer `UTSKRIPTO`. Panel hasil menampilkan Base64 payload dan unduhan paket .dat.

### Gambar 15

![Gambar 15](bukti/evidence/screenshots/file-autokey-dekripsi.png)

Paket Auto-Key Vigenere diunggah pada konteks browser baru dan memulihkan `gambar-contoh.png` menjadi 13.519 byte. SHA-256 yang terlihat adalah `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`. File unduhan telah dibandingkan byte demi byte dan identik dengan file asal.

### Gambar 16

![Gambar 16](bukti/evidence/screenshots/file-extended-vigenere-enkripsi.png)

Extended Vigenere memproses seluruh byte `database-contoh.sqlite`, berukuran 20.480 byte, dengan kunci byte `Kunci Byte 2026!`, format `text`. Panel hasil menampilkan Base64 payload dan unduhan paket .dat.

### Gambar 17

![Gambar 17](bukti/evidence/screenshots/file-extended-vigenere-dekripsi.png)

Paket Extended Vigenere diunggah pada konteks browser baru dan memulihkan `database-contoh.sqlite` menjadi 20.480 byte. SHA-256 yang terlihat adalah `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`. File unduhan telah dibandingkan byte demi byte dan identik dengan file asal.

### Gambar 18

![Gambar 18](bukti/evidence/screenshots/file-playfair-enkripsi.png)

Playfair memproses seluruh byte `audio-contoh.wav`, berukuran 16.044 byte, dengan kata kunci `MONARCHY`. Panel hasil menampilkan Base64 payload dan unduhan paket .dat.

### Gambar 19

![Gambar 19](bukti/evidence/screenshots/file-playfair-dekripsi.png)

Paket Playfair diunggah pada konteks browser baru dan memulihkan `audio-contoh.wav` menjadi 16.044 byte. SHA-256 yang terlihat adalah `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`. File unduhan telah dibandingkan byte demi byte dan identik dengan file asal.

### Gambar 20

![Gambar 20](bukti/evidence/screenshots/file-affine-enkripsi.png)

Affine memproses seluruh byte `video-contoh.webm`, berukuran 43.791 byte, dengan a `7`, b `10`. Panel hasil menampilkan Base64 payload dan unduhan paket .dat.

### Gambar 21

![Gambar 21](bukti/evidence/screenshots/file-affine-dekripsi.png)

Paket Affine diunggah pada konteks browser baru dan memulihkan `video-contoh.webm` menjadi 43.791 byte. SHA-256 yang terlihat adalah `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`. File unduhan telah dibandingkan byte demi byte dan identik dengan file asal.

### Gambar 22

![Gambar 22](bukti/evidence/screenshots/validasi-enigma-plugboard.png)

Formulir Enigma menolak plugboard AB AC karena huruf A digunakan pada lebih dari satu pasangan.

### Gambar 23

![Gambar 23](bukti/evidence/screenshots/dekripsi-mentah-playfair.png)

Dekripsi huruf mentah Playfair mengembalikan HIDETHEGOLDINTHETREXESTUMP. Huruf X pengisi tetap terlihat karena masukan mentah tidak membawa metadata posisi pengisi.

## 7. Pembahasan

Hasil pengujian file memperlihatkan bahwa pemulihan ditentukan oleh data yang kembali sama, bukan hanya keberhasilan menyimpan unduhan. Delapan cipher telah dijalankan pada lima kategori file sehingga tersedia 40 pasangan enkripsi dan dekripsi. Pada hasil yang tersedia, seluruh pasangan mencatat kesamaan byte dan SHA-256. Format file hasil pemulihan juga diperiksa melalui pembacaan teks UTF-8, pemeriksaan PNG, query database SQLite, pembacaan WAV, dan pemuatan video pada browser.

Pemulihan pada konteks browser baru menunjukkan bahwa proses dekripsi bergantung pada paket dan kunci, bukan pesan asal yang masih berada pada halaman. Metadata menyediakan informasi format dan pengisi yang diperlukan, sementara kunci tetap dimasukkan oleh pengguna. Untuk Enigma, tombol Gunakan hasil untuk dekripsi membawa konfigurasi awal yang dipakai saat enkripsi, termasuk ketika pengaturan formulir telah berubah sesudah hasil dibuat.

Penggunaan Ruby dibuktikan melalui implementasi delapan cipher pada backend, pengujian RSpec, operasi HTTP, dan alur browser yang memakai layanan tersebut. Empat belas paket dari implementasi TypeScript sebelumnya juga diperiksa sebagai acuan kompatibilitas. Ruby dapat membaca paket lama dan menghasilkan payload baru yang sama untuk masukan serta kunci yang tercatat.

Jalur dekripsi mentah memiliki keterbatasan yang memengaruhi interpretasi hasil. Cipherteks huruf atau Base64 payload tidak membawa metadata pemulihan dan checksum. Playfair mentah masih memuat I hasil penggabungan J dan huruf pengisi. Hill mentah masih memuat padding X. Kunci salah pada jalur mentah tidak selalu dapat dikenali. Pemulihan lengkap teks alfabet dan file dinilai melalui paket yang dibuat aplikasi.

SHA-256 digunakan untuk memeriksa kesamaan hasil dekripsi terhadap data yang diharapkan. Checksum ini bukan MAC dan tidak membuktikan autentikasi paket. Apabila ukuran atau checksum tidak sesuai, aplikasi menolak menyatakan pemulihan berhasil dan meminta pengguna memeriksa kunci atau data paket.

Batas sumber daya aplikasi adalah 50 MiB atau 52.428.800 byte per file, matriks Hill berukuran 2 x 2 sampai 10 x 10, dan kunci teks hingga 65.536 karakter. Berkas yang melampaui batas ditolak tanpa dipotong. Pada cipher alfabet, ukuran payload file bertambah karena satu byte diwakili dua huruf, dengan tambahan pengisi apabila algoritma memerlukannya.

## 8. Kesimpulan

Aplikasi menggabungkan tujuh cipher wajib dan Enigma dalam satu antarmuka web dengan enkripsi serta dekripsi yang dijalankan oleh Ruby. Pengguna dapat memproses pesan ketikan dan file, melihat representasi Base64, mengunduh paket biner, serta memulihkan file dengan nama dan ekstensi asal.

Normalisasi teks alfabet, codec file, penanda Playfair, padding Hill, dan konfigurasi awal Enigma membentuk alur pemulihan yang sesuai dengan jenis data. Bukti yang tersedia mencakup contoh teks tiap algoritma, 40 pasangan file yang identik, kompatibilitas paket lama, serta penggunaan aplikasi pada konteks browser baru. Hasil tersebut menjadi dasar pengisian tabel sembilan baris yang memuat tujuh cipher wajib, Bonus Enigma Cipher, dan Bonus bahasa Ruby.

## 9. Kode program dan petunjuk menjalankan

[Lampiran kode program lengkap](LAMPIRAN_KODE_PROGRAM.md) memuat kode sebagai teks yang dapat dipindahkan ke lampiran laporan. Salinan berkas sumber, konfigurasi, lockfile JavaScript dan Ruby, serta pengujian tersedia di folder kode-sumber. [README paket](README.md) menjelaskan isi bahan, sedangkan [README aplikasi](kode-sumber/README.md) memuat prasyarat, instalasi, dan perintah pemeriksaan.

Pada salinan paket baru, siapkan Node.js dan pnpm sesuai README, Ruby dengan Bundler, serta alat kompilasi native yang diperlukan gem Puma pada sistem yang dipakai. Jalankan perintah berikut dari folder kode-sumber.

```bash
pnpm install --frozen-lockfile
cd apps/api
bundle install
cd ../..
pnpm dev
```

Aplikasi tersedia pada http://localhost:3000 dan backend Ruby memakai http://127.0.0.1:4567 secara bawaan. Runtime Ruby lokal, dependensi terpasang, hasil build, cache, dan konfigurasi pribadi tidak disertakan. Berkas .env.example memuat contoh konfigurasi yang dapat digunakan tanpa kredensial.

Untuk mengulang semua pemeriksaan, pasang Chromium Playwright dengan `pnpm exec playwright install chromium`, pastikan Python tersedia, lalu jalankan `pnpm test:all`. Perintah tersebut juga membangun ulang aplikasi sebelum pengujian browser.
