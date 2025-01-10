import { test, chromium } from "@playwright/test";
import { HomePage } from "./pages/Homepage";

test.describe("Carr's Crackers Website Tests", () => {
    test("Basic Navigation Test", async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        const homePage = new HomePage(page);

        test.setTimeout(400000);
        await homePage.navigate();
        await homePage.acceptCookies();

        // Test navigation
        await homePage.clickProducts();
        await homePage.clickEverything();
        await homePage.clickWhereToBuy();
        await homePage.clickCenterProducts();
        await homePage.clickViewProducts();
        await homePage.clickFooters();
        // await homePage.();

    });
});