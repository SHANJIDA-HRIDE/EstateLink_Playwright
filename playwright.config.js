const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  globalSetup: require.resolve('./global-setup/auth.setup'),

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on-first-retry',
    video: 'on',
    baseURL: require('./utils/env').BASE_URL,
    storageState: 'auth.json',
  },

  projects: [
    {
      name: 'UI',
      use: {
        baseURL: require('./utils/env').BASE_URL,
        storageState: 'auth.json',
      },
    },
    {
      name: 'API',
      use: {
        baseURL: require('./utils/env').API_BASE_URL,
        storageState: undefined,
      },
    },
  ],

  reporter: [['html']],
});
