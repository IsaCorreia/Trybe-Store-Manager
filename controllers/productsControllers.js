const productsService = require('../services/productsService');

const getProducts = async (req, res) => {
  const products = await productsService.getProducts(req.params);
  res.status(200).json(products);
};

module.exports = {
  getProducts,
};