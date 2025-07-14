import React, { useState } from "react";
import styles from "./ModalProof.module.scss";
import classNames from "classnames/bind";
const baseURL = import.meta.env.VITE_SERVER_URL;
const cx = classNames.bind(styles);

const ModalProof = ({ data, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  if (!data) return null;

  const images = Array.isArray(data.proof_image)
    ? data.proof_image
    : JSON.parse(data.proof_image);

  return (
    <div className={cx("modal-overlay", { show: true })} onClick={onClose}>
      <div className={cx("modal-content")} onClick={(e) => e.stopPropagation()}>
        <button className={cx("close-button")} onClick={onClose}>
          ×
        </button>
        <p>
          <strong>Mô tả thông tin:</strong> {data.proof_description}
        </p>
        <h2>Hình ảnh minh chứng</h2>
        <div className={cx("image-grid")}>
          {images.map((img, index) => (
            <img
              key={index}
              src={baseURL + img}
              alt={`proof-${index}`}
              className={cx("proof-image")}
              onClick={() => setSelectedImage(baseURL + img)}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className={cx("lightbox")} onClick={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Zoom"
            className={cx("lightbox-image")}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={cx("close-button", "lightbox-close")}
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ModalProof;
