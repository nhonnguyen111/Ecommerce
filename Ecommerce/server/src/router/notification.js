const express = require("express");
const notiController = require("../controller/notification");

const router = express.Router();

router.post("/create", notiController.createNotificationController);
router.get("/all", notiController.getNotificationController);
module.exports = router;
