const db = require("../models/index");
const { v4 } = require("uuid");
const createOrderService = (id, body) =>
  new Promise(async (resovle, reject) => {
    try {
      const orderid = v4();
      const shop = await db.Shop.findOne({
        where: { shop_id: body.shop_id },
      });
      if (!shop)
        return {
          err: -1,
          msg: "Không tìm thấy shop",
        };
      const customer = await db.Customer.findOne({
        where: { customer_id: id },
      });
      if (!customer)
        return {
          err: -1,
          msg: "Không tìm thấy người dùng",
        };
      const delivery = await db.Delivery.findOne({
        where: { delivery_id: body.delivery_id },
      });
      if (!delivery)
        return {
          err: -1,
          msg: "Không tìm thấy địa chỉ giao hàng",
        };
      await db.Order.create({
        order_id: orderid,
        order_status: 0,
        order_date: body.order_date,
        order_total: body.order_total,
        customer_id: id,
        shop_id: body.shop_id,
        delivery_id: body.delivery_id,
        note: body.note,
      });
      for (const product of body.products) {
        const orderdetailid =
          Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
        await db.Orderdetail.create({
          order_detail_id: orderdetailid,
          product_id: product.product_id,
          product_qty: product.product_qty,
          product_price: product.product_price,
          unit: product.unit,
          order_id: orderid,
          total_price: product.total_price,
        });
      }
      for (const product of body.products) {
        const existingProduct = await db.Product.findOne({
          where: { product_id: product.product_id },
        });

        if (existingProduct) {
          const newPurchases =
            (existingProduct.product_purchases || 0) + product.product_qty;
          const newInventory =
            existingProduct.product_inventory - product.product_qty;
          await db.Product.update(
            {
              product_purchases: newPurchases,
              product_inventory: newInventory,
            },
            {
              where: { product_id: product.product_id },
            }
          );
        }
      }

      resovle({ err: 0, msg: "Tạo đơn hàng thành công" });
    } catch (error) {
      reject(error);
    }
  });
const getOrderByCustomerService = (id) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Order.findAll({
        where: { customer_id: id },

        include: [
          {
            model: db.Orderdetail,
            as: "orderdetails",
            attributes: [
              "order_detail_id",
              "product_id",
              "product_qty",
              "product_price",
              "order_id",
              "total_price",
              "unit",
            ],
          },
          {
            model: db.Delivery,
            as: "deliverys",
            attributes: [
              "delivery_id",
              "username",
              "phone",
              "address",
              "customer_id",
            ],
          },
          {
            model: db.Shop,
            as: "shops",
            attributes: [
              "shop_id",
              "shop_name",
              "address",
              "shop_description",
              "shop_image",
            ],
          },
        ],
        attributes: [
          "order_id",
          "order_status",
          "order_date",
          "order_total",
          "customer_id",
          "shop_id",
          "delivery_id",
          "note",
          "cancel",
          "updatedAt",
        ],
      });
      resovle({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy  đơn hàng thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const getOrderDetailByCustomerService = (body) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Orderdetail.findAll({
        where: { order_id: body.id },
        include: [
          {
            model: db.Product,
            as: "products",
            attributes: ["product_id", "product_name", "product_image", "unit"],
          },
        ],
        attributes: [
          "order_detail_id",
          "product_id",
          "product_qty",
          "product_price",
          "order_id",
          "total_price",
          "unit",
        ],
      });
      resovle({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy chi tiết  đơn hàng thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const getOrderByShopService = (body) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Order.findAll({
        where: { shop_id: body.id },

        include: [
          {
            model: db.Orderdetail,
            as: "orderdetails",
            attributes: [
              "order_detail_id",
              "product_id",
              "product_qty",
              "product_price",
              "order_id",
              "total_price",
              "unit",
            ],
          },
          {
            model: db.Delivery,
            as: "deliverys",
            attributes: [
              "delivery_id",
              "username",
              "phone",
              "address",
              "customer_id",
            ],
          },
        ],
        attributes: [
          "order_id",
          "order_status",
          "order_date",
          "order_total",
          "customer_id",
          "shop_id",
          "delivery_id",
          "note",
          "cancel",
          "updatedAt",
        ],
      });
      resovle({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy  đơn hàng thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const updateOrderStatusService = (body) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Order.findOne({
        where: { order_id: body.id },
      });
      if (!response) {
        return { err: -1, msg: "Không tìm thấy đơn hàng" };
      }
      await db.Order.update(
        {
          order_status: body.order_status,
          cancel: body.cancel,
        },
        { where: { order_id: body.id } }
      );
      resovle({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Cập nhật đơn hàng thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  createOrderService,
  getOrderByCustomerService,
  getOrderDetailByCustomerService,
  getOrderByShopService,
  updateOrderStatusService,
};
