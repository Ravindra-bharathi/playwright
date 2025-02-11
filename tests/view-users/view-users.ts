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

    async searchUsers() {
        const textbox = this.page.getByRole('textbox');
        if (await textbox.isVisible()) {
            await textbox.click();
            await this.page.waitForTimeout(2000);
            await textbox.fill('users');
        } else {
            console.log('textbox search value is not filled ')
        }
        const goButn = this.page.getByRole('cell', { name: 'Go', exact: true }).locator('div');
        if (await goButn.isVisible()) {
            await this.page.waitForTimeout(2000);
            await goButn.click();
        }
        else {
            console.log('search go button is not visible')
        }

        await this.page.waitForTimeout(2000);
    }
    async verificationSearch() {
        const searchresult = this.page.getByText('Identity Management');
        if (await searchresult.isVisible()) {
            await this.page.waitForTimeout(2000);
            await expect(searchresult).toBeVisible();
        }
        else {
            console.log(searchresult, 'search go searchresultgo')
        }
        const overview = this.page.getByTitle('Overview');
        if (await overview.isVisible()) {
            await this.page.waitForTimeout(2000);
            await overview.click();
        }
        else {
            console.log('overview is not visible')
        }
        await this.page.waitForTimeout(2000);
        const usersPage = this.page.getByText('Identity Management: Overview');
        if (await usersPage.isVisible()) {
            await this.page.waitForTimeout(2000);
            await expect(usersPage).toBeVisible();
        }
        else {
            console.log('users page is not visible')
        }
    }
    async searchUser() {
        const searchBox = this.page.getByRole('textbox', { name: 'Enter a search string' });
        if (await searchBox.isVisible()) {
            await searchBox.click();
            await searchBox.fill('test');
            await searchBox.press('Enter');
            await this.page.waitForTimeout(5000);
        } else {
            console.log('Search box is not visible');
            return;
        }

        const userDetails = 'User Active testuser_01 Test, User   UME Database';
        const rowSelection = this.page.getByRole('row', { name: userDetails, exact: true });
        if (await rowSelection.isVisible()) {
            await this.page.waitForTimeout(2000);
            await rowSelection.locator('div').nth(1).click();
        } else {
            console.log('User row not found');
            return;
        }

        const sections = [
            'generalInformation',
            'accountInformation',
            'contactInformation',
            'additionalInformation',
            'associatedRoles',
            'associatedGroups',
            'userMapping'
        ];

        for (const section of sections) {
            const locator = this.page.locator(`[id="CEPJICNKCBKIAFHGJKNEPINJ\.DisplayUserView\.${section}-title"]`);
            if (await locator.isVisible()) {
                await this.page.waitForTimeout(2000);
                await locator.click();
                await this.page.waitForTimeout(5000);
                await this.page.screenshot({ path: `sap/view-users/screenshot_(${section}).png`, fullPage: true });

            } else {
                console.log(`${section} section not found`);
            }
            await this.page.waitForTimeout(5000);
        }
    }
}