import { expect, Page } from "@playwright/test";

export class DragAndDropPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToDragAndDrop(): Promise<void> {
    await this.page
      .getByRole("button", { name: "Drag & Drop Drag & Drop" })
      .click();
    await this.page.waitForURL("https://qa.symphony4cloud.com/dragndrop/view");
    await expect(this.page).toHaveTitle(
      "Best SAP Consulting Services and Solutions - Zero Cloud Transformation | symphony4cloud"
    );
  }
}
