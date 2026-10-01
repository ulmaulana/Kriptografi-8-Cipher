"use client";

import { useState } from "react";
import { CIPHER_IDS, CIPHERS } from "@/lib/crypto/ciphers";
import { IconBook, IconHome, IconInfo } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";
import { Workbench } from "./Workbench";

type Tab = "home" | "guide" | "about";

const TABS: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
  { id: "home", label: "Beranda", icon: <IconHome size={18} /> },
  { id: "guide", label: "Panduan", icon: <IconBook size={18} /> },
  { id: "about", label: "Tentang", icon: <IconInfo size={18} /> },
];

const VERSION = "1.1.0";

function Logo() {
  return (
    <svg className="logo" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      {Array.from({ length: 16 }, (_, i) => {
        const x = (i % 4) * 11 + 3.5;
        const y = Math.floor(i / 4) * 11 + 3.5;
        // Pola diagonal dari kiri atas, seperti kunci yang bergeser per baris.
        const on = (i % 4) + Math.floor(i / 4) < 3;
        return <circle key={i} cx={x} cy={y} r="2.6" className={on ? "logo-on" : "logo-off"} />;
      })}
    </svg>
  );
}

function Guide() {
  return (
    <div className="doc">
      <section className="panel doc-panel">
        <h2 className="doc-title">Cara memakai</h2>
        <ol className="doc-steps">
          <li>
            <strong>Enkripsi teks.</strong> Pilih cipher, ketik pesan, isi kunci, lalu tekan Enkripsi. Cipher 26 huruf hanya memakai huruf A-Z.
            Angka, spasi, dan tanda baca dibuang sebelum enkripsi.
          </li>
          <li>
            <strong>Enkripsi file.</strong> Pilih File lalu unggah file apa saja. Semua byte termasuk header ikut dienkripsi. Unduh paket .dat
            sebagai hasilnya.
          </li>
          <li>
            <strong>Dekripsi.</strong> Pilih Dekripsi, unggah paket .dat atau tempel paket Base64, lalu isi kunci yang sama. Algoritma dan nama
            file asal dibaca dari paket.
          </li>
          <li>
            <strong>Periksa hasil.</strong> Dekripsi paket dinyatakan berhasil hanya jika ukuran dan SHA-256 hasil cocok dengan paket.
          </li>
        </ol>
      </section>
      <section className="panel doc-panel">
        <h2 className="doc-title">Tiga bentuk keluaran</h2>
        <dl className="doc-defs">
          <div>
            <dt>Cipherteks huruf</dt>
            <dd>Huruf kapital A-Z tanpa spasi. Hanya ada pada cipher 26 huruf.</dd>
          </div>
          <div>
            <dt>Cipherteks Base64</dt>
            <dd>Base64 dari payload cipherteks saja. Huruf besar dan kecil dibedakan sehingga tidak diseragamkan.</dd>
          </div>
          <div>
            <dt>Paket Base64</dt>
            <dd>Base64 dari paket .dat lengkap, berisi payload dan data pemulihan. Pakai ini untuk dekripsi di sesi lain.</dd>
          </div>
        </dl>
      </section>
      <section className="panel doc-panel">
        <h2 className="doc-title">Bentuk kunci</h2>
        <dl className="doc-defs">
          <div>
            <dt>Vigenere, Auto-Key, Playfair</dt>
            <dd>Kata kunci huruf dengan panjang bebas, boleh lebih panjang dari pesan.</dd>
          </div>
          <div>
            <dt>Extended Vigenere</dt>
            <dd>Teks UTF-8 atau heksadesimal. Spasi dan kapitalisasi ikut dipakai.</dd>
          </div>
          <div>
            <dt>Affine</dt>
            <dd>Bilangan a dan b. Nilai a harus relatif prima terhadap 26.</dd>
          </div>
          <div>
            <dt>Hill</dt>
            <dd>Matriks n x n dengan determinan relatif prima terhadap 26.</dd>
          </div>
          <div>
            <dt>Super Enkripsi</dt>
            <dd>Kunci byte Extended Vigenere dan kata kunci transposisi kolom.</dd>
          </div>
          <div>
            <dt>Enigma I</dt>
            <dd>Tiga rotor dari kiri ke kanan, ring setting, posisi awal, reflector, dan plugboard. Dekripsi memakai konfigurasi awal yang sama.</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function About() {
  return (
    <div className="doc">
      <section className="panel doc-panel">
        <h2 className="doc-title">Tentang aplikasi</h2>
        <p className="doc-text">
          Aplikasi tugas UTS Kriptografi untuk mengenkripsi dan mendekripsi pesan atau file dengan delapan cipher klasik, termasuk Enigma I.
          Pesan, file, dan kunci dikirim ke backend Ruby untuk diproses. File tidak disimpan secara permanen.
        </p>
        <p className="doc-text">
          Paket .dat menyimpan payload cipherteks dan data pemulihan seperti nama file asal dan posisi pengisi. Kunci tidak disimpan. SHA-256
          dipakai untuk memeriksa kesamaan hasil, bukan sebagai autentikasi.
        </p>
      </section>
      <section className="panel doc-panel">
        <h2 className="doc-title">Cipher yang tersedia</h2>
        <dl className="doc-defs">
          {CIPHER_IDS.map((id) => (
            <div key={id}>
              <dt>{CIPHERS[id].name}</dt>
              <dd>{CIPHERS[id].summary}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

export function AppShell() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <Logo />
          <div>
            <h1>Kriptografi</h1>
            <p>Enkripsi dan dekripsi teks serta file</p>
          </div>
        </div>
        <div className="topbar-hatch" aria-hidden="true" />
        <div className="local-badge">
          <span className="local-dot" aria-hidden="true" />
          <div>
            <strong>Mesin Ruby</strong>
            <span>Pesan dan file diproses server</span>
          </div>
        </div>
      </header>

      <div className="navbar">
        <nav className="tabs" role="tablist" aria-label="Halaman">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`view-${t.id}`}
              className="tab"
              onClick={() => setTab(t.id)}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>
        <ThemeToggle />
      </div>

      {/* Meja kerja tetap terpasang saat berpindah tab agar masukan dan hasil tidak hilang. */}
      <main>
        <div id="view-home" role="tabpanel" aria-labelledby="tab-home" hidden={tab !== "home"}>
          <Workbench />
        </div>
        <div id="view-guide" role="tabpanel" aria-labelledby="tab-guide" hidden={tab !== "guide"}>
          <Guide />
        </div>
        <div id="view-about" role="tabpanel" aria-labelledby="tab-about" hidden={tab !== "about"}>
          <About />
        </div>
      </main>

      <footer className="footer">
        <span>
          <strong>Kriptografi</strong> v{VERSION}
        </span>
        <span className="footer-sep" aria-hidden="true" />
        <span>Tugas UTS Kriptografi, delapan cipher klasik untuk teks dan file.</span>
      </footer>
    </div>
  );
}
