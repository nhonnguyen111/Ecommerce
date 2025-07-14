import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import * as actions from "../../../store/actions";
import styles from "./SettingStore.module.scss";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiupdateAvt } from "../../../services/customer";
const baseURL = import.meta.env.VITE_SERVER_URL;
const cx = classNames.bind(styles);

const SettingStorePage = () => {
  const { shop_id } = useParams();
  const shop = useSelector((state) => state.shop.shop);
  const [viewImage, setViewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    shop_name: "",
    shop_description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(actions.getShop({ shop_id }));
  }, [dispatch, shop_id]);
  useEffect(() => {
    if (shop) {
      setFormData({
        shop_name: shop.shop_name || "",
        shop_description: shop.shop_description || "",
      });
    }
  }, [shop]);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmitEdit = async () => {
    const payload = {
      ...formData,
      shop_id: shop_id,
    };
    setIsEditing(false);
    const response = await dispatch(actions.EditShopName(payload));
    if (response?.err == 0) {
      toast.success("Thay đổi thành công");
      dispatch(actions.getShop({ shop_id }));
    } else {
      toast.error("Thay đổi thất bại");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setViewImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsEdited(true);
    }
  };
  const handleConfirmChange = async () => {
    const formData = new FormData();
    formData.append("file", viewImage);
    const response = await apiupdateAvt(formData);
    if (response?.data?.err === 0) {
      const imagePath = response.data.imagePath;
      const payload = {
        shop_id: shop_id,
        shop_image: imagePath,
      };
      dispatch(actions.UpdateAvtShopName(payload));
      toast.success("Cập nhật ảnh đại diện shop thành công ");
    } else {
      toast.error(response?.data?.msg || "Lỗi khi tải ảnh!");
    }
    setIsEdited(false);
    dispatch(actions.getShop({ shop_id }));
    window.location.reload();
  };

  const parseProofImages = () => {
    let images = [];

    if (Array.isArray(shop?.proofs?.proof_image)) {
      images = shop?.proofs.proof_image;
    } else if (
      typeof shop?.proofs?.proof_image === "string" &&
      shop?.proofs.proof_image.includes("[")
    ) {
      try {
        images = JSON.parse(shop?.proofs.proof_image);
      } catch (e) {
        images = [];
      }
    }

    return images;
  };

  return (
    <Sidebar>
      <div className={cx("container")}>
        <div className={cx("content-box")}>
          <div className={cx("content-header")}>
            <h3>Thông tin cơ bản</h3>
            <div>
              <button
                onClick={() => navigate(`/store/${shop.shop_id}`)}
                className={cx("btn-outline")}
              >
                Xem Shop của tôi
              </button>
              {isEditing ? (
                <button
                  className={cx("btn-primary")}
                  onClick={handleSubmitEdit}
                >
                  Xác nhận
                </button>
              ) : (
                <button
                  className={cx("btn-primary")}
                  onClick={() => setIsEditing(true)}
                >
                  Chỉnh sửa
                </button>
              )}
            </div>
          </div>

          <div className={cx("info-row")}>
            <label>Tên Shop</label>
            {isEditing ? (
              <input
                type="text"
                name="shop_name"
                value={formData.shop_name}
                onChange={handleChange}
              />
            ) : (
              <span>{shop?.shop_name}</span>
            )}{" "}
          </div>

          <div className={cx("info-row", "logo-section")}>
            <label>Logo của Shop</label>
            <div className={cx("logo-area")}>
              <div>
                <img
                  src={
                    previewImage ||
                    baseURL +
                      (Array.isArray(shop?.shop_image)
                        ? shop?.shop_image[0]
                        : typeof shop?.shop_image === "string" &&
                          shop?.shop_image.includes("[")
                        ? JSON.parse(shop?.shop_image)[0]
                        : shop?.shop_image)
                  }
                  alt="Shop logo"
                />
                {isEdited ? (
                  <span onClick={handleConfirmChange} title="Xác nhận">
                    <CheckOutlined />
                  </span>
                ) : (
                  <span
                    onClick={() => fileInputRef.current.click()}
                    title="Chỉnh sửa"
                  >
                    <EditOutlined />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </span>
                )}
              </div>

              <ul>
                <li>
                  • Kích thước hình ảnh tiêu chuẩn: Chiều rộng 300px, Chiều cao
                  300px
                </li>
                <li>• Dung lượng file tối đa: 2.0MB</li>
                <li>• Định dạng file được hỗ trợ: JPG, JPEG, PNG</li>
              </ul>
            </div>
          </div>

          <div className={cx("info-row")}>
            <label>Mô tả Shop</label>
            {isEditing ? (
              <textarea
                name="shop_description"
                value={formData.shop_description}
                onChange={handleChange}
              />
            ) : (
              <span>{shop?.shop_description || "(Chưa có mô tả)"}</span>
            )}{" "}
          </div>

          <div className={cx("info-row")}>
            <label>Hình ảnh minh chứng</label>
            <div className={cx("view-img")}>
              {parseProofImages().map((img, index) => (
                <img key={index} src={baseURL + img} alt={`proof-${index}`} />
              ))}
            </div>
          </div>

          <div className={cx("info-row")}>
            <label>Mô tả minh chứng</label>
            <span>{shop?.proofs?.proof_description || "(Chưa có mô tả)"}</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Sidebar>
  );
};

export default SettingStorePage;
