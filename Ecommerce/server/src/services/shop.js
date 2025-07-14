const db = require("../models/index");

const createShopService = (id, body) =>
  new Promise(async (resovle, reject) => {
    try {
      const proofid = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
      const shopid = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
      const response = await db.Customer.findOne({
        where: { customer_id: id },
      });
      if (!response) {
        return { err: -1, msg: "Không tìm thấy người dùng !" };
      }
      await db.Shop.create({
        shop_id: shopid,
        shop_name: body.shop_name,
        address: body.address,
        shop_description: body.shop_description,
        shop_image: body.shop_image,
        shop_status: 0,
        proof_id: proofid,
      });
      await db.Proof.create({
        proof_id: proofid,
        proof_image: JSON.stringify(body.proof_image),
        proof_description: body.proof_description,
      });
      await db.Customer.update(
        {
          shop_id: shopid,
        },
        { where: { customer_id: id } }
      );
      resovle({ err: 0, msg: "Tạo shop thành công" });
    } catch (error) {
      reject(error);
    }
  });

const getShopService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Shop.findOne({
        where: { shop_id: body.shop_id },
        include: [
          {
            model: db.Proof,
            as: "proofs",
            attributes: ["proof_id", "proof_image", "proof_description"],
          },
        ],
        attributes: [
          "shop_id",
          "shop_name",
          "address",
          "shop_description",
          "shop_image",
          "proof_id",
        ],
      });

      resolve({ err: 0, msg: "Lấy thông tin shop thành công", response });
    } catch (error) {
      reject(error);
    }
  });
const getProductOfShopService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.findAll({
        where: { shop_id: body.shop_id },
        attributes: [
          "product_id",
          "product_name",
          "product_description",
          "product_image",
          "price",
          "product_ratting",
          "product_sale",
          "category_id",
          "shop_id",
          "proof_id",
          "product_purchases",
          "product_inventory",
        ],
      });

      resolve({
        err: 0,
        msg: "Lấy thông tin sản phẩm của shop thành công",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const EditShopNameService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Shop.findOne({
        where: { shop_id: body.shop_id },
      });
      if (!response) {
        return { err: -1, msg: "Không tìm thấy shop" };
      }
      await db.Shop.update(
        {
          shop_name: body.shop_name,
          shop_description: body.shop_description,
        },
        { where: { shop_id: body.shop_id } }
      );
      resolve({
        err: 0,
        msg: "Cập nhật shop thành công",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const UpdateAvtShopService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Shop.findOne({
        where: { shop_id: body.shop_id },
      });
      if (!response) {
        return { err: -1, msg: "Không tìm thấy shop" };
      }
      await db.Shop.update(
        {
          shop_image: JSON.stringify(body.shop_image),
        },
        { where: { shop_id: body.shop_id } }
      );
      resolve({
        err: 0,
        msg: "Cập nhật shop thành công",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const getAllShopServices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Shop.findAll({
        include: [
          {
            model: db.Proof,
            as: "proofs",
            attributes: ["proof_id", "proof_image", "proof_description"],
          },
          {
            model: db.Customer,
            as: "customers",
            attributes: ["customer_id"],
          },
        ],
        attributes: [
          "shop_id",
          "shop_name",
          "address",
          "shop_description",
          "shop_image",
          "proof_id",
          "shop_status",
        ],
      });
      resolve({
        err: 0,
        msg: "Lấy shop thành công",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const updateStatusShop = (body) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Shop.findOne({
        where: { shop_id: body.shop_id },
      });
      if (!response) {
        return { err: -1, msg: "Không tìm thấy shop" };
      }
      await db.Shop.update(
        {
          shop_status: body.shop_status,
        },
        { where: { shop_id: body.shop_id } }
      );
      resovle({
        err: 0,
        msg: "Cập nhật shop thành công",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  createShopService,
  getShopService,
  getProductOfShopService,
  EditShopNameService,
  UpdateAvtShopService,
  getAllShopServices,
  updateStatusShop,
};
