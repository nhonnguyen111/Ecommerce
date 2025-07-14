import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./RegisterStore.module.scss";
import Header from "../../Home/component/Header";
import Footer from "../../Home/component/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { apiupdateAvt } from "../../../services/customer";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../../store/actions";
const cx = classNames.bind(styles);

const RegisterStorePage = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [form, setForm] = useState({
    shop_name: "",
    address: "",
    shop_description: "",
    shop_image: "",
    proof_image: "",
    proof_description: "",
    id: "",
  });
  console.log(userid);
  const shop = useSelector((state) => state.shop.shop);
  const dispatch = useDispatch();
  const [shopImage, setShopImage] = useState(null);
  const [shopImagePreview, setShopImagePreview] = useState(null);
  const [proofImages, setProofImages] = useState([]);
  const [proofImagesPreview, setProofImagesPreview] = useState([]);
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleShopImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShopImage(file);
      setShopImagePreview(URL.createObjectURL(file));
    }
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

  const handleRemoveProofImage = (indexToRemove) => {
    setProofImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setProofImagesPreview((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.shop_name.trim()) {
      toast.error("Vui lòng nhập tên cửa hàng");
      return;
    }
    if (!form.address.trim()) {
      toast.error("Vui lòng nhập địa chỉ cửa hàng");
      return;
    }
    if (!form.shop_description.trim()) {
      toast.error("Vui lòng nhập mô tả cửa hàng");
      return;
    }
    if (!shopImage) {
      toast.error("Vui lòng chọn ảnh cửa hàng");
      return;
    }
    if (proofImages.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 ảnh minh chứng");
      return;
    }
    if (!form.proof_description.trim()) {
      toast.error("Vui lòng nhập mô tả minh chứng");
      return;
    }

    const formData = new FormData();
    if (shopImage) {
      formData.append("file", shopImage);
    }
    proofImages.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await apiupdateAvt(formData);
      if (response?.data?.err === 0) {
        const imagePath = response.data.imagePath;
        const payload = {
          ...form,
          shop_image: imagePath[0],
          proof_image: imagePath.slice(1),
          id: userid,
        };
        dispatch(actions.createShop(payload));
        toast.success("Bạn đã đăng ký mở cửa hàng thành công");
        setTimeout(() => {
          navigate("/register-success");
        }, 1000);
      } else {
        toast.error(response?.data?.msg || "Lỗi khi tải ảnh!");
      }
    } catch (error) {
      toast.error("Lỗi trong quá trình gửi form!");
    }
  };

  return (
    <div className={cx("container")}>
      <Header />
      <div className={cx("wrapper")}>
        <h2 className={cx("title")}>Đăng ký mở cửa hàng</h2>
        <form onSubmit={handleSubmit} className={cx("form")}>
          <div className={cx("form-group")}>
            <label>Tên cửa hàng:</label>
            <input
              type="text"
              value={form.shop_name}
              onChange={(e) => handleChange("shop_name", e.target.value)}
            />
          </div>

          <div className={cx("form-group")}>
            <label>Địa chỉ:</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className={cx("form-group")}>
            <label>Mô tả cửa hàng:</label>
            <textarea
              rows="3"
              value={form.shop_description}
              onChange={(e) => handleChange("shop_description", e.target.value)}
            ></textarea>
          </div>

          <div className={cx("form-group")}>
            <label>Ảnh cửa hàng:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleShopImageChange}
            />
            {shopImage && (
              <div className={cx("preview-wrapper")}>
                <img src={shopImagePreview} className={cx("preview")} />
                <button
                  onClick={() => setShopImage(null)}
                  className={cx("remove-btn")}
                >
                  x
                </button>
              </div>
            )}
          </div>

          <section className={cx("proof-section")}>
            <h3>Thông tin kiểm định</h3>

            <div className={cx("form-group")}>
              <label>Hình ảnh minh chứng (chọn nhiều ảnh một lúc):</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleProofImagesChange}
              />

              <div className={cx("multi-preview")}>
                <div className={cx("multi-preview")}>
                  {proofImagesPreview.map((preview, index) => (
                    <div key={index} className={cx("preview-wrapper")}>
                      <img
                        src={preview}
                        alt={`proof-${index}`}
                        className={cx("preview")}
                      />
                      <button
                        type="button"
                        className={cx("remove-btn")}
                        onClick={() => handleRemoveProofImage(index)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={cx("form-group")}>
              <label>Mô tả minh chứng (kiểm định):</label>
              <textarea
                rows="3"
                value={form.proof_description}
                onChange={(e) =>
                  handleChange("proof_description", e.target.value)
                }
              ></textarea>
            </div>
          </section>

          <button className={cx("submit-btn")}>Đăng ký cửa hàng</button>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default RegisterStorePage;
