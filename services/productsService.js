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

const updateProduct = async ({ id }, { name, quantity }) => {
  const canUpdate = await productsModel.getProductsById(id);
  if (!canUpdate) return false;
  await productsModel.updateProduct(id, name, quantity);
  const updatedProduct = await productsModel.getProductsById(id);
  return updatedProduct;
};

const deleteProduct = async ({ id }) => {
  const canDelete = await productsModel.getProductsById(id);
  if (!canDelete) return false;
  await productsModel.deleteProduct(id);
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
