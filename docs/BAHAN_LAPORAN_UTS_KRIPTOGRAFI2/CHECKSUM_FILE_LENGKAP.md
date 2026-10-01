# Perbandingan checksum seluruh file

SHA-256 berikut dihitung kembali dari berkas asal, paket .dat, dan berkas hasil dekripsi yang disertakan. Semua pasangan asal dan pulih juga dibandingkan byte demi byte.

## 1. Vigenere standar pada teks-contoh.txt

Kunci contoh: kata kunci `KRIPTOGRAFI`.

- Asal: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Paket: 838 byte, SHA-256 `17bf91f4117f81c11d55187aa9c5bc60a4851615cc931ccc00e2e02da5c04169`.
- Pulih: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/vigenere/teks-contoh.txt.dat) dan [hasil dekripsi](bukti/evidence/samples/vigenere/pulih-teks-contoh.txt).

## 2. Vigenere standar pada gambar-contoh.png

Kunci contoh: kata kunci `KRIPTOGRAFI`.

- Asal: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Paket: 27355 byte, SHA-256 `4fd8af1df8ebb7ba338f34e0f8a5ab05b2afdc5216f8d4af6f604086d24a05ad`.
- Pulih: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/vigenere/gambar-contoh.png.dat) dan [hasil dekripsi](bukti/evidence/samples/vigenere/pulih-gambar-contoh.png).

## 3. Vigenere standar pada database-contoh.sqlite

Kunci contoh: kata kunci `KRIPTOGRAFI`.

- Asal: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Paket: 41296 byte, SHA-256 `569dcb3e53f0237f034a5a34a290f0663c6dcdb480cc27c812870de307cf3d7f`.
- Pulih: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/vigenere/database-contoh.sqlite.dat) dan [hasil dekripsi](bukti/evidence/samples/vigenere/pulih-database-contoh.sqlite).

## 4. Vigenere standar pada audio-contoh.wav

Kunci contoh: kata kunci `KRIPTOGRAFI`.

- Asal: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Paket: 32404 byte, SHA-256 `223894ca56375a5309a030aac773fa57ddaa6566a43e88b8fc9c9a8e7e284e73`.
- Pulih: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/vigenere/audio-contoh.wav.dat) dan [hasil dekripsi](bukti/evidence/samples/vigenere/pulih-audio-contoh.wav).

## 5. Vigenere standar pada video-contoh.webm

Kunci contoh: kata kunci `KRIPTOGRAFI`.

- Asal: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Paket: 87900 byte, SHA-256 `16a4b7f0858e9fad1028bd8b9731112dbd85bf1b81e1fae8e6d46353c6b21a4d`.
- Pulih: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/vigenere/video-contoh.webm.dat) dan [hasil dekripsi](bukti/evidence/samples/vigenere/pulih-video-contoh.webm).

## 6. Auto-Key Vigenere pada teks-contoh.txt

Kunci contoh: primer `UTSKRIPTO`.

- Asal: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Paket: 837 byte, SHA-256 `d77ff2b0a933f109ccecbe91c47ac7c1c1661c47aa2898397cc9dbdc8d11cae7`.
- Pulih: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/autokey/teks-contoh.txt.dat) dan [hasil dekripsi](bukti/evidence/samples/autokey/pulih-teks-contoh.txt).

## 7. Auto-Key Vigenere pada gambar-contoh.png

Kunci contoh: primer `UTSKRIPTO`.

- Asal: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Paket: 27354 byte, SHA-256 `a69f34cb5c26d186e466f70cb63b4fe024bfe7de1d47f057af12d1ad4f08784c`.
- Pulih: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/autokey/gambar-contoh.png.dat) dan [hasil dekripsi](bukti/evidence/samples/autokey/pulih-gambar-contoh.png).

## 8. Auto-Key Vigenere pada database-contoh.sqlite

Kunci contoh: primer `UTSKRIPTO`.

- Asal: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Paket: 41295 byte, SHA-256 `715ea7e756f0b01424611f4fc43523f7d08693501c53d12653e5703b80568672`.
- Pulih: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/autokey/database-contoh.sqlite.dat) dan [hasil dekripsi](bukti/evidence/samples/autokey/pulih-database-contoh.sqlite).

