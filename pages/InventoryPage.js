export class InventoryPage {
  pageTitle = '[data-test="title"]'
  cartBadge = '[data-test="shopping-cart-badge"]'
  backpackAddToCartButton = '[data-test="add-to-cart-sauce-labs-backpack"]'
  bikeLightAddToCartButton = '[data-test="add-to-cart-sauce-labs-bike-light"]'
  cartButton = '[data-test="shopping-cart-link"]'

  constructor(page) {
    this.page = page
  }
}
