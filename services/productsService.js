const productsModel = require('../models/productsModel');

const getProducts = async ({ id }) => {
  const products = await productsModel.getProducts();
  return products;
};

module.exports = {
  getProducts,
};