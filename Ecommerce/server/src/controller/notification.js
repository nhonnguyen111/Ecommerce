const notifiServices = require("../services/notification");
const createNotificationController = async (req, res) => {
  try {
    const { customer_id, noti_content } = req.body;

    const response = await notifiServices.createNotificationServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at notification controller: " + error.message,
    });
  }
};
const getNotificationController = async (req, res) => {
  try {
    const { id } = req.query;

    const response = await notifiServices.getNotificationServices(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at notification controller: " + error.message,
    });
  }
};
module.exports = { createNotificationController, getNotificationController };
