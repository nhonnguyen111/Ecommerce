const express = require("express");
const path = require("path");
const authRouter = require("./auth");
const appRouter = require("./app");
const customerRouter = require("./customer");
const productRouter = require("./product");
const imagesRouter = require("./images");
const shopRouter = require("./shop");
const deliveryRouter = require("./delivery");
const orderRouter = require("./order");
const payRouter = require("./payment");
const voteRouter = require("./vote");
const notiRouter = require("./notification");

const initRouter = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/app", appRouter);
  app.use("/api/v1/customer", customerRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/shop", shopRouter);
  app.use("/api/v1/delivery", deliveryRouter);
  app.use("/api/v1/order", orderRouter);
  app.use("/api/v1/pay", payRouter);
  app.use("/api/v1/vote", voteRouter);
  app.use("/api/v1/noti", notiRouter);

  app.use("/api/v1", imagesRouter);

  app.get("/", (req, res) => {
    res.send("Server is running...");
  });
};

module.exports = initRouter;
