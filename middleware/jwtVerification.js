// Add this middleware to any routes that we wish to protect (not many for this project).

const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtVerification = (req, res, next) => {
  const authHeader = req.headers['authorization']

  next();
}