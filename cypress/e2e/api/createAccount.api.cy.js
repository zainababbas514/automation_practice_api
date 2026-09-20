describe('Create Account API', () => {
  let basePayload;
  let expected;

  beforeEach(() => {
    cy.fixture('registrationData').then((data) => {
      basePayload = data;
    });

    cy.fixture('apiAssertions').then((data) => {
      expected = data.registration;
    });
  });

  it('should create an account with valid data', () => {
    const uniqueEmail = `test.user.${Date.now()}@example.com`;

    cy.postRequest('api/createAccount', {
      ...basePayload,
      email: uniqueEmail
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode).to.eq(expected.success.code);
        expect(body.message).to.include(expected.success.message);
      });
    });
  });

  it('should reject account creation with an existing email', () => {
    const existingEmail = `test.user.${Date.now()}@example.com`;

    // Create the account first
    cy.postRequest('api/createAccount', {
      ...basePayload,
      email: existingEmail
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode).to.eq(expected.success.code);
      });
    });

    // Try to create another account with the same email
    cy.postRequest('api/createAccount', {
      ...basePayload,
      email: existingEmail
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode).to.eq(expected.duplicate.code);
        expect(body.message).to.include(expected.duplicate.message);
      });
    });
  });

  it('should reject account creation with missing required fields', () => {
    const incompletePayload = {
      ...basePayload
    };

    cy.postRequest('api/createAccount', incompletePayload).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode).to.eq(expected.missing.code);
        expect(body.message).to.include(expected.missing.message);
      });
    });
  });
});
