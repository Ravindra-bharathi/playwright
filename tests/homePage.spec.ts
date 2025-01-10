import { test, expect, chromium } from "@playwright/test";

test("has title", async () => {
  const browser = await chromium.launch({ headless: false });
  test.setTimeout(40000);
  const page = await browser.newPage();
  await page.goto("https://www.demoblaze.com/");
  const pageTitle = await page.title();
  console.log(pageTitle);
  await expect(page).toHaveTitle("STORE");
  await page.waitForTimeout(5000);
  await page.close();
});
