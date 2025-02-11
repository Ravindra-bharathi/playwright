import { test, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { HomePage } from "./pages/leggo";
import { url } from "./pages/leggoVariable";

test.describe('Home Page Tests', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let homePage: HomePage;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false, args: ['--safebrowsing-disable-download-protection'] });
        context = await browser.newContext();
        await context.grantPermissions(['geolocation'], { origin: url });
        page = await context.newPage();
        homePage = new HomePage(page);
    });

    test("Navigate to the Home Page and Accept Cookies", async () => {
        test.setTimeout(80000);
        await homePage.homepageNavigate();
        await homePage.homepageTitle();
    });

    test("Home Page Navigation & Verification", async () => {
        test.setTimeout(80000);

    });

    test("Our Food Page Navigation", async () => {
        test.setTimeout(80000);

    });

    test.afterAll(async () => {
        await browser.close();
    });
});
