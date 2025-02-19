import { test, Browser, Page, BrowserContext } from "@playwright/test";
import { viewUserHomePage } from "./view-users/view-users";

test.describe(() => {
    test.setTimeout(100000000);
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let homePage: viewUserHomePage;


    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new viewUserHomePage(page);

    });

    test("Navigate to SAP java system Home page", async () => {
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
});