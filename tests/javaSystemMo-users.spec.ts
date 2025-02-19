import { test, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { HomePage } from "./modify-users/modify-users";

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
        await homePage.searchUsers();
        await homePage.verificationSearch();
        await homePage.ModifyUser();

    });

    test.afterAll(async () => {
        await page.close();
    });
});