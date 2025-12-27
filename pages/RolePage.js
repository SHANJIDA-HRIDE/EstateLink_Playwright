const { BASE_URL } = require('../utils/env');
const { expect } = require('@playwright/test');

class RolePage {
  constructor(page) {
    this.page = page;

    // Role form
    this.addRoleButton = page.getByRole('button', { name: 'Add Role' });
    this.roleNameInput = page.locator('input[name="role_name"]');
    this.roleDescriptionTextarea = page.locator('textarea[name="role_description"]');
    this.createMemberRoleCheckbox = page.getByText('Create Member');
    this.editMemberRoleCheckbox = page.getByText('Edit Member');
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.okButton = page.getByRole('button', { name: 'OK' });
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });

    // Search & edit
    this.searchInput = page.getByPlaceholder('Search list...');
    this.editRoleButton = page.getByRole('button', { name: 'Edit' });
    this.updateSuccessMessage = page.getByText('Your Role has been successfully updated.');
    this.viewRoleLink = page.locator('div:text-is("View Role")');
    this.permissionsHeader = page.getByRole('columnheader', { name: 'Permissions' });

    // Filter + Active/Inactive
    this.statusFilterButton = page.getByRole('button', { name: 'Status' });

    // Table rows
    this.roleRows = page.locator('tr'); // all role rows
  }

  // ===================== Navigation =====================
  async open(path = '/role-list') {
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
    await this.page.goto(url);
    await expect(this.roleRows.first()).toBeVisible();
  }

  // ===================== Role Management =====================
  async createRole(roleName, roleDescription) {
    await this.addRoleButton.click();
    await this.roleNameInput.fill(roleName);
    await this.roleDescriptionTextarea.fill(roleDescription);
    await this.createMemberRoleCheckbox.check();
    await this.createButton.click();
    await this.okButton.click();
  }

  async searchRole(roleName) {
    await this.searchInput.fill(roleName);
    await expect(this.page.locator(`tr:has-text("${roleName}")`).first()).toBeVisible();
    return this.page.locator(`tr:has-text("${roleName}")`);
  }

  async editRole(currentRoleName, newRoleName, newDescription, permissions = {}) {
    const roleRow = await this.searchRole(currentRoleName);
    await roleRow.first().click();
    await this.editRoleButton.click();

    if (newRoleName) await this.roleNameInput.fill(newRoleName);
    if (newDescription) await this.roleDescriptionTextarea.fill(newDescription);

    if (permissions.createMember !== undefined) {
      permissions.createMember
        ? await this.createMemberRoleCheckbox.check()
        : await this.createMemberRoleCheckbox.uncheck();
    }
    if (permissions.editMember !== undefined) {
      permissions.editMember
        ? await this.editMemberRoleCheckbox.check()
        : await this.editMemberRoleCheckbox.uncheck();
    }

    await this.updateButton.click();
    await this.confirmButton.click();
      await this.updateSuccessMessage.waitFor({ state: 'visible' });
;

    await this.okButton.click();

    await this.viewRoleLink.click();
    await this.permissionsHeader.waitFor({ state: 'visible', timeout: 10000 });
  }

  // ===================== Active / Inactive Support =====================

async toggleFirstRoleStatusDynamic(roleName) {
  // 1️⃣ Search for role
  await this.searchInput.fill(roleName);
  await this.page.waitForTimeout(500); // wait for table filter

  // 2️⃣ Filter rows and select the first match
  const firstRole = this.roleRows.filter({ hasText: roleName }).first();
  await firstRole.waitFor({ state: 'visible', timeout: 5000 });

  // 3️⃣ Click the first role
  await firstRole.click();

  // 4️⃣ Click Edit
  await this.editRoleButton.click();

  // 5️⃣ Detect status dynamically
  const statusButton = this.page.locator('button:has-text("Active"), button:has-text("Inactive")').first();
  const buttonText = await statusButton.innerText();

  if (buttonText === 'Active' || buttonText === 'Inactive') {
    await statusButton.click();
  } else {
    throw new Error(`Unexpected status button text: ${buttonText}`);
  }

  // 6️⃣ Confirm and OK
  await this.confirmButton.click();
  await this.okButton.click();
  await this.viewRoleLink.click();
  await this.permissionsHeader.waitFor({ state: 'visible', timeout: 10000 });
}


}

module.exports = { RolePage };
