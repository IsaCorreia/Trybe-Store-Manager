const {
  HTTP_UNPROCESSABLE_ENTITY_STATUS,
} = require('../helpers/httpStatusCodes');
const { getProductStock } = require('../models/productsModel');

const stockValidation = async (req, res, next) => {
  let productInStock = true;
  req.body.forEach(async ({ productId, quantity }) => {
    const stock = await getProductStock(productId);
    if (stock < quantity) {
      productInStock = false;
    }
    return productInStock
      ? next()
      : res
          .status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
          .json({ message: 'Such amount is not permitted to sell' });
  });
};

module.exports = stockValidation;