## 9. Auto-Key Vigenere pada audio-contoh.wav

Kunci contoh: primer `UTSKRIPTO`.

- Asal: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Paket: 32403 byte, SHA-256 `03182dfffcfdcb9b5c23e11a750ce389c6adca86deb4e904b07237d6f56158d5`.
- Pulih: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/autokey/audio-contoh.wav.dat) dan [hasil dekripsi](bukti/evidence/samples/autokey/pulih-audio-contoh.wav).

## 10. Auto-Key Vigenere pada video-contoh.webm

Kunci contoh: primer `UTSKRIPTO`.

- Asal: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Paket: 87899 byte, SHA-256 `f20bef4a6415e9462f60dbd3e4b8898cd01a4c495480c0a932461b23faa485af`.
- Pulih: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/autokey/video-contoh.webm.dat) dan [hasil dekripsi](bukti/evidence/samples/autokey/pulih-video-contoh.webm).

## 11. Extended Vigenere pada teks-contoh.txt

Kunci contoh: kunci byte `Kunci Byte 2026!`, format `text`.

- Asal: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Paket: 574 byte, SHA-256 `ed53c69ab8a409cc303da0d676b0d8f6bc651f546b3c9e229336464691dfef2b`.
- Pulih: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/extended-vigenere/teks-contoh.txt.dat) dan [hasil dekripsi](bukti/evidence/samples/extended-vigenere/pulih-teks-contoh.txt).

## 12. Extended Vigenere pada gambar-contoh.png

Kunci contoh: kunci byte `Kunci Byte 2026!`, format `text`.

- Asal: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Paket: 13835 byte, SHA-256 `99365b86fc02bcf8f6eaa734f9644b04c15793564602bcfcb007f9069e6a97a0`.
- Pulih: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/extended-vigenere/gambar-contoh.png.dat) dan [hasil dekripsi](bukti/evidence/samples/extended-vigenere/pulih-gambar-contoh.png).

## 13. Extended Vigenere pada database-contoh.sqlite

Kunci contoh: kunci byte `Kunci Byte 2026!`, format `text`.

- Asal: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Paket: 20815 byte, SHA-256 `a15b854a8fa1377120b2f12b794484fd5d4a253d815d49b000d444fc37b4331c`.
- Pulih: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/extended-vigenere/database-contoh.sqlite.dat) dan [hasil dekripsi](bukti/evidence/samples/extended-vigenere/pulih-database-contoh.sqlite).

## 14. Extended Vigenere pada audio-contoh.wav

Kunci contoh: kunci byte `Kunci Byte 2026!`, format `text`.

- Asal: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Paket: 16359 byte, SHA-256 `3ebe927fd98a2d6718ccfed0a9dea1bbca3d88ab2a7dd97059dd319d0e2f6686`.
- Pulih: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/extended-vigenere/audio-contoh.wav.dat) dan [hasil dekripsi](bukti/evidence/samples/extended-vigenere/pulih-audio-contoh.wav).

## 15. Extended Vigenere pada video-contoh.webm

Kunci contoh: kunci byte `Kunci Byte 2026!`, format `text`.

- Asal: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Paket: 44108 byte, SHA-256 `5d99af5682fffedb34110786bd4e5b8f48a41469d470c6f276210d97f03e82bf`.
- Pulih: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/extended-vigenere/video-contoh.webm.dat) dan [hasil dekripsi](bukti/evidence/samples/extended-vigenere/pulih-video-contoh.webm).

## 16. Playfair pada teks-contoh.txt

Kunci contoh: kata kunci `MONARCHY`.

- Asal: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Paket: 1016 byte, SHA-256 `544aafc67c9059cd1f342875a665e3992112d114a792db9c8de1a33a112fedba`.
- Pulih: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/playfair/teks-contoh.txt.dat) dan [hasil dekripsi](bukti/evidence/samples/playfair/pulih-teks-contoh.txt).

## 17. Playfair pada gambar-contoh.png

Kunci contoh: kata kunci `MONARCHY`.

