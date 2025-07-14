import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./HomeAdmin.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as actions from "../../store/actions";
import {
  DashboardOutlined,
  ProductOutlined,
  ShopOutlined,
  ProjectOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const cx = classNames.bind(styles);

const HomeAdmin = (props) => {
  const { status } = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!status) {
      navigate("/login-admin");
    }
  }, [status]);

  const handleLogout = () => {
    dispatch(actions.logoutadmin());
    navigate("/");
  };

  return (
    <div className={cx("container")}>
      <div className={cx("sidebar")}>
        <div>
          <h2 className={cx("logo")}>Admin Panel</h2>
          <ul className={cx("menu")}>
            <li onClick={() => navigate("/admin")} className={cx("menu-item")}>
              <DashboardOutlined /> Dashboard
            </li>
            <li
              onClick={() => navigate("/admin/shop")}
              className={cx("menu-item")}
            >
              <ShopOutlined /> Quản lý cửa hàng
            </li>
            <li
              onClick={() => navigate("/admin/product")}
              className={cx("menu-item")}
            >
              <ProductOutlined /> Quản lý sản phẩm
            </li>
            <li
              onClick={() => navigate("/admin/category")}
              className={cx("menu-item")}
            >
              <ProjectOutlined /> Quản lý danh mục
            </li>
          </ul>
        </div>
        <div className={cx("menu-item")} onClick={handleLogout}>
          <LogoutOutlined /> Đăng xuất
        </div>
      </div>

      <div className={cx("content")}>
        {props.children}
        {location.pathname === "/admin" && (
          <div>
            <h1>Chào mừng đến với trang quản trị!</h1>
            <p>Hãy chọn một chức năng ở menu bên trái để bắt đầu.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeAdmin;
