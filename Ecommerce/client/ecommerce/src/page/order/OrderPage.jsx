import React from "react";
import classNames from "classnames/bind";
import styles from "./OrderPage.module.scss";
import SidebarProfile from "../Profile/component/SidebarProfile";
import OrderTab from "./components/OrderTab";
const cx = classNames.bind(styles);
const OrderPage = () => {
  return (
    <SidebarProfile>
      <div className={cx("order-content")}>
        <OrderTab />
      </div>
    </SidebarProfile>
  );
};

export default OrderPage;
