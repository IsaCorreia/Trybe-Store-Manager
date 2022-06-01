const error = (err, req, res, _next) => {
  res.status(err.status || 500).json('mid de erro');
};

module.exports = error;