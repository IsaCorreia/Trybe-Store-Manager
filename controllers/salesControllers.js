const salesRouter = require('express').Router();
const indexMiddleware = require('../middlewares/indexMiddleware');
const salesService = require('../services/salesService');
const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CREATED_STATUS,
} = require('../helpers/httpStatusCodes');

salesRouter.get('/', async (req, res) => {
  const sales = await salesService.getSales({ id: false });
  return res.status(HTTP_OK_STATUS).json(sales);
});

salesRouter.get('/:id', async (req, res) => {
  const sales = await salesService.getSales(req.params);
  return !sales.length
    ? res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Sale not found' })
    : res.status(HTTP_OK_STATUS).json(sales);
});

salesRouter.post('/', indexMiddleware.saleValidation, async (req, res) => {
  const newSale = await salesService.addSale(req.body);
  return res.status(HTTP_CREATED_STATUS).json(newSale);
});

salesRouter.put('/:id', indexMiddleware.saleValidation, async (req, res) => {
  const updatedSale = await salesService.updateSale(req.params, ...req.body);
  return res.status(HTTP_OK_STATUS).json(updatedSale);
});

module.exports = salesRouter;
