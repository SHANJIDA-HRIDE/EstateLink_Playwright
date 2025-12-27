const { expect } = require('@playwright/test');
const { test } = require('../../../fixtures/rolefixture');
const { generateLongText, generateRoleName } = require('../../../utils/helpers');

test.describe('UI | Role | Validation Rules', () => {

  test('Create button is disabled when no data entered', async ({ rolePage }) => {
    await rolePage.open();
    await rolePage.openAddRole();

    await expect(rolePage.createButton).toBeDisabled();
  });

  test('Create button disabled when role name added but no permission selected', async ({ rolePage }) => {
    await rolePage.open();
    await rolePage.openAddRoleModal();

    await rolePage.fillRoleForm({ name: generateRoleName() });

    await expect(rolePage.createButton).toBeDisabled();
  });

  test('Duplicate role name shows error', async ({ rolePage, existingRole }) => {
    await rolePage.open();
    await rolePage.openAddRoleModal();

    await rolePage.fillRoleForm({
      name: existingRole.roleName,
      permissions: { createMember: true },
    });

    await rolePage.submitCreate();

    await expect(rolePage.duplicateError).toBeVisible();
  });

  test('Role description length >255 shows error', async ({ rolePage }) => {
    await rolePage.open();
    await rolePage.openAddRoleModal();

    await rolePage.fillRoleForm({
      name: generateRoleName(),
      description: generateLongText(300),
      permissions: { createMember: true },
    });

    await expect(rolePage.descriptionLimitError).toBeVisible();
  });

  test('Editing role with existing name shows duplicate error', async ({ rolePage, existingRole }) => {
    const anotherRole = generateRoleName('AnotherRole');

    await rolePage.open();
    await rolePage.openAddRoleModal();
    await rolePage.fillRoleForm({
      name: anotherRole,
      permissions: { createMember: true },
    });
    await rolePage.submitCreate();
    await rolePage.okButton.click();

    await rolePage.openEditRole(anotherRole);
    await rolePage.fillRoleForm({ name: existingRole.roleName });
    await rolePage.submitUpdate();

    await expect(rolePage.duplicateError).toBeVisible();
  });

  test('Update button disabled when no changes made', async ({ rolePage, existingRole }) => {
    await rolePage.open();
    await rolePage.openEditRole(existingRole.roleName);

    await expect(rolePage.updateButton).toBeDisabled();
  });

  test('Edit description >255 chars shows error', async ({ rolePage, existingRole }) => {
    await rolePage.open();
    await rolePage.openEditRole(existingRole.roleName);

    await rolePage.fillRoleForm({
      description: generateLongText(300),
    });

    await expect(rolePage.descriptionLimitError).toBeVisible();
  });

});
