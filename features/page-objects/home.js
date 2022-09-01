let image;
module.exports = {

    url: 'https://www.mailtag.io/',

    selectors: {
        emailInput: '[name="username"]',
        passwordInput: '[name="password"]',
        loginButton: '[type="submit"]'
    },

    /**
     * enters a search term into Google's search box and presses enter
     * @param {string} email - email to enter in the user name field
     * @param {string} password - password to enter in the password field
     * @returns {Promise} a promise to enter the search values
     */
    loginToApp: async function (email, password) {
        const emailSelector = pageObjects.login.selectors.emailInput;
        await page.focus(emailSelector);
        await page.keyboard.type(email, { delay: 100 });

        const passwordSelector = pageObjects.login.selectors.passwordInput;
        await page.focus(passwordSelector);
        await page.keyboard.type(password, { delay: 100 });

        const loginButtonSelector = pageObjects.login.selectors.loginButton;
        await page.focus(loginButtonSelector);
        return page.keyboard.press('Enter');
    }
};
