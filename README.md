# Playwright Automation - SauceDemo

Framework de automation con **Playwright** y **Page Object Model** para validacion de funcionalidades de [SauceDemo](https://www.saucedemo.com/).

## Tecnologias
- Playwright 1.42
- JavaScript
- Node.js

## Estructura
```
pages/
├── LoginPage.js
├── InventoryPage.js
├── ItemDetailPage.js
├── CartPage.js
└── CheckoutPage.js        --> StepOne, StepTwo, Complete
tests/
├── login.spec.js           --> 6 tests
├── products.spec.js        --> 9 tests
├── cart.spec.js             --> 8 tests
├── checkout.spec.js         --> 8 tests
└── logout.spec.js           --> 2 tests
utils/
└── testHelper.js           --> Helper para login rapido
```

## Tests: 33 test cases

| Suite | Tests | Tickets |
|-------|-------|---------|
| Login | 6 | SHOP-101, SHOP-102 |
| Productos | 9 | SHOP-201, SHOP-202, SHOP-203 |
| Carrito | 8 | SHOP-301, SHOP-302 |
| Checkout | 8 | SHOP-401, SHOP-402, SHOP-403 |
| Logout | 2 | SHOP-501 |

## Como correr

```bash
npm install
npx playwright install

# todos los tests
npm test

# con navegador visible
npm run test:headed

# un modulo
npm run test:login
npm run test:products
npm run test:cart
npm run test:checkout

# ver reporte html
npm run report
```
