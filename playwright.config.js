const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  globalSetup: require.resolve('./global-setup/auth.setup'),

  use: {
    baseURL: 'http://localhost:5173',
    storageState: 'auth.json',
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on-first-retry',
    video: 'on',
  },

  reporter: [['html']],
});
