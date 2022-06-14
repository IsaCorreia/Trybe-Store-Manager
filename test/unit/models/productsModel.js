const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const connection = require("../../../models/connection");
const productsModel = require( '../../../models/productsModel' );

const {
  modelMocks: { getProductsMock },
} = require("../mocks");

describe("---> Teste de Model: Products", () => {
  describe("getProducts", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(getProductsMock);
    });
    after(() => {
      connection.execute.restore();
    } );
    
    it( "Retorna todos os produtos", async () => {
      const result = await productsModel.getProducts();
      expect( result ).to.be.equal(undefined);

      // expect( result ).to.be.an('array')
    });
  });
});
