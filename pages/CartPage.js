export class CartPage {
  checkoutButton = '[data-test="checkout"]'

  constructor(page) {
    this.page = page
  }

  async proceedToCheckout() {
    await this.page.locator(this.checkoutButton).click()
  }
}
