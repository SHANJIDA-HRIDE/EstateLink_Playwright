const { test, expect } = require('@playwright/test');
const fs = require('fs');

test.describe('@api @auth Login smoke', () => {

  test('Token exists after global login', async () => {
    const data = JSON.parse(fs.readFileSync('authToken.json', 'utf-8'));

    expect(data.token).toBeTruthy();
    expect(typeof data.token).toBe('string');
  });

});
