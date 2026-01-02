const { BASE_URL } = require('../utils/env');
const { expect } = require('@playwright/test');

class RolePage {
  constructor(page) {
    this.page = page;

 // Buttons
    this.addRoleButton = page.getByRole('button', { name: 'Add Role' });
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.okButton = page.getByRole('button', { name: 'OK' });
    this.editRoleButton = page.getByRole('button', { name: 'Edit' });

    // Inputs
    this.roleNameInput = page.locator('input[name="role_name"]');
    this.roleDescriptionTextarea = page.locator('textarea[name="role_description"]');

    // Permissions
    this.createMemberCheckbox = page.getByText('Create Member');
    this.editMemberCheckbox = page.getByText('Edit Member');

    // Search
    this.searchInput = page.getByPlaceholder('Search list...');
    this.viewRoleLink = page.locator('div:text-is("View Role")');
    this.permissionsHeader = page.getByRole('columnheader', { name: 'Permissions' });

    // Messages
    this.roleForm = page.locator('form');
    this.duplicateError = this.roleForm.locator('p', { hasText: 'A role with this name already exists' });

    this.descriptionLimitError = page.getByText('Role description cannot exceed 255 characters');
    this.updateSuccessMessage = page.getByText('Your Role has been successfully updated.');

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
    await this.createMemberCheckbox.click();
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
        ? await this.createMemberCheckbox.check()
        : await this.createMemberCheckbox.uncheck();
    }
    if (permissions.editMember !== undefined) {
      permissions.editMember
        ? await this.editMemberCheckbox.check()
        : await this.editMemberCheckbox.uncheck();
    }

    await this.updateButton.click();
    await this.confirmButton.click();
    await this.updateSuccessMessage.waitFor({ state: 'visible' });
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
  await this.permissionsHeader.waitFor({ state: 'visible', timeout: 100000 });
}

  async openAddRole() {
    await this.addRoleButton.click();
  }


async fillRoleForm({ name, description, permissions = {} }) {
    if (name !== undefined) await this.roleNameInput.fill(name);
    if (description !== undefined)
      await this.roleDescriptionTextarea.fill(description);

    if (permissions.createMember === true)
      await this.createMemberCheckbox.check();
    if (permissions.createMember === false)
      await this.createMemberCheckbox.uncheck();

    if (permissions.editMember === true)
      await this.editMemberCheckbox.check();
    if (permissions.editMember === false)
      await this.editMemberCheckbox.uncheck();
  }

  async openEditRole(roleName) {
    await this.searchInput.fill(roleName);
    await this.page.locator(`tr:has-text("${roleName}")`).first().click();
    await this.editRoleButton.click();
    await this.editMemberCheckbox.click();
  }

  async submitCreate() {
    await this.createButton.click();
  }

  async submitUpdate() {
    await this.updateButton.click();
    await this.confirmButton.click();
  }

}

module.exports = { RolePage };
