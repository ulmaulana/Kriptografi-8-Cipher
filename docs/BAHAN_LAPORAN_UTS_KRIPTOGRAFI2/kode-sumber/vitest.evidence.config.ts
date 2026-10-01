import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Menjalankan skenario bukti (40 skenario file Ruby dan contoh teks) lalu menulis
// hasil aktual ke folder evidence/.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/evidence/**/*.test.ts"],
    environment: "node",
    testTimeout: 300_000,
    fileParallelism: false,
  },
});
