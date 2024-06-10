const express = require("express");
const app = express();
require("dotenv").config();
const { errorMiddleware } = require("./middleware/error");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dbConnection = require("./database/dbConnection");

dbConnection();
const userRouter = require("./router/userRouter");
const taskRouter = require("./router/taskRouter");

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

//API HOMEPAGE
app.get("/", (req, res) => {
  return res.send("Server");
});
app.use(errorMiddleware);

module.exports = app;
