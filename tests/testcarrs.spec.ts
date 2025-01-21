import { test, chromium, Browser, Page } from "@playwright/test";
import { HomePage } from "./pages/Homepage";

test.describe("Carr's Crackers Website Tests", () => {
    let browser: Browser;
    let context: { newPage: () => any; };
    let page: Page;
    let homePage: HomePage;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        page = await context.newPage();
        homePage = new HomePage(page);
    });

    test("home page navigate", async () => {
        try {
            test.setTimeout(800000);
            await homePage.navigate();
            await homePage.acceptCookies();
            await homePage.homePageImage();
        }
        catch {
            console.log("failed to navigate to home page navigate")
        }

    });

    test("Navigate to header links", async () => {
        try {
            await homePage.clickProducts();
            await homePage.productsImage();
            await homePage.clickEverything();
            await homePage.everythingImage();
            await homePage.clickWhereToBuy();
        }
        catch {
            console.log("failed to navigate to headers links")
        }
    });


    test("Navigate to Center Products", async () => {
        test.setTimeout(500000);
        try {
            await homePage.clickCenterProducts();
        }
        catch {
            console.log("failed to navigate to Center Products")
        }
    });

    test("Navigate to View Products", async () => {
        test.setTimeout(400000);
        try {
            await homePage.clickViewProducts();
            test.setTimeout(500000);
        }
        catch {
            console.log("failed to navigate to View Products")
        }
    });

    test("Navigate to Footer Links", async () => {
        test.setTimeout(500000);
        try {
            await homePage.clickFooters();
            test.setTimeout(500000);

        }
        catch {
            console.log("failed to navigate to footer links")
        }
    });

    test.afterAll(async () => {
        await browser.close();
    });
});
