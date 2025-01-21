import { test, expect } from "@playwright/test"
import { endDate, statDate } from "./variable/variableForEmail";

test("has to login in uber app", async ({ page }) => {
    await page.goto("https://merchants.ubereats.com/manager/home");
    await expect(page).toHaveTitle(/Uber/);
    await page.getByPlaceholder('Enter phone number or email').click();
    await page.getByPlaceholder('Enter phone number or email').fill('lokeshkumar.k@basiscloudsolutions.com');
    await page.getByTestId('forward-button').click();
    await page.goto('https://merchants.ubereats.com/manager/home?start=2024-12-19&end=2024-12-25');
    const temp = page.getByText(`Today's summary`);
    await page.getByRole('link', { name: 'Receipt Orders' }).click();
    await expect(page).toHaveTitle(/Uber Eats Manager/)
    await page.locator('//*[@id="wrapper"]/div[1]/div[2]/div[2]/div[2]/div[2]/div[4]/div/div[1]/div/div').click();
    await page.getByText(statDate, { exact: true }).click();
    await page.getByText(endDate, { exact: true }).click();
    await page.getByRole('button', { name: 'Order issue Chevron down small' }).click();
    await page.locator('label').filter({ hasText: 'Inaccurate orders' }).locator('span').click();
    await page.locator('label').filter({ hasText: 'Orders with taste & quality' }).locator('span').click();
    await page.locator('label').filter({ hasText: 'Unfulfilled' }).locator('span').click();
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.getByText('Showing  result').click();
    await page.getByRole('cell', { name: 'Alert 2 items with quality issues', exact: true }).click();
    await page.getByLabel('this is an announcement banner').locator('div').filter({ hasText: 'The customer reported 2' }).nth(2).click();
    await page.getByLabel('Close').click();
    await page.getByRole('link', { name: 'Log Out' }).click();
});

// test("get started link", async ({ page }) => {
//     await page.goto("https://playwright.dev/");

//     // Click the get started link.
//     await page.getByRole("link", { name: "Get started" }).click();

//     // Expects page to have a heading with the name of Installation.
//     await expect(
//         page.getByRole("heading", { name: "Installation" })
//     ).toBeVisible();
// });
