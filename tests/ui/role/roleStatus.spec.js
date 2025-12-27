const { test, expect } = require('../../../fixtures/roleFixture');

test.describe('UI | Role | Search → Edit → Toggle Active/Inactive', () => {
  test('Search role and toggle Active/Inactive status dynamically', async ({ rolePage }) => {
    await rolePage.open();

    // Role to search (matches multiple roles starting with "Updated")
    const roleName = 'Updated';

    // Toggle first role status dynamically
    await rolePage.toggleFirstRoleStatusDynamic(roleName);

    // Verify that the first row is still visible after toggle
    const firstRole = rolePage.roleRows.first();
    await expect(firstRole).toBeVisible();
  });
});
