const { InventoryPage } = require("./InventoryPage");

exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page; //cuva page objekat koji je prosledjen kroz konstruktor,u instancu klase, kako bi sve metode te klase mogle da ga koriste
        

        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]');

        this.errorMessage = page.locator('[data-test="error"]');
        this.url = '/';
    }

    //Navigate to the login page
    async gotoLoginPage() {
        await this.page.goto(this.url);
    }

    //Login with username and password
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    //login with username and password using enter key
    async loginWithEnter(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.passwordInput.press('Enter');    
    }
    //error message validation
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }



};