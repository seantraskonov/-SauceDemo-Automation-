     export class CheckoutStepOnePage {
     constructor(page) {
        this.page = page;
     }
     // Getters for information fields based on codegen lines 18-27
     get firstNameField() { return this.page.locator('[data-test="firstName"]'); }
     get lastNameField() { return this.page.locator('[data-test="lastName"]'); }
     get postalCodeField() { return this.page.locator('[data-test="postalCode"]'); }
     get continueBtn() { return this.page.locator('[data-test="continue"]'); }

     // Method to fill user info and proceed to next step
     async fillInformation(fname, lname, zip) {
        await this.firstNameField.fill(fname);
        await this.lastNameField.fill(lname);
        await this.postalCodeField.fill(zip);
        await this.continueBtn.click();
     }
     }