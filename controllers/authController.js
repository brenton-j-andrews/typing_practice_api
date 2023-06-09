const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../models/User");

const handleLogin = async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 'message' : 'Fill out all fields please!'});
  }

  const userDocument = await User.findOne({ username : req.body.username });

  if (!userDocument) return res.sendStatus(401);

  // Evaluate provided password.
  const correctPassword = await bcrypt.compare(password, userDocument.password);
 
  if (correctPassword) {
    const accessToken = jwt.sign(
      { "username" : userDocument.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }  
    )

    const refreshToken = jwt.sign(
      { "username" : userDocument.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn : '5m' }
    )

    // Save refresh token to userDocument.
    await User.updateOne({ username : req.body.username }, { refreshToken : refreshToken });

    // Set cookies.
    res.cookie('jwt', refreshToken, { 
      httpOnly: true, 
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
   }
  else {
    res.sendStatus(401);
  }
}

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // Token already deleted.
  const refreshToken = cookies.jwt;

  const userDocument = await User.findOne({ refreshToken : refreshToken });

  // If user is not found, but cookie exists: erase the cookie which was sent.
  if (!userDocument) {
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  // Else, remove the refreshToken from the user document in the DB.
  await User.updateOne({ refreshToken : refreshToken }, { refreshToken : "" });

  res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  return res.sendStatus(204);
}

module.exports = { handleLogin, handleLogout }