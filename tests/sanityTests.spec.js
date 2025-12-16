import {expect, test} from '@playwright/test'
import {BASE_URL, URLS} from '../data/urls.js'
import {USERS} from '../data/userData.js'
import {CartPage} from '../pages/CartPage.js'
import {CheckoutCompletePage} from '../pages/CheckoutCompletePage.js'
import {CheckoutStepOnePage} from '../pages/CheckoutStepOnePage.js'
import {CheckoutStepTwoPage} from '../pages/CheckoutStepTwoPage.js'
import {InventoryPage} from '../pages/InventoryPage.js'
import {LoginPage} from '../pages/LoginPage.js'
import {verifyElementIsVisible} from '../helpers/utils.js'

test('Sanity - End to End purchase flow', async ({page}) => {
  const loginPage = new LoginPage(page)
  const inventoryPage = new InventoryPage(page)
  const cartPage = new CartPage(page)
  const stepOnePage = new CheckoutStepOnePage(page)
  const stepTwoPage = new CheckoutStepTwoPage(page)
  const completePage = new CheckoutCompletePage(page)
  await loginPage.navigate(BASE_URL)
  await loginPage.login(USERS.standard.username, USERS.standard.password)

  await expect(page).toHaveURL(URLS.INVENTORY)
  await expect(inventoryPage.pageTitle).toHaveText('Products')
  await verifyElementIsVisible(inventoryPage.pageTitle)
  expect(await inventoryPage.getPageTitle()).toBe('Products')

  await inventoryPage.addBackpackToCart()
  await inventoryPage.addBikeLightToCart()
  await expect.poll(() => inventoryPage.getCartBadgeCount()).toBe(2)
  await inventoryPage.goToCart()
  
  await expect(page).toHaveURL(URLS.CART)
  await expect(cartPage.pageTitle).toHaveText('Your Cart')
  expect(await cartPage.getPageTitle()).toBe('Your Cart')

  expect(await cartPage.getCartItemCount()).toBe(2)
  await cartPage.clickCheckout()

  await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE)
  await expect(stepOnePage.pageTitle).toHaveText('Checkout: Your Information')
  expect(await stepOnePage.getPageTitle()).toBe('Checkout: Your Information')

  await stepOnePage.fillDetails('Test', 'User', '12345')

  await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO)
  await expect(stepTwoPage.pageTitle).toHaveText('Checkout: Overview')
  expect(await stepTwoPage.getPageTitle()).toBe('Checkout: Overview')
  expect(await stepTwoPage.getSummaryTotal()).toContain('$')

  await stepTwoPage.finishCheckout()

  await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE)
  await expect(completePage.pageTitle).toHaveText('Checkout: Complete!')
  expect(await completePage.getPageTitle()).toBe('Checkout: Complete!')
  expect(await completePage.getCompleteMessage()).toContain('Thank you')
})
