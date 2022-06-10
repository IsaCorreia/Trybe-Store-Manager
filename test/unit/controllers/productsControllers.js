const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;

const server = require("../../../app");

describe("---> Teste de Controllers: Products", () => {
  describe("GET /products", () => {
      let response;
      before(async () => {
        response = await chai.request(server).get("/products");
      });

      it("É recebido código 200",  () => {
        expect(response).to.have.status(200);
      });

      it("É recebido a lista de produtos",  () => {
        expect(response).to.be.an("object");

        const parseResponse = JSON.parse(response.text);
        expect(parseResponse[0]).to.have.property("id");
        expect(parseResponse[0]).to.have.property("name");
        expect(parseResponse[0]).to.have.property("quantity");
      });
  });

});
