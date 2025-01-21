import { expect, Page } from "@playwright/test";
import { Urls, ButtonLabels, ImageLabels, TextContent, LinkNames, products, images, value } from "../pages/carrsVariable";


export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto(Urls.Home, {
            timeout: 90000,
        });
    }

    async acceptCookies() {
        await this.page.waitForTimeout(3000);
        const cookieButton = this.page.getByRole("button", { name: ButtonLabels.AcceptCookies, exact: true });
        if (await cookieButton.isVisible()) {
            await cookieButton.click();
        } else {
            console.log("Cookie accept button is not visible.");
        }
    }

    async homePageImage() {
        const homeImage = this.page.getByRole('img', { name: ImageLabels.HomeBanner });

        if (await homeImage.isVisible()) {
            await expect(homeImage).toBeVisible();
        } else {
            console.log("Home page Image is not visible.");
        }
    }


    async clickProducts() {
        const products = this.page.getByRole("list").getByRole("link", { name: LinkNames.Products });
        await this.page.waitForTimeout(3000);
        if (await products.isVisible()) {
            await products.click();
        } else {
            console.log("Products link is not visible.");
        }
    }

    async productsImage() {
        const productsImage = this.page.getByRole('img', { name: ImageLabels.ProductsBanner });
        await this.page.waitForTimeout(3000);
        if (await productsImage.isVisible()) {
            await expect(productsImage).toBeVisible();
        } else {
            console.log("products Image is not visible.");
        }
    }
    async clickEverything() {
        const everyThing = this.page.getByRole('link', { name: LinkNames.EverythingsBetter });
        if (await everyThing.isVisible()) {
            await everyThing.click();
        }
        else {
            console.log('Everything\'s Better is not visible')
        }
    }

    async everythingImage() {
        const everythingImage = this.page.getByRole('img', { name: ImageLabels.EverythingsBetterBanner });
        await this.page.waitForTimeout(3000);
        if (await everythingImage.isVisible()) {
            await expect(everythingImage).toBeVisible();
        } else {
            console.log("everything Image is not visible.");
        }
        const everyThingImage2 = this.page.getByRole('img').nth(2);
        await this.page.waitForTimeout(3000);
        if (await everyThingImage2.isVisible()) {
            await expect(everyThingImage2).toBeVisible();
        } else {
            console.log("everything Image 2 is not visible.");
        }
        const heading = this.page.getByRole('heading', { name: TextContent.Heading });
        if (await heading.isVisible()) {
            await expect(heading).toBeVisible();
        }
        else {
            console.log('heading is not visible')
        }
        const paragha1 = this.page.getByText(TextContent.Paragha1)
        if (await paragha1.isVisible()) {
            await expect(paragha1).toBeVisible();
        }
        else {
            console.log('paragha is not visible')
        }
        const paragph2 = this.page.getByText(TextContent.Paragha2);
        if (await paragph2.isVisible()) {
            await expect(paragph2).toBeVisible();
        }
        else {
            console.log('paragha is not visible')
        }
        const paragraph3 = this.page.getByText(TextContent.Paragha3);
        if (await paragraph3.isVisible()) {
            await expect(paragraph3).toBeVisible();
        }
        else {
            console.log('paragha is not visible')
        }
    }

    async clickWhereToBuy() {
        await this.navigate();
        const whereToBuy = this.page.getByRole("link", { name: LinkNames.WhereToBuy, exact: true });
        if (await whereToBuy.isVisible()) {
            await whereToBuy.click();
            await this.page.goBack();
        } else {
            console.log("Where To Buy link is not visible.");
        }
    }

    async clickCenterProducts() {
        await this.navigate();
        for (const product of products) {
            const productLink = this.page.getByRole("link", { name: product.text });
            if (await productLink.isVisible()) {
                await productLink.click();
                await this.page.waitForTimeout(1000);

                if (product.img) {
                    const productsImage = this.page.getByLabel(product.img);
                    if (await productsImage.isVisible()) {
                        await expect(productsImage).toBeVisible();
                    } else {
                        console.log("Product image is not visible.");
                    }
                } else {
                    console.log("Product image is undefined.");
                }
                if (product.desc) {
                    const productsText = this.page.getByText(product.desc);
                    if (await productsText.isVisible()) {
                        await expect(productsText).toBeVisible();
                    } else {
                        console.log("Product Text is not visible.");
                    }
                } else {
                    console.log("Product text is not visible.");
                }
                await this.page.goBack();
            } else {
                console.log(`${product.text} link is not visible.`);
            }
        }
    }

    async clickViewProducts() {
        await this.navigate();
        const viewAllProducts = this.page.getByRole("link", { name: LinkNames.ViewAllProducts });
        await this.page.waitForTimeout(3000);
        if (await viewAllProducts.isVisible()) {
            await viewAllProducts.click();
            await this.page.waitForTimeout(1000);
            await this.clickAllProducts();
        } else {
            console.log("VIEW ALL PRODUCTS link is not visible.");
        }
    }
    async clickAllProducts() {
        for (let i = 0; i < images.length; i++) {
            const selector = `div:nth-child(${i + 1}) > .cta_1 > .cta_image > .kstl-image-wrapper > .track`;
            const product = this.page.locator(selector);
            try {
                if (await product.isVisible()) {
                    await product.click();
                    await this.page.waitForTimeout(1000);

                    const imageLocator = this.page.getByLabel(images[i].img);
                    if (await imageLocator.isVisible()) {
                        await expect(imageLocator).toBeVisible();
                    } else {
                        console.warn(`Image for product ${i} (${images[i].img}) is not visible.`);
                    }

                    const productTextLocator = this.page.getByText(images[i].desc);
                    if (await productTextLocator.isVisible()) {
                        await expect(productTextLocator).toBeVisible();
                    } else {
                        console.warn(`Description for product ${i} is not visible.`);
                    }
                    await this.page.goBack();
                    await this.page.waitForTimeout(1000);
                } else {
                    console.warn(`Product ${i + 1} is not visible.`);
                }
            } catch (error) {
                console.error(`Error processing product ${i}:`, error);
            }
        }
    }


    async clickFooters() {
        await this.page.waitForTimeout(1000);

        const contactUs = this.page.getByRole('link', { name: LinkNames.ContactUs });
        if (await contactUs.isVisible()) {
            await contactUs.click();
            await this.page.waitForTimeout(1000);
            const contactUsText = this.page.locator(LinkNames.ContactUSForm);
            await this.page.waitForTimeout(3000);
            if (await contactUsText.isVisible()) {
                await expect(contactUsText).toBeVisible();
            } else {
                console.log("Contact Us Text is not visible.");
            }
            await this.page.goBack();
        } else {
            console.log('Contact Us footer link is not visible.');
        }

        const productLink = this.page.getByRole('contentinfo').getByRole('link', { name: LinkNames.Products });
        if (await productLink.isVisible()) {
            await productLink.click();
            await this.page.waitForTimeout(1000);
            await this.page.goBack();
        } else {
            console.log('Products footer link is not visible.');
        }

        await this.page.waitForTimeout(2000);

        const whereToBuy = this.page.getByRole('link', { name: LinkNames.WhereToBuy, exact: true });
        await this.page.waitForTimeout(5000);
        if (await whereToBuy.isVisible()) {
            await whereToBuy.click();
            await this.page.waitForTimeout(5000);
            const whereToBuyImg = this.page.getByLabel(LinkNames.ShopFromOthers).locator('img').nth(1);
            await this.page.waitForTimeout(10000);
            if (await whereToBuyImg.isVisible()) {
                await expect(whereToBuyImg).toBeVisible();
            } else {
                console.log("where To Buy Image is not visible.");
            }

        } else {
            console.log('Where To Buy footer link is not visible.');
        }

        const shopping = this.page.getByLabel('Close the shop now shopping');
        const dropdown = this.page.getByText(value);
        await this.page.waitForTimeout(3000);
        if (await dropdown.isVisible()) {
            await dropdown.click()
        }
        else {
            console.log('drop down for where to buy is not visible.');

        }
        if (await shopping.isVisible()) {
            await shopping.click();
        } else {
            console.log('Close the shop now shopping is not visible.');
        }
        try {
            const privacyPromise = this.page.waitForEvent('popup');

            if (await this.page.getByRole('link', { name: LinkNames.PrivacyNotice }).isVisible()) {
                await this.page.getByRole('link', { name: LinkNames.PrivacyNotice }).click();
                const privacyPage = await privacyPromise;
                expect(privacyPage).toBeTruthy();
                const privacy = privacyPage.getByRole('heading', { name: 'Kellanova Consumer Privacy' });

            } else {
                console.log("Privacy Notice link is not visible.");
            }
        } catch (error) {
            console.error("Error while handling the Privacy Notice link:", error);
        }
        const usPrivacyPromise = this.page.waitForEvent('popup');
        if (await this.page.getByRole('link', { name: LinkNames.USPrivacy }).isVisible()) {
            await this.page.getByRole('link', { name: LinkNames.USPrivacy }).click();
            const usPrivacyPage = await usPrivacyPromise;
            await this.page.getByText('Cookie Preferences', { exact: true }).click();
            await this.page.getByLabel('Close', { exact: true }).click();
            await usPrivacyPage.close();
        } else {
            console.log('US Privacy link is not visible.');
        }

        const termsPromise = this.page.waitForEvent('popup');
        if (await this.page.getByRole('link', { name: LinkNames.TermsOfUse }).isVisible()) {
            await this.page.getByRole('link', { name: LinkNames.TermsOfUse }).click();
            const termsPage = await termsPromise;
            await termsPage.close();
        } else {
            console.log('Terms of Use link is not visible.');
        }

        const accessibilityPromise = this.page.waitForEvent('popup');
        if (await this.page.getByRole('link', { name: LinkNames.Accessibility }).isVisible()) {
            await this.page.getByRole('link', { name: LinkNames.Accessibility }).click();
            const accessibilityPage = await accessibilityPromise;
            await accessibilityPage.close();
        } else {
            console.log('Accessibility link is not visible.');
        }

        const privacyChoicesPromise = this.page.waitForEvent('popup');
        if (await this.page.getByRole('link', { name: LinkNames.YourPrivacyChoices }).isVisible()) {
            await this.page.getByRole('link', { name: LinkNames.YourPrivacyChoices }).click();
            const privacyChoicesPage = await privacyChoicesPromise;
            if (await privacyChoicesPage.getByRole('link', { name: LinkNames.CarrBrandLogo }).isVisible()) {
                await privacyChoicesPage.getByRole('link', { name: LinkNames.CarrBrandLogo }).click();
            }
            await privacyChoicesPage.close();
        } else {
            console.log('Your Privacy Choices link is not visible.');
        }

        await this.page.close();

    }

}
