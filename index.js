const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsConfig = require("./config/corsConfig");

require('dotenv').config();

const jwtVerification = require("./middleware/jwtVerification");
const credentials = require("./middleware/credentials");

const PORT = 8080;

const app = express();

// Database Configuration.
const MongoDB = process.env.MONGODB_URL;

mongoose.connect(MongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

// Middleware init.
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// CORS config.
let corsOptions = {
  origin: 'http://localhost:3000',
  optionsOnSuccessStatus: 200
}

// app.get('/cors', (req, res) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.send({ "msg": "This has CORS enabled 🎈" })
// })

app.use(credentials);
app.use(cors(corsOptions));



// Routing / JWT middleware.
const registerRoute = require("./routes/registerRoute");
const authRoute = require("./routes/authRoute.js");
const statsRoute = require("./routes/statsRoute");

app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/stats", statsRoute);

app.use(jwtVerification);


// Initialize server and listen.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})