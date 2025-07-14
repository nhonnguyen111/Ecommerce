const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
require("dotenv").config();
const { Op } = require("sequelize");

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const registerService = ({
  email,
  firstname,
  lastname,
  phone,
  password,
  gender,
  dateofbirth,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Customer.findOrCreate({
        where: {
          [Op.or]: [{ phone: phone }, { customer_email: email }],
        },
        defaults: {
          customer_email: email,
          first_name: firstname,
          last_name: lastname,
          phone: phone,
          password: hashPassword(password),
          customer_id: v4(),
          gender: gender,
          dateofbirth: dateofbirth,
        },
      });

      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].customer_id, phone: response[0].phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Tạo tài khoản thành công"
          : "Số điện thoại hoặc email đã tồn tại",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });

const loginServies = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Customer.findOne({
        where: { phone },
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.customer_id, phone: response.phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Đăng nhập thành công"
          : response
          ? "Mật khẩu không chính xác"
          : "Số điện thoại không tìm thấy",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
const loginadminServices = ({ username, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Admin.findOne({
        where: { username },
        raw: true,
      });

      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      resolve({
        err: isCorrectPassword ? 0 : 2,
        msg: isCorrectPassword
          ? "Đăng nhập thành công"
          : response
          ? "Mật khẩu không chính xác"
          : "Tên đăng nhập không tồn tại",
        admin: isCorrectPassword ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  registerService,
  loginServies,
  loginadminServices,
};
