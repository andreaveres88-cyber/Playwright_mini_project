const base = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const {CartPage} = require ('./pages/CartPage');
const { USERS, PASSWORD } = require('./test-data/users');

exports.test = base.test.extend({

    //logs in as standard_user and gives the test an InventoryPage
    inventoryPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.gotoLoginPage();
        await loginPage.login(USERS.standard, PASSWORD);
        await base.expect(page).toHaveURL(inventoryPage.url);

        await use(inventoryPage);
    },

    //gives the testa CartPage object
    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use (cartPage);
    }
});

exports.expect = base.expect;
