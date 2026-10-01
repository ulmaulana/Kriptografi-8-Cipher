// Pengujian alur browser (PRD 9.4). Setiap cipher wajib menjalankan satu alur
// teks dan satu alur file: enkripsi, unduh paket .dat, lalu unggah kembali pada
// konteks browser baru dan dekripsi hanya dengan paket serta kunci.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { type Browser, expect, type Page, test } from "@playwright/test";

const SHOTS = path.join("evidence", "screenshots");
mkdirSync(SHOTS, { recursive: true });

type CipherId = "vigenere" | "autokey" | "extended-vigenere" | "playfair" | "affine" | "hill" | "super" | "enigma-i";
const CIPHER_IDS_ALL: CipherId[] = ["vigenere", "autokey", "extended-vigenere", "playfair", "affine", "hill", "super", "enigma-i"];

interface KeySpec {
  keyword?: string;
  byteKey?: string;
  hex?: boolean;
  a?: string;
  b?: string;
  matrix?: string;
  columnKey?: string;
  enigma?: {
    rotors: string[];
    ringSettings: number[];
    initialPositions: string[];
    reflector: string;
    plugboard: string;
  };
}

const ENIGMA_DEFAULT: NonNullable<KeySpec["enigma"]> = {
  rotors: ["I", "II", "III"], ringSettings: [1, 1, 1], initialPositions: ["A", "A", "A"], reflector: "B", plugboard: "",
};

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

async function shot(page: Page, name: string) {
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
}

async function selectCipher(page: Page, cipher: CipherId) {
  await page.locator(`label.cipher-option:has(input[value="${cipher}"])`).click();
}

async function selectOperation(page: Page, op: "Enkripsi" | "Dekripsi") {
  await page.locator(".segmented label", { hasText: new RegExp(`^${op}$`) }).click();
}

async function fillKeys(page: Page, key: KeySpec) {
  if (key.keyword !== undefined) await page.locator("#key-keyword").fill(key.keyword);
  if (key.byteKey !== undefined) {
    await page.locator(".segmented label", { hasText: key.hex ? "Heksadesimal" : "Teks UTF-8" }).click();
    await page.locator("#key-byte").fill(key.byteKey);
  }
  if (key.columnKey !== undefined) await page.locator("#key-column").fill(key.columnKey);
  if (key.a !== undefined) await page.locator("#key-a").fill(key.a);
  if (key.b !== undefined) await page.locator("#key-b").fill(key.b);
  if (key.matrix !== undefined) await page.locator("#key-hill").fill(key.matrix);
  if (key.enigma) {
    for (let i = 0; i < 3; i++) {
      await page.locator(`#enigma-rotor-${i}`).selectOption(key.enigma.rotors[i]!);
      await page.locator(`#enigma-ring-${i}`).fill(String(key.enigma.ringSettings[i]));
      await page.locator(`#enigma-position-${i}`).fill(key.enigma.initialPositions[i]!);
    }
    await page.locator("#enigma-reflector").selectOption(key.enigma.reflector);
    await page.locator("#enigma-plugboard").fill(key.enigma.plugboard);
  }
}

async function downloadFrom(page: Page, testId: string, dir: string) {
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByTestId(testId).click()]);
  const target = path.join(dir, download.suggestedFilename());
  await download.saveAs(target);
  return { path: target, name: download.suggestedFilename() };
}

/** Membuka konteks browser baru (sesi baru tanpa state), mengunggah paket, lalu mendekripsi. */
async function decryptInNewContext(browser: Browser, packagePath: string, key: KeySpec, cipher: CipherId) {
  const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto("/");
  await selectOperation(page, "Dekripsi");
  await page.locator("#pkg-file").setInputFiles(packagePath);
  await expect(page.getByTestId("package-info")).toBeVisible();
  await expect(page.locator(`input[name=cipher][value="${cipher}"]`)).toBeChecked();
  await fillKeys(page, key);
  await page.getByTestId("run").click();
  await expect(page.getByTestId("decrypt-status")).toContainText("Pemulihan berhasil");
  return { context, page };
}

