// Provides a new JWT access token for as long as the JWT refresh token is valid.
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized. 
  const refreshToken = cookies.jwt;

  const userDocument = await User.findOne({ refreshToken : refreshToken})

  console.log(userDocument.refreshToken);
  console.log(refreshToken);

  if (!userDocument) return res.sendStatus(403); // Forbidden!

  // Evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      console.log("error: ", error);
      console.log(`decoded: `, decoded);
      if (error || userDocument.username !== decoded.username ) return res.sendStatus(403);

      const accessToken = jwt.sign(
        {"username" : decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : '1m'}
      )

      console.log(accessToken);

      res.json({ accessToken });
    }
  )
}

module.exports = { handleRefreshToken }