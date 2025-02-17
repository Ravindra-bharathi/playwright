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
    async checkDestination() {
        await this.page.waitForTimeout(5000)
        const search = this.page.locator('[id="CEPJICNK\\.MainView\\.DestinationList\\:2147483641"]');
        if (await search.isVisible()) {
            await search.click();
            await search.fill('TestPublicAPI');
            await this.page.waitForTimeout(2000)
            await search.press('Enter');
            await this.page.waitForTimeout(2000)
            const searchResult = this.page.getByText('TestPublicAPI', { exact: true });
            if (await searchResult.isVisible()) {
                await this.page.waitForTimeout(2000)
                await searchResult.click();
            }
            else {
                console.log('search result is not visible');
            }
            const ping = this.page.locator('[id="CEPJICNK\\.DetailsView\\.PingButton"]');
            if (await ping.isVisible()) {
                await this.page.waitForTimeout(2000)
                await ping.click();
            }
            else {
                console.log('ping is not visible')
            }
            await this.page.waitForTimeout(2000)
            const pingResult = this.page.getByText('Successfully connected to');
            const pingText = await pingResult.textContent();

            console.log(pingText);
            console.log(`**gbStart**PingText**splitKeyValue**${pingText}**gbEnd**`)
            await this.page.waitForTimeout(2000)
            const connect = this.page.locator('[id="CEPJICNK\\.DetailsView\\.Con_TLS_Props_Interface_View_Tab-title"]');
            if (await connect.isVisible()) {
                await this.page.waitForTimeout(2000)
                await connect.click()
                await this.page.screenshot({ path: `sap/destnation/screenshotDestnation_.png`, fullPage: true });
                await this.page.waitForTimeout(2000)
            }
            else {
                console.log('connect is not visible');
            }
            const logon = this.page.locator('[id="CEPJICNK\\.DetailsView\\.Auth_Props_Interface_View_Tab-title"]');
            if (await logon.isVisible()) {
                await logon.click();
                await this.page.waitForTimeout(2000);
                await this.page.screenshot({ path: `sap/destnation/screenshotDestnationLogon_.png`, fullPage: true });
                await this.page.waitForTimeout(2000);
            }
            else {
                console.log("logon is not clicked ....")
            }


        }
        else {
            console.log('search is not visible')
        }
    }
}