- Asal: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Paket: 32613 byte, SHA-256 `7f8af3e1d22ca291ef943d4c68e761567a4083db1bc867724e8f99de09192cc2`.
- Pulih: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/playfair/gambar-contoh.png.dat) dan [hasil dekripsi](bukti/evidence/samples/playfair/pulih-gambar-contoh.png).

## 18. Playfair pada database-contoh.sqlite

Kunci contoh: kata kunci `MONARCHY`.

- Asal: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Paket: 94314 byte, SHA-256 `3c016b3707d156450bd21243d44dc497b4cb5a5eb2f06e174d9993dca0dd8292`.
- Pulih: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/playfair/database-contoh.sqlite.dat) dan [hasil dekripsi](bukti/evidence/samples/playfair/pulih-database-contoh.sqlite).

## 19. Playfair pada audio-contoh.wav

Kunci contoh: kata kunci `MONARCHY`.

- Asal: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Paket: 39211 byte, SHA-256 `ba9e3a01dc091f8ccd39c0bbe66d4cc508024b1cb705912d118257c3c2506b2c`.
- Pulih: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/playfair/audio-contoh.wav.dat) dan [hasil dekripsi](bukti/evidence/samples/playfair/pulih-audio-contoh.wav).

## 20. Playfair pada video-contoh.webm

Kunci contoh: kata kunci `MONARCHY`.

- Asal: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Paket: 104939 byte, SHA-256 `6bcf3edee1a1af97d7650e385cd5cfea61dcc40bbb99fe00c9f7611b8cf99522`.
- Pulih: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/playfair/video-contoh.webm.dat) dan [hasil dekripsi](bukti/evidence/samples/playfair/pulih-video-contoh.webm).

## 21. Affine pada teks-contoh.txt

Kunci contoh: a `7`, b `10`.

- Asal: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Paket: 836 byte, SHA-256 `5a4be361979b4f6d2ddb0a3e4d734dbafe78c86cb46fa9899a636b03527cef9d`.
- Pulih: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/affine/teks-contoh.txt.dat) dan [hasil dekripsi](bukti/evidence/samples/affine/pulih-teks-contoh.txt).

## 22. Affine pada gambar-contoh.png

Kunci contoh: a `7`, b `10`.

- Asal: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Paket: 27353 byte, SHA-256 `cc1397b7a0c266e36f95a166a688807ee0ef32a0795e2f633497abf49d6b2c24`.
- Pulih: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/affine/gambar-contoh.png.dat) dan [hasil dekripsi](bukti/evidence/samples/affine/pulih-gambar-contoh.png).

## 23. Affine pada database-contoh.sqlite

Kunci contoh: a `7`, b `10`.

- Asal: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Paket: 41294 byte, SHA-256 `c3a1e8e52700d6266142eea2e0c847524eb446ae4c9d3e1b83d7e6806e8f42d7`.
- Pulih: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/affine/database-contoh.sqlite.dat) dan [hasil dekripsi](bukti/evidence/samples/affine/pulih-database-contoh.sqlite).

## 24. Affine pada audio-contoh.wav

Kunci contoh: a `7`, b `10`.

- Asal: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Paket: 32402 byte, SHA-256 `6d1151c887239abafee4f9941bc314828963dd3195b42db992719086b9ae4be5`.
- Pulih: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/affine/audio-contoh.wav.dat) dan [hasil dekripsi](bukti/evidence/samples/affine/pulih-audio-contoh.wav).

## 25. Affine pada video-contoh.webm

Kunci contoh: a `7`, b `10`.

- Asal: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Paket: 87898 byte, SHA-256 `88ac20761a642b1a9b7d5f7dfe52941715cc21febec7bdd3837e01c225c6242a`.
- Pulih: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/affine/video-contoh.webm.dat) dan [hasil dekripsi](bukti/evidence/samples/affine/pulih-video-contoh.webm).

## 26. Hill pada teks-contoh.txt

Kunci contoh: matriks `6 24 1; 13 16 10; 20 17 15`.

