import { test, expect } from "../fixtures";

test.describe("Sort functionality", () => {

    test("Sort products by price low to high", async ({ inventoryPage }) => {

        await inventoryPage.sortItems("lohi");
        await expect(inventoryPage.inventoryItems.first()).toContainText("$7.99");

    });

    test("Sort products by price highest to lowest", async ({ inventoryPage }) => {

        await inventoryPage.sortItems("hilo");
        await expect(inventoryPage.inventoryItems.first()).toContainText("$49.99");

    })

    test("Sort products by name AZ", async ({ inventoryPage }) => {

        await inventoryPage.sortItems("az");
        await expect(inventoryPage.inventoryItems.first()).toContainText("Sauce Labs Backpack");

    })

    test("Sort products by name ZA", async ({ inventoryPage }) => {

        await inventoryPage.sortItems("za");
        await expect(inventoryPage.inventoryItems.first()).toContainText("Test.allTheThings() T-Shirt (Red)")
    });


})