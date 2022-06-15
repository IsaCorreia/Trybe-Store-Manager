const salesService = require('../services/salesService');
const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NO_CONTENT_STATUS,
} = require('../helpers/httpStatusCodes');

const getSales = async (req, res) => {
  const sales = await salesService.getSales(req.params);
  return !sales.length
    ? res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Sale not found' })
    : res.status(HTTP_OK_STATUS).json(sales);
};

const addSale = async (req, res) => {
  const newSale = await salesService.addSale(req.body);
  return res.status(HTTP_CREATED_STATUS).json(newSale);
};

const updateSale = async (req, res) => {
  const updatedSale = await salesService.updateSale(req.params, ...req.body);
  return res.status(HTTP_OK_STATUS).json(updatedSale);
};

const deleteSale = async (req, res) => {
  const deletedSale = await salesService.deleteSale(req.params);
  return deletedSale === false
    ? res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Sale not found' })
    : res.status(HTTP_NO_CONTENT_STATUS).send();
};

module.exports = {
  getSales,
  addSale,
  updateSale,
  deleteSale,
};
