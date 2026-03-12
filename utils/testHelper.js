const { LoginPage } = require('../pages/LoginPage');

// helper para loguearse rapido en los tests que lo necesitan
async function loginAsStandardUser(page) {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
}

module.exports = { loginAsStandardUser };
