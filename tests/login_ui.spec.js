import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test("Password field should mask the entered characters", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.passwordInput.fill('secret_sauce');

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');


});