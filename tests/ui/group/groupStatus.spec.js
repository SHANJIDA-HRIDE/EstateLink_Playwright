const { test, expect } = require('../../../fixtures/groupFixture');

test.describe('UI | Group | Search → Edit → Toggle Active/Inactive', () => {
  test('Search group and toggle Active/Inactive status dynamically', async ({ groupPage }) => {
    await groupPage.open();

    // Group name keyword to search
    // (matches multiple groups starting with "TGp" or "Updated")
    const groupName = 'Up_';

    // Toggle first group status dynamically
    await groupPage.toggleFirstGroupStatusDynamic(groupName);

    // Verify that the first row is still visible after toggle
    const firstGroup = groupPage.groupRows.first();
    await expect(firstGroup).toBeVisible();
  });
});
