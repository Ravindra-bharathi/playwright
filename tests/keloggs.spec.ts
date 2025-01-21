// import test, { chromium, expect } from "@playwright/test";

// test('testing', async () => {
//     const browser = await chromium.launch({ headless: false });
//     const page = await browser.newPage();
//     const links = [
//         'https://www.kelloggs.com/sea/home.html',
//         'https://www.kelloggs.com/zh-tw/home.html',
//         'https://www.kelloggs.com/zh-hk/home.html',

//     ];

//     for (const link of links) {

//         await page.goto(link, { timeout: 60000 });

//         const busyIndicator = page.getByText("Please wait");
//         await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });

//         const acceptCookiesButton = await page.getByRole('button', { name: 'Accept Cookies' });
//         if (await acceptCookiesButton.isVisible()) {
//             await acceptCookiesButton.click();
//         }

//         const values = await page.evaluate(() => {
//             const items = document.querySelectorAll('.topmenu .li menu-dropdown');
//             return Array.from(items).map(async item => {
//                 const temp = item.textContent?.trim() || ''
//                 await page.getByLabel('menu', { exact: true }).getByLabel(temp);
//                 await page.waitForTimeout(5000);
//                 await page.goto(link, { timeout: 60000 });
//                 await page.waitForTimeout(5000);
//             });
//         });


//         // for (const value of values) {
//         //     console.log(link, "link")

//         //     console.log(values, 'value')
//         //     await page.getByLabel('menu', { exact: true }).getByLabel(value);
//         //     await page.waitForTimeout(5000);
//         //     await page.goto(link, { timeout: 60000 });
//         //     await page.waitForTimeout(5000);
//         // }
//     }

//     await page.waitForTimeout(5000);
//     await browser.close();
// });

import test, { chromium, expect, Page } from "@playwright/test";

