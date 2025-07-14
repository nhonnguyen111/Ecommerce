import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ShopAdmin.module.scss";
import HomeAdmin from "../HomeAdmin";
import { apigetShopAdmin, apiupdateShopAdmin } from "../../../services/shop";
import ViewShop from "./ViewShop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);
const baseURL = import.meta.env.VITE_SERVER_URL;
const ShopAdmin = () => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  console.log(shops);
  const fetchShops = async () => {
    try {
      const res = await apigetShopAdmin();
      if (res?.data?.err === 0) {
        setShops(res.data.response);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách shop:", err);
    }
  };
  useEffect(() => {
    fetchShops();
  }, []);
  const handleStatus = async (shopId) => {
    const payload = {
      shop_id: shopId,
      shop_status: 1,
    };
    try {
      const response = await apiupdateShopAdmin(payload);
      if (response.data?.err === 0) {
        toast.success("Duyệt shop thành công");
        fetchShops();
      } else {
        toast.error("Duyệt shop thất bại!");
      }
    } catch (err) {
      toast.error("Duyệt shop thất bại!");
    }
  };
  const handleStatusHd = async (shopId) => {
    const payload = {
      shop_id: shopId,
      shop_status: 0,
    };
    try {
      const response = await apiupdateShopAdmin(payload);
      if (response.data?.err === 0) {
        toast.success("Duyệt shop thành công");
        fetchShops();
      } else {
        toast.error("Duyệt shop thất bại!");
      }
    } catch (err) {
      toast.error("Duyệt shop thất bại!");
    }
  };
  const handleStatusTc = async (shopId) => {
    const payload = {
      shop_id: shopId,
      shop_status: 3,
    };
    try {
      const response = await apiupdateShopAdmin(payload);
      if (response.data?.err === 0) {
        toast.success("Duyệt shop thành công");
        fetchShops();
      } else {
        toast.error("Duyệt shop thất bại!");
      }
    } catch (err) {
      toast.error("Duyệt shop thất bại!");
    }
  };
  return (
    <HomeAdmin>
      <div className={cx("wrapper")}>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Tên Shop</th>
              <th>Địa chỉ</th>
              <th>Mô tả</th>
              <th>Mô tả minh chứng</th>
              <th>Hình ảnh minh chứng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop, i) => (
              <tr key={i}>
                <td>
                  <div className={cx("shop-info")}>
                    <img
                      src={baseURL + shop.shop_image}
                      alt="shop"
                      className={cx("img")}
                    />
                    <div>
                      <p className={cx("shop-name")}>{shop.shop_name}</p>
                      <small>ID: {shop.shop_id}</small>
                    </div>
                  </div>
                </td>
                <td>{shop.address}</td>
                <td>{shop.shop_description}</td>
                <td>{shop.proofs?.proof_description}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  {(() => {
                    let images = [];

                    if (Array.isArray(shop.proofs?.proof_image)) {
                      images = item.vote_image;
                    } else if (
                      typeof shop.proofs?.proof_image === "string" &&
                      shop.proofs?.proof_image.includes("[")
                    ) {
                      try {
                        images = JSON.parse(shop.proofs?.proof_image);
                      } catch (e) {
                        images = [];
                      }
                    }

                    return images.map((img, index) => (
                      <img
                        style={{
                          width: "70px",
                          height: "70px",
                        }}
                        key={index}
                        src={baseURL + img}
                        alt={`vote-${index}`}
                      />
                    ));
                  })()}
                </td>
                <td>
                  <span
                    className={cx("status", {
                      approved: shop.shop_status === 1,
                      pending: shop.shop_status === 0,
                      refuse: shop.shop_status === 3,
                    })}
                  >
                    {shop.shop_status === 1
                      ? "Đã duyệt"
                      : shop.shop_status === 0
                      ? "Chờ duyệt"
                      : "Từ chối"}
                  </span>
                </td>
                <td>
                  {shop.shop_status === 0 && (
                    <div>
                      <button
                        className={cx("btn", "view")}
                        onClick={() => setSelectedShop(shop)}
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => handleStatus(shop.shop_id)}
                        className={cx("btn", "edit")}
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleStatusTc(shop.shop_id)}
                        className={cx("btn", "delete")}
                      >
                        {" "}
                        Từ chối
                      </button>
                    </div>
                  )}
                  {shop.shop_status === 1 && (
                    <div>
                      <button
                        className={cx("btn", "view")}
                        onClick={() => setSelectedShop(shop)}
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => handleStatusHd(shop.shop_id)}
                        className={cx("btn", "edit")}
                      >
                        Ngưng hđ
                      </button>
                    </div>
                  )}
                  {shop.shop_status === 3 && (
                    <div>
                      <button
                        className={cx("btn", "view")}
                        onClick={() => setSelectedShop(shop)}
                      >
                        Xem
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedShop && (
        <ViewShop shop={selectedShop} onClose={() => setSelectedShop(null)} />
      )}
      <ToastContainer />
    </HomeAdmin>
  );
};

export default ShopAdmin;
