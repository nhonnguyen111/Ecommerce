import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./OrderShop.module.scss";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../../store/actions";
import ViewModal from "./components/ViewModal";
import {
  CheckCircleOutlined,
  EyeOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseURL = import.meta.env.VITE_SERVER_URL;

const cx = classNames.bind(styles);

const TABS = [
  { key: "all", label: "Tất cả" },
  { key: 0, label: "Chờ xác nhận" },
  { key: 1, label: "Đang giao hàng" },
  { key: 2, label: "Đã giao hàng" },
  { key: 3, label: "Đã hủy" },
];

const getOrderStatusText = (status) => {
  switch (status) {
    case 0:
      return "Chờ xác nhận";
    case 1:
      return "Đang giao hàng";
    case 2:
      return "Đã giao hàng";
    case 3:
      return "Đã hủy";
    default:
      return "Không rõ";
  }
};

const OrderShop = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { shop_id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.order);
  const [isPopup, setIsPopup] = useState(false);
  const [value, setValue] = useState("");
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [orderDetailsMap, setOrderDetailsMap] = useState({});
  useEffect(() => {
    dispatch(action.getOrderShop({ id: shop_id }));
  }, [shop_id]);
  console.log(order);

  const toggleExpand = async (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders((prev) => prev.filter((id) => id !== orderId));
    } else {
      setExpandedOrders((prev) => [...prev, orderId]);
      if (!orderDetailsMap[orderId]) {
        const res = await dispatch(action.getOrderDetail({ id: orderId }));
        if (res?.data?.err === 0) {
          setOrderDetailsMap((prev) => ({
            ...prev,
            [orderId]: res.data.response,
          }));
        }
      }
    }
  };

  const filteredOrders = order.filter((item) =>
    activeTab === "all" ? true : item.order_status === activeTab
  );
  const handleUpdateStatus = async (orderId, currentStatus, customerId) => {
    let newStatus;
    let content = "";
    if (currentStatus === 0) {
      newStatus = 1;
      content = "Đơn hàng của bạn đã được xác nhận thành công";
    } else if (currentStatus === 1) {
      newStatus = 2;
      content = "Đơn hàng của bạn đã được vận chuyển thành công";
    } else {
      toast.info("Trạng thái hiện tại không thể cập nhật");
      return;
    }

    try {
      const response = await dispatch(
        action.updateOrderShop({ id: orderId, order_status: newStatus })
      );
      await dispatch(
        action.createNotification({
          customer_id: customerId,
          noti_content: content,
        })
      );
      if (response?.data?.err === 0) {
        toast.success("Cập nhật trạng thái đơn hàng thành công");
        dispatch(action.getOrderShop({ id: shop_id }));
      } else {
        toast.error("Cập nhật trạng thái thất bại");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };
  const handleRejectOrder = async (orderId, currentStatus) => {
    setIsPopup(true);
    setValue(orderId, currentStatus);
  };

  return (
    <Sidebar>
      <div className={cx("wrapper")}>
        <div className={cx("tabs")}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={cx("tab", { active: activeTab === tab.key })}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <table className={cx("order-table")}>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Người đặt</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Địa chỉ</th>
              <th>Ghi chú</th>
              {activeTab === 3 && <th>Lý do hủy</th>}

              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((item) => (
              <React.Fragment key={item.order_id}>
                <tr>
                  <td>{item.order_id}</td>
                  <td>{item.deliverys?.username}</td>
                  <td>{new Date(item.order_date).toLocaleString("vi-VN")}</td>
                  <td>{item.order_total.toLocaleString("vi-VN")} đ</td>
                  <td>
                    <span
                      className={cx("badge", `status-${item.order_status}`)}
                    >
                      {getOrderStatusText(item.order_status)}
                    </span>
                  </td>
                  <td>{item.deliverys?.address}</td>
                  <td>{item.note || "Không có"}</td>
                  {activeTab == 3 && item.order_status === 3 && (
                    <td>{item.cancel || "Không có"}</td>
                  )}

                  <td>
                    <EyeOutlined
                      className={cx("action-icon-eye")}
                      onClick={() => toggleExpand(item.order_id)}
                      style={{
                        cursor: "pointer",
                        transform: expandedOrders.includes(item.order_id)
                          ? "rotate(180deg)"
                          : "none",
                        transition: "0.3s",
                      }}
                    />
                    {item.order_status !== 2 && item.order_status !== 3 && (
                      <>
                        <CheckCircleOutlined
                          onClick={() =>
                            handleUpdateStatus(
                              item.order_id,
                              item.order_status,
                              item.customer_id
                            )
                          }
                          className={cx("action-icon-check")}
                        />
                      </>
                    )}
                    {item.order_status == 0 && (
                      <>
                        <WarningOutlined
                          onClick={() =>
                            handleRejectOrder(item.order_id, item.order_status)
                          }
                          className={cx("action-icon-delete", "delete")}
                        />
                      </>
                    )}
                  </td>
                </tr>

                {expandedOrders.includes(item.order_id) && (
                  <tr>
                    <td colSpan={activeTab === 3 ? 9 : 8}>
                      {orderDetailsMap[item.order_id]?.length > 0 ? (
                        <table className={cx("order-detail-table")}>
                          <thead>
                            <tr>
                              <th>Ảnh</th>
                              <th>Tên sản phẩm</th>
                              <th>Đơn giá</th>
                              <th>Số lượng</th>
                              <th>Đơn vị tính</th>
                              <th>Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderDetailsMap[item.order_id].map((detail) => (
                              <tr key={detail.order_detail_id}>
                                <td>
                                  <img
                                    src={
                                      baseURL +
                                      (Array.isArray(
                                        detail.products?.product_image
                                      )
                                        ? detail.products?.product_image[0]
                                        : typeof detail.products
                                            ?.product_image === "string" &&
                                          detail.products?.product_image.includes(
                                            "["
                                          )
                                        ? JSON.parse(
                                            detail.products?.product_image
                                          )[0]
                                        : detail.products?.product_image)
                                    }
                                    alt={detail.products.product_name}
                                    width="50"
                                  />
                                </td>
                                <td>{detail.products.product_name}</td>
                                <td>
                                  {detail.product_price.toLocaleString("vi-VN")}{" "}
                                  đ
                                </td>
                                <td>{detail.product_qty}</td>
                                <td>{detail.unit}</td>
                                <td>
                                  {detail.total_price.toLocaleString("vi-VN")} đ
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>Không có sản phẩm trong đơn</p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {isPopup && <ViewModal data={value} onClose={() => setIsPopup(false)} />}
      <ToastContainer />
    </Sidebar>
  );
};

export default OrderShop;
