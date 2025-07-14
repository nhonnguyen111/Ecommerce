import React, { useEffect, useState } from "react";
import SidebarProfile from "./component/SidebarProfile";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../store/actions";
import classNames from "classnames/bind";
const baseURL = import.meta.env.VITE_SERVER_URL;
import styles from "./ProfilePage.module.scss";
import {
  apiEditUser,
  apiupdateAvt,
  apiEditAvtUser,
} from "../../services/customer";
import { image } from "../../assets/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const customerData = useSelector((state) => state.user.customerData);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isAvatarEditing, setIsAvatarEditing] = useState(false);

  const handleAvatarClick = () => {
    document.getElementById("avatarInput").click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setIsAvatarEditing(true);
  };

  useEffect(() => {
    dispatch(action.getCurrent());
  }, [dispatch]);

  useEffect(() => {
    if (customerData) {
      setFormData({
        customer_email: customerData.customer_email || "",
        first_name: customerData.first_name || "",
        last_name: customerData.last_name || "",
        phone: customerData.phone || "",
        city: customerData.city || "",
        address: customerData.address || "",
        gender: customerData.gender || "",
        dateofbirth: customerData.dateofbirth || "",
        id: customerData.customer_id,
      });
    }
  }, [customerData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleEdit = async () => {
    if (editMode) {
      const response = await apiEditUser(formData);
      if (response?.data) {
        if (response.data.err === 0) {
          toast.success(response.data.msg || "Sửa thông tin thành công!");
        } else {
          toast.error(response.data.msg || "Có lỗi xảy ra!");
        }
      } else {
        toast.error("Không thể kết nối đến máy chủ!");
      }
    }
    setEditMode(!editMode);
  };

  const handleSaveAvatar = async () => {
    if (!avatarFile) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", avatarFile);

    try {
      const response = await apiupdateAvt(formDataUpload);
      if (response?.data?.err === 0) {
        const imagePath = response.data.imagePath;
        const payload = {
          id: customerData.customer_id,
          customer_avt: imagePath[0],
        };
        await apiEditAvtUser(payload);
        toast.success("Cập nhật ảnh đại diện thành công!");
        setAvatarPreview(null);
        setAvatarFile(null);
        setIsAvatarEditing(false);
        window.location.reload();
      } else {
        toast.error(response?.data?.msg || "Lỗi khi tải ảnh!");
      }
    } catch (error) {
      toast.error("Không thể upload ảnh!");
    }
  };

  return (
    <SidebarProfile>
      <div className={cx("container")}>
        <div className={cx("profile")}>
          <div className={cx("infoSection")}>
            <div className={cx("row")}>
              {" "}
              <span className={cx("label")}>Email</span>
              {editMode ? (
                <input
                  className={cx("value")}
                  value={formData.customer_email}
                  onChange={(e) =>
                    handleChange("customer_email", e.target.value)
                  }
                />
              ) : (
                <span className={cx("value")}>
                  {formData.customer_email || "--"}
                </span>
              )}
            </div>

            <div className={cx("row")}>
              {" "}
              <span className={cx("label")}>Họ và tên</span>
              {editMode ? (
                <>
                  <input
                    className={cx("value")}
                    placeholder="Họ"
                    value={formData.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                  />
                  <input
                    className={cx("value")}
                    placeholder="Tên"
                    value={formData.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                  />
                </>
              ) : (
                <span className={cx("value")}>
                  {(formData.first_name + " " + formData.last_name).trim() ||
                    "--"}
                </span>
              )}
            </div>

            <div className={cx("row")}>
              {" "}
              <span className={cx("label")}>Số điện thoại</span>
              {editMode ? (
                <input
                  className={cx("value")}
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              ) : (
                <span className={cx("value")}>{formData.phone || "--"}</span>
              )}
            </div>

            <div className={cx("row")}>
              {" "}
              <span className={cx("label")}>Thành phố</span>
              {editMode ? (
                <input
                  className={cx("value")}
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              ) : (
                <span className={cx("value")}>{formData.city || "--"}</span>
              )}
            </div>

            <div className={cx("row")}>
              {" "}
              <span className={cx("label")}>Địa chỉ</span>
              {editMode ? (
                <input
                  className={cx("value")}
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              ) : (
                <span className={cx("value")}>{formData.address || "--"}</span>
              )}
            </div>

            <div className={cx("row")}>
              {" "}
              <span className={cx("label")}>Giới tính</span>
              {editMode ? (
                <select
                  className={cx("value")}
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              ) : (
                <span className={cx("value")}>{formData.gender || "--"}</span>
              )}
            </div>

            <div className={cx("row")}>
              {" "}
              <span className={cx("label")}>Ngày sinh</span>
              {editMode ? (
                <input
                  className={cx("value")}
                  type="date"
                  value={formData.dateofbirth}
                  onChange={(e) => handleChange("dateofbirth", e.target.value)}
                />
              ) : (
                <span className={cx("value")}>
                  {formData.dateofbirth || "--"}
                </span>
              )}
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  background: "#00aa55",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  color: "#fff",
                }}
                onClick={handleToggleEdit}
              >
                {editMode ? "Lưu" : "Sửa"}
              </button>
              {editMode && (
                <button
                  style={{
                    backgroundColor: "red",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    color: "#fff",
                  }}
                  onClick={() => setEditMode(false)}
                >
                  Hủy
                </button>
              )}
            </div>
          </div>

          <div className={cx("avatarBox")}>
            <img
              className={cx("avatar")}
              src={
                avatarPreview
                  ? avatarPreview
                  : customerData?.customer_avt
                  ? baseURL + customerData.customer_avt
                  : image.avatar
              }
              alt="avatar"
              onClick={handleAvatarClick}
              style={{ cursor: "pointer" }}
            />
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />

            {isAvatarEditing && (
              <button
                style={{
                  marginTop: "10px",
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleSaveAvatar}
              >
                Lưu ảnh đại diện
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </SidebarProfile>
  );
};

export default ProfilePage;
