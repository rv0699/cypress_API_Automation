# Cypress API Automation

## Project Overview
This project focuses on API Automation using Cypress automation framework

## Progress Log
- 2025-06-12: Initialized git repo, set up project structure by doing following steps : 
    - Install node.js , npm , VScode
    - Run "npm init" in VScode terminal to initiate a file named package.json which is the heart of this project , its function is same as that of pom.xml in a Maven project
    - Run "npm install cypress --save-dev" to install latest version of cypress , this command will create a directory named node_modules which contains all dependencies related to project
    - Run command "npx cypress open" to open Cypress Test Runner , when ran for the first time , it will create a default project structure inside a directory named cypress

- 2025-06-13: 
    - Added test cases for GET API , https://gorest.co.in/ is being used for automation in the project
    - Added test cases for POST API , https://gorest.co.in/ is being used for automation in the project
    - Added test cases as an example for API chaining
    
- 2025-06-14: 
    - Added test cases for PUT API and made minor modifications to remove hard coding from project
    - Added test cases for DELETE API

## 2025-06-15

### Added Mochawesome Report Integration
- Run:
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