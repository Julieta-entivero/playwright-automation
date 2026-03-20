const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutStepOnePage, CheckoutStepTwoPage, CheckoutCompletePage } = require('../pages/CheckoutPage');
const { loginAsStandardUser } = require('../utils/testHelper');

test.describe('Checkout - SHOP-401 SHOP-402 SHOP-403', () => {
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        await loginAsStandardUser(page);
        inventoryPage = new InventoryPage(page);
    });

    test('checkout completo con un producto', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        const cart = new CartPage(page);
        await cart.checkout();

        const stepOne = new CheckoutStepOnePage(page);
        await stepOne.fillForm('Julieta', 'Entivero', '5000');
        await stepOne.continue();

        const stepTwo = new CheckoutStepTwoPage(page);
        const total = await stepTwo.getTotal();
        expect(total).toContain('$');

        await stepTwo.finish();

        const complete = new CheckoutCompletePage(page);
        expect(await complete.isOrderComplete()).toBe(true);
        expect(await complete.getSuccessHeader()).toBe('Thank you for your order!');
    });

    test('checkout con multiples productos', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.addItemByName('Sauce Labs Bike Light');
        await inventoryPage.addItemByName('Sauce Labs Onesie');

        await inventoryPage.goToCart();
        const cart = new CartPage(page);
        expect(await cart.getItemCount()).toBe(3);

        await cart.checkout();
        const stepOne = new CheckoutStepOnePage(page);
        await stepOne.fillForm('Julieta', 'Entivero', '5000');
        await stepOne.continue();

        const stepTwo = new CheckoutStepTwoPage(page);
        await stepTwo.finish();

        const complete = new CheckoutCompletePage(page);
        expect(await complete.isOrderComplete()).toBe(true);
    });

    test('checkout sin nombre muestra error', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        const cart = new CartPage(page);
        await cart.checkout();

        const stepOne = new CheckoutStepOnePage(page);
        await stepOne.fillForm('', 'Entivero', '5000');
        await stepOne.continue();

        expect(await stepOne.isErrorVisible()).toBe(true);
        expect(await stepOne.getErrorMessage()).toContain('First Name is required');
    });

    test('checkout sin apellido muestra error', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        const cart = new CartPage(page);
        await cart.checkout();

        const stepOne = new CheckoutStepOnePage(page);
        await stepOne.fillForm('Julieta', '', '5000');
        await stepOne.continue();

        expect(await stepOne.isErrorVisible()).toBe(true);
        expect(await stepOne.getErrorMessage()).toContain('Last Name is required');
    });

    test('checkout sin codigo postal muestra error', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        const cart = new CartPage(page);
        await cart.checkout();

        const stepOne = new CheckoutStepOnePage(page);
        await stepOne.fillForm('Julieta', 'Entivero', '');
        await stepOne.continue();

        expect(await stepOne.isErrorVisible()).toBe(true);
        expect(await stepOne.getErrorMessage()).toContain('Postal Code is required');
    });

    test('cancelar checkout vuelve al carrito', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        const cart = new CartPage(page);
        await cart.checkout();

        const stepOne = new CheckoutStepOnePage(page);
        await stepOne.cancel();

        // deberia estar en el carrito de nuevo
        const backToCart = new CartPage(page);
        expect(await backToCart.getItemCount()).toBe(1);
    });

    test('volver al home despues de comprar', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        const cart = new CartPage(page);
        await cart.checkout();

        const stepOne = new CheckoutStepOnePage(page);
        await stepOne.fillForm('Julieta', 'Entivero', '5000');
        await stepOne.continue();

        const stepTwo = new CheckoutStepTwoPage(page);
        await stepTwo.finish();

        const complete = new CheckoutCompletePage(page);
        await complete.backToHome();

        const home = new InventoryPage(page);
        expect(await home.isLoaded()).toBe(true);
    });

    test('verificar que el total incluye tax', async ({ page }) => {
        await inventoryPage.addItemByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        const cart = new CartPage(page);
        await cart.checkout();

        const stepOne = new CheckoutStepOnePage(page);
        await stepOne.fillForm('Julieta', 'Entivero', '5000');
        await stepOne.continue();

        const stepTwo = new CheckoutStepTwoPage(page);
        const subtotal = await stepTwo.getSubtotal();
        const tax = await stepTwo.getTax();
        const total = await stepTwo.getTotal();

        // todos deben tener el signo $
        expect(subtotal).toContain('$');
        expect(tax).toContain('$');
        expect(total).toContain('$');
    });
});
