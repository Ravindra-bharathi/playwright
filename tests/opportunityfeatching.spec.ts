import { test, Page, expect } from '@playwright/test';
import { email, firstName, lastName, password, phone, products, quantity, stage, url, username } from './productsVariables';

test.describe(() => {
    test.setTimeout(800000);
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test("Navigate_to_Lead_floating_opportunity", async () => {
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
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(5000);
            await page.getByRole('button', { name: 'Select a List View:' }).click();
            await page.waitForTimeout(1000);
            await page.getByRole('option', { name: 'All Opportunities' }).locator('span').nth(1).click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(5000);
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
            const tableLocator = page.locator('#brandBand_1 > div > div > div > div > lst-object-home > div > lst-list-view-manager > lst-common-list-internal > div > div > lst-primary-display-manager > div > lst-primary-display > lst-primary-display-grid > lightning-datatable > div.dt-outer-container > div > div > table'); // Adjust the selector as needed

            const rows = await tableLocator.locator('tr').all();

            let tableData: string[][] = [];

            for (const row of rows) {
                const cells = await row.locator('td, th').all();

                const rowData = await Promise.all(cells.map(async (cell) => {
                    return await cell.evaluate((node) => {
                        return node.innerText
                            .replace(/\bSort by:\b[\s\S]*Show .* column actions/g, '')
                            .replace(/\bShow Actions\b/, '')
                            .trim();
                    });
                }));

                const filteredRowData = rowData.filter(text => text !== "");
                if (filteredRowData.length > 1) {
                    tableData.push(filteredRowData);
                }
            }

            for (const row of tableData.slice(1)) {
                const leadName = row[1];
                const leadStatus = row[3];

                const leads = `Opportunity Name: ${leadName}, email id: ${leadStatus}`;
                console.log(`**gbStart**leadsandstatus**splitKeyValue**${leads}**gbEnd**`);
            }

        }
        catch (error) {
            console.log(error)
        }
    })
});