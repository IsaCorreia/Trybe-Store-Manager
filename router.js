const router = require('express').Router();
const salesController = require('./controllers/salesControllers');
const productsController = require('./controllers/productsControllers');
const productValidation = require('./middlewares/productValidation');

router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProducts);
router.post('/products', productValidation);

router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSales);

module.exports = router;
