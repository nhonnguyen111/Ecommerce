const express = require("express");
const appController = require("../controller/app");

const router = express.Router();

router.get("/all", appController.getCategoryController);
router.post("/create", appController.createCategoryController);
router.put("/update", appController.updateCategoryController);
router.delete("/delete", appController.deleteCategoryController);

module.exports = router;
