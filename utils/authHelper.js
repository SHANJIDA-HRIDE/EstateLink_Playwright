// utils/authHelper.js
const fs = require('fs');

function getAuthToken() {
  const data = fs.readFileSync('authToken.json', 'utf-8');
  const { token } = JSON.parse(data);
  return token;
}

module.exports = { getAuthToken };
