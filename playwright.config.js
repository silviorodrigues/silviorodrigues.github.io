import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', outputDir: 'test-results/runs', fullyParallel: true, workers: process.env.FIELD_NOTES_CHROME ? 1 : 4,
  timeout: 30000, expect: { timeout: 3000 }, reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:4173', viewport: { width: 1280, height: 800 }, colorScheme: 'light', reducedMotion: 'reduce', trace: 'retain-on-failure' },
  projects: process.env.FIELD_NOTES_CHROME
    ? [{ name: 'chrome', use: { browserName: 'chromium', channel: 'chrome' } }]
    : ['chromium', 'firefox', 'webkit'].map(browserName => ({ name: browserName, use: { browserName } })),
  webServer: { command: 'npm run preview', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI }
});
