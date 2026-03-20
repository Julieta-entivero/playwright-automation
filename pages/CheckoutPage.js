class CheckoutStepOnePage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.zipInput = page.locator('#postal-code');
        this.continueBtn = page.locator('#continue');
        this.cancelBtn = page.locator('#cancel');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillForm(firstName, lastName, zip) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipInput.fill(zip);
    }

    async continue() {
        await this.continueBtn.click();
    }

    async cancel() {
        await this.cancelBtn.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async isErrorVisible() {
        return await this.errorMessage.isVisible();
    }
}

class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;
        this.subtotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishBtn = page.locator('#finish');
        this.cancelBtn = page.locator('#cancel');
    }

    async getSubtotal() {
        return await this.subtotal.textContent();
    }

    async getTax() {
        return await this.tax.textContent();
    }

    async getTotal() {
        return await this.total.textContent();
    }

    async finish() {
        await this.finishBtn.click();
    }

    async cancel() {
        await this.cancelBtn.click();
    }
}

class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.successHeader = page.locator('.complete-header');
        this.successText = page.locator('.complete-text');
        this.backHomeBtn = page.locator('#back-to-products');
    }

    async getSuccessHeader() {
        return await this.successHeader.textContent();
    }

    async isOrderComplete() {
        return await this.successHeader.isVisible();
    }

    async backToHome() {
        await this.backHomeBtn.click();
    }
}

module.exports = { CheckoutStepOnePage, CheckoutStepTwoPage, CheckoutCompletePage };
