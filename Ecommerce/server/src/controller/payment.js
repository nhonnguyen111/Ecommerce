const paymentService = require("../services/payment");
const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ err: 1, msg: "Số tiền không hợp lệ" });
    }
    const response = await paymentService.payment(req.body);
    return res.status(200).json({
      err: 0,
      msg: "Tạo thanh toán thành công",
      response,
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Lỗi get payment controller " + error,
    });
  }
};
const newPayment = async (req, res) => {
  try {
    const { orderId, customer_id, amount, urlPay, methodPay, statusCode } =
      req.body;
    if (
      !orderId ||
      !customer_id ||
      !amount ||
      !methodPay ||
      statusCode === undefined ||
      !urlPay
    ) {
      return res.status(400).json({
        err: 1,
        msg: "Nhập thiếu trường bắt buộc",
        orderId,
        customer_id,
        amount,
        urlPay,
        methodPay,
        statusCode,
      });
    }
    const response = await paymentService.createPayment(req.body);
    return res.status(200).json({
      err: 0,
      msg: "Tạo thanh toán thành công",
      response,
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Lỗi tạo thanh toán",
    });
  }
};
const getPaymentByID = async (req, res) => {
  try {
    const { id } = req.customer;
    if (!id) {
      return res.status(400).json({
        err: 1,
        msg: "Thiếu iduser trong yêu cầu",
      });
    }
    const response = await paymentService.getPaymentByUserID(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at pay controller" + error,
    });
  }
};
const apigetCallback = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId)
      return res.status(500).json({
        err: -1,
        msg: "Nhập thiếu trường bắt buộc " + error,
      });
    const response = await paymentService.getCallback(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Lỗi xử lý callback " + error,
    });
  }
};

module.exports = { createPayment, newPayment, getPaymentByID, apigetCallback };
