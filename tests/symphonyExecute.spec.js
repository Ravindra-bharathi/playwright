import { test, chromium } from '@playwright/test';
import { symphonyLoginPage } from '../POMFile/symphonyLoginPage';
import { symphonyLogoutPage } from '../POMFile/symphonyLogoutPage';
import { symphonyMain } from '../POMFile/symphonyMain';
import { checkbox, customerCode, customerId, logInButton, MSloginLink, nextButton, password, passwordbox, signinButton, userId, userIdIs, username, usernamebox, userPassword, userPasswordIs, yesButton, approveButton, checkmessage, ClickAuditTrail, clickinitiatedByBar, ClickSearchButton, clickTemplateList, DNDTemplatbackButton, eyeButton, fillTheText3, popUpLink, templateID, tempscuccesfuly, executeButton, jobTitleName, jobName, jobId, backButton, ExecuteTheTemplate, resultOfTheStatus, checkmessageFinalResult, resultOfTheStatus1, backButtonOnTheResultPage, statusOfTemplate, DragandDropButton, logOutButton, profileIcon } from "../POMFile/symphonyExecuteVariable";


let context;
let browser;
let page;
test.setTimeout(800000)
test.describe(() => {
    test.beforeAll(async ({ browser }) => {
        test.setTimeout(800000);
        // browser = await chromium.launch()
        // context = await browser.newContext()
        page = await browser.newPage()

        //lOGIN SYMPHONYs
        const symphonylogin = new symphonyLoginPage(page)

        await symphonylogin.LoginDev(MSloginLink, usernamebox, username, nextButton, passwordbox, password, signinButton, checkbox, yesButton)
        await symphonylogin.loginSymphony(customerCode, customerId, userId, userIdIs, userPassword, userPasswordIs, logInButton)
        //console.log(res);
    })

    //LOGOUT SYMPHONY
    test.afterAll(async () => {
        await page.waitForTimeout(3000)
        const symphonyLogOut = new symphonyLogoutPage(page)
        await symphonyLogOut.logOut(DragandDropButton, profileIcon, logOutButton)
    })

    test('execute_page', async () => {
        const mainPage = new symphonyMain(page)
        await mainPage.checkStatus(DragandDropButton, clickTemplateList, ClickSearchButton, templateID, eyeButton, approveButton, popUpLink, tempscuccesfuly, statusOfTemplate, DNDTemplatbackButton, backButton, ClickAuditTrail, clickinitiatedByBar, fillTheText3, checkmessage, ExecuteTheTemplate, jobTitleName, jobName, executeButton, jobId, resultOfTheStatus, resultOfTheStatus1, backButtonOnTheResultPage, checkmessageFinalResult)
    })

});