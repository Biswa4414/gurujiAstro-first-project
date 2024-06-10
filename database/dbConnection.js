const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongoDB Connected Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = mongoDbConnection;
