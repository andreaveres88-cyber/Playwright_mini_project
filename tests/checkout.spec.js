import { test, expect } from "../fixtures"

test.describe("Checkout functionality", () => {

    //every test starts with one product in the cart and opens the checkout form

    test.beforeEach(async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addToCart("Sauce Labs Backpack");
        await inventoryPage.goToCart();
        await cartPage.checkout();

    });

    test("Complete checkout with valid information", async ({ checkoutPage, page }) => {
        await expect(page).toHaveURL(checkoutPage.infoUrl);
        await expect(checkoutPage.title).toHaveText("Checkout: Your Information");

        await checkoutPage.fillInformation("Andrea", "Veres", "21000");
        await expect(page).toHaveURL(checkoutPage.overviewUrl);
        await expect(checkoutPage.title).toHaveText("Checkout: Overview");

        await checkoutPage.finish();
        await expect(page).toHaveURL(checkoutPage.completeUrl);
        await expect(checkoutPage.completeHeader).toHaveText("Thank you for your order!");


    });
    test("Overview shows the product and correct price summary", async ({ checkoutPage }) => {
        await checkoutPage.fillInformation("Andrea", "Veres", "21000");

        await expect(checkoutPage.overviewItems).toHaveCount(1);
        await expect(checkoutPage.overviewItems).toContainText("Sauce Labs Backpack");

        await expect(checkoutPage.subtotalLabel).toHaveText("Item total: $29.99");
        await expect(checkoutPage.taxLabel).toHaveText("Tax: $2.40");
        await expect(checkoutPage.totalLabel).toHaveText("Total: $32.39");


    });

    test("Cart is empty after finishing the order", async ({ checkoutPage, inventoryPage, page }) => {

        await checkoutPage.fillInformation("Andrea", "Veres", "21000");
        await checkoutPage.finish();
        await checkoutPage.backHome();

        await expect(page).toHaveURL(inventoryPage.url);
        await expect(inventoryPage.cartBadge).not.toBeVisible();


    })

    test("Cancel on information step returns to cart", async ({ checkoutPage, cartPage, page }) => {
        await checkoutPage.cancel();

        await expect(page).toHaveURL(cartPage.url);
        await expect(cartPage.cartItems).toHaveCount(1);


    })

    //cancel on overview page returns to the inventory page
    test("Cancel on overview page returns to the inventory page", async ({ inventoryPage, checkoutPage, page }) => {

        await checkoutPage.fillInformation("Andrea", "Veres", "21000");
        await checkoutPage.cancel();

        await expect(page).toHaveURL(inventoryPage.url);
        await expect(inventoryPage.title).toHaveText("Products");
        await expect(inventoryPage.inventoryList).toBeVisible();


    })
    //Checkout with 2 inventory items

    test("Checkout with 2 added items in the card", async ({ checkoutPage, cartPage, inventoryPage, page }) => {
        await checkoutPage.cancel();
        await expect(page).toHaveURL(cartPage.url);

        await cartPage.continueShopping();
        await expect(page).toHaveURL(inventoryPage.url);
        await inventoryPage.addToCart("Sauce Labs Onesie");
        await expect(inventoryPage.cartBadge).toHaveText("2");

        await inventoryPage.goToCart();
        await cartPage.checkout();
        await expect(page).toHaveURL(checkoutPage.infoUrl);
        await expect(checkoutPage.title).toHaveText("Checkout: Your Information");

        await checkoutPage.fillInformation("Andrea", "Nikolic", "21000");

        await expect(page).toHaveURL(checkoutPage.overviewUrl);
        await expect(checkoutPage.overviewItems).toHaveCount(2);
        await expect(checkoutPage.subtotalLabel).toHaveText("Item total: $37.98");
        await expect(checkoutPage.taxLabel).toHaveText("Tax: $3.04");
        await expect(checkoutPage.totalLabel).toHaveText("Total: $41.02");
        await checkoutPage.finish();
        await expect(checkoutPage.completeHeader).toHaveText("Thank you for your order!");




    })

    //mandatory fields validation

    const missingFields = [
        { field: "first name", data: ["", "Veres", "21000"], error: "Error: First Name is required" },
        { field: "last name", data: ["Andrea", "", "21000"], error: "Error: Last Name is required" },
        { field: "postal code", data: ["Andrea", "Veres", ""], error: "Error: Postal Code is required" },
    ];

    for (const { field, data, error } of missingFields) {
        test(`Should show error when ${field} is empty`, async ({ checkoutPage, page }) => {
            await checkoutPage.fillInformation(...data);

            await expect(checkoutPage.errorMessage).toHaveText(error);
            //user should stay on the information step
            await expect(page).toHaveURL(checkoutPage.infoUrl);
        });
    }

    const customers = [
        { customer: "Short postal code", data: ["Emilija", "Vasic", "210"] },
        { customer: "Long last name", data: ["Sara", "Wherylonglastname", "21000"] }

    ]

    for (const { customer, data } of customers) {
        test(`Order from a user with: ${customer}`, async ({ checkoutPage, page }) => {
            await checkoutPage.fillInformation(...data);
            await checkoutPage.finish();
            await expect(page).toHaveURL(checkoutPage.completeUrl);
            await expect(checkoutPage.completeHeader).toHaveText("Thank you for your order!");

        })

    }
        

    })