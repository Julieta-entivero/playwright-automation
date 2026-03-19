class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingBtn = page.locator('#continue-shopping');
    }

    async getItemCount() {
        return await this.cartItems.count();
    }

    async getItemName(index) {
        return await this.cartItems.nth(index).locator('.inventory_item_name').textContent();
    }

    async getItemPrice(index) {
        return await this.cartItems.nth(index).locator('.inventory_item_price').textContent();
    }

    async removeItem(index) {
        await this.cartItems.nth(index).locator('button[id^="remove"]').click();
    }

    async removeItemByName(name) {
        const item = this.cartItems.filter({ hasText: name });
        await item.locator('button[id^="remove"]').click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingBtn.click();
    }
}

module.exports = { CartPage };
