  export class CartPage {
   constructor(page) {
    this.page = page;
  }
  get checkoutBtn() {
    return this.page.locator('[data-test="checkout"]');
  }
  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }}