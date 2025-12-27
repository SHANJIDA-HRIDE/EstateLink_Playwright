const { test: base, expect } = require('@playwright/test');
const { GroupPage } = require('../pages/GroupPage');
const { groupData } = require('../utils/testData');

const test = base.extend({
  groupPage: async ({ page }, use) => {
    await use(new GroupPage(page));
  },

  createdGroup: async ({ groupPage }, use) => {
    await groupPage.open();
    await groupPage.createGroup(groupData.groupName, groupData.groupDescription);

    await use({
      name: groupData.groupName,
      description: groupData.groupDescription,
    });
  },
});

module.exports = { test, expect };
