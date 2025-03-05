import { test, expect } from '@playwright/test';
import { City, company, email, firstName, lastName, password, phone, product, salutation, url, username } from './leadCreationVariable';

test("Navigate to Salesforce and Create a Lead", async ({ page }) => {
    try {
        await page.goto(url);
        await page.getByRole('textbox', { name: 'Username' }).fill(username);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('button', { name: 'App Launcher' }).click();
        await page.getByRole('option', { name: 'Sales', exact: true }).click();
        await page.getByRole('link', { name: 'Leads' }).click();
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('combobox', { name: 'Salutation' }).click();
        await page.getByText(salutation).click();
        await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
        await page.getByRole('textbox', { name: '*Last Name' }).fill(lastName);
        await page.getByRole('textbox', { name: '*Company' }).fill(company);
        await page.getByRole('textbox', { name: 'Phone' }).fill(phone);
        await page.getByRole('textbox', { name: 'Email' }).fill(email);
        await page.getByLabel('Available').getByText(product).click();
        await page.getByLabel('*Product').getByRole('button', { name: 'Move to Chosen Move selection' }).click();
        await page.getByRole('combobox', { name: 'Quantity' }).click();
        await page.getByLabel('New Lead').getByText('1KG').click();
        await page.getByRole('textbox', { name: 'City' }).fill(City);
        await page.getByRole('button', { name: 'Save', exact: true }).click();
        console.log(`**gbStart**leadCreationName**splitKeyValue**${firstName} ${lastName}**gbEnd**`);
    } catch (error) {
        console.error('Test failed:', error);
    }
});
