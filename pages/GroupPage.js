// pages/GroupPage.js
const { BASE_URL } = require('../utils/env');
const { expect } = require('@playwright/test');
const { selectRowContaining, waitForHeader } = require('../utils/helpers'); // ✅ import helpers


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
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });

    // Search & edit
    this.searchInput = page.getByPlaceholder('Search list...');
    this.editGroupButton = page.getByRole('button', { name: 'Edit' });
    this.backToGroupList = page.locator('div:text-is("View Group")');

    // Table rows
    this.groupRows = page.locator('tr');
    this.groupDescriptionHeader = page.getByRole('columnheader', { name: 'Group Description' });
    
    // ===== Errors =====
    this.duplicateError = page.getByText(
      'group with this group name already exists.'
    );
    this.descriptionLimitError = page.getByText(
  'Ensure this field has no more than 255 characters'
);
  
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

    // ✅ call helper function directly
    await selectRowContaining(this.page, 'Superadmin');

    await this.createButton.click();
    await this.okButton.click();

    // ✅ call header wait helper
    await waitForHeader(this.page, this.groupDescriptionHeader);
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
    await this.backToGroupList.click();
    await this.groupDescriptionHeader.waitFor({ state: 'visible', timeout: 100000 });
  }

  async toggleFirstGroupStatusDynamic(groupName) {
    // 1️⃣ Search for group
    await this.searchInput.fill(groupName);
    await this.page.waitForTimeout(500); // wait for table filter/debounce

    // 2️⃣ Filter rows and select the first match
    const firstGroup = this.groupRows.filter({ hasText: groupName }).first();
    await firstGroup.waitFor({ state: 'visible', timeout: 100000 });

    // 3️⃣ Click the first group row
    await firstGroup.click();

    // 4️⃣ Click Edit
    await this.editGroupButton.click();

    // 5️⃣ Detect status dynamically (Active / Inactive button)
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

    // 7️⃣ Back to group list
    await this.backToGroupList.click();
  }


async openAddGroup() {
    await this.addGroupButton.click();
  }

  // ================= Form Helpers =================
  async fillGroupForm({ name, description }) {
    if (name !== undefined) await this.groupNameInput.fill(name);
    if (description !== undefined)
      await this.groupDescriptionTextarea.fill(description);
  }

  async submitCreate() {
    await this.createButton.click();
  }

  async submitUpdate() {
    await this.updateButton.click();
    await this.okButton.click();
  }



async openEditGroup(groupName) {
  // Search group
  await this.searchInput.fill(groupName);

  await this.page.locator(`tr:has-text("${groupName}")`).first().click();
  await this.editGroupButton.click();
}



}

module.exports = { GroupPage };
