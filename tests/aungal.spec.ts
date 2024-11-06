import { test, expect, chromium } from "@playwright/test";

test("has title", async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://dev.anugalid.com/login");
  await expect(page).toHaveTitle(/Anugal/);

  const emailInput = page.locator("#emailId");
  await emailInput.fill("jayanthan.p@basiscloudsolutions.com");

  const passwordInput = page.locator("#password");
  await passwordInput.fill("vXk49V0v");

  const submitButton = page.locator(
    "html body div#root div.MuiStack-root.jss7.css-1ov6otp div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.css-10pci1s div.jss11 div.jss12 div.MuiStack-root.css-1ussl1q button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.css-c3k44h"
  );
  await submitButton.click();
  // });

  // test("has check the click admin", async () => {
  //   const browser = await chromium.launch({ headless: false });
  //   const page = await browser.newPage();
  //   await page.goto("https://dev.anugalid.com/login");
  const adminbtn = page.locator("button.MuiButtonBase-root:nth-child(8)");
  await adminbtn.click();
  const selfbutn = page.locator(
    "div.MuiPaper-root:nth-child(20) > div:nth-child(1)"
  );
  await selfbutn.click();
  const textvis = page.locator("span.MuiTypography-root");
  await expect(textvis).toContainText("Self monitoring");
  const avatatbtn = page.locator("button.MuiIconButton-root:nth-child(3)");
  await avatatbtn.click();
  const logoutbtn = page.locator(".css-m9d87a > span:nth-child(1)");
  await logoutbtn.click();
  //   await browser.close();
});
