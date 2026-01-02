const { test: base, expect } = require('@playwright/test');
const { GroupPage } = require('../pages/GroupPage');
const { groupData } = require('../utils/testData');
const { generateGroupName } = require('../utils/helpers');

const test = base.extend({
  groupPage: async ({ page }, use) => {
    await use(new GroupPage(page));
  },

  // ================= CREATE GROUP FIXTURE =================
  createdGroup: async ({ groupPage }, use) => {
    await groupPage.open();

    await groupPage.createGroup(
      groupData.groupName,
      groupData.groupDescription
    );

    await use({
      name: groupData.groupName,
      description: groupData.groupDescription,
    });
  },

  // ================= EXISTING GROUP FIXTURE =================
  existingGroup: async ({ groupPage }, use) => {
    const groupName = generateGroupName('ExistingGroup');

    await groupPage.open();
    await groupPage.addGroupButton.click();

    await groupPage.groupNameInput.fill(groupName);
    await groupPage.groupDescriptionTextarea.fill('Existing group for toggle test');

    await groupPage.lastTableRow.click();
    await groupPage.createButton.click();
    await groupPage.okButton.click();

    await use({ groupName });
  },
});

module.exports = { test, expect };
