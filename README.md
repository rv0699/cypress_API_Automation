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

- 2025-06-15
    - Added mochawsome report integration 
        - Run "npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator"
        - Added following under e2e in cypress.config.js : 
            {
                reporter: 'mochawesome',
                reporterOptions: {
                    reportDir: 'cypress/reports/mochawesome',
                    overwrite: false,
                    html: true,
                    json: true
            }
        - Added test script along with pretest and post test operations to delete old reports before test execution starts and merge individual test execution report into a combined report for all test executions :
            "scripts": 
            {
                "pretest": "rm -rf cypress/reports mochawesome-report mochawesome.json",
                "test": "cypress run",
                "posttest": "mochawesome-merge cypress/reports/mochawesome/*.json > mochawesome.json && marge mochawesome.json"
            }

## How to Use
Step 1 : "npm install" to install all relevant dependencies mentioned in package.json
Step 2 : update token value in createUser.json present in cypress/fixtures
Step 3 : "npm run test" to execute all test cases present under apiTests
Step 4 : View generated report under "mochawesome-report" with the name "mochawesome.html"