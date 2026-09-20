describe('Brands API', () => {
  let expected;

  beforeEach(() => {
    cy.fixture('apiAssertions').then((data) => {
      expected = data;
    });
  });

  it('should return all brands', () => {
    cy.getRequest('api/brandsList').then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode).to.eq(200);

        expect(body.brands)
          .to.be.an('array')
          .and.not.be.empty;

        body.brands.forEach((brand) => {
          expect(brand)
            .to.have.property('brand')
            .and.not.be.empty;
        });
      });
    });
  });

  it('should reject unsupported PUT method', () => {
    cy.unsupportedRequest('PUT', 'api/brandsList').then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.unsupportedMethod.code);

        expect(body.message)
          .to.eq(expected.unsupportedMethod.message);
      });
    });
  });
});