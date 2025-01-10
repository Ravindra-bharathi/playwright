import { chromium, test } from "@playwright/test";

test('Extract and click links', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    test.setTimeout(400000);

    const links = [
        'https://www.kelloggs.com/zh-hk/home.html',
        // 'https://www.kelloggs.com/sea/home.html',
        'https://www.kelloggs.com/en-za/home.html',
        'https://www.kelloggs.com/me/en/home.html',
        // 'https://www.kelloggs.com/zh-tw/home.html',
        // 'https://www.cheezit.ca/en_CA/home.html',
        // 'https://www.kelloggs.com/zh-hk/home.html',
        // 'https://www.kelloggs.com/me/en-sa/products.html',
        // 'https://www.kelloggs.com/me/en/home.html',
    ];
    for (const link of links) {
        await page.goto(link, { timeout: 30000, waitUntil: 'domcontentloaded' });

        const rawLinks = await page.$$eval('a', (elements) =>
            elements
                .map((el) => el.getAttribute('href'))
                .filter((href): href is string => !!href)
        );

        console.log('Extracted Links:', rawLinks);

        for (const href of rawLinks) {
            const url = new URL(href, page.url()).href;
            console.log(`Navigating to: ${url}`);
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            console.log(`Visited: ${url}`);

        }
    }
    await browser.close();
});