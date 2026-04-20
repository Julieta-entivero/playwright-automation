const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { loginAsStandardUser } = require('../utils/testHelper');

test.describe('Logout - SHOP-501', () => {

    test('logout redirige al login', async ({ page }) => {
        await loginAsStandardUser(page);
        const inventory = new InventoryPage(page);
        await inventory.logout();

        const loginPage = new LoginPage(page);
        expect(await loginPage.isLoginButtonVisible()).toBe(true);
    });

    test('url despues del logout no contiene inventory', async ({ page }) => {
        await loginAsStandardUser(page);
        const inventory = new InventoryPage(page);
        await inventory.logout();

        expect(page.url()).not.toContain('/inventory.html');
    });
});
