const { request } = require('@playwright/test');
const fs = require('fs');
const { API_BASE_URL } = require('../utils/env');

module.exports = async () => {
  const apiRequest = await request.newContext({
    baseURL: API_BASE_URL,
  });

  const payload = {
    authenticator: 'shanjidahride8@gmail.com',
    password: 'jklmctM1&@&',
    login_type: 'org',
  };

  const response = await apiRequest.post('/user/login/', {
    data: payload,
  });

  const status = response.status();
  const body = await response.json();

  console.log('Login status:', status);
  console.log('Login body:', body);

  if (status !== 200 || !body.access_token) {
    throw new Error(`Login failed: ${status} | ${JSON.stringify(body)}`);
  }

  // ✅ Store token for API tests
  fs.writeFileSync(
    'authToken.json',
    JSON.stringify({ token: body.access_token }, null, 2)
  );

  await apiRequest.dispose();
};
