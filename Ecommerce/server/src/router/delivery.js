const express = require("express");
const deliveryController = require("../controller/delivery");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.put("/update", deliveryController.updateDeliveryController);
router.delete("/delete", deliveryController.deleteDeliveryController);

router.use(verifyToken);
router.post("/create", deliveryController.createDeliveryController);
router.get("/all", deliveryController.getDeliveryController);

module.exports = router;
