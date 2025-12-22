 import {test, expect} from '@playwright/test';
 import {LoginPage} from '../pages/LoginPage.js';
 import {InventoryPage} from '../pages/InventoryPage.js';
 import {CartPage} from '../pages/CartPage.js';
 import {CheckoutStepOnePage} from '../pages/CheckoutStepOnePage.js';
 import {CheckoutStepTwoPage} from '../pages/CheckoutStepTwoPage.js';
 import {CheckoutCompletePage} from '../pages/CheckoutCompletePage.js';
 import {USERS} from '../data/userData.js';
 test('Sanity Test - Full Purchase Flow', async ({page}) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const stepOne = new CheckoutStepOnePage(page);
  const stepTwo = new CheckoutStepTwoPage(page);
  const completePage = new CheckoutCompletePage(page);
  // Login
  await loginPage.navigate();
  await loginPage.login(USERS.standard.username, USERS.standard.password);
  await expect(page).toHaveURL(/inventory\.html/);
  // Inventory
  await inventoryPage.backpackAddToCartBtn.click();
  await inventoryPage.bikeLightAddToCartBtn.click();
  await inventoryPage.cartBtn.click();
  // Cart
  await expect(page).toHaveURL(/cart\.html/);
  await cartPage.checkoutBtn.click();
  // Checkout Step One 
  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await stepOne.fillInformation('Israel', 'Israeli', '12345');
  // Checkout Step Two 
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await stepTwo.finishBtn.click();
  // Checkout Complete
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(completePage.successHeader).toHaveText(
    'Thank you for your order!'
  );
 }); 