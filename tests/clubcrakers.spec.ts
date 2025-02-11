import { test, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { HomePage } from "./pages/homepageClub";
import { url } from "./pages/clubCrackersVariable";

test.describe('Home Page Tests', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let homePage: HomePage;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        await context.grantPermissions(['geolocation'], { origin: url });
        page = await context.newPage();
        homePage = new HomePage(page);
    });

    test("Navigate to the Home Page and Accept Cookies", async () => {
        test.setTimeout(800000);
        await homePage.homepageNavigate();
        await homePage.accpectCookies();
    });

    test("Navigate to the home page verfication", async () => {
        test.setTimeout(800000);
        await homePage.homepageVerification();
        await homePage.headerOurfood();
        await homePage.headerOurFoodTitle();
        await homePage.headerRecipies();
        await homePage.headerRecipiesImg();
        await homePage.homepageNavigate();
        await homePage.whereToBuy();
        await homePage.homepageNavigate();
        await homePage.homepageContuctUs();
        await homePage.homepageNavigate();
        await homePage.homepageNextbutton();
        await homePage.homepageCard();
        await homePage.homepageNavigate();
        await homePage.homePagevideoCheck();
        await homePage.homePageImgPerfect();
        await homePage.homepageNavigate();
        await homePage.homepageCheckOutRecipes();
        await homePage.recipesHeadingCheck();
        await homePage.homepageNavigate();
        await homePage.homePageInsta();
        await homePage.homepageNavigate();
        await homePage.homePageTopbutton();
        await homePage.searchBar();
        await homePage.homepageNavigate();
        await homePage.footerlink();

    })
    test("ourFood link checking", async () => {
        test.setTimeout(8000000);
        await homePage.ourFood();
        await homePage.homepageNavigate();
        await homePage.cardRecipies();
    })

    test.afterAll(async () => {
        await browser.close();
    });
});
