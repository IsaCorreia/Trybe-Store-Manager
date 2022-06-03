const { HTTP_INTERNAL_ERROR_STATUS } = require('../helpers/httpStatusCodes');

const error = (err, req, res, _next) => {
  res
    .status(err.status || HTTP_INTERNAL_ERROR_STATUS)
    .send(err.message || 'Algo deu errado. Tente novamente mais tarde');
};

module.exports = error;
