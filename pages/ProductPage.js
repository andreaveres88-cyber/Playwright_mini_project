exports.ProductPage = class ProductPage {
    constructor(page) {
        this.page = page;

        this.name = page.getByTestId('inventory-item-name');
        this.description = page.getByTestId('inventory-item-desc');
        this.price = page.getByTestId('inventory-item-price');
        this.backToProductsButton = page.getByTestId('back-to-products');

        this.urlPattern =/inventory-item\.html/; 

    }

    async goBack() {
        await this.backToProductsButton.click();


    }


}