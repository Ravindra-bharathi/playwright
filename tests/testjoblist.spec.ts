// import { test, expect, chromium } from "@playwright/test";
// import isEmpty from "lodash/isEmpty";

// let page;

// test.beforeAll(async () => {
//   test.setTimeout(180000);
//   const browser = await chromium.launch({ headless: false });
//   page = await browser.newPage();

//   // login
//   await page.goto("https://qa.symphony4cloud.com/login");
//   await page.locator("#customer_code").click();
//   await page.locator("#customer_code").fill("c100001");
//   await page.locator("#user_name").click();
//   await page.locator("#user_name").fill("ravindrabharathi");
//   await page.locator("#password").click();
//   await page.locator("#password").fill("Redapple@1234");
//   await page.getByRole("button", { name: "LOGIN" }).click();
// });

// test.afterAll(async () => {
//   // logout
//   await page.getByRole("button", { name: "R", exact: true }).click();
//   await page.getByRole("menuitem", { name: "Log Out" }).click();
//   await page.close();
// });

// test("test for job list in Drag & Drop", async () => {
//   // job list in Drag & Drop page
//   await page.getByRole("button", { name: "Drag & Drop Drag & Drop" }).click();
//   await expect(page).toHaveURL("https://qa.symphony4cloud.com/dragndrop/view");
//   await expect(page).toHaveTitle(
//     "Best SAP Consulting Services and Solutions - Zero Cloud Transformation | symphony4cloud"
//   );
//   await page
//     .locator("div")
//     .filter({
//       hasText:
//         /^Job ListManage Orchestration jobs created with Symphony Templates$/,
//     })
//     .nth(1)
//     .click();
// });

// test("test for date picker in job list", async () => {
//   // date picker in job list
//   await page.getByTestId("InsertInvitationIcon").click();
//   await page.getByText("Today").click();
//   await page.getByRole("option", { name: "All" }).click();
//   await page.getByRole("button", { name: "OK" }).click();
// });
// test("test for search in job list", async () => {
//   // search in job list
//   const val = ["test", "test1", "test2", "test3", ""];
//   for (let i = 0; i < val.length; i++) {
//     await page.getByRole("textbox", { name: "Search" }).click();
//     await page.getByRole("textbox", { name: "Search" }).fill(val[i]);
//     const rows = page.getByText("No rows");
//     if (!isEmpty(rows)) {
//       await expect(page).toHaveTitle(
//         "Best SAP Consulting Services and Solutions - Zero Cloud Transformation | symphony4cloud"
//       );
//     } else {
//       await expect(rows).toHaveText("No rows");
//     }
//   }
// });
// test("test for refresh in job list", async () => {
//   // refresh in job list
//   await page.getByTestId("RefreshIcon").click();
//   await expect(page).toHaveTitle(
//     "Best SAP Consulting Services and Solutions - Zero Cloud Transformation | symphony4cloud"
//   );
// });
// test("test for pagenation in job list", async () => {
//   // pagenation in job list
//   const count = await page.getByLabel("Next Page").count();
//   for (let i = 0; i < count; i++) {
//     await page.getByLabel("Next Page").click();
//   }
//   const btn = await page.getByLabel("Next Page");
//   await expect(btn).toBeDisabled();
// });

import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "./pages/Loginpage";
import { DragAndDropPage } from "./pages/DragandDrop";
import { JobListPage } from "./pages/Joblist";

let page;

test.beforeAll(async () => {
  test.setTimeout(200000);
  const browser = await chromium.launch({ headless: false });
  page = await browser.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.login("c100001", "ravindrabharathi", "Redapple@1234");
});

test.afterAll(async () => {
  const loginPage = new LoginPage(page);
  await loginPage.logout();
  await page.close();
});

test("test for job list in Drag & Drop", async () => {
  const dragAndDropPage = new DragAndDropPage(page);
  const jobListPage = new JobListPage(page);
  await dragAndDropPage.navigateToDragAndDrop();
  await jobListPage.openJobList();
  const jobListDiv = page
    .locator("div")
    .filter({ hasText: /^Job List$/ })
    .nth(1);

  await expect(jobListDiv).toBeVisible();
  await jobListPage.selectToday();
  const todayDiv = page
    .locator("div")
    .filter({ hasText: /^JM recurring 10 mins$/ })
    .nth(1);

  await expect(todayDiv).toBeVisible();
  const searchvalue = ["test", "test1", "test2", "test3", ""];
  for (const term of searchvalue) {
    await jobListPage.searchJobs(term);
    const noRows = await jobListPage.checkSearchResults();
    if (!noRows) {
      await expect(page).toHaveTitle(
        "Best SAP Consulting Services and Solutions - Zero Cloud Transformation | symphony4cloud"
      );
    } else {
      await expect(page.getByText("No rows")).toHaveText("No rows");
    }
  }
  await jobListPage.refreshJobList();
  await expect(page).toHaveTitle(
    "Best SAP Consulting Services and Solutions - Zero Cloud Transformation | symphony4cloud"
  );
  const isPaginationDisabled = await jobListPage.paginateThroughList();
  await expect(isPaginationDisabled).toBeTruthy();
});
