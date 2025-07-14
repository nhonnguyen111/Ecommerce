import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AccountPage.module.scss";
import SidebarProfile from "./component/SidebarProfile";
import { apiupdatePasswordUser } from "../../services/customer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const AccountPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới không khớp.");
      return;
    }

    try {
      const response = await apiupdatePasswordUser(formData);
      if (response.data?.err === 0) {
        toast.success("Đổi mật khẩu thành công!");
      } else {
        toast.error("Đổi mật khẩu thất bại!");
      }
    } catch (err) {
      toast.error("Đổi mật khẩu thất bại.");
    }
  };

  return (
    <SidebarProfile>
      <div className={cx("change-password-container")}>
        <h2>Đổi mật khẩu</h2>
        <form className={cx("form")} onSubmit={handleSubmit}>
          <div className={cx("form-group")}>
            <label>Mật khẩu hiện tại</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>

          <div className={cx("form-group")}>
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          <div className={cx("form-group")}>
            <label>Nhập lại mật khẩu mới</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>

          <button type="submit" className={cx("submit-btn")}>
            Cập nhật
          </button>
        </form>
        <ToastContainer />
      </div>
    </SidebarProfile>
  );
};

export default AccountPage;
