export class CheckoutStepTwoPage {
  finishButton = '[data-test="finish"]'

  constructor(page) {
    this.page = page
  }

  async finishOrder() {
    await this.page.locator(this.finishButton).click()
  }
}
