const express = require("express");
const authController = require("../controller/auth");

const router = express.Router();

router.post("/register", authController.RegisterController);
router.post("/login", authController.LoginController);
router.post("/admin", authController.LoginAdminController);

module.exports = router;
