exports.InventoryPage = class InventoryPage {
    constructor(page) {
        this.page = page;

        this.title = page.locator('[data-test="title"]');
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.url = '/inventory.html';
        this.menuButton = page.locator("#react-burger-menu-btn");
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.sortIcon = page.locator('[data-test="product-sort-container"]');
    }

    //logout from the app
    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
//sort products: "az", "za", "lohi", "hilo"
    async sortItems(option) {
        await this.sortIcon.selectOption(option);

    }

    //find one product card by its name
    getItem(productName) {
        return this.inventoryItems.filter({ hasText: productName });
    }

    //Add to cart / Remove button inside that product card
    getItemButton(productName) {
        return this.getItem(productName).locator('button');
    }

    async addToCart(productName) {
        await this.getItemButton(productName).click();
    }

    async removeFromCart(productName) {
        await this.getItemButton(productName).click();
    }

    async goToCart() {
        await this.cartLink.click();
    }


};
