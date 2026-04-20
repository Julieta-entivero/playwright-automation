const { LoginPage } = require('../pages/LoginPage');

// credenciales centralizadas
const CREDENTIALS = {
    standard: {
        username: process.env.STANDARD_USER || 'standard_user',
        password: process.env.STANDARD_PASSWORD || 'secret_sauce',
    },
    locked: {
        username: process.env.LOCKED_USER || 'locked_out_user',
        password: process.env.STANDARD_PASSWORD || 'secret_sauce',
    },
};

async function loginAsStandardUser(page) {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
}

module.exports = { loginAsStandardUser, CREDENTIALS };
