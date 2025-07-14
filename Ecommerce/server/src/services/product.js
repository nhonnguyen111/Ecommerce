const db = require("../models/index");
const { v4: generateId } = require("uuid");
const { Op, where } = require("sequelize");

const getProductServices = () =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Product.findAll({
        where: { product_status: 1 },
        raw: true,
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
          "unit",
        ],
      });
      resovle({
        err: response ? 0 : 1,
        msg: response
          ? "Đã lấy danh sách sản phẩm"
          : "Lấy danh sách sản phẩm thất bại.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const getProductByIdServicesQuery = (body) =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Product.findOne({
        where: { product_id: body.id, product_status: 1 },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Shop,
            as: "shops",
            attributes: ["shop_id", "shop_name", "shop_image", "address"],
          },
          {
            model: db.Proof,
            as: "proofs",
            attributes: ["proof_id", "proof_image", "proof_description"],
          },
          {
            model: db.Category,
            as: "categories",
            attributes: ["category_id", "category_name"],
          },
        ],
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
          "unit",
        ],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy bài sản phẩm thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const getListProductByIdServices = (body) =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Product.findAll({
        where: { shop_id: body.id },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Shop,
            as: "shops",
            attributes: ["shop_id", "shop_name", "shop_image", "address"],
          },
          {
            model: db.Proof,
            as: "proofs",
            attributes: ["proof_id", "proof_image", "proof_description"],
          },
          {
            model: db.Category,
            as: "categories",
            attributes: ["category_id", "category_name"],
          },
        ],
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
          "unit",
          "product_status",
        ],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy  sản phẩm thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const createProductShopService = (body) =>
  new Promise(async (resovle, reject) => {
    try {
      const productid = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
      const proofid = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
      const response = await db.Shop.findOne({
        where: { shop_id: body.shop_id },
      });
      if (!response)
        return {
          err: -1,
          msg: "Không tìm thấy shop",
        };
      await db.Product.create({
        product_id: productid,
        product_ratting: 0,
        product_name: body.product_name,
        product_description: body.product_description,
        product_image: JSON.stringify(body.product_image),
        product_sale: body.product_sale,
        price: body.price,
        category_id: body.category_id,
        shop_id: body.shop_id,
        proof_id: proofid,
        unit: body.unit,
        product_purchases: 0,
        product_inventory: body.product_inventory,
        product_status: 0,
      });
      await db.Proof.create({
        proof_id: proofid,
        proof_image: JSON.stringify(body.proof_image),
        proof_description: body.proof_description,
      });
      resovle({ err: 0, msg: "Tạo sản phẩm thành công" });
    } catch (error) {
      reject(error);
    }
  });

const getProductQueryService = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const where = {
        product_status: 1,
      };
      if (query.keyword) {
        where.product_name = { [Op.like]: `%${query.keyword}%` };
      }

      if (query.category_id) {
        where.category_id = query.category_id;
      }

      if (query.price_min && query.price_max) {
        where.price = {
          [Op.between]: [Number(query.price_min), Number(query.price_max)],
        };
      }

      const response = await db.Product.findAll({
        where,
        raw: true,
        nest: true,
        include: [
          {
            model: db.Shop,
            as: "shops",
            attributes: ["shop_id", "shop_name", "shop_image", "address"],
          },
          {
            model: db.Proof,
            as: "proofs",
            attributes: ["proof_id", "proof_image", "proof_description"],
          },
          {
            model: db.Category,
            as: "categories",
            attributes: ["category_id", "category_name"],
          },
        ],
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
          "unit",
          "product_purchases",
          "product_inventory",
        ],
      });

      resolve({
        err: 0,
        msg: "Lấy sản phẩm thành công",
        response,
      });
    } catch (error) {
      console.error("Error in getProductQueryService:", error);
      reject(error);
    }
  });
const getProductQueryShopService = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const where = {
        product_status: 1,
      };

      if (query.keyword) {
        where.product_name = { [Op.like]: `%${query.keyword}%` };
      }

      if (query.category_id) {
        where.category_id = query.category_id;
      }

      if (query.price_min && query.price_max) {
        where.price = {
          [Op.between]: [Number(query.price_min), Number(query.price_max)],
        };
      }

      if (query.shop_id) {
        where.shop_id = query.shop_id;
      }

      const response = await db.Product.findAll({
        where,
        raw: true,
        nest: true,
        include: [
          {
            model: db.Shop,
            as: "shops",
            attributes: ["shop_id", "shop_name", "shop_image", "address"],
          },
          {
            model: db.Proof,
            as: "proofs",
            attributes: ["proof_id", "proof_image", "proof_description"],
          },
          {
            model: db.Category,
            as: "categories",
            attributes: ["category_id", "category_name"],
          },
        ],
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
          "unit",
          "product_purchases",
          "product_inventory",
          "product_status",
        ],
      });

      resolve({
        err: 0,
        msg: "Lấy sản phẩm thành công",
        response,
      });
    } catch (error) {
      console.error("Error in getProductQueryService:", error);
      reject(error);
    }
  });

