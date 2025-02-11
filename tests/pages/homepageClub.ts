import { expect, Page } from "@playwright/test";
import { contactUsText, homePageCard, homePageImage, nextButton, ourFood, recipeNames, url } from "./clubCrackersVariable";

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
    async whereToBuy() {
        await this.page.getByRole('link', { name: 'check where to buy' }).click();
        await this.page.waitForTimeout(50000);
        await this.page.getByLabel('Shop from other retailers').locator('div').filter({ hasText: 'Product Club® Minis Original' }).nth(3).click();
        await this.page.getByRole('button', { name: 'Close the shop now shopping' }).click();
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
        await this.page.goto(url, { timeout: 90000 });
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
        await this.page.goto(url, { timeout: 90000 });
        const siteMap = this.page.getByRole('link', { name: 'Site Map' });
        if (await siteMap.isVisible()) {
            await siteMap.click()
        } else {
            console.log("sitemap is not clickable")
        }
        await this.page.waitForTimeout(3000);
        const siteMapHeading = this.page.getByRole('heading', { name: 'Site Map' });
        if (await siteMapHeading.isVisible()) {
            await expect(siteMapHeading).toBeVisible()
        }
        else {
            console.log(siteMapHeading, " header is not visible")
        }
    }
    async ourFood() {
        await this.page.getByLabel('menu', { exact: true }).getByRole('link', { name: ourFood }).click();
        await this.page.waitForTimeout(3000);
        const ourFoodTitle = this.page.getByRole('heading', { name: ourFood });
        if (await ourFoodTitle.isVisible()) {
            await expect(ourFoodTitle).toBeVisible()
        }
        else {
            console.log('Our food title is not visible')
        }
        for (const card of homePageCard) {
            if (card.name && card.img && card.des) {
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
                } else {
                    console.log(`Card image "${card.img}" is not visible`);
                }
                const text = this.page.getByText(card.des);

                if (await text.isVisible()) {
                    await expect(text).toBeVisible();
                }
                else {
                    console.log(`Card des "${card.des}" is not visible`);
                }
                const wheretoBuyButton = this.page.getByLabel('click to see where to buy');
                if (await wheretoBuyButton.isVisible()) {
                    await wheretoBuyButton.click()
                }
                else {
                    console.log("where to buy button is not visible in our foods");
                }
                await this.page.waitForTimeout(9000);
                const closeButton = this.page.getByRole('button', { name: 'Close the shop now shopping' });
                if (await closeButton.isVisible()) {
                    closeButton.click
                }
                else {
                    console.log(closeButton, "is not visible in our food")
                }

                const allProducts = this.page.getByRole('link', { name: 'All Products' })
                if (await allProducts.isVisible()) {
                    await allProducts.click();
                }
                else {
                    console.log("allproducts is not avalibale to click")
                }
            } else {
                console.log("Invalid card entry", card);
            }
            await this.page.waitForTimeout(3000);
        }
    }

    async recipes() {
        const Recipes = this.page.getByLabel('menu', { exact: true }).getByRole('link', { name: 'Recipes' });
        if (await Recipes.isVisible()) {
            await Recipes.click()
            await this.page.waitForTimeout(3000);
        }
        else {
            console.log("Recipes is not visible");
        }
        const recipes = this.page.getByRole('heading', { name: 'Recipes' });
        if (await recipes.isVisible()) {
            await expect(recipes).toBeVisible();
        } else {
            console.log("recipes heading is not visible")
        }
        const search = this.page.getByPlaceholder('Find a recipe');
        const searchbtn = this.page.getByLabel('Search Recipes');

        if (await search.isVisible()) {
            await search.click();
            await search.fill('test');
            if (await searchbtn.isVisible()) {
                await searchbtn.click();
                await this.page.waitForTimeout(6000);
            }
            else {
                console.log("search buttion is not visible ");
            }
            const result = this.page.getByLabel('No Results Found')
            if (await result.isVisible()) {
                await expect(result).toBeVisible();
            }
            else {
                console.log("no result found is not visible ");
            }
            await search.fill('');
            await searchbtn.click();
        } else {
            console.log("search is not visible");
        }
        if (await search.isVisible()) {
            await search.click();
            await search.fill('egg');
            if (await searchbtn.isVisible()) {
                await searchbtn.click();
            }
            else {
                console.log("search buttion is not visible ");
            }
            await this.page.waitForTimeout(9000);
            const result = this.page.getByRole('link', { name: 'Egg Salad with Fresh Herbs' })
            if (await result.isVisible()) {
                await expect(result).toBeVisible();
            }
            else {
                console.log("Egg Salad with Fresh Herbs is not visible ");
            }
            await search.fill('');
            await searchbtn.click();
        } else {
            console.log("search is not visible");
        }
        const dropdown = this.page.getByLabel('Category dropdown');
        if (await dropdown.isVisible()) {
            await dropdown.selectOption('holiday')
            await dropdown.selectOption('All')
        } else {
            console.log("dropdown is not visible")
        }
        await this.page.waitForTimeout(3000);


        await search.fill('Sweet and Spicy Bacon Crackers ');
        if (await searchbtn.isVisible()) {
            await searchbtn.click();
        }
        else {
            console.log("search buttion is not visible ");
        }
        await this.page.getByRole('link', { name: 'Sweet and Spicy Bacon' }).click();
        await this.page.getByRole('img', { name: 'Sweet and Spicy Bacon Crackers' }).click();
        await this.page.getByRole('heading', { name: 'Sweet and Spicy Bacon Crackers' }).click();
        await expect(this.page.getByText('Bacon and Club® Crackers')).toBeVisible();
        await expect(this.page.getByText('Prep Time (min):')).toBeVisible();
        await expect(this.page.getByText('10', { exact: true })).toBeVisible();
        await expect(this.page.getByText('35', { exact: true })).toBeVisible();
        await expect(this.page.getByText('Servings 6-')).toBeVisible();
        await expect(this.page.getByText('-8')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Ingredients' })).toBeVisible();
        await expect(this.page.getByText('Ingredients 1 sleeve Club®')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Directions' })).toBeVisible();
        await this.page.getByText('1. Preheat oven to 350°F.').click();
        await expect(this.page.getByText('1. Preheat oven to 350°F.')).toBeVisible();
        await expect(this.page.getByText('2. Place crackers in single')).toBeVisible();
        await expect(this.page.getByText('3. Bake until bacon is crisp')).toBeVisible();
        await expect(this.page.getByText('This recipe uses: Club®')).toBeVisible();



        const firstCard = this.page.getByRole('link', { name: 'Sweet and Spicy Bacon Crackers' });
        if (await firstCard.isVisible()) {
            await firstCard.click();
            await this.page.waitForTimeout(3000);
        } else {
            console.log("Sweet and Spicy Bacon Crackers is not visible")
        }
        await this.page.waitForTimeout(3000);
        const imgOfcard = this.page.getByRole('img', { name: 'Sweet and Spicy Bacon Crackers' });
        if (await imgOfcard.isVisible()) {
            await expect(imgOfcard).toBeVisible();
        }
        else {
            console.log("Sweet and Spicy Bacon Crackers img is not visible")
        }
        const cardTitle = this.page.getByRole('heading', { name: 'Sweet and Spicy Bacon Crackers' });
        if (await cardTitle.isVisible()) {
            await expect(cardTitle).toBeVisible();
        }
        else {
            console.log("Sweet and Spicy Bacon Crackers title is not visible")
        }
        const cardText = this.page.getByText('10', { exact: true }).first();
        if (await cardText.isVisible()) {
            await expect(cardText).toBeVisible();
        }
        else {
            console.log("Sweet and Spicy Bacon Crackers text is not visible")
        }
        const cardIngredients = this.page.getByRole('heading', { name: 'Ingredients' });
        if (await cardIngredients.isVisible()) {
            await expect(cardIngredients).toBeVisible();
        }
        else {
            console.log("Sweet and Spicy Bacon Crackers ingredients is not visible")
        }
        const cardDirections = this.page.getByRole('heading', { name: 'Directions' });
        if (await cardDirections.isVisible()) {
            await expect(cardDirections).toBeVisible();
        }
        else {
            console.log("Sweet and Spicy Bacon Crackers directions is not visible")
        }
        const cardList = this.page.locator('li').filter({ hasText: 'Club® Original Crackers' });
        if (await cardList.isVisible()) {
            await expect(cardList).toBeVisible();
        }
        else {
            console.log("Sweet and Spicy Bacon Crackers list is not visible")
        }
        const cardDrizzle = this.page.getByText('Drizzle Club® Original');
        if (await cardDrizzle.isVisible()) {
            await expect(cardDrizzle).toBeVisible()
        }
        else {
            console.log("Sweet and Spicy Bacon Crackers drizzle is not visible")
        }
        await this.page.waitForTimeout(3000);
        await this.page.goBack();
    }


    async cardRecipies() {
        const Recipes = this.page.getByLabel('menu', { exact: true }).getByRole('link', { name: 'Recipes' });
        if (await Recipes.isVisible()) {
            await Recipes.click()
            await this.page.waitForTimeout(3000);
        }
        else {
            console.log("Recipes is not visible");
        }
        const recipes = this.page.getByRole('heading', { name: 'Recipes' });
        if (await recipes.isVisible()) {
            await expect(recipes).toBeVisible();
        } else {
            console.log("recipes heading is not visible")
        }
        const search = this.page.getByPlaceholder('Find a recipe');
        const searchbtn = this.page.getByLabel('Search Recipes');
        console.log(recipeNames.length, "value")
        for (const value of recipeNames) {
            await search.fill(value.name);
            if (await searchbtn.isVisible()) {
                await searchbtn.click();
            } else {
                console.log("search button is not visible ");
            }

            await this.page.waitForTimeout(3000);

            const recipeLink = this.page.getByRole('link', { name: value.name });
            if (await recipeLink.isVisible()) {
                await recipeLink.click();
            } else {
                console.log("recipe link is not visible");
            }
            await this.page.waitForTimeout(5000);

            const recipeImage = this.page.getByRole('img', { name: value.img });
            if (await recipeImage.isVisible()) {
                await recipeImage.click();
            } else {
                console.log("recipe image is not visible");
            }

            const recipeHeading = this.page.getByRole('heading', { name: value.hed });
            if (await recipeHeading.isVisible()) {
                await expect(recipeHeading).toBeVisible();
            } else {
                console.log("recipe heading is not visible");
            }
            const recipeText = this.page.getByRole('heading', { name: 'Ingredients' });
            if (await recipeText.isVisible()) {
                await expect(recipeText).toBeVisible();
            }
            else {
                console.log("recipe text is not visible");
            }
            if (value.firstTime) {
                const recipeDirections = this.page.getByText(value.firstTime, { exact: true });


                if (await recipeDirections.isVisible()) {
                    await expect(recipeDirections).toBeVisible();
                }
                else {
                    console.log("recipe directions is not visible");
                }
            }
            if (value.secondTime) {
                const recipeTime = this.page.getByText(value.secondTime, { exact: true });
                if (await recipeTime.isVisible()) {

                    await expect(recipeTime).toBeVisible();
                }
                else {
                    console.log("recipe time is not visible");
                }
            }

            if (value.recipeTexts) {
                for (const text of value.recipeTexts) {
                    const recipeText = this.page.getByText(text);
                    await this.page.waitForTimeout(3000);
                    if (await recipeText.isVisible()) {
                        await expect(recipeText).toBeVisible();
                    } else {
                        console.log(`${text} is not visible`);
                    }
                }
            }

            await this.page.goBack();
            await this.page.waitForTimeout(3000);

        }
    }
}