const TEXT_CASES: Array<{
  cipher: CipherId;
  message: string;
  key: KeySpec;
  letters?: string;
  payloadBase64: string;
  recovered: string;
}> = [
  { cipher: "vigenere", message: "attack at dawn", key: { keyword: "lemon" }, letters: "LXFOPVEFRNHR", payloadBase64: "TFhGT1BWRUZSTkhS", recovered: "ATTACKATDAWN" },
  { cipher: "autokey", message: "ATTACK AT DAWN", key: { keyword: "QUEENLY" }, letters: "QNXEPVYTWTWP", payloadBase64: "UU5YRVBWWVRXVFdQ", recovered: "ATTACKATDAWN" },
  { cipher: "extended-vigenere", message: "Halo", key: { byteKey: "01 02", hex: true }, payloadBase64: "SWNtcQ==", recovered: "Halo" },
  {
    cipher: "playfair",
    message: "Hide the gold in the tree stump",
    key: { keyword: "PLAYFAIREXAMPLE" },
    letters: "BMODZBXDNABEKUDMUIXMMOUVIF",
    payloadBase64: "Qk1PRFpCWEROQUJFS1VETVVJWE1NT1VWSUY=",
    recovered: "HIDETHEGOLDINTHETREESTUMP",
  },
  { cipher: "affine", message: "affine cipher", key: { a: "5", b: "8" }, letters: "IHHWVCSWFRCP", payloadBase64: "SUhIV1ZDU1dGUkNQ", recovered: "AFFINECIPHER" },
  { cipher: "hill", message: "act", key: { matrix: "6 24 1\n13 16 10\n20 17 15" }, letters: "POH", payloadBase64: "UE9I", recovered: "ACT" },
  { cipher: "super", message: "ABCDEFG", key: { byteKey: "01 02", hex: true, columnKey: "BABA" }, payloadBase64: "REhGQkZESA==", recovered: "ABCDEFG" },
  { cipher: "enigma-i", message: "Hello, world! 2026", key: { enigma: ENIGMA_DEFAULT }, letters: "ILBDAAMTAZ", payloadBase64: "SUxCREFBTVRBWg==", recovered: "HELLOWORLD" },
];

const FILE_CASES: Array<{ cipher: CipherId; fixture: string; key: KeySpec }> = [
  { cipher: "vigenere", fixture: "teks-contoh.txt", key: { keyword: "KRIPTOGRAFI" } },
  { cipher: "autokey", fixture: "gambar-contoh.png", key: { keyword: "UTSKRIPTO" } },
  { cipher: "extended-vigenere", fixture: "database-contoh.sqlite", key: { byteKey: "Kunci Byte 2026!" } },
  { cipher: "playfair", fixture: "audio-contoh.wav", key: { keyword: "MONARCHY" } },
  { cipher: "affine", fixture: "video-contoh.webm", key: { a: "7", b: "10" } },
  { cipher: "hill", fixture: "gambar-contoh.png", key: { matrix: "3 3\n2 5" } },
  { cipher: "super", fixture: "video-contoh.webm", key: { byteKey: "SuperKunci", columnKey: "TRANSPOSISI" } },
  { cipher: "enigma-i", fixture: "gambar-contoh.png", key: { enigma: { rotors: ["V", "III", "IV"], ringSettings: [7, 12, 24], initialPositions: ["Q", "E", "Z"], reflector: "C", plugboard: "AB CD EF GH IJ KL" } } },
];

test("tampilan utama", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Kriptografi" })).toBeVisible();
  // Favicon berasal dari src/app/icon.svg, yaitu logo titik tanpa tulisan.
  const icon = page.locator('link[rel="icon"][type="image/svg+xml"]');
  await expect(icon).toHaveCount(1);
  const iconResponse = await page.request.get((await icon.getAttribute("href"))!);
  expect(iconResponse.status()).toBe(200);
  expect(await iconResponse.text()).toContain("<circle");
  await shot(page, "01-tampilan-utama");
});

