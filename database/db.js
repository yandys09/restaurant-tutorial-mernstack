const mongoose = require("mongoose");
const env = require("dotenv");


env.config();

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@restaurant-tutorial-mer.s6gtd.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("Database connection success!!");
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
