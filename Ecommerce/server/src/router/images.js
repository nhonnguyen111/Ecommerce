const express = require("express");
const { uploadSingle } = require("../controller/images");
const path = require("path");

const router = express.Router();

router.post("/upload", uploadSingle, (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ err: 1, msg: "Không có file nào được tải lên." });
  }

  const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
  res.status(200).json({
    err: 0,
    msg: "Tải ảnh thành công.",
    imagePath: imagePaths,
  });
});

module.exports = router;
