const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("helmet");

require('dotenv').config();

const PORT = 8080;

const app = express();

// Database Configuration.
const MongoDB = process.env.MONGODB_URL;

mongoose.connect(MongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

// Routing and middleware.
const registerRoute = require("./routes/registerRoute");
const authRoute = require("./routes/authRoute");

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/register", registerRoute);
app.use("/auth", authRoute)

// Initialize server and listen.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})