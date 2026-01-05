import {expect, test} from '@playwright/test'

import {CartPage} from '../pages/CartPage.js'
import {CheckoutCompletePage} from '../pages/CheckoutCompletePage.js'
import {CheckoutStepOnePage} from '../pages/CheckoutStepOnePage.js'
import {CheckoutStepTwoPage} from '../pages/CheckoutStepTwoPage.js'
import {InventoryPage} from '../pages/InventoryPage.js'
import {LoginPage} from '../pages/LoginPage.js'

import {CHECKOUT_DATA} from '../data/checkoutData.js'
import {URLS} from '../data/urls.js'
import {USERS} from '../data/userData.js'

test.describe('E2E Checkout Flow', () => {
  test('Complete order purchase', async ({page}) => {
    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const stepOne = new CheckoutStepOnePage(page)
    const stepTwo = new CheckoutStepTwoPage(page)
    const completePage = new CheckoutCompletePage(page)

    await loginPage.openLoginPage()
    await loginPage.login(USERS.standard.username, USERS.standard.password)

    await expect(page).toHaveURL(URLS.INVENTORY)
    await expect(page).toHaveTitle('Swag Labs')

    await page.locator(inventoryPage.backpackAddToCartButton).click()
    await page.locator(inventoryPage.bikeLightAddToCartButton).click()

    await expect(page.locator(inventoryPage.cartBadge)).toHaveCount(1)

    await page.locator(inventoryPage.cartButton).click()
    await expect(page).toHaveURL(URLS.CART)

    await cartPage.proceedToCheckout()
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE)

    await stepOne.fillInformation(
      CHECKOUT_DATA.validCustomer.firstName,
      CHECKOUT_DATA.validCustomer.lastName,
      CHECKOUT_DATA.validCustomer.postalCode,
    )

    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO)

    await stepTwo.finishOrder()
    await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE)

    await expect(page.locator(completePage.successHeader)).toHaveText(
      'Thank you for your order!',
    )
  })
})
