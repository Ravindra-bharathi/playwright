import { test, Page, selectors } from '@playwright/test';
import { css, xpath } from 'playwright-ui5'
import { managepurchaseorder, userName, userPassword } from './sapui5variable';

test.describe(() => {
    test.setTimeout(800000);
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test('SAPui5', async () => {
        await selectors.register('ui5-css', css);
        await selectors.register('ui5-xpath', xpath);
        await page.goto('https://my415865.s4hana.cloud.sap/ui#/Shell-home');
        await page.waitForTimeout(10000);
        await page.getByPlaceholder('Email or User Name').click();
        await page.getByPlaceholder('Email or User Name').fill(userName);
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill(userPassword);
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.waitForTimeout(8000);
        for (const click of managepurchaseorder) {
            await page.getByLabel('Open Search').click();
            await page.getByPlaceholder('Search In: "My Favorites"').click();
            await page.getByPlaceholder('Search In: "My Favorites"').fill(click.orderName);
            await page.getByPlaceholder('Search In: "My Favorites"').press('Enter');
            await page.getByLabel('Manage Purchase Orders Tile').click();
            await page.waitForTimeout(8000);
            await page.locator('ui5-css=sap.m.Button[text="Create"]').click();
            await page.waitForTimeout(8000);
            const currency = page.locator('ui5-xpath=//sap.m.Input[@id="ui.ssuite.s2p.mm.pur.po.manage.st.s1::sap.suite.ui.generic.template.ObjectPage.view.Details::C_PurchaseOrderTP--GeneralInformationFacet1::DocumentCurrency::Field-input"]');
            await currency.click();
            await currency.type(click.currency);
            await currency.press('Enter');
            await page.waitForTimeout(2000);
            const supplier = page.locator('ui5-xpath=//sap.m.Input[@id="ui.ssuite.s2p.mm.pur.po.manage.st.s1::sap.suite.ui.generic.template.ObjectPage.view.Details::C_PurchaseOrderTP--GeneralInformationFacet1::Supplier::Field-input"]');
            await supplier.click();
            await supplier.type(click.supplier);
            await supplier.press('Enter');
            await page.waitForTimeout(2000);
            const group = page.locator('ui5-xpath=//sap.m.Input[@id="ui.ssuite.s2p.mm.pur.po.manage.st.s1::sap.suite.ui.generic.template.ObjectPage.view.Details::C_PurchaseOrderTP--GeneralInformationFacet2::PurchasingGroup::Field-input"]');
            await group.click();
            await group.type(click.groupinput);
            await group.press('Enter');
            await page.waitForTimeout(2000);
            const Qragainzation = page.locator('ui5-xpath=//sap.m.Input[@id="ui.ssuite.s2p.mm.pur.po.manage.st.s1::sap.suite.ui.generic.template.ObjectPage.view.Details::C_PurchaseOrderTP--GeneralInformationFacet2::PurchasingOrganization::Field-input"]');
            await Qragainzation.click();
            const Qragainzationtext = Qragainzation.textContent();
            if (await Qragainzationtext === '') {
                await Qragainzation.type(click.Qragainzation);
                await Qragainzation.press('Enter');
                await page.waitForTimeout(2000);
            }
            const company = page.locator('ui5-xpath=//sap.m.Input[@id="ui.ssuite.s2p.mm.pur.po.manage.st.s1::sap.suite.ui.generic.template.ObjectPage.view.Details::C_PurchaseOrderTP--GeneralInformationFacet2::CompanyCode::Field-input"]');
            await company.click();
            await company.type(click.company);
            await company.press('Enter');
            await page.waitForTimeout(4000);
            await page.screenshot({ path: 'pages/sap/sapUi5Img/basisData.png', fullPage: true });
            await page.locator('ui5-xpath=//sap.m.Button[@id="ui.ssuite.s2p.mm.pur.po.manage.st.s1::sap.suite.ui.generic.template.ObjectPage.view.Details::C_PurchaseOrderTP--ItemsFacet::addEntry"]').click();
            await page.waitForTimeout(4000);
            const materialloc = page.locator('ui5-css=sap.ui.comp.SmartToggle');
            const material = materialloc.locator('ui5-css=sap.m.Input');
            await material.first().click();
            await material.first().type(click.material);
            await material.first().press('Enter');
            await page.waitForTimeout(2000);
            const mainorder = page.locator('ui5-css=sap.ui.comp.SmartToggle');
            const order = mainorder.locator('ui5-css=sap.m.Input');
            await order.nth(3).first().click();
            await order.nth(3).first().press('Control+A');
            await order.nth(3).first().press('Backspace');
            await order.nth(3).first().type(click.orderQuantity);
            await page.waitForTimeout(2000);
            const mainnetorder = page.locator('ui5-css=sap.ui.comp.SmartToggle')
            const netorder = mainnetorder.locator('ui5-css=sap.m.Input');
            await netorder.nth(5).click();
            await netorder.nth(5).press('Control+A');
            await netorder.nth(5).press('Backspace');
            await netorder.nth(5).type(click.netOrder);
            await netorder.nth(5).press('Enter');
            await page.waitForTimeout(4000);
            await page.screenshot({ path: 'pages/sap/sapUi5Img/itemOneTable.png', fullPage: true });
            await page.locator('ui5-xpath=//sap.m.Button[@id="ui.ssuite.s2p.mm.pur.po.manage.st.s1::sap.suite.ui.generic.template.ObjectPage.view.Details::C_PurchaseOrderTP--activate"]').click();
            await page.waitForTimeout(10000);
            const orderData = await page.locator('ui5-xpath=//sap.m.Title[@id="ui.ssuite.s2p.mm.pur.po.manage.st.s1::sap.suite.ui.generic.template.ObjectPage.view.Details::C_PurchaseOrderTP--template::ObjectPage::ObjectPageDynamicHeaderTitle"]').textContent();
            await page.waitForTimeout(2000);
            await page.screenshot({ path: 'pages/sap/sapUi5Img/orderNumber.png', fullPage: true });
            console.log(`**gbStart**Manage_PO_id**splitKeyValue**${orderData}**gbEnd**`);
            console.log(orderData, 'Manage Purchase Order is created');
            await page.waitForTimeout(3000);
        }
    });
});