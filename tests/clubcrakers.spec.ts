import { test, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { HomePage } from "./pages/homepageClub";

test.describe('Home Page Tests', () => {

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

    test("Navigate to the Home Page and Accept Cookies", async () => {
        await homePage.homepageNavigate();
        await homePage.accpectCookies();
    });

    test("Navigate to the home page verfication", async () => {
        await homePage.homepageVerification();
        await homePage.headerOurfood();
        // await homePage.headerOurFoodTitle();
        await homePage.headerRecipies();
        await homePage.headerRecipiesImg();
        await homePage.homepageNavigate();
        await homePage.homepageNextbutton();
        await homePage.homepageCard();
    })

    test.afterAll(async () => {
        await browser.close();
    });
});
