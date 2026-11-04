import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {PASSWORD} from "../test-data/users";

test("Password field should mask the entered characters", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.passwordInput.fill(PASSWORD);

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');


});