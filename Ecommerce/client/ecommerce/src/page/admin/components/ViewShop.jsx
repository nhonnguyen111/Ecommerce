import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ViewShop.module.scss";

const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL;

const ViewShop = ({ shop, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!shop) return null;

  let images = [];

  try {
    if (Array.isArray(shop.proofs?.proof_image)) {
      images = shop.proofs.proof_image;
    } else if (typeof shop.proofs?.proof_image === "string") {
      images = JSON.parse(shop.proofs.proof_image);
    }
  } catch (e) {
    images = [];
  }

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <button className={cx("close-btn")} onClick={onClose}>
          &times;
        </button>
        <h2>Thông tin chi tiết shop</h2>
        <div className={cx("section")}>
          <strong>Tên shop:</strong> {shop.shop_name}
        </div>
        <div className={cx("section")}>
          <strong>Địa chỉ:</strong> {shop.address}
        </div>
        <div className={cx("section")}>
          <strong>Mô tả:</strong> {shop.shop_description}
        </div>
        <div className={cx("section")}>
          <strong>Ảnh shop:</strong>
          <img
            src={baseURL + shop.shop_image}
            alt="shop"
            className={cx("image")}
            onClick={() => setSelectedImage(baseURL + shop.shop_image)}
          />
          {selectedImage && (
            <div
              className={cx("modalOverlay")}
              onClick={() => setSelectedImage(null)}
            >
              <div
                className={cx("modalContent")}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="proof-large"
                  style={{
                    width: "600px",
                    height: "400px",
                  }}
                />
                <button
                  className={cx("closeBtn")}
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={cx("section")}>
          <strong>Mô tả minh chứng:</strong> {shop.proofs?.proof_description}
        </div>
        <div className={cx("section")}>
          <strong>Hình ảnh minh chứng:</strong>
          <div className={cx("image-list")}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={baseURL + img}
                alt={`proof-${idx}`}
                className={cx("image")}
                onClick={() => setSelectedImage(baseURL + img)}
              />
            ))}
            {selectedImage && (
              <div
                className={cx("modalOverlay")}
                onClick={() => setSelectedImage(null)}
              >
                <div
                  className={cx("modalContent")}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedImage}
                    alt="proof-large"
                    style={{
                      width: "600px",
                      height: "400px",
                    }}
                  />
                  <button
                    className={cx("closeBtn")}
                    onClick={() => setSelectedImage(null)}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewShop;
