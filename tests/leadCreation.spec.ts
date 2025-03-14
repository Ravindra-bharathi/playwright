import { test, Page, selectors, expect } from '@playwright/test';
import { company, email, firstName, lastName, password, phone, products, Quantitys, salutation, url, username } from './leadCreationVariable';

test.describe(() => {
    test.setTimeout(800000);
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test("Navigate to salesforce ", async ({ browser }) => {
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
        await page.waitForTimeout(10000);
        await page.getByRole('button', { name: 'App Launcher' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('option', { name: 'Sales', exact: true }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('link', { name: 'Leads' }).click();
        await page.getByRole('button', { name: 'New' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('combobox', { name: 'Salutation' }).click();
        await page.getByText(salutation).click();
        await page.getByRole('textbox', { name: 'First Name' }).click();
        await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
        await page.getByRole('textbox', { name: '*Last Name' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: '*Last Name' }).fill(lastName);
        await page.getByRole('textbox', { name: '*Company' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: '*Company' }).fill(company);
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: 'Phone' }).click();
        await page.getByRole('textbox', { name: 'Phone' }).fill(phone);
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(email);
        await page.waitForTimeout(2000);
        for (const product of products) {
            await page.getByLabel('Available').getByText(product).click();
            await page.getByLabel('*Product').getByRole('button', { name: 'Move to Chosen Move selection' }).click();
            await page.waitForTimeout(2000);

        }
        for (const Quantity of Quantitys) {
            await page.getByText(Quantity).click();
            await page.getByLabel('Quantity').getByRole('button', { name: 'Move to Chosen Move selection' }).click();
            await page.waitForTimeout(2000);
        }

        await page.getByRole('button', { name: 'Save', exact: true }).click();
        expect(page.getByRole('heading', { name: `Lead ${salutation} ${firstName} ${lastName}` }).locator('slot').nth(1));
        console.log(`**gbStart**leadCreationName**splitKeyValue**${firstName}${lastName}**gbEnd**`)
    });
});