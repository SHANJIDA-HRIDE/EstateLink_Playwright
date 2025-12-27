const { test, expect } = require('../../../fixtures/groupFixture');

test.describe('UI | Group | Add → Edit', () => {
  test('Create group and edit the created group', async ({ groupPage, createdGroup }) => {
    const groupName = createdGroup.name;
    const groupDescription = createdGroup.description;

    // ================= ADD VALIDATION =================
    const groupRow = await groupPage.searchGroup(groupName);
    await expect(groupRow).toBeVisible();

    // ================= EDIT DATA =================
    const updatedGroupName = `Updated_${groupName}`;
    const updatedDescription = `Updated_${groupDescription}`;

    // ================= EDIT GROUP =================
    await groupPage.editGroup(groupName, updatedGroupName, updatedDescription);

    // ================= VERIFY EDIT =================
    const updatedRow = await groupPage.searchGroup(updatedGroupName);
    await expect(updatedRow).toBeVisible();
  });
});
