const errorHandler = (error, req, res, next) => {
  let code = 500;
  let message = `Internal server error`;
  if (error.name == "data not found") {
    code = 404;
    message = `data not found`;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
