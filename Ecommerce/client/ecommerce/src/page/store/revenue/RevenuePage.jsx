import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./RevenuePage.module.scss";
import * as actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { image } from "../../../assets/image";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseURL = import.meta.env.VITE_SERVER_URL;

const cx = classNames.bind(styles);

const RevenuePage = () => {
  const { shop_id } = useParams();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showReply, setShowReply] = useState({});
  const product = useSelector((state) => state.product.product);
  const vote = useSelector((state) => state.vote.vote);
  const votereply = useSelector((state) => state.vote.votereply);
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getProductByShop({ id: shop_id }));
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    const found = product.find(
      (item) => item.product_id === Number(selectedId)
    );
    setSelectedProduct(found);
    dispatch(actions.getVoteProduct({ id: selectedId }));
  }, [selectedId, product]);
  useEffect(() => {
    if (!vote || vote.length === 0) return;
    vote.forEach((item) => {
      dispatch(actions.getVoteReply(item.vote_id));
    });
  }, [vote]);

  console.log(votereply);

  const handleToggleReply = (index) => {
    setShowReply((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const handleReply = async (voteId, customerId) => {
    const payload = {
      vote_id: voteId,
      customer_id: customerId,
      shop_id: shop_id,
      votereply_content: content,
    };
    const response = await dispatch(actions.createVoteReply(payload));
    if (response?.err === 0) {
      toast.success(`Trả lời đánh giá thành công!`);
      setShowReply(false);
    } else {
      toast.error(`Trả lời đánh giá thất bại: ${response?.msg || ""}`);
    }
  };
  return (
    <Sidebar>
      <div className={cx("wrapper")}>
        <div className={cx("select-product")}>
          <label>Chọn sản phẩm:</label>
          <select
            value={selectedId || ""}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">-- Chọn sản phẩm --</option>
            {product.map((item, i) => (
              <option key={i} value={item.product_id}>
                {item.product_name}
              </option>
            ))}
          </select>
        </div>

        {selectedProduct && (
          <div className={cx("review-section")}>
            <div className={cx("product-info")}>
              <img
                src={
                  baseURL +
                  (Array.isArray(selectedProduct.product_image)
                    ? selectedProduct.product_image[0]
                    : typeof selectedProduct.product_image === "string" &&
                      selectedProduct.product_image.includes("[")
                    ? JSON.parse(selectedProduct.product_image)[0]
                    : selectedProduct.product_image)
                }
                alt=""
              />
              <div>
                <h3>{selectedProduct.product_name}</h3>

                <div className={cx("product-rating")}>
                  {[...Array(selectedProduct.product_ratting)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}

                  <span>({selectedProduct.product_ratting})</span>
                </div>
                <p>{vote.length} đánh giá</p>
              </div>
            </div>

            <div className={cx("review-list")}>
              {vote.map((review, index) => (
                <div key={index} className={cx("review-item")}>
                  <div className={cx("review-header")}>
                    <div className={cx("user")}>
                      <img
                        src={
                          review.customers?.customer_avt
                            ? baseURL + review.customers?.customer_avt
                            : image.avatar
                        }
                        alt=""
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <strong>
                          {review.customers?.first_name +
                            " " +
                            review.customers?.last_name}
                        </strong>
                        <div className={cx("stars")}>
                          {[...Array(review.vote_rate)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <p>{review.vote_content}</p>
                        <div className={cx("view-img")}>
                          {(() => {
                            let images = [];

                            if (Array.isArray(review.vote_image)) {
                              images = review.vote_image;
                            } else if (
                              typeof review.vote_image === "string" &&
                              review.vote_image.includes("[")
                            ) {
                              try {
                                images = JSON.parse(review.vote_image);
                              } catch (e) {
                                images = [];
                              }
                            }

                            return images.map((img, index) => (
                              <img
                                key={index}
                                onClick={() => setSelectedImage(baseURL + img)}
                                src={baseURL + img}
                                alt={`vote-${index}`}
                              />
                            ));
                          })()}
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
                        {votereply[review.vote_id] &&
                          votereply[review.vote_id].map((rep, i) => (
                            <div key={i} className={cx("shop-reply")}>
                              <strong>Phản hồi của shop:</strong>
                              <p>{rep.votereply_content}</p>
                            </div>
                          ))}

                        <p
                          className={cx("reply")}
                          onClick={() => handleToggleReply(index)}
                        >
                          {showReply[index] ? "Đóng" : "Trả lời"}
                        </p>
                        {showReply[index] && (
                          <div
                            className={cx("reply-box", {
                              active: showReply[index],
                            })}
                          >
                            <textarea
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              placeholder="Phản hồi đánh giá của khách hàng..."
                            />
                            <div className={cx("reply-actions")}>
                              <button
                                onClick={() =>
                                  handleReply(
                                    review.vote_id,
                                    review.customers?.customer_id
                                  )
                                }
                                className={cx("submit-btn")}
                              >
                                Gửi phản hồi
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={cx("date")}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </Sidebar>
  );
};

export default RevenuePage;
