import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/actions";

import classNames from "classnames/bind";
import styles from "./ProductSell.module.scss";
import { Link } from "react-router-dom";
import { formatVietNamtoString } from "../../../ultils/contanst";
const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL;
const ProductNew = () => {
  const newproduct = useSelector((state) => state.product.newproduct);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getProductNew());
  }, []);
  return (
    <div>
      <div className={cx("product-list")}>
        {newproduct.length > 0 &&
          newproduct.map((item, index) => {
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
                  <h3 className={cx("product-title")}>{item.product_name}</h3>
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
  );
};

export default ProductNew;
