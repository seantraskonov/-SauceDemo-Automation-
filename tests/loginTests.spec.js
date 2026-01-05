import {expect, test} from '@playwright/test'
import {InventoryPage} from '../pages/InventoryPage.js'
import {LoginPage} from '../pages/LoginPage.js'

import {URLS} from '../data/urls.js'
import {USERS} from '../data/userData.js'

test.describe('Positive Login Tests', () => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.openLoginPage()
  })

  const positiveUsers = Object.values(USERS).filter(
    (user) => user.username !== 'locked_out_user',
  )

  positiveUsers.forEach((user) => {
    test(`Positive Login Test - ${user.username}`, async ({page}) => {
      const loginPage = new LoginPage(page)
      const inventoryPage = new InventoryPage(page)

      await loginPage.openLoginPage()
      await loginPage.login(user.username, user.password)

      await expect(page).toHaveURL(URLS.INVENTORY)
      await expect(page.locator(inventoryPage.pageTitle)).toHaveText('Products')
    })
  })
})

test.describe('Negative Login Tests', () => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.openLoginPage()
  })

  test('Login with locked_out_user', async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.login(USERS.locked.username, USERS.locked.password)

    await expect(page.locator(loginPage.errorMessage)).toContainText(
      'Epic sadface: Sorry, this user has been locked out.',
    )
  })

  test('Empty username + valid password', async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.login('', USERS.standard.password)

    await expect(page.locator(loginPage.errorMessage)).toContainText(
      'Epic sadface: Username is required',
    )
  })

  test('Valid username + empty password', async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.login(USERS.standard.username, '')

    await expect(page.locator(loginPage.errorMessage)).toContainText(
      'Epic sadface: Password is required',
    )
  })

  test('Wrong username + wrong password', async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.login('wrong_user', 'wrong_password')

    await expect(page.locator(loginPage.errorMessage)).toContainText(
      'Epic sadface: Username and password do not match any user in this service',
    )
  })
})
