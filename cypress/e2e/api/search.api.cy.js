describe('Search API', () => {
  let data;
  let expected;

  beforeEach(() => {
    cy.fixture('searchData').then((fixtureData) => {
      data = fixtureData;
    });

    cy.fixture('apiAssertions').then((fixtureData) => {
      expected = fixtureData;
    });
  });

  it('should return products for a valid keyword', () => {
    cy.postRequest('api/searchProduct', {
      search_product: data.validKeyword
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.successCode);

        expect(body.products)
          .to.be.an('array')
          .and.not.be.empty;

        body.products.forEach((product) => {
          expect(product.name.toLowerCase())
            .to.contain(data.validKeyword.toLowerCase());
        });
      });
    });
  });

  it('should handle search with special characters', () => {
    cy.postRequest('api/searchProduct', {
      search_product: data.specialCharactersKeyword
    }).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.successCode);

        body.products.forEach((product) => {
          expect(product.name.toLowerCase())
            .to.contain(data.specialCharactersKeyword.toLowerCase());
        });
      });
    });
  });

  it('should reject search without keyword parameter', () => {
    cy.postRequest('api/searchProduct', {}).then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.search.missing.code);

        expect(body.message)
          .to.eq(expected.search.missing.message);
      });
    });
  });

  it('should reject unsupported PUT method', () => {
    cy.unsupportedRequest('PUT', 'api/searchProduct').then((response) => {
      cy.getResponseBody(response).then((body) => {
        expect(body.responseCode)
          .to.eq(expected.unsupportedMethod.code);

        expect(body.message)
          .to.eq(expected.unsupportedMethod.message);
      });
    });
  });
});
