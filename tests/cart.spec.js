const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { loginAsStandardUser } = require('../utils/testHelper');

test.describe('Carrito de compras - SHOP-301 SHOP-302', () => {
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        await loginAsStandardUser(page);
        inventoryPage = new InventoryPage(page);
    });

    test('agregar un producto al carrito', async () => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        expect(await inventoryPage.getCartBadgeCount()).toBe('1');
    });

    test('agregar multiples productos', async () => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.addItemByName('Sauce Labs Bike Light');
        await inventoryPage.addItemByName('Sauce Labs Bolt T-Shirt');
        expect(await inventoryPage.getCartBadgeCount()).toBe('3');
    });

    test('remover producto desde el catalogo', async () => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        expect(await inventoryPage.getCartBadgeCount()).toBe('1');

        await inventoryPage.removeItemByName('Sauce Labs Backpack');
        expect(await inventoryPage.isCartBadgeVisible()).toBe(false);
    });

    test('verificar producto en pagina del carrito', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        const cart = new CartPage(page);
        expect(await cart.getItemCount()).toBe(1);
        expect(await cart.getItemName(0)).toBe('Sauce Labs Backpack');
    });

    test('verificar precio en el carrito', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        const precioEnCatalogo = await inventoryPage.getItemPrice('Sauce Labs Backpack');

        await inventoryPage.goToCart();
        const cart = new CartPage(page);
        const precioEnCarrito = await cart.getItemPrice(0);

        expect(precioEnCarrito).toContain(precioEnCatalogo.toString());
    });

    test('remover producto desde el carrito', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.addItemByName('Sauce Labs Bike Light');
        await inventoryPage.goToCart();

        const cart = new CartPage(page);
        expect(await cart.getItemCount()).toBe(2);

        await cart.removeItemByName('Sauce Labs Backpack');
        expect(await cart.getItemCount()).toBe(1);
    });

    test('carrito vacio', async ({ page }) => {
        await inventoryPage.goToCart();
        const cart = new CartPage(page);
        expect(await cart.getItemCount()).toBe(0);
    });

    test('volver al catalogo desde el carrito', async ({ page }) => {
        await inventoryPage.goToCart();
        const cart = new CartPage(page);
        await cart.continueShopping();

        const back = new InventoryPage(page);
        expect(await back.isLoaded()).toBe(true);
    });
});
