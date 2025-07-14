import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { image } from "../../../assets/image";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import * as action from "../../../store/actions";
const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL;

const Header = () => {
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const customerData = useSelector((state) => state.user.customerData);
  const category = useSelector((state) => state.app.category);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [keyword, setKeyword] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.getCurrent());
    dispatch(action.getCategorys());
    dispatch(action.getCart());
  }, []);
  return (
    <div>
      <div className={cx("header-wrapper")}>
        <div className={cx("nav-bar")}>
          <div></div>
          <div className={cx("nav-shop")}>
            <div
              onClick={() => {
                if (isLoggedIn && customerData.shop_id == null) {
                  navigate(`/register-store/${customerData.customer_id}`);
                } else {
                  if (isLoggedIn && customerData.shops.shop_status === 0) {
                    navigate(`/register-success`);
                  } else {
                    if (isLoggedIn && customerData.shops.shop_status === 1) {
                      navigate(`/home/store/${customerData.shops.shop_id}`);
                    } else {
                      navigate("/login");
                    }
                  }
                }
              }}
              style={{ color: "#fff", cursor: "pointer" }}
            >
              Kênh bán hàng
            </div>
            <div>Khuyến mãi</div>
          </div>
        </div>
        <div className={cx("header")}>
          <Link to={"/"}>
            <img src={image.logo} alt="Logo" />
          </Link>
          <div>
            <div className={cx("search-container")}>
              <select
                className={cx("search-category")}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Tất cả</option>
                {category.map((item, i) => (
                  <option key={i} value={item.category_id}>
                    {item.category_name}
                  </option>
                ))}
              </select>
              <input
                className={cx("search-input")}
                type="text"
                placeholder="Nhập tên sản phẩm bạn cần tìm kiếm"
                value={keyword || ""}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                onClick={() => {
                  const query = new URLSearchParams();
                  if (keyword) query.set("keyword", keyword);
                  if (categoryId) query.set("category_id", categoryId);
                  navigate(`/search?${query.toString()}`);
                }}
                className={cx("search-btn")}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
          <div className={cx("btn-login")}>
            {!isLoggedIn && (
              <Link className={cx("btn")} to={"/login"}>
                <UserOutlined /> Đăng nhập
              </Link>
            )}
            {isLoggedIn && (
              <Link to={"/member/home"} className={cx("user")}>
                <div>
                  <img
                    src={
                      customerData.customer_avt
                        ? baseURL + customerData.customer_avt
                        : image.avatar
                    }
                    alt="avt"
                  />
                </div>
                <p>{customerData.first_name + " " + customerData.last_name}</p>
              </Link>
            )}
            <Link to={"/cart"} className={cx("cart-icon")}>
              <ShoppingCartOutlined />
              <div className={cx("cart-title")}>
                Giỏ hàng
                <p>{cartItems.length}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
