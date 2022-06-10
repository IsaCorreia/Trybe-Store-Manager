const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const salesService = require("../../../services/salesService");
const salesModel = require("../../../models/salesModel");
const allSalesMock = [
  {
    saleId: 1,
    productId: 1,
    quantity: 1,
    date: "",
  },
];

const idSaleMock = [
  {
    productId: 1,
    quantity: 1,
    date: "",
  },
];

describe("---> Teste de Service: Sales", () => {
  describe("getSales sem id", () => {
    before(() => {
      sinon.stub(salesModel, "getSales").returns(allSalesMock);
    });
    after(() => {
      salesModel.getSales.restore();
    });
    it( "Retorna a lista de todos os produtos", async () => {
      const response = await salesService.getSales( { id: false } );
      // console.log('test:', response);

      expect( response ).to.be.an('array');
      // expect( response[0] ).to.be.an( 'object' );
    });
  });

  describe.skip("getSales com id", () => {
    before(() => {
      sinon.stub(salesModel, "getSalesById").returns(idSaleMock[0]);
    });
    after(() => {
      salesModel.getSalesById.restore();
    });

    it( "Válido, retorna o produto selecionado", async () => {
      const response = await salesService.getSales({id: 1});

      expect( response ).to.be.an( 'object' );
    });
    it( "Inválido, retorna código 404 - Product not found", async () => {
      const response = await salesService.getSales({id: 100});

      expect( response ).to.be.an( 'object' );
    });
  });
});
