import { test, Page, expect } from '@playwright/test';
import { name, password, productName, Quantity, QuoteName, url, username } from './quotationVariable';


test.describe(() => {
    test.setTimeout(800000);
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test("Navigate to opportunity page", async () => {
        test.setTimeout(800000);
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
        await page.getByRole('link', { name: 'Opportunities' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('link', { name: name }).click();
        await page.getByRole('tab', { name: 'Related' }).click();
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        const newQuote = page.getByRole('button', { name: 'New Quote' });
        await newQuote.click();
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: '*Quote Name' }).click();
        await page.getByRole('textbox', { name: '*Quote Name' }).fill(QuoteName);
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Save' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('gridcell', { name: QuoteName }).getByRole('link').nth(0).click();
        await page.getByRole('button', { name: 'Add Products' }).click();
        const search = page.getByRole('combobox', { name: 'Search <Entity> Search <' });
        await search.click();
        await search.fill(productName);
        await search.press('Enter');

        await search.click();

        await page.waitForSelector('[role="option"]', { timeout: 3000 }).catch(() => {
            console.log('Error: No options appeared after search.');
            return;
        });
        const option = page.getByRole('option', { name: new RegExp(`${productName} \\d+`, 'i') });
        await option.click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Edit Quantity: Item null' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: 'Quantity *' }).fill(Quantity);
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByRole('link', { name: productName })).toBeVisible();
        const product = page.getByRole('link', { name: productName })
        if (await product.isVisible()) {
            const value = ' is add in the new quote'
            console.log(`**gbStart**product is added **splitKeyValue**${productName}${value}**gbEnd**`);
        }
    });
});

