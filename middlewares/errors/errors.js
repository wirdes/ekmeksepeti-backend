const CustomError = require("../../helpers/errors/CustomError");
const customErrorHadnler = (err, req, res, next) => {
  let customError = err;
  if (customError.name === "SyntaxError") {
    customError = new CustomError("Unexpected Syntax", 400);
  }
  if (customError.code === 11000) {
    customError = new CustomError("Aynı bilgiler kullanılıyor lütfen kontrol ediniz", 400);
  }
  if (customError.name === "ValidationError") {
    customError = new CustomError(err.message, 400);
  }

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message,
  });
};

module.exports = customErrorHadnler;
