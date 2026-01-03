const fs = require('fs');

function getToken() {
  const { token } = JSON.parse(fs.readFileSync('authToken.json', 'utf-8'));
  return token;
}

async function api(request, method, url, data = null, headers = {}) {
  const token = getToken();

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  if (data) {
    options.data = data;
  }

  const response = await request[method](url, options);

  let body = null;
  try {
    body = await response.json();
  } catch {}

  return {
    status: response.status(),
    body,
    headers: response.headers(),
  };
}

module.exports = { api };
