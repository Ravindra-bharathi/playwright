import { test, Page } from '@playwright/test';


test.describe(() => {
    test.setTimeout(800000);
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test('print', async () => {
        await page.goto('https://me.sap.com/app/securitynotes');
        await page.getByPlaceholder('E-Mail, ID, or Login Name').fill('subbu@beeceeyes.com');
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('Sap@12345');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.waitForTimeout(8000);
        await page.goto('https://me.sap.com/notes/203545');
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('button', { name: 'PDF Version' }).click();
        const page1 = await page1Promise;
        await page1.waitForLoadState('domcontentloaded');
        // await page1.focus('body');
        await page.waitForTimeout(8000);
        await page1.pdf({ path: 'sap_note1.pdf', format: 'A4' });
        console.log('PDF saved as sap_note.pdf');

        await page.waitForTimeout(8000);

    });
});