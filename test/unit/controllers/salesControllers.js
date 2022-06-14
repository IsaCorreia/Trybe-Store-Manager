const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const {
  controllerMocks: { getSalesMock, getSalesByIdMock, saleErrorMock },
} = require("../mocks");
const salesController = require("../../../controllers/salesControllers");
const salesService = require("../../../services/salesService");

describe("---> Teste de Controllers: Sales", () => {
  describe("GET /sales", () => {
    let request = {};
    let response = {};

    before(async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(getSalesMock);
      sinon.stub(salesService, "getSales").resolves(getSalesMock);
    });

    after(() => {
      salesService.getSales.restore();
    });

    it("É recebido código 200", async () => {
      await salesController.getSales(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it("É recebido a lista de vendas", async () => {
      const result = await salesController.getSales(request, response);

      expect(result).to.be.an("array");
      expect(result[0]).to.have.property("saleId");
      expect(result[0]).to.have.property("productId");
      expect(result[0]).to.have.property("quantity");
      expect(result[0]).to.have.property("date");
    });
  });

  describe(" GET /sales/:id", () => {
    describe("com ID válido", () => {
      let request = {};
      let response = {};

      before(async () => {
        request.params = { id: 1 };
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(getSalesByIdMock);
        sinon.stub(salesService, "getSales").resolves(getSalesByIdMock);
      });

      after(() => {
        salesService.getSales.restore();
      });

      it("É recebido código 200", async () => {
        await salesController.getSales(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it("É recebido a venda selecionado", async () => {
        const result = await salesController.getSales(request, response);
        expect(result).to.be.an("array");
        expect(result[0]).to.have.property("productId");
        expect(result[0]).to.have.property("quantity");
        expect(result[0]).to.have.property("date");
      });
    });

    describe("com ID inválido", () => {
      let request = {};
      let response = {};

      before(async () => {
        request.params = { id: 100 };
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(saleErrorMock);
        sinon.stub(salesService, "getSales").resolves(saleErrorMock);
      });

      after(() => {
        salesService.getSales.restore();
      });

      it("É recebido código 404", async () => {
        await salesController.getSales(request, response);
        expect(response.status.calledWith(404)).to.be.true;
      });

      it("É recebido a mensagem 'Sale not found'", async () => {
        const result = await salesController.getSales(request, response);
        expect(result).to.be.an("object");
        expect(result).to.have.property("message");
        expect(result.message).to.be.an.string("Sale not found");
      });
    });
  });
});
