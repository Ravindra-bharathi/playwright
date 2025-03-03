import { test, Page, selectors } from '@playwright/test';
import { City, company, email, firstName, lastName, password, phone, product, salutation, url, username } from './leadCreationVariable';

test.describe(() => {
    test.setTimeout(800000);
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test("Navigate to salesforce ", async () => {
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
        await page.getByRole('button', { name: 'New' }).click();
        await page.waitForTimeout(2000);
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
        await page.getByLabel('Available').getByText(product).click();
        await page.getByRole('button', { name: 'Move to Chosen Move selection' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('combobox', { name: 'Quantity' }).click();
        await page.waitForTimeout(2000);
        await page.getByLabel('New Lead').getByText('1KG').click();
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: 'Title' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: 'City' }).click();
        await page.getByRole('textbox', { name: 'City' }).fill(City);
        await page.waitForTimeout(2000);
        await page.locator('records-record-layout-item').filter({ hasText: 'Website' }).locator('span').click();
        await page.waitForTimeout(2000);
        await page.getByText('Chosen', { exact: true }).click();
        await page.getByRole('button', { name: 'Save', exact: true }).click();
        console.log(`**gbStart**leadCreationName**splitKeyValue**${firstName}**gbEnd**`);
    });
});