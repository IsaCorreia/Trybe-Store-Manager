const {
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNPROCESSABLE_ENTITY_STATUS,
} = require('../helpers/httpStatusCodes');

const nameFormat = /[\w]{5}/;
const quantityFormat = /^[1-9]\d/;

const validateName = (name) => nameFormat.test(name);
const validateQuantity = (quantity) => quantityFormat.test(quantity);

const productValidation = (req, res, next) => {
  const { name, quantity } = req.body;
  if (!name) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: '"name" is required' });
  }
  if (!quantity) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: '"quantity" is required' });
  }

  if (!validateName(name)) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  if (!validateQuantity(quantity)) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = productValidation;
