import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SearchPage.module.scss";
import Header from "../Home/component/Header";
import Footer from "../Home/component/Footer";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { formatVietNamtoString } from "../../ultils/contanst";
const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL;

const SearchPage = () => {
  const [sort, setSort] = useState("Phổ biến");
  const category = useSelector((state) => state.app.category);
  const product = useSelector((state) => state.product.product);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getCategorys());
  }, []);
  useEffect(() => {
    let param = [];
    for (let entry of params.entries()) {
      param.push(entry);
    }
    let searchParamsObject = {};
    param?.forEach((i) => {
      searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] };
    });
    dispatch(actions.getProductQuery(searchParamsObject));
  }, [params]);
  const price = [
    { label: "Dưới 10 nghìn", min: 0, max: 10000 },
    { label: "10 - 100 nghìn", min: 10000, max: 100000 },
    { label: "100 - 200 nghìn", min: 100000, max: 200000 },
    { label: "Trên 200 nghìn", min: 200000, max: 999999999 },
  ];
  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <div className={cx("breadcrumb")}>
          Trang chủ &gt; <span>Kết quả tìm kiếm</span>
        </div>
        <div className={cx("content")}>
          <div className={cx("sidebar")}>
            <h3>Danh mục</h3>
            <ul>
              <li
                onClick={() => navigate("/search")}
                className={!params.get("category_id") ? cx("active") : ""}
              >
                Tất cả sản phẩm
              </li>

              {category.map((item, idx) => (
                <li
                  onClick={() => {
                    const query = new URLSearchParams(params);
                    query.set("category_id", item.category_id);
                    navigate(`/search?${query.toString()}`);
                  }}
                  className={
                    params.get("category_id") == item.category_id
                      ? cx("active")
                      : ""
                  }
                  key={idx}
                >
                  {item.category_name}
                </li>
              ))}
            </ul>

            <h3>Chọn khoảng giá</h3>
            <div className={cx("price-range")}>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  const query = new URLSearchParams(params);
                  if (value === "") {
                    query.delete("price_min");
                    query.delete("price_max");
                  } else {
                    const [min, max] = value.split("-");
                    query.set("price_min", min);
                    query.set("price_max", max);
                  }
                  navigate(`/search?${query.toString()}`);
                }}
                value={
                  params.get("price_min") && params.get("price_max")
                    ? `${params.get("price_min")}-${params.get("price_max")}`
                    : ""
                }
              >
                <option value="">-- Chọn khoảng giá --</option>
                {price.map((item, i) => (
                  <option key={i} value={`${item.min}-${item.max}`}>
                    {item.label}
                  </option>
                ))}
              </select>

              <button
                className={cx("reset")}
                onClick={() => {
                  const query = new URLSearchParams(params);
                  query.delete("price_min");
                  query.delete("price_max");
                  navigate(`/search?${query.toString()}`);
                }}
              >
                Đặt lại
              </button>
            </div>
          </div>

          <div className={cx("main")}>
            <div className={cx("result-count")}>
              Hiện có <strong>{product.length}</strong> sản phẩm
            </div>

            <div className={cx("sort-tabs")}>
              {[
                "Phổ biến",
                "Bán chạy",
                "Hàng mới",
                "Giá từ thấp đến cao",
                "Giá từ cao đến thấp",
              ].map((tab) => (
                <button
                  key={tab}
                  className={cx({ active: sort === tab })}
                  onClick={() => setSort(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className={cx("products")}>
              {product?.length > 0 ? (
                product.map((item, idx) => (
                  <Link
                    to={`/detail/${formatVietNamtoString(item.product_name)}/${
                      item.product_id
                    }`}
                    className={cx("product-card")}
                    key={idx}
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
                      alt={item.product_name}
                    />
                    <div className={cx("product-info")}>
                      <p className={cx("product-title")}>{item.product_name}</p>
                      <div className={cx("product-sale")}>
                        {item.product_sale > 0 && (
                          <p className={cx("product-price-sale")}>
                            {item.price.toLocaleString()}đ
                          </p>
                        )}
                        {item.product_sale > 0 && (
                          <span>
                            GIẢM{" "}
                            {Math.floor(
                              100 - (item.product_sale / item.price) * 100
                            )}
                            %
                          </span>
                        )}
                      </div>
                      <p className={cx("product-price")}>
                        {item.product_sale > 0
                          ? item.product_sale.toLocaleString()
                          : item.price.toLocaleString()}
                        đ
                      </p>
                      <div className={cx("product-rating")}>
                        ★★★★★ ({item.rating || 0})
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Không tìm thấy sản phẩm nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
