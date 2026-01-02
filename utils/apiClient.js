/**
 * Centralized API client for Playwright
 */

async function api(request, method, url, data = null, headers = {}) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    options.data = data; // Playwright request uses `data` for JSON body
  }

  const response = await request[method](url, options);

  let body = null;
  try {
    body = await response.json();
  } catch (err) {
    // ignore if not JSON
  }

  return {
    status: response.status(),
    body,
    headers: response.headers(),
  };
}

module.exports = { api };
