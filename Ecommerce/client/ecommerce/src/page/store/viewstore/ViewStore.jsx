import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ViewStore.module.scss";
import Header from "../../Home/component/Header";
import Footer from "../../Home/component/Footer";
import { Link, useParams } from "react-router-dom";
import * as actions from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { formatVietNamtoString } from "../../../ultils/contanst";

const cx = classNames.bind(styles);

const ViewStore = () => {
  const [activeTab, setActiveTab] = useState("Cửa hàng");
  const { shopId } = useParams();
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop.shop);
  const product = useSelector((state) => state.shop.product);

  useEffect(() => {
    dispatch(actions.getShop({ shop_id: shopId }));
    dispatch(actions.getProductofShop({ shop_id: shopId }));
  }, [shopId]);
  console.log(product);
  const baseURL = import.meta.env.VITE_SERVER_URL;
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN");
  };
  const totalpurchases = product.reduce((sum, item) => {
    return sum + item.product_purchases;
  }, 0);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Cửa hàng":
        return (
          <div>
            <div className={cx("section-title")}>
              <h3 className={cx("title")}>Sản phẩm bán chạy</h3>
              <span
                className={cx("view-all")}
                onClick={() => setActiveTab("Bán chạy nhất")}
              >
                Xem tất cả
              </span>
            </div>
            <div className={cx("product-list")}>
              {product.length > 0 &&
                product.map((item, index) => {
                  return (
                    <Link
                      to={`/detail/${formatVietNamtoString(
                        item.product_name
                      )}/${item.product_id}`}
                      key={index}
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
                        <h3 className={cx("product-title")}>
                          {item.product_name}
                        </h3>
                        {item.product_sale > 0 && (
                          <div className={cx("product-sale")}>
                            <p className={cx("product-price-sale")}>
                              {formatPrice(item.price)}đ
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
                          {formatPrice(item.product_sale) > 0
                            ? formatPrice(item.product_sale)
                            : formatPrice(item.price)}
                          đ
                        </p>

                        <div className={cx("product-rating")}>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>(0)</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <div className={cx("section-title")}>
              <h3 className={cx("title")}>Sản phẩm mới</h3>
              <span
                className={cx("view-all")}
                onClick={() => setActiveTab("Sản phẩm mới")}
              >
                Xem tất cả
              </span>
            </div>
            <div className={cx("product-list")}>
              {product.length > 0 &&
                product.map((item, index) => {
                  return (
                    <Link
                      to={`/detail/${formatVietNamtoString(
                        item.product_name
                      )}/${item.product_id}`}
                      key={index}
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
                        <h3 className={cx("product-title")}>
                          {item.product_name}
                        </h3>
                        {item.product_sale > 0 && (
                          <div className={cx("product-sale")}>
                            <p className={cx("product-price-sale")}>
                              {formatPrice(item.price)}đ
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
                          {formatPrice(item.product_sale) > 0
                            ? formatPrice(item.product_sale)
                            : formatPrice(item.price)}
                          đ
                        </p>

                        <div className={cx("product-rating")}>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>(0)</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <div className={cx("section-title")}>
              <h3 className={cx("title")}>Tất cả sản phẩm</h3>
              <span
                className={cx("view-all")}
                onClick={() => setActiveTab("Tất cả hàng hóa")}
              >
                Xem tất cả
              </span>
            </div>
            <div className={cx("product-list")}>
              {product.length > 0 &&
                product.map((item, index) => {
                  return (
                    <Link
                      to={`/detail/${formatVietNamtoString(
                        item.product_name
                      )}/${item.product_id}`}
                      key={index}
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
                        <h3 className={cx("product-title")}>
                          {item.product_name}
                        </h3>
                        {item.product_sale > 0 && (
                          <div className={cx("product-sale")}>
                            <p className={cx("product-price-sale")}>
                              {formatPrice(item.price)}đ
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
                          {formatPrice(item.product_sale) > 0
                            ? formatPrice(item.product_sale)
                            : formatPrice(item.price)}
                          đ
                        </p>

                        <div className={cx("product-rating")}>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>(0)</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        );
      case "Bán chạy nhất":
        return (
          <div className={cx("section")}>
            <div>
              <div className={cx("product-list")}>
                {product.length > 0 &&
                  product.map((item, index) => {
                    return (
                      <Link
                        to={`/detail/${formatVietNamtoString(
                          item.product_name
                        )}/${item.product_id}`}
                        key={index}
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
                          <h3 className={cx("product-title")}>
                            {item.product_name}
                          </h3>
                          {item.product_sale > 0 && (
                            <div className={cx("product-sale")}>
                              <p className={cx("product-price-sale")}>
                                {formatPrice(item.price)}đ
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
                            {formatPrice(item.product_sale) > 0
                              ? formatPrice(item.product_sale)
                              : formatPrice(item.price)}
                            đ
                          </p>

                          <div className={cx("product-rating")}>
                            <span>⭐</span>
                            <span>⭐</span>
                            <span>⭐</span>
                            <span>⭐</span>
                            <span>⭐</span>
                            <span>(0)</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        );

      case "Sản phẩm mới":
        return (
          <div>
            <div className={cx("product-list")}>
              {product.length > 0 &&
                product.map((item, index) => {
                  return (
                    <Link
                      to={`/detail/${formatVietNamtoString(
                        item.product_name
                      )}/${item.product_id}`}
                      key={index}
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
                        <h3 className={cx("product-title")}>
                          {item.product_name}
                        </h3>
                        {item.product_sale > 0 && (
                          <div className={cx("product-sale")}>
                            <p className={cx("product-price-sale")}>
                              {formatPrice(item.price)}đ
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
                          {formatPrice(item.product_sale) > 0
                            ? formatPrice(item.product_sale)
                            : formatPrice(item.price)}
                          đ
                        </p>

                        <div className={cx("product-rating")}>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>(0)</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        );
      case "Tất cả hàng hóa":
        return (
          <div>
            <div className={cx("product-list")}>
              {product.length > 0 &&
                product.map((item, index) => {
                  return (
                    <Link
                      to={`/detail/${formatVietNamtoString(
                        item.product_name
                      )}/${item.product_id}`}
                      key={index}
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
                        <h3 className={cx("product-title")}>
                          {item.product_name}
                        </h3>
                        {item.product_sale > 0 && (
                          <div className={cx("product-sale")}>
                            <p className={cx("product-price-sale")}>
                              {formatPrice(item.price)}đ
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
                          {formatPrice(item.product_sale) > 0
                            ? formatPrice(item.product_sale)
                            : formatPrice(item.price)}
                          đ
                        </p>

                        <div className={cx("product-rating")}>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>⭐</span>
                          <span>(0)</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        );
      case "Minh chứng":
        let images = [];
        try {
          if (typeof shop?.proofs?.proof_image === "string") {
            images = JSON.parse(shop?.proofs?.proof_image);
          } else if (Array.isArray(shop?.proofs?.proof_image)) {
            images = shop?.proofs?.proof_image;
          }
        } catch (e) {
          console.error("Lỗi parse proof_image:", e);
        }
        return (
          <div className={cx("section")}>
            <h3>Minh chứng của cửa hàng</h3>
            <div className={cx("proof-description")}>
              <p>{shop?.proofs?.proof_description}</p>
            </div>
            <div className={cx("proof-images")}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={baseURL + img}
                  alt={`proof-${index}`}
                  className={cx("proof-image")}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const tabList = [
    "Cửa hàng",
    "Bán chạy nhất",
    "Sản phẩm mới",
    "Tất cả hàng hóa",
    "Minh chứng",
  ];

  return (
    <div>
      <Header />
      <div className={cx("store-wrapper")}>
        <div className={cx("store-header")}>
          {shop && (
            <div className={cx("store-info")}>
              <img
                className={cx("store-logo")}
                src={
                  baseURL +
                  (Array.isArray(shop?.shop_image)
                    ? shop?.shop_image[0]
                    : typeof shop?.shop_image === "string" &&
                      shop?.shop_image.includes("[")
                    ? JSON.parse(shop?.shop_image)[0]
                    : shop?.shop_image)
                }
                alt="store"
              />
              <div className={cx("store-details")}>
                <h2>{shop.shop_name}</h2>
                <p>
                  Địa chỉ: <strong>{shop.address}</strong>
                </p>
                <p>
                  Sản phẩm đã bán: <strong>{totalpurchases}</strong>
                </p>
                <p>
                  Mặt hàng: <strong>{product.length}</strong>
                </p>
                <p>
                  Đánh giá: <strong>0</strong>
                </p>
              </div>
              <button className={cx("favorite-btn")}>♡ Yêu thích</button>
            </div>
          )}

          <div className={cx("store-search")}>
            <input
              placeholder="Tìm kiếm sản phẩm tại cửa hàng"
              className={cx("search-input")}
            />
            <button className={cx("search-button")}>Tìm kiếm</button>
          </div>
        </div>

        {/* Tabs */}
        <div className={cx("store-tabs")}>
          <ul>
            {tabList.map((tab) => (
              <li
                key={tab}
                className={cx({ active: activeTab === tab })}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
          {renderTabContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewStore;
