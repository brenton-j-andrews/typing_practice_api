const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    unique: "This username is already taken.",
    max: 20
  },

  email : {
    type: String,
    required: true,
    unique: "This email already has an associated account"
  },

  password : {
    type: String,
    require: true,
    min: 6,
    max: 20
  },

  refreshToken : {
    type: String,
    default: ""
  },

  session_stats : [
    {
      words_per_minute : {
        type: Number 
      },
      accuracy : {
        type: Number
      },
      date_of_sesion : {
        type: Date
      }
    }
  ]
}, {
  timestamps : true,
  toJSON : true
})

module.exports = mongoose.model("User", UserSchema);