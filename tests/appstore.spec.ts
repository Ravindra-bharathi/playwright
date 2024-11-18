import { test, expect, chromium } from "@playwright/test";
import { password, username } from "./variable/variable";

let page;
let pageForLogin;
test.beforeAll(async () => {
  test.setTimeout(240000);
  const browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://predev.symphony4cloud.com/login");
  await page.getByPlaceholder("Email, phone, or Skype").fill(username);
  await page.getByRole("button", { name: "Next" }).click();
  await page.locator("#i0118").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  const pageWaitPopup = page.waitForEvent("popup");
  await page.goto("https://predev.symphony4cloud.com/login");
  pageForLogin = await pageWaitPopup;
  await pageForLogin.getByLabel("").click();
  await pageForLogin.getByRole("option", { name: "c100001" }).click();
  await pageForLogin.getByRole("button", { name: "Sign In" }).click();
});

test("test for app store page", async ({}) => {
  await pageForLogin
    .getByRole("button", { name: "AppStore AppStore" })
    .first()
    .click();
  const page1Text = await pageForLogin.locator(
    "(//p[contains(@class,'MuiTypography-root MuiTypography-body1')])[1]"
  );

  // await expect(page1Text).toBeVisible();
  await page1Text.click();
  const capability = await pageForLogin.getByText("Create capability");
  await expect(capability).toBeVisible();
  await pageForLogin
    .locator(
      "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[3]"
    )
    .fill("tesst using playwright");
  const appLanguageType = pageForLogin.locator(
    "(//div[contains(@class,'MuiSelect-select MuiSelect-outlined')])[2]"
  );
  await appLanguageType.click();
  await pageForLogin.locator("li[role='option']").nth(1).click();
  const appGroup = await pageForLogin.locator(
    "//div[contains(@class,'MuiInputAdornment-root MuiInputAdornment-positionStart')]/following-sibling::div[1]"
  );
  await appGroup.click();
  await pageForLogin.locator("li[role='option']").nth(1).click();
  await pageForLogin.getByRole("button", { name: "Create" }).click();
  const icon = await pageForLogin.locator("(//img[@class='jss381'])[2]");

  await pageForLogin
    .locator(
      "(//div[contains(@class,'MuiPaper-root MuiPaper-elevation')]//button)[2]"
    )
    .click();
});

test("test for app store page for paganation for next page with 12 rows", async ({}) => {
  await pageForLogin.getByLabel("Go to next page").click();
  await expect(pageForLogin.getByText("Ansible  - Yaml_Test")).toBeVisible();
});
test("test for app store page for paganation for next page with 24 rows", async ({}) => {
  await pageForLogin.getByLabel("12").click();
  await pageForLogin.getByRole("option", { name: "24" }).click();
  await pageForLogin.getByLabel("Go to next page").click();
  await expect(
    pageForLogin.getByText("WEB IDE  - Check -AWS-SNAPSHOT")
  ).toBeVisible();
});

test("test for app store page for paganation for next page with 48 rows", async ({}) => {
  await pageForLogin.getByLabel("24").click();
  await pageForLogin.getByRole("option", { name: "48" }).click();
  await pageForLogin.getByLabel("Go to next page").click();
  await expect(pageForLogin.getByText("GITHUB  - test sh git13")).toBeVisible();
});

test("test for app store page for paganation for next page with 100 rows", async ({}) => {
  await pageForLogin.getByLabel("48").click();
  await pageForLogin.getByRole("option", { name: "100" }).click();
  await pageForLogin.getByLabel("Go to next page").click();
  await expect(
    pageForLogin.getByText("WEB IDE  - testingsample")
  ).toBeVisible();
});

test("test for app store page for paganation untill lastpage", async ({}) => {
  const count = await pageForLogin.getByLabel("Next Page").count();
  for (let i = 0; i < count; i++) {
    await pageForLogin.getByLabel("Next Page").click();
  }
  const isDisabled = await pageForLogin.getByLabel("Next Page").isDisabled();
  await expect(isDisabled).toBeTruthy();
});

test.afterAll(async () => {
  await pageForLogin.getByRole("button", { name: "R", exact: true }).click();
  await pageForLogin.getByRole("menuitem", { name: "Log Out" }).click();
  await pageForLogin.close();
  await page.close();
});
