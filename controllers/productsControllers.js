const productsService = require('../services/productsService');

const getProducts = async (req, res) => {
  const products = await productsService.getProducts(req.params);
  if (products === undefined) res.status(404).json({ message: 'Product not found' });
  res.status(200).json(products);
};

module.exports = {
  getProducts,
};