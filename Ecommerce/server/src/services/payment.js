const axios = require("axios");
const crypto = require("crypto");
const db = require("../models/index");

const payment = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const accessKey = process.env.ACCESSKEY;
      const secretKey = process.env.SECRETKEY;

      if (!accessKey || !secretKey) {
        return reject("ACCESSKEY or SECRETKEY is missing in .env");
      }

      const orderInfo = "pay with MoMo";
      const partnerCode = "MOMO";
      const redirectUrl = "http://localhost:5173/";
      const ipnUrl = "https://dummy-callback.vn";
      const requestType = "payWithMethod";
      const amount = parseInt(body.amount) || 10000;
      const orderId = partnerCode + new Date().getTime();
      const requestId = orderId;
      const extraData = "";
      const orderGroupId = "";
      const autoCapture = true;
      const lang = "vi";

      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

      const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");

      const requestBody = JSON.stringify({
        partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        lang,
        requestType,
        autoCapture,
        extraData,
        orderGroupId,
        signature,
      });

      const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
        },
        data: requestBody,
      };

      const result = await axios(options);
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
const createPayment = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.Payment.create({
        orderId: body.orderId,
        customer_id: body.customer_id,
        amount: body.amount,
        urlPay: body.urlPay,
        methodPay: body.methodPay,
        statusCode: body.statusCode,
      });
      resolve({
        err: 0,
        msg: "OK",
        data: body,
      });
    } catch (error) {
      reject(error);
    }
  });
const getPaymentByUserID = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Payment.findAll({
        where: { customer_id: id },
        raw: true,
        nest: true,
        attributes: [
          "orderId",
          "customer_id",
          "amount",
          "methodPay",
          "urlPay",
          "statusCode",
          "createdAt",
          "updatedAt",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy bài danh sách nạp tiền thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

const getCallback = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const payment = await db.Payment.findOne({
        where: { orderId: body.orderId },
      });
      if (!payment) {
        return resolve({
          err: -1,
          msg: "Không tìm thấy thanh toán cần cập nhật.",
        });
      }

      await db.Payment.update(
        {
          statusCode: 1,
        },
        { where: { orderId: body.orderId } }
      );

      resolve({
        err: 0,
        msg: "Callback received and balance updated.",
      });
    } catch (error) {
      // Xử lý lỗi
      reject({
        err: -1,
        msg: "Lỗi xử lý callback: " + error.message,
      });
    }
  });

module.exports = { payment, createPayment, getPaymentByUserID, getCallback };
