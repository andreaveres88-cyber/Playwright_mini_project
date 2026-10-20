import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS, PASSWORD } from '../test-data/users';

test.describe("Login functionality-positive scenarios", () => {

    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.gotoLoginPage();
    });

    test("Successful login with valid credentials", async ({ page }) => {
        //Enter valid credentials and click login
        await loginPage.login(USERS.standard, PASSWORD);

        //Verify that the user is redirected to the inventory page
        await expect(page).toHaveURL(inventoryPage.url);

        //verify that the product page is displayed
        await expect(inventoryPage.title).toHaveText("Products");
        await expect(inventoryPage.inventoryList).toBeVisible();
    });

    //login using enter key instead of clicking the login button
    test("Successful login with valid credentials using enter key", async ({ page }) => {
        //Enter valid credentials and press enter
        await loginPage.loginWithEnter(USERS.standard, PASSWORD);

        await expect(page).toHaveURL(inventoryPage.url);
        await expect(inventoryPage.title).toHaveText("Products");

    });
    //logout validation

    test("Successful logout after login", async ({ page }) => {
        await loginPage.login(USERS.standard, PASSWORD);
        await expect(page).toHaveURL(inventoryPage.url);
        //logout using the menu
        await inventoryPage.logout();
        //user should be back on the login page
        await expect(page).toHaveURL(loginPage.url);
        await expect(loginPage.loginButton).toBeVisible();

    });

    // login with all valid users

    const validUsers = [
        USERS.standard,
        USERS.problem,
        USERS.performanceGlitch,
        USERS.error,
        USERS.visual
    ];

    for (const username of validUsers) {
        test(`Successful login with ${username}`, async ({ page }) => {
            await loginPage.login(username, PASSWORD);


            //user should be redirected to the inventory page
            //longer timeout because performance_glitch_user is intentionally slow
            await expect(page).toHaveURL(inventoryPage.url, {
                timeout: 10000
            });
            await expect(inventoryPage.title).toHaveText("Products", {
                timeout: 10000
            });
        });



    }



});