const uiLogin = require('./auth.setup');
const apiLogin = require('./login.setup');

module.exports = async () => {
  console.log('🚀 Global setup started');

  // UI login → saves auth.json
  await uiLogin();

  // API login → saves authToken.json
  await apiLogin();

  console.log('✅ Global setup finished');
};
