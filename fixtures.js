const base = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
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
});

exports.expect = base.expect;
