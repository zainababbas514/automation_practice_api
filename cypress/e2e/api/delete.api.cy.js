describe('DELETE API', () => {
  let basePayload;
  let expected;
  let credentials;

  beforeEach(() => {
    cy.fixture('registrationData').then((data) => {
      basePayload = data;
    });

    cy.fixture('apiAssertions').then((data) => {
      expected = data;
    });

    cy.fixture('userCredentials').then((data) => {
      credentials = data.deleteApi;
    });
  });

  it('should delete an account with valid credentials', () => {
    const userEmail = `test.user.${Date.now()}@example.com`;

    cy.postRequest('api/createAccount', {
      ...basePayload,
      email: userEmail
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.registration.success.code);
      });
    });

    cy.deleteRequest('api/deleteAccount', {
      email: userEmail,
      password: basePayload.password
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.delete.success.code);

        expect(body.message)
          .to.include(expected.delete.success.message);
      });
    });
  });

  it('should reject deletion with invalid credentials', () => {
    cy.deleteRequest(
      'api/deleteAccount',
      credentials.invalidCredentials
    ).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.delete.notFound.code);

        expect(body.message)
          .to.include(expected.delete.notFound.message);
      });
    });
  });

  it('should reject deletion of an already deleted account', () => {
    const userEmail = `test.user.${Date.now()}@example.com`;

    // Create the account first
    cy.postRequest('api/createAccount', {
      ...basePayload,
      email: userEmail
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.registration.success.code);
      });
    });

    // Delete the account
    cy.deleteRequest('api/deleteAccount', {
      email: userEmail,
      password: basePayload.password
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.delete.success.code);
      });
    });

    // Try deleting the same account again
    cy.deleteRequest('api/deleteAccount', {
      email: userEmail,
      password: basePayload.password
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.delete.notFound.code);

        expect(body.message)
          .to.include(expected.delete.notFound.message);
      });
    });
  });
});
