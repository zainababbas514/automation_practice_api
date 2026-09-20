// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getRequest', (url, qs = {}) => {
  return cy.request({
    method: 'GET',
    url,
    qs
  });
});

Cypress.Commands.add('postRequest', (url, body) => {
  return cy.request({
    method: 'POST',
    url,
    form: true,
    body
  });
});

Cypress.Commands.add('putRequest', (url, body) => {
  return cy.request({
    method: 'PUT',
    url,
    form: true,
    body
  });
});

Cypress.Commands.add('deleteRequest', (url, body) => {
  return cy.request({
    method: 'DELETE',
    url,
    form: true,
    body
  });
});

Cypress.Commands.add('unsupportedRequest', (method, url) => {
  return cy.request({
    method,
    url,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('getResponseBody', (response) => {
  return typeof response.body === 'string'
    ? JSON.parse(response.body)
    : response.body;
});