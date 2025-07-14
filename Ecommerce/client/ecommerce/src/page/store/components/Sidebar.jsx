import React, { useEffect, useState } from "react";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { image } from "../../../assets/image";
import { sidebarSotre } from "../../../ultils/sidebarStore";
import { Link, useLocation, useParams } from "react-router-dom";
import * as actions from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const baseURL = import.meta.env.VITE_SERVER_URL;

const cx = classNames.bind(styles);

const Sidebar = (props) => {
  const { shop_id } = useParams();
  const location = useLocation();
  const customerData = useSelector((state) => state.user.customerData);
  const dispatch = useDispatch();
  const [hideSidebar, setHideSidebar] = useState(false);
  useEffect(() => {
    dispatch(actions.getCurrent());
  }, []);
  const handleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper", { hide: hideSidebar })}>
        <div className={cx("title")}>
          <p>{!hideSidebar && "Cửa hàng của bạn"}</p>
          {hideSidebar ? (
            <DoubleRightOutlined
              onClick={handleSidebar}
              className={cx("icon")}
            />
          ) : (
            <DoubleLeftOutlined
              onClick={handleSidebar}
              className={cx("icon")}
            />
          )}
        </div>
        {!hideSidebar && (
          <ul className={cx("menuList")}>
            {sidebarSotre.map((item) => (
              <Link
                to={`/${item.path.split("/:")[0]}/${shop_id}`}
                key={item.i}
                className={cx("menuItem", {
                  active: location.pathname.startsWith(
                    `/${item.path.split("/:")[0]}`
                  ),
                })}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </ul>
        )}
      </div>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <h3>
            {sidebarSotre.find((item) =>
              location.pathname.startsWith(`/${item.path.split("/:")[0]}`)
            )?.name || "Trang quản lý"}
          </h3>
          <div className={cx("manager")}>
            <p>Giao diện</p>
            <Link style={{ color: "#000" }} to={"/"}>
              Mua hàng
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <img
                src={
                  customerData.customer_avt
                    ? baseURL + customerData.customer_avt
                    : image.avatar
                }
                alt=""
              />
              <p>{customerData.first_name + " " + customerData.last_name}</p>
            </div>
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
