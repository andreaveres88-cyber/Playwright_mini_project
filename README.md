# Playwright Mini Project – SauceDemo E2E Tests

Automated end-to-end tests for [SauceDemo](https://www.saucedemo.com), written with Playwright and JavaScript. I built this project to practice test automation after 4 years of manual QA.

## What is covered

- **Login**: valid login (button and Enter key), logout, multiple user types, password masking
- **Negative login**: empty fields, invalid and wrong-case credentials, locked user, SQL injection payload, overly long password, access to inventory without login or after logout
- **Inventory**: sorting by price and name (both directions)
- **Cart**: badge visibility, add and remove products, cart page content, continue shopping
- **Product details**: name, description and price match the product list
- **Checkout**: full flow, per-field validation, cancel at each step, price summary, empty cart after order, multiple items and user types

## Project structure

```
pages/        Page Object Model classes (Login, Inventory, Cart, Product, Checkout)
tests/        Test specs
test-data/    Test data kept separate from the tests
fixtures.js   Custom fixtures that provide page objects to the tests
playwright.config.js
```

## Tech stack

- Playwright Test
- JavaScript (Node.js)
- Git and GitHub (feature branches and pull requests)

## Key practices

- Page Object Model
- Custom fixtures for reusable setup
- Stable locators with `getByTestId`
- Test data separated from the test logic
- Data-driven (parameterized) tests
- Cross-browser runs: Chromium, Firefox, WebKit

## How to run

```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

Useful variations:

```bash
npx playwright test tests/login.spec.js   # a single spec
npx playwright test --headed              # with a visible browser
npx playwright test --ui                  # UI mode
```