test('testing', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    test.setTimeout(400000);
    const links = [
        // 'https://www.kelloggs.com/zh-hk/home.html',
        'https://www.kelloggs.com/sea/home.html',
        'https://www.kelloggs.com/en-za/home.html',
        // 'https://www.kelloggs.com/me/en/home.html',
        // 'https://www.kelloggs.com/zh-tw/home.html',
        // 'https://www.cheezit.ca/en_CA/home.html',
        // 'https://www.kelloggs.com/zh-hk/home.html',
        // 'https://www.kelloggs.com/me/en-sa/products.html',
        // 'https://www.kelloggs.com/me/en/home.html',
    ];

    for (const link of links) {
        await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });

        const busyIndicator = page.getByText("Please wait");
        await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });


        await page.getByRole('button', { name: 'Accept Cookies' }).click();


        await page.locator('.search-button').click();

        const inputField = page.getByPlaceholder('Type Here....');

        if (await inputField.isVisible()) {
            await inputField.click();
            await inputField.fill('test');
            await inputField.click();
            await inputField.fill('');

            await page.getByLabel('close search').click();
        } else {
            console.log('Input field is not visible. Skipping interaction.');
        }


        const menuItems = await page.evaluate(() => {
            const items = document.querySelectorAll('.topmenu .menu-dropdown');
            return Array.from(items).map(item => item.textContent?.trim() || '');
        });




        // function extractAfterNewLine(array) {
        //     return array.flatMap(item =>
        //         item
        //             .split('\n')
        //             .map(line => line.trim())
        //             .filter(line => line)
        //     );
        // }

        // const words = extractAfterNewLine(menuItems);

        // function findRepeatedWordsAndRest(wordsArray) {
        //     const wordOccurrences = new Map();
        //     let firstRepeatedWord = null;
        //     let splitIndex = -1;

        //     for (let i = 0; i < wordsArray.length; i++) {
        //         const word = wordsArray[i];

        //         if (wordOccurrences.has(word)) {
        //             const count = wordOccurrences.get(word);

        //             // If the word is repeated for the first time
        //             if (count === 1 && firstRepeatedWord === null) {
        //                 firstRepeatedWord = word;
        //                 splitIndex = i;
        //                 break;  // Found the first repeated word, stop searching.
        //             }
        //             wordOccurrences.set(word, count + 1);
        //         } else {
        //             wordOccurrences.set(word, 1);
        //         }
        //     }

        //     const afterSecondRepeated = wordsArray.slice(splitIndex + 1);

        //     return {
        //         firstRepeatedWord,
        //         afterSecondRepeated
        //     };
        // }

        // const result = findRepeatedWordsAndRest(words);

        // const temp = result.firstRepeatedWord;
        // if (temp) {
        //     const footerLocator = page.locator('.topmenu').getByLabel(temp, { exact: true });
        //     await footerLocator.hover();
        // }

        // for (const menuItem of result.afterSecondRepeated) {
        //     console.log(`Processing temp item: ${menuItem}`);
        //     if (menuItem) {
        //         const footerLocator_1 = page.locator('.topmenu').getByLabel(menuItem, { exact: true });
        //         await footerLocator_1.click();
        //         const busyIndicator = page.getByText("Please wait");
        //         await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });
        //         await page.waitForTimeout(6000);
        //         await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });
        //     }
        // }


        for (const menuItem of menuItems) {
            console.log(`Processing temp item: ${menuItem}`);
            const footerLocator = page.locator('.topmenu').getByLabel(menuItem, { exact: true });
            await footerLocator.click;
            const busyIndicator = page.getByText("Please wait");
            await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });
            await page.waitForTimeout(6000);
            await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });
        }




        const footerItems = await page.evaluate(() => {
            const items = document.querySelectorAll('#lowerfooterlinks .track ');
            return Array.from(items).map(item => item.textContent?.trim() || '');
        });

        const footerItems2 = await page.evaluate(() => {
            const items = document.querySelectorAll('#lowerfooterlinks .ot-sdk-show-settings ');
            return Array.from(items).map(item => item.textContent?.trim() || '');
        });
        const combinedArray = footerItems2.concat(footerItems);



        for (const footerItem of combinedArray) {
            console.log(`Processing temp item: ${footerItem}`);
            const footerLocator = page.locator('#lowerfooterlinks').getByLabel(footerItem, { exact: true });
            await footerLocator.click();
            const busyIndicator = page.getByText("Please wait");
            await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });
            await page.waitForTimeout(5000);
            await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });
        }
        const footerItemslist = await page.evaluate(() => {
            const items = document.querySelectorAll('.footer-nav--main .track ');
            return Array.from(items).map(item => item.textContent?.trim() || '');
        });

        for (const footerItem of footerItemslist) {
            console.log(`Processing temp item: ${footerItem}`);
            const footerLocator = page.locator('.footer-nav--main').getByLabel(footerItem, { exact: true });
            await footerLocator.click();
            const busyIndicator = page.getByText("Please wait");
            await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });
            await page.waitForTimeout(6000);
            await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });
        }


        // const elements = page.locator('.cta-text');

        // const element = elements.nth(1);

        // const newClassName = `new-class-1}`;
        // await element.evaluate((el, className) => {
        //     el.classList.add(className);
        // }, newClassName);
        // await page.locator(`.new-class-1`).click();

        // await page.waitForTimeout(6000);
        // await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });


        // const element_1 = elements.nth(2);
        // const newClassName_1 = `new-class-2}`;

        // await element_1.evaluate((el, className) => {
        //     el.classList.add(className);
        // }, newClassName_1);
        // await page.locator(`.new-class-2`).click();

        // await page.waitForTimeout(6000);
        // await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });


        const buttonItems = await page.evaluate(() => {
            const items = document.querySelectorAll('.caption .title-border');
            return Array.from(items).map(item => item.textContent?.trim() || '');
        });
        const buttonItems_2 = await page.evaluate(() => {
            const items = document.querySelectorAll('.caption .subTitle-h1-text');
            return Array.from(items).map(item => item.textContent?.trim() || '');
        });

        for (const footerItem of buttonItems) {
            console.log(`Processing temp item: ${footerItem}`);
            const footerLocator = page.getByLabel(footerItem);
            await footerLocator.click();
            const busyIndicator = page.getByText("Please wait");
            await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });
            await page.waitForTimeout(6000);
            await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });
        }

        for (const footerItem of buttonItems_2) {
            console.log(`Processing temp item: ${footerItem}`);
            const footerLocator = page.getByRole('link', { name: `${footerItem}` })
            await footerLocator.click();
            const busyIndicator = page.getByText("Please wait");
            await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });
            await page.waitForTimeout(6000);
            await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });
        }
        const pagerItem = await page.$('ol.flex-control-nav.flex-control-paging li:nth-child(2) a');
        const pagerItem_1 = await page.$('ol.flex-control-nav.flex-control-paging li:nth-child(3) a');

        if (pagerItem) {
            await pagerItem.click();
        }

        if (pagerItem_1) {
            await pagerItem_1?.click()
        }

        // const socialMediaItems = await page.evaluate(() => {
        //     const items = document.querySelectorAll('.social_icons .track');
        //     return Array.from(items).map(item => item.textContent?.trim() || '');
        // });


        // console.log(socialMediaItems, 'social')

        // for (const footerItem of socialMediaItems) {
        //     console.log(`Processing temp item: ${footerItem}`);
        //     const elementToClick = await page.getByLabel(footerItem);
        //     await elementToClick.click();
        //     const busyIndicator = page.getByText("Please wait");
        //     await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });
        //     await page.waitForTimeout(5000);
        //     await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });
        // }
    }
    await browser.close();
});



