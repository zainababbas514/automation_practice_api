describe('Products API', () => {
  let expected;

  beforeEach(() => {
    cy.fixture('apiAssertions').then((data) => {
      expected = data;
    });
  });

  it('should return all products', () => {
    cy.getRequest('api/productsList').then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.successCode);

        expect(body.products)
          .to.be.an('array')
          .and.not.be.empty;

        body.products.forEach((product) => {
          expect(product).to.include.all.keys(
            'id',
            'name',
            'price',
            'brand',
            'category'
          );
        });
      });
    });
  });

  it('should reject unsupported POST method', () => {
    cy.unsupportedRequest('POST', 'api/productsList').then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.unsupportedMethod.code);

        expect(body.message)
          .to.eq(expected.unsupportedMethod.message);
      });
    });
  });
});
