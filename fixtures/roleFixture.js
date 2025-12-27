const { test: base, expect } = require('@playwright/test'); // <-- include expect
const { RolePage } = require('../pages/RolePage');
const { roleData } = require('../utils/testData');

const test = base.extend({
  rolePage: async ({ page }, use) => {
    await use(new RolePage(page));
  },

  createdRole: async ({ rolePage }, use) => {
    await rolePage.open();

    await rolePage.createRole(roleData.roleName, roleData.roleDescription);

    await use({
      name: roleData.roleName,
      description: roleData.roleDescription,
    });
  },
});

module.exports = { test, expect }; // <-- export expect too
