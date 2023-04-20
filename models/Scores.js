const mongoose = require("mongoose");

const ScoresSchema = new mongoose.Schema({
  level : {
    type: String,
    required: true
  },
  highScores : [{
    user : { 
      type : String,
      required: true
    },
    wordsPerMinute : {
      type : Number,
      required: true
    },
    accuracy : {
      type : String,
      required : true
    }
  }]
})

module.exports = mongoose.model("Scores", ScoresSchema);