test("Enigma memakai konfigurasi awal yang sama, reset, dan menolak plugboard berulang", async ({ page }) => {
  await page.goto("/");
  await selectCipher(page, "enigma-i");
  await page.locator("#message").fill("A A A A A! 123");
  await fillKeys(page, { enigma: ENIGMA_DEFAULT });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-cipher-letters")).toHaveText("BDZGO");
  for (let i = 0; i < 3; i++) await expect(page.locator(`#enigma-position-${i}`)).toHaveValue("A");
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-cipher-letters")).toHaveText("BDZGO");
  await page.locator("#enigma-position-0").fill("Z");
  await page.getByTestId("use-for-decrypt").click();
  await expect(page.getByTestId("package-info")).toBeVisible();
  await expect(page.locator("#enigma-position-0")).toHaveValue("A");
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-decrypted")).toHaveText("AAAAA");
  await selectOperation(page, "Enkripsi");
  await page.locator("#enigma-plugboard").fill("AB AC");
  await page.getByTestId("run").click();
  await expect(page.getByRole("alert").filter({ hasText: /plugboard|huruf|pasangan/i }).first()).toBeVisible();
  await shot(page, "validasi-enigma-plugboard");
  await page.getByRole("button", { name: "Reset konfigurasi Enigma" }).click();
  await expect(page.locator("#enigma-plugboard")).toHaveValue("");
  await expect(page.locator("#enigma-rotor-0")).toHaveValue("I");
});

test("kegagalan backend menghasilkan kesalahan tanpa hasil cipher pengganti", async ({ page }) => {
  await page.goto("/");
  await page.locator("#message").fill("ATTACKATDAWN");
  await fillKeys(page, { keyword: "LEMON" });
  await page.route("**/api/crypto/encrypt", (route) => route.abort("failed"));
  await page.getByTestId("run").click();
  await expect(page.getByTestId("run-error")).toBeVisible();
  await expect(page.getByTestId("encrypt-result")).toHaveCount(0);
});

test("ikon info Super Enkripsi menampilkan keterangan tanpa memilih cipher", async ({ page }) => {
  await page.goto("/");
  const text = "Gabungan Extended Vigenere Cipher dan cipher transposisi (metode kolom)";
  const tip = page.locator("#cipher-info-super");
  await expect(tip).toBeHidden();
  await page.getByTestId("info-super").hover();
  await expect(tip).toBeVisible();
  await expect(tip).toHaveText(text);
  await shot(page, "info-super-enkripsi");
  await page.getByTestId("info-super").click();
  await expect(page.locator('input[name=cipher][value="vigenere"]')).toBeChecked();
  await expect(page.locator('input[name=cipher][value="super"]')).toHaveAccessibleDescription(text);
});

test("tema terang dan gelap dapat dipilih dan tersimpan setelah muat ulang", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(page.getByTestId("theme-toggle")).toHaveAccessibleName("Mode terang");

  await page.getByTestId("theme-toggle").click();
  await expect(html).toHaveAttribute("data-theme", "light");
  await expect(page.getByTestId("theme-toggle")).toHaveAccessibleName("Mode gelap");
  const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(lightBg).toBe("rgb(238, 241, 245)");
  await shot(page, "02-tema-terang");

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.locator("#message").fill("attack at dawn");
  await fillKeys(page, { keyword: "LEMON" });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-cipher-letters")).toHaveText("LXFOPVEFRNHR");
  await shot(page, "03-tema-terang-hasil");

  await page.getByTestId("theme-toggle").click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(darkBg).toBe("rgb(10, 15, 21)");
});

for (const tc of TEXT_CASES) {
  test(`alur teks ${tc.cipher}: enkripsi, unduh, dekripsi di konteks baru`, async ({ page, browser }, testInfo) => {
    await page.goto("/");
    await selectCipher(page, tc.cipher);
    await page.locator("#message").fill(tc.message);
    await fillKeys(page, tc.key);
    await page.getByTestId("run").click();
    await expect(page.getByTestId("encrypt-result")).toBeVisible();
    if (tc.letters) await expect(page.getByTestId("out-cipher-letters")).toHaveText(tc.letters);
    await expect(page.getByTestId("out-payload-base64")).toHaveText(tc.payloadBase64);
    await shot(page, `teks-${tc.cipher}-enkripsi`);

    const pkg = await downloadFrom(page, "download-package", testInfo.outputDir);
    expect(pkg.name).toBe(`cipherteks-${tc.cipher}.dat`);
    const bytes = readFileSync(pkg.path);
    expect(bytes.subarray(0, 8).toString("latin1")).toBe("UTSKRIPT");

    const { context, page: fresh } = await decryptInNewContext(browser, pkg.path, tc.key, tc.cipher);
    await expect(fresh.getByTestId("out-decrypted")).toHaveText(tc.recovered);
    await shot(fresh, `teks-${tc.cipher}-dekripsi`);
    await context.close();
  });
}

