const router = require('express').Router();
const salesController = require('./controllers/salesControllers');
const productsController = require('./controllers/productsControllers');
const indexMiddleware = require('./middlewares/indexMiddleware');

router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProducts);
router.post('/products', indexMiddleware.productValidation);

router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSales);

module.exports = router;
