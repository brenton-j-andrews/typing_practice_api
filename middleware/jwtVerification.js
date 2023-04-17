// Add this middleware to any routes that we wish to protect (not many for this project).

const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtVerification = (req, res, next) => {
  const authHeader = req.headers['authorization']

  console.log(req.headers);
  console.log('auth header: ', authHeader);

  const token = authHeader.split(' ')[1];

  console.log("token: ", token);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error, decoded) => {
      if (error) {
        return res.sendStatus(403);
      }

      req.user = decoded.username;
      next();
    }
  )
}

module.exports = jwtVerification;