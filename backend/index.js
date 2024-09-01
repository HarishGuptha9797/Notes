const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const connectDb = require("./config/dbConnection.js");
const Note = require("./models/note.model.js");
const errorHandler = require("./middlewares/errorHandler.js");
const User = require("./models/user.model.js");

connectDb();

//middlewares.
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//routes
app.use("/notes", require("./routes/notesRoutes.js"));
app.use("/user", require("./routes/userRoutes.js"));
app.use(errorHandler);
app.listen(3000);

module.exports = app;
