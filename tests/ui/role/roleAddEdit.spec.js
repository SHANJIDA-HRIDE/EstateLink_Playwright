const { test,expect } = require('../../../fixtures/rolefixture');


test.describe('UI | Role | Add → Edit', () => {

  test('Create role and edit it successfully', async ({ rolePage, createdRole }) => {

    /* ================= ADD VALIDATION ================= */
    const createdRoleName = createdRole.name;

    const createdRow = await rolePage.searchRole(createdRoleName);
    await expect(createdRow).toHaveCount(1);

    /* ================= EDIT DATA (GENERATED ONCE) ================= */
    const updatedRoleName = `UpdatedRole_${Date.now()}`;
    const updatedDescription = 'Updated description for automated test role.';

    /* ================= EDIT ROLE ================= */
    await rolePage.editRole(
      createdRoleName,
      updatedRoleName,
      updatedDescription,
      {
        createMember: true,
        editMember: true,
      }
    );

    /* ================= VERIFY EDIT ================= */
    const updatedRow = await rolePage.searchRole(updatedRoleName);
    await expect(updatedRow).toHaveCount(1);
    await expect(updatedRow).toContainText(updatedRoleName);
  });

});
