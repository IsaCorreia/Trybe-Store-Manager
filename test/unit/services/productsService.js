const sinon = require("sinon");
const chai = require("chai");
// const chaiHttp = require("chai-http");
// chai.use(chaiHttp);
const { expect } = chai;

const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");
const productsMock = [
  {
    id: 1,
    name: "Martelo do Thor",
    quantity: 6,
  },
  {
    id: 2,
    name: "Escudo do Capitão América",
    quantity: 10,
  },
];

describe("---> Teste de Service: Products", () => {
  describe("getProducts sem id", () => {
    before(() => {
      sinon.stub(productsModel, "getProducts").returns(productsMock);
    });
    after(() => {
      productsModel.getProducts.restore();
    });
    it( "Retorna a lista de todos os produtos", async () => {
      const response = await productsService.getProducts({id: false});

      expect( response ).to.be.an( 'array' );
      expect( response[0] ).to.be.an( 'object' );
    });
  });

  describe("getProducts com id", () => {
    before(() => {
      sinon.stub(productsModel, "getProductsById").returns(productsMock[0]);
    });
    after(() => {
      productsModel.getProductsById.restore();
    });

    it( "Válido, retorna o produto selecionado", async () => {
      const response = await productsService.getProducts({id: 1});

      expect( response ).to.be.an( 'object' );
    });
    it( "Inválido, retorna código 404 - Product not found", async () => {
      const response = await productsService.getProducts({id: 100});

      expect( response ).to.be.an( 'object' );
    });
  });
});
