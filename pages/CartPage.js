exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
        this.url = "/cart.html";
        this.title = page.locator('[data-test="title"]');
        this.cardItem = page.locator('[data-test="inventory-item]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }
  
    async continueShopping(){
        await this.continueShoppingButton.click();

}
async logout(){
    await this.checkoutButton.click();
}




}