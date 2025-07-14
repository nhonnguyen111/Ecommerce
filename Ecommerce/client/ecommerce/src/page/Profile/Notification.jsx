import React, { useEffect, useState } from "react";
import SidebarProfile from "./component/SidebarProfile";
import classNames from "classnames/bind";
import styles from "./Notification.module.scss";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { NotificationOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);

const Notification = () => {
  const dispatch = useDispatch();
  const notifi = useSelector((state) => state.notifi.notifi);
  const customerData = useSelector((state) => state.user.customerData);

  useEffect(() => {
    dispatch(actions.getNotification({ id: customerData.customer_id }));
  }, [customerData]);
  console.log(notifi);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <SidebarProfile>
      <div className={cx("container")}>
        {notifi.length === 0 ? (
          <p className={cx("empty")}>Không có thông báo nào.</p>
        ) : (
          <ul className={cx("notification-list")}>
            {notifi.map((item, index) => (
              <li key={index} className={cx("notification-item")}>
                <div>
                  <NotificationOutlined />
                  <div>
                    <p className={cx("message")}>{item.noti_content}</p>
                    <span className={cx("time")}>
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SidebarProfile>
  );
};

export default Notification;
