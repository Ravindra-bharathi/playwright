import { test, expect, Page, selectors } from '@playwright/test';
import { create } from 'domain';
import { css, xpath } from 'playwright-ui5'
// import { xpath} from 'playwright-ui5'


let page: Page;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    // await selectors.register('ui5', css)
    // await selectors.register('ui5', xpath);
    await selectors.register('ui5-css', css);
    await selectors.register('ui5-xpath', xpath);

    await page.goto('https://my415865.s4hana.cloud.sap/ui#Shell-home');
    await page.getByPlaceholder('Email or User Name').fill('naren@basiscloudsolutions.com');
    await page.getByPlaceholder('Password').fill('N@renbcs2024');
    await page.locator("//button[@form='logOnForm']").click();
    await page.waitForTimeout(8000);
});
test.afterAll('teardown', async () => {
    await page.goto('https://my415865.s4hana.cloud.sap/ui#Launchpad-openFLPPage?pageId=SAP_SD_PGT_SALES_MGR_OVR_PC&spaceId=SAP_BR_SALES_MANAGER');
    await page.locator('ui5-xpath=//sap.m.Avatar[@id="userActionsMenuHeaderButton"]').click();
    await page.locator('ui5-css=sap.m.StandardListItem[title="Sign Out"]').click();
    await page.locator('ui5-css=sap.m.Button[text="OK"]').click();
})



async function findAndClickOptionByText(page, searchText, listSelector, maxScrolls = 50, waitTime = 1000) {
    let isTextFound = false;
    let scrollCount = 0;

    while (!isTextFound && scrollCount < maxScrolls) {
        // Wait for a moment before starting the check
        await page.waitForTimeout(waitTime);

        // Locate items within the list
        const items = await page.locator(`ui5-css=sap.m.IconTabFilter[text="${searchText}"]`);
        // Get the count of items found
        const itemCount = await items.count();
        console.log(`Items found: ${itemCount}`);

        for (let i = 0; i < itemCount; i++) {
            // Access each item
            const item = items.nth(i);
            const itemText = await item.innerText();

            if (itemText.trim() === searchText) {
                console.log(`Found the text: "${searchText}". Clicking the item.`);
                await item.scrollIntoViewIfNeeded(); // Ensure it's visible before clicking
                await item.click();
                isTextFound = true;
                break;
            }
        }

        if (!isTextFound) {
            // If text is not found, scroll the list down
            console.log('Text not found in current view. Scrolling...');
            const hasScrolled = await page.evaluate((listSelector) => {
                const list = document.querySelector(listSelector);
                if (list) {
                    const previousScrollTop = list.scrollTop;
                    list.scrollTop += list.clientHeight; // Scroll down by the height of the visible area
                    return list.scrollTop !== previousScrollTop; // Check if scrolling is still possible
                }
                return false;
            }, listSelector);

            if (!hasScrolled) {
                console.error('Reached the end of the list but text was not found.');
                break;
            }

            scrollCount++;
        }
    }

    if (!isTextFound) {
        console.error(`Could not find the text "${searchText}" in the list after ${scrollCount} scrolls.`);
    }
}

