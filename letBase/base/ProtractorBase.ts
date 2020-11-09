import { browser, ElementFinder, ProtractorExpectedConditions } from "protractor";
import { protractor } from "protractor/built/ptor";

export class ProtractorBase {

    private EC: ProtractorExpectedConditions = browser.ExpectedConditions;
    private timeOut: number = 30000;

    /**
     * @description this functiion is used to do the click action.
     * @param element - the element on which click action to be performed.
     */
    public async click(element: ElementFinder) {
        await browser.wait(this.EC.elementToBeClickable(element), this.timeOut, "failed to click the element")
        await element.click();
    }

    /**
     * @description this function is used to enter text in a input box
     * @param element Pass the element locator 
     * @param testData Data to be entered in the element
     */
    public async enterText(element: ElementFinder, testData: string) {
        await this.visibilityOf(element);
        await element.sendKeys(testData);
    }

    /**
     * @description this function clears the element and then enters text
     * @param element Pass the element locator
     * @param testData Data to be entered in the element
     */
    public async clearAndEnterText(element: ElementFinder, testData: string) {
        await this.visibilityOf(element);
        await element.clear();
        await element.sendKeys(testData);
    }

    public async assertText(element: ElementFinder, expectedText: string) {
        await this.visibilityOf(element);
        let actualText = await element.getText();
        expect(actualText.trim()).toBe(expectedText);
    }

    public async visibilityOf(element: ElementFinder) {
        await browser.wait(this.EC.visibilityOf(element), this.timeOut, 'Element not visible');
    }

    public async invisibilityOf(element: ElementFinder) {
        await browser.wait(this.EC.invisibilityOf(element), this.timeOut, 'Element is still invisible');
    }

    public async assertElementDisplayedOnPage(element: ElementFinder) {
        await this.visibilityOf(element);
        expect(await element.isDisplayed()).toBe(true);
    }

    public async assertElementNotDisplayedOnPage(element: ElementFinder) {
        await this.visibilityOf(element);
        expect(await element.isDisplayed()).toBe(false);
    }

    public async acceptAlert() {
        await this.waitForAlert();
        await (await browser.switchTo().alert()).accept();
    }

    public async dismissAlert() {
        await this.waitForAlert();
        await (await browser.switchTo().alert()).dismiss();
    }

    public async typeInAlert(testData: string) {
        await this.waitForAlert();
        await (await browser.switchTo().alert()).sendKeys(testData);
    }

    private async waitForAlert() {
        await browser.wait(this.EC.alertIsPresent(), this.timeOut, 'Alert is not present on page');
    }

    public async getTextFromAlert(): Promise<string> {
        await this.waitForAlert();
        let text = await (await browser.switchTo().alert()).getText();
        return text;
    }

    public async switchToFrame(frameNumber: number) {
        await browser.switchTo().frame(frameNumber);
    }

    public async typeAndTab(element: ElementFinder, testData: string) {
        await this.visibilityOf(element);
        await element.clear();
        await element.sendKeys(testData, protractor.Key.TAB);
    }

    public async typeAndEnter(element: ElementFinder, testData: string) {
        let capabilities = await browser.getCapabilities();
        let platform = capabilities.get('platform');
        await this.visibilityOf(element);
        await element.clear();
        if (platform === 'Mac OS X') {
            await element.sendKeys(testData, protractor.Key.RETURN);
        } else {
            await element.sendKeys(testData, protractor.Key.ENTER);
        }
    }

    public async mouseHoverAndClick(element: ElementFinder) {
        await browser.actions()
            .mouseMove(element.getWebElement())
            .click()
            .perform();
    }

    public async moveToElement(element: ElementFinder) {
        await browser.actions()
            .mouseMove(element.getWebElement())
            .perform();
    }
} 