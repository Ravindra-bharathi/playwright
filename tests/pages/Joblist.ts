import { Page } from "@playwright/test";

export class JobListPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openJobList(): Promise<void> {
    await this.page
      .locator("div")
      .filter({
        hasText:
          /^Job ListManage Orchestration jobs created with Symphony Templates$/,
      })
      .nth(1)
      .click();
  }

  async selectToday(): Promise<void> {
    await this.page.getByTestId("InsertInvitationIcon").click();
    await this.page.getByText("Today").click();
    await this.page.getByRole("option", { name: "All" }).click();
    await this.page.getByRole("button", { name: "OK" }).click();
  }

  async searchJobs(searchTerm: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Search" }).click();
    await this.page.getByRole("textbox", { name: "Search" }).fill(searchTerm);
  }

  async checkSearchResults(): Promise<boolean> {
    const noRowsText = await this.page.getByText("No rows").count();
    return noRowsText > 0;
  }

  async refreshJobList(): Promise<void> {
    await this.page.getByTestId("RefreshIcon").click();
  }

  async paginateThroughList(): Promise<boolean> {
    const count = await this.page.getByLabel("Next Page").count();
    for (let i = 0; i < count; i++) {
      await this.page.getByLabel("Next Page").click();
    }
    const isDisabled = await this.page.getByLabel("Next Page").isDisabled();
    return isDisabled;
  }
}
