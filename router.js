const router = require('express').Router();
const salesController = require('./controllers/salesControllers');
const productsController = require('./controllers/productsControllers');

router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSales);
router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProducts);

module.exports = router;