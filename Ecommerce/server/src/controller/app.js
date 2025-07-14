const services = require("../services/app");
const getCategoryController = async (req, res) => {
  try {
    const response = await services.getCategory();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at app controller: " + error.message,
    });
  }
};
const createCategoryController = async (req, res) => {
  try {
    const { category_name, category_description, category_image } = req.body;
    const response = await services.createCategoryServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at app controller: " + error.message,
    });
  }
};
const deleteCategoryController = async (req, res) => {
  try {
    const { category_id } = req.body;
    const response = await services.DeleteCategoryServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at app controller: " + error.message,
    });
  }
};
const updateCategoryController = async (req, res) => {
  try {
    const { category_id, category_name, category_description, category_image } =
      req.body;
    const response = await services.updateCategoryServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at app controller: " + error.message,
    });
  }
};
module.exports = {
  getCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
