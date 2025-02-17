import { test, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { HomePage } from "./view-users/view-users";

test.describe('Home Page Tests', () => {
    test.setTimeout(100000000);
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let homePage: HomePage;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        page = await context.newPage();
        homePage = new HomePage(page);

    });

    test("Navigate to SAP Home page", async () => {
        test.setTimeout(100000000);
        await homePage.loginUrl();
        await page.waitForTimeout(2000);
        await homePage.logincredentials();
        await page.waitForTimeout(2000);
        await homePage.homepageVerifiction();
        await page.waitForTimeout(2000);
        await homePage.searchUsers();
        await page.waitForTimeout(2000);
        await homePage.verificationSearch();
        await page.waitForTimeout(2000);
        await homePage.searchUser();

    });

    test.afterAll(async () => {
        await browser.close();
    });
});