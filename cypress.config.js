const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },

    baseUrl: "https://automationexercise.com/",

    reporter: "cypress-mochawesome-reporter",
    
    env: {
      testEmail: process.env.TEST_EMAIL,
      testPassword: process.env.TEST_PASSWORD,
    },

    reporterOptions: {
      charts: true,
      reportPageTitle: "Automation Exercise API Tests",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
  },
});
