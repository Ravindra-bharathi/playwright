import { test, Page, expect } from '@playwright/test';
import { email, firstName, lastName, leadStatus, password, url, username } from './leadCreationVariable';

// test.describe(() => {
//     test.setTimeout(800000);
//     let page: Page;
//     test.beforeAll(async ({ browser }) => {
//         page = await browser.newPage();
//     });

test("Navigate to Lead ", async ({ browser }) => {
    test.setTimeout(800000);
    let page: Page;
    page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(5000);
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.waitForTimeout(2000);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('option', { name: 'Sales', exact: true }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: 'Leads' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('searchbox', { name: 'Search this list...' }).click();
    await page.getByRole('searchbox', { name: 'Search this list...' }).fill(email);
    await page.getByRole('searchbox', { name: 'Search this list...' }).press('Enter');
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: `${firstName} ${lastName}` }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('tab', { name: 'Details' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Edit Lead Status' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('combobox', { name: 'Lead Status' }).click();
    await page.waitForTimeout(2000);
    const statusLocator = page.locator(`lightning-base-combobox-item[data-value="${leadStatus}"]`);
    const isVisible = await statusLocator.isVisible();
    if (isVisible) {
        await statusLocator.click();
    } else {
        console.error('Element not found!');
    }
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('tab', { name: 'Activity' }).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('.timelineItem')).toBeVisible();
    await page.waitForTimeout(2000);
    await expect(page.getByAltText('Task', { exact: true })).toBeVisible();
    await page.waitForTimeout(2000);
    const activity = page.getByAltText('Task', { exact: true });
    await page.locator('a').filter({ hasText: '<p>"Follow-up: Call' }).click();
    await page.getByLabel('Highlights panel header').getByText('<p>"Follow-up: Call').click();
    await expect(page.getByLabel('Highlights panel header').getByText('<p>"Follow-up: Call')).toBeVisible();
    if (await activity.isVisible()) {
        const activityCreationStatus = "activity is created"
        console.log(`**gbStart**activityCreationStatus**splitKeyValue**${activityCreationStatus}**gbEnd**`);
    }
});
// });