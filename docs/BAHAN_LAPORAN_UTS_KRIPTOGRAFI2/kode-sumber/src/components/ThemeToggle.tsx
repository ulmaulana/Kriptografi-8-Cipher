"use client";

import { useLayoutEffect } from "react";
import { IconMoon, IconSun } from "./Icons";

/** Kunci localStorage. Harus sama dengan skrip awal di app/layout.tsx. */
export const THEME_KEY = "theme";

type Theme = "light" | "dark";

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Tombol ganti tema. Label yang tampil dipilih lewat CSS berdasarkan atribut
 * data-theme sehingga hasil render server dan klien selalu sama.
 */
export function ThemeToggle() {
  // Strict Mode pada mode pengembangan me-remount <html> dan menghapus atribut
  // dari skrip awal. Terapkan lagi sebelum paint. Tidak berpengaruh di produksi.
  useLayoutEffect(() => {
    const theme = storedTheme();
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }, []);

  function toggle() {
    const next: Theme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Penyimpanan tidak tersedia, misalnya jendela privat. Tema tetap berganti untuk sesi ini.
    }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} data-testid="theme-toggle">
      <span className="theme-to-light">
        <IconSun size={18} />
        Mode terang
      </span>
      <span className="theme-to-dark">
        <IconMoon size={18} />
        Mode gelap
      </span>
    </button>
  );
}
