const db = require("../models/index");
const createNotificationServices = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const notiId = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
      const response = await db.Notification.create({
        noti_id: notiId,
        customer_id: body.customer_id,
        noti_content: body.noti_content,
      });
      resolve({
        err: 0,
        msg: "Tạo thông báo thành công",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const getNotificationServices = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Notification.findAll({
        where: { customer_id: id },
        order: [["createdAt", "DESC"]],
        attributes: ["noti_id", "customer_id", "noti_content", "createdAt"],
      });
      resolve({
        err: 0,
        msg: "Lấy thông báo thành công",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
module.exports = { createNotificationServices, getNotificationServices };
