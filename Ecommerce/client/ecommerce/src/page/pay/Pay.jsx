import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./Pay.module.scss";
import Header from "../Home/component/Header";
import Footer from "../Home/component/Footer";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalView from "./components/ModalView";
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL;

const Pay = () => {
  const [isAddress, setIsAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isPopup, setIsPopup] = useState(false);
  const [data, setData] = useState({
    username: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();
  const delivery = useSelector((state) => state.delivery.delivery);
  const province = useSelector((state) => state.province.province);
  const districts = useSelector((state) => state.province.districts);
  const ward = useSelector((state) => state.province.ward);
  const pay = useSelector((state) => state.pay.pay);
  const payCustomer = useSelector((state) => state.pay.payCustomer);
  const [requested, setRequested] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [address, setAddress] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const location = useLocation();
  const customerData = useSelector((state) => state.user.customerData);
  const { product, quantity } = location.state || {};
  const [orderItem, setOrderItem] = useState([]);
  const [note, setNote] = useState("");
  useEffect(() => {
    if (product && quantity) {
      setOrderItem([{ ...product, quantity }]);
    } else if (location.state.cart) {
      setOrderItem(location.state.cart);
    }
  }, [product, quantity]);

  console.log(customerData.customer_id);

  const dispatch = useDispatch();
  const handleOpenNewAddress = () => {
    setIsAddress((prev) => !prev);
  };
  useEffect(() => {
    dispatch(actions.getProvince());
    dispatch(actions.getDistricts());
    dispatch(actions.getWards());
    dispatch(actions.getDelivery());
  }, []);
  useEffect(() => {
    if (provinces) {
      const result = districts.filter(
        (district) => district.province_code === parseInt(provinces)
      );
      setFilteredDistricts(result);
    } else {
      setFilteredDistricts([]);
    }
  }, [provinces, districts]);
  useEffect(() => {
    if (selectedDistrict) {
      const result = ward.filter(
        (item) => item.district_code === parseInt(selectedDistrict)
      );
      setFilteredWards(result);
    } else {
      setFilteredWards([]);
    }
  }, [selectedDistrict, ward]);
  useEffect(() => {
    const provinceName =
      province.find((p) => p.code === parseInt(provinces))?.name || "";
    const districtName =
      districts.find((d) => d.code === parseInt(selectedDistrict))?.name || "";
    const wardName =
      ward.find((w) => w.code === parseInt(selectedWard))?.name || "";

    const fullAddress = `${address}, ${wardName}, ${districtName}, ${provinceName}`;
    setData((prev) => ({ ...prev, address: fullAddress }));
  }, [provinces, selectedDistrict, selectedWard, address]);

  useEffect(() => {
    if (delivery && delivery.length > 0 && !selectedAddress) {
      setSelectedAddress(delivery[0]);
    }
  }, [delivery, selectedAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCreateDelivery = async () => {
    try {
      const response = await dispatch(actions.createDelivery(data));
      if (response?.data?.err === 0) {
        toast.success("Thêm địa chỉ giao hàng thành công");
        dispatch(actions.getDelivery());
        setIsAddress(false);
      } else {
        toast.error("Thêm địa chỉ giao hàng thất bại");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tạo địa chỉ");
      console.error(error);
    }
  };
  const handleOpenPopup = () => {
    setIsPopup(true);
  };
  const totalPrice = orderItem.reduce((sum, item) => {
    return (
      sum +
      (item.product_sale > 0 ? item.product_sale : item.price || 0) *
        (item.quantity || 1)
    );
  }, 0);
  const handleOrder = async () => {
    try {
      const content = "Bạn đã đặt hàng thành công";
      if (!selectedMethod) {
        toast.error("Vui lòng chọn phương thức thanh toán");
        return;
      }
      if (selectedMethod === "cod") {
        const groupedByShop = orderItem.reduce((groups, item) => {
          const shopId = item.shops?.shop_id || "unknown";
          if (!groups[shopId]) groups[shopId] = [];
          groups[shopId].push(item);
          return groups;
        }, {});

        // Lặp từng shop tạo đơn hàng riêng biệt
        for (const [shopId, items] of Object.entries(groupedByShop)) {
          // Tính tổng tiền đơn hàng của shop này
          const orderTotal = items.reduce((total, item) => {
            const price =
              item.product_sale > 0 ? item.product_sale : item.price;
            return total + price * item.quantity;
          }, 0);

          const payload = {
            order_date: new Date().toISOString(),
            order_total: orderTotal,
            shop_id: shopId,
            delivery_id: selectedAddress?.delivery_id,
            note: note || "",
            products: items.map((item) => ({
              product_id: item.product_id,
              product_qty: item.quantity,
              product_price:
                item.product_sale > 0 ? item.product_sale : item.price,
              unit: item.unit,
              total_price:
                (item.product_sale > 0 ? item.product_sale : item.price) *
                item.quantity,
            })),
          };

          const response = await dispatch(actions.CreateOrder(payload));
          await dispatch(
            actions.createNotification({
              customer_id: customerData.customer_id,
              noti_content: content,
            })
          );
          if (response?.data?.err !== 0) {
            toast.error(`Đặt hàng thất bại với shop ${shopId}`);
            return;
          }
        }

        toast.success("Đặt hàng thành công!");

        const orderedProductIds = orderItem.map((item) => item.product_id);

        dispatch(actions.removeMultipleItemsCart(orderedProductIds));
        setTimeout(() => {
          navigate("/member/orders");
        }, 1000);
      } else {
        const groupedByShop = orderItem.reduce((groups, item) => {
          const shopId = item.shops?.shop_id || "unknown";
          if (!groups[shopId]) groups[shopId] = [];
          groups[shopId].push(item);
          return groups;
        }, {});

        for (const [shopId, items] of Object.entries(groupedByShop)) {
          const orderTotal = items.reduce((total, item) => {
            const price =
              item.product_sale > 0 ? item.product_sale : item.price;
            return total + price * item.quantity;
          }, 0);

          const payload = {
            order_date: new Date().toISOString(),
            order_total: orderTotal,
            shop_id: shopId,
            delivery_id: selectedAddress?.delivery_id,
            note: note || "",
            products: items.map((item) => ({
              product_id: item.product_id,
              product_qty: item.quantity,
              product_price:
                item.product_sale > 0 ? item.product_sale : item.price,
              unit: item.unit,
              total_price:
                (item.product_sale > 0 ? item.product_sale : item.price) *
                item.quantity,
            })),
          };

          const response = await dispatch(actions.CreateOrder(payload));
          await dispatch(actions.createPayment(orderTotal));
          await dispatch(
            actions.createNotification({
              customer_id: customerData.customer_id,
              noti_content: content,
            })
          );
          setRequested(true);

          if (response?.data?.err !== 0) {
            toast.error(`Đặt hàng thất bại với shop ${shopId}`);
            return;
          }
        }

        toast.success("Đặt hàng thành công!");
        const orderedProductIds = orderItem.map((item) => item.product_id);

        dispatch(actions.removeMultipleItemsCart(orderedProductIds));
        setTimeout(() => {
          navigate("/member/orders");
        }, 1000);
      }
    } catch (error) {
      toast.error("Lỗi đặt hàng: " + error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (
      requested &&
      pay?.payUrl &&
      pay?.orderId &&
      pay?.amount &&
      pay?.partnerCode
    ) {
      window.location.href = pay.payUrl;

      const newPayload = {
        orderId: pay.orderId,
        customer_id: customerData.customer_id,
        amount: pay.amount,
        urlPay: pay.payUrl,
        methodPay: pay.partnerCode,
        statusCode: 0,
      };

      dispatch(actions.createPaymentUser(newPayload));
      setRequested(false);
    }
  }, [pay, requested, dispatch, customerData]);
  return (
    <div>
      <Header />
      <div className={cx("checkout-container")}>
        <div className={cx("section")}>
          <h3 className={cx("section-title")}>Chọn địa chỉ có sẵn</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              color: "#049645",
              cursor: "pointer",
            }}
            onClick={handleOpenPopup}
          >
            Chỉnh sửa
          </div>
          <div className={cx("address")}>
            <div className={cx("delivery")}>
              <h4>Người nhận: {selectedAddress?.username || "Chưa chọn"}</h4>
              <p>Địa chỉ: {selectedAddress?.address || "Chưa chọn"}</p>
              <p>Số điện thoại: {selectedAddress?.phone || "Chưa chọn"}</p>
            </div>
          </div>
          <div onClick={handleOpenNewAddress} className={cx("add-address")}>
            <PlusOutlined /> Thêm địa chỉ mới
          </div>
          <div className={cx("new-address-container", { show: isAddress })}>
            <h3 className={cx("section-title")}>Sử dụng địa chỉ mới</h3>
            <div className={cx("form-group")}>
              <input
                type="text"
                name="username"
                placeholder="Tên người nhận"
                className={cx("input")}
                value={data.username}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại di động"
                className={cx("input")}
                value={data.phone}
                onChange={handleChange}
              />
            </div>
            <div className={cx("form-group")}>
              <label>Khu vực nhận (*)</label>
              <div className={cx("map-box")}>
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    data.address
                  )}&output=embed`}
                  width="700"
                  height="250"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className={cx("form-group")}>
              <select
                className={cx("select")}
                value={provinces}
                onChange={(e) => setProvinces(e.target.value)}
              >
                <option value="all">Thành phố/Tỉnh</option>
                {province.length > 0 &&
                  province.map((item, i) => (
                    <option key={i} value={item.code}>
                      {item.name}
                    </option>
                  ))}
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className={cx("select")}
              >
                <option value="">Quận/Huyện</option>
                {filteredDistricts.length > 0 &&
                  filteredDistricts.map((district, i) => (
                    <option key={i} value={district.code}>
                      {district.name}
                    </option>
                  ))}
              </select>

              <select
                className={cx("select")}
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
              >
                <option value="">Phường/Xã</option>
                {filteredWards.length > 0 &&
                  filteredWards.map((item, i) => (
                    <option key={i} value={item.code}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Địa chỉ chi tiết"
              className={cx("input")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              onClick={handleCreateDelivery}
              className={cx("submit-button")}
            >
              Lưu địa chỉ giao hàng
            </button>
          </div>
          <div className={cx("section-delivery")}>
            <h3 className={cx("section-title")}>Phương thức vận chuyển</h3>
            <div className={cx("shipping-method")}>Vận chuyển Tiêu chuẩn</div>
          </div>
        </div>
        <div className={cx("section")}>
          <div className={cx("section-product")}>
            {orderItem.map((item, i) => (
              <div key={i} className={cx("product-item")}>
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
                  alt="product"
                  className={cx("product-image")}
                />
                <div className={cx("product-info")}>
                  <p>{item.product_name}</p>
                  <span>Số lượng: {item.quantity}</span>
                  <span>
                    Giá:{" "}
                    {item.product_sale > 0
                      ? item.product_sale?.toLocaleString("vi-VN")
                      : item.price?.toLocaleString("vi-VN")}
                    đ
                  </span>
                </div>
              </div>
            ))}

            <div className={cx("note-box")}>
              <label>Ghi chú của người mua:</label>
              <textarea
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Mô tả vị trí giao chi tiết hoặc điều đặc biệt"
              />
            </div>
          </div>

          <div className={cx("section", "order-summary")}>
            <div className={cx("summary-row")}>
              <span>Tạm tính:</span>
              <span>{totalPrice.toLocaleString("vi", "VN")} đ</span>
            </div>
            <div className={cx("summary-row")}>
              <span>Phí vận chuyển:</span>
              <span>0đ</span>
            </div>
            <div className={cx("summary-total")}>
              <span>Tổng tiền:</span>
              <span>{totalPrice.toLocaleString("vi", "VN")} đ</span>
            </div>

            <div className={cx("payment-method")}>
              <p>Phương thức thanh toán:</p>
              <div className={cx("payment-options")}>
                <label
                  className={cx("payment-option-card", {
                    selected: selectedMethod === "cod",
                  })}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    onChange={() => setSelectedMethod("cod")}
                    checked={selectedMethod === "cod"}
                  />
                  Thanh toán khi nhận hàng
                </label>
                <label
                  className={cx("payment-option-card", {
                    selected: selectedMethod === "bank",
                  })}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    onChange={() => setSelectedMethod("bank")}
                    checked={selectedMethod === "bank"}
                  />
                  Chuyển khoản ngân hàng
                </label>
              </div>
            </div>

            <button onClick={handleOrder} className={cx("submit-button")}>
              Gửi đơn đặt hàng
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {isPopup && (
        <ModalView
          data={delivery}
          onClose={() => setIsPopup(false)}
          onSelect={(item) => setSelectedAddress(item)}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Pay;
