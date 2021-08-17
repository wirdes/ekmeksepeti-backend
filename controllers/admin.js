const Admin = require("../models/Admin");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/inputHelpers");
const CustomError = require("../helpers/errors/CustomError");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../helpers/authorization/tokenHelpers");

const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");

const register = asyncHandler(async (req, res, next) => {
  const { name, surname, email, password } = req.body;
  const admin = await Admin.create({
    name,
    surname,
    email,
    password,
  });

  sendJwtToClient(admin, res);
});
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password)) {
    return next(new CustomError("bilgileri kontrol ediniz", 400));
  }
  const user = await Admin.findOne({ email }).select("+password");
  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Email yada şifreniz yanlış", 400));
  }
  sendJwtToClient(user, res);
});

const tokenVerify = (req, res) => {
  const { JWT_SECRET } = process.env;

  const accessToken = req.body.token || req.query.token;
  if (!accessToken) {
    return res.status(400).json({
      error: true,
      message: "token yanlış",
    });
  }
  jwt.verify(accessToken, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "token yanlış",
      });
    }
    const user = {
      id: decoded.id,
      name: decoded.name,
      surname: decoded.surname,
      email: decoded.email,
    };
    res.status(200).json({
      status: true,
      user: user,
      token: accessToken,
    });
  });
};

const loguot = (req, res) => {
  if (!isTokenIncluded(req)) {
    return next(new CustomError("Giriş yapmadan burayı göremezsin", 401));
  }
  const accessToken = getAccessTokenFromHeader(req);
  jwt.destroy(accessToken);
  res.status(200).json({
    success: true,
  });
};

module.exports = {
  loguot,
  register,
  login,
  tokenVerify,
};
