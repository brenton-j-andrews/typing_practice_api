const bcrypt = require("bcrypt");

const User = require("../models/User");

const handleRegistration = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) return res.status(400).json({ 'message' : 'Fill out all fields please!'});

  // Check that username and email are not in use already.
  const isExistingUser = await User.findOne({ username : username });
  if (isExistingUser) {
    console.log(isExistingUser);
    if (isExistingUser.email === email) return res.status(409).json({ "message" : "This email is already associated with an account."});
    return res.status(409).json({ "message" : "This username is already in use, use another one."})
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      "username" : username,
      "email" : email,
      "password" : hashedPassword
    });

    await newUser.save();
    res.status(200).json({ "success" : "Your account has been created!"})
  }

  catch (error) {
    res.status(500).json({ "message" : error.message });
  }
}

module.exports = { handleRegistration }