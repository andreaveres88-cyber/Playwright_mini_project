const {test, expect} = require ('../fixtures');

test.describe ("Product details page", () =>{

test ("Details page shows the same name, description and price as the list", async ({inventoryPage,productPage,page})=>{

    //naziv proizvoda koji testiramo
const productName= "Sauce Labs Bike Light";

//kartica tog proizvoda na listi (lokator)

const item =inventoryPage.getItem(productName);

//opis i cena sa LISTE
const listDescription = await item.locator('[data-test="inventory-item-desc"]').textContent();

const listPrice = await item.locator('[data-test="inventory-item-price"]').textContent();
await inventoryPage.openProduct(productName);

await expect(page).toHaveURL(productPage.urlPattern);
await expect(productPage.backToProductsButton).toBeVisible();
await expect (productPage.name).toHaveText(productName);
await expect(productPage.description).toHaveText(listDescription);
await expect(productPage.price).toHaveText(listPrice);




})


})