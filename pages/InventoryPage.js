export class InventoryPage {
  constructor(page) {
    this.page = page
    // Locators

    // Header elements
    this.pageTitle = page.locator('.title')
    this.cartIcon = page.locator('.shopping_cart_link')
    this.cartBadge = page.locator('.shopping_cart_badge')

    // Product Buttons
    this.addBackpackBtn = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    )
    this.addBikeLightBtn = page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]',
    )

    // Product Buttons Remove after adding
    this.removeBackpackBtn = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    )
  }
  // Actions / Methods
  async getPageTitle() {
    return await this.pageTitle.innerText()
  }
  // Add specific items to the cart
  async addBackpackToCart() {
    await this.addBackpackBtn.click()
  }// Add bikelight item to the cart
  async addBikeLightToCart() {
    await this.addBikeLightBtn.click()
  }
  // Get the number displayed on the cart badge
  async getCartBadgeCount() {
    const text = await this.cartBadge.innerText()
    return Number(text)
  }
  // Navigate to the cart page
  async goToCart() {
    await this.cartIcon.click()
  }
  // Remove backpack from cart
  async removeBackpackFromCart() {
    await this.removeBackpackBtn.click()
  }
}
