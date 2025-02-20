import { test, Browser, Page, BrowserContext } from "@playwright/test";
import { HomePage } from "./javasystemDestnation/destination";

test.describe('Home Page Tests', () => {
    test.setTimeout(100000000);
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let homePage: HomePage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
    });

    test("Navigate to SAP Home page", async () => {
        test.setTimeout(100000000);
        await homePage.loginUrl();
        await homePage.logincredentials();
        await homePage.homepageVerifiction();
        await homePage.searchDestnation();
        await homePage.destination();
        await homePage.clickCreateDestination();
    });

    test.afterAll(async () => {
        await page.close();
    });
});