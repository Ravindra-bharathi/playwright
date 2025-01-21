import { expect, Page } from "@playwright/test";
import { homePageCard, homePageImage, nextButton, ourFood, url } from "./clubCrackersVariable";

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
                    console.log(`${card.name} is not visible`);
                }

                const cardImage = this.page.getByRole('img', { name: card.img });
                if (await cardImage.isVisible()) {
                    await expect(cardImage).toBeVisible();
                } else {
                    console.log(`${card.img} is not visible`);
                }
            } else {
                console.log("Invalid card entry", card);
            }
        }
    }

}