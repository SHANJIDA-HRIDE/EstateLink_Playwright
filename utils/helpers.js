// utils/helpers.js
//Role Helper Functions
function generateRoleName(prefix = 'AutoRole') {
  return `${prefix}_${Date.now()}`;
}

function generateLongText(length = 300) {
  return 'A'.repeat(length);
}

module.exports = {
  generateRoleName,
  generateLongText,
};



//Group Helper Functions

async function selectRowContaining(page, text) {
  const row = page.locator('tbody tr', { hasText: text }).first();
  await row.waitFor({ state: 'visible', timeout: 10000 });
  await row.click();
}

async function waitForHeader(page, headerLocator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await headerLocator.waitFor({ state: 'visible', timeout: 30000 });
      return;
    } catch {
      console.log(`Retrying wait for header: attempt ${i + 1}`);
      await page.waitForTimeout(5000);
    }
  }
  throw new Error('Header did not appear after retries');
}

module.exports = { selectRowContaining, waitForHeader };
