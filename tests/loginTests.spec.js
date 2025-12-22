 import {test, expect} from '@playwright/test';
 import {LoginPage} from '../pages/LoginPage.js';
 import {InventoryPage} from '../pages/InventoryPage.js';
 import {USERS} from '../data/userData.js';
 test.describe('Login Tests', () => {
  
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login with valid credentials (standard_user)', async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(USERS.standard.username, USERS.standard.password);
     
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText(/products/i);
  });
 
  test('Login with locked_out_user', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(USERS.locked.username, USERS.locked.password);

    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  const negativeCases = [
  {
    name: 'Correct username + Wrong password',
    username: USERS.standard.username,
    password: 'wrong_password',
    expectedError:
        'Epic sadface: Username and password do not match any user in this service',
    },{
    name: 'Wrong username + Correct password',
    username: 'wrong_user',
    password: USERS.standard.password,
    expectedError:
        'Epic sadface: Username and password do not match any user in this service',
    },{
    name: 'Wrong username + Wrong password',
    username: 'wrong_user',
    password: 'wrong_password',
    expectedError:
        'Epic sadface: Username and password do not match any user in this service',
    },{
    name: 'Empty username + Correct password',
    username: '',
    password: USERS.standard.password,
    expectedError: 'Epic sadface: Username is required',
    },{
    name: 'Correct username + Empty password',
    username: USERS.standard.username,
    password: '',
    expectedError: 'Epic sadface: Password is required',
    },{
    name: 'Empty username + Empty password',
    username: '',
    password: '',
    expectedError: 'Epic sadface: Username is required',
    },
 ];
     for (const tc of negativeCases) {
     test(tc.name, async ({page}) => {
     const loginPage = new LoginPage(page);

     await loginPage.login(tc.username, tc.password);

     await expect(loginPage.errorMessage).toContainText(tc.expectedError);
     });
  }
});