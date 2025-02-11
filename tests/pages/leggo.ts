import { expect, Page } from "@playwright/test";
import { url } from "./leggoVariable";

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async homepageNavigate() {
        await this.page.goto(url, { timeout: 90000 });
        await this.page.waitForTimeout(5000);
    }
    async homepageTitle() {
        // await this.page.getByRole('link', { name: 'Waffles', exact: true }).click();
        // await this.page.locator('#skip-main-content').getByRole('img', { name: 'Eggo waffles on a plate' }).click();
        // await this.page.getByText('Eggo® Frozen Toaster Waffle Flavors Mornings are hard. Eggo® waffles are a').click();
        // await this.page.getByText('Managing morning chaos is a').click();
        // await this.page.getByText('Craving the taste of homemade').click();
        // await this.page.getByText('Treat yourself and your kids').click();
        // await this.page.getByText('Looking for a light and').click();
        // await this.page.getByText('Inspired by the on-the-go').click();
        // await this.page.getByText('Eggo® frozen waffles are the').click();
        // await this.page.getByRole('link', { name: 'Waffles', exact: true }).click();
        // await this.page.locator('#skip-main-content').getByRole('img', { name: 'Eggo waffles on a plate' }).click();
        // await this.page.getByText('Eggo® Frozen Toaster Waffle Flavors Mornings are hard. Eggo® waffles are a').click();
        // await this.page.getByText('Managing morning chaos is a').click();
        // await this.page.getByText('Craving the taste of homemade').click();
        // await this.page.getByText('Treat yourself and your kids').click();
        // await this.page.getByText('Looking for a light and').click();
        // await this.page.getByText('Inspired by the on-the-go').click();
        // await this.page.getByText('Eggo® frozen waffles are the').click();
        // await this.page.getByRole('link', { name: 'Kellogg\'s® Eggo® Homestyle' }).click();
        // await this.page.getByText('Eggo® Frozen Classic Waffles Kellogg\'s® Eggo® Homestyle Waffles Kellogg\'s® Eggo').click();
        // await this.page.getByText('America’s classic Eggo®').click();
        // await this.page.getByRole('button', { name: '4.1 out of 5 stars, average' }).click();
        // await this.page.getByRole('img', { name: 'Kellogg\'s® Eggo® Homestyle' }).click();
        // await this.page.locator('section').filter({ hasText: 'Savor the irresistible' }).locator('div').nth(1).click();
        // await this.page.getByText('Savor the irresistible').click();
        // await this.page.getByText('Feel good about choosing a').click();
        // await this.page.getByText('Enjoy a quick and easy family').click();
        // await this.page.getByRole('heading', { name: 'Nutrition' }).click();
        // await this.page.getByText('Ingredients: Enriched flour (').click();
        // await this.page.getByText('Ingredients Ingredients:').click();
        // await this.page.getByText('For full nutrition').click();
        // await this.page.locator('section').filter({ hasText: 'Nutrition Based on pack size' }).locator('div').nth(4).click();
        // await this.page.locator('section').filter({ hasText: 'Nutrition Based on pack size' }).click();
        // await this.page.getByText('483 out of 599 (81%)').click();
        // await this.page.getByRole('heading', { name: 'Rating Snapshot' }).click();
        // await this.page.getByRole('heading', { name: 'Autism and Eggo' }).click();
        // await this.page.getByText('I usually buy 2 boxes of Eggo').click();
        // await this.page.getByRole('heading', { name: 'Bring back the old recipe!' }).click();
        // await this.page.getByText('I have been eating the').click();
        // await this.page.getByRole('button', { name: 'See CassDV profile. This' }).click();
        // await this.page.getByRole('button', { name: 'Close' }).click();
        // await this.page.goto('https://www.leggowitheggo.com/en_US/products/waffles.html');
        // await this.page.getByRole('link', { name: 'Kellogg\'s® Eggo® Buttermilk' }).click();
        // await this.page.getByText('Rise and shine with this').click();
        // await this.page.getByRole('heading', { name: 'Kellogg\'s® Eggo® Buttermilk' }).click();
        // await this.page.locator('section').filter({ hasText: 'Nutrition Based on pack size' }).click();
        // await this.page.getByRole('heading', { name: 'Nutrition' }).click();
        // await this.page.getByRole('heading', { name: 'Ingredients' }).click();
        // await this.page.locator('section').filter({ hasText: 'Nutrition Based on pack size' }).locator('div').nth(4).click();
        // await this.page.locator('div').filter({ hasText: /^Reviews$/ }).click();
        // await this.page.getByRole('heading', { name: 'Rating Snapshot' }).click();
        // await this.page.getByText('Select a row below to filter').click();
        // await this.page.getByText('Rating SnapshotSelect a row').click();
        // await this.page.getByRole('heading', { name: 'almost as good as homemade' }).click();
        // await this.page.getByText('I\'ve been a lover of these').click();
        // await this.page.getByText('They are the same old great').click();
        // await this.page.getByText('On sale and kids love them.').click();
        // await this.page.getByText('Very tasty I don’t need 49').click();
        // await this.page.getByText('I wanted a quick, easy').click();
        // await this.page.goto('https://www.leggowitheggo.com/en_US/products/waffles.html');
        // await this.page.getByRole('link', { name: 'Kellogg\'s® Eggo® Blueberry' }).click();
        // await this.page.getByRole('img', { name: 'Kellogg\'s® Eggo® Blueberry' }).click();
        // await this.page.getByRole('heading', { name: 'Kellogg\'s® Eggo® Blueberry' }).click();
        // await this.page.getByText('Wake up to the classic berry').click();
        // await this.page.locator('section').filter({ hasText: 'Satisfy your craving for a' }).locator('div').nth(1).click();
        // await this.page.getByText('Satisfy your craving for a').click();
        // await this.page.getByText('Feel good about choosing a').click();
        // await this.page.getByText('Enjoy a quick and easy family').click();
        // await this.page.locator('section').filter({ hasText: 'Satisfy your craving for a' }).locator('div').nth(1).click();
        // await this.page.locator('section').filter({ hasText: 'Nutrition Based on pack size' }).click();
        // await this.page.getByRole('heading', { name: 'Nutrition' }).click();
        // await this.page.getByText('Ingredients Ingredients:').click();
        // await this.page.getByText('Ingredients: Enriched flour (').click();
        // await this.page.getByText('For full nutrition').click();
        // await this.page.locator('section').filter({ hasText: 'Nutrition Based on pack size' }).locator('div').nth(4).click();
        // await this.page.locator('div').filter({ hasText: /^emma4 years ago$/ }).first().click();
        // await this.page.getByRole('link', { name: 'Eggo® Frozen Classic Waffles' }).click();
        // await this.page.getByRole('link', { name: 'Kellogg\'s® Eggo® Blueberry' }).click();
        // await this.page.getByRole('img', { name: 'Kellogg\'s® Eggo® Blueberry' }).click();
        // await this.page.getByRole('heading', { name: 'Kellogg\'s® Eggo® Blueberry' }).click();
        // await this.page.getByText('Wake up to the classic berry').click();
        // await this.page.locator('section').filter({ hasText: 'Satisfy your craving for a' }).locator('div').nth(1).click();
        // await this.page.locator('section').filter({ hasText: 'Nutrition Based on pack size' }).click();
        // await this.page.getByRole('heading', { name: 'Nutrition' }).click();
        // await this.page.getByRole('heading', { name: 'Ingredients' }).click();
        // await this.page.getByRole('img', { name: 'Smart label image' }).click();
        // await this.page.getByText('For full nutrition').click();
        // await this.page.getByText('263 out of 276 (95%)').click();
        // await this.page.getByText('263 out of 276 (95%)').click();
        // await this.page.getByRole('heading', { name: 'makes for an amazing sandwich' }).click();
        // await this.page.getByText('i bought this product with').click();
        // await this.page.goto('https://www.leggowitheggo.com/en_US/products/waffles/classic.html');
        // await this.page.getByRole('link', { name: 'Kellogg\'s® Eggo® Strawberry' }).click();
        // await this.page.getByRole('img', { name: 'Kellogg\'s® Eggo® Strawberry' }).click();
        // await this.page.getByRole('heading', { name: 'Kellogg\'s® Eggo® Strawberry' }).click();
        // await this.page.getByText('Make it a berry good morning').click();
        // await this.page.getByText('Ingredients: Enriched flour (').click();
        // await this.page.getByText('Ingredients Ingredients:').click();
        // await this.page.locator('section').filter({ hasText: 'Nutrition Based on pack size' }).locator('div').nth(4).click();
        // await this.page.getByRole('heading', { name: 'Rating Snapshot' }).click();
        // await this.page.getByRole('heading', { name: 'Tastes good but, what' }).click();
        // await this.page.getByText('I bought these for myself and').click();
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('link', { name: 'check where to buy' }).click();
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('heading', { name: 'Shop Kellogg\'s® Eggo® Thick' }).click();
        await this.page.getByRole('button', { name: 'Close the shop now shopping' }).click();


        await this.page.waitForTimeout(5000);
    }
}