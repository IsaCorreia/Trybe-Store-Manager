const router = require('express').Router();
const salesController = require('./controllers/salesControllers');
const productsController = require('./controllers/productsControllers');
const indexMiddleware = require('./middlewares/indexMiddleware');

router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProducts);
router.post('/products', indexMiddleware.productValidation, productsController.addProduct);
router.put('/products/:id', indexMiddleware.productValidation, productsController.updateProduct);

router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSales);
router.post('/sales', indexMiddleware.saleValidation);
router.put('/sales/:id', indexMiddleware.saleValidation);

module.exports = router;
