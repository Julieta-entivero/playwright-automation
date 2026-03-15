class InventoryPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('.product_sort_container');
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async isLoaded() {
        await this.title.waitFor();
        const text = await this.title.textContent();
        return text === 'Products';
    }

    async getItemCount() {
        return await this.inventoryItems.count();
    }

    async addItemByName(productName) {
        const item = this.inventoryItems.filter({ hasText: productName });
        await item.locator('button[id^="add-to-cart"]').click();
    }

    async removeItemByName(productName) {
        const item = this.inventoryItems.filter({ hasText: productName });
        await item.locator('button[id^="remove"]').click();
    }

    async getCartBadgeCount() {
        try {
            const text = await this.cartBadge.textContent();
            return text;
        } catch {
            return '0';
        }
    }

    async isCartBadgeVisible() {
        return await this.cartBadge.isVisible();
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async sortBy(option) {
        await this.sortDropdown.selectOption({ label: option });
    }

    async getAllItemNames() {
        const names = [];
        const count = await this.inventoryItems.count();
        for (let i = 0; i < count; i++) {
            const name = await this.inventoryItems.nth(i).locator('.inventory_item_name').textContent();
            names.push(name);
        }
        return names;
    }

    async getAllPrices() {
        const prices = [];
        const count = await this.inventoryItems.count();
        for (let i = 0; i < count; i++) {
            const priceText = await this.inventoryItems.nth(i).locator('.inventory_item_price').textContent();
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }

    async clickItemByName(productName) {
        const item = this.inventoryItems.filter({ hasText: productName });
        await item.locator('.inventory_item_name').click();
    }

    async getItemPrice(productName) {
        const item = this.inventoryItems.filter({ hasText: productName });
        const priceText = await item.locator('.inventory_item_price').textContent();
        return parseFloat(priceText.replace('$', ''));
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
}

module.exports = { InventoryPage };
