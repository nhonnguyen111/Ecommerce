import React from "react";
import classNames from "classnames/bind";
import styles from "./RegisterSuccess.module.scss";
import Header from "../../../Home/component/Header";
import Footer from "../../../Home/component/Footer";
import { image } from "../../../../assets/image";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const RegisterSuccess = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <div className={cx("section")}>
          <img src={image.shop_avt} alt="" />
          <p>Cảm ơn bạn đã đăng ký</p>
          <p>Vui lòng đợi xét duyệt từ phía quản trị viên</p>
          <button onClick={() => navigate("/")}>Quay lại trang chủ</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterSuccess;
