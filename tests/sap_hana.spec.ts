// import test, { chromium } from "@playwright/test";

// test.describe("SAP Hana Sales Order Tests", () => {
//   let page: any;
//   let browser: any;

//   test.beforeAll(async () => {
//     test.setTimeout(120000);
//     browser = await chromium.launch({ headless: false });
//     const context = await browser.newContext();
//     page = await context.newPage();

//     await page.goto(
//       "https://my415865.s4hana.cloud.sap/ui#Launchpad-openFLPPage?pageId=SAP_SD_PGT_SALES_MGR_OVR_PC&spaceId=SAP_BR_SALES_MANAGER"
//     );

//     await page.getByPlaceholder("Email or User Name").fill('naren@basiscloudsolutions.com');
//     await page.getByPlaceholder("Password").fill('N@renbcs2024');
//     await page.getByRole("button", { name: "Continue" }).click();
//   });

//   test("Create a Sales Order", async () => {
//     await page.getByLabel("Create Sales Orders Tile").click();

//     // Interact with fields to create a sales order
//     await page.locator('[id="APD_\\:\\:SalesOrderType-inner-vhi"]').click();
//     await page.getByText('Standard Order (OR)').click();
//     await page.getByLabel("Sales Organization").click();
//     await page.getByRole("gridcell", { name: "BCSO" }).click();
//     await page.getByLabel("Distribution Channel").click();
//     await page.getByRole("gridcell", { name: "EX", exact: true }).click();
//     await page.getByLabel('Division').fill('mobile');
//     await page.locator('[id="__wrapper68-com\\.sap\\.gateway\\.srvd\\.c_salesordermanage_sd\\.v0001\\.CreateWithSalesOrderType\\:\\:OrganizationDivision\\:\\:Popover\\:\\:qualifier\\:\\:\\:\\:SuggestTable-0"]').click();
//     await page.getByRole("button", { name: "Continue" }).click();
//     const customerField = page.locator(
//       '[id^="cus.sd.salesorderv2.manage::SalesOrderManageObjectPage--fe::FormContainer::OrderData::FormElement::DataField::SoldToParty::Field-edit-inner-inner"]'
//     );
//     await customerField.waitFor({ state: 'visible' });
//     await customerField.click();
//     await customerField.fill("Z");
//     await page.getByRole("gridcell", { name: "Z test company" }).click();

//     await page.getByLabel("Customer Reference").fill("Test");
//     await page.getByRole("textbox", { name: "Product" }).fill("sa");
//     await page.getByText("Sample Material").click({ timeout: 60000 });

//     // Locate the input field and fill it with "1"
//     const inputLocator = page.locator('[id="__field4-__clone75-__clone134-inner-inner"]');
//     await inputLocator.waitFor({ state: 'visible', timeout: 30000 });
//     await inputLocator.fill("1");

//     // Click the 'Add Row' button
//     const addRowButton = page.getByLabel('Add Row', { exact: true });
//     await addRowButton.waitFor({ state: 'visible', timeout: 30000 });
//     await addRowButton.click();

//     // Wait for the 'Details' element to become visible
//     const detailsElement = page.getByLabel('Details', { exact: true });
//     await detailsElement.click();


//     // Wait for the 'Storage Location' field to be visible
//     const storageLocation = page.getByLabel('Storage Location');
//     await page.locator('body').waitFor({ state: 'stable', timeout: 30000 });


//     await page.getByLabel('Storage Location').click({ timeout: 3000 });
//     await page.getByLabel('Storage Location').fill('ra');
//     // Wait for the Prices button and click it
//     await page.getByRole("button", { name: "Prices", exact: true }).click();

//     // Locate the specific pricing element (use refined locator or filtering)
//     const pricingElement = page.locator('[id^="cus\\.sd\\.salesorderv2\\.manage"]').filter({
//       hasText: "Pricing Element Text",
//     });

//     const create = page.locator('//*[@id="cus.sd.salesorderv2.manage::SalesOrderItemObjectPage--fe::table::_ItemPricingElement::LineItem::DataFieldForAction::com.sap.gateway.srvd.c_salesordermanage_sd.v0001.CreatePricingElement::com.sap.gateway.srvd.c_salesordermanage_sd.v0001.SalesOrderItemType"]');
//     await create.click();
//     await page.getByText('Z Price').click();
//     await page.locator('[id="fe\\:\\:APD_\\:\\:com\\.sap\\.gateway\\.srvd\\.c_salesordermanage_sd\\.v0001\\.CreatePricingElement-footer"]').getByRole('button', { name: 'Create' }).click();
//     await page.locator('[id="__field40-__clone312-__clone342-inner-inner"]').click();
//     await page.locator('[id="__field40-__clone312-__clone342-inner-inner"]').fill('100,00');

//     // Wait for and click the Apply button
//     const applyButton = page.getByLabel("Apply");
//     await applyButton.waitFor({ state: 'visible', timeout: 60000 });
//     await applyButton.click();

