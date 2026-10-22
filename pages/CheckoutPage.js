exports.CheckoutPage = class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.infoUrl = "/checkout-step-one.html";
        this.overviewUrl = "/checkout-step-two.html";
        this.completeUrl = "/checkout-complete.html";

        this.title = page.locator('[data-test="title"]');

        //step one your information
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');



        //step 2 overview
        this.overviewItems = page.locator('[data-test="inventory-item"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');

        //step 3 complete
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');


    }
    //fill in the customer information and continue to overview
    async fillInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }
    async cancel() {
        await this.cancelButton.click();
    }
    async finish () {
       await this.finishButton.click();
    }
    async backHome() {
      await this.backHomeButton.click();
    }



}