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

});
