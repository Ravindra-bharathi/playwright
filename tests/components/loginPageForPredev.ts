// loginPage.ts
import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;
  pageForLogin: any;

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string) {
    await this.page.goto("https://predev.symphony4cloud.com/login");
    await this.page.getByPlaceholder("Email, phone, or Skype").fill(email);
    await this.page.getByRole("button", { name: "Next" }).click();
    await this.page.locator("#i0118").fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
    await this.page.getByRole("button", { name: "Yes" }).click();

    // Wait for the popup and handle it
    const pageWaitPopup = this.page.waitForEvent("popup");
    await this.page.goto("https://predev.symphony4cloud.com/login");
    this.pageForLogin = await pageWaitPopup;

    await this.pageForLogin.getByLabel("").click();
    await this.pageForLogin.getByRole("option", { name: "c100001" }).click();
    await this.pageForLogin.getByRole("button", { name: "Sign In" }).click();

    return this.pageForLogin;
  }
}
