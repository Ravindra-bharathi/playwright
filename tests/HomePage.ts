import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.pringles.com/centraleurope/en/home.html');
    }

    async acceptCookies() {
        await this.page.getByRole('button', { name: 'Accept Cookies' }).click();
    }

    async search(query: string) {
        await this.page.getByLabel('Click to search').click();
        const searchBox = this.page.getByPlaceholder('Search', { exact: true });
        await searchBox.click();
        await searchBox.fill(query);
    }

    async clearSearch() {
        const searchBox = this.page.getByPlaceholder('Search', { exact: true });
        await searchBox.click();
        await searchBox.fill('');
    }

    async clickParagraph() {
        await this.page.getByRole('contentinfo').getByRole('paragraph').nth(1).click();
    }

    async navigateToContactUs() {
        await this.page.getByRole('navigation').getByRole('link', { name: 'Contact Us' }).click();
    }

    async navigateToOurBrand() {
        await this.page.getByRole('link', { name: 'Our brand' }).click();
    }
}
