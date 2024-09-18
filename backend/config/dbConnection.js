require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
  const connectionString = process.env.CONNECTION_STRING;

  if (!connectionString) {
    console.error("CONNECTION_STRING environment variable is not set");
    process.exit(1); // Exit the process with an error code
  }

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (e) {
    console.error("Error connecting to the database:", e.message);
    process.exit(1);
  }
};

module.exports = connectDb;
