const { api } = require('./apiClient');
const { validUser } = require('./testData');

/**
 * Check if the user is first-time login
 */
async function checkUserStatus(request, user = validUser) {
  const payload = { authenticator: user.email };
  const { status, body } = await api(request, 'post', '/user/check_status/', payload);

  console.log('Check status payload:', payload);
  console.log('Check status response:', body);

  if (status !== 200) {
    throw new Error(`Check status API failed with status ${status}`);
  }

  return body; // { is_first_login, user_id, ... }
}

/**
 * Login and return access token
 */
async function loginUser(request, user = validUser) {
  const payload = {
    authenticator: user.email,
    password: user.password,
    login_type: 'org',
  };

  const { status, body } = await api(request, 'post', '/user/login/', payload);

  console.log('Login payload:', payload);
  console.log('Login response status:', status);
  console.log('Login response body:', body);

  if (status !== 200) {
    throw new Error(`Login API failed with status ${status}`);
  }

  if (!body.access_token) {
    throw new Error('Login API did not return access_token');
  }

  return body.access_token;
}

/**
 * Full login flow: check status + login
 */
async function fullLoginFlow(request, user = validUser) {
  const statusResp = await checkUserStatus(request, user);

  if (statusResp.is_first_login) {
    throw new Error('User is first-time. This flow only handles normal login.');
  }

  const token = await loginUser(request, user);

  return token;
}

module.exports = { checkUserStatus, loginUser, fullLoginFlow };
