import { test, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { HomePage } from "./pages/javasystem";

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
        // await homePage.loginUrl();
        // await homePage.logincredentials();
        // await homePage.homepageVerifiction();
        // await homePage.search();
        // // await homePage.systemInfo();
        // // await homePage.componentInfo();
        // await homePage.downloadExcel();
        await homePage.openExcelInBrowser()

    });



    test.afterAll(async () => {
        await browser.close();
    });
});