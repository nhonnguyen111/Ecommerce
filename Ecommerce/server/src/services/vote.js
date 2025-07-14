const db = require("../models/index");
const createVoteServices = (id, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const voteid = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;

      const product = await db.Product.findOne({
        where: { product_id: body.product_id },
      });
      if (!product) {
        return resolve({ err: -1, msg: "Không tìm thấy sản phẩm !" });
      }

      const customer = await db.Customer.findOne({
        where: { customer_id: id },
      });
      if (!customer) {
        return resolve({ err: -1, msg: "Không tìm thấy người dùng !" });
      }

      // Tạo đánh giá mới
      await db.Vote.create({
        vote_id: voteid,
        customer_id: id,
        vote_content: body.vote_content,
        vote_image: JSON.stringify(body.vote_image),
        vote_rate: body.vote_rate,
        product_id: body.product_id,
        order_id: body.order_id,
      });

      // Tính toán lại đánh giá trung bình
      let newRating = 0;
      if (product.product_ratting === 0) {
        newRating = body.vote_rate;
      } else {
        newRating = (product.product_ratting + body.vote_rate) / 2;
      }

      // Cập nhật lại đánh giá sản phẩm
      await db.Product.update(
        {
          product_ratting: newRating,
        },
        {
          where: { product_id: body.product_id },
        }
      );

      resolve({ err: 0, msg: "Tạo đánh giá thành công" });
    } catch (error) {
      reject(error);
    }
  });

const getVoteServices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Vote.findAll({
        attributes: [
          "vote_id",
          "customer_id",
          "vote_content",
          "vote_image",
          "vote_rate",
          "product_id",
          "order_id",
        ],
      });
      resolve({ err: 0, msg: "Lấy đánh giá thành công", response });
    } catch (error) {
      reject(error);
    }
  });
const getVoteByProductServices = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Vote.findAll({
        where: { product_id: id },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Customer,
            as: "customers",
            attributes: [
              "customer_avt",
              "customer_id",
              "first_name",
              "last_name",
            ],
          },
        ],
        attributes: [
          "vote_id",
          "customer_id",
          "vote_content",
          "vote_image",
          "vote_rate",
          "product_id",
          "order_id",
          "createdAt",
        ],
      });
      resolve({ err: 0, msg: "Lấy đánh giá thành công", response });
    } catch (error) {
      reject(error);
    }
  });
const createVoteReply = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const votereplyid =
        Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
      const response = await db.Votereply.create({
        votereply_id: votereplyid,
        vote_id: body.vote_id,
        customer_id: body.customer_id,
        shop_id: body.shop_id,
        votereply_content: body.votereply_content,
      });
      resolve({ err: 0, msg: "Trả lời đánh giá thành công", response });
    } catch (error) {
      reject(error);
    }
  });
const getVoteReplyByProductServices = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Votereply.findAll({
        where: { vote_id: id },
        raw: true,
        nest: true,
        attributes: ["vote_id", "customer_id", "shop_id", "votereply_content"],
      });
      resolve({ err: 0, msg: "Lấy đánh giá thành công", response });
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  createVoteServices,
  getVoteServices,
  getVoteByProductServices,
  createVoteReply,
  getVoteReplyByProductServices,
};
