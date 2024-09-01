const errorHandler = (err, req, res, next) => {
  console.log("Hello");
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 400:
      res.json({
        title: "validation failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 404:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error Found");
      break;
  }
};

module.exports = errorHandler;
