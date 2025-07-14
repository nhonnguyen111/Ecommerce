const deliveryService = require("../services/delivery");
const createDeliveryController = async (req, res) => {
  try {
    const { id } = req.customer;
    const { address, phone, username } = req.body;
    if (!address || !phone || !username)
      return res.status(500).json("Nhập thiếu trường bắt buộc");
    const response = await deliveryService.createDeliveryService(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at delivery controller" + error,
    });
  }
};
const getDeliveryController = async (req, res) => {
  try {
    const { id } = req.customer;
    const response = await deliveryService.getDelivery(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at delivery controller" + error,
    });
  }
};
const updateDeliveryController = async (req, res) => {
  try {
    const { delivery_id, username, phone, address } = req.body;

    if (!delivery_id || !username || !phone || !address) {
      return res.status(400).json({
        err: 1,
        msg: "Thiếu thông tin cập nhật",
      });
    }

    const response = await deliveryService.EditDeliveryService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at delivery controller: " + error.message,
    });
  }
};
const deleteDeliveryController = async (req, res) => {
  try {
    const { delivery_id } = req.body;

    if (!delivery_id) {
      return res.status(400).json({
        err: 1,
        msg: "Thiếu delivery_id",
      });
    }

    const response = await deliveryService.DeleteDeliveryService(delivery_id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Lỗi khi xóa địa chỉ: " + error.message,
    });
  }
};

module.exports = {
  createDeliveryController,
  getDeliveryController,
  updateDeliveryController,
  deleteDeliveryController,
};
