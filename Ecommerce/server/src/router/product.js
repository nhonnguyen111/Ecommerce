const express = require("express");
const producthController = require("../controller/product");

const router = express.Router();
router.get("/all-admin", producthController.getProductAllController);
router.get("/all", producthController.getProductController);
router.get("/product-selling", producthController.getProductSellingController);
router.get("/product-new", producthController.getProductNewController);
router.get("/id", producthController.getProductQuery);
router.get("/product-store", producthController.getProductById);
router.post("/create", producthController.createProductShopController);
router.get("/search", producthController.getProductQueryController);
router.get("/search-shop", producthController.getProductQueryShopController);
router.put("/update", producthController.editProductController);
router.put("/hide", producthController.HideProductController);
router.get(
  "/product-selling-shop",
  producthController.getProductSellingByIdShopController
);
router.put("/update-status", producthController.updateStatusProductController);

module.exports = router;
