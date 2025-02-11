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
    async ModifyUser() {
        await this.page.waitForTimeout(5000);
        const searchBox = this.page.getByRole('textbox', { name: 'Enter a search string' });
        if (await searchBox.isVisible()) {
            await this.page.waitForTimeout(2000);
            await searchBox.click();
            await searchBox.fill('test');
            await searchBox.press('Enter');
            await this.page.waitForTimeout(2000);
        } else {
            console.log('Search box is not visible');
        }
        await this.page.waitForTimeout(2000);
        const userDetails = 'User Active testuser_01 Test, User   UME Database';
        const rowSelection = this.page.getByRole('row', { name: userDetails, exact: true });

        if (await rowSelection.isVisible()) {
            await rowSelection.locator('div').nth(1).click();
        } else {
            console.log('User row not found');
        }
        await this.page.waitForTimeout(5000);
        const editButton = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.DisplayUserView\\.edit"]');
        if (await editButton.isVisible()) {
            await editButton.click();
        } else {
            console.log('Edit button not found');
        }
        await this.page.waitForTimeout(5000);
        const rolesTab = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.associatedRoles-title"]');
        if (await rolesTab.isVisible()) {
            await this.page.waitForTimeout(2000);
            await rolesTab.click();
        } else {
            console.log('Roles tab not found');
        }
        await this.page.waitForTimeout(2000);

        const existingRoleRow = this.page.getByRole('row', { name: 'Role Administrator Administrator UME Database', exact: true });
        if (await existingRoleRow.isVisible()) {
            await this.page.waitForTimeout(2000);
            await existingRoleRow.locator('div').nth(1).click();
            const removeButton = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJAHAG\\.RemoveParentRolesView\\.buttonRoleRemove"]');
            if (await removeButton.isVisible()) {
                await this.page.waitForTimeout(2000);
                await removeButton.click();
            } else {
                console.log('Remove role button not found');
            }
        } else {
            console.log('Existing role not found');
        }
        await this.page.waitForTimeout(2000);

        const assignRoleButton = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJAHAG\\.AssignParentRolesView\\.DatasourcesDDBI-btn"]');
        if (await assignRoleButton.isVisible()) {
            await this.page.waitForTimeout(2000);
            await assignRoleButton.click();
        } else {
            console.log('Assign role button not found');
        }
        await this.page.waitForTimeout(2000);

        const roleSelection = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJAHAG\\.AssignParentRolesView\\.Datasources\\.displayName-key-2"]');
        if (await roleSelection.isVisible()) {
            await this.page.waitForTimeout(2000);
            await roleSelection.click();
        } else {
            console.log('Role selection not found');
        }
        await this.page.waitForTimeout(2000);

        const roleSearchButton = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJAHAG\\.AssignParentRolesView\\.buttonRoleSearch"]');
        if (await roleSearchButton.isVisible()) {
            await this.page.waitForTimeout(2000);

            await roleSearchButton.click();
        } else {
            console.log('Role search button not found');
        }
        await this.page.waitForTimeout(2000);

        if (await existingRoleRow.isVisible()) {
            await this.page.waitForTimeout(2000);
            await existingRoleRow.locator('div').nth(1).click();
            const addRoleButton = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJAHAG\\.AssignParentRolesView\\.buttonRoleAdd"]');
            if (await addRoleButton.isVisible()) {
                await this.page.waitForTimeout(2000);
                await addRoleButton.click();
            } else {
                console.log('Add role button not found');
            }
        } else {
            console.log('New role row not found');
        }
        await this.page.waitForTimeout(2000);

        const saveButton = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.save"]');
        if (await saveButton.isVisible()) {
            await this.page.waitForTimeout(5000);
            await saveButton.click();
            await expect(this.page.getByText('User attributes modified')).toBeVisible({ timeout: 5000 });
        } else {
            console.log('Save button not found');
        }
    }
}