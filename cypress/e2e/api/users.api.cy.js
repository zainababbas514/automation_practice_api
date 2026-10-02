describe('User Details by Email API', () => {
  let expected;
  let accounts;

  beforeEach(() => {
    cy.fixture('apiAssertions').then((data) => {
      expected = data;
    });

    cy.fixture('userCredentials').then((data) => {
      accounts = data;
    });
  });

  it('should return user details for a valid email', () => {
    const email = Cypress.env('testEmail');

    cy.getRequest('api/getUserDetailByEmail', { email }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.successCode);

        expect(body.user)
          .to.exist
          .and.be.an('object');

        expect(body.user.email)
          .to.eq(email);
      });
    });
  });

  it('should reject a non-existing email', () => {
    const email = accounts.invalidCredentials.email;

    cy.getRequest('api/getUserDetailByEmail', { email }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.userDetails.notFound.code);

        expect(body.message)
          .to.include(expected.userDetails.notFound.message);
      });
    });
  });

  it('should reject request without email', () => {
    cy.getRequest('api/getUserDetailByEmail').then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.userDetails.missing.code);

        expect(body.message)
          .to.eq(expected.userDetails.missing.message);
      });
    });
  });
});
