import { test, Page } from "@playwright/test";
import { HomePage } from "./javasystemCreateUser/createuser";

test.describe(() => {
    test.setTimeout(100000000);
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
        await homePage.createUser();

    });

    test.afterAll(async () => {
        await page.close();
    });
});