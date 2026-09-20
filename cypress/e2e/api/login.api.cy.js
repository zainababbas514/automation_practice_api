describe('Login API', () => {
  let expected;
  let credentials;

  beforeEach(() => {
    cy.fixture('apiAssertions').then((data) => {
      expected = data;
    });

    cy.fixture('userCredentials').then((data) => {
      credentials = data.loginApi;
    });
  });

  it('should login with valid credentials', () => {
    const email = Cypress.env('testEmail');
    const password = Cypress.env('testPassword');

    cy.postRequest('api/verifyLogin', {
      email: email,
      password: password
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.login.success.code);

        expect(body.message)
          .to.eq(expected.login.success.message);
      });
    });
  });

  it('should reject login with invalid password', () => {
    const email = Cypress.env('testEmail');

    cy.postRequest('api/verifyLogin', {
      email: email,
      password: credentials.invalidPassword
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.login.notFound.code);

        expect(body.message)
          .to.eq(expected.login.notFound.message);
      });
    });
  });

  it('should reject login without email', () => {
    const password = Cypress.env('testPassword');

    cy.postRequest('api/verifyLogin', {
      password: password
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.login.missing.code);

        expect(body.message)
          .to.eq(expected.login.missing.message);
      });
    });
  });

  it('should reject login without password', () => {
    const email = Cypress.env('testEmail');

    cy.postRequest('api/verifyLogin', {
      email: email
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.login.missing.code);

        expect(body.message)
          .to.eq(expected.login.missing.message);
      });
    });
  });

  it('should reject unsupported DELETE method', () => {
    cy.unsupportedRequest('DELETE', 'api/verifyLogin').then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.unsupportedMethod.code);

        expect(body.message)
          .to.eq(expected.unsupportedMethod.message);
      });
    });
  });
});
