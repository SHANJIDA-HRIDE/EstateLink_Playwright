const { request } = require('@playwright/test');
const fs = require('fs');
const { validUser } = require('../utils/testData');
const { api } = require('../utils/apiClient');

async function loginAndStoreToken() {
  // Create a Playwright APIRequestContext
  const apiRequest = await request.newContext({ baseURL: 'http://127.0.0.1:8000' });

  // Login
  const payload = {
    authenticator: validUser.email,
    password: validUser.password,
    login_type: 'org',
  };

  const { status, body } = await api(apiRequest, 'post', '/user/login/', payload);

  if (status !== 200 || !body.access_token) {
    throw new Error(`Login failed: ${status} | ${JSON.stringify(body)}`);
  }

  // Save token to a JSON file
  fs.writeFileSync('authToken.json', JSON.stringify({ token: body.access_token }));

  console.log('✅ Login successful, token saved for all tests');

  await apiRequest.dispose();
}

module.exports = loginAndStoreToken;
