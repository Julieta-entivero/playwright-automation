const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CREDENTIALS } = require('../utils/testHelper');

test.describe('Login - SHOP-101', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('login exitoso con standard_user', async ({ page }) => {
        await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
        const inventory = new InventoryPage(page);
        expect(await inventory.isLoaded()).toBe(true);
    });

    test('login con usuario incorrecto', async () => {
        await loginPage.login('usuario_falso', CREDENTIALS.standard.password);
        expect(await loginPage.isErrorVisible()).toBe(true);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('do not match');
    });

    test('login con password incorrecta', async () => {
        await loginPage.login(CREDENTIALS.standard.username, 'clave_mal');
        expect(await loginPage.isErrorVisible()).toBe(true);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('do not match');
    });

    test('login sin usuario muestra error', async () => {
        await loginPage.login('', CREDENTIALS.standard.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username is required');
    });

    test('login sin password muestra error', async () => {
        await loginPage.login(CREDENTIALS.standard.username, '');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Password is required');
    });

    test('login con usuario bloqueado - SHOP-102', async () => {
        await loginPage.login(CREDENTIALS.locked.username, CREDENTIALS.locked.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('locked out');
    });
});
