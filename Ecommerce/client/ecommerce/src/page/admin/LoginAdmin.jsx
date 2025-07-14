import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./LoginAdmin.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const cx = classNames.bind(styles);

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { status, msg, update } = useSelector((state) => state.status);

  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      return;
    }

    try {
      await dispatch(actions.loginadmin({ username, password }));

      if (msg === "success") {
        toast.success("Đăng nhập thành công!");
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        toast.error(msg || "Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className={cx("wrapper")}>
      <form className={cx("login-box")} onSubmit={handleLogin}>
        <h2>Đăng nhập Admin</h2>
        <div className={cx("form-group")}>
          <label>Tài khoản</label>
          <input
            type="text"
            placeholder="Nhập tài khoản"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={cx("form-group")}>
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={cx("login-button")} type="submit">
          Đăng nhập
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default LoginAdmin;
