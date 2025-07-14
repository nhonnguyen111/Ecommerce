import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./DetailPage.module.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../Home/component/Header";
import Footer from "../Home/component/Footer";
import * as action from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { image } from "../../assets/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeartOutlined, ShopOutlined } from "@ant-design/icons";
import { formatVietNamtoString } from "../../ultils/contanst";
const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL;

const DetailPage = () => {
  const { productId } = useParams();
  const product = useSelector((state) => state.product.product);
  const productselling = useSelector((state) => state.product.productselling);
  const vote = useSelector((state) => state.vote.vote);
  const votereply = useSelector((state) => state.vote.votereply);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thumbnailListRef = useRef(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReply, setShowReply] = useState({});
  console.log(productselling);

  useEffect(() => {
    if (productId) {
      dispatch(action.getProductById({ id: productId }));
      dispatch(action.getVoteProduct({ id: productId }));
    }
  }, [productId]);
  useEffect(() => {
    if (product && product.shops?.shop_id) {
      dispatch(action.getProductSellingByShop({ id: product.shops.shop_id }));
    }
  }, [product]);
  useEffect(() => {
    if (!vote || vote.length === 0) return;
    vote.forEach((item) => {
      dispatch(action.getVoteReply(item.vote_id));
    });
  }, [vote]);

  useEffect(() => {
    if (product?.product_image) {
      let images = [];
      if (Array.isArray(product.product_image)) {
        images = product.product_image;
      } else if (
        typeof product.product_image === "string" &&
        product.product_image.includes("[")
      ) {
        try {
          images = JSON.parse(product.product_image);
        } catch (error) {
          console.error("Lỗi parse ảnh:", error);
        }
      } else {
        images = [product.product_image];
      }

      setThumbnails(images);
      setMainImage(images[0] || "");
      setCurrentIndex(0);
    }
  }, [product]);

  const handleSelectThumbnail = (index) => {
    setCurrentIndex(index);
    setMainImage(thumbnails[index]);
    scrollToThumbnail(index);
  };

  const handlePrevImage = () => {
    const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    setCurrentIndex(newIndex);
    setMainImage(thumbnails[newIndex]);
    scrollToThumbnail(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = (currentIndex + 1) % thumbnails.length;
    setCurrentIndex(newIndex);
    setMainImage(thumbnails[newIndex]);
    scrollToThumbnail(newIndex);
  };
  const handleNextQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handlePrevQuantity = () => {
    if (quantity <= 1) {
      return 1;
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handleToggleReply = (voteId) => {
    setShowReply((prev) => ({
      ...prev,
      [voteId]: !prev[voteId],
    }));
  };

  const scrollToThumbnail = (index) => {
    if (!thumbnailListRef.current) return;

    const container = thumbnailListRef.current;
    const thumbWidth = 60 + 8;
    const scrollPosition = index * thumbWidth;
    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };
  const [activeTab, setActiveTab] = useState("Mô tả");
  const tabs = ["Mô tả", "Đánh giá", "Minh chứng"];

  const renderContent = () => {
    switch (activeTab) {
      case "Mô tả":
        return (
          <div className={cx("tabContent")}>{product.product_description}</div>
        );
      case "Đánh giá":
        return (
          <div className={cx("tabContent-cmt")}>
            <div className={cx("reviewList")}>
              <div className={cx("reviewItem")}>
                {vote.length > 0 &&
                  vote.map((item, i) => {
                    return (
                      <div key={i} className={cx("review")}>
                        <img
                          src={
                            item.customers?.customer_avt
                              ? baseURL + item.customers?.customer_avt
                              : image.avatar
                          }
                          alt="avt"
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "80%",
                          }}
                        >
                          <div>
                            <strong>
                              {item.customers?.first_name +
                                " " +
                                item.customers?.last_name}
                            </strong>
                            <div className={cx("stars")}>
                              {[...Array(item.vote_rate)].map((_, i) => (
                                <span key={i}>★</span>
                              ))}
                            </div>
                            <p>{item.vote_content}</p>
                            <div className={cx("view-img")}>
                              {(() => {
                                let images = [];

                                if (Array.isArray(item.vote_image)) {
                                  images = item.vote_image;
                                } else if (
                                  typeof item.vote_image === "string" &&
                                  item.vote_image.includes("[")
                                ) {
                                  try {
                                    images = JSON.parse(item.vote_image);
                                  } catch (e) {
                                    images = [];
                                  }
                                }

                                return images.map((img, index) => (
                                  <img
                                    key={index}
                                    onClick={() =>
                                      setSelectedImage(baseURL + img)
                                    }
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
                            {votereply[item.vote_id].length > 0 && (
                              <p
                                className={cx("reply-toggle")}
                                onClick={() => handleToggleReply(item.vote_id)}
                              >
                                {showReply[item.vote_id]
                                  ? "Ẩn phản hồi"
                                  : "Hiện phản hồi"}
                              </p>
                            )}

                            {showReply[item.vote_id] &&
                              votereply[item.vote_id] && (
                                <div className={cx("reply")}>
                                  {votereply[item.vote_id].map((rep, i) => (
                                    <div key={i} className={cx("shop-reply")}>
                                      <strong>Phản hồi từ shop:</strong>
                                      <p>{rep.votereply_content}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        </div>
                        <p style={{ fontSize: "12px" }}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );
      case "Minh chứng":
        let images = [];
        try {
          if (typeof product.proofs?.proof_image === "string") {
            images = JSON.parse(product.proofs.proof_image);
          } else if (Array.isArray(product.proofs?.proof_image)) {
            images = product.proofs.proof_image;
          }
        } catch (e) {
          console.error("Lỗi parse proof_image:", e);
        }

        return (
          <div className={cx("tabContent")}>
            {product.proofs?.proof_description && (
              <p>{product.proofs.proof_description}</p>
            )}
            {images.map((img, i) => (
              <img
                key={i}
                src={baseURL + img}
                alt={`proof-${i}`}
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedImage(baseURL + img)}
                onError={(e) => {
                  e.target.src = "/default-thumb.jpg";
                }}
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
                  <img src={selectedImage} alt="proof-large" />
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
        );

      default:
        return null;
    }
  };
  const handleAddToCart = () => {
    if (!product || !product.category_id) return;
    const res = dispatch(action.addToCart(product, quantity));
    console.log(res);

    toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
  };

  return (
    <div>
      <Header />
      <div className={cx("wrapper")}>
        <div className={cx("link-product")}>
          Trang chủ / {product.product_name}
        </div>
        <div className={cx("container")}>
          <div className={cx("imageSection")}>
            <div className={cx("mainImageWrapper")}>
              <img
                src={baseURL + mainImage}
                alt="product"
                className={cx("mainImage")}
              />
            </div>
            <div className={cx("thumbnailCarousel")}>
              <button className={cx("navBtn")} onClick={handlePrevImage}>
                ❮
              </button>
              <div className={cx("thumbnailList")} ref={thumbnailListRef}>
                {thumbnails.map((img, i) => (
                  <img
                    key={i}
                    src={baseURL + img}
                    alt={`thumb-${i}`}
                    className={cx("thumb", { active: currentIndex === i })}
                    onClick={() => handleSelectThumbnail(i)}
                    onError={(e) => {
                      e.target.src = "/default-thumb.jpg";
                    }}
                  />
                ))}
              </div>

              <button className={cx("navBtn")} onClick={handleNextImage}>
                ❯
              </button>
            </div>
          </div>

          <div className={cx("detailSection")}>
            <h2>{product.product_name}</h2>
            <div className={cx("rating")}>
              <div className={cx("product-rating")}>
                <div className={cx("product-rating")}>
                  {product.product_ratting > 0 ? (
                    <>
                      {[...Array(product.product_ratting)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                      <span> ({product.product_ratting} / 5)</span>
                    </>
                  ) : (
                    <span>Chưa có đánh giá</span>
                  )}
                </div>
              </div>

              <span>{product.product_purchases || 0} lượt mua</span>
            </div>
            <p className={cx("shop-name")}>
              <strong>Gửi từ :</strong>{" "}
              {product.shops?.address || "Đang cập nhật"}
            </p>
            <div className={cx("variant")}>
              <strong>Tồn kho :</strong>
              <div className={cx("variantImages")}>
                {product.product_inventory || "Đang cập nhật"}
              </div>
            </div>
            <div className={cx("variant")}>
              <strong>Đơn vị tính :</strong>
              <div className={cx("variantImages")}>
                {product.unit || "Đang cập nhật"}
              </div>
            </div>
            <div className={cx("price")}>
              <div className={cx("product-price")}>
                {product.product_sale && product.product_sale > 0
                  ? product.product_sale.toLocaleString("vi-VN")
                  : product.price
                  ? product.price.toLocaleString("vi-VN")
                  : "0"}{" "}
                đ
              </div>
              {product.product_sale > 0 && (
                <div className={cx("sale")}>
                  <div className={cx("product-price-sale")}>
                    {product.price.toLocaleString("vi-VN")}đ
                  </div>
                  <span>
                    GIẢM{" "}
                    {Math.floor(
                      100 - (product.product_sale / product.price) * 100
                    )}
                    %
                  </span>
                </div>
              )}
            </div>
            <div className={cx("actions")}>
              <h2>Số lượng :</h2>
              <div className={cx("quantity")}>
                <button disabled={quantity === 1} onClick={handlePrevQuantity}>
                  -
                </button>
                <input type="text" value={quantity} readOnly />
                <button onClick={handleNextQuantity}>+</button>
              </div>
            </div>
            <div className={cx("btn")}>
              <button onClick={handleAddToCart} className={cx("cartBtn")}>
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={() => {
                  navigate("/pay", { state: { product, quantity } });
                }}
                className={cx("buyBtn")}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("shop")}>
        <div className={cx("shop-content")}>
          <img
            src={
              baseURL +
                (Array.isArray(product.shops?.shop_image)
                  ? product.shops?.shop_image[0]
                  : typeof product.shops?.shop_image === "string" &&
                    product.shops?.shop_image.includes("[")
                  ? JSON.parse(product.shops?.shop_image)[0]
                  : product.shops?.shop_image) || image.shop_avt
            }
            alt=""
          />
          <div className={cx("shop-title")}>
            <h4>{product.shops?.shop_name}</h4>
            <p>Địa chỉ : {product.shops?.address || "Đang cập nhật"} </p>
          </div>
        </div>
        <div>
          <div className={cx("btn-shop")}>
            <button
              onClick={() => navigate(`/store/${product.shops?.shop_id}`)}
              className={cx("view-shop")}
            >
              <ShopOutlined />
              Xem cửa hàng
            </button>
            <button className={cx("wishlist")}>
              <HeartOutlined />
              Yêu thích
            </button>
          </div>
        </div>
      </div>
      <div className={cx("description")}>
        <div className={cx("product-hot")}>
          <h4>Sản phẩm bán chạy</h4>
          {productselling.length > 0 &&
            productselling.slice(0, 3).map((item, i) => {
              return (
                <Link
                  to={`/detail/${formatVietNamtoString(item.product_name)}/${
                    item.product_id
                  }`}
                  key={i}
                  className={cx("product-box")}
                >
                  <img
                    src={
                      baseURL +
                      (Array.isArray(item.product_image)
                        ? item.product_image[0]
                        : typeof item.product_image === "string" &&
                          item.product_image.includes("[")
                        ? JSON.parse(item.product_image)[0]
                        : item.product_image)
                    }
                    alt=""
                  />
                  <div className={cx("content")}>
                    <h4>{item.product_name}</h4>
                    {item.product_sale > 0 && (
                      <div className={cx("product-sale")}>
                        <p className={cx("product-price-sale")}>
                          {item.price.toLocaleString("vi-VN")} đ
                        </p>
                        <span>
                          GIẢM{" "}
                          {Math.floor(
                            100 - (item.product_sale / item.price) * 100
                          )}
                          %
                        </span>
                      </div>
                    )}
                    <p className={cx("product-price")}>
                      {item.product_sale > 0
                        ? item.product_sale.toLocaleString("vi-VN")
                        : item.price.toLocaleString("vi-VN")}
                      đ
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className={cx("tabsContainer")}>
          <div className={cx("tabHeaders")}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={cx("tabButton", { active: activeTab === tab })}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {renderContent()}
        </div>
      </div>
      <div className={cx("product-suggest")}>
        <h4>Sản phẩm được đề xuất</h4>
        <div className={cx("product-view")}>
          {productselling.length > 0 &&
            productselling.map((item, i) => {
              return (
                <Link
                  to={`/detail/${formatVietNamtoString(item.product_name)}/${
                    item.product_id
                  }`}
                  key={i}
                  className={cx("product-card")}
                >
                  <img
                    className={cx("product-image")}
                    src={
                      baseURL +
                      (Array.isArray(item.product_image)
                        ? item.product_image[0]
                        : typeof item.product_image === "string" &&
                          item.product_image.includes("[")
                        ? JSON.parse(item.product_image)[0]
                        : item.product_image)
                    }
                    alt="Tên sản phẩm"
                  />
                  <div className={cx("product-info")}>
                    <h3 className={cx("product-title")}>{item.product_name}</h3>
                    {item.product_sale > 0 && (
                      <div className={cx("product-sale")}>
                        <p className={cx("product-price-sale")}>
                          {item.price.toLocaleString("vi-VN")} đ
                        </p>
                        <span>
                          GIẢM{" "}
                          {Math.floor(
                            100 - (item.product_sale / item.price) * 100
                          )}
                          %
                        </span>
                      </div>
                    )}
                    <p className={cx("product-price")}>
                      {item.product_sale > 0
                        ? item.product_sale.toLocaleString("vi-VN")
                        : item.price.toLocaleString("vi-VN")}
                      đ
                    </p>
                    <div className={cx("product-rating")}>
                      {[...Array(item.product_ratting)].map((_, i) => (
                        <>
                          <span key={i}>⭐</span>
                        </>
                      ))}
                      <span>({item.product_ratting})</span>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default DetailPage;
