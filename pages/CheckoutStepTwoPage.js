     export class CheckoutStepTwoPage {
     constructor(page) {
        this.page = page;
     }

     // Getter for the finish button based on codegen line 22
     get finishBtn() { return this.page.locator('[data-test="finish"]'); }

     // Method to complete the order
     async finishOrder() {
     await this.finishBtn.click();
     }
     }