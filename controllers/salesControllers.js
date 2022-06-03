const salesService = require('../services/salesService');

const getSales = async (req, res) => {
  const sales = await salesService.getSales(req.params);
  return !sales.length
    ? res.status(404).json({ message: 'Sale not found' })
    : res.status(200).json(sales);
};

module.exports = {
  getSales,
};
