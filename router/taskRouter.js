const express = require("express");
const enqueueTask = require("../controller/taskController");
const router = express.Router();

router.post("/enqueueTask", enqueueTask);
module.exports = router;
