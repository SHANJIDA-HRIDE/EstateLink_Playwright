const { chromium } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { validUser } = require('../utils/testData');
const { BASE_URL } = require('../utils/env');

module.exports = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  // ✅ Absolute URL (mandatory)
  await loginPage.open(`${BASE_URL}/login`);

  await loginPage.login(validUser.email, validUser.password);

  // ✅ Wait ONLY for navigation or network idle
  await page.waitForURL(`${BASE_URL}/`, { timeout: 15000 });
  await page.waitForLoadState('networkidle');

  // ✅ Save auth state
  await context.storageState({ path: 'auth.json' });

  await browser.close();
};
