import { expect, Page } from "@playwright/test";
import { url } from "../pages/javasaystemVariable";
export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async loginUrl() {
        await this.page.goto('http://168.61.98.131:50000/nwa', { timeout: 90000 });
        await this.page.waitForTimeout(5000);
    }
    async logincredentials() {
        const idBox = this.page.getByRole('textbox', { name: 'User *' });
        if (await idBox.isVisible()) {
            await idBox.fill('$username');
        }
        else {
            console.log("id is not filled in id feild")
        }
        const PasswordBox = this.page.getByRole('textbox', { name: 'Password *' });
        if (await PasswordBox.isVisible()) {
            await PasswordBox.click();
            await PasswordBox.fill('$password')
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
    async createUser() {
        await this.page.waitForTimeout(2000);
        const createuser = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.UserSearchResultView\\.CreateButton"]');
        if (await createuser.isVisible()) {
            await this.page.waitForTimeout(2000);
            await createuser.click();
        }
        else {
            console.log('create user is not visible')
        }
        await this.page.waitForTimeout(2000);
        const genralInformations = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.generalInformation-title"]')
        if (await genralInformations.isVisible()) {
            await this.page.waitForTimeout(2000);
            await expect(genralInformations).toBeVisible();
        }
        else {
            console.log('genralInformations is not visible')
        }
        await this.page.waitForTimeout(2000);
        const loginId = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.LogonId"]')
        if (await loginId.isVisible()) {
            await loginId.click();
            await loginId.fill('testuser_01');
        }
        else {
            console.log('loginId is not visible')
        }
        await this.page.waitForTimeout(2000);
        const password = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.newPassword"]')
        if (await password.isVisible()) {
            await password.click();
            await this.page.waitForTimeout(2000);
            await password.fill('TestUser@123');
        }
        else {
            console.log('password is not visible')
        }
        await this.page.waitForTimeout(2000);
        const confirmPassword = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.confirmPassword"]')
        if (await confirmPassword.isVisible()) {
            await confirmPassword.click();
            await this.page.waitForTimeout(2000);
            await confirmPassword.fill('TestUser@123');
        }
        else {
            console.log('confirmPassword is not visible')
        }
        const firstName = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.lastName"]');
        if (await firstName.isVisible()) {
            await firstName.click();
            await this.page.waitForTimeout(2000);
            await firstName.fill('Test');
        }
        else {
            console.log('firstName is not visible')
        }
        const lastName = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.firstName"]');
        if (await lastName.isVisible()) {
            await lastName.click();
            await this.page.waitForTimeout(2000);
            await lastName.fill('User');
        }
        else {
            console.log('lastName is not visible')
        }
        const assignRoleTab = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.associatedRoles-title"]')
        if (await assignRoleTab.isVisible()) {
            await this.page.waitForTimeout(2000);
            await assignRoleTab.click();
        } else {
            console.log("assignRoleTab is not visible");
        }
        await this.page.waitForTimeout(5000);
        const dropdown = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJAHAG\\.AssignParentRolesView\\.DatasourcesDDBI-btn"]')
        if (await dropdown.isVisible()) {
            await this.page.waitForTimeout(2000);
            await dropdown.click()
        }
        else {
            console.log('dropdown isnot clickible');
        }
        await this.page.waitForTimeout(2000);
        const dropdownValue = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJAHAG\\.AssignParentRolesView\\.Datasources\\.displayName-key-2"]')
        if (await dropdownValue.isVisible()) {
            await this.page.waitForTimeout(2000);
            await dropdownValue.click();
        }
        else {
            console.log('dropdown value is not visble to click')
        }
        await this.page.waitForTimeout(2000);
        const goButn = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJAHAG\\.AssignParentRolesView\\.buttonRoleSearch"]')
        if (await goButn.isVisible()) {
            await this.page.waitForTimeout(2000);
            await goButn.click()
        }
        else {
            console.log('go button is not click')
        }
        await this.page.waitForTimeout(5000);
        const adminRow = this.page.getByRole('row', { name: 'Role Administrator Administrator UME Database', exact: true }).locator('div').nth(1)
        if (await adminRow.isVisible()) {
            await this.page.waitForTimeout(2000);
            await adminRow.click();
            await this.page.waitForTimeout(5000);
            const addBtn = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJAHAG\\.AssignParentRolesView\\.buttonRoleAdd"]')
            if (await addBtn.isVisible()) {
                await this.page.waitForTimeout(2000);
                await addBtn.click()
            }
            else {
                console.log('add button is not visible');
            }
            await this.page.waitForTimeout(5000);
        }
        else {
            console.log('adminRow is not visible');
        }
        const assignGroupTab = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.associatedGroups-title"]');
        if (await assignGroupTab.isVisible()) {
            await this.page.waitForTimeout(2000);
            await assignGroupTab.click()
        }
        else {
            console.log('assign Group tab is not visible')
        }
        await this.page.waitForTimeout(5000);
        const assignGroupDropdown = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJEKFD\\.AssignParentGroupsView\\.DatasourcesDDBI-btn"]')
        if (await assignGroupDropdown.isVisible()) {
            await this.page.waitForTimeout(2000);
            await assignGroupDropdown.click()
            await this.page.waitForTimeout(2000);
            const assignGroupDropdownValue = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJEKFD\\.AssignParentGroupsView\\.Datasources\\.displayName-key-2"]')
            if (await assignGroupDropdownValue.isVisible()) {
                await this.page.waitForTimeout(2000);
                await assignGroupDropdownValue.click();
            }
            else {
                console.log('assign group Dropdown value is not clickable')
            }
            await this.page.waitForTimeout(5000);
            const goButton = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJEKFD\\.AssignParentGroupsView\\.buttonGroupSearch"]')
            if (await goButton.isVisible()) {
                await this.page.waitForTimeout(2000);
                await goButton.click()
            } else {
                console.log('go button is not visible')
            }
            await this.page.waitForTimeout(5000);
            const Tablevalue = this.page.getByRole('row', { name: 'Group SAP_SLD_ADMINISTRATOR SAP_SLD_ADMINISTRATOR group UME Database', exact: true }).locator('div').nth(1)
            if (await Tablevalue.isVisible()) {
                await this.page.waitForTimeout(2000);
                await Tablevalue.click();
            } else {
                console.log('table value is not avalible');
            }
            await this.page.waitForTimeout(5000);
            const addButton = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJEKFD\\.AssignParentGroupsView\\.buttonGroupAdd"]')
            if (await addButton.isVisible()) {
                await this.page.waitForTimeout(2000);
                await addButton.click();
            } else {
                console.log("add button is not avaiable")
            }
            await this.page.waitForTimeout(5000);


            const Tablevalue2 = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJEKFD\\.AssignParentGroupsView\\.availableGroups\\:4\\.3"] div').nth(1)
            if (await Tablevalue2.isVisible()) {
                await this.page.waitForTimeout(2000);
                await Tablevalue2.click();
            }
            else {
                console.log('table value 2 is not visible')
            }
            await this.page.waitForTimeout(5000);
            await addButton.click();

        }
        else {
            console.log('assignGroup dropdown is not visible')
        }
        await this.page.waitForTimeout(5000);
        const saveButton = this.page.locator('[id="CEPJICNKCBKIAFHGJKNEPINJ\\.ModifyUserView\\.save"]');
        if (await saveButton.isVisible()) {
            await this.page.waitForTimeout(2000);
            await saveButton.click()
        }
        else {
            console.log('save button is not visible');
        }
        await this.page.waitForTimeout(5000);
        const savedValue = this.page.getByText('testuser_check', { exact: true })
        if (await savedValue.isVisible()) {
            await expect(savedValue).toBeVisible()
            const result = await savedValue.textContent()
            console.log(result, 'value')
            console.log(`**gbStart**created user**splitKeyValue**${result}**gbEnd**`)
        }
        else {
            console.log('user is not created there is an issue in creating user')
        }
        await this.page.waitForTimeout(5000);

    }



}