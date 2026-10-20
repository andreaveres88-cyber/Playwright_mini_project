import { test, expect } from "../fixtures";

test.describe("Cart page", () => {
    test("Added product is shown in the cart", async ({ inventoryPage, cartPage, page }) => {

        await inventoryPage.addToCart("Sauce Labs Backpack");
        await inventoryPage.goToCart();

        await expect(page).toHaveURL(cartPage.url);
        await expect(cartPage.title).toHaveText("Your Cart");
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.cartItems).toContainText("Sauce Labs Backpack");

    });

test("Continue shopping returns to inventory page", async({inventoryPage, cartPage, page})=>{

await inventoryPage.goToCart();
await cartPage.continueShopping();

await expect(page).toHaveURL(inventoryPage.url);



})



});