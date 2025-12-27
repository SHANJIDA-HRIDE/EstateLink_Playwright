const { test, expect } = require('../../../fixtures/dashboardFixtures');

test.describe('UI | Dashboard', () => {
  test('Dashboard loads for authenticated user', async ({ dashboardPage }) => {
    await dashboardPage.open();
    //await expect(dashboardPage.welcomeHeading).toBeVisible();
  });
});
