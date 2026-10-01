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
