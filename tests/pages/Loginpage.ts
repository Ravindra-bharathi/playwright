import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(
    customerCode: string,
    username: string,
    password: string
  ): Promise<void> {
    await this.page.goto("https://qa.symphony4cloud.com/login");
    await this.page.locator("#customer_code").fill(customerCode);
    await this.page.locator("#user_name").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.getByRole("button", { name: "LOGIN" }).click();
  }

  async logout(): Promise<void> {
    await this.page.getByRole("button", { name: "R", exact: true }).click();
    await this.page.getByRole("menuitem", { name: "Log Out" }).click();
  }
}
