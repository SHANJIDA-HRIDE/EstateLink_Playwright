const { defineConfig } = require('@playwright/test');
const { BASE_URL, API_BASE_URL } = require('./utils/env');

module.exports = defineConfig({
  globalSetup: require.resolve('./global-setup/global.setup'),

  reporter: [['html']],

  projects: [
    {
      name: 'UI',
      testMatch: /tests\/ui\/.*\.spec\.js/,
      use: {
        browserName: 'chromium',
        headless: false,
        baseURL: BASE_URL,
        storageState: 'auth.json',
        screenshot: 'on',
        trace: 'on-first-retry',
        video: 'on',
      },
    },

    {
      name: 'API',
      testMatch: /tests\/api\/.*\.spec\.js/,
      use: {
        baseURL: API_BASE_URL,
      },
    },
  ],
});
