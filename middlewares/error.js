const error = (err, req, res, _next) => {
  res.status(err.status || 500).send(err.message || 'Algo deu errado. Tente novamente mais tarde');
};

module.exports = error;