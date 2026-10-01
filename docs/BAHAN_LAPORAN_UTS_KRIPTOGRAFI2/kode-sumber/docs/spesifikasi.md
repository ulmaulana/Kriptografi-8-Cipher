Dengan spesifikasi sebagai berikut:
1. Program dapat menerima pesan berupa file sembarang (file text maupun file biner) atau
pesan yang diketikkan dari papan-ketik.
2. Program dapat mengenkripsi plainteks. Khusus untuk cipher dengan keterangan 26
huruf alfabet, program hanya mengenkripsi karakter alfabet saja. Angka, spasi, dan
tanda baca dibuang dari plainteks dan cipherteks.
3. Program dapat mendekripsi cipherteks menjadi plainteks semula.
4. Program dapat menampilkan pesan (plainteks maupun cipherteks) di layar dalam kode
base64.
5. Cipherteks di layar ditampilkan ditampilkan tanpa spasi dan semuanya huruf kecil
(atau huruf kapital) dalam kode base64.
6. Program dapat menyimpan cipherteks ke dalam file (save as atau download as a
binary file).
7. Kunci dimasukkan oleh pengguna. Panjang kunci bebas.
8. Untuk enkripsi pesan berupa file, program membaca setiap byte di dalam file (termasuk
byte-byte header file) dan mengenkripsinya. Hanya saja file yang sudah terenkripsi tidak
bisa dibuka oleh program aplikasinya karena header file ikut terenkripsi. Namun,
dengan mendekripsinya kembali maka file tersebut dapat digunakan kembali.
9. Untuk enkripsi plainteks file dengan ekstensi sembarang, format file cipherteks bebas
(misalnya sebagai file dengan ekstensi .dat, lihat contoh gambar di bawah). Ketika
didekripsi, maka jenis filenya harus disimpan dengan jenis yang sama seperti file
plainteks, misalnya jika file plainteks bertipe docx maka pada saat didekripsi pengguna
harus menyimpan dengan ekstensi docx juga agar bisa dibaca kembali oleh program
Microsof Word, jika file plainteks bertipe .jpg maka pada waktu dekripsi harus disimpan
dengan ekstensi .jpg juga, dst. Anda boleh menyimpan ekstensi file atau nama file
plainteks di dalam file cipherteks agar pada saat dekripsi pengguna tidak perlu
memikirkan jenis file apa yang dienkripsi sebelumnya.
10. Beberapa pustaka untuk menghitung balikan modulo, matriks balikan, aljabar linier,
diperbolehkan.
11. Boleh menggunakan framework pemrograman apapun seperti ReactJs, Flask, Ruby on
Rails, dan lain sebagainya.

## Bonus yang dipilih dalam PRD terbaru

Butir h adalah Bonus Enigma Cipher. Proyek memakai simulasi Enigma I tiga rotor berbeda dari I sampai V, reflector B/C, ring setting, posisi awal, dan plugboard. Enigma mendukung teks alfabet serta file utuh melalui codec `alpha25-v1`.

Butir i adalah Bonus menggunakan bahasa Ruby. Backend Ruby menjalankan seluruh delapan cipher, validasi kunci, codec, kontainer, dan pemeriksaan pemulihan. Next.js dan React tetap menjadi antarmuka, dengan endpoint HTTP yang meneruskan operasi ke Sinatra/Puma.

Detail keputusan implementasi, vektor, pengujian 40 skenario file, dan kriteria penerimaan mengacu pada [PRD.md](../PRD.md). Penambahan kedua bonus tidak mengubah persyaratan tujuh cipher wajib atau format paket versi 1.
