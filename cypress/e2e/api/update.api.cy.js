describe('Update Account API', () => {
  let expected;
  let updateData;

  beforeEach(() => {
    cy.fixture('apiAssertions').then((data) => {
      expected = data.updateAccount;
    });

    cy.fixture('updateData').then((data) => {
      updateData = data;
    });
  });

  it('should update an account with valid data', () => {
    const validUpdate = {
      email: Cypress.env('testEmail'),
      password: Cypress.env('testPassword'),
      ...updateData.validUpdate
    };

    cy.putRequest('api/updateAccount', validUpdate).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.success.code);

        expect(body.message)
          .to.include(expected.success.message);
      });
    });
  });

  it('should reject update with missing required fields', () => {
    const missingFields = {
      email: Cypress.env('testEmail'),
      ...updateData.missingFields
    };

    cy.putRequest('api/updateAccount', missingFields).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.missing.code);

        expect(body.message)
          .to.include(expected.missing.message);
      });
    });
  });

  it('should reject update for a non-existing user', () => {
    cy.putRequest(
      'api/updateAccount',
      updateData.nonExistingUser
    ).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.notFound.code);

        expect(body.message)
          .to.include(expected.notFound.message);
      });
    });
  });
});
