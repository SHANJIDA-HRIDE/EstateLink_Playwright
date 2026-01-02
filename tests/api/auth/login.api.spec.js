const { test, expect } = require('@playwright/test');
const { fullLoginFlow } = require('../../../utils/authHelper');
const { validUser } = require('../../../utils/testData');

test.describe('@api @auth Login only', () => {

  test('Login with valid credentials returns access token', async ({ request }) => {
    const token = await fullLoginFlow(request, validUser);

    console.log('Access token:', token);

    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');

    // Optionally: store token to JSON file for reuse in other tests
    const fs = require('fs');
    fs.writeFileSync('authToken.json', JSON.stringify({ token }));
  });

  test('Login with invalid password should fail', async ({ request }) => {
    const invalidUser = {
      email: validUser.email,
      password: 'wrongPassword123',
    };

    let error;
    try {
      await fullLoginFlow(request, invalidUser);
    } catch (err) {
      error = err;
      console.log('Expected error:', err.message);
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('Login API failed');
  });

});
