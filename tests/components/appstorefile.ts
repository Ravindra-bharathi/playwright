// appStorePage.ts
import { Page } from "@playwright/test";

export class AppStorePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickAppStore() {
    await this.page
      .getByRole("button", { name: "AppStore AppStore" })
      .first()
      .click();
  }

  async createCapability(name: string, language: string, group: string) {
    await this.page
      .locator(
        '(//input[contains(@class,"MuiInputBase-input MuiOutlinedInput-input")])[3]'
      )
      .fill(name);
    await this.selectAppLanguage(language);
    await this.selectAppGroup(group);
    await this.page.getByRole("button", { name: "Create" }).click();
  }

  private async selectAppLanguage(language: string) {
    await this.page
      .locator(
        '(//div[contains(@class,"MuiSelect-select MuiSelect-outlined")])[2]'
      )
      .click();
    await this.page.getByRole("option", { name: language }).click();
  }

  private async selectAppGroup(group: string) {
    await this.page
      .locator(
        '//div[contains(@class,"MuiInputAdornment-root MuiInputAdornment-positionStart")]/following-sibling::div[1]'
      )
      .click();
    await this.page.getByRole("option", { name: "SAP", exact: true }).click();
  }

  async searchApp(name: string) {
    await this.page.getByPlaceholder("Search by app name or app id").fill(name);
  }

  async getSearchResult() {
    return await this.page
      .locator(
        "//p[normalize-space(text())='WEB IDE - tesst using playwright']"
      )
      .textContent();
  }
  async getNextPageWith12() {
    return await this.page
      .locator("//p[normalize-space(text())='Ansible - Yaml_Test']")
      .textContent();
  }
  async getpagniationFor24() {
    return await this.page
      .locator("//p[normalize-space(text())='WEB IDE - Check -AWS-SNAPSHOT']")
      .textContent();
  }
  async getpagniationFor48() {
    return await this.page
      .locator("//p[normalize-space(text())='GITHUB - test sh git13']")
      .textContent();
  }
  async goToNextPage() {
    await this.page.getByLabel("Go to next page").click();
  }

  async changeRowsPerPage(rows: number) {
    await this.page.getByLabel(`${rows}`).click();
    await this.page.getByRole("option", { name: `${rows * 2}` }).click();
  }

  async isNextPageDisabled() {
    return await this.page.getByLabel("Next Page").isDisabled();
  }

  async logout() {
    await this.page.getByRole("button", { name: "R", exact: true }).click();
    await this.page.getByRole("menuitem", { name: "Log Out" }).click();
  }
}
