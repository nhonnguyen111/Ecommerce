import React from "react";
import classNames from "classnames/bind";
import styles from "./ModalView.module.scss";
import { CloseOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const ModalView = ({ data, onClose, onSelect }) => {
  const handleClickItem = (item) => {
    onSelect(item); // Gửi địa chỉ về trang Pay
    onClose(); // Đóng modal
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <div className={cx("header")}>
          <h2>Danh sách địa chỉ giao hàng</h2>
          <button className={cx("close-btn")} onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>
        <div className={cx("content")}>
          {data?.length > 0 ? (
            data.map((item) => (
              <div
                key={item.delivery_id}
                className={cx("delivery-item")}
                onClick={() => handleClickItem(item)}
                style={{
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                  transition: "all 0.2s ease",
                }}
              >
                <p>
                  <strong>Người nhận:</strong> {item.username}
                </p>
                <p>
                  <strong>SĐT:</strong> {item.phone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {item.address}
                </p>
              </div>
            ))
          ) : (
            <p>Không có địa chỉ nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalView;
