import { test, expect } from '@playwright/test';
import {
    company,
    email,
    firstName,
    lastName,
    password,
    phone,
    product,
    salutation,
    url,
    username
} from './floating_variable';

test.use({
    baseURL: url,
    permissions: ['geolocation'],
    viewport: { width: 1280, height: 720 }
});

test('Navigate to Floating Salesforce and create a new lead', async ({ page }) => {
    // Navigate to the URL
    await page.goto('/');

    // Log in
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Log In to Sandbox' }).click();


    // Navigate to Sales app
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.getByRole('option', { name: 'Sales', exact: true }).click();

    // Navigate to Leads
    await page.getByRole('link', { name: 'Leads', exact: true }).click();

    // Click on New to create a lead
    await page.getByRole('button', { name: 'New' }).click();

    // Fill in the lead form
    await page.getByRole('combobox', { name: 'Salutation' }).selectOption({ label: salutation });
    await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await page.getByRole('textbox', { name: 'Company' }).fill(company);
    await page.getByRole('textbox', { name: 'Phone' }).fill(phone);
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('combobox', { name: 'Product Category' }).selectOption({ label: product });

    // Save the new lead
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    // Verify that the lead was created successfully
    const leadHeading = page.getByRole('heading', { name: `Lead ${salutation} ${firstName} ${lastName}` });
    await expect(leadHeading).toBeVisible();

    // Log the created lead's name
    console.log(`**gbStart**leadCreationName**splitKeyValue**${firstName} ${lastName}**gbEnd**`);
});
