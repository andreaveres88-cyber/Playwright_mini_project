import { test, expect } from "../fixtures";

test.describe("Product details page", () => {

    test("Details page shows the same name, description and price as the list", async ({ inventoryPage, productPage, page }) => {

        //product under test
        const productName = "Sauce Labs Bike Light";


        //read description and price from the product list
        const listDescription = await inventoryPage.getItemDescription(productName).textContent();

        const listPrice = await inventoryPage.getItemPrice(productName).textContent();
        await inventoryPage.openProduct(productName);

        //details should show the same data as the list
        await expect(page).toHaveURL(productPage.urlPattern);
        await expect(productPage.backToProductsButton).toBeVisible();
        await expect(productPage.name).toHaveText(productName);
        await expect(productPage.description).toHaveText(listDescription);
        await expect(productPage.price).toHaveText(listPrice);




    })


})