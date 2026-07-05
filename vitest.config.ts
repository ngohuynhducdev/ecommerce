import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // happy-dom provides localStorage for atomWithStorage-based atom tests
    environment: "happy-dom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
