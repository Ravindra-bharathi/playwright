import { test, Page, selectors, expect } from '@playwright/test';
import { company, email, firstName, lastName, obj, obj1, password, phone, product, salutation, url, username } from './floating_variable';

test.describe(() => {
    test.setTimeout(800000);
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test("Navigate_to_floating_salesforce", async () => {
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
        await page.getByRole('link', { name: 'Leads', exact: true }).click();
        await page.getByRole('button', { name: 'New' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('combobox', { name: 'Salutation' }).click();
        await page.getByText(salutation).click();
        await page.getByRole('textbox', { name: 'First Name' }).click();
        if (firstName.startsWith('$')) {
            await page.getByRole('textbox', { name: 'First Name' }).fill(obj.firstName);
        } else {
            await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
        }
        await page.getByRole('textbox', { name: '*Last Name' }).click();
        await page.waitForTimeout(2000);
        if (lastName.startsWith('$')) {
            await page.getByRole('textbox', { name: '*Last Name' }).fill(obj.lastName);
        } else {
            await page.getByRole('textbox', { name: '*Last Name' }).fill(lastName);
        }

        await page.getByRole('textbox', { name: '*Company' }).click();
        await page.waitForTimeout(2000);
        if (company.startsWith('$')) {
            await page.getByRole('textbox', { name: '*Company' }).fill(obj.company);
        } else {
            await page.getByRole('textbox', { name: '*Company' }).fill(company);
        }
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: 'Phone' }).click();
        if (phone.startsWith('$')) {
            await page.getByRole('textbox', { name: 'Phone' }).fill(obj1.phone);
        } else {
            await page.getByRole('textbox', { name: 'Phone' }).fill(phone);
        }
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(email);
        await page.waitForTimeout(2000);

        await page.getByRole('combobox', { name: 'Product Category' }).click();
        await page.getByRole('option', { name: `${product}` }).click();


        await page.getByRole('button', { name: 'Save', exact: true }).click();
        expect(page.getByRole('heading', { name: `Lead ${salutation} ${firstName} ${lastName}` }).locator('slot').nth(1));
        console.log(`**gbStart**leadCreationName**splitKeyValue**${firstName}${lastName}**gbEnd**`)
    });
});
