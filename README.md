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
