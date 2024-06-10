const express = require("express");
const { register, login, logout } = require("../controller/userController");
const isAuthenticated = require("../middleware/isAuth");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);

module.exports = router;
