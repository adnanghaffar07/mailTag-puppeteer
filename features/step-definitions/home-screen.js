const { assert } = require("chai");

module.exports = function () {

    this.Given(/^I am online at "([^"]*)"/, function (url) {
        return helpers.openPage(url);
    });
      
    this.When(/^I login with email "([^"]*)" and password "([^"]*)"$/, function (email, password) {
        return pageObjects.login.loginToApp(email, password);
    });

    this.Then(/^I should see homepage$/, function () {
        return helpers.waitForLinkText('Home', false, 30);
    });

    this.Then(/^I should see "([^"]*)" button$/, function (button) {
        return helpers.waitForLinkText(button, false, 30);
    });

    this.Then(/^I click on "([^"]*)" button$/, async function (button) {
        const b = (await page.$x("//*[text()='" + button + "']"))[0];
        b.click();
        await page.waitForTimeout(3000);
        const pageList = await browser.pages();
        page = pageList[2];
        await page.bringToFront();
        return page.waitForTimeout(1000);
    });

    this.Then(/^I should see "([^"]*)" page$/, async function (button) {
        return assert.isTrue((await page.$x("//*[text()='" + button + "']")).length > 0);
    });

    this.Then(/^I click on Add to Chrome button$/, async function () {
        page.on('dialog', async (dialog) => {
            console.log('Message: ' + dialog.message());
            await dialog.accept();
        }); 
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        await (await page.$x("//*[text()='Add to Chrome']"))[0].click();
        return page.waitForTimeout(5000);
    });

    this.Then(/^I should go back one page$/, function () {
        return page.goBack();
    });
};
