const path = require("path");
const multer = require("multer");

// Thiết lập nơi lưu và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    // Đặt tên file: thêm timestamp để tránh trùng
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

module.exports = {
  uploadSingle: upload.array("file", 10),
};
