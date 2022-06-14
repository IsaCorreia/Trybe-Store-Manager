const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");
const {
  serviceMocks: { addProductMock, getProductsMock },
} = require("../mocks");

describe("---> Teste de Service: Products", () => {
  describe("getProducts sem id", () => {
    before(() => {
      sinon.stub(productsModel, "getProducts").returns(getProductsMock);
    });
    after(() => {
      productsModel.getProducts.restore();
    });
    it("Retorna a lista de todos os produtos", async () => {
      const response = await productsService.getProducts({ id: false });
      expect(response).to.be.an("array");
      expect(response[0]).to.be.an("object");
    });
  });

  describe("getProducts com id", () => {
    before(() => {
      sinon.stub(productsModel, "getProductsById").returns(getProductsMock[0]);
    });
    after(() => {
      productsModel.getProductsById.restore();
    });

    it("Válido, retorna o produto selecionado", async () => {
      const response = await productsService.getProducts({ id: 1 });
      expect(response).to.be.an("object");
    });
    it("Inválido, retorna código 404 - Product not found", async () => {
      const response = await productsService.getProducts({ id: 100 });
      expect(response).to.be.an("object");
    });
  });

  describe("addProducts", () => {
    describe("Produto válido", () => {
      before(() => {
        sinon.stub(productsModel, "getProducts").returns(getProductsMock);
        sinon.stub(productsModel, "addProduct").returns(addProductMock);
      });
      after(() => {
        productsModel.addProduct.restore();
        productsModel.getProducts.restore();
      });
      it("retorna o objeto do produto cadastrado", async () => {
        const response = await productsService.addProduct({
          name: "produto",
          quantity: 10,
        });
        expect(response).to.an("object");
      });
    });

    describe("Produto inválido - já existe", () => {
      before(() => {
        sinon.stub(productsModel, "getProducts").returns([addProductMock]);
        sinon.stub(productsModel, "addProduct").returns(addProductMock);
      });
      after(() => {
        productsModel.addProduct.restore();
        productsModel.getProducts.restore();
      });
      it("retorna 'false'", async () => {
        const response = await productsService.addProduct({
          name: "produto",
          quantity: 10,
        });
        expect(response).to.be.false;
      });
    });
  });
});