for (const fc of FILE_CASES) {
  test(`alur file ${fc.cipher}: ${fc.fixture} pulih identik pada konteks baru`, async ({ page, browser }, testInfo) => {
    const original = readFileSync(path.join("fixtures", fc.fixture));
    await page.goto("/");
    await selectCipher(page, fc.cipher);
    await page.locator(".segmented label", { hasText: /^File$/ }).click();
    await page.locator("#enc-file").setInputFiles(path.join("fixtures", fc.fixture));
    await fillKeys(page, fc.key);
    await page.getByTestId("run").click();
    await expect(page.getByTestId("encrypt-result")).toBeVisible();
    await expect(page.getByTestId("file-facts")).toContainText(fc.fixture);
    await shot(page, `file-${fc.cipher}-enkripsi`);

    const pkg = await downloadFrom(page, "download-package", testInfo.outputDir);
    expect(pkg.name).toBe(`${fc.fixture}.dat`);

    const { context, page: fresh } = await decryptInNewContext(browser, pkg.path, fc.key, fc.cipher);
    await expect(fresh.getByTestId("file-facts")).toContainText(fc.fixture);
    await shot(fresh, `file-${fc.cipher}-dekripsi`);
    const restoredDir = path.join(testInfo.outputDir, "pulih");
    mkdirSync(restoredDir, { recursive: true });
    const restored = await downloadFrom(fresh, "download-decrypted", restoredDir);
    expect(restored.name).toBe(fc.fixture);
    const restoredBytes = readFileSync(restored.path);
    expect(restoredBytes.length).toBe(original.length);
    expect(sha256(restoredBytes)).toBe(sha256(original));
    expect(restoredBytes.equals(original)).toBe(true);
    await expect(fresh.getByTestId("decrypted-sha256")).toHaveText(sha256(original));

    if (fc.fixture.endsWith(".webm")) {
      // File video hasil pemulihan dapat dimuat oleh elemen video browser.
      const size = await fresh.evaluate(async (b64) => {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        const video = document.createElement("video");
        video.src = URL.createObjectURL(new Blob([arr], { type: "video/webm" }));
        await new Promise((resolve, reject) => {
          video.onloadeddata = resolve;
          video.onerror = () => reject(new Error("video gagal dimuat"));
        });
        return `${video.videoWidth}x${video.videoHeight}`;
      }, restoredBytes.toString("base64"));
      expect(size).toBe("160x120");
    }
    await context.close();
  });
}

test("nama file keluaran dapat diubah tanpa mengubah ekstensi", async ({ page, browser }, testInfo) => {
  await page.goto("/");
  await selectCipher(page, "extended-vigenere");
  await page.locator(".segmented label", { hasText: /^File$/ }).click();
  await page.locator("#enc-file").setInputFiles(path.join("fixtures", "gambar-contoh.png"));
  await fillKeys(page, { byteKey: "kunci" });
  await page.getByTestId("run").click();
  const pkg = await downloadFrom(page, "download-package", testInfo.outputDir);
  // Kolom paket .dat tidak boleh mewarisi file dari kolom file enkripsi.
  await page.getByTestId("use-for-decrypt").click();
  await expect(page.getByTestId("package-info")).toBeVisible();
  expect(await page.locator("#pkg-file").evaluate((el: HTMLInputElement) => el.files?.length ?? 0)).toBe(0);
  await selectOperation(page, "Enkripsi");
  await expect(page.getByTestId("encrypt-result")).toBeVisible();
  await expect(page.getByTestId("stale-warning")).toHaveCount(0);
  const { context, page: fresh } = await decryptInNewContext(browser, pkg.path, { byteKey: "kunci" }, "extended-vigenere");
  await fresh.locator("#out-name").fill("foto-pulih");
  const restored = await downloadFrom(fresh, "download-decrypted", testInfo.outputDir);
  expect(restored.name).toBe("foto-pulih.png");
  await context.close();
});

