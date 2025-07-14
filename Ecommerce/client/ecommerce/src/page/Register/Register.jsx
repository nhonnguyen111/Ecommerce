import React, { useState, useEffect } from "react";
import Header from "../Home/component/Header";
import Footer from "../Home/component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const Register = () => {
  const [customeremail, setCustomeremail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [sdt, setSdt] = useState("");
  const [pass, setPass] = useState("");
  const [gender, setGender] = useState("");
  const [dayofbirth, setDayofBirth] = useState("");
  const [comfimpass, setComfimpass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!customeremail || !first || !last || !sdt || !pass || !comfimpass) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!emailRegex.test(customeremail)) {
      toast.error("Email không hợp lệ!");
      return;
    }

    if (pass !== comfimpass) {
      toast.error("Mật khẩu và Nhập lại mật khẩu không khớp!");
      return;
    }

    if (sdt.length < 9 || sdt.length > 11 || !/^\d+$/.test(sdt)) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }

    let payload = {
      email: customeremail,
      firstname: first,
      lastname: last,
      phone: sdt,
      password: comfimpass,
      gender: gender,
      dateofbirth: dayofbirth,
    };
    dispatch(actions.resgister(payload));
  };

  useEffect(() => {
    if (msg) {
      if (msg === "success") {
        toast.success("Đăng ký thành công!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
          <h3>Đăng ký</h3>
          <input
            onChange={(e) => setCustomeremail(e.target.value)}
            className={cx("input")}
            placeholder="Email"
            type="email"
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              onChange={(e) => setFirst(e.target.value)}
              className={cx("input")}
              placeholder="Họ"
              type="text"
            />
            <input
              onChange={(e) => setLast(e.target.value)}
              className={cx("input")}
              placeholder="Tên"
              type="text"
            />
          </div>
          <input
            onChange={(e) => setSdt(e.target.value)}
            className={cx("input")}
            placeholder="Số điện thoại"
            type="text"
          />
          <div className={cx("gender")}>
            <input
              type="date"
              placeholder="Ngày tháng năm sinh"
              onChange={(e) => setDayofBirth(e.target.value)}
            />
            <select
              name="gender"
              id="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <input
            onChange={(e) => setPass(e.target.value)}
            className={cx("input")}
            placeholder="Mật khẩu"
            type="password"
          />
          <input
            onChange={(e) => setComfimpass(e.target.value)}
            className={cx("input")}
            placeholder="Nhập lại mật khẩu"
            type="password"
          />
          <button onClick={handleSubmit} className={cx("btn-login")}>
            Đăng ký
          </button>
          <p>
            Bạn đã có tài khoản?{" "}
            <span>
              <a href="/login">Đăng nhập ngay!</a>
            </span>
          </p>
        </div>
      </div>
      <Footer />

      <ToastContainer />
    </div>
  );
};

export default Register;
