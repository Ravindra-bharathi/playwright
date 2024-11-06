import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  const pageTitle = await page.title();
  console.log(pageTitle);
  await expect(page).toHaveTitle("STORE");
  await page.close();
});