// import test, { chromium, expect } from "@playwright/test";

// test('testing', async () => {
//     const browser = await chromium.launch({ headless: false });
//     const page = await browser.newPage();
//     const links = [
//         'https://www.kelloggs.com/sea/home.html',
//         'https://www.kelloggs.com/zh-tw/home.html',
//         'https://www.kelloggs.com/zh-hk/home.html',
//     ];

//     for (const link of links) {
//         console.log(`Navigating to ${link}...`);
//         await page.goto(link, { timeout: 60000 });

//         try {
//             const busyIndicator = page.getByText("Please wait");
//             await busyIndicator.waitFor({ state: 'hidden', timeout: 60000 });
//         } catch (error) {
//             console.log("No busy indicator found, continuing...");
//         }


//         try {
//             const acceptCookiesButton = await page.getByRole('button', { name: 'Accept Cookies' });
//             if (await acceptCookiesButton.isVisible()) {
//                 await acceptCookiesButton.click();
//             }
//         } catch (error) {
//             console.log("No 'Accept Cookies' button found.");
//         }

//         const menuItems = await page.evaluate(() => {
//             const items = document.querySelectorAll('.topmenu .menu-dropdown');
//             return Array.from(items).map(item => item.textContent?.trim() || '');
//         });

//         console.log(`Menu items on ${link}:`, menuItems);

//         // for (const menuItem of menuItems) {
//         //     console.log(`Interacting with menu item: ${menuItem}`);
//         //     try {
//         //         const menuLabel = page.getByLabel(menuItem, { exact: true });
//         //         await menuLabel.click();
//         //         await page.waitForTimeout(2000);
//         //         await page.goto(link, { timeout: 60000 });
//         //     } catch (error) {
//         //         console.log(`Failed to interact with menu item: ${menuItem}`);
//         //     }
//         // }

//         for (const value of menuItems) {
//             console.log(`Processing menu item: ${value}`);
//             try {
//                 await page.waitForTimeout(6000);
//                 const menuLabel = page.getByLabel(value, { exact: true });
//                 await menuLabel.click();
//                 await page.waitForTimeout(6000);
//                 await page.goto(link);
//             } catch (error) {
//                 console.error(`Error processing menu item '${value}':`, error);
//             }
//         }
//     }

//     await browser.close();
// });
