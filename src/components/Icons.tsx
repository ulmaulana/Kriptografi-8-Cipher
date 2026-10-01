// Ikon garis sederhana. Semua memakai currentColor agar mengikuti warna teks.

import type { CipherId } from "@/lib/crypto/ciphers";

type IconProps = { size?: number; className?: string };

function Svg({ size = 20, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const IconHome = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 11 12 3l9 8" />
    <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
  </Svg>
);

export const IconBook = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5c-3-.5-6 0-8 1.5Z" />
    <path d="M12 6v14.5" />
  </Svg>
);

export const IconInfo = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.5" />
  </Svg>
);

export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="1" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </Svg>
);

export const IconUnlock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="1" />
    <path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7" />
  </Svg>
);

export const IconText = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3h8l4 4v14H6Z" />
    <path d="M14 3v4h4M9 12h6M9 15.5h6M9 19h4" />
  </Svg>
);

export const IconFile = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3h8l4 4v14H6Z" />
    <path d="M14 3v4h4" />
  </Svg>
);

export const IconKey = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8" cy="15" r="4" />
    <path d="m11 12 8-8M16 7l2 2M14 9l1.5 1.5" />
  </Svg>
);

export const IconPlay = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7.5 5v14L19 12Z" fill="currentColor" />
  </Svg>
);

export const IconCopy = (p: IconProps) => (
  <Svg {...p}>
    <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="1.5" />
    <path d="M15.5 8.5V5.5A1.5 1.5 0 0 0 14 4H5.5A1.5 1.5 0 0 0 4 5.5V14a1.5 1.5 0 0 0 1.5 1.5h3" />
  </Svg>
);

export const IconDone = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const IconSun = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </Svg>
);

export const IconMoon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Svg>
);

export const IconPanel = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 9.5 10.5 12 8 14.5M12.5 15h3.5" />
  </Svg>
);

/** Ikon tiap cipher, dipilih untuk menggambarkan bentuk kunci atau transformasinya. */
export function CipherIcon({ id, size = 26 }: { id: CipherId; size?: number }) {
  switch (id) {
    case "enigma-i":
      return (
        <Svg size={size}>
          <circle cx="6" cy="12" r="3.5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="18" cy="12" r="3.5" />
          <path d="M6 5v3.5M12 5v3.5M18 5v3.5M6 15.5V19M12 15.5V19M18 15.5V19" />
        </Svg>
      );
    case "vigenere":
      // Tabel huruf yang berulang.
      return (
        <Svg size={size}>
          {[5, 9.5, 14.5, 19].flatMap((y) => [5, 9.5, 14.5, 19].map((x) => <path key={`${x}-${y}`} d={`M${x} ${y}h.01`} strokeWidth={2} />))}
        </Svg>
      );
    case "autokey":
      return (
        <Svg size={size}>
          <circle cx="12" cy="6" r="3" />
          <path d="M12 9v12M12 15h3M12 18.5h2.5" />
        </Svg>
      );
    case "extended-vigenere":
      return (
        <Svg size={size}>
          <rect x="4" y="8" width="12" height="12" />
          <path d="M8 8V4h12v12h-4" />
          <path d="M8 12h4M8 16h4" />
        </Svg>
      );
    case "playfair":
      return (
        <Svg size={size}>
          <rect x="3.5" y="3.5" width="17" height="17" />
          <path d="M12 3.5v17M3.5 12h17" strokeDasharray="2 2" />
          <path d="M6.5 7h2M15.5 17h2" />
        </Svg>
      );
    case "affine":
      return (
        <Svg size={size}>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
          <path d="M11 7 6 17M13 7l5 10M7 19h10" />
        </Svg>
      );
    case "hill":
      return (
        <Svg size={size}>
          <path d="M6 3.5H3.5v17H6M18 3.5h2.5v17H18" />
          <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" />
        </Svg>
      );
    case "super":
      return (
        <Svg size={size}>
          <path d="m12 3 9 4.5-9 4.5-9-4.5Z" />
          <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
        </Svg>
      );
  }
}
