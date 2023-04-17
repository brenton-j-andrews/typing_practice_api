const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("helmet");
const cookieParser = require("cookie-parser");

require('dotenv').config();

const jwtVerification = require("./middleware/jwtVerification");

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

// Routing / JWT middleware.
const registerRoute = require("./routes/registerRoute");
const authRoute = require("./routes/authRoute");
const testRoute = require("./routes/testRoute");

app.use("/register", registerRoute);
app.use("/auth", authRoute);

app.use(jwtVerification);
app.use("/test", testRoute);


// Initialize server and listen.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})