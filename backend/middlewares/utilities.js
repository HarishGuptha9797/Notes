const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401);
    throw new Error("User is not authorized.");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(400);
      throw new Error("User is not authorized");
    }
    req.user = user;
    next();
  });
};

module.exports = authenticationToken;
