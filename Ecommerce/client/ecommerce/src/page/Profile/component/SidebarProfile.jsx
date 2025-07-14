import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SidebarProfile.module.scss";
import Footer from "../../Home/component/Footer";
import Header from "../../Home/component/Header";
import { image } from "../../../assets/image";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../../store/actions";
import { sidebar } from "../../../ultils/sidebar.jsx";
import { useLocation } from "react-router-dom";

import {
  WalletOutlined,
  LogoutOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_SERVER_URL;

const cx = classNames.bind(styles);

const SidebarProfile = (props) => {
  const customerData = useSelector((state) => state.user.customerData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentTitle, setCurrentTitle] = useState("Thông tin tài khoản");

  useEffect(() => {
    dispatch(action.getCurrent());
  }, []);
  useEffect(() => {
    const allItems = [
      ...sidebar,
      { name: "Theo dõi đơn hàng", path: "member/orders" },
      { name: "Địa chỉ giao hàng", path: "member/address" },
    ];
    const current = allItems.find(
      (item) => item.path === location.pathname.slice(1)
    );
    if (current) setCurrentTitle(current.name);
  }, [location]);

  const handleMenuClick = (name, path) => {
    setCurrentTitle(name);
    navigate(`/${path}`);
  };

  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <aside className={cx("sidebar")}>
          <div className={cx("profile")}>
            <img
              src={
                customerData.customer_avt
                  ? baseURL + customerData.customer_avt
                  : image.avatar
              }
              alt="avatar"
              className={cx("avatar")}
            />
            <Link to={"/member/home"} className={cx("username")}>
              {customerData.first_name + " " + customerData.last_name}
            </Link>
          </div>

          <nav className={cx("menu")}>
            <h4>Quản lý đơn hàng</h4>
            <ul>
              <li
                className={cx({
                  active: location.pathname.slice(1) === "member/orders",
                })}
                onClick={() =>
                  handleMenuClick("Quản lý đơn hàng", "member/orders")
                }
              >
                <WalletOutlined /> Theo dõi đơn hàng
              </li>

              <li
                className={cx({
                  active: location.pathname.slice(1) === "member/address",
                })}
                onClick={() =>
                  handleMenuClick("Địa chỉ giao hàng", "member/address")
                }
              >
                <DeploymentUnitOutlined /> Địa chỉ giao hàng
              </li>
            </ul>

            <h4>Quản lý tài khoản</h4>
            <ul>
              {sidebar.map((item, i) => (
                <li
                  key={i}
                  className={cx({
                    active: location.pathname.slice(1) === item.path,
                  })}
                  onClick={() => handleMenuClick(item.name, item.path)}
                >
                  {item.icon} {item.name}
                </li>
              ))}
            </ul>

            <h4
              onClick={() => {
                dispatch(action.logout());
                navigate("/");
              }}
              className={cx("logout")}
            >
              <LogoutOutlined />
              Đăng xuất
            </h4>
          </nav>
        </aside>

        <main className={cx("main-content")}>
          <div
            style={{ backgroundImage: `url(${image.banneruser})` }}
            className={cx("main-title")}
          >
            {currentTitle}
          </div>
          <div className={cx("main-background")}>{props.children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SidebarProfile;
