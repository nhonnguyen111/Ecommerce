const orderService = require("../services/order");
const createOrderController = async (req, res) => {
  try {
    const { id } = req.customer;
    const { order_date, order_total, shop_id, delivery_id, note, products } =
      req.body;

    if (
      !order_date ||
      !order_total ||
      !shop_id ||
      !delivery_id ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({
        err: -1,
        msg: "Nhập thiếu trường bắt buộc hoặc products không hợp lệ",
      });
    }

    const response = await orderService.createOrderService(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ err: -1, msg: "Failed at create order controller: " + error });
  }
};

const getOrderByCustomerController = async (req, res) => {
  try {
    const { id } = req.customer;
    const response = await orderService.getOrderByCustomerService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ err: -1, msg: "Failed at  order controller: " + error });
  }
};
const getOrderDetailByCustomerController = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(500).json("Nhập thiếu trường bắt buộc");
    const response = await orderService.getOrderDetailByCustomerService({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at order detail order controller: " + error,
    });
  }
};
const getOrderByShopController = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(500).json("Nhập thiếu trường bắt buộc");
    const response = await orderService.getOrderByShopService({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ err: -1, msg: "Failed at  order controller: " + error });
  }
};
const updateOrderController = async (req, res) => {
  try {
    const { id, order_status, cancel } = req.query;
    if (!id) return res.status(500).json("Nhập thiếu trường bắt buộc");
    const response = await orderService.updateOrderStatusService({
      id,
      order_status,
      cancel,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ err: -1, msg: "Failed at  order controller: " + error });
  }
};
module.exports = {
  createOrderController,
  getOrderByCustomerController,
  getOrderDetailByCustomerController,
  getOrderByShopController,
  updateOrderController,
};