//   });

//   test.afterAll(async () => {
//     await browser.close();
//   });
// });

import test, { chromium } from "@playwright/test";

test.describe("SAP Hana Sales Order Tests", () => {
  let page: any;
  let browser: any;

  // test.beforeAll(async () => {

  // });

  test("Create a Sales Order", async () => {
    test.setTimeout(200000);
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(
      "https://my415865.s4hana.cloud.sap/ui#Launchpad-openFLPPage?pageId=SAP_SD_PGT_SALES_MGR_OVR_PC&spaceId=SAP_BR_SALES_MANAGER"
    );
    await page.getByPlaceholder("Email or User Name").fill('naren@basiscloudsolutions.com');
    await page.getByPlaceholder("Password").fill('N@renbcs2024');
    await page.getByRole("button", { name: "Continue" }).click();


    await page.getByLabel("Create Sales Orders Tile").click();

    await page.locator('[id="APD_\\:\\:SalesOrderType-inner-vhi"]').click();
    await page.locator('[id="APD_\\:\\:SalesOrderType-inner-vhi"]').click();
    await page.getByText('Standard Order (OR)').click();

    await page.getByLabel("Sales Organization").click();
    await page.getByRole("gridcell", { name: "BCSO" }).click();

    await page.getByLabel("Distribution Channel").click();
    await page.getByRole("gridcell", { name: "EX", exact: true }).click();

    await page.getByLabel('Division').fill('mobile');

    await page.locator('[id="__wrapper68-com\\.sap\\.gateway\\.srvd\\.c_salesordermanage_sd\\.v0001\\.CreateWithSalesOrderType\\:\\:OrganizationDivision\\:\\:Popover\\:\\:qualifier\\:\\:\\:\\:SuggestTable-0"]').click();
    await page.getByRole("button", { name: "Continue" }).click();

    const customerField = page.locator('[id^="cus.sd.salesorderv2.manage::SalesOrderManageObjectPage--fe::FormContainer::OrderData::FormElement::DataField::SoldToParty::Field-edit-inner-inner"]');
    await customerField.waitFor({ state: 'visible' });
    await customerField.click();
    await customerField.fill("Z");
    await page.getByRole("gridcell", { name: "Z test company" }).click();

    await page.getByLabel("Customer Reference").fill("Test");
    await page.getByRole("textbox", { name: "Product" }).fill("sa");
    await page.getByText("Sample Material").click({ timeout: 60000 });

    await page.locator('[aria-describedby="__text134"]').click();
    await page.locator('[aria-describedby="__text134"]').fill("1");
    await page.locator('[aria-describedby="__text134"]').press('Enter');

    await page.getByLabel('Details', { exact: true }).click();

    const storageLocation = page.locator('//*[@id="cus.sd.salesorderv2.manage::SalesOrderItemObjectPage--fe::FormContainer::ShippingInfo::FormElement::DataField::StorageLocation::Field-edit-inner-inner"]')
    await storageLocation.click();
    await storageLocation.fill('ra');
    await page.getByText('raw material').click();


    await page.getByRole("button", { name: "Prices", exact: true }).click();
    const pricingElement = page.locator('[id^="cus\\.sd\\.salesorderv2\\.manage"]').filter({
      hasText: "Pricing Element Text",
    });

    const create = page.locator('//*[@id="cus.sd.salesorderv2.manage::SalesOrderItemObjectPage--fe::table::_ItemPricingElement::LineItem::DataFieldForAction::com.sap.gateway.srvd.c_salesordermanage_sd.v0001.CreatePricingElement::com.sap.gateway.srvd.c_salesordermanage_sd.v0001.SalesOrderItemType"]');
    await create.click();
    const temp = page.getByText('Z Price');
    await temp.click({ timeout: 60000 });
    await page.locator('[id="fe\\:\\:APD_\\:\\:com\\.sap\\.gateway\\.srvd\\.c_salesordermanage_sd\\.v0001\\.CreatePricingElement-footer"]').getByRole('button', { name: 'Create' }).click();
    await page.locator('[id="__field40-__clone322-__clone352-inner-inner"]').dblclick();
    await page.locator('[id="__field40-__clone322-__clone352-inner-inner"]').fill('100,00');

    await page.getByLabel('Apply').click();


    await page.getByLabel('Create', { exact: true }).click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot_sap.png', fullPage: true });


  })

});




//*[@id="main_container"]/header/div/div/div[1]/div/div[3]/div/div/div/nav/ul/li[4]/a

//*[@id="main_container"]/header/div/div/div[1]/div/div[3]/div/div/div/nav/ul/li[5]/a


// await page.goto('https://www.pringles.com/centraleurope/en/home.html');
// await page.getByRole('navigation').getByRole('link', { name: 'Contact Us' }).click();

// await page.goto('https://www.pringles.com/ch/de/home.html');
// await page.getByRole('link', { name: 'KONTAKT', exact: true }).click();
