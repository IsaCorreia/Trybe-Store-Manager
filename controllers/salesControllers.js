const salesService = require('../services/salesService');

const getSales = async (req, res) => {
  const sales = await salesService.getSales(req.params);
  res.status(200).json(sales);
};

module.exports = {
  getSales,
};