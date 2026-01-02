const { test, expect } = require('../../../fixtures/groupFixture');

test.describe('UI | Group | Add → Edit', () => {
  test('Create group and edit the created group', async ({ groupPage, createdGroup }) => {
    const groupName = createdGroup.name;

    // ================= ADD VALIDATION =================
    const groupRow = await groupPage.searchGroup(groupName);
    await expect(groupRow).toHaveCount(1);

    // // ================= EDIT DATA =================
    const updatedGroupName = `Up_${Date.now()}`;
    const updatedDescription = 'Updated description for automated test group.';

    // ================= EDIT GROUP =================
    await groupPage.editGroup(
        groupName, 
        updatedGroupName, 
        updatedDescription
    );

    // // ================= VERIFY EDIT =================
    const updatedRow = await groupPage.searchGroup(updatedGroupName);
    await expect(updatedRow).toHaveCount(1);
  });
});
