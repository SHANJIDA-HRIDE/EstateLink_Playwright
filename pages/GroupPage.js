const { BASE_URL } = require('../utils/env');
const { expect } = require('@playwright/test');

class GroupPage {
  constructor(page) {
    this.page = page;

    // Group form
    this.addGroupButton = page.getByRole('button', { name: 'Add Group' });
    this.groupNameInput = page.locator('input[name="group_name"]');
    this.groupDescriptionTextarea = page.locator('textarea[name="group_description"]');
    this.lastTableRow = page.locator('tbody tr').last();
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.okButton = page.getByRole('button', { name: 'OK' });

    // Search & edit
    this.searchInput = page.getByPlaceholder('Search list...');
    this.editGroupButton = page.getByRole('button', { name: 'Edit' });
    this.backToGroupList = page.getByText('Edit Group', { exact: true });

    // Table rows
    this.groupRows = page.locator('tr');
  }

  // ===================== Navigation =====================
  async open(path = '/group-list') {
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
    await this.page.goto(url);
    await expect(this.groupRows.first()).toBeVisible();
  }

  // ===================== Group Management =====================
  async createGroup(groupName, groupDescription) {
    await this.addGroupButton.click();
    await this.groupNameInput.fill(groupName);
    await this.groupDescriptionTextarea.fill(groupDescription);
    await this.lastTableRow.click();
    await this.createButton.click();
    await this.okButton.click();
  }

  async searchGroup(groupName) {
    await this.searchInput.fill(groupName);
    await expect(this.page.locator(`tr:has-text("${groupName}")`).first()).toBeVisible();
    return this.page.locator(`tr:has-text("${groupName}")`).first();
  }

  async editGroup(currentGroupName, newGroupName, newDescription) {
    const groupRow = await this.searchGroup(currentGroupName);
    await groupRow.click();
    await this.editGroupButton.click();

    if (newGroupName) await this.groupNameInput.fill(newGroupName);
    if (newDescription) await this.groupDescriptionTextarea.fill(newDescription);

    await this.updateButton.click();
    await this.okButton.click();
    await this.backToGroupList.waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = { GroupPage };
