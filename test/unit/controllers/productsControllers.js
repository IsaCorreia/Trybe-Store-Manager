const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const {
  controllerMocks: {
    getProductsMock,
    productErrorMock,
    getProductsByIdMock,
    addProductMock,
  },
} = require("../mocks");
const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsControllers");

describe("---> Teste de Controllers: Products", () => {
  describe("getProducts sem id", () => {
    let request = {};
    let response = {};

    before(async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(getProductsMock);
      sinon.stub(productsService, "getProducts").resolves(getProductsMock);
    });

    after(() => {
      productsService.getProducts.restore();
    });

    it("É recebido código 200", async () => {
      await productsController.getProducts(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it("É recebido a lista de produtos", async () => {
      const result = await productsController.getProducts(request, response);

      expect(result).to.be.an("array");
      expect(result[0]).to.have.property("id");
      expect(result[0]).to.have.property("name");
      expect(result[0]).to.have.property("quantity");
    });
  });

  describe("getProducts com id", () => {
    describe("válido", () => {
      let request = {};
      let response = {};

      before(async () => {
        request.params = { id: 1 };
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(getProductsByIdMock);
        sinon
          .stub(productsService, "getProducts")
          .resolves(getProductsByIdMock);
      });

      after(() => {
        productsService.getProducts.restore();
      });

      it("É recebido código 200", async () => {
        await productsController.getProducts(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it("É recebido o produto selecionado", async () => {
        const result = await productsController.getProducts(request, response);
        expect(result).to.be.an("array");
        expect(result[0]).to.have.property("id");
        expect(result[0]).to.have.property("name");
        expect(result[0]).to.have.property("quantity");
      });
    });

    describe("inválido", () => {
      let request = {};
      let response = {};

      before(async () => {
        request.params = { id: 100 };
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(productErrorMock);
        sinon.stub(productsService, "getProducts").resolves(productErrorMock);
      });

      after(() => {
        productsService.getProducts.restore();
      });

      // it.skip("É recebido código 404", async () => {
      //   // res.status = [Function:  functionStub]
      //   await productsController.getProducts(request, response);
      //   expect(response.status.calledWith(404)).to.be.true;
      // });

      it("É recebido a mensagem 'Product not found'", async () => {
        const result = await productsController.getProducts(request, response);
        expect(result).to.be.an("object");
        expect(result).to.have.property("message");
        expect(result.message).to.be.an.string("Product not found");
      });
    });
  });

  describe("addProduct", () => {
    describe("com produto não cadastrado", () => {
      let request = {};
      let response = {};

      before(() => {
        request.body = { name: "Manopla do Thanos", quantity: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(addProductMock);
        sinon.stub(productsService, "addProduct").resolves(addProductMock);
      });

      after(() => {
        productsService.addProduct.restore();
      });

      it("retorna código 201", async () => {
        await productsController.addProduct(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      });

      it("retorna as informações do produto cadastrado", async () => {
        const result = await productsController.addProduct(request, response);
        expect(result).to.be.an("object");
        expect(result).to.have.property("id");
        expect(result).to.have.property("name");
        expect(result).to.have.property("quantity");
      });
    });
  });
});
