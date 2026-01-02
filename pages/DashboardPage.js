const { BASE_URL } = require('../utils/env');
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.welcomeHeading = page.getByRole('heading', { name: /welcome back/i });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

   async open() {
    await this.page.goto(`${BASE_URL}/`);
  }

  async logout() {
    if (await this.logoutLink.isVisible()) {
      await this.logoutLink.click();
    }
  }
}

module.exports = { DashboardPage };
