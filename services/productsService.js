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

const addProduct = async ({ name, quantity }) => {
  const products = await productsModel.getProducts();
  const canCreate = !products.find((product) => product.name === name);
  if (canCreate === true) {
    const newProduct = await productsModel.addProduct(name, quantity);
    return newProduct;
  }
  return canCreate;
};

module.exports = {
  getProducts,
  addProduct,
};
