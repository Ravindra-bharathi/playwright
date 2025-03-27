import { test, Page, expect } from '@playwright/test';
import { email, firstName, lastName, password, phone, url, username } from './activityFloating';

test.describe(() => {
    test.setTimeout(800000);
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test("Navigate_to_Lead_floating", async ({ browser }) => {
        test.setTimeout(800000);
        let page: Page;
        page = await browser.newPage();
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
            await page.getByRole('link', { name: 'Leads' }).click();
            await page.waitForTimeout(2000);

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

            const status = page.getByText('Open').nth(1);
            console.log(await status.isVisible());
            if (await status.isVisible()) {
                const leadStatus = 'The Lead status is open '
                console.log(`**gbStart**leadStatus**splitKeyValue**${leadStatus}**gbEnd**`);
                await page.getByRole('link', { name: `${firstName} ${lastName}` }).first().click();
                await page.waitForTimeout(2000);
                await page.getByRole('tab', { name: 'Details' }).click();
                await page.waitForTimeout(2000);
                await page.getByRole('button', { name: 'Edit Lead Status' }).click();
                await page.waitForTimeout(2000);
                await page.getByRole('combobox', { name: 'Lead Status' }).click();
                await page.getByRole('option', { name: 'Contacted' }).nth(1).click();
                await page.getByRole('textbox', { name: '*Comments' }).click();
                await page.getByRole('textbox', { name: '*Comments' }).fill('contacted');
                await page.getByRole('button', { name: 'Save' }).click();
                await page.waitForTimeout(5000);
                await page.locator('div').filter({ hasText: /^ContactedContacted$/ }).locator('a').click();
                await page.waitForTimeout(5000);
                await expect(page.getByLabel('Highlights panel header').getByText('Contacted')).toBeVisible();
                await page.goBack();
                await page.waitForTimeout(5000);
                await page.getByRole('button', { name: 'Edit Lead Status' }).click();
                await page.getByRole('combobox', { name: 'Lead Status' }).click();
                await page.getByRole('option', { name: 'Qualified', exact: true }).locator('span').nth(1).click();
                await page.getByRole('textbox', { name: '*Comments' }).click();
                await page.getByRole('textbox', { name: '*Comments' }).fill('Qualified');
                await page.waitForTimeout(2000);
                await page.getByRole('button', { name: 'Save' }).click();
                await page.waitForTimeout(5000);
                const activity = page.getByText('You have an upcoming task', { exact: true }).first();
                if (await activity.isVisible()) {
                    const activityCreationStatus = "An activity has been created for the both contacted and qualified"
                    console.log(`**gbStart**activityCreationStatus**splitKeyValue**${activityCreationStatus}**gbEnd**`);
                }
                await page.locator('div').filter({ hasText: /^QualifiedQualified$/ }).locator('a').click();
                await page.waitForTimeout(2000);
                await page.getByRole('heading', { name: 'Task Qualified' }).locator('span').click();
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
                if (firstName) {
                    await page.getByRole('searchbox', { name: 'Search this list...' }).fill(firstName);
                    await page.getByRole('searchbox', { name: 'Search this list...' }).press('Enter');
                    await page.waitForTimeout(2000);
                }

                await page.getByRole('link', { name: `${firstName}${lastName}` }).first().click();
                await page.waitForTimeout(2000);
                // if (!email.startsWith('$')) {
                //     await expect(page.getByRole('link', { name: `${email}` })).toBeVisible();
                // }
                // if (!phone.startsWith('$')) {
                //     await expect(page.getByRole('link', { name: `${phone}` })).toBeVisible();
                // }
                const Opportunitie = page.getByRole('heading', { name: `Opportunity ${firstName}${lastName}` }).locator('div');
                if (await Opportunitie.isVisible()) {
                    const opportinuteCreationStatus = `Opportunity successfully created for ${firstName} ${lastName}`
                    console.log(`**gbStart**opportinuteCreationStatus**splitKeyValue**${opportinuteCreationStatus}**gbEnd**`);
                }
            }
            else {
                const leadStatus = 'The Lead status is already qualified Or Contacted '
                console.log(`**gbStart**leadStatus**splitKeyValue**${leadStatus}**gbEnd**`);
            }
        } catch (error) {
            console.error('Test failed:', error);
        }
    });
});