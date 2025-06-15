# Cypress API Automation

## Project Overview
This project focuses on API Automation using Cypress automation framework

## Progress Log
### 2025-06-12

**Initialized Git repository and set up project structure:**

- Install [Node.js](https://nodejs.org/), npm, and [VS Code](https://code.visualstudio.com/).
- Run:
  ```bash
  npm init
  ```
  This creates a `package.json` file, which is the heart of this project (similar to `pom.xml` in Maven).
- Install Cypress:
  ```bash
  npm install cypress --save-dev
  ```
  This creates a `node_modules` directory containing all project dependencies.
- Open Cypress Test Runner:
  ```bash
  npx cypress open
  ```
  On first run, this creates the default Cypress project structure inside a `cypress` directory.

---

### 2025-06-13

**Added API test cases:**

- Added test cases for **GET API** using [https://gorest.co.in/](https://gorest.co.in/) for automation.
- Added test cases for **POST API** using [https://gorest.co.in/](https://gorest.co.in/).
- Added example test cases for **API chaining**.

---

### 2025-06-14

**Enhancements and new test cases:**

- Added test cases for **PUT API**.
- Made minor modifications to remove hard coding from the project.
- Added test cases for **DELETE API**.

---

### 2025-06-15

**Added Mochawesome Report Integration:**

- Install Mochawesome and related packages:
  ```bash
  npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
  ```
- Add the following under `e2e` in `cypress.config.js`:
  ```javascript
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true
  }
  ```
- Add scripts in `package.json` for pretest and posttest operations:
  ```json
  "scripts": {
    "pretest": "rm -rf cypress/reports mochawesome-report mochawesome.json",
    "test": "cypress run",
    "posttest": "mochawesome-merge cypress/reports/mochawesome/*.json > mochawesome.json && marge mochawesome.json"
  }
  ```

## How to Use
1. Run `npm install` to install all dependencies.
2. Update the token value in `createUser.json` in `cypress/fixtures`.
3. Run `npm run test` to execute all test cases in `apiTests`.
4. View the generated report under `mochawesome-report/mochawesome.html`.