test("validasi kunci tidak valid ditampilkan pada kolomnya", async ({ page }) => {
  await page.goto("/");
  await selectCipher(page, "affine");
  await page.locator("#message").fill("pesan rahasia");
  await fillKeys(page, { a: "2", b: "3" });
  await page.getByTestId("run").click();
  await expect(page.locator("#key-a-error")).toContainText("tidak relatif prima terhadap 26");
  await expect(page.getByTestId("encrypt-result")).toHaveCount(0);
  await shot(page, "validasi-affine");

  await selectCipher(page, "hill");
  await fillKeys(page, { matrix: "2 4\n1 2" });
  await page.getByTestId("run").click();
  await expect(page.locator("#key-hill-error")).toContainText("tidak relatif prima terhadap 26");
  await shot(page, "validasi-hill");

  await selectCipher(page, "vigenere");
  await fillKeys(page, { keyword: "123 !!" });
  await page.getByTestId("run").click();
  await expect(page.locator("#key-keyword-error")).toContainText("kosong setelah normalisasi");
});

test("kunci salah pada paket tidak dinyatakan berhasil", async ({ page, browser }, testInfo) => {
  await page.goto("/");
  await page.locator("#message").fill("attack at dawn");
  await fillKeys(page, { keyword: "LEMON" });
  await page.getByTestId("run").click();
  const pkg = await downloadFrom(page, "download-package", testInfo.outputDir);
  const context = await browser.newContext();
  const fresh = await context.newPage();
  await fresh.goto("/");
  await selectOperation(fresh, "Dekripsi");
  await fresh.locator("#pkg-file").setInputFiles(pkg.path);
  await fillKeys(fresh, { keyword: "LIME" });
  await fresh.getByTestId("run").click();
  await expect(fresh.getByTestId("run-error")).toContainText("Checksum SHA-256");
  await expect(fresh.getByTestId("decrypt-result")).toHaveCount(0);
  await shot(fresh, "validasi-kunci-salah");
  await context.close();
});

test("Base64 disalin tanpa perubahan dan paket Base64 dapat ditempel di sesi baru", async ({ browser }) => {
  const context = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
  const page = await context.newPage();
  await page.goto("/");
  await selectCipher(page, "super");
  await page.locator("#message").fill("Data rahasia 2026 + / = ✓");
  await fillKeys(page, { byteKey: "Kunci+/=", columnKey: "ZEBRA" });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("encrypt-result")).toBeVisible();

  await page.getByTestId("copy-payload-base64").click();
  await expect(page.getByTestId("copy-payload-base64")).toHaveText("Tersalin");
  const payloadB64 = await page.evaluate(() => navigator.clipboard.readText());
  expect(payloadB64).toBe(await page.getByTestId("out-payload-base64").innerText());
  expect(payloadB64).toMatch(/^[A-Za-z0-9+/]+=*$/);

  await page.getByTestId("copy-package-base64").click();
  await expect(page.getByTestId("copy-package-base64")).toHaveText("Tersalin");
  const packageB64 = await page.evaluate(() => navigator.clipboard.readText());
  const packageBytes = Buffer.from(packageB64, "base64");
  expect(packageBytes.subarray(0, 8).toString("latin1")).toBe("UTSKRIPT");
  // Payload di akhir paket sama dengan Base64 payload yang disalin.
  expect(packageBytes.subarray(packageBytes.length - Buffer.from(payloadB64, "base64").length).toString("base64")).toBe(payloadB64);

  const other = await browser.newContext();
  const fresh = await other.newPage();
  await fresh.goto("/");
  await selectOperation(fresh, "Dekripsi");
  await fresh.locator("#dec-source").selectOption("package-base64");
  await fresh.locator("#pkg-text").fill(packageB64);
  await expect(fresh.getByTestId("package-info")).toContainText("Super Enkripsi");
  await fillKeys(fresh, { byteKey: "Kunci+/=", columnKey: "ZEBRA" });
  await fresh.getByTestId("run").click();
  await expect(fresh.getByTestId("out-decrypted")).toHaveText("Data rahasia 2026 + / = ✓");

  // Jalur Base64 payload mentah juga menerima karakter +, /, dan =.
  await fresh.locator("#dec-source").selectOption("payload-base64");
  await fresh.locator("#cipher-input").fill(payloadB64);
  await selectCipher(fresh, "super");
  await fresh.getByTestId("run").click();
  await expect(fresh.getByTestId("decrypt-status")).toContainText("Dekripsi mentah");
  await expect(fresh.getByTestId("out-decrypted")).toHaveText("Data rahasia 2026 + / = ✓");
  await shot(fresh, "dekripsi-base64-payload");
  await other.close();
  await context.close();
});

