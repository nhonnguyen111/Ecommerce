const services = require("../services/auth");

const RegisterController = async (req, res) => {
  const { email, firstname, lastname, phone, password, gender, dateofbirth } =
    req.body;
  try {
    if (
      !lastname ||
      !phone ||
      !password ||
      !email ||
      !firstname ||
      !gender ||
      !dateofbirth
    ) {
      return res.status(400).json({
        err: "Lỗi client",
        msg: "Nhập thiếu thông tin !",
      });
    }
    const response = await services.registerService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at auth controller: " + error.message,
    });
  }
};
const LoginController = async (req, res) => {
  const { phone, password } = req.body;
  try {
    if (!phone || !password)
      return res.status(400).json({
        err: "Lỗi client",
        msg: "Nhập thiếu thông tin !",
      });
    const response = await services.loginServies(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at auth controller" + error,
    });
  }
};
const LoginAdminController = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res.status(400).json({
        err: "Lỗi client",
        msg: "Nhập thiếu thông tin !",
      });
    const response = await services.loginadminServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at auth controller" + error,
    });
  }
};
module.exports = {
  RegisterController,
  LoginController,
  LoginAdminController,
};
