const productsService = require('../services/productsService');
const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_CONFLICT_STATUS,
} = require('../helpers/httpStatusCodes');

const getProducts = async (req, res) => {
  const products = await productsService.getProducts(req.params);
  return products === undefined
    ? res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' })
    : res.status(HTTP_OK_STATUS).json(products);
};

const addProduct = async (req, res) => {
  const newProduct = await productsService.addProduct(req.body);
  return newProduct === false
    ? res.status(HTTP_CONFLICT_STATUS).json({ message: 'Product already exists' })
    : res.status(HTTP_CREATED_STATUS).json(newProduct);
};

const updateProduct = async (req, res) => {
  const updatedProduct = await productsService.updateProduct(req.params, req.body);
  return updatedProduct === false
    ? res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' })
    : res.status(HTTP_OK_STATUS).json(updatedProduct);
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
};
