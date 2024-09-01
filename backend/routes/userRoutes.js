const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
} = require("../controllers/userControllers.js");
const authenticationToken = require("../middlewares/utilities.js");

router
  .post("/create-account", createUser)
  .post("/login", loginUser)
  .get("/get-user", authenticationToken, getUser);

module.exports = router;
