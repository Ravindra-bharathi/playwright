require("dotenv").config();
import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "./components/loginPageForPredev";
import { AppStorePage } from "./components/appstorefile";

let page;
let appStorePage;

test.beforeAll(async () => {
  const username = process.env.Id?.toString();
  const password = process.env.password?.toString();
  console.log(username, password);

  if (!username || !password) {
    throw new Error("Missing environment variables: Id and Password");
  }

  test.setTimeout(240000);

  const browser = await chromium.launch({ headless: false });
  page = await browser.newPage();

  const loginPage = new LoginPage(page);
  const pageForLogin = await loginPage.login(username, password);

  appStorePage = new AppStorePage(pageForLogin);
  await appStorePage.clickAppStore();
});

test("test for app store page", async () => {
  const page1Text = await appStorePage.page.locator(
    "(//p[contains(@class,'MuiTypography-root MuiTypography-body1')])[1]"
  );

  await expect(page1Text).toBeVisible();
  await page1Text.click();

  await appStorePage.createCapability(
    "tesst using playwright",
    "Playwright",
    "SAP"
  );

  await page
    .locator(
      "(//div[contains(@class,'MuiPaper-root MuiPaper-elevation')]//button)[2]"
    )
    .click();
});

test("test for app store search page", async () => {
  await appStorePage.searchApp("tesst using playwright");
  const text = await appStorePage.getSearchResult();
  const textArr = text.toString();
  console.log(textArr, "test for app store search page");
  await appStorePage.searchApp("");
});

test("test for app store pagination for next page with 12 rows", async () => {
  await appStorePage.goToNextPage();
  const text = await appStorePage.getNextPageWith12();
  const textArr = text.toString();
  await expect(textArr).toBe("Ansible  - Yaml_Test");
});

test("test for app store pagination for next page with 24 rows", async () => {
  await appStorePage.changeRowsPerPage(12);
  await appStorePage.goToNextPage();
  const text = await appStorePage.getpagniationFor24();
  const textArr = text.toString();
  await expect(textArr).toBe("WEB IDE  - Check -AWS-SNAPSHOT");
});

test("test for app store pagination for next page with 48 rows", async () => {
  await appStorePage.changeRowsPerPage(24);
  await appStorePage.goToNextPage();
  const text = await appStorePage.getpagniationFor48();
  const textArr = text.toString();
  await expect(textArr).toBe("GITHUB  - test sh git13");
});

test("test for app store pagination until last page", async () => {
  const count = await page.getByLabel("Next Page").count();
  for (let i = 0; i < count; i++) {
    await appStorePage.goToNextPage();
  }
  const isDisabled = await appStorePage.isNextPageDisabled();
  await expect(isDisabled).toBeFalsy();
});

test.afterAll(async () => {
  await appStorePage.logout();
  await page.close();
});
