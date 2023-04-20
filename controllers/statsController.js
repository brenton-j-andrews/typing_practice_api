const User = require("../models/User");

// Push typing session to user document on completion.
const handleUserSession = async (req, res) => {

  console.log(`hmm?`);

  const userDocument = await User.findOneAndUpdate(
    { username : req.params.username },
    { $push: { 
        session_stats : { 
          words_per_minute : req.body.words_per_minute,
          accuracy : req.body.accuracy,
          date_of_sesion : Date.now()
        }
      }
    });

  if (!userDocument) return res.sendStatus(401);

  res.sendStatus(200);
} 

module.exports = { handleUserSession };