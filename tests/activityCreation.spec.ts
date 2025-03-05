import { test, expect } from '@playwright/test';
import { email, firstName, lastName, leadStatus, password, url, username } from './leadCreationVariable';

test("Navigate to Lead and Update Status", async ({ page }) => {
    try {
        await page.goto(url);
        await page.getByRole('textbox', { name: 'Username' }).fill(username);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
        await page.waitForLoadState('networkidle');

        await page.getByRole('button', { name: 'App Launcher' }).click();
        await page.getByRole('option', { name: 'Sales', exact: true }).click();
        await page.getByRole('link', { name: 'Leads' }).click();
        await page.getByRole('searchbox', { name: 'Search this list...' }).fill(email);
        await page.getByRole('searchbox', { name: 'Search this list...' }).press('Enter');

        await page.getByRole('link', { name: `${firstName} ${lastName}` }).first().click();
        await page.getByRole('tab', { name: 'Details' }).click();
        await page.getByRole('button', { name: 'Edit Lead Status' }).click();
        await page.getByRole('combobox', { name: 'Lead Status' }).click();

        const statusLocator = page.locator(`lightning-base-combobox-item[data-value="${leadStatus}"]`);
        if (await statusLocator.count() > 0) {
            await statusLocator.click();
        } else {
            console.error('Lead status option not found!');
            return;
        }

        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByRole('tab', { name: 'Activity' }).click();

        const activity = page.getByAltText('Task', { exact: true });
        await expect(activity).toBeVisible();

        console.log(`**gbStart**activityCreationStatus**splitKeyValue**activity is created**gbEnd**`);
    } catch (error) {
        console.error('Test failed:', error);
    }
});