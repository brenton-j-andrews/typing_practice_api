const allowedOrigins = require("./allowedOrigins");

const corsConfig = {
  origin: (origin, callback) => { 
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    }
    else {
      callback(new Error('This origin is not allowed by CORS'))
    }
  },

  optionsSuccessStatus: 200
}

module.exports = corsConfig;