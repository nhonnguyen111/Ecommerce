import React, { useState, useEffect } from "react";
import styles from "./ModalView.module.scss";
import classNames from "classnames/bind";
import * as actions from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { PictureOutlined } from "@ant-design/icons";
import { apiupdateAvt } from "../../../../services/customer";
import { toast, ToastContainer } from "react-toastify";
const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL;

const ModalEdit = ({ data, onClose, onSave }) => {
  const category = useSelector((state) => state.app.category);
  const [productImage, setProductImage] = useState([]);
  const [productImagesPreview, setProductImagePreview] = useState([]);
  const [proofImage, setProofImage] = useState([]);
  const [proofImagePreview, setProofImagePreview] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getCategorys());
  }, []);
  const [form, setForm] = useState({
    product_name: "",
    price: 0,
    product_sale: 0,
    product_description: "",
    product_inventory: 0,
    product_purchases: 0,
    category_id: "",
    product_image: [],
    proof_description: "",
    proof_image: [],
    unit: "",
  });
  console.log(productImage);

  useEffect(() => {
    if (data) {
      const product_image = Array.isArray(data.product_image)
        ? data.product_image
        : JSON.parse(data.product_image || "[]");
      const proof_image = Array.isArray(data.proofs?.proof_image)
        ? data.proofs?.proof_image
        : JSON.parse(data.proofs?.proof_image || "[]");

      setForm({
        product_name: data.product_name || "",
        price: data.price || 0,
        product_sale: data.product_sale || 0,
        product_description: data.product_description || "",
        product_inventory: data.product_inventory || 0,
        product_purchases: data.product_purchases || 0,
        category_id: data.category_id || "",
        product_image: product_image,
        proof_description: data.proofs?.proof_description || "",
        proof_image: proof_image,
        unit: data.unit,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleProductImage = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setProductImage((prev) => [...prev, ...newImages.map((img) => img.file)]);
    setProductImagePreview((prev) => [
      ...prev,
      ...newImages.map((img) => img.preview),
    ]);
  };
  const handleRemoveProductImage = (index) => {
    setProductImage((prev) => prev.filter((_, i) => i !== index));
    setProductImagePreview((prev) => prev.filter((_, i) => i !== index));
  };
  const handleProofImage = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setProofImage((prev) => [...prev, ...newImages.map((img) => img.file)]);
    setProofImagePreview((prev) => [
      ...prev,
      ...newImages.map((img) => img.preview),
    ]);
  };
  const handleRemoveProofImage = (index) => {
    setProofImage((prev) => prev.filter((_, i) => i !== index));
    setProofImagePreview((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSave = async () => {
    const product_image_old = form.product_image;
    const proof_image_old = form.proof_image;

    const payload = {
      product_id: data.product_id,
      proof_id: data.proofs?.proof_id,
      product_name: form.product_name,
      price: form.price,
      product_sale: form.product_sale,
      product_description: form.product_description,
      product_inventory: form.product_inventory,
      product_purchases: form.product_purchases,
      category_id: form.category_id,
      unit: form.unit,
      proof_description: form.proof_description,
    };

    try {
      let productImagePaths = [];
      let proofImagePaths = [];

      if (productImage.length > 0) {
        const formProduct = new FormData();
        productImage.forEach((file) => {
          formProduct.append("file", file);
        });
        const resProduct = await apiupdateAvt(formProduct);
        if (resProduct?.data?.err === 0) {
          productImagePaths = resProduct.data.imagePath;
        } else {
          toast.error(resProduct?.data?.msg || "Lỗi khi tải ảnh sản phẩm!");
          return;
        }
      }

      if (proofImage.length > 0) {
        const formProof = new FormData();
        proofImage.forEach((file) => {
          formProof.append("file", file);
        });
        const resProof = await apiupdateAvt(formProof);
        if (resProof?.data?.err === 0) {
          proofImagePaths = resProof.data.imagePath;
        } else {
          toast.error(resProof?.data?.msg || "Lỗi khi tải ảnh minh chứng!");
          return;
        }
      }

      const finalData = {
        ...payload,
        product_image: [...product_image_old, ...productImagePaths],
        proof_image: [...proof_image_old, ...proofImagePaths],
      };
      dispatch(actions.updateProduct(finalData));
      toast.success("Sửa sản phẩm thành công");
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
      toast.error("Có lỗi xảy ra khi lưu sản phẩm!");
    }
  };

  const handleRemoveExistedProductImage = (index) => {
    setForm((prev) => ({
      ...prev,
      product_image: prev.product_image.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveExistedProofImage = (index) => {
    setForm((prev) => ({
      ...prev,
      proof_image: prev.proof_image.filter((_, i) => i !== index),
    }));
  };
  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal-content")}>
        <button className={cx("close-button")} onClick={onClose}>
          &times;
        </button>
        <h2 className={cx("title")}>Sửa thông tin sản phẩm</h2>

        <div style={{ display: "flex", gap: "50px", justifyContent: "center" }}>
          <div className={cx("form-grid")}>
            <label>
              Tên sản phẩm:
              <input
                name="product_name"
                value={form.product_name}
                onChange={handleChange}
              />
            </label>

            <div className={cx("price")}>
              <label>
                Giá:
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
              </label>

              <label>
                Giá khuyến mãi:
                <input
                  type="number"
                  name="product_sale"
                  value={form.product_sale}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className={cx("unit")}>
              <label>
                Đơn vị tính:
                <select
                  name="unit"
                  value={form.unit}
                  style={{ width: "192px" }}
                  onChange={handleChange}
                >
                  Đơn vị tính
                  <option value="">Chọn đơn vị</option>
                  <option value="Bó">Bó</option>
                  <option value="Quả">Quả</option>
                  <option value="Kg">Kg</option>
                  <option value="Gam">Gam</option>
                  <option value="Tấn">Tấn</option>
                  <option value="Tạ">Tạ</option>
                  <option value="Yến">Yến</option>
                </select>
              </label>
              <label>
                Tồn kho:
                <input
                  type="number"
                  name="product_inventory"
                  value={form.product_inventory}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Danh mục:
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
              >
                <option value="">-- Chọn danh mục --</option>
                {category.length > 0 &&
                  category.map((item, i) => {
                    return (
                      <option key={i} value={item.category_id}>
                        {item.category_name}
                      </option>
                    );
                  })}
              </select>
            </label>
            <label>
              Mô tả:
              <textarea
                name="product_description"
                value={form.product_description}
                onChange={handleChange}
                rows={3}
              />
            </label>
          </div>
          <div className={cx("img-product")}>
            <div className={cx("image-preview")}>
              <h3>Hình ảnh sản phẩm</h3>
              <div className={cx("img-proof")}>
                {form.product_image.map((img, idx) => (
                  <div key={idx} className={cx("preview-wrapper")}>
                    <img
                      src={baseURL + img}
                      alt={`product-${idx}`}
                      className={cx("preview-img")}
                    />
                    <button
                      className={cx("remove-btn")}
                      type="button"
                      onClick={() => handleRemoveExistedProductImage(idx)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <label className={cx("uploadBtn")}>
                <PictureOutlined />
                Thêm hình ảnh
                <input
                  onChange={handleProductImage}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                />
              </label>
              <div className={cx("img-proof")}>
                {productImagesPreview.map((item, i) => (
                  <div key={i} className={cx("preview-wrapper")}>
                    <img
                      src={item}
                      alt={`proof-${i}`}
                      className={cx("preview-img")}
                    />
                    <button
                      className={cx("remove-btn")}
                      type="button"
                      onClick={() => handleRemoveProductImage(i)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={cx("image-preview")}>
              <h3>Hình ảnh minh chứng :</h3>
              <div className={cx("img-proof")}>
                {form.proof_image.map((img, idx) => (
                  <div key={idx} className={cx("preview-wrapper")}>
                    <img
                      src={baseURL + img}
                      alt={`proof-${idx}`}
                      className={cx("preview-img")}
                    />
                    <button
                      className={cx("remove-btn")}
                      type="button"
                      onClick={() => handleRemoveExistedProofImage(idx)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <label className={cx("uploadBtn")}>
                <PictureOutlined />
                Thêm hình ảnh
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleProofImage}
                />
              </label>
              <div className={cx("img-proof")}>
                {proofImagePreview.map((item, i) => (
                  <div key={i} className={cx("preview-wrapper")}>
                    <img
                      src={item}
                      alt={`proof-${i}`}
                      className={cx("preview-img")}
                    />
                    <button
                      className={cx("remove-btn")}
                      type="button"
                      onClick={() => handleRemoveProofImage(i)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <label>
              Mô tả minh chứng :
              <textarea
                name="proof_description"
                value={form.proof_description}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className={cx("btn-actions")}>
          <button className={cx("exit-button")} onClick={onClose}>
            Hủy bỏ
          </button>
          <button className={cx("save-button")} onClick={handleSave}>
            Lưu thay đổi
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalEdit;
