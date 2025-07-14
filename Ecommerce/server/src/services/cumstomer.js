const db = require("../models/index");
const bcrypt = require("bcryptjs");
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
const getCurrentUserServices = (id) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Customer.findOne({
        where: { customer_id: id },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Shop,
            as: "shops",
            attributes: [
              "shop_id",
              "shop_name",
              "shop_image",
              "shop_status",
              "shop_description",
              "address",
            ],
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      });
      resovle({
        err: response ? 0 : 1,
        msg: response
          ? "Đã lấy thông tin user đăng nhập"
          : "Lấy thông tin user thất bại.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const EditUserServices = (id, body) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Customer.findOne({
        where: { customer_id: id },
      });
      if (!response) {
        return {
          err: -1,
          msg: "Không tìm thấy người dùng",
        };
      }
      await db.Customer.update(
        {
          customer_email: body.customer_email,
          first_name: body.first_name,
          last_name: body.last_name,
          address: body.address,
          city: body.city,
          phone: body.phone,
          gender: body.gender,
          dateofbirth: body.dateofbirth,
        },
        { where: { customer_id: id } }
      );
      resovle({
        err: 0,
        msg: "Sửa thông tin thành công.",
      });
    } catch (error) {
      reject(error);
    }
  });
const EditAvtUserServices = (id, body) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Customer.findOne({
        where: { customer_id: id },
      });
      if (!response) {
        return {
          err: -1,
          msg: "Không tìm thấy người dùng",
        };
      }
      await db.Customer.update(
        {
          customer_avt: body.customer_avt,
        },
        { where: { customer_id: id } }
      );
      resovle({
        err: 0,
        msg: "Sửa thông tin thành công.",
      });
    } catch (error) {
      reject(error);
    }
  });
const updatePassword = (id, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const { oldPassword, confirmPassword } = body;

      const response = await db.Customer.findOne({
        where: { customer_id: id },
      });

      if (!response) {
        return resolve({
          err: -1,
          msg: "Không tìm thấy người dùng",
        });
      }

      // So sánh mật khẩu cũ
      const isMatch = bcrypt.compareSync(oldPassword, response.password);
      if (!isMatch) {
        return resolve({
          err: 1,
          msg: "Mật khẩu cũ không chính xác",
        });
      }

      // Cập nhật mật khẩu mới đã mã hoá
      const hashedPassword = hashPassword(confirmPassword);
      await db.Customer.update(
        { password: hashedPassword },
        { where: { customer_id: id } }
      );

      resolve({
        err: 0,
        msg: "Cập nhật mật khẩu thành công",
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getCurrentUserServices,
  EditUserServices,
  EditAvtUserServices,
  updatePassword,
};
