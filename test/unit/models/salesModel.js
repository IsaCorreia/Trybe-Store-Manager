const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const connection = require("../../../models/connection");
const salesModel = require("../../../models/salesModel");
const {
  modelMocks: { getSalesMock },
} = require("../mocks");

describe("---> Teste de Model: Sales", () => {
  describe("getSales", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(getSalesMock);
    });
    after(() => {
      connection.execute.restore();
    });

    it("Retorna todas as compras", async () => {
      const result = await salesModel.getSales();
      expect(result).to.be.an("array");
    });
  });

  describe("getSalesById", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(getSalesMock);
    });
    after(() => {
      connection.execute.restore();
    });

    it("Retorna a compra selecionada", async () => {
      const result = await salesModel.getSalesById(1);
      expect(result).to.be.an("array");
    });
  });
  });
