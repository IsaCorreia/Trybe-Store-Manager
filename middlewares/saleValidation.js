const {
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNPROCESSABLE_ENTITY_STATUS,
} = require('../helpers/httpStatusCodes');

const saleValidation = (req, res, next) => {
  req.body.forEach(({ quantity, productId }) => {
    if (!productId) {
      return res
        .status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: '"productId" is required' });
    }
    if (!quantity) {
      return res
        .status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: '"quantity" is required' });
    }
    if (quantity <= 0) {
      return res
        .status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }
  });
  next();
};

module.exports = saleValidation;
