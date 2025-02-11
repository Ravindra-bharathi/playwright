import { expect, Page } from "@playwright/test";
import { url } from "../pages/javasaystemVariable";
export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async loginUrl() {
        await this.page.goto(url, { timeout: 90000 });
        await this.page.waitForTimeout(5000);
    }
    async logincredentials() {
        const idBox = this.page.getByRole('textbox', { name: 'User *' });
        if (await idBox.isVisible()) {
            await idBox.fill('replaytest');
        }
        else {
            console.log("id is not filled in id feild")
        }
        const PasswordBox = this.page.getByRole('textbox', { name: 'Password *' });
        if (await PasswordBox.isVisible()) {
            await PasswordBox.click();
            await PasswordBox.fill('H3r3andTh3r3')
        }
        else {
            console.log("password is not filled in the feild")
        }

        const loginButton = this.page.getByRole('button', { name: 'Log On' });
        if (await loginButton.isVisible()) {
            await loginButton.click()
        }
        else {
            console.log("login button is not visible")
        }
    }
    async homepageVerifiction() {
        await this.page.waitForTimeout(2000);
        const heading = this.page.getByText('SAP NetWeaver Administrator', { exact: true });
        if (await heading.isVisible()) {
            await expect(heading).toBeVisible();
        }
        else {
            console.log(heading, 'is not visible in the page')
        }
    }

    async searchDestnation() {
        const textbox = this.page.getByRole('textbox');
        if (await textbox.isVisible()) {
            await textbox.click();
            await textbox.fill('Destination');
        } else {
            console.log('textbox search value is not filled ')
        }
        const goButn = this.page.getByRole('cell', { name: 'Go', exact: true }).locator('div');
        if (await goButn.isVisible()) {
            await goButn.click();
        }
        else {
            console.log('search go button is not visible')
        }

        await this.page.waitForTimeout(2000);
    }

    async destination() {
        const destination = this.page.locator('[id="CEPJFMAJ\\.WorkCenterOverviewView\\.titl1"]');

        if (await destination.isVisible()) {
            await this.page.waitForTimeout(2000);
            await expect(destination).toBeVisible();
        }
        else {
            console.log(destination, "destination is not visible to click")
        }
        const destinationButton = this.page.locator('[id="CEPJFMAJ\\.WorkCenterOverviewView\\._79"]');
        ;
        if (await destinationButton.isVisible()) {
            await destinationButton.click();

        }
        else {
            console.log('not in destination page ');
        }
    }



    async clickCreateDestination() {
        await this.page.waitForTimeout(2000);
        const createDestination = this.page.locator('[id="CEPJICNK\\.MainView\\.CreateButton"]');
        if (await createDestination.isVisible()) {
            await createDestination.click();
            await this.page.waitForTimeout(2000);
        }
        else {
            console.log('create destination is not visible');
        }

        const destinationName = this.page.getByRole('textbox', { name: 'Name of the Destination' });
        if (await destinationName.isVisible()) {
            await this.page.waitForTimeout(2000);
            await destinationName.click();
            await destinationName.fill('TestPublicAPI');
        }
        else {
            console.log('destination name is not visible');
        }
        await this.page.waitForTimeout(2000);
        const destinationType = this.page.locator('[id="CEPJICNK\\.GeneralPropsView\\.DestTypeID"]');
        if (await destinationType.isVisible()) {
            const destinationTypeOption = this.page.locator('[id="CEPJICNK\\.GeneralPropsView\\.DestTypeID-btn"]');
            if (await destinationTypeOption.isVisible()) {
                await destinationTypeOption.click();
                await this.page.waitForTimeout(2000);
            }
            else {
                console.log('destination type is not visible');
            }
            const destinationTypeOptionValue = this.page.locator('iframe[name="URLSPW-0"]').contentFrame().getByText('HTTP', { exact: true });
            if (await destinationTypeOptionValue.isVisible()) {
                await destinationTypeOptionValue.click();
            }
            else {
                console.log('destination type value is not visible');
            }
        }
        const nextButton = this.page.locator('[id="CEPJICNK\\.WizardView\\.WizNextButton"]');
        if (await nextButton.isVisible()) {
            await nextButton.click();
        }
        else {
            console.log('next button is not visible');
        }
        await this.page.waitForTimeout(2000);
        const destinationUrl = this.page.getByRole('textbox', { name: 'URL the destination points to' });
        if (await destinationUrl.isVisible()) {
            await this.page.waitForTimeout(2000);
            await destinationUrl.click();
            await destinationUrl.fill('http://168.61.98.131:50000/');
        }
        else {
            console.log('destination url is not visible');
        }
        await this.page.waitForTimeout(2000);
        const sidBox = this.page.getByRole('textbox', { name: 'ID of SAP System' });
        if (await sidBox.isVisible()) {
            await this.page.waitForTimeout(2000);
            await sidBox.click();
            await sidBox.fill('BCS');
        }
        else {
            console.log('sid is not visible');
        }

        if (await nextButton.isVisible()) {
            await nextButton.click();
        }
        else {
            console.log('next button is not visible');
        }
        await this.page.waitForTimeout(2000);

        const dropdown = this.page.locator('[id="CEPJICNKNJDI\\.AuthPropsView\\.DropDownByIndex2-btn"]');
        if (await dropdown.isVisible()) {
            await dropdown.click();
        }
        else {
            console.log('dropdown is not visible');
        }
        await this.page.waitForTimeout(2000);

        const dropdownValue = this.page.locator('[id="CEPJICNKNJDI\\.AuthPropsView\\.DropDownByIndex2-btn"]');
        if (await dropdownValue.isVisible()) {
            await this.page.waitForTimeout(2000);
            const dropdownValueOption = this.page.getByText('Basic (User ID and Password)');
            if (await dropdownValueOption.isVisible()) {
                await dropdownValueOption.click();
            }
            else {
                console.log('dropdown value is not visible');
            }

        }
        else {
            console.log('dropdown value is not visible');
        }
        await this.page.waitForTimeout(2000);
        const userName = this.page.locator('[id="CEPJICNKNJDI\\.AuthPropsView\\.Username"]');
        if (await userName.isVisible()) {
            await userName.click();
            await userName.fill('replaytest');
        }
        else {
            console.log('user name is not visible');
        }
        const password = this.page.locator('[id="CEPJICNKNJDI\\.AuthPropsView\\.Password"]');
        if (await password.isVisible()) {
            await password.click();
            await password.fill('H3r3andTh3r3');
        }
        else {
            console.log('password is not visible');
        }
        await this.page.waitForTimeout(2000);

        const finishButton = this.page.locator('[id="CEPJICNK\\.WizardView\\.WizFinishButton"]');
        if (await finishButton.isVisible()) {
            await finishButton.click()
            await this.page.waitForTimeout(2000);
        }

        const successElement = this.page.getByText('Destination TestPublicAPI saved successfully on hosting system Local Java');
        const successText = await successElement.textContent();

        console.log(successText);

    }
}