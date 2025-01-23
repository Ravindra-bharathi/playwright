import { expect, Page } from "@playwright/test";
import { contactUsText, homePageCard, homePageImage, nextButton, ourFood, url } from "./clubCrackersVariable";

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async homepageNavigate() {
        await this.page.goto(url, { timeout: 90000 });
    }
    async accpectCookies() {
        await this.page.getByRole('button', { name: 'OK', exact: true }).click();
    }
    async homepageVerification() {
        await this.page.getByText('Meet The Newest').click();
    }
    async headerOurfood() {
        await this.page.getByLabel('menu', { exact: true }).getByRole('link', { name: ourFood }).click();
        await this.page.waitForTimeout(3000);
    }
    async headerOurFoodTitle() {
        const ourFoodTitle = this.page.getByRole('heading', { name: ourFood });
        if (await ourFoodTitle.isVisible()) {
            await expect(ourFoodTitle).toBeVisible()
        }
        else {
            console.log('Our food title is not visible')
        }
        await this.page.goBack()

    }
    async headerRecipies() {
        const Recipes = this.page.getByLabel('menu', { exact: true }).getByRole('link', { name: 'Recipes' });
        if (await Recipes.isVisible()) {
            await Recipes.click()
            await this.page.waitForTimeout(3000);
        }
        else {
            console.log("Recipes is not visible");
        }
    }
    async headerRecipiesImg() {
        const img = this.page.getByRole('heading', { name: 'Recipes' });
        if (await img.isVisible()) {
            await expect(img).toBeVisible()
        }
        else {
            console.log("Recipes image is not visible")
        }
        await this.page.goBack();
        await this.page.waitForTimeout(3000);

    }
    async homepageContuctUs() {
        const contuctUs = this.page.getByLabel('secondary navigation', { exact: true }).getByRole('link', { name: contactUsText });
        if (await contuctUs.isVisible()) {
            await contuctUs.click();
        }
        else {
            console.log("contuctUs is not visible")
        }
        await this.page.waitForTimeout(3000);
        const heading = this.page.getByRole('heading', { name: contactUsText });
        if (await heading.isVisible()) {
            await expect(heading).toBeVisible()
        }
        else {
            console.log("heading is not visible")
        }
        await this.page.goBack();
        await this.page.waitForTimeout(3000);
    }
    async homepageNextbutton() {
        const clickNextButton = this.page.getByRole('button', { name: nextButton });
        for (const image of homePageImage) {
            if (await clickNextButton.isVisible()) {
                await clickNextButton.click();
            }
            else {
                console.log("nextButton is not avaliable")
            }
            const homePageImg = this.page.locator(image);
            if (await homePageImg.isVisible()) {
                await expect(homePageImg).toBeVisible()
            }
            else {
                console.log(homePageImg, "is not visible");
            }

        }
    }
    async homepageCard() {
        for (const card of homePageCard) {
            if (card.name && card.img) {
                const cardLink = this.page.getByRole('link', { name: card.name });
                if (await cardLink.isVisible()) {
                    await cardLink.click();
                } else {
                    console.log(`Card link "${card.name}" is not visible`);
                    continue;
                }

                await this.page.waitForTimeout(3000);

                const cardImage = this.page.getByRole('img', { name: card.img });

                if (await cardImage.isVisible()) {
                    await expect(cardImage).toBeVisible();
                    await this.page.goBack();
                } else {
                    console.log(`Card image "${card.img}" is not visible`);
                }
            } else {
                console.log("Invalid card entry", card);
            }

            await this.page.waitForTimeout(3000);
        }
    }



    async homePagevideoCheck() {
        const video = this.page.getByRole('img', { name: 'Opening shot of a club' });
        if (await video.isVisible()) {
            await expect(video).toBeVisible();
        }
        else {
            console.log("video img is not avaliable")
        }
    }
    async homePageImgPerfect() {
        const img = this.page.getByRole('img', { name: 'Perfect for topping' });
        if (await img.isVisible()) {
            await expect(img).toBeVisible();
        }
        else {
            console.log(img, " is not avaliable")
        }
    }
    async homepageCheckOutRecipes() {
        const img = this.page.getByRole('link', { name: 'Check Out Our Recipes!' })
        if (await img.isVisible()) {
            await img.click();
        }
        else {
            console.log(img, " is not avaliable")
        }
        await this.page.waitForTimeout(3000);
    }
    async recipesHeadingCheck() {
        const heading = this.page.getByRole('heading', { name: 'Recipes' });
        if (await heading.isVisible()) {
            await expect(heading).toBeVisible()
        }
        else {
            console.log(heading, " is not avaliable")
        }
        await this.page.goBack();
        await this.page.waitForTimeout(3000);

    }
    async homePageInsta() {
        const clubOn = this.page.getByRole('link', { name: 'Keep up with Club on' });
        if (await clubOn.isVisible()) {
            await clubOn.click();
        } else {
            console.log("clubOn is not visible");
            return;
        }

        try {
            const popupPage = await this.page.waitForEvent('popup', { timeout: 5000 });
            if (popupPage) {
                await popupPage.waitForLoadState();
                await popupPage.close();
            } else {
                console.log("Popup page did not open");
                return;
            }
        } catch (error) {
            console.error("Error handling the popup:", error);
            return;
        }

        await this.page.goBack();
        await this.page.waitForTimeout(3000);
    }

    async homePageTopbutton() {
        const temp = this.page.getByLabel('back to top');
        if (await temp.isVisible()) {
            await temp.click()
        }
        else {
            console.log("homepagetopbutton is not visible");
        }
    }

    async searchBar() {
        const searchBar = this.page.getByRole('button', { name: 'Search' });
        if (await searchBar.isVisible()) {
            await searchBar.click();
            await this.page.getByPlaceholder('Type Here....').fill('test');
            await this.page.getByPlaceholder('Type Here....').press('Enter');
            await this.page.waitForTimeout(3000);
            const searchResult = this.page.getByRole('heading', { name: `Results for "test"` });
            if (await searchResult.isVisible()) {
                await expect(searchResult).toBeVisible();
            }
            else {
                console.log("searchResult is not visible");
            }
        }
        else {
            console.log("searchBar is not visible");
        }
    }
    async footerlink() {
        const footerlink = this.page.getByRole('link', { name: 'Home' });
        if (await footerlink.isVisible()) {
            await footerlink.click();
        }
        else {
            console.log(footerlink, "footerlink is not visible");
        }
        const recipe = this.page.getByLabel('footer main navigation').getByRole('link', { name: 'Recipes' })
        if (await recipe.isVisible()) {
            await recipe.click();
        }
        else {
            console.log(recipe, "recipe is not visible");
        }
        await this.page.goto(url, { timeout: 90000 });
        const contact = this.page.getByLabel('footer main navigation').getByRole('link', { name: 'Contact Us' });
        if (await contact.isVisible()) {
            await contact.click();
        }
        else {
            console.log(contact, "contact is not visible");
        }
        await this.page.goto(url, { timeout: 90000 });
        const food = this.page.getByLabel('footer main navigation').getByRole('link', { name: 'Our Food' });
        if (await food.isVisible()) {
            await food.click()
        }
        else {
            console.log(food, "fooerlink is no visible");
        }
        await this.page.goto(url, { timeout: 90000 });
        const temp = this.page.getByRole('link', { name: 'Where To Buy', exact: true });
        if (await temp.isVisible()) {
            await temp.click();
        }
        else {
            console.log(temp, "footerlink is not visible");
        }
        await this.page.waitForTimeout(3000);
        const heading = this.page.getByLabel('Shop Club® Original Crackers')
        if (await heading.isVisible()) {
            await expect(heading).toBeVisible()
        }
        else {
            console.log(heading, " header is not visible")
        }
        const close = this.page.getByLabel('Close the shop now shopping')
        if (await close.isVisible()) {
            await close.click();
        }
        else {
            console.log("close button is not clicked")
        }
        await this.page.goto(url);
        const siteMap = this.page.getByRole('link', { name: 'Site Map' });
        if (await siteMap.isVisible()) {
            await siteMap.click()
        } else {
            console.log("sitemap is not clickable")
        }
        const siteMapHeading = this.page.getByLabel('Site Map')
        if (await siteMapHeading.isVisible()) {
            await expect(siteMapHeading).toBeVisible()
        }
        else {
            console.log(siteMapHeading, " header is not visible")
        }
    }
}