const db = require("../models/index");

const getCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
        attributes: [
          "category_id",
          "category_name",
          "category_description",
          "category_image",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Đã lấy Category" : "Lấy Category thất bại.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
const createCategoryServices = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const categoryid = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

      await db.Category.create({
        category_id: categoryid,
        category_name: body.category_name,
        category_description: body.category_description,
        category_image: JSON.stringify(body.category_image),
      });
      resolve({
        err: 0,
        msg: "Tạo Category thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
const DeleteCategoryServices = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findOne({
        where: { category_id: body.category_id },
      });

      if (!category) {
        return resolve({
          err: -1,
          msg: "Không tìm thấy danh mục",
        });
      }

      await db.Category.destroy({
        where: { category_id: body.category_id },
      });

      return resolve({
        err: 0,
        msg: "Xóa danh mục thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
const updateCategoryServices = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findOne({
        where: { category_id: body.category_id },
      });

      if (!category) {
        return resolve({
          err: -1,
          msg: "Không tìm thấy danh mục",
        });
      }
      await db.Category.update(
        {
          category_name: body.category_name,
          category_description: body.category_description,
          category_image: JSON.stringify(body.category_image),
        },
        { where: { category_id: body.category_id } }
      );
      resolve({
        err: 0,
        msg: "Sửa Category thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  getCategory,
  createCategoryServices,
  updateCategoryServices,
  DeleteCategoryServices,
};
