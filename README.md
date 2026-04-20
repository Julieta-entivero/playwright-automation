![Playwright Tests](https://github.com/Julieta-entivero/playwright-automation/actions/workflows/tests.yml/badge.svg)

# Playwright Automation

Framework de automatizacion E2E para [SauceDemo](https://www.saucedemo.com/) utilizando Playwright con JavaScript y el patron Page Object Model (POM).

## Tecnologias

![Playwright](https://img.shields.io/badge/Playwright_1.42-2EAD33?style=flat&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

## Estructura del proyecto

```
├── pages/
│   ├── LoginPage.js               # Formulario de login
│   ├── InventoryPage.js           # Catalogo de productos
│   ├── ItemDetailPage.js          # Detalle de producto
│   ├── CartPage.js                # Carrito de compras
│   └── CheckoutPage.js            # Checkout (3 pasos)
├── tests/
│   ├── login.spec.js              # 6 tests de autenticacion
│   ├── products.spec.js           # 9 tests de productos
│   ├── cart.spec.js               # 8 tests de carrito
│   ├── checkout.spec.js           # 8 tests de checkout
│   └── logout.spec.js             # 2 tests de logout
├── utils/
│   └── testHelper.js              # Login helper y credenciales centralizadas
└── playwright.config.js           # Config multi-browser (Chromium, Firefox, WebKit)
```

## Cobertura de tests

| Suite | Ticket | Tests | Escenarios |
|-------|--------|-------|------------|
| Login | SHOP-101/102 | 6 | Login valido, credenciales invalidas, campos vacios, usuario bloqueado |
| Products | SHOP-201/202/203 | 9 | Carga, ordenamiento por precio y nombre, detalle, navegacion |
| Cart | SHOP-301/302 | 8 | Agregar uno/varios items, remover, validar precios, navegacion |
| Checkout | SHOP-401/402/403 | 8 | Flujo completo, validaciones, cancelacion, verificacion matematica de totales |
| Logout | SHOP-501 | 2 | Navegacion y validacion de URL |
| **Total** | | **33** | |

## Requisitos previos

- Node.js v18+
- npm v9+

## Como ejecutar

```bash
# Instalar dependencias y browsers
npm install
npx playwright install

# Ejecutar todos los tests (3 browsers)
npm test

# Ejecutar con navegador visible
npm run test:headed

# Ejecutar por suite
npm run test:login
npm run test:products
npm run test:cart
npm run test:checkout

# Ver reporte HTML
npm run report
```

## Configuracion

Las credenciales se pueden sobreescribir con variables de entorno:

```bash
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
BASE_URL=https://www.saucedemo.com
```

| Parametro | Valor |
|-----------|-------|
| Browsers | Chromium, Firefox, WebKit |
| Retries | 1 |
| Timeout | 30 segundos |
| Screenshots | Solo en fallas |
| Video | Solo en fallas |
| Trace | Solo en fallas |
| Viewport | 1280x720 |

## Arquitectura

El framework utiliza el patron **Page Object Model (POM)**:

- **Pages**: Cada pagina encapsula locators y acciones como metodos async
- **Tests**: Organizados por funcionalidad con `test.describe()` y `test.beforeEach()`
- **Utils**: Helper compartido con credenciales centralizadas y login reutilizable
- **Config**: Multi-browser en `playwright.config.js` con soporte para reportes y evidencia en fallas
- **CI/CD**: GitHub Actions ejecuta los tests y sube reportes y screenshots como artefactos
