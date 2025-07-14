import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ViewProduct.module.scss";

const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL;

const ViewProduct = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!product) return null;

  const getImageUrl = (image) => {
    let productImage = image;
    if (!productImage) return [];

    if (Array.isArray(productImage)) return productImage;

    if (typeof productImage === "string" && productImage.includes("[")) {
      try {
        return JSON.parse(productImage);
      } catch {
        return [];
      }
    }

    return [productImage];
  };

  const getProofImages = () => {
    let proofImage = product?.proofs?.proof_image;
    if (!proofImage) return [];

    if (Array.isArray(proofImage)) return proofImage;

    if (typeof proofImage === "string" && proofImage.includes("[")) {
      try {
        return JSON.parse(proofImage);
      } catch {
        return [];
      }
    }

    return [proofImage];
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <h2>Thông tin chi tiết sản phẩm</h2>
        <button onClick={onClose} className={cx("closeBtn")}>
          ✖
        </button>

        <div className={cx("content")}>
          <div className={cx("imageBlock")}>
            {getImageUrl(product.product_image).map((img, i) => (
              <img
                key={i}
                onClick={() => setSelectedImage(baseURL + img)}
                src={baseURL + img}
                alt={`product-${i}`}
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

          <div className={cx("infoBlock")}>
            <p>
              <strong>Tên sản phẩm:</strong> {product.product_name}
            </p>
            <p>
              <strong>Mô tả:</strong> {product.product_description}
            </p>
            <p>
              <strong>Giá gốc:</strong> {product.price.toLocaleString()} đ
            </p>
            <p>
              <strong>Giá khuyến mãi:</strong> {product.product_sale} %
            </p>
            <p>
              <strong>Tồn kho:</strong> {product.product_inventory}
            </p>
            <p>
              <strong>Đã bán:</strong> {product.product_purchases}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {product.product_status === 1 ? "Hiển thị" : "Ẩn"}
            </p>
          </div>

          <div className={cx("proofBlock")}>
            <p>
              <strong>Mô tả minh chứng:</strong>
            </p>
            <p>{product.proofs?.proof_description}</p>
            <div className={cx("proofImages")}>
              {getProofImages().map((img, i) => (
                <img
                  onClick={() => setSelectedImage(baseURL + img)}
                  key={i}
                  src={baseURL + img}
                  alt={`proof-${i}`}
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
    </div>
  );
};

export default ViewProduct;