test("setiap format paket hanya memakai paketnya sendiri", async ({ page }) => {
  await page.goto("/");
  await page.locator("#message").fill("attack at dawn");
  await fillKeys(page, { keyword: "LEMON" });
  await page.getByTestId("run").click();
  await page.getByTestId("use-for-decrypt").click();
  await expect(page.getByTestId("package-info")).toBeVisible();
  // Berpindah ke dekripsi bukan perubahan masukan: tidak ada peringatan hasil lama.
  await expect(page.getByTestId("stale-warning")).toHaveCount(0);
  // Paket Base64 masih kosong: paket dari sumber file tidak boleh dipakai.
  await page.locator("#dec-source").selectOption("package-base64");
  await expect(page.getByTestId("package-info")).toHaveCount(0);
  await page.getByTestId("run").click();
  await expect(page.locator("#pkg-error")).toContainText("Tempel paket Base64");
  await expect(page.getByTestId("decrypt-result")).toHaveCount(0);
  // Kembali ke sumber file: paket yang dimuat sebelumnya tersedia lagi.
  await page.locator("#dec-source").selectOption("package-file");
  await expect(page.getByTestId("package-info")).toContainText("Hasil enkripsi terakhir");
});

test("cipherteks huruf mentah Playfair mempertahankan pengisi", async ({ page }) => {
  await page.goto("/");
  await selectCipher(page, "playfair");
  await selectOperation(page, "Dekripsi");
  await page.locator("#dec-source").selectOption("raw-letters");
  await page.locator("#cipher-input").fill("BMODZBXDNABEKUDMUIXMMOUVIF");
  await fillKeys(page, { keyword: "PLAYFAIREXAMPLE" });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-decrypted")).toHaveText("HIDETHEGOLDINTHETREXESTUMP");
  await shot(page, "dekripsi-mentah-playfair");
});

test("hasil lama ditandai ketika masukan berubah", async ({ page }) => {
  await page.goto("/");
  await page.locator("#message").fill("attack at dawn");
  await fillKeys(page, { keyword: "LEMON" });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("encrypt-result")).toBeVisible();
  await expect(page.getByTestId("stale-warning")).toHaveCount(0);
  await page.locator("#key-keyword").fill("LEMONADE");
  await expect(page.getByTestId("stale-warning")).toBeVisible();
  await shot(page, "hasil-lama-ditandai");
  await page.getByTestId("run").click();
  await expect(page.getByTestId("stale-warning")).toHaveCount(0);
});

test("video hasil pemulihan pada evidence/samples dapat dimuat browser", async ({ page }) => {
  const videos = CIPHER_IDS_ALL.map((c) => path.join("evidence", "samples", c, "pulih-video-contoh.webm")).filter((p) => existsSync(p));
  test.skip(videos.length === 0, "Jalankan pnpm evidence terlebih dahulu.");
  await page.goto("/");
  for (const file of videos) {
    const size = await page.evaluate(async (b64) => {
      const bin = atob(b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      const video = document.createElement("video");
      video.src = URL.createObjectURL(new Blob([arr], { type: "video/webm" }));
      await new Promise((resolve, reject) => {
        video.onloadeddata = resolve;
        video.onerror = () => reject(new Error("video gagal dimuat"));
      });
      return `${video.videoWidth}x${video.videoHeight}`;
    }, readFileSync(file).toString("base64"));
    expect(size, file).toBe("160x120");
  }
  expect(videos.length).toBe(8);
});

test("layout layar sempit tanpa gulir horizontal", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto("/");
  await selectCipher(page, "hill");
  await page.locator("#message").fill("Serang pukul 10.30! Kirim bantuan ke gerbang timur secepatnya.");
  await fillKeys(page, { matrix: "6 24 1\n13 16 10\n20 17 15" });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("encrypt-result")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await shot(page, "layar-sempit");
  await selectCipher(page, "enigma-i");
  await page.locator("#message").fill("HELLOWORLD");
  await fillKeys(page, { enigma: ENIGMA_DEFAULT });
  await page.getByTestId("run").click();
  await expect(page.getByTestId("out-cipher-letters")).toHaveText("ILBDAAMTAZ");
  const enigmaOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(enigmaOverflow).toBeLessThanOrEqual(0);
  await shot(page, "layar-sempit-enigma");
  await context.close();
});
