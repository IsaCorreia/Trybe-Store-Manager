const sinon = require("sinon");
const chai = require("chai");
// const chaiHttp = require("chai-http");
// chai.use(chaiHttp);
const { expect } = chai;

const salesController = require("../../../controllers/salesControllers");
const salesService = require("../../../services/salesService");
// const app = require("../../../app");

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

const errorMock = { message: "Sale not found" };

describe("---> Teste de Controllers: Sales", () => {
  describe("GET /sales", () => {
    let request = {};
    let response = {};
    before(async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(allSalesMock);
      sinon.stub(salesService, "getSales").resolves(allSalesMock);
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
        response.json = sinon.stub().returns(idSaleMock);
        sinon.stub(salesService, "getSales").resolves(idSaleMock);
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
        response.json = sinon.stub().returns(errorMock);
        sinon.stub(salesService, "getSales").resolves(errorMock);
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
