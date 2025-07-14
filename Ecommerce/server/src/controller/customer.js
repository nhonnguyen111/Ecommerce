const services = require("../services/cumstomer");
const getCurrentUserController = async (req, res) => {
  const { id } = req.customer;
  try {
    const response = await services.getCurrentUserServices(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at getUser controller" + error,
    });
  }
};
const EditUserController = async (req, res) => {
  const { id } = req.customer;
  const {
    customer_email,
    first_name,
    last_name,
    address,
    city,
    phone,
    gender,
    dateofbirth,
  } = req.body;

  try {
    const response = await services.EditUserServices(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at edituser controller" + error,
    });
  }
};
const EditAvtUserController = async (req, res) => {
  const { id } = req.customer;
  const { customer_avt } = req.body;

  try {
    const response = await services.EditAvtUserServices(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at edit avt user controller" + error,
    });
  }
};
const updatePasswordController = async (req, res) => {
  const { id } = req.customer;
  const { oldPassword, confirmPassword } = req.body;

  if (!oldPassword || !confirmPassword) {
    return res.status(400).json({
      err: 1,
      msg: "Thiếu mật khẩu cũ hoặc mật khẩu mới.",
    });
  }

  try {
    const response = await services.updatePassword(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at updatePassword controller: " + error,
    });
  }
};

module.exports = {
  getCurrentUserController,
  EditUserController,
  EditAvtUserController,
  updatePasswordController,
};
