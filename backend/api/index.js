const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const connectDb = require("../config/dbConnection.js");
const Note = require("../models/note.model.js");
const errorHandler = require("../middlewares/errorHandler.js");
const User = require("../models/user.model.js");

connectDb();

//middlewares.
app.use(express.json());
// Set up CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || "*", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
//routes
app.use("/notes", require("../routes/notesRoutes.js"));
app.use("/user", require("../routes/userRoutes.js"));
app.use(errorHandler);
app.listen(3000);

module.exports = app;
