import { test, Page } from '@playwright/test';
import { City, company, email, firstName, lastName, password, phone, product, salutation, url, username } from './leadCreationVariable';

test.describe(() => {
    test.setTimeout(100000000);
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test("Navigate to Salesforce and Create a Lead", async ({ page }) => {
        test.setTimeout(800000);
        try {
            await page.goto(url);
            await page.waitForTimeout(5000);
            await page.getByRole('textbox', { name: 'Username' }).fill(username);
            await page.waitForTimeout(2000);
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
            await page.getByRole('button', { name: 'New' }).click();
            await page.waitForTimeout(2000);
            await page.getByRole('combobox', { name: 'Salutation' }).click();
            await page.getByText(salutation).click();
            await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
            await page.getByRole('textbox', { name: '*Last Name' }).fill(lastName);
            await page.waitForTimeout(2000);
            await page.getByRole('textbox', { name: '*Company' }).fill(company);
            await page.waitForTimeout(2000);
            await page.getByRole('textbox', { name: 'Phone' }).fill(phone);
            await page.waitForTimeout(2000);
            await page.getByRole('textbox', { name: 'Email' }).fill(email);
            await page.waitForTimeout(2000);
            await page.getByLabel('Available').getByText(product).click();
            await page.getByLabel('*Product').getByRole('button', { name: 'Move to Chosen Move selection' }).click();
            await page.waitForTimeout(2000);
            await page.getByRole('combobox', { name: 'Quantity' }).click();
            await page.waitForTimeout(2000);
            await page.getByLabel('New Lead').getByText('1KG').click();
            await page.waitForTimeout(2000);
            await page.getByRole('textbox', { name: 'City' }).fill(City);
            await page.waitForTimeout(2000);
            await page.getByRole('button', { name: 'Save', exact: true }).click();
            await page.waitForTimeout(5000);
            console.log(`**gbStart**leadCreationName**splitKeyValue**${firstName} ${lastName}**gbEnd**`);
        } catch (error) {
            console.error('Test failed:', error);
        }
    });
});
