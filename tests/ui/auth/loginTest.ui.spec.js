// const { test, expect } = require('../../../fixtures/dashboardFixtures');
// const { invalidUser, invalidPassword } = require('../../../utils/testData');

// test.describe('UI | Login | Negative', () => {

//   test('Invalid username shows error', async ({ loginPage }) => {
//     await loginPage.open();
//     await loginPage.submitInvalidUsername(invalidUser.email);

//     await expect(loginPage.userNotFoundMsg).toBeVisible();
//   });

//   test('Invalid password shows error', async ({ loginPage,dashboardPage }) => {
//     //await dashboardPage.logout();
//     await loginPage.open();
//     await loginPage.submitInvalidPassword(
//       invalidPassword.email,
//       invalidPassword.password
//     );

//     await expect(loginPage.invalidCredentialsMsg).toBeVisible();
//   });
// });
