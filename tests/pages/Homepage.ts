import { Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto("https://www.carrscrackers.com/en_US/home.html", {
            timeout: 90000,
        });
    }

    async acceptCookies() {
        await this.page.getByRole("button", { name: "OK", exact: true }).click();
    }

    async clickProducts() {
        await this.page.getByRole("list").getByRole("link", { name: "Products" }).click();
        // await this.clickAllProducts();
    }

    async clickEverything() {
        await this.page.getByRole('link', { name: 'Everything\'s Better' }).click();
    }

    async clickWhereToBuy() {
        await this.navigate();
        await this.page.getByRole("link", { name: "Where To Buy", exact: true }).click();
        await this.page.goBack();
    }

    async clickCenterProducts() {
        await this.navigate();
        const products = [
            { text: 'Carrs Table Water Original New' },
            { text: 'Carrs Table Water Cracked' },
            { text: "Carr's Rosemary Crackers" }
        ];
        for (const product of products) {
            await this.page.getByRole('link', { name: product.text }).click();
            await this.page.waitForTimeout(1000);
            await this.page.goBack();
        }
    }

    async clickViewProducts() {
        await this.navigate();
        await this.page.getByRole('link', { name: 'VIEW ALL PRODUCTS' }).click();
        await this.page.waitForTimeout(1000);
        await this.clickAllProducts();
    }
    async clickAllProducts() {
        for (let i = 1; i <= 8; i++) {
            const selector = `div:nth-child(${i}) > .cta_1 > .cta_image > .kstl-image-wrapper > .track`;
            await this.page.locator(selector).click();
            await this.page.waitForTimeout(1000);
            await this.page.goBack();
        }
        await this.clickFooters()
    }
    async clickFooters() {
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('link', { name: 'Contact Us' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.goBack()
        await this.page.getByRole('contentinfo').getByRole('link', { name: 'Products' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.goBack()
        await this.page.waitForTimeout(2000);
        await this.page.getByRole("link", { name: "Where To Buy", exact: true }).click();
        await this.page.waitForTimeout(5000);
        await this.page.getByLabel('Close the shop now shopping').click();
        const page1Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('link', { name: 'Privacy Notice' }).click();
        const page1 = await page1Promise;
        await page1.getByRole('button', { name: 'Accept Cookies' }).click();
        await page1.close();
        const page2Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('link', { name: 'US Privacy' }).click();
        const page2 = await page2Promise;
        await this.page.getByText('Cookie Preferences', { exact: true }).click();
        await this.page.getByLabel('Close', { exact: true }).click();
        await page2.close();
        const page3Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('link', { name: 'Terms of Use' }).click();
        const page3 = await page3Promise;
        await page3.close()
        const page4Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('link', { name: 'Accessibility' }).click();
        const page4 = await page4Promise;
        await page4.close()
        const page5Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('link', { name: 'Your Privacy Choices' }).click();
        const page5 = await page5Promise;
        await this.page.getByRole('link', { name: 'Carrs brand logo link' }).click();
        await page5.close()
        await this.page.close()
    }
}