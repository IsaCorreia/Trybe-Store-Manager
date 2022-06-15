const controllerMocks = {
  // Products Mocks
  getProductsMock: [
    { id: 1, name: "Martelo do Thor", quantity: 6 },
    { id: 2, name: "Escudo do Capitão América", quantity: 10 },
  ],
  getProductsByIdMock: [{ id: 1, name: "Martelo do Thor", quantity: 6 }],
  addProductMock: { id: 1, name: "produto", quantity: 10 },
  productErrorMock: { message: "Product not found" },

  // Sales Mocks
  getSalesMock: [
    { saleId: 1, productId: 1, quantity: 1, date: "" },
    { saleId: 2, productId: 2, quantity: 2, date: "" },
  ],
  getSalesByIdMock: [{ productId: 1, quantity: 1, date: "" }],
  saleErrorMock: { message: "Sale not found" },
};
const serviceMocks = {
  // Products Mocks
  getProductsMock: [
    { id: 1, name: "Martelo do Thor", quantity: 6 },
    { id: 2, name: "Escudo do Capitão América", quantity: 10 },
  ],
  getProductsByIdMock: [{ id: 1, name: "Martelo do Thor", quantity: 6 }],
  addProductMock: { id: 1, name: "produto", quantity: 10 },

  // Sales Mocks
  getSalesMock: [
    { saleId: 1, productId: 1, quantity: 1, date: "" },
    { saleId: 2, productId: 2, quantity: 2, date: "" },
  ],
  getSalesByIdMock: [{ productId: 1, quantity: 1, date: "" }],
  addSaleMock: [{ productId: 1, quantity: 1 }],
  resultSaleMock: { id: 1, itemsSold: [{ productId: 1, quantity: 1 }] },
};
const modelMocks = {
  getSalesMock: [
    [
      {
        sale_id: 1,
        product_id: 1,
        quantity: 5,
        id: 1,
        date: "2022-06-10T22:19:10.000Z",
      },
      {
        sale_id: 1,
        product_id: 2,
        quantity: 10,
        id: 1,
        date: "2022-06-10T22:19:10.000Z",
      },
      {
        sale_id: 2,
        product_id: 3,
        quantity: 15,
        id: 2,
        date: "2022-06-10T22:19:10.000Z",
      },
    ],
  ],
  getProductsMock: [
    [
      { id: 1, name: "Martelo de Thor", quantity: 10 },
      { id: 2, name: "Traje de encolhimento", quantity: 20 },
      { id: 3, name: "Escudo do Capitão América", quantity: 30 },
    ],
  ],
};

module.exports = { controllerMocks, serviceMocks, modelMocks };
