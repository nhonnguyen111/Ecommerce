import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductAdmin.module.scss";
import HomeAdmin from "../HomeAdmin";
import {
  apigetProductAll,
  apiupdateStatusProduct,
} from "../../../services/product";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewProduct from "./ViewProduct";
const baseURL = import.meta.env.VITE_SERVER_URL;

const cx = classNames.bind(styles);

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await apigetProductAll();
      if (res?.data?.err === 0) {
        setProducts(res.data.response);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách product:", err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleStatus = async (productId) => {
    const payload = {
      product_id: productId,
      product_status: 1,
    };
    try {
      const response = await apiupdateStatusProduct(payload);
      if (response.data?.err === 0) {
        toast.success("Duyệt sản phẩm thành công");
        fetchProducts();
      } else {
        toast.error("Duyệt sản phẩm thất bại!");
      }
    } catch (err) {
      toast.error("Duyệt sản phẩm thất bại!");
    }
  };
  const handleStatusTc = async (productId) => {
    const payload = {
      product_id: productId,
      product_status: 3,
    };
    try {
      const response = await apiupdateStatusProduct(payload);
      if (response.data?.err === 0) {
        toast.success("Duyệt sản phẩm thành công");
        fetchProducts();
      } else {
        toast.error("Duyệt sản phẩm thất bại!");
      }
    } catch (err) {
      toast.error("Duyệt sản phẩm thất bại!");
    }
  };
  const handleStatusRq = async (productId) => {
    const payload = {
      product_id: productId,
      product_status: 0,
    };
    try {
      const response = await apiupdateStatusProduct(payload);
      if (response.data?.err === 0) {
        toast.success("Duyệt sản phẩm thành công");
        fetchProducts();
      } else {
        toast.error("Duyệt sản phẩm thất bại!");
      }
    } catch (err) {
      toast.error("Duyệt sản phẩm thất bại!");
    }
  };
  return (
    <HomeAdmin>
      <div className={cx("wrapper")}>
        <div className={cx("tableWrapper")}>
          <table className={cx("productTable")}>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Mô tả</th>
                <th>Giá gốc</th>
                <th>Giá khuyến mãi</th>
                <th>Tồn kho</th>
                <th>Đã bán</th>
                <th>Mô tả minh chứng</th>
                <th>Ảnh minh chứng</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={i}>
                  <td>
                    <img
                      src={
                        baseURL +
                        (Array.isArray(product.product_image)
                          ? product.product_image[0]
                          : typeof product.product_image === "string" &&
                            product.product_image.includes("[")
                          ? JSON.parse(product.product_image)[0]
                          : product.product_image)
                      }
                      alt={product.product_name}
                      className={cx("productImage")}
                    />
                  </td>
                  <td>{product.product_name}</td>
                  <td>{product.product_description}</td>
                  <td>{product.price.toLocaleString("vi-VN")}đ</td>
                  {product.product_sale == 0 ? (
                    <td>{product.product_sale.toLocaleString("vi-VN")} </td>
                  ) : (
                    <td>{product.product_sale.toLocaleString("vi-VN")} đ</td>
                  )}
                  <td>{product.product_inventory}</td>
                  <td>{product.product_purchases}</td>
                  <td>{product.proofs?.proof_description}</td>
                  <td>
                    {(() => {
                      let images = [];

                      if (Array.isArray(product.proofs?.proof_image)) {
                        images = item.vote_image;
                      } else if (
                        typeof product.proofs?.proof_image === "string" &&
                        product.proofs?.proof_image.includes("[")
                      ) {
                        try {
                          images = JSON.parse(product.proofs?.proof_image);
                        } catch (e) {
                          images = [];
                        }
                      }

                      return images.map((img, index) => (
                        <img
                          style={{
                            width: "30px",
                            height: "30px",
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
                        active: product.product_status === 1,
                        inactive: product.product_status === 0,
                        reject: product.product_status === 3,
                      })}
                    >
                      {product.product_status === 1
                        ? "Hiển thị"
                        : product.product_status === 0
                        ? "Chưa duyệt"
                        : product.product_status === 2
                        ? "Tạm ẩn"
                        : "Từ chối"}
                    </span>
                  </td>
                  <td>
                    {product.product_status == 0 && (
                      <div>
                        <button
                          className={cx("btn", "view")}
                          onClick={() => setSelectedProduct(product)}
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => handleStatus(product.product_id)}
                          className={cx("btn", "edit")}
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => handleStatusTc(product.product_id)}
                          className={cx("btn", "delete")}
                        >
                          Từ chối
                        </button>
                      </div>
                    )}
                    {product.product_status == 1 && (
                      <div>
                        <button
                          className={cx("btn", "view")}
                          onClick={() => setSelectedProduct(product)}
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => handleStatusRq(product.product_id)}
                          className={cx("btn", "edit")}
                        >
                          Ẩn hiển thị
                        </button>
                      </div>
                    )}
                    {product.product_status == 3 && (
                      <div>
                        <button
                          className={cx("btn", "view")}
                          onClick={() => setSelectedProduct(product)}
                        >
                          Xem
                        </button>
                      </div>
                    )}
                    {product.product_status == 2 && (
                      <div>
                        <button
                          className={cx("btn", "view")}
                          onClick={() => setSelectedProduct(product)}
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => handleStatusRq(product.product_id)}
                          className={cx("btn", "edit")}
                        >
                          Ẩn hiển thị
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedProduct && (
        <ViewProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <ToastContainer />
    </HomeAdmin>
  );
};

export default ProductAdmin;
