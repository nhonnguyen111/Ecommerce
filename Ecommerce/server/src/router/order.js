const express = require("express");
const orderController = require("../controller/order");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.get("/order-detail", orderController.getOrderDetailByCustomerController);
router.get("/order-shop", orderController.getOrderByShopController);
router.put("/update-order", orderController.updateOrderController);

router.use(verifyToken);
router.post("/create", orderController.createOrderController);
router.get("/order-customer", orderController.getOrderByCustomerController);

module.exports = router;
