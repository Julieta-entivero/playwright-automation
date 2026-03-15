const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/InventoryPage');
const { ItemDetailPage } = require('../pages/ItemDetailPage');
const { loginAsStandardUser } = require('../utils/testHelper');

test.describe('Catalogo de productos - SHOP-201 SHOP-202 SHOP-203', () => {
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        await loginAsStandardUser(page);
        inventoryPage = new InventoryPage(page);
    });

    test('se muestran 6 productos', async () => {
        const count = await inventoryPage.getItemCount();
        expect(count).toBe(6);
    });

    test('titulo de la pagina es Products', async () => {
        expect(await inventoryPage.isLoaded()).toBe(true);
    });

    test('ordenar por precio menor a mayor', async () => {
        await inventoryPage.sortBy('Price (low to high)');
        const prices = await inventoryPage.getAllPrices();

        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    });

    test('ordenar por precio mayor a menor', async () => {
        await inventoryPage.sortBy('Price (high to low)');
        const prices = await inventoryPage.getAllPrices();

        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
        }
    });

    test('ordenar por nombre A-Z', async () => {
        await inventoryPage.sortBy('Name (A to Z)');
        const names = await inventoryPage.getAllItemNames();

        for (let i = 0; i < names.length - 1; i++) {
            expect(names[i].localeCompare(names[i + 1])).toBeLessThanOrEqual(0);
        }
    });

    test('ordenar por nombre Z-A', async () => {
        await inventoryPage.sortBy('Name (Z to A)');
        const names = await inventoryPage.getAllItemNames();

        for (let i = 0; i < names.length - 1; i++) {
            expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0);
        }
    });

    test('click en producto abre detalle correcto', async ({ page }) => {
        await inventoryPage.clickItemByName('Sauce Labs Backpack');
        const detail = new ItemDetailPage(page);

        expect(await detail.getName()).toBe('Sauce Labs Backpack');
        expect(await detail.getDescription()).not.toBe('');
        expect(await detail.getPrice()).toContain('$');
    });

    test('volver al catalogo desde detalle', async ({ page }) => {
        await inventoryPage.clickItemByName('Sauce Labs Backpack');
        const detail = new ItemDetailPage(page);
        await detail.goBack();

        const backToInventory = new InventoryPage(page);
        expect(await backToInventory.isLoaded()).toBe(true);
    });

    test('agregar producto desde detalle', async ({ page }) => {
        await inventoryPage.clickItemByName('Sauce Labs Backpack');
        const detail = new ItemDetailPage(page);
        await detail.addToCart();
        await detail.goBack();

        const inventory = new InventoryPage(page);
        expect(await inventory.getCartBadgeCount()).toBe('1');
    });
});
