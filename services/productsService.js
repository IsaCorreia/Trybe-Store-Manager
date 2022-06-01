const productsModel = require('../models/productsModel');

const getProducts = async ({ id }) => {
  if (id) {
    const products = await productsModel.getProductsById(id);
    return products;
  }
  const products = await productsModel.getProducts();
  return products;
};

module.exports = {
  getProducts,
};
