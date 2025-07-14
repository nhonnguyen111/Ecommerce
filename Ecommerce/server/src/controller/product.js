const services = require("../services/product");

const getProductController = async (req, res) => {
  try {
    const response = await services.getProductServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at product controller: " + error.message,
    });
  }
};
const getProductQuery = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await services.getProductByIdServicesQuery({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};
const getProductById = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await services.getListProductByIdServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};
const createProductShopController = async (req, res) => {
  const {
    product_name,
    product_description,
    product_image,
    product_sale,
    price,
    category_id,
    shop_id,
    product_inventory,
    proof_image,
    proof_description,
    unit,
  } = req.body;
  if (
    !product_name ||
    !product_description ||
    !product_image ||
    !price ||
    !category_id ||
    !shop_id ||
    !product_inventory ||
    !proof_image ||
    !proof_description ||
    !unit
  )
    return res.status(500).json("Nhập thiếu trường bắt buộc");
  try {
    const response = await services.createProductShopService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at create product controller: " + error,
    });
  }
};
const getProductQueryController = async (req, res) => {
  try {
    const { ...query } = req.query;
    const response = await services.getProductQueryService(query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};
const getProductQueryShopController = async (req, res) => {
  try {
    const { ...query } = req.query;
    const response = await services.getProductQueryShopService(query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};
const editProductController = async (req, res) => {
  try {
    const {
      product_id,
      product_name,
      product_description,
      product_image,
      product_sale,
      price,
      category_id,
      product_inventory,
      proof_description,
      proof_image,
      unit,
      proof_id,
    } = req.body;
    const response = await services.EditProductService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Lỗi server khi sửa sản phẩm",
      error: error.message,
    });
  }
};
const HideProductController = async (req, res) => {
  try {
    const { product_id, product_status } = req.body;
    const response = await services.HideProductServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};
const getProductSellingController = async (req, res) => {
  try {
    const response = await services.getProductSellingServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at product controller: " + error.message,
    });
  }
};
const getProductNewController = async (req, res) => {
  try {
    const response = await services.getProductNewServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at product controller: " + error.message,
    });
  }
};
const getProductSellingByIdShopController = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await services.getProductSellingByShopServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};
const getProductAllController = async (req, res) => {
  try {
    const response = await services.getProductAllServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at product controller: " + error.message,
    });
  }
};
const updateStatusProductController = async (req, res) => {
  try {
    const { product_id, product_status } = req.body;
    const response = await services.updateStatusProductServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at product controller: " + error.message,
    });
  }
};
module.exports = {
  getProductController,
  getProductQuery,
  getProductById,
  createProductShopController,
  getProductQueryController,
  editProductController,
  getProductSellingController,
  getProductNewController,
  getProductQueryShopController,
  HideProductController,
  getProductSellingByIdShopController,
  getProductAllController,
  updateStatusProductController,
};
