import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CategoryAdmin.module.scss";
import HomeAdmin from "../HomeAdmin";
import * as actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { apiupdateAvt } from "../../../services/customer";
import { apicreateCategory, apideleteCategory } from "../../../services/app";
import "react-toastify/dist/ReactToastify.css";
import ViewCategory from "./ViewCategory";

const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL || "";

const CategoryAdmin = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.app.category);
  const [showModal, setShowModal] = useState(false);
  const [viewCategory, setViewCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageFile: [],
  });
  const [previewImage, setPreviewImage] = useState([]);

  useEffect(() => {
    dispatch(actions.getCategorys());
  }, []);

  const handleDelete = async (categoryId) => {
    if (window.confirm("Bạn có chắc muốn xoá danh mục này không?")) {
      const deleteCategory = await apideleteCategory({
        category_id: categoryId,
      });

      if (deleteCategory?.data?.err === 0) {
        toast.success("Xoá danh mục thành công");
        dispatch(actions.getCategorys());
      } else {
        toast.error("Lỗi khi xóa danh mục");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = async () => {
    const { name, description, imageFile } = formData;

    if (!name || !description || !imageFile) {
      toast.error("Vui lòng điền đầy đủ thông tin và chọn ảnh");
      return;
    }

    try {
      const uploadForm = new FormData();
      uploadForm.append("file", imageFile);
      const uploadRes = await apiupdateAvt(uploadForm);

      if (uploadRes?.data?.err !== 0) {
        toast.error("Lỗi khi tải ảnh lên server");
        return;
      }

      const uploadedImagePath = uploadRes.data.imagePath;

      const createRes = await apicreateCategory({
        category_name: name,
        category_description: description,
        category_image: uploadedImagePath,
      });

      if (createRes?.data?.err === 0) {
        toast.success("Thêm danh mục thành công");
        setFormData({ name: "", description: "", imageFile: null });
        setPreviewImage(null);
        setShowModal(false);
        dispatch(actions.getCategorys());
      } else {
        toast.error("Lỗi khi tạo danh mục");
      }
    } catch (err) {
      console.error("Lỗi thêm danh mục:", err);
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <HomeAdmin>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <button className={cx("addBtn")} onClick={() => setShowModal(true)}>
            + Thêm danh mục
          </button>
        </div>

        <table className={cx("table")}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {category.map((cat) => (
              <tr key={cat.category_id}>
                <td>{cat.category_id}</td>
                <td>{cat.category_name}</td>
                <td>{cat.category_description}</td>
                <td>
                  <img
                    src={
                      baseURL +
                      (Array.isArray(cat.category_image)
                        ? cat.category_image[0]
                        : typeof cat.category_image === "string" &&
                          cat.category_image.includes("[")
                        ? JSON.parse(cat.category_image)[0]
                        : cat.category_image)
                    }
                    alt={cat.category_name}
                    className={cx("image")}
                  />
                </td>
                <td>
                  <button
                    onClick={() => setViewCategory(cat)}
                    className={cx("btn", "edit")}
                  >
                    Sửa
                  </button>
                  <button
                    className={cx("btn", "delete")}
                    onClick={() => handleDelete(cat.category_id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className={cx("overlay")} onClick={() => setShowModal(false)}>
            <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
              <h3>Thêm danh mục mới</h3>
              <input
                type="text"
                placeholder="Tên danh mục"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <textarea
                placeholder="Mô tả"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  style={{
                    width: "80px",
                    height: "80px",
                    marginTop: 10,
                    borderRadius: 8,
                  }}
                />
              )}

              <div className={cx("modalButtons")}>
                <button
                  className={cx("btn", "save")}
                  onClick={handleAddCategory}
                >
                  Lưu
                </button>
                <button
                  className={cx("btn", "cancel")}
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
        {viewCategory && (
          <ViewCategory
            category={viewCategory}
            onClose={() => setViewCategory(null)}
            onSave={() => {
              dispatch(actions.getCategorys());
              setViewCategory(null);
            }}
          />
        )}

        <ToastContainer />
      </div>
    </HomeAdmin>
  );
};

export default CategoryAdmin;
