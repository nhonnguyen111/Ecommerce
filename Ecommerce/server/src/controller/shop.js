const shopServices = require("../services/shop");

const createShopController = async (req, res) => {
  try {
    const { id } = req.customer;
    const {
      shop_name,
      address,
      shop_description,
      shop_image,
      proof_image,
      proof_description,
    } = req.body;
    if (
      !shop_name ||
      !address ||
      !shop_description ||
      !shop_image ||
      !proof_image ||
      !proof_description
    )
      return res.status(500).json("Nhập thiếu trường bắt buộc");
    const response = await shopServices.createShopService(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getShopController = async (req, res) => {
  try {
    const { shop_id } = req.query;
    if (!shop_id) return res.status(500).json("Nhập thiếu trường bắt buộc");
    const response = await shopServices.getShopService({ shop_id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getProductofShopController = async (req, res) => {
  try {
    const { shop_id } = req.query;
    if (!shop_id) return res.status(500).json("Nhập thiếu trường bắt buộc");
    const response = await shopServices.getProductOfShopService({ shop_id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const EditShopNameController = async (req, res) => {
  try {
    const { shop_id, shop_name, shop_description } = req.body;
    if (!shop_id || !shop_name || !shop_description)
      return res.status(500).json("Nhập thiếu trường bắt buộc");
    const response = await shopServices.EditShopNameService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const UpdateAvtShopController = async (req, res) => {
  try {
    const { shop_id, shop_image } = req.body;
    if (!shop_id || !shop_image)
      return res.status(500).json("Nhập thiếu trường bắt buộc");
    const response = await shopServices.UpdateAvtShopService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getAllShopController = async (req, res) => {
  try {
    const response = await shopServices.getAllShopServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateStatusShopController = async (req, res) => {
  try {
    const { shop_id, shop_status } = req.body;
    const response = await shopServices.updateStatusShop(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  createShopController,
  getShopController,
  getProductofShopController,
  EditShopNameController,
  UpdateAvtShopController,
  getAllShopController,
  updateStatusShopController,
};
