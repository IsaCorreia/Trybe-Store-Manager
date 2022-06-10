const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;

const server = require("../../../app");

describe("---> Teste de Controllers: Sales", () => {
  describe("GET /sales", () => {
      let response;
      before(async () => {
        response = await chai.request(server).get("/sales");
      });

      it("É recebido código 200",  () => {
        expect(response).to.have.status(200);
      });

      it("É recebido a lista de vendas",  () => {
        expect( response ).to.be.an( "object" );
        const parseResponse = JSON.parse(response.text);
        expect(parseResponse[0]).to.have.property("saleId");
        expect(parseResponse[0]).to.have.property("productId");
        expect(parseResponse[0]).to.have.property("quantity");
        expect(parseResponse[0]).to.have.property("date");
      });
    });

  describe(" GET /sales/:id", () => {
    describe("com ID válido", () => {
      let response;
      before(async () => {
        response = await chai.request(server).get("/sales/1");
      });

      it("É recebido código 200",  () => {
        expect(response).to.have.status(200);
      });
      
      it("É recebido a venda selecionado",  () => {
        expect(response).to.be.an("object");
        const parseResponse = JSON.parse(response.text);
        expect(parseResponse[0]).to.have.property("productId");
        expect(parseResponse[0]).to.have.property("quantity");
        expect(parseResponse[0]).to.have.property("date");
      });
    } );
    describe("com ID inválido", () => {
      let response;
      before( async () => {
        response = await chai.request(server).get("/sales/100");
      });

      it("É recebido código 404",  () => {
        expect(response).to.have.status(404);
      });

      it("É recebido a mensagem 'Sale not found'",  () => {
        expect(response).to.be.an("object");

        const parseResponse = JSON.parse(response.text);
        expect(parseResponse).to.have.property("message");
        expect(parseResponse.message).to.be.an.string("Sale not found");
      });
    } );
  });
});
