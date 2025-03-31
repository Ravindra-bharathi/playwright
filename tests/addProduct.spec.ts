import { test, Page, expect } from '@playwright/test';
import { email, firstName, lastName, password, phone, Products, quantity, stage, url, username } from './activityFloating';

test.describe(() => {
    test.setTimeout(800000);
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test("Navigate_to_opprtunity_floating_products", async () => {
        test.setTimeout(800000);
        await page.goto(url);
        try {
            await page.goto(url);
            await page.waitForTimeout(5000);
            await page.getByRole('textbox', { name: 'Username' }).click();
            await page.getByRole('textbox', { name: 'Username' }).fill(username);
            await page.waitForTimeout(2000);
            await page.getByRole('textbox', { name: 'Password' }).click();
            await page.getByRole('textbox', { name: 'Password' }).fill(password);
            await page.waitForTimeout(2000);
            await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
            await page.waitForTimeout(10000);
            await page.getByRole('button', { name: 'App Launcher' }).click();
            await page.waitForTimeout(2000);
            await page.getByRole('option', { name: 'Sales', exact: true }).click();
            await page.waitForTimeout(2000);
            await page.getByRole('link', { name: 'Opportunities' }).click();
            if (email) {
                if (!email.startsWith('$')) {
                    await page.getByRole('searchbox', { name: 'Search this list...' }).fill(email);
                    await page.getByRole('searchbox', { name: 'Search this list...' }).press('Enter');
                    await page.waitForTimeout(2000);
                }
            }
            if (phone) {
                if (!phone.startsWith('$')) {
                    await page.getByRole('searchbox', { name: 'Search this list...' }).fill(phone);
                    await page.getByRole('searchbox', { name: 'Search this list...' }).press('Enter');
                    await page.waitForTimeout(2000);
                }
            }
            await page.getByRole('rowheader', { name: `${firstName}${lastName} Edit` }).getByRole('link').click();
            await page.getByRole('button', { name: 'Edit Stage' }).click();
            await page.getByRole('combobox', { name: 'Stage' }).click();
            await page.getByRole('option', { name: `${stage}` }).locator('span').nth(1).click();
            await page.getByRole('tab', { name: 'Products' }).click();
            await page.getByRole('button', { name: 'Add Products' }).click();
            await page.waitForTimeout(2000);
            await page.getByRole('combobox', { name: 'Search <Entity> Search <' }).click();
            await page.waitForTimeout(2000);
            await page.getByRole('combobox', { name: 'Search <Entity> Search <' }).fill(Products);
            await page.waitForTimeout(2000);
            await page.getByRole('combobox', { name: 'Search <Entity> Search <' }).press('ArrowDown');
            await page.waitForTimeout(2000);
            await page.getByRole('combobox', { name: 'Search <Entity> Search <' }).press('Enter');
            await page.waitForTimeout(2000);
            await page.getByRole('button', { name: 'Next' }).click();
            await page.getByRole('button', { name: 'Edit Quantity: Item null' }).click();
            await page.getByRole('textbox', { name: '*Quantity' }).fill(quantity);
            await page.getByRole('button', { name: 'Save' }).click();
            console.log(`**gbStart**productsUrl**splitKeyValue**${page.url()}**gbEnd**`);
        }
        catch (error) {
            console.log('error in login', error);
        }

    });
});