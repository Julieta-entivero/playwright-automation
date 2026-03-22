const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { loginAsStandardUser } = require('../utils/testHelper');

test.describe('Logout - SHOP-501', () => {

    test('logout redirige al login', async ({ page }) => {
        await loginAsStandardUser(page);
        const inventory = new InventoryPage(page);
        await inventory.logout();

        // deberia estar en el login
        const loginPage = new LoginPage(page);
        await expect(page.locator('#login-button')).toBeVisible();
    });

    test('url despues del logout es la correcta', async ({ page }) => {
        await loginAsStandardUser(page);
        const inventory = new InventoryPage(page);
        await inventory.logout();

        expect(page.url()).toContain('saucedemo.com');
    });
});
