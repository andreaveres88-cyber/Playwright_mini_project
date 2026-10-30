exports.CheckoutPage = class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.infoUrl = "/checkout-step-one.html";
        this.overviewUrl = "/checkout-step-two.html";
        this.completeUrl = "/checkout-complete.html";

        this.title = page.getByTestId('title');

        //step one your information
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.cancelButton = page.getByTestId('cancel');
        this.errorMessage = page.getByTestId('error');



        //step 2 overview
        this.overviewItems = page.getByTestId('inventory-item');
        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.taxLabel = page.getByTestId('tax-label');
        this.totalLabel = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');

        //step 3 complete
        this.completeHeader = page.getByTestId('complete-header');
        this.backHomeButton = page.getByTestId('back-to-products');


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