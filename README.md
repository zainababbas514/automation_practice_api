# Automation Exercise API Testing

A Cypress-based API test automation project for testing the **Automation Exercise** application using JavaScript and Cypress.

## 🧪 Project Overview

This project automates key REST API workflows of the Automation Exercise application, including product and brand retrieval, user registration, login, account deletion, account updates, product search, and user details.

The framework is designed with reusable Cypress custom commands, external JSON test data, environment variables, API response assertions, and Mochawesome reporting.

## 🛠️ Tech Stack

* **JavaScript**
* **Cypress**
* **REST API Testing**
* **Mochawesome**
* **JSON Fixtures**
* **Cypress Custom Commands**
* **dotenv**
* **Git / GitHub**

## 📋 Test Coverage

The automation suite covers the following API areas:

* Get all brands
* Validate unsupported HTTP method for Brands API
* Get all products
* Validate unsupported HTTP method for Products API
* Create an account with valid data
* Create an account with an existing email
* Create an account with missing required data
* Delete an account with valid credentials
* Delete an account with invalid credentials
* Attempt to delete an already deleted account
* Login with valid credentials
* Login with an invalid password
* Login without an email
* Login without a password
* Validate unsupported HTTP method for Login API
* Search products using a valid keyword
* Search products using special characters
* Search without a search keyword
* Validate unsupported HTTP method for Search API
* Update an account with valid data
* Update an account with missing required data
* Update a non-existing account
* Retrieve user details using a valid email
* Retrieve user details using a non-existing email
* Retrieve user details without providing an email

Detailed manual test cases are maintained separately in the `testCases` folder.

## ✨ Framework Features

* Reusable Cypress custom commands for API requests
* Separate test specifications for different API resources
* JSON fixtures for external test data
* Environment variables for sensitive credentials
* `.env.example` template for project configuration
* Positive and negative API scenarios
* HTTP method validation
* API response code and message assertions
* Response body validation
* Dynamic email generation for account creation
* Reusable API assertion data
* Automatic screenshots on test failure
* Mochawesome HTML reporting
* Configurable application `baseUrl`
* Git/GitHub for version control

## 📁 Project Structure

```text
APITesting
├─ .env
├─ .env.example
├─ cypress
│  ├─ e2e
│  │  └─ api
│  │     ├─ brands.api.cy.js
│  │     ├─ createAccount.api.cy.js
│  │     ├─ delete.api.cy.js
│  │     ├─ login.api.cy.js
│  │     ├─ products.api.cy.js
│  │     ├─ search.api.cy.js
│  │     ├─ update.api.cy.js
│  │     └─ users.api.cy.js
│  │
│  ├─ fixtures
│  │  ├─ apiAssertions.json
│  │  ├─ registrationData.json
│  │  ├─ searchData.json
│  │  ├─ updateData.json
│  │  └─ userCredentials.json
│  │
│  └─ support
│     ├─ commands.js
│     └─ e2e.js
│
├─ .gitignore
├─ cypress.config.js
├─ package-lock.json
├─ package.json
├─ README.md
└─ testCases
   └─ AutomationExerciseAPI_Test_Cases.xlsx
```

> Generated files such as `node_modules`, screenshots, videos, reports, and local environment files are excluded from version control through `.gitignore`.

## 🔄 Cypress Custom Commands

Reusable API request commands are implemented in:

```text
cypress/support/commands.js
```

The project includes custom commands for:

* GET requests
* POST requests
* PUT requests
* DELETE requests
* Unsupported HTTP methods
* Response body parsing

For example:

```javascript
cy.getRequest()
cy.postRequest()
cy.putRequest()
cy.deleteRequest()
cy.unsupportedRequest()
cy.getResponseBody()
```

These commands reduce repeated request configuration and keep the API test specifications focused on test scenarios and assertions.

## 🧪 Test Data Management

Test data is maintained separately from test logic using Cypress fixtures:

```text
cypress/fixtures/

Separating test data from test logic makes the test suite easier to maintain and allows test data to be updated without modifying the test implementation.

## 🔐 Environment Variables

Sensitive credentials are managed using environment variables instead of being stored directly in the test files.

A `.env.example` file is included as a configuration template:

```text
TEST_EMAIL=
TEST_PASSWORD=
```

The actual credentials are stored locally in `.env`.

### Setup

Create a `.env` file in the project root based on `.env.example`:

```text
TEST_EMAIL=your-email@example.com
TEST_PASSWORD=your-password
```

The `.env` file is excluded from Git through `.gitignore.

The project uses `dotenv` to load environment variables during test execution.

## 📝 Manual Test Cases

Detailed manual test cases are maintained separately in:

```text
testCases/AutomationExerciseAPI_Test_Cases.xlsx
```

## 📊 Mochawesome Reporting

The project uses **Mochawesome** to generate HTML test reports.

The reporter is configured in:

```text
cypress.config.js
```

The report configuration includes:

* Test execution results
* Passed and failed tests
* Test duration
* Test suite information
* Charts
* Embedded screenshots where applicable

Generated reports are excluded from version control through `.gitignore`.

## 🚀 Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project

```bash
cd APITesting
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```text
TEST_EMAIL=your-email@example.com
TEST_PASSWORD=your-password
```

## ▶️ Running Tests

The project provides npm scripts in `package.json` for common Cypress commands.

### Open Cypress in Interactive Mode

```bash
npm run cy:open
```

This opens the Cypress Test Runner, where individual API test files can be selected and executed.

### Run the Complete Test Suite

```bash
npm run cy:run
```

You can also use the standard npm test command:

```bash
npm test
```

### Run Tests in a Specific Browser

```bash
npm run test:browser -- chrome
```

For example, to run the tests in Chrome.

### Run a Specific API Spec

```bash
npm run test:spec -- "cypress/e2e/api/login.api.cy.js"
```

For example:

```bash
npm run test:spec -- "cypress/e2e/api/products.api.cy.js"
```

### Run All API Specs

```bash
npm run test:spec -- "cypress/e2e/api/**/*.cy.js"
```

## 📦 Available npm Scripts

The main scripts defined in `package.json` are:

```json
"scripts": {
  "cy:open": "cypress open",
  "cy:run": "cypress run",
  "test": "cypress run",
  "test:browser": "cypress run --browser",
  "test:spec": "cypress run --spec"
}
```

| Script                           | Purpose                                          |
| -------------------------------- | ------------------------------------------------ |
| `npm run cy:open`                | Opens Cypress in interactive mode                |
| `npm run cy:run`                 | Runs the complete Cypress suite in headless mode |
| `npm test`                       | Runs the complete Cypress suite                  |
| `npm run test:browser -- chrome` | Runs tests in the specified browser              |
| `npm run test:spec -- <spec>`    | Runs a specific Cypress spec                     |

## 🌐 API Under Test

**Automation Exercise**

The API documentation used for this project:

[Automation Exercise API List](https://automationexercise.com/api_list)

## 📌 Project Notes

This is a **test automation practice project** created to demonstrate practical skills in:

* Cypress API testing
* JavaScript
* REST API testing
* HTTP methods
* API response validation
* Test data management
* Custom Cypress commands
* Environment variable management
* Positive and negative testing
* API assertions
* Mochawesome reporting
* Git/GitHub
