const router = require('express').Router();
const salesController = require('./controllers/salesControllers');
const productsController = require('./controllers/productsControllers');
const indexMiddleware = require('./middlewares/indexMiddleware');

router.use('/products', productsController);

router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSales);
router.post('/sales', indexMiddleware.saleValidation, salesController.addSale);
router.put('/sales/:id', indexMiddleware.saleValidation, salesController.updateSale);

module.exports = router;
