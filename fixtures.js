const base = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const {CartPage} = require ('./pages/CartPage');
const {CheckoutPage}= require ('./pages/CheckoutPage');
const {ProductPage}= require ('./pages/ProductPage');
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
    },

    //gives the test a CheckoutPage object
    checkoutPage: async ({page}, use )=> {
        const checkoutPage=new CheckoutPage(page);
        await use (checkoutPage);
    },

    //gives the test a ProductPage object
    productPage: async({page}, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    }


});

exports.expect = base.expect;
