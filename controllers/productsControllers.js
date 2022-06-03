const productsService = require('../services/productsService');
const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
} = require('../helpers/httpStatusCodes');

const getProducts = async (req, res) => {
  const products = await productsService.getProducts(req.params);
  return products === undefined
    ? res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' })
    : res.status(HTTP_OK_STATUS).json(products);
};

module.exports = {
  getProducts,
};
