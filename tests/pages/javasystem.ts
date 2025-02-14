import { chromium, expect, Page } from "@playwright/test";
import { url } from "./javasaystemVariable";
const { exec } = require("child_process");
import * as fs from 'fs';
const { JSDOM } = require('jsdom');
const XLSX = require('xlsx');
export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async loginUrl() {
        await this.page.goto(url, { timeout: 90000 });
        await this.page.waitForTimeout(5000);
    }
    async logincredentials() {
        const idBox = this.page.getByRole('textbox', { name: 'User *' });
        if (await idBox.isVisible()) {
            await idBox.fill('replaytest');
        }
        else {
            console.log("id is not filled in id feild")
        }
        const PasswordBox = this.page.getByRole('textbox', { name: 'Password *' });
        if (await PasswordBox.isVisible()) {
            await PasswordBox.click();
            await PasswordBox.fill('H3r3andTh3r3')
        }
        else {
            console.log("password is not filled in the feild")
        }

        const loginButton = this.page.getByRole('button', { name: 'Log On' });
        if (await loginButton.isVisible()) {
            await loginButton.click()
        }
        else {
            console.log("login button is not visible")
        }
    }
    async homepageVerifiction() {
        await this.page.waitForTimeout(2000);
        const heading = this.page.getByText('SAP NetWeaver Administrator', { exact: true });
        if (await heading.isVisible()) {
            await expect(heading).toBeVisible();
        }
        else {
            console.log(heading, 'is not visible in the page')
        }
    }

    async search() {
        const textbox = this.page.getByRole('textbox');
        if (await textbox.isVisible()) {
            await textbox.click();
            await textbox.fill('syatem info');
        } else {
            console.log('textbox search value is not filled ')
        }
        const goButn = this.page.getByRole('cell', { name: 'Go', exact: true }).locator('div');
        if (await goButn.isVisible()) {
            await goButn.click();
        }
        else {
            console.log('search go button is not visible')
        }

        await this.page.waitForTimeout(2000);
        const searchresult = this.page.locator('[id="CEPJFMAJ\\.WorkCenterOverviewView\\.titl0"]');

        if (await searchresult.isVisible()) {
            await this.page.waitForTimeout(2000);
            await expect(searchresult).toBeVisible();
        }
        else {
            console.log(searchresult, 'search go searchresultgo')
        }
    }
    async systemInfo() {
        await this.page.waitForTimeout(2000);
        const systemInfo = this.page.locator('[id="CEPJFMAJ\\.WorkCenterOverviewView\\._52"]');
        if (await systemInfo.isVisible()) {
            await this.page.waitForTimeout(2000);
            await systemInfo.click()
        }
        else {
            console.log(systemInfo, "systeminfo is not visible to click")
        }
        const systeminfoPage = this.page.getByText('System Information: System');
        if (await systeminfoPage.isVisible()) {
            await this.page.waitForTimeout(2000);
            await expect(systeminfoPage).toBeVisible();
        }
        else {
            console.log('not in systeminfo page ');
        }

        let rowIndex = 3;

        while (true) {
            const cellLocator = this.page.locator(`#CEPJICNK\\.SystemInfoView\\.InstancesTable-contentTBody > tr:nth-child(${rowIndex}) > td:nth-child(2)`);
            await this.page.waitForTimeout(2000);
            const isVisible = await cellLocator.isVisible();
            if (!isVisible) {
                break;
            }
            await this.page.waitForTimeout(2000);
            const value = await cellLocator.innerText();
            if (value.trim() !== '') {
                await this.page.waitForTimeout(2000);
                await cellLocator.click();
                await this.page.screenshot({ path: `sap/systeminfo/screenshot_(${value}).png`, fullPage: true });
            }
            if (value.trim() === '') {
                console.log(`Found an empty cell at Row ${rowIndex}. Stopping loop.`);
                break;
            }

            rowIndex++;
            await this.page.waitForTimeout(500);
        }

    }
    async componentInfo() {
        const component = this.page.getByText('Components Info', { exact: true })
        if (await component.isVisible()) {
            await component.click();
        } else {
            console.log(component, "is not visible")
        }
        await this.page.waitForTimeout(5000);
        const nameTextBox = this.page.locator('[id="CEPJICNK\\.ComponentInfoView\\.SAP_ITSAMJ2eeClusterSoftwareComponentPartComponentTable\\:2147483640"]');
        if (await nameTextBox.isVisible()) {
            await nameTextBox.click()
            await nameTextBox.fill('sap')
            await nameTextBox.press('Enter')
            await this.page.waitForTimeout(2000);
        } else {
            console.log(nameTextBox, 'is not visible')
        }

        let rowIndex = 0;
        let emptyRowAttempts = 0;

        while (true) {
            const selector = `[id="CEPJICNK.ComponentInfoView.SCName_editor.${rowIndex}-r"]`;
            const tableCell = this.page.locator(selector);
            await this.page.waitForTimeout(2000);
            if (!(await tableCell.count())) {
                console.log(`Row ${rowIndex} does not exist. Attempting to load more rows...`);
                const nextButton = this.page.locator('[id="CEPJICNK.ComponentInfoView.SAP_ITSAMJ2eeClusterSoftwareComponentPartComponentTable-scrollV-Nxt"]');

                if (await nextButton.isVisible() && await nextButton.isEnabled()) {
                    await nextButton.click();
                    await this.page.waitForTimeout(2000);
                } else {
                    console.log("No more rows to load.");
                    break;
                }
            }
            if (await tableCell.isVisible() && await tableCell.isEnabled()) {
                emptyRowAttempts = 0;

                const text = (await tableCell.textContent())?.trim();
                await this.page.waitForTimeout(2000);
                await tableCell.click();
                await this.page.waitForTimeout(5000);
                await this.page.screenshot({ path: `sap/component/screenshot_(${text}).png`, fullPage: true });
                let dependencyTableValue = 3;
                let emptyCount = 0;
                let hasMoreDependencies = true;
                let previousValues: string[] = [];

                while (hasMoreDependencies) {
                    const cellSelector = `#CEPJICNK\\.ComponentInfoView\\.DevelopmentComponentsTable-contentTBody > tr:nth-child(${dependencyTableValue}) > td:nth-child(3)`;
                    const cell = this.page.locator(cellSelector);
                    await this.page.waitForTimeout(2000);

                    if (!(await cell.count())) {
                        console.log("No more dependency rows detected.");
                        break;
                    }

                    await cell.waitFor({ state: 'visible' });
                    const tableCellValue = (await cell.textContent())?.trim();

                    if (!tableCellValue) {
                        emptyCount++;
                        if (emptyCount >= 3) {
                            console.log("Multiple empty values detected, stopping dependency search.");
                            break;
                        }
                    } else {
                        emptyCount = 0;
                    }
                    if (tableCellValue) {
                        if (previousValues.includes(tableCellValue)) {
                            console.log(tableCellValue, "is repeating, stopping search.");
                            break;
                        } else {
                            console.log(tableCellValue, "is not repeating.");
                            previousValues.push(tableCellValue);
                            dependencyTableValue = 3;
                        }
                    }

                    dependencyTableValue++;

                    const scrollbar = this.page.locator('[id="CEPJICNK\\.ComponentInfoView\\.DevelopmentComponentsTable-scrollV-hdl"] div');
                    const nextDependencyButton = this.page.locator('[id="CEPJICNK\\.ComponentInfoView\\.DevelopmentComponentsTable-scrollV-Nxt"]');

                    if (await scrollbar.isVisible() && await nextDependencyButton.isVisible()) {
                        if (await nextDependencyButton.isVisible() && await nextDependencyButton.isEnabled()) {
                            await this.page.waitForTimeout(2000);
                            await nextDependencyButton.click();
                            await this.page.waitForTimeout(1000);
                            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
                            await this.page.waitForTimeout(5000);
                            await this.page.screenshot({ path: `sap/component/dependency_scroll_${timestamp}.png`, fullPage: true });
                            console.log(`Screenshot taken after scrolling dependency table.`);
                        } else {
                            console.log("No more dependencies to load.");
                            hasMoreDependencies = false;
                        }
                    }
                }

            } else {
                console.log(`Row ${rowIndex} is not clickable. Skipping.`);
                break;
            }
            rowIndex++;
            await this.page.waitForTimeout(1000);
        }


    }
    async downloadExcel() {
        const component = this.page.getByText('Components Info', { exact: true })
        if (await component.isVisible()) {
            await component.click();
        } else {
            console.log(component, "is not visible")
        }
        await this.page.waitForTimeout(5000);
        await this.page.waitForTimeout(2000);
        await this.page.locator('[id="CEPJICNK\\.ComponentInfoView\\.ToolBarButton1"]').click();
        const page1Promise = this.page.waitForEvent('popup');
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.locator('iframe[name="URLSPW-0"]').contentFrame().getByRole('link', { name: 'BCS_DevelopmentComponents.xls' }).click();
        const page1 = await page1Promise;
        const download = await downloadPromise;
        const filePath = 'downloads/BCS_DevelopmentComponents.xml';
        await download.saveAs(filePath);

        if (fs.existsSync(filePath)) {
            console.log("File downloaded successfully.");
        } else {
            console.error("File download failed.");
        }


    }
    async openExcelInBrowser() {
        await this.page.waitForTimeout(5000);
        const filePath = 'downloads/BCS_DevelopmentComponents.xml';
        try {
            const xmlData = fs.readFileSync(`${filePath}`, "utf-8");

            let dom = new JSDOM();
            let parser = new dom.window.DOMParser();
            let xmlDoc = parser.parseFromString(xmlData, "text/xml");

            let elements = xmlDoc.getElementsByTagName("DevelopmentComponentsElement");

            let data = [["Change Number", "Applied Date", "Version", "CSN Component", "Vendor", "Software Type", "Software Component", "Name", "Location"]];

            for (let i = 0; i < elements.length; i++) {
                let row = [
                    elements[i].getElementsByTagName("ChangeNumber")[0]?.textContent || '',
                    elements[i].getElementsByTagName("AppliedDate")[0]?.textContent || '',
                    elements[i].getElementsByTagName("Version")[0]?.textContent || '',
                    elements[i].getElementsByTagName("CsnComponent")[0]?.textContent || '',
                    elements[i].getElementsByTagName("Vendor")[0]?.textContent || '',
                    elements[i].getElementsByTagName("SoftwareType")[0]?.textContent || '',
                    elements[i].getElementsByTagName("SoftwareComponent")[0]?.textContent || '',
                    elements[i].getElementsByTagName("Name")[0]?.textContent || '',
                    elements[i].getElementsByTagName("Location")[0]?.textContent || ''
                ];
                data.push(row);
            }

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "DevelopmentComponents");

            const outputPath = "C:/Users/BCS245/Downloads/BCS_DevelopmentComponents.xlsx";
            XLSX.writeFile(workbook, outputPath);

            console.log(" XLSX file saved successfully!");


        } catch (error) {
            console.error(" Error:", error);
        }

        const outputPath = "C:/Users/BCS245/Downloads/BCS_DevelopmentComponents.xlsx";
        if (fs.existsSync(outputPath)) {
            const openCommand = `start excel "${outputPath}"`;
            exec(openCommand, (error: { message: any; }, stdout: any, stderr: any) => {
                if (error) {
                    console.error(`Error opening file: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                console.log("Excel file opened successfully!");
            });
        } else {
            console.log("File does not exist.");
        }

    }

}