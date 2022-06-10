const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;

const productsService = require("../../../services/productsService");
const app = require("../../../app");

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

const errorMock = { message: "Product not found" };

describe("---> Teste de Controllers: Products", () => {
  describe("GET /products", () => {
    let request = {};
    let response = {};

    before(async () => {
      request.body = {};
      sinon.stub(productsService, "getProducts").resolves(productsMock);
      response = await chai.request(app).get("/products");
    });

    after(() => {
      productsService.getProducts.restore();
    });

    it("É recebido código 200", () => {
      expect(response).to.have.status(200);
    });

    it("É recebido a lista de produtos", () => {
      expect(response).to.be.an("object");

      const parseResponse = JSON.parse(response.text);
      expect(parseResponse[0]).to.have.property("id");
      expect(parseResponse[0]).to.have.property("name");
      expect(parseResponse[0]).to.have.property("quantity");
    });
  });

  describe(" GET /products/:id", () => {
    describe("com ID válido", () => {
      let request = {};
      let response = {};

      before(async () => {
        request.body = {};
        sinon.stub(productsService, "getProducts").resolves(productsMock[0]);
        response = await chai.request(app).get("/products");
      });
      after(() => {
        productsService.getProducts.restore();
      });

      it("É recebido código 200", () => {
        expect(response).to.have.status(200);
      });

      it("É recebido o produto selecionado", () => {
        expect(response).to.be.an("object");

        const parseResponse = JSON.parse(response.text);
        expect(parseResponse).to.have.property("id");
        expect(parseResponse).to.have.property("name");
        expect(parseResponse).to.have.property("quantity");
      });
    });
    describe("com ID inválido", () => {
      let request = {};
      let response = {};

      before(async () => {
        // request.body = {};
        // sinon.stub(productsService, "getProducts").resolves(errorMock);
        response = await chai.request(app).get("/products/100");
      });
      // after(() => {
      //   productsService.getProducts.restore();
      // });

      it("É recebido código 404", () => {
        expect(response).to.have.status(404);
      });

      it("É recebido a mensagem 'Product not found'", () => {
        expect(response).to.be.an("object");

        const parseResponse = JSON.parse(response.text);
        expect(parseResponse).to.have.property("message");
        expect(parseResponse.message).to.be.an.string("Product not found");
      });
    });
  });
});
