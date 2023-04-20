// Provides a new JWT access token for as long as the JWT refresh token is valid.
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

const handleRefreshToken = async (req, res) => {
  console.log(`Here in refresh!`);

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized. 
  
  const refreshToken = cookies.jwt;
  const userDocument = await User.findOne({ refreshToken : refreshToken})
  if (!userDocument) return res.sendStatus(403); // Forbidden!

  // Evaluate refresh token. If it checks out, issue a new access token.
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error || userDocument.username !== decoded.username ) return res.sendStatus(403);

      const accessToken = jwt.sign(
        {"username" : decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : '5m'}
      )
      
      res.json({ accessToken });
    }
  )
}

module.exports = { handleRefreshToken }