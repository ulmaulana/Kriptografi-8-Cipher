# Acuan kompatibilitas sebelum migrasi

`legacy-typescript-v1.json` dibekukan dari implementasi TypeScript sebelum penggantian engine oleh Ruby. Berkas memuat 14 paket aktual, yaitu tujuh cipher masing-masing pada mode teks dan file utuh. Waktu pengambilan ada pada `capturedAt`.

Teks memuat J, pasangan berulang Playfair, X dan Q asli, padding Hill, tanda baca, angka, dan Unicode. File memuat seluruh nilai byte 0 sampai 255 dengan nama `semua-byte.bin`. Kunci adalah data contoh untuk pengujian.

`tests/unit/migration-compatibility.test.ts` memeriksa dekripsi paket lama melalui backend Ruby dan membandingkan payload enkripsi baru dengan nilai tetap. Berkas acuan tidak boleh dihasilkan ulang dengan mesin Ruby yang sedang diuji.
