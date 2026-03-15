class ItemDetailPage {
    constructor(page) {
        this.page = page;
        this.itemName = page.locator('.inventory_details_name');
        this.itemDesc = page.locator('.inventory_details_desc');
        this.itemPrice = page.locator('.inventory_details_price');
        this.addToCartBtn = page.locator('button[id^="add-to-cart"]');
        this.removeBtn = page.locator('button[id^="remove"]');
        this.backButton = page.locator('#back-to-products');
    }

    async getName() {
        return await this.itemName.textContent();
    }

    async getDescription() {
        return await this.itemDesc.textContent();
    }

    async getPrice() {
        return await this.itemPrice.textContent();
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }

    async removeFromCart() {
        await this.removeBtn.click();
    }

    async goBack() {
        await this.backButton.click();
    }
}

module.exports = { ItemDetailPage };
