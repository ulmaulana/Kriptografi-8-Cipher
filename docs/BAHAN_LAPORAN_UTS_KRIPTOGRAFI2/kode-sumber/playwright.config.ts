import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["json", { outputFile: "evidence/e2e-results.json" }]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    acceptDownloads: true,
    ...devices["Desktop Chrome"],
    viewport: { width: 1440, height: 1000 },
  },
  webServer: {
    command: `pnpm build && node scripts/dev.mjs --production -p ${PORT} -H 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}`,
    // Selalu membangun ulang agar pengujian dan screenshot memakai kode terbaru.
    reuseExistingServer: false,
    timeout: 300_000,
  },
});
