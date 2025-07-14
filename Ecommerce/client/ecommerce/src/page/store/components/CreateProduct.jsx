import React, { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import { apiupdateAvt } from "../../../services/customer";
import * as actions from "../../../store/actions";
import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CreateProduct.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const CreateProduct = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.app.category);
  const product = useSelector((state) => state.product.product);
  const navigate = useNavigate();
  const { shop_id } = useParams();
  const [products, setProduct] = useState({
    product_name: "",
    product_description: "",
    price: 0,
    unit: "",
    product_sale: 0,
    product_inventory: 0,
    category_id: "",
  });
  const [proofDescription, setProofDescription] = useState([]);

  const [productImages, setProductImages] = useState([]);
  const [productImagesPreview, setProductImagesPreview] = useState([]);
  const [proofImages, setProofImages] = useState([]);
  const [proofImagesPreview, setProofImagesPreview] = useState([]);

  useEffect(() => {
    dispatch(actions.getCategorys());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...products, [name]: value });
  };

  const handleProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setProductImages((prev) => [...prev, ...newImages.map((img) => img.file)]);
    setProductImagesPreview((prev) => [
      ...prev,
      ...newImages.map((img) => img.preview),
    ]);
  };
  const handleProofImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setProofImages((prev) => [...prev, ...newImages.map((img) => img.file)]);
    setProofImagesPreview((prev) => [
      ...prev,
      ...newImages.map((img) => img.preview),
    ]);
  };
  const handleRemoveProofImage = (index) => {
    setProofImages((prev) => prev.filter((_, i) => i !== index));
    setProofImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };
  const handleRemoveProductImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setProductImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataProduct = new FormData();
    productImages.forEach((file) => {
      formDataProduct.append("file", file);
    });

    const formDataProof = new FormData();
    proofImages.forEach((file) => {
      formDataProof.append("file", file);
    });

    try {
      const resProduct = await apiupdateAvt(formDataProduct);
      const resProof = await apiupdateAvt(formDataProof);

      if (resProduct?.data?.err === 0 && resProof?.data?.err === 0) {
        const payload = {
          ...products,
          proof_description: proofDescription,
          product_image: resProduct.data.imagePath,
          proof_image: resProof.data.imagePath,
          shop_id: shop_id,
        };
        dispatch(actions.createProduct(payload));
        toast.success("Thêm sản phẩm thành công");
        setTimeout(() => {
          navigate(`/home/product/${shop_id}`);
        }, 1000);
      } else {
        toast.error(response?.data?.msg || "Lỗi khi tải ảnh!");
      }
    } catch (error) {
      toast.error("Lỗi trong quá trình gửi form!");
    }
  };

  return (
    <Sidebar>
      <div className={cx("container")}>
        <h2>Thêm sản phẩm mới</h2>
        <form className={cx("form")}>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            name="product_name"
            value={products.product_name}
            onChange={handleChange}
            required
          />

          <label>Mô tả:</label>
          <textarea
            name="product_description"
            value={products.product_description}
            onChange={handleChange}
          />

          <label>Hình ảnh sản phẩm:</label>
          <input type="file" multiple onChange={handleProductImagesChange} />
          <div className={cx("image-preview")}>
            {productImagesPreview.map((img, index) => (
              <div key={index} className={cx("preview-wrapper")}>
                <img
                  src={img}
                  alt={`product-${index}`}
                  className={cx("preview-img")}
                />
                <button
                  type="button"
                  className={cx("remove-btn")}
                  onClick={() => handleRemoveProductImage(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>

          <div className={cx("price")}>
            <div>
              <label>Giá bán:</label>
              <input
                name="price"
                type="number"
                value={products.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Đơn vị tính</label>
              <select name="unit" id="" onChange={handleChange}>
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
            </div>
          </div>

          <div className={cx("price-sale")}>
            <div>
              <label>Giá khuyến mãi:</label>
              <input
                name="product_sale"
                type="number"
                value={products.product_sale}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Số lượng tồn kho:</label>
              <input
                name="product_inventory"
                type="number"
                value={products.product_inventory}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Chọn danh mục sản phẩm:</label>
          <select
            name="category_id"
            value={products.category_id}
            onChange={handleChange}
          >
            <option value="">Chọn danh mục</option>
            {category?.map((item, i) => (
              <option key={i} value={item.category_id}>
                {item.category_name}
              </option>
            ))}
          </select>

          <div className={cx("form-group")}>
            <label>Hình ảnh minh chứng (chọn nhiều ảnh):</label>
            <input type="file" multiple onChange={handleProofImagesChange} />
            <div className={cx("multi-preview")}>
              {proofImagesPreview.map((preview, index) => (
                <div key={index} className={cx("preview-wrapper")}>
                  <img
                    src={preview}
                    alt={`proof-${index}`}
                    className={cx("preview-img")}
                  />
                  <button
                    className={cx("remove-btn")}
                    type="button"
                    onClick={() => handleRemoveProofImage(index)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={cx("form-group")}>
            <label>Mô tả minh chứng (kiểm định):</label>
            <textarea
              rows="3"
              value={proofDescription}
              onChange={(e) => setProofDescription(e.target.value)}
            ></textarea>
          </div>

          <div className={cx("btn")}>
            <button
              onClick={handleSubmit}
              className={cx("success")}
              type="submit"
            >
              Lưu sản phẩm
            </button>
            <button
              className={cx("back")}
              onClick={() => navigate(`/home/product/${shop_id}`)}
            >
              Quay lại
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </Sidebar>
  );
};

export default CreateProduct;
