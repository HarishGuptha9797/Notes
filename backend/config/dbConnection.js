const mongoose = require("mongoose");

const connectDb = async () => {
  const connect = await mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("database Connected");
    })
    .catch((e) => {
      console.log(e.message);
      process.exit(1);
    });
};

module.exports = connectDb;
