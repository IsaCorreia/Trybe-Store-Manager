const productsRouter = require('express').Router();
const indexMiddleware = require('../middlewares/indexMiddleware');
const productsService = require('../services/productsService');
const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_CONFLICT_STATUS,
  HTTP_NO_CONTENT_STATUS,
} = require('../helpers/httpStatusCodes');

productsRouter.get('/', async (req, res) => {
  const products = await productsService.getProducts({ id: false });
  return res.status(HTTP_OK_STATUS).json(products);
});

productsRouter.get('/:id', async (req, res) => {
  const products = await productsService.getProducts(req.params);
  return products === undefined
    ? res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' })
    : res.status(HTTP_OK_STATUS).json(products);
});

productsRouter.post('/', indexMiddleware.productValidation, async (req, res) => {
  const newProduct = await productsService.addProduct(req.body);
  return newProduct === false
    ? res.status(HTTP_CONFLICT_STATUS).json({ message: 'Product already exists' })
    : res.status(HTTP_CREATED_STATUS).json(newProduct);
});

productsRouter.put('/:id', indexMiddleware.productValidation, async (req, res) => {
  const updatedProduct = await productsService.updateProduct(req.params, req.body);
  return updatedProduct === false
    ? res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' })
    : res.status(HTTP_OK_STATUS).json(updatedProduct);
});

productsRouter.delete('/:id', async (req, res) => {
  const deletedProduct = await productsService.deleteProduct(req.params);
  return deletedProduct === false
    ? res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' })
    : res.status(HTTP_NO_CONTENT_STATUS).send();
});

module.exports = productsRouter;
