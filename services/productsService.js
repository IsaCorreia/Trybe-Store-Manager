const productsModel = require('../models/productsModel');

const getProducts = async ({ id }) => {
  let products;
  if (id) {
    products = await productsModel.getProductsById(id);
  } else {
    products = await productsModel.getProducts();
  }
  return products;
};

module.exports = {
  getProducts,
};
