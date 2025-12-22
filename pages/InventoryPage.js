     export class InventoryPage {
     constructor(page) {
        this.page = page;
     }
     get pageTitle() { return this.page.locator('[data-test="title"]'); }
     get cartBadge() { return this.page.locator('[data-test="shopping-cart-badge"]'); }
     get backpackAddToCartBtn() { return this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'); }
     get bikeLightAddToCartBtn() { return this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]'); }
     get cartBtn() { return this.page.locator('[data-test="shopping-cart-link"]'); }
     }