const { test } = require('../../../fixtures/groupFixture');
const { expect } = require('@playwright/test');
const {
  generateGroupName,
  generateLongText,
} = require('../../../utils/helpers');

test.describe('UI | Group | Validation Rules', () => {
  test('Create button is disabled when no data entered', async ({
    groupPage,
  }) => {
    await groupPage.open();
    await groupPage.openAddGroup();

    await expect(groupPage.createButton).toBeDisabled();
  });

    test('Creating a group with duplicate name shows error', async ({
    groupPage,
    existingGroup,
  }) => {
    await groupPage.open();
    await groupPage.openAddGroup();
    await groupPage.fillGroupForm({
      name: existingGroup.groupName,
      description: 'Trying duplicate creation',
    });
    await groupPage.submitCreate();

    await expect(groupPage.duplicateError).toBeVisible();
  });

  test('Group description length >255 shows error', async ({
    groupPage,
  }) => {
    await groupPage.open();
    await groupPage.openAddGroup();

    await groupPage.fillGroupForm({
      name: generateGroupName(),
      description: generateLongText(300),
    });
    await groupPage.submitCreate();

    await expect(groupPage.descriptionLimitError).toBeVisible();
  });

  test('Editing group with existing name shows duplicate error', async ({
    groupPage,
    existingGroup,
  }) => {
    const anotherGroupName = generateGroupName('AnotherGroup');

    // create another group
    await groupPage.open();
    await groupPage.openAddGroup();
    await groupPage.fillGroupForm({
      name: anotherGroupName,
      description: 'Another group',
    });

    await groupPage.submitCreate();
    await groupPage.okButton.click();

    // edit & duplicate
    await groupPage.openEditGroup(anotherGroupName);
    await groupPage.fillGroupForm({
      name: existingGroup.groupName,
    });

    await groupPage.submitUpdate();

    await expect(groupPage.duplicateError).toBeVisible();
  });
});
