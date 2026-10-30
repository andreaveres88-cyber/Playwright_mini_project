import { test, expect } from '../fixtures';

test.describe("Cart functionality", () => {

    test("Cart badge should not be visible when cart is empty", async ({ inventoryPage }) => {
        await expect(inventoryPage.cartBadge).not.toBeVisible();
    });

    test("Add one product to cart", async ({ inventoryPage }) => {
        await inventoryPage.addToCart("Sauce Labs Backpack");

        //badge shows 1 and the button changes to Remove
        await expect(inventoryPage.cartBadge).toHaveText("1");
        await expect(inventoryPage.getItemButton("Sauce Labs Backpack")).toHaveText("Remove");
    });

    test("Add multiple products to cart", async ({ inventoryPage }) => {
        await inventoryPage.addToCart("Sauce Labs Backpack");
        await inventoryPage.addToCart("Sauce Labs Bike Light");

        await expect(inventoryPage.cartBadge).toHaveText("2");
    });

    test("Remove product from cart on inventory page", async ({ inventoryPage }) => {
        await inventoryPage.addToCart("Sauce Labs Backpack");
        await expect(inventoryPage.cartBadge).toHaveText("1");

        await inventoryPage.removeFromCart("Sauce Labs Backpack");

        //badge disappears and the button goes back to Add to cart
        await expect(inventoryPage.cartBadge).not.toBeVisible();
        await expect(inventoryPage.getItemButton("Sauce Labs Backpack")).toHaveText("Add to cart");
    });



});
