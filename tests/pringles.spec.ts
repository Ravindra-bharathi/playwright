
// test.describe("Pringles Website Regional Test", () => {
//     // test("Swiss  Pages", async ({ page }) => {
//     // await page.goto("https://www.pringles.com/ch/de/home.html");//w
//     // await page.goto('https://www.pringles.com/ca/en/home.html')
//     // await page.goto('https://www.pringles.com/es/home.html')
//     // await page.waitForSelector("body");
//     // await page.getByRole('button', { name: 'Accept Cookies' }).click();
//     // await page.getByLabel('Hier klicken, um etwas zu suchen').click();
//     // await page.getByPlaceholder('Suche').fill('qwee');
//     // await page.getByPlaceholder('Suche').click();
//     // await page.getByPlaceholder('Suche').fill('');
//     // });
//     test("engligh Europe Pages", async ({ page }) => {
//         const links = ['https://www.pringles.com/easterneurope/en/home.html', 'https://www.pringles.com/ca/en/home.html', 'https://www.clubcrackers.com/en_US/home.html']
//         // await page.goto('https://www.clubcrackers.com/en_US/home.html');//w

//         // await page.goto()
//         // await page.goto('https://www.pringles.com/uk/home.html')//w
//         // await page.goto('https://www.pringles.com/es/home.html')
//         // await page.goto('https://www.pringles.com/uk/home.html')//w
//         // await page.goto('https://www.pringles.com/fi/home.html')
//         // await page.goto('https://www.pringles.com/uk/home.html')//w
//         // await page.goto('https://www.pringles.com/dk/home.html')
//         // await page.locator('//*[@id="onetrust-accept-btn-handler"]').click();
//         const vare = links.map(async (temp, i) => {
//             await page.goto(temp);//w
//             await page.waitForSelector("body");
//             await page.getByRole('button', { name: 'Accept Cookies' }).click();
//             const values = await page.evaluate(() => {
//                 const items = document.querySelectorAll('.KSTLNav .mThree');
//                 return Array.from(items).map(item => item.textContent);
//             });

//             console.log(values, "value");

//             await page.waitForTimeout(3000);
//         });




//         // await page.getByLabel('Click to search').click();
//         // await page.getByPlaceholder('Search', { exact: true }).click();
//         // await page.getByPlaceholder('Search', { exact: true }).fill('test');
//         // await page.getByPlaceholder('Search', { exact: true }).click();
//         // await page.getByPlaceholder('Search', { exact: true }).fill('');
//         // await page.getByRole('contentinfo').getByRole('paragraph').nth(1).click();
//         // const val = values[1]
//         // if (!val) {
//         //     throw new Error('value is undefined')
//         // }
//         // await page.getByRole('navigation').getByRole('link', { name: val }).click();

//         // await Promise.all(
//         //     values.map(async (nameValue, i) => {
//         //         if (!nameValue) {
//         //             throw new Error(`Name value at index ${i} is undefined or empty.`);
//         //         }
//         //         console.log(nameValue, "vall")

//         //         await page
//         //             .getByRole('navigation')
//         //             .getByRole('link', { name: nameValue })
//         //             .click();
//         //     })
//         // );


//         // await page.getByRole('link', { name: 'Our brand' }).click();
//         // await page.getByLabel('secondary navigation', { exact: true }).getByRole('link', { name: 'Contact Us' }).click();
//         // const page1Promise = page.waitForEvent('popup');
//         // await page.getByRole('main').getByRole('link', { name: 'Where To Buy' }).click();
//         // const page1 = await page1Promise;
//         // // await page1.getByRole('heading', { name: 'Contact Us' }).click();

//     });

// });

// import test, { chromium, expect } from "@playwright/test";


// test("engligh Europe Pages", async ({ page }) => {
//     const links = ['https://www.pringles.com/easterneurope/en/home.html', 'https://www.pringles.com/ca/en/home.html', 'https://www.clubcrackers.com/en_US/home.html']
//     const browser = await chromium.launch({ headless: true });

//     const results = await Promise.all(

//         for (const temp of links) {
//         console.log(`Navigating to ${temp}`);
//         await page.goto(temp, { timeout: 60000, waitUntil: 'load' });
//         await page.waitForSelector('body');
//         console.log(`Successfully navigated to ${temp}`);

//         // Handle "Accept Cookies" button if present
//         const acceptCookiesButton = page.locator('button:has-text("Accept Cookies")');
//         if (await acceptCookiesButton.isVisible()) {
//             await acceptCookiesButton.click();
//         }

//         // Extract values
//         const values = await page.evaluate(() => {
//             const items = document.querySelectorAll('.KSTLNav .mThree');
//             return Array.from(items).map(item => item.textContent);
//         });

//         console.log(values, "value");


//         await page.waitForTimeout(3000);
//     }

//     );

// console.log(results);
// await browser.close();
// });

import test, { chromium, expect } from "@playwright/test";

test('testing', async (): Promise<any> => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const links = [
        'https://www.pringles.com/uk/home.html',
        'https://www.pringles.com/be/nl/home.html',
        'https://www.pringles.com/dk/home.htm',
        'https://www.pringles.com/tr/home.html',
    ];

    console.log(links.length, 'aaa');

    for (const link of links) {
        console.log(link, 'mmm');

        await page.goto(link, { timeout: 60000 });
        const busyIndicator = page.getByText("Please wait");
        await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });


        const values = await page.evaluate(() => {
            const items = document.querySelectorAll('.KSTLNav .mThree');
            return Array.from(items).map(item => {
                item.textContent?.trim() || ''
            });
        });

        console.log(values, 'ppp');
        await expect(page).toHaveURL(link);

    }
    await page.waitForTimeout(5000);
    await browser.close();
    // const browser = await chromium.launch({ headless: false });
    // const page = await browser.newPage();
    // const links = [
    //     'https://www.kelloggs.com/sea/home.html',
    //     'https://www.kelloggs.com/zh-tw/home.html',
    //     'https://www.kelloggs.com/zh-hk/home.html',

    // ];

    // for (const link of links) {

    //     await page.goto(link, { timeout: 60000 });

    //     const busyIndicator = page.getByText("Please wait");
    //     await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });

    //     const acceptCookiesButton = await page.getByRole('button', { name: 'Accept Cookies' });
    //     if (await acceptCookiesButton.isVisible()) {
    //         await acceptCookiesButton.click();
    //     }

    //     const values = await page.evaluate(() => {
    //         const items = document.querySelectorAll('.topmenu .li menu-dropdown');
    //         return Array.from(items).map(item => item.textContent?.trim() || '');
    //     });


    //     await expect(page).toHaveURL(link);



    //     for (let i = 0; i < values.length; i++) {

    //         if (!values[i]) {
    //             console.warn(`Skipping empty menu item at index ${i}`);
    //             return;
    //         }
    //         console.log(values[i], 'value')
    //         await page.getByLabel('menu', { exact: true }).getByLabel(values[i]);
    //     }
    // }

    // await page.waitForTimeout(5000);
    // await browser.close();
});
