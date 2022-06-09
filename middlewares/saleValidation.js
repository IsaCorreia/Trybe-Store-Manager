const {
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNPROCESSABLE_ENTITY_STATUS,
} = require('../helpers/httpStatusCodes');

const checkProperties = ({ productId, quantity }) => {
  // Lançar erro personalizado, respeitando regras do ESLint:
  // throw {status: x, message: 'y'} --> "Expected an error object to be thrown"
  // throw new Error() --> Somente aceita STRING (Não tem como passar status + message)
  // A solução abaixo permite criar um objeto, com um erro, e extende o Erro com um campo personalizado (no caso, status)
  // https://stackoverflow.com/questions/53080948/generic-throw-giving-expected-an-object-to-be-thrown-lint-error
  if (productId === undefined) {
    throw Object.assign(new Error('"productId" is required'),
      { status: HTTP_BAD_REQUEST_STATUS });
  }
  if (quantity === undefined) {
    throw Object.assign(new Error('"quantity" is required'), 
      { status: HTTP_BAD_REQUEST_STATUS });
  }
  if (quantity <= 0) {
    throw Object.assign(
      new Error('"quantity" must be greater than or equal to 1'),
      { status: HTTP_UNPROCESSABLE_ENTITY_STATUS },
    );
  }
};

const saleValidation = (req, res, next) => {
  try {
    req.body.forEach((element) => checkProperties(element));
    next();
  } catch (e) {
    return res.status(e.status).json({ message: e.message });
  }
};

module.exports = saleValidation;
