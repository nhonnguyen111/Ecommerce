import React, { useState, useEffect } from "react";
import Header from "../Home/component/Header";
import Footer from "../Home/component/Footer";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
const cx = classNames.bind(styles);

const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const handleLogin = () => {
    if (!username || !pass) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (
      username.length < 9 ||
      username.length > 11 ||
      !/^\d+$/.test(username)
    ) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }

    let payload = {
      phone: username,
      password: pass,
    };
    dispatch(actions.login(payload));
  };

  useEffect(() => {
    if (msg) {
      if (msg === "success") {
        toast.success("Đăng nhập thành công!");
        navigate("/");
        window.location.reload();
      } else if (msg) {
        toast.error(msg);
      }
    }
  }, [msg, navigate]);
  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <div className={cx("form")}>
          <h3>Đăng nhập</h3>
          <input
            type="text"
            className={cx("input")}
            placeholder="Số điện thoại"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className={cx("input")}
            placeholder="Mật khẩu"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button onClick={handleLogin} className={cx("btn-login")}>
            Đăng nhập
          </button>
          <a className={cx("by-pass")} href="#">
            Quên mật khẩu?
          </a>
          <p>
            Bạn chưa có tài khoản?{" "}
            <span>
              <a href="/register">Đăng ký ngay!</a>
            </span>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Login;
