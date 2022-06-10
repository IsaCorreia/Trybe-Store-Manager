const router = require('express').Router();
const salesController = require('./controllers/salesControllers');
const productsController = require('./controllers/productsControllers');

router.use('/products', productsController);
router.use('/sales', salesController);

module.exports = router;