const EditProductService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findOne({
        where: { product_id: body.product_id },
      });

      if (!product) {
        return resolve({
          err: 1,
          msg: "Sản phẩm không tồn tại",
        });
      }

      await db.Product.update(
        {
          product_name: body.product_name,
          product_description: body.product_description,
          product_image: JSON.stringify(body.product_image),
          product_sale: body.product_sale,
          price: body.price,
          unit: body.unit,
          category_id: body.category_id,
          product_inventory: body.product_inventory,
          product_status: 0,
        },
        {
          where: { product_id: body.product_id },
        }
      );
      await db.Proof.update(
        {
          proof_image: JSON.stringify(body.proof_image),
          proof_description: body.proof_description,
        },
        { where: { proof_id: body.proof_id } }
      );
      return resolve({
        err: 0,
        msg: "Cập nhật sản phẩm thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
const HideProductServices = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findOne({
        where: { product_id: body.product_id },
      });

      if (!product) {
        return resolve({
          err: 1,
          msg: "Sản phẩm không tồn tại",
        });
      }

      await db.Product.update(
        {
          product_status: body.product_status,
        },
        {
          where: { product_id: body.product_id },
        }
      );

      resolve({
        err: 0,
        msg: "Ẩn sản phẩm thành công",
      });
    } catch (error) {
      reject(error);
    }
  });

const getProductSellingServices = () =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Product.findAll({
        where: { product_status: 1 },
        raw: true,
        order: [["product_purchases", "DESC"]],
        limit: 10,
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
          "unit",
        ],
      });
      resovle({
        err: 1,
        msg: "Đã lấy danh sách sản phẩm",
      });
    } catch (error) {
      reject(error);
    }
  });
const getProductNewServices = () =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Product.findAll({
        where: { product_status: 1 },
        raw: true,
        order: [["createdAt", "DESC"]],
        limit: 10,
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
          "unit",
        ],
      });
      resovle({
        err: response ? 0 : 1,
        msg: response
          ? "Đã lấy danh sách sản phẩm"
          : "Lấy danh sách sản phẩm thất bại.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const getProductSellingByShopServices = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.findAll({
        where: {
          shop_id: body.id,
          product_status: 1,
        },
        order: [["product_purchases", "DESC"]],
        raw: true,
        nest: true,
        limit: 5,
        include: [
          {
            model: db.Shop,
            as: "shops",
            attributes: ["shop_id", "shop_name", "shop_image", "address"],
          },
          {
            model: db.Proof,
            as: "proofs",
            attributes: ["proof_id", "proof_image", "proof_description"],
          },
          {
            model: db.Category,
            as: "categories",
            attributes: ["category_id", "category_name"],
          },
        ],
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
          "unit",
          "product_status",
          "createdAt",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy sản phẩm thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const getProductAllServices = () =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Product.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.Shop,
            as: "shops",
            attributes: ["shop_id", "shop_name", "shop_image", "address"],
          },
          {
            model: db.Proof,
            as: "proofs",
            attributes: ["proof_id", "proof_image", "proof_description"],
          },
          {
            model: db.Category,
            as: "categories",
            attributes: ["category_id", "category_name"],
          },
        ],
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
          "unit",
          "product_status",
        ],
      });
      resovle({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy  sản phẩm thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const updateStatusProductServices = (body) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Product.findOne({
        where: { product_id: body.product_id },
      });
      if (!response) {
        return { err: -1, msg: "Không tìm thấy sản phẩm" };
      }
      await db.Product.update(
        {
          product_status: body.product_status,
        },
        { where: { product_id: body.product_id } }
      );
      resovle({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy  sản phẩm thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getProductServices,
  getProductByIdServicesQuery,
  getListProductByIdServices,
  createProductShopService,
  getProductQueryService,
  EditProductService,
  getProductSellingServices,
  getProductNewServices,
  getProductQueryShopService,
  HideProductServices,
  getProductSellingByShopServices,
  getProductAllServices,
  updateStatusProductServices,
};