- Asal: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Paket: 864 byte, SHA-256 `28e61fa330ae6331ecaa9ad072a83de4360713ba8ded8d106b6ea4de265518cd`.
- Pulih: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/hill/teks-contoh.txt.dat) dan [hasil dekripsi](bukti/evidence/samples/hill/pulih-teks-contoh.txt).

## 27. Hill pada gambar-contoh.png

Kunci contoh: matriks `6 24 1; 13 16 10; 20 17 15`.

- Asal: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Paket: 27380 byte, SHA-256 `05e7c280943e17e32d9e9617c76b8733b8ad8d1175254102d814df75569cf1e8`.
- Pulih: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/hill/gambar-contoh.png.dat) dan [hasil dekripsi](bukti/evidence/samples/hill/pulih-gambar-contoh.png).

## 28. Hill pada database-contoh.sqlite

Kunci contoh: matriks `6 24 1; 13 16 10; 20 17 15`.

- Asal: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Paket: 41322 byte, SHA-256 `e73406682240b29349b26cce220d22ac5e39b68e1fca2cb525dc888eed54c04c`.
- Pulih: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/hill/database-contoh.sqlite.dat) dan [hasil dekripsi](bukti/evidence/samples/hill/pulih-database-contoh.sqlite).

## 29. Hill pada audio-contoh.wav

Kunci contoh: matriks `6 24 1; 13 16 10; 20 17 15`.

- Asal: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Paket: 32428 byte, SHA-256 `4eaf096fd11cf79130def05bea7f4ae6ac16236d2b240fc4eae9294c9e1e00a0`.
- Pulih: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/hill/audio-contoh.wav.dat) dan [hasil dekripsi](bukti/evidence/samples/hill/pulih-audio-contoh.wav).

## 30. Hill pada video-contoh.webm

Kunci contoh: matriks `6 24 1; 13 16 10; 20 17 15`.

- Asal: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Paket: 87924 byte, SHA-256 `04e9bea27ec0557871348811c268fb73b7e57034a95908ceec6eb3aafcacd444`.
- Pulih: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/hill/video-contoh.webm.dat) dan [hasil dekripsi](bukti/evidence/samples/hill/pulih-video-contoh.webm).

## 31. Super Enkripsi pada teks-contoh.txt

Kunci contoh: kunci byte `SuperKunci`, format `text`, kunci kolom `TRANSPOSISI`.

- Asal: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Paket: 562 byte, SHA-256 `2e2eaf3861242c06ce984ff93663ee744e72aecaa9108263274913483100ef81`.
- Pulih: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/super/teks-contoh.txt.dat) dan [hasil dekripsi](bukti/evidence/samples/super/pulih-teks-contoh.txt).

## 32. Super Enkripsi pada gambar-contoh.png

Kunci contoh: kunci byte `SuperKunci`, format `text`, kunci kolom `TRANSPOSISI`.

- Asal: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Paket: 13823 byte, SHA-256 `ea21c9f1007014567ff9dc889c1d8893dc89c6abb3f60be72cc83037d7f80989`.
- Pulih: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/super/gambar-contoh.png.dat) dan [hasil dekripsi](bukti/evidence/samples/super/pulih-gambar-contoh.png).

## 33. Super Enkripsi pada database-contoh.sqlite

Kunci contoh: kunci byte `SuperKunci`, format `text`, kunci kolom `TRANSPOSISI`.

- Asal: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Paket: 20803 byte, SHA-256 `4487c910a1f232a9fdf847ec646d05c8793d0cfee3ff974036f6abeb19fc1f51`.
- Pulih: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/super/database-contoh.sqlite.dat) dan [hasil dekripsi](bukti/evidence/samples/super/pulih-database-contoh.sqlite).

## 34. Super Enkripsi pada audio-contoh.wav

Kunci contoh: kunci byte `SuperKunci`, format `text`, kunci kolom `TRANSPOSISI`.

- Asal: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Paket: 16347 byte, SHA-256 `57f97eefbbd4f7c7e287cfc66cd9375ea6290c851e00c68f48395a9407ec4564`.
- Pulih: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/super/audio-contoh.wav.dat) dan [hasil dekripsi](bukti/evidence/samples/super/pulih-audio-contoh.wav).

## 35. Super Enkripsi pada video-contoh.webm

