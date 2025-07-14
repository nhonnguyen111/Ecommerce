const db = require("../models/index");
const createDeliveryService = (id, body) =>
  new Promise(async (resovle, reject) => {
    try {
      const deliveryid = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
      const response = await db.Customer.findOne({
        where: { customer_id: id },
      });
      if (!response) {
        return {
          err: -1,
          msg: "Không tìm thấy người dùng",
        };
      }
      await db.Delivery.create({
        delivery_id: deliveryid,
        username: body.username,
        phone: body.phone,
        address: body.address,
        customer_id: id,
      });
      resovle({
        err: 0,
        msg: "Thêm địa chỉ thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
const getDelivery = (id) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Delivery.findAll({
        where: { customer_id: id },
        raw: true,
        nest: true,
        attributes: [
          "delivery_id",
          "username",
          "phone",
          "address",
          "customer_id",
        ],
      });
      resovle({
        err: 0,
        msg: "Lấy danh sách địa chỉ vận chuyển thành công",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const EditDeliveryService = (body) =>
  new Promise(async (resovle, reject) => {
    try {
      await db.Delivery.update(
        {
          username: body.username,
          phone: body.phone,
          address: body.address,
        },
        {
          where: { delivery_id: body.delivery_id },
        }
      );
      resovle({
        err: 0,
        msg: "Cập nhật địa chỉ giao hàng thành công",
      });
    } catch (error) {
      reject(error);
    }
  });

const DeleteDeliveryService = (delivery_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const deleted = await db.Delivery.destroy({
        where: { delivery_id },
      });

      if (deleted === 0) {
        resolve({
          err: 1,
          msg: "Không tìm thấy địa chỉ để xóa",
        });
      } else {
        resolve({
          err: 0,
          msg: "Xóa địa chỉ giao hàng thành công",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  createDeliveryService,
  getDelivery,
  EditDeliveryService,
  DeleteDeliveryService,
};
