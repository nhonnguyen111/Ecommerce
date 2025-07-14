const express = require("express");
const paymentController = require("../controller/payment");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.post("/create-payment", paymentController.createPayment);
router.post("/create-payuser", paymentController.newPayment);
router.put("/update", paymentController.apigetCallback);

router.use(verifyToken);
router.get("/all", paymentController.getPaymentByID);

module.exports = router;
