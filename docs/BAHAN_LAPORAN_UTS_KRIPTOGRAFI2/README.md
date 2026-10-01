# Bahan laporan UTS Kriptografi

Mulai dari [bahan laporan utama](BAHAN_LAPORAN_UTS_KRIPTOGRAFI2.md). Dokumen ini memuat tujuan, implementasi delapan cipher, contoh, hasil pengujian, dan pembahasan kedua bonus.

- [Keterangan 45 screenshot](KETERANGAN_SCREENSHOT.md) menjelaskan tampilan aplikasi yang diuji.
- [Kode lengkap dalam bentuk teks](LAMPIRAN_KODE_PROGRAM.md) dapat disalin ke lampiran laporan.
- [README aplikasi asli](kode-sumber/README.md) menjelaskan instalasi, menjalankan aplikasi, dan perintah pengujian.
- [Implementasi algoritma dan contoh kunci](IMPLEMENTASI_ALGORITMA.md) melengkapi uraian teknis.
- [Contoh teks aktual beserta kunci](bukti/evidence/text-examples.json) dan [40 skenario file beserta kunci](bukti/evidence/file-scenarios.json) memuat nilai hasil eksekusi.
- [Checksum lengkap file](CHECKSUM_FILE_LENGKAP.md) memuat ukuran dan hash file asal serta hasil pemulihan.
- [Paket yang diunduh dari browser](bukti/browser-downloads.json) mencatat 16 paket serta hasil dekripsi pada konteks browser baru.
- [Manifest SHA-256](MANIFEST_SHA256.json) dan [catatan validasi paket](VALIDASI_PAKET.json) membantu memeriksa kelengkapan dan integritas.

Folder `bukti/fixtures` berisi file asal. Folder `bukti/evidence/samples` berisi pasangan paket dan hasil dekripsinya. Folder `bukti/evidence/screenshots` berisi tangkapan layar. Folder `bukti/browser-downloads` berisi paket yang benar-benar diunduh melalui antarmuka serta delapan file biner hasil unduhan dekripsi. Hasil teks pada folder tersebut disimpan dari nilai yang diperiksa browser, sebagaimana dijelaskan pada ringkasan unduhan.

Folder `kode-sumber` berisi salinan byte asli kode proyek, konfigurasi, dan lockfile. Fixture dan salinan bukti juga tersedia di dalamnya agar petunjuk pengujian dapat diikuti. Dependensi terpasang, runtime lokal, cache, hasil build, kredensial, dan instruksi internal dikeluarkan. Salinan JSON bukti mengubah lokasi mesin pribadi menjadi path relatif. Nilai hasil pengujian tetap sama dan perubahan salinan dicatat pada catatan validasi. Berkas asli proyek dan evidence tidak diubah.

Untuk menjalankan aplikasi, buka terminal pada `kode-sumber`, jalankan `pnpm install`, lalu `bundle install` dari `apps/api`, kemudian `pnpm dev` dari root kode sumber. Versi runtime dan langkah produksi dijelaskan pada README aplikasi.

Skrip `tools/package_report.py` menyusun ulang paket menggunakan Python tanpa paket tambahan dan memerlukan root proyek asli sebagai sumber. Jalankan `python tools/package_report.py --check-only` dari folder bahan ini untuk memeriksa manifest, tautan lokal, dan bukti file setelah paket diekstrak. ZIP juga diperiksa bila tersedia di samping folder bahan.
