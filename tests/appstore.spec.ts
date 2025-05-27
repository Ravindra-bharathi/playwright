import { test, expect, chromium } from "@playwright/test";
import { password, username } from "./variable/variable";

let page;
let pageForLogin;
let browserType;
test.beforeAll(async ({ browserName }) => {
  test.setTimeout(240000);
  const browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://predev.symphony4cloud.com/login");
  browserType = browserName;
  if (browserType !== "webkit") {
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
  }
});

test("test for app store page", async () => {
  if (browserType === "webkit") {
    await page.getByText("Email, phone, or Skype").click();
    await page.getByLabel("Enter your email, phone, or").fill(username);
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByText("Password", { exact: true }).click();
    await page.getByLabel("Enter the password for").fill(password);
    await page.getByRole("button", { name: "Sign in" }).click();
    const pageWaitPopup = page.waitForEvent("popup");
    await page.getByRole("button", { name: "Yes" }).click();
    const pageForLogin = await pageWaitPopup;
    await pageForLogin.getByLabel("").click();
    await pageForLogin.getByRole("option", { name: "c100001" }).click();
    await pageForLogin.getByRole("button", { name: "Sign In" }).click();
    await pageForLogin.getByTestId("ChevronRightRoundedIcon").click();
    await pageForLogin
      .getByRole("button", { name: "AppStore" })
      .first()
      .click();
    await pageForLogin.getByText("Create New Capability").click();
    await pageForLogin.getByLabel("close").click();
    await pageForLogin.getByPlaceholder("Search by app name or app id").click();
    await pageForLogin
      .getByPlaceholder("Search by app name or app id")
      .fill("");
    await pageForLogin.getByLabel("Go to next page").click();
    await pageForLogin.getByLabel("12").click();
    await pageForLogin.getByRole("option", { name: "24" }).click();
  } else {
    await pageForLogin
      .getByRole("button", { name: "AppStore AppStore" })
      .first()
      .click();
    const page1Text = await pageForLogin.locator(
      "(//p[contains(@class,'MuiTypography-root MuiTypography-body1')])[1]"
    );

    await page1Text.click();
    const capability = await pageForLogin.getByText("Create capability");
    await expect(capability).toBeVisible();
    await pageForLogin
      .locator(
        "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[3]"
      )
      .fill("tesst using playwright");
    await pageForLogin.locator('#appLanguageType').click();
    await pageForLogin.getByRole('option', { name: 'Playwright' }).click();
    await pageForLogin.getByLabel('', { exact: true }).click();
    await pageForLogin.getByRole('option', { name: 'playwright', exact: true }).click();
    await pageForLogin.getByRole("button", { name: "Create" }).click();
    const icon = await pageForLogin.locator("(//img[@class='jss381'])[2]");

    await pageForLogin
      .locator(
        "(//div[contains(@class,'MuiPaper-root MuiPaper-elevation')]//button)[2]"
      )
      .click();
    await pageForLogin.getByLabel("Go to next page").click();
    await expect(pageForLogin.getByText("Ansible  - Yaml_Test")).toBeVisible();
    await pageForLogin.getByLabel("12").click();
    await pageForLogin.getByRole("option", { name: "24" }).click();
    await pageForLogin.getByLabel("Go to next page").click();
    await expect(
      pageForLogin.getByText("WEB IDE  - Check -AWS-SNAPSHOT")
    ).toBeVisible();
    await pageForLogin.getByLabel("24").click();
    await pageForLogin.getByRole("option", { name: "48" }).click();
    await pageForLogin.getByLabel("Go to next page").click();
    await pageForLogin.getByLabel("48").click();
    await pageForLogin.getByRole("option", { name: "100" }).click();
    const count = await pageForLogin.getByLabel("Next Page").count();
    const isDisabled = await pageForLogin.getByLabel("Next Page").isDisabled();
    await expect(isDisabled).toBeTruthy();
  }
});

test.afterAll(async () => {
  if (browserType !== "webkit") {
    await pageForLogin.getByRole("button", { name: "R", exact: true }).click();
    await pageForLogin.getByRole("menuitem", { name: "Log Out" }).click();
    await pageForLogin.close();
    await page.close();
  }
});
