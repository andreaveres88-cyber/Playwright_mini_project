exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
        this.url = "/cart.html";
        this.title = page.getByTestId('title');
        this.cartItems = page.getByTestId('inventory-item');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.checkoutButton = page.getByTestId('checkout');
    }
  
    async continueShopping(){
        await this.continueShoppingButton.click();

}
async checkout(){
    await this.checkoutButton.click();
}




}