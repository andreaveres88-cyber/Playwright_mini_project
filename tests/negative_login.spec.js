import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import {USERS, PASSWORD} from "../test-data/users";

test.describe("Login functionality-negative scenarios", () => {

    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.gotoLoginPage();
    });

    //mandatory fields validation

    test("Should show error message when username is empty", async ({ page }) => {
        await loginPage.login('', 'secret_sauce');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');

        // User should stay on the login page
        await expect(page).toHaveURL(loginPage.url);
    });

    test("Should show error message when password is empty", async ({ page }) => {
        await loginPage.login('standard_user', '');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');

        // User should stay on the login page
        await expect(page).toHaveURL(loginPage.url);
    });

    test("Should show error when both username and password are empty", async ({ page }) => {
        await loginPage.login('', '');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');

        // User should stay on the login page
        await expect(page).toHaveURL(loginPage.url);
    });

    //invalid credentials validation

    test("Unsuccessful login with invalid password", async ({ page }) => {
        //Enter valid username and invalid password and click login
        await loginPage.login('standard_user', 'secretsauce');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

        // User should stay on the login page
        await expect(page).toHaveURL(loginPage.url);
    });

    test("Unsuccessful login with invalid username", async ({ page }) => {
        await loginPage.login('invalid_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

        // User should stay on the login page
        await expect(page).toHaveURL(loginPage.url);
    });

    //locked out user validation

    test("Unsuccessful login with locked out user", async ({ page }) => {
        await loginPage.login("locked_out_user", "secret_sauce");
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');

        // User should stay on the login page
        await expect(page).toHaveURL(loginPage.url);
    });

    //security validation

    test('Unsuccessful login with SQL injection payload', async ({ page }) => {
        // Try to log in with an SQL injection string instead of a username
        await loginPage.login("' OR '1'='1", 'some_password');

        // The system must deny access and show the standard error message
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');

        // User should stay on the login page
        await expect(page).toHaveURL(loginPage.url);
    });

    // long password

    test("Unsuccessful login with excessively long password string", async ({ page }) => {
        // Generate a long password string (300 characters)
        const longPassword = "a".repeat(300);
        await loginPage.login('standard_user', longPassword);

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');

        // User should stay on the login page
        await expect(page).toHaveURL(loginPage.url);
    });

    //access control validation

    test("Should not allow access to inventory page without login", async ({ page }) => {
        //try to open the inventory page directly without logging in
        await page.goto(inventoryPage.url);
        //an error message should explain the login is required
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
        //the login form should be displayed instead of the products
        await expect(loginPage.loginButton).toBeVisible();
        await expect(inventoryPage.inventoryList).not.toBeVisible();

    });
    //log in and log out
    test("Should not allow access to inventory page after logout", async ({ page }) => {

        await loginPage.login("standard_user", "secret_sauce");
        await expect(page).toHaveURL(inventoryPage.url);
        await inventoryPage.logout();

        //try to open inventory page directly after logout
        await page.goto(inventoryPage.url);

        //access should be denied with an error message
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
        await expect(loginPage.loginButton).toBeVisible();
        await expect(inventoryPage.inventoryList).not.toBeVisible();

    });

    //case sensitivity validation

    test("Unsuccessful login with uppercase letters in username", async ({ page }) => {
        await loginPage.login("Standard_User", "secret_sauce");
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
        await expect(page).toHaveURL(loginPage.url);
    });

    test("Unsuccessful login with uppercase letters in password", async ({ page }) => {
        await loginPage.login("standard_user", "SECRET_SAUCE");
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");

        await expect(page).toHaveURL(loginPage.url);
    });

    //password masking validation





});
