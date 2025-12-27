const { test: base, expect } = require('@playwright/test'); // <-- include expect
const { RolePage } = require('../pages/RolePage');
const { roleData } = require('../utils/testData');
const { generateRoleName } = require('../utils/helpers');


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



  existingRole: async ({ rolePage }, use) => {
    const roleName = generateRoleName('ExistingRole');

    await rolePage.open();
    await rolePage.openAddRole();
    await rolePage.fillRoleForm({
      name: roleName,
      description: 'Existing role',
      permissions: { createMember: true },
    });
    await rolePage.submitCreate();
    await rolePage.okButton.click();

    await use({ roleName });
  },





});

module.exports = { test, expect }; // <-- export expect too
