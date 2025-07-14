import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ViewCategory.module.scss";
import { ToastContainer, toast } from "react-toastify";
import { apiupdateAvt } from "../../../services/customer";
import { apiupdateCategory } from "../../../services/app";
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL || "";

const ViewCategory = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageFile: null,
    preview: "",
  });

  useEffect(() => {
    if (category) {
      const currentImage = Array.isArray(category.category_image)
        ? category.category_image[0]
        : typeof category.category_image === "string" &&
          category.category_image.includes("[")
        ? JSON.parse(category.category_image)[0]
        : category.category_image;

      setFormData({
        name: category.category_name || "",
        description: category.category_description || "",
        imageFile: null,
        preview: baseURL + currentImage,
      });
    }
  }, [category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = async () => {
    const { name, description, imageFile } = formData;

    if (!name || !description) {
      toast.error("Vui lòng nhập đầy đủ tên và mô tả danh mục");
      return;
    }

    try {
      let imagePath = category.category_image;

      if (imageFile) {
        const uploadForm = new FormData();
        uploadForm.append("file", imageFile);

        const uploadRes = await apiupdateAvt(uploadForm);
        if (uploadRes?.data?.err !== 0) {
          toast.error("Tải ảnh thất bại");
          return;
        }

        imagePath = uploadRes.data.imagePath;
      }

      const updateRes = await apiupdateCategory({
        category_id: category.category_id,
        category_name: name,
        category_description: description,
        category_image: imagePath,
      });

      if (updateRes?.data?.err === 0) {
        toast.success("Cập nhật danh mục thành công");
        onSave?.();
        onClose();
      } else {
        toast.error("Lỗi khi cập nhật danh mục");
      }
    } catch (err) {
      console.error("Lỗi update:", err);
      toast.error("Đã xảy ra lỗi khi cập nhật danh mục");
    }
  };

  if (!category) return null;

  return (
    <div className={cx("overlay")} onClick={onClose}>
      <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
        <h3>Chỉnh sửa danh mục</h3>
        <button className={cx("closeBtn")} onClick={onClose}>
          ✖
        </button>

        <div className={cx("modalContent")}>
          <label>
            Tên danh mục:
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>

          <label>
            Mô tả:
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </label>

          <label>
            Ảnh danh mục:
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {formData.preview && (
              <img
                src={formData.preview}
                alt="preview"
                className={cx("previewImage")}
              />
            )}
          </label>

          <div className={cx("buttons")}>
            <button className={cx("btn", "save")} onClick={handleSave}>
              Lưu thay đổi
            </button>
            <button className={cx("btn", "cancel")} onClick={onClose}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
