const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  workers: 2,

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
