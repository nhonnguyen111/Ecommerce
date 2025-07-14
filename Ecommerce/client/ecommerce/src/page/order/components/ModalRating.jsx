import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalRating.module.scss";
import * as action from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { ItalicOutlined, PictureOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiupdateAvt } from "../../../services/customer";
const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL;

const ModalRating = ({ onClose, data = [] }) => {
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState(
    data.map((item) => ({
      product_id: item.product_id,
      vote_rate: 0,
      vote_content: "",
      vote_image: [],
      order_id: item.order_id,
    }))
  );
  console.log(data);

  const handleStarChange = (product_id, vote_rate) => {
    setRatings((prev) =>
      prev.map((item) =>
        item.product_id === product_id ? { ...item, vote_rate } : item
      )
    );
  };

  const handleContentChange = (product_id, vote_content) => {
    setRatings((prev) =>
      prev.map((item) =>
        item.product_id === product_id ? { ...item, vote_content } : item
      )
    );
  };

  const handleSubmit = async () => {
    const missing = ratings.find(
      (r) => r.vote_rate === 0 || r.vote_content.trim() === ""
    );
    if (missing) {
      toast.warning("Vui lòng đánh giá đầy đủ tất cả sản phẩm!");
      return;
    }

    try {
      const updatedRatings = await Promise.all(
        ratings.map(async (item) => {
          let uploadedImagePaths = [];

          if (item.vote_image.length > 0) {
            for (let img of item.vote_image) {
              const formDataUpload = new FormData();
              formDataUpload.append("file", img.file);

              const response = await apiupdateAvt(formDataUpload);

              if (response?.data?.err === 0) {
                uploadedImagePaths.push(response.data.imagePath);
              } else {
                toast.error(`Tải ảnh thất bại: ${response?.data?.msg}`);
              }
            }
          }

          return {
            ...item,
            vote_image: uploadedImagePaths,
          };
        })
      );

      for (let rating of updatedRatings) {
        const payload = {
          product_id: rating.product_id,
          vote_rate: rating.vote_rate,
          vote_content: rating.vote_content,
          vote_image: rating.vote_image,
          order_id: rating.order_id,
        };

        const response = await dispatch(action.createVote(payload));
        if (response?.err === 0) {
          toast.success(`Đánh giá sản phẩm thành công!`);
          setTimeout(() => {
            onClose();
          }, 1000);
        } else {
          toast.error(`Đánh giá sản phẩm thất bại: ${response?.msg || ""}`);
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tải ảnh hoặc gửi đánh giá.");
    }
  };

  const handleRemoveImage = (product_id, indexToRemove) => {
    setRatings((prev) =>
      prev.map((item) =>
        item.product_id === product_id
          ? {
              ...item,
              vote_image: item.vote_image.filter(
                (_, index) => index !== indexToRemove
              ),
            }
          : item
      )
    );
  };

  const handleImageChange = (product_id, e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setRatings((prev) =>
      prev.map((item) =>
        item.product_id === product_id
          ? {
              ...item,
              vote_image: [...item.vote_image, ...newImages],
            }
          : item
      )
    );
  };

  return (
    <div className={cx("modalOverlay")} onClick={onClose}>
      <div className={cx("modalContent")} onClick={(e) => e.stopPropagation()}>
        <h3 className={cx("title")}>Đánh giá sản phẩm</h3>
        <div className={cx("ratingListWrapper")}>
          {" "}
          {data.map((item, index) => {
            const parsedImages = (() => {
              try {
                const imgs = JSON.parse(item.products?.product_image);
                return Array.isArray(imgs) ? imgs : [imgs];
              } catch {
                return [item.products?.product_image];
              }
            })();
            const rating = ratings.find(
              (r) => r.product_id === item.product_id
            );

            return (
              <div key={index} className={cx("ratingItem")}>
                <div className={cx("productInfo")}>
                  <img
                    src={baseURL + parsedImages[0]}
                    alt={item.products?.product_name}
                    className={cx("productImage")}
                  />
                  <div>
                    <div className={cx("productName")}>
                      {item.products?.product_name}
                    </div>
                    <div className={cx("productContent")}>
                      Giá: {item.product_price.toLocaleString("vi-VN")}đ | Số
                      lượng: {item.product_qty} | Đơn vị tính: {item.unit}
                    </div>
                  </div>
                </div>
                <div className={cx("starSelect")}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={cx("star", {
                        active: rating?.vote_rate >= s,
                      })}
                      onClick={() => handleStarChange(item.product_id, s)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <textarea
                  placeholder="Viết đánh giá của bạn..."
                  value={rating?.vote_content}
                  onChange={(e) =>
                    handleContentChange(item.product_id, e.target.value)
                  }
                />
                <div className={cx("mediaButtons")}>
                  <label className={cx("uploadBtn")}>
                    <PictureOutlined />
                    Thêm Hình ảnh
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={(e) => handleImageChange(item.product_id, e)}
                    />
                  </label>
                  {rating?.vote_image.length > 0 && (
                    <div className={cx("previewImages")}>
                      {rating.vote_image.map((img, i) => (
                        <div key={i} style={{ position: "relative" }}>
                          <img
                            src={img.preview}
                            alt="preview"
                            className={cx("previewImg")}
                          />
                          <button
                            type="button"
                            className={cx("removeBtn")}
                            onClick={() =>
                              handleRemoveImage(item.product_id, i)
                            }
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={cx("btn-rating")}>
          <button className={cx("back")} onClick={onClose}>
            Trở về
          </button>
          <button className={cx("submitBtn")} onClick={handleSubmit}>
            Gửi đánh giá
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalRating;
