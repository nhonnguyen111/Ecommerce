import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./OrderTab.module.scss";
import * as action from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatVietNamtoString } from "../../../ultils/contanst";
import ModalView from "./ModalView";
import ModalRating from "./ModalRating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseURL = import.meta.env.VITE_SERVER_URL;

const cx = classNames.bind(styles);

const TABS = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xác nhận" },
  { key: "shipping", label: "Đang giao hàng" },
  { key: "delivered", label: "Đã hoàn thành" },
  { key: "canceled", label: "Đã huỷ" },
];

const getStatusText = (status) => {
  switch (status) {
    case "all":
      return "Tất cả";
    case 0:
      return "Chờ xác nhận";
    case 1:
      return "Đang giao hàng";
    case 2:
      return "Đã hoàn thành";
    case 3:
      return "Đã huỷ";
    default:
      return "Không xác định";
  }
};

const OrderTab = () => {
  const orders = useSelector((state) => state.order.order) || [];
  const vote = useSelector((state) => state.vote.vote);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [orderDetailsMap, setOrderDetailsMap] = useState({});
  const [isPopup, setIsPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  console.log(vote);

  useEffect(() => {
    dispatch(action.getOrderCustomer());
    dispatch(action.getVote());
  }, []);
  const toggleExpand = async (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders((prev) => prev.filter((id) => id !== orderId));
    } else {
      setExpandedOrders((prev) => [...prev, orderId]);
      if (!orderDetailsMap[orderId]) {
        const res = await dispatch(action.getOrderDetail({ id: orderId }));
        if (res?.data.err === 0) {
          setOrderDetailsMap((prev) => ({
            ...prev,
            [orderId]: res.data.response,
          }));
        }
      }
    }
  };

  const filteredOrders = orders.filter((order) => {
    switch (activeTab) {
      case "pending":
        return order.order_status === 0;
      case "shipping":
        return order.order_status === 1;
      case "delivered":
        return order.order_status === 2;
      case "canceled":
        return order.order_status === 3;
      default:
        return true;
    }
  });

  const groupedByShop = filteredOrders.reduce((acc, order) => {
    const shopId = order.shop_id;
    if (!acc[shopId]) {
      acc[shopId] = {
        shopInfo: order.shops,
        orders: [],
      };
    }
    acc[shopId].orders.push(order);
    return acc;
  }, {});
  console.log(dataModal);

  const renderTabContent = () => {
    const shopIds = Object.keys(groupedByShop);
    if (shopIds.length === 0) {
      return <p className={cx("empty-message")}>Không có đơn hàng nào</p>;
    }
    const formatText = (text) => {
      if (!text) return "";
      if (text.length <= 10) return text;
      return `${text.slice(0, 4)}...${text.slice(-4)}`;
    };
    const handleCancelOrder = async (orderId) => {
      setSelectedOrderId(orderId);
      setIsPopup(true);
    };
    const handleRatingOrder = async (orderId) => {
      if (!orderDetailsMap[orderId]) {
        const res = await dispatch(action.getOrderDetail({ id: orderId }));
        if (res?.data.err === 0) {
          setOrderDetailsMap((prev) => ({
            ...prev,
            [orderId]: res.data.response,
          }));
          setDataModal(res.data.response);
        } else {
          toast.error("Lấy chi tiết đơn hàng thất bại!");
          return;
        }
      } else {
        setDataModal(orderDetailsMap[orderId]);
      }

      setShowModal(true);
    };

    return (
      <div>
        {shopIds.map((shopId) => {
          const group = groupedByShop[shopId];

          return group.orders.map((order) => (
            <div className={cx("order-card")} key={order.order_id}>
              <div className={cx("order-header")}>
                <div className={cx("shop-info")}>
                  <h3>#{formatText(order.order_id)}</h3>
                  <div className={cx("shop")}>
                    <img
                      src={
                        baseURL +
                        (Array.isArray(group.shopInfo?.shop_image)
                          ? group.shopInfo?.shop_image[0]
                          : typeof group.shopInfo?.shop_image === "string" &&
                            group.shopInfo?.shop_image.includes("[")
                          ? JSON.parse(group.shopInfo?.shop_image)[0]
                          : group.shopInfo?.shop_image)
                      }
                      className={cx("shop-image")}
                    />
                    <Link
                      to={`/store/${group.shopInfo?.shop_id}`}
                      className={cx("shop-name")}
                    >
                      {group.shopInfo?.shop_name}
                    </Link>
                  </div>
                </div>
                <span className={cx("order-status")}>
                  {getStatusText(order.order_status)}
                </span>
              </div>

              <div className={cx("order-body")}>
                {expandedOrders.includes(order.order_id) && (
                  <div className={cx("order-body")}>
                    {(orderDetailsMap[order.order_id] || []).map(
                      (item, idx) => (
                        <div className={cx("product-item")} key={idx}>
                          <img
                            className={cx("product-image")}
                            src={
                              baseURL +
                              (Array.isArray(item.products?.product_image)
                                ? item.products?.product_image[0]
                                : typeof item.products?.product_image ===
                                    "string" &&
                                  item.products?.product_image.includes("[")
                                ? JSON.parse(item.products?.product_image)[0]
                                : item.products?.product_image)
                            }
                          />
                          <div className={cx("product-info")}>
                            <div
                              className={cx("product-name")}
                              onClick={() =>
                                navigate(
                                  `/detail/${formatVietNamtoString(
                                    item.products?.product_name
                                  )}/${item.products?.product_id}`
                                )
                              }
                            >
                              {item.products?.product_name}
                            </div>
                            <div className={cx("product-meta")}>
                              Số lượng: {item.product_qty} | Giá:{" "}
                              {item.product_price.toLocaleString("vi-VN")} đ |
                              Đơn vị tính: {item.unit}
                            </div>
                          </div>
                          <div className={cx("product-meta")}>
                            Thành tiền:
                            <br />
                            {item.total_price.toLocaleString("vi-VN")} đ
                          </div>
                        </div>
                      )
                    )}
                    <div className={cx("delivery-info")}>
                      <p>
                        <strong>Người nhận:</strong> {order.deliverys?.username}
                      </p>
                      <p>
                        <strong>SĐT:</strong> {order.deliverys?.phone}
                      </p>
                      <p>
                        <strong>Địa chỉ giao hàng:</strong>{" "}
                        {order.deliverys?.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className={cx("order-footer")}>
                <div className={cx("order-total")}>
                  Tổng cộng: {order.order_total.toLocaleString("vi-VN")} đ
                </div>
                <div className={cx("order-total")}>
                  Ngày đặt: {new Date(order.order_date).toLocaleString()}
                </div>
                {order.order_status === 2 && (
                  <div className={cx("order-total")}>
                    Đến nơi: {new Date(order.updatedAt).toLocaleString()}
                  </div>
                )}
                {order.order_status === 3 && (
                  <div className={cx("order-total")}>
                    Ngày hủy: {new Date(order.updatedAt).toLocaleString()}
                  </div>
                )}
                <div className={cx("btn-order")}>
                  {order.order_status == 0 && (
                    <button
                      className={cx("cancel-button")}
                      onClick={() =>
                        handleCancelOrder(order.order_id, order.shops.shop_id)
                      }
                    >
                      Huỷ đơn hàng
                    </button>
                  )}
                  {order.order_status === 2 &&
                    !vote.some((item) => item.order_id === order.order_id) && (
                      <button
                        className={cx("cmt-button")}
                        onClick={() => handleRatingOrder(order.order_id)}
                      >
                        Đánh giá sản phẩm
                      </button>
                    )}

                  <div className={cx("order-actions")}>
                    <button onClick={() => toggleExpand(order.order_id)}>
                      {expandedOrders.includes(order.order_id)
                        ? "Ẩn chi tiết"
                        : "Xem chi tiết"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ));
        })}
      </div>
    );
  };

  return (
    <div>
      <div className={cx("tabs-container")}>
        <div className={cx("tab-list")}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={cx("tab-item", { active: activeTab === tab.key })}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={cx("tab-content")}>{renderTabContent()}</div>
      </div>
      {isPopup && (
        <ModalView onClose={() => setIsPopup(false)} data={selectedOrderId} />
      )}
      {showModal && (
        <ModalRating
          onClose={() => {
            setShowModal(false);
            window.location.reload();
          }}
          data={dataModal}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default OrderTab;