test('sales_order', async ({ }) => {
    test.setTimeout(500000);
    const searchText = 'Sales Planning and Analytics';
    const searchCategory = 'Sales Management';
    const itemvisiblity = await page.locator(`ui5-css=sap.m.IconTabFilter[text="${searchCategory}"]`).isVisible();
    console.log(itemvisiblity)
    if (itemvisiblity == true) {
        const parentLocator = page.locator(`ui5-css=sap.m.IconTabFilter[text="${searchCategory}"]`);
        await parentLocator.locator('ui5-css=sap.ui.core.Icon').click();
        await page.waitForTimeout(2000);
        await page.locator(`ui5-css=sap.m.IconTabFilter[text="${searchText}"]`).click();
        // await page.locator(`ui5-css=sap.m.IconTabFilter[text="${searchCategory}"]:has(sap.ui.core.Icon)`).click();        
    }
    else {
        await page.waitForTimeout(5000);
        await page.locator('ui5-xpath=//sap.m.IconTabFilter[@id="__header0-overflow"]').click();
        await page.waitForTimeout(2000);
        await page.waitForSelector('#__popover0-popover-cont'); // Wait for the list to load
        await findAndClickOptionByText(page, searchText, '#__popover0-popover-cont');
    }

    //create sales order part1
    await page.locator('ui5-css=sap.m.Text[text="Create Sales Orders"]').click();
    await page.waitForTimeout(8000);
    await page.locator('ui5-xpath=//sap.ui.core.Icon[@id="APD_::SalesOrderType-inner-vhi"]').waitFor({ state: 'visible' });
    await page.locator('ui5-xpath=//sap.ui.core.Icon[@id="APD_::SalesOrderType-inner-vhi"]').click();
    await page.locator('ui5-css=sap.m.Text[text="Standard Order (OR)"]').click();
    await page.locator('ui5-xpath=//sap.ui.core.Icon[@id="APD_::SalesOrganization-inner-vhi"]').click();
    await page.locator('ui5-css=sap.m.Text[text="BCSO"]').click();
    await page.locator('ui5-xpath=//sap.ui.core.Icon[@id="APD_::DistributionChannel-inner-vhi"]').click();
    await page.locator('ui5-css=sap.m.Text[text="EX"]').click();
    await page.locator('ui5-xpath=//sap.ui.core.Icon[@id="APD_::OrganizationDivision-inner-vhi"]').click();
    await page.locator('ui5-css=sap.m.Text[text="MO"]').click();
    await page.locator('ui5-xpath=//sap.m.Button[@id="fe::APD_::com.sap.gateway.srvd.c_salesordermanage_sd.v0001.CreateWithSalesOrderType::Action::Ok"]').click();

    //create sales order part2---general info
    await page.waitForTimeout(3000);
    await page.locator('ui5-xpath=//sap.ui.core.Icon[@id="cus.sd.salesorderv2.manage::SalesOrderManageObjectPage--fe::FormContainer::OrderData::FormElement::DataField::SoldToParty::Field-edit-inner-vhi"]').click();
    await page.locator('ui5-css=sap.m.Text[text="1000017"]').click();
    await page.waitForTimeout(3000);
    await page.locator('ui5-xpath=//sap.m.Input[@id="cus.sd.salesorderv2.manage::SalesOrderManageObjectPage--fe::FormContainer::OrderData::FormElement::DataField::PurchaseOrderByCustomer::Field-edit"]').click();
    await page.keyboard.type('sample order');


    //create sales order part2---items info
    await page.locator('ui5-xpath=//sap.m.Button[@id="cus.sd.salesorderv2.manage::SalesOrderManageObjectPage--fe::ObjectPage-anchBar-cus.sd.salesorderv2.manage::SalesOrderManageObjectPage--fe::FacetSection::SalesOrderItems-anchor"]').click();
    await page.waitForTimeout(3000);
    const creationRow = await page.locator(`ui5-xpath=//sap.ui.table.CreationRow[@id="cus.sd.salesorderv2.manage::SalesOrderManageObjectPage--fe::table::_Item::LineItem::CreationRow-inner"]`);
    const product = await creationRow.locator(`ui5-css=sap.ui.mdc.field.FieldInput`).nth(0);
    await product.locator('ui5-css=sap.ui.core.Icon').click();
    const materialcode = 'Sample Material';
    await page.waitForTimeout(3000);
    await page.locator(`ui5-css=sap.m.Text[text="${materialcode}"]`).click();
    await creationRow.locator(`ui5-css=sap.ui.mdc.field.FieldInput`).nth(1).click();
    await page.keyboard.type('1');
    await page.waitForTimeout(2000);
    await page.locator('ui5-xpath=//sap.m.Button[@id="cus.sd.salesorderv2.manage::SalesOrderManageObjectPage--fe::table::_Item::LineItem::CreationRow-inner-applyBtn"]').click();
    //create sales order part3---storageinfo
    await page.waitForTimeout(3000);
    await page.locator(`ui5-css=sap.ui.table.RowAction:has(sap.ui.core.Icon)`).nth(0).click();
    const storageInfo = await page.locator(`ui5-xpath=//sap.ui.mdc.field.FieldInput[@id="cus.sd.salesorderv2.manage::SalesOrderItemObjectPage--fe::FormContainer::ShippingInfo::FormElement::DataField::StorageLocation::Field-edit-inner"]`).scrollIntoViewIfNeeded();
    console.log('storage info', storageInfo);
    await page.waitForTimeout(2000);
    await page.locator('ui5-xpath=//sap.ui.core.Icon[@id="cus.sd.salesorderv2.manage::SalesOrderItemObjectPage--fe::FormContainer::ShippingInfo::FormElement::DataField::StorageLocation::Field-edit-inner-vhi"]').click();
    const storageLoc = 'RMSL';
    await page.locator(`ui5-css=sap.m.Text[text="${storageLoc}"]`).click();
    await page.waitForTimeout(2000);
    //create sales order part4---price info  
    await page.locator('ui5-xpath=//sap.m.Button[@id="cus.sd.salesorderv2.manage::SalesOrderItemObjectPage--fe::ObjectPage-anchBar-cus.sd.salesorderv2.manage::SalesOrderItemObjectPage--fe::FacetSection::SalesOrderItemPricesSection-anchor-internalSplitBtn-textButton"]').click();
    await page.locator('ui5-xpath=//sap.m.Button[@id="cus.sd.salesorderv2.manage::SalesOrderItemObjectPage--fe::table::_ItemPricingElement::LineItem::DataFieldForAction::com.sap.gateway.srvd.c_salesordermanage_sd.v0001.CreatePricingElement::com.sap.gateway.srvd.c_salesordermanage_sd.v0001.SalesOrderItemType"]').click();
    await page.locator('ui5-xpath=//sap.ui.mdc.field.FieldInput[@id="APD_::ConditionType-inner"]').click();
    await page.locator('ui5-xpath=//sap.ui.core.Icon[@id="APD_::ConditionType-inner-vhi"]').click();
    await page.waitForTimeout(3000);
    const price_table = page.locator(`ui5-xpath=//sap.ui.table.Table[@id="com.sap.gateway.srvd.c_salesordermanage_sd.v0001.CreatePricingElement::ConditionType::Dialog::qualifier::::Table-innerTable"]`);
    const rows = price_table.locator('ui5-css=sap.ui.table.Row');

    // Loop through the rows
    const rowCount = await rows.count();
    console.log(`Total rows: ${rowCount}`);

    for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);

        // Wait for the row to be visible
        await row.waitFor({ state: 'visible', timeout: 5000 }); // Add timeout for additional safety
        console.log(`Processing row ${i + 1}`);

        // Read text from the row
        const rowText = await row.textContent();
        await page.waitForTimeout(3000);
        console.log(`Row ${i + 1} text: ${rowText}`);

        if (rowText === 'ZZBPZ Price') {
            // Wait for the target element inside the row
            const textElement = row.locator('ui5-css=sap.m.Text').nth(1);
            await textElement.waitFor({ state: 'visible', timeout: 9000 });

            // Click the element
            await textElement.click();
            console.log(`Clicked on 'ZZBPZ Price' in row ${i + 1}`);

            // Exit the loop after clicking
            break;
        }
    }
    await page.locator('ui5-xpath=//sap.m.Button[@id="fe::APD_::com.sap.gateway.srvd.c_salesordermanage_sd.v0001.CreatePricingElement::Action::Ok"]').click();
    await page.waitForTimeout(2000);
    const pricetable = await page.locator('ui5-xpath=//sap.ui.mdc.Table[@id="cus.sd.salesorderv2.manage::SalesOrderItemObjectPage--fe::table::_ItemPricingElement::LineItem"]');
    const pricerow = await pricetable.locator(`ui5-xpath=//sap.m.ColumnListItem[last()]`);
    // const pricerow = await page.locator(`ui5-css=sap.m.ColumnListItem`).nth(4);
    // console.log(pricerow);
    await page.waitForTimeout(3000);
    await pricerow.locator(`ui5-css=sap.ui.mdc.field.FieldInput`).nth(0).click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('100');
    await page.waitForTimeout(2000);
    await page.locator('ui5-xpath=//sap.m.Button[@id="cus.sd.salesorderv2.manage::SalesOrderItemObjectPage--fe::FooterBar::StandardAction::Apply"]').click();
    await page.locator('ui5-xpath=//sap.m.Button[@id="cus.sd.salesorderv2.manage::SalesOrderManageObjectPage--fe::FooterBar::StandardAction::Save"]').click();
    const orderparent = await page.locator('ui5-xpath=//sap.m.VBox').nth(0);
    await page.waitForTimeout(8000);
    const ordernumber = await orderparent.locator(`ui5-xpath=//sap.m.Title`).textContent();
    console.log('order created:', ordernumber);
    await page.waitForTimeout(3000);
})





