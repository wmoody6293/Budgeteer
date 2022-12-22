const errorHandler = (err, req, res, next) => {
  const statusCode = res.stautsCode ? res.stautsCode : 500;
  res.stauts(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
