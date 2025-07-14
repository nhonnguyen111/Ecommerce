import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Header from "../Home/component/Header";
import Footer from "../Home/component/Footer";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.scss";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseURL = import.meta.env.VITE_SERVER_URL;

const cx = classNames.bind(styles);

const CartPage = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getCart());
  }, []);
  console.log(cartItems);

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.product_id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleChangeQuantity = (product_id, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({
      ...prev,
      [product_id]: newQuantity,
    }));
    dispatch(actions.eidtItemCart(product_id, newQuantity));
  };

  const handleCheckboxChange = (e, productId) => {
    if (e.target.checked) {
      setCheckedItems((prev) => [...prev, productId]);
    } else {
      setCheckedItems((prev) => prev.filter((id) => id !== productId));
    }
  };
  const handleDeleteAll = () => {
    dispatch(actions.removeMultipleItemsCart(checkedItems));
    toast.success("Xóa tất cả sản phẩm trong giỏ hàng thành công!");

    setCheckedItems([]);
  };
  const handleDelete = (productId) => {
    dispatch(actions.removeItemCart(productId));
    toast.success("Xóa sản phẩm trong giỏ hàng thành công!");
  };
  const totalPrice = cartItems.reduce((total, item) => {
    if (!checkedItems.includes(item.product_id)) return total;
    const price = item.product_sale > 0 ? item.product_sale : item.price;
    return total + price * item.quantity;
  }, 0);

  const groupedCartItems = cartItems.reduce((groups, item) => {
    const shopId = item.shops?.shop_id || "unknown";
    if (!groups[shopId]) {
      groups[shopId] = {
        shopInfo: {
          shop_name: item.shops?.shop_name || "Không rõ",
        },
        items: [],
      };
    }
    groups[shopId].items.push(item);
    return groups;
  }, {});

  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <div className={cx("cart-container")}>
          {cartItems.length === 0 ? (
            <div className={cx("empty-cart")}>
              <p>🛒 Giỏ hàng chưa có sản phẩm nào</p>
              <Link className={cx("btn-home")} to={"/"}>
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <>
              <div className={cx("cart-header")}>
                <span>Sản Phẩm</span>
                <span>Đơn Giá</span>
                <span>Số Lượng</span>
                <span>Số Tiền</span>
                <span>Thao Tác</span>
              </div>

              {Object.entries(groupedCartItems).map(([shopId, group]) => (
                <div key={shopId} className={cx("cart-shop")}>
                  <div className={cx("shop-info")}>
                    <p className={cx("shop-name")}>
                      {group.shopInfo?.shop_name || "Đang cập nhật"}
                    </p>
                  </div>

                  {group.items.map((item, i) => (
                    <div key={i} className={cx("cart-item")}>
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(item.product_id)}
                        onChange={(e) =>
                          handleCheckboxChange(e, item.product_id)
                        }
                      />

                      <img
                        src={
                          item.product_image
                            ? baseURL +
                              (Array.isArray(item.product_image)
                                ? item.product_image[0]
                                : typeof item.product_image === "string" &&
                                  item.product_image.includes("[")
                                ? JSON.parse(item.product_image)[0]
                                : item.product_image)
                            : item.product_image
                        }
                        alt="product"
                      />

                      <div className={cx("item-details")}>
                        <div className={cx("title")}>{item.product_name}</div>
                      </div>

                      <div className={cx("price")}>
                        {item.product_sale > 0 && (
                          <span className={cx("old-price")}>
                            {item.price.toLocaleString("vi-VN")} đ
                          </span>
                        )}
                        <span className={cx("new-price")}>
                          {item.product_sale > 0
                            ? item.product_sale.toLocaleString("vi-VN")
                            : item.price.toLocaleString("vi-VN")}
                          đ
                        </span>
                      </div>

                      <div className={cx("quantity")}>
                        <button
                          disabled={quantities[item.product_id] <= 1}
                          onClick={() =>
                            handleChangeQuantity(
                              item.product_id,
                              quantities[item.product_id] - 1
                            )
                          }
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={quantities[item.product_id] || 1}
                          onChange={(e) =>
                            handleChangeQuantity(
                              item.product_id,
                              parseInt(e.target.value)
                            )
                          }
                          style={{ borderRadius: "0px" }}
                          disabled
                        />
                        <button
                          onClick={() =>
                            handleChangeQuantity(
                              item.product_id,
                              quantities[item.product_id] + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className={cx("total-price")}>
                        {(item.product_sale > 0
                          ? item.product_sale * item.quantity
                          : item.price * item.quantity
                        ).toLocaleString("vi-VN")}{" "}
                        đ
                      </div>

                      <div className={cx("actions")}>
                        <span className={cx("delete")}>
                          <DeleteOutlined
                            title="Xóa sản phẩm"
                            onClick={() => handleDelete(item.product_id)}
                            className={cx("btn-delete")}
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
        <div className={cx("total-pay")}>
          <p>Tạm tính: {totalPrice.toLocaleString("vi-VN")}đ</p>
          <p>Tổng tiền: {totalPrice.toLocaleString("vi-VN")}đ</p>
          <button
            onClick={() => {
              const selectedItems = cartItems.filter((item) =>
                checkedItems.includes(item.product_id)
              );
              if (selectedItems.length === 0) {
                toast.error(
                  "Vui lòng chọn ít nhất một sản phẩm để thanh toán!"
                );
                return;
              }
              navigate("/pay", { state: { cart: selectedItems } });
            }}
          >
            Thanh toán
          </button>
        </div>
      </div>

      {checkedItems.length > 0 && (
        <div className={cx("delete-all")}>
          <button className={cx("btn-deleall")} onClick={handleDeleteAll}>
            <DeleteOutlined />
            Xóa {`(${checkedItems.length})`}
          </button>
        </div>
      )}
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default CartPage;
