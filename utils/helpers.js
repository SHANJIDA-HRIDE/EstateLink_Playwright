// utils/helpers.js

// ================= Name Generators =================
function generateRoleName(prefix = 'AutoRole') {
  return `${prefix}_${Date.now()}`;
}

function generateGroupName(prefix = 'AutoGroup') {
  const short = (Date.now() + Math.random()).toString(36).slice(-5);
  return `${prefix}_${short}`;
}

function generateLongText(length = 300) {
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ' +
    'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ' +
    'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ';

  return lorem.repeat(Math.ceil(length / lorem.length)).slice(0, length);
}


// ================= Table Helpers =================
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

// ================= EXPORT EVERYTHING ONCE =================
module.exports = {
  generateRoleName,
  generateGroupName,
  generateLongText,
  selectRowContaining,
  waitForHeader,
};
