import { defineConfig, devices } from "@playwright/test";

// E2E tests run against a production build with mock data — the same
// configuration CI uses, so no Strapi instance is required.

// The suite serves its own build on a dedicated port so it never collides
// with `yarn dev` on 3000. Override with E2E_PORT if 3100 is also taken.
const PORT = Number(process.env.E2E_PORT ?? 3100);
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `yarn build && yarn start -p ${PORT}`,
    url: BASE_URL,
    // Never adopt a server this config did not start. Reusing whatever
    // happens to hold the port means the suite can silently drive a
    // different app and fail as an opaque 30s locator timeout.
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      NEXT_PUBLIC_USE_STRAPI: "false",
      // next-auth needs these under `next start`; the secret is test-only.
      AUTH_TRUST_HOST: "true",
      AUTH_SECRET: process.env.AUTH_SECRET ?? "e2e-test-secret-not-for-production",
    },
  },
});
