     export class CheckoutCompletePage {
     // Constructor initializes the page and closes immediately
     constructor(page) {
        this.page = page;
     }
     // Getter for the success header message
     get successHeader() {return this.page.locator('[data-test="complete-header"]'); 
      }
     }