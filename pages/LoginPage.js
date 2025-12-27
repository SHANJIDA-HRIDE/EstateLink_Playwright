const { BASE_URL } = require('../utils/env');

class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.locator('#usernameOrEmail');
    this.nextBtn = page.getByRole('button', { name: 'Next' });
    this.passwordInput = page.getByPlaceholder('Enter password');
    this.loginBtn = page.getByRole('button', { name: 'Login', exact: true });

    this.userNotFoundMsg = page.getByText('User not found');
    this.invalidCredentialsMsg = page.getByText('Invalid credentials');
    this.okBtn = page.getByRole('button', { name: 'OK' });
  }

  /**
   * Safe open method
   * - Works in tests (relative URL)
   * - Works in globalSetup (absolute URL)
   */
  async open(path = '/login') {
    const url = path.startsWith('http')
      ? path
      : `${BASE_URL}${path}`;

    await this.page.goto(url);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.nextBtn.click();
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async submitInvalidUsername(email) {
    await this.emailInput.fill(email);
    await this.nextBtn.click();
  }

  async submitInvalidPassword(email, password) {
    await this.emailInput.fill(email);
    await this.nextBtn.click();
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}

module.exports = { LoginPage };
