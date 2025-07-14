const shopController = require("../controller/shop");
const verifyToken = require("../middleware/verifyToken");
const express = require("express");

const router = express.Router();
router.get("/all-admin", shopController.getAllShopController);
router.put("/update-status", shopController.updateStatusShopController);

router.use(verifyToken);
router.post("/create", shopController.createShopController);
router.get("/all", shopController.getShopController);
router.get("/product", shopController.getProductofShopController);
router.put("/edit-shop", shopController.EditShopNameController);
router.put("/edit-avt", shopController.UpdateAvtShopController);

module.exports = router;
