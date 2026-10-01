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
