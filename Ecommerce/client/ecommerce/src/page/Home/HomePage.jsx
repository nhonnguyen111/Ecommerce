import React, { useEffect } from "react";
import Header from "./component/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import { formatVietNamtoString } from "../../ultils/contanst";
import Footer from "./component/Footer";
import * as actions from "../../store/actions";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProductSell from "./component/ProductSell";
import ProductNew from "./component/ProductNew";
const baseURL = import.meta.env.VITE_SERVER_URL;

const cx = classNames.bind(styles);

const HomePage = () => {
  const category = useSelector((state) => state.app.category);
  const product = useSelector((state) => state.product.product);
  const customerData = useSelector((state) => state.user.customerData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch(actions.getCategorys());
    dispatch(actions.getProduct());
    dispatch(actions.getCurrent());
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get("orderId");
    const resultCode = params.get("resultCode");

    if (orderId && resultCode === "0" && customerData?.customer_id) {
      const payload = {
        orderId: orderId,
      };
      dispatch(actions.getCallback(payload));

      setTimeout(() => {
        window.history.replaceState(null, "", "/");
        window.location.reload();
      }, 2000);
    }
  }, [location, dispatch, customerData]);
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN");
  };
  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <div className={cx("category-list")}>
          <h4>Danh mục</h4>
          <div className={cx("carousel-wrapper")}>
            <Swiper
              modules={[Navigation]}
              navigation
              slidesPerView={5}
              spaceBetween={20}
              className="mySwiper"
            >
              {category.length > 0 &&
                category.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={cx("category-card")}
                      onClick={() => {
                        const query = new URLSearchParams();
                        query.set("category_id", item.category_id);
                        navigate(`/search?${query.toString()}`);
                      }}
                      style={{
                        backgroundImage: `url(${item.category_image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        cursor: "pointer",
                      }}
                    >
                      <p>{item.category_name}</p>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        <div className={cx("product")}>
          <h4>Sản phẩm nổi bật</h4>
          <ProductSell />
        </div>
        <div className={cx("product")}>
          <h4>Sản phẩm mới</h4>
          <ProductNew />
        </div>
        <div className={cx("product")}>
          <h4>Tất cả sản phẩm</h4>
          <div className={cx("product-list")}>
            {product.length > 0 &&
              product.map((item, index) => {
                return (
                  <Link
                    to={`/detail/${formatVietNamtoString(item.product_name)}/${
                      item.product_id
                    }`}
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
                            {item.price.toLocaleString("vi-VN")}đ
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
                        {item.product_sale.toLocaleString("vi-VN") > 0
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
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
