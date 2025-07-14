const express = require("express");
const customerController = require("../controller/customer");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.use(verifyToken);
router.get("/current-user", customerController.getCurrentUserController);
router.put("/edit-user", customerController.EditUserController);
router.put("/edit-avt", customerController.EditAvtUserController);
router.put("/password", customerController.updatePasswordController);

module.exports = router;
