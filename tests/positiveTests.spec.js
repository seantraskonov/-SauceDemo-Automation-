 import {test, expect} from '@playwright/test';
 import {LoginPage} from '../pages/LoginPage.js';
 import {InventoryPage} from '../pages/InventoryPage.js';
 import {USERS} from '../data/userData.js';

 const positiveUsers = [
  USERS.standard,
  USERS.problem,
  USERS.performance,
  USERS.error,
  USERS.visual,
 ];
 for (const user of positiveUsers) {
  test(`Positive Login Test - ${user.username}`, async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();

    await loginPage.login(user.username, user.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });
 }