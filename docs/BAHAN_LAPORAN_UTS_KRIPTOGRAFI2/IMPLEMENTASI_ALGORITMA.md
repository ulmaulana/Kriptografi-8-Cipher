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
