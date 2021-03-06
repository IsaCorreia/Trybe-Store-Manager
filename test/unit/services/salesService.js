const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const salesService = require("../../../services/salesService");
const salesModel = require("../../../models/salesModel");
const {
  serviceMocks: { getSalesMock, getSalesByIdMock, addSaleMock, resultSaleMock },
} = require("../mocks");

describe("---> Teste de Service: Sales", () => {
  describe("getSales sem id", () => {
    before(() => {
      sinon.stub(salesModel, "getSales").returns(getSalesMock);
    });
    after(() => {
      salesModel.getSales.restore();
    });
    it("Retorna a lista de todos os produtos", async () => {
      const response = await salesService.getSales({ id: false });
      expect(response).to.be.an("array");
    });
  });

  describe("getSales com id", () => {
    before(() => {
      sinon.stub(salesModel, "getSalesById").returns(getSalesByIdMock);
    });
    after(() => {
      salesModel.getSalesById.restore();
    });

    it("Válido, retorna o produto selecionado", async () => {
      const response = await salesService.getSales({ id: 1 });

      expect(response).to.be.an("array");
    });
    it("Inválido, retorna código 404 - Product not found", async () => {
      const response = await salesService.getSales({ id: 100 });

      expect(response).to.be.an("array");
    });
  });

  describe("addSale", () => {
    before(() => {
      sinon.stub(salesModel, "addSale").resolves(resultSaleMock);
    });
    after(() => {
      salesModel.addSale.restore();
    });
    it("Retorna a venda adicionada", async () => {
      result = await salesService.addSale(addSaleMock);

      expect(result).to.be.an("object");
    });
  });
});