Kunci contoh: kunci byte `SuperKunci`, format `text`, kunci kolom `TRANSPOSISI`.

- Asal: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Paket: 44096 byte, SHA-256 `cfe9cf29db73960b537b6ecec94a1a21b2aeaa97ac04d6322ffa19fc2bc7a7e2`.
- Pulih: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/super/video-contoh.webm.dat) dan [hasil dekripsi](bukti/evidence/samples/super/pulih-video-contoh.webm).

## 36. Enigma I pada teks-contoh.txt

Kunci contoh: rotor kiri/tengah/kanan `I II III`, ring `1 1 1`, posisi awal `AAA`, reflektor `B`, plugboard (kosong).

- Asal: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Paket: 838 byte, SHA-256 `46963cf730f754a0bd86ead6230e8627951edafead6404b4e25858768432cbc9`.
- Pulih: 263 byte, SHA-256 `d13859ef429e1012ee1d7b50a4fab44631162d8e544ae38d8efbdcd81e163f68`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/enigma-i/teks-contoh.txt.dat) dan [hasil dekripsi](bukti/evidence/samples/enigma-i/pulih-teks-contoh.txt).

## 37. Enigma I pada gambar-contoh.png

Kunci contoh: rotor kiri/tengah/kanan `I II III`, ring `1 1 1`, posisi awal `AAA`, reflektor `B`, plugboard (kosong).

- Asal: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Paket: 27355 byte, SHA-256 `7df292e64b8514ea8892fb8a6c64aa355bfff1c3795ef88017425a468a96cf50`.
- Pulih: 13519 byte, SHA-256 `c2cd2cf09c21cde6bb3443a1c5156bd8d51c34556a637710c0570a9f031feec7`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/enigma-i/gambar-contoh.png.dat) dan [hasil dekripsi](bukti/evidence/samples/enigma-i/pulih-gambar-contoh.png).

## 38. Enigma I pada database-contoh.sqlite

Kunci contoh: rotor kiri/tengah/kanan `I II III`, ring `1 1 1`, posisi awal `AAA`, reflektor `B`, plugboard (kosong).

- Asal: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Paket: 41296 byte, SHA-256 `17641e0e97da9cd0d6fe433b630a1ae18e61951529cfd843a1baec973dd59a38`.
- Pulih: 20480 byte, SHA-256 `c7676535471569066680dfaa23bc3267d6e1abad1ea5f746f3b6609ea7358669`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/enigma-i/database-contoh.sqlite.dat) dan [hasil dekripsi](bukti/evidence/samples/enigma-i/pulih-database-contoh.sqlite).

## 39. Enigma I pada audio-contoh.wav

Kunci contoh: rotor kiri/tengah/kanan `I II III`, ring `1 1 1`, posisi awal `AAA`, reflektor `B`, plugboard (kosong).

- Asal: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Paket: 32404 byte, SHA-256 `eff2e9ec56bc88f91a53b506d64ebc3a91c500474aea5449efb53f044fe7081f`.
- Pulih: 16044 byte, SHA-256 `b5d248cecc2eb1eec4abdbb0b37512a027ac8d810c4c3d058f20aa844b095c46`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/enigma-i/audio-contoh.wav.dat) dan [hasil dekripsi](bukti/evidence/samples/enigma-i/pulih-audio-contoh.wav).

## 40. Enigma I pada video-contoh.webm

Kunci contoh: rotor kiri/tengah/kanan `I II III`, ring `1 1 1`, posisi awal `AAA`, reflektor `B`, plugboard (kosong).

- Asal: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Paket: 87900 byte, SHA-256 `6556a185cc12114039792f8050d19672739c0c16f0bf996508f2794158cf22cb`.
- Pulih: 43791 byte, SHA-256 `e54006297a99c9d8ced50d331f7f6c989238bab2bc5041890397f60b858366ed`.
- Byte identik: ya. Status: LULUS.
- [Paket enkripsi](bukti/evidence/samples/enigma-i/video-contoh.webm.dat) dan [hasil dekripsi](bukti/evidence/samples/enigma-i/pulih-video-contoh.webm).
