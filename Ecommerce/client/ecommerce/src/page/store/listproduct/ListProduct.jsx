import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/actions";
import styles from "./ListProduct.module.scss";
import ModalProof from "../components/ModalProof";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import ModalView from "./components/ModalView";
import { toast, ToastContainer } from "react-toastify";
const baseURL = import.meta.env.VITE_SERVER_URL;

const cx = classNames.bind(styles);

const ListProduct = () => {
  const { shop_id } = useParams();
  const product = useSelector((state) => state.product.product);
  const category = useSelector((state) => state.app.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopup, setIsPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");

  const productsPerPage = 10;

  useEffect(() => {
    dispatch(actions.getProductByShop({ id: shop_id }));
    dispatch(actions.getCategorys());
  }, [shop_id]);
  const handleSearch = () => {
    const data = {
      keyword: filterKeyword,
      category_id: filterCategory !== "all" ? filterCategory : null,
      product_status: filterStatus !== "all" ? filterStatus : null,
      shop_id: shop_id,
    };

    if (filterPrice !== "all" && filterPrice !== "") {
      const [min, max] = filterPrice.split("-");
      data.price_min = min;
      data.price_max = max;
    }

    dispatch(actions.getProductShopQuery(data));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(product.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleViewProof = (data) => {
    setData(data);
    setIsPopup(true);
  };
  const handleEdit = (item) => {
    setProducts(item);
    setIsOpen(true);
  };
  const handleHide = async (productId) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn ẩn sản phẩm này không?"
    );
    if (!isConfirmed) return;

    try {
      const response = await dispatch(
        actions.hideProduct({ product_id: productId, product_status: 2 })
      );

      if (response?.data?.err === 0) {
        dispatch(actions.getProductByShop({ id: shop_id }));
        toast.success("Ẩn sản phẩm thành công");
      } else {
        toast.error(response?.data?.msg || "Ẩn sản phẩm thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi ở hệ thống");
    }
  };
  const handleShow = async (productId) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn bỏ ẩn sản phẩm này không?"
    );
    if (!isConfirmed) return;

    try {
      const response = await dispatch(
        actions.hideProduct({ product_id: productId, product_status: 1 })
      );

      if (response?.data?.err === 0) {
        dispatch(actions.getProductByShop({ id: shop_id }));
        toast.success("Hiện sản phẩm thành công");
      } else {
        toast.error(response?.data?.msg || "Hiện sản phẩm thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi ở hệ thống");
    }
  };

  const price = [
    { label: "Dưới 10 nghìn", min: 0, max: 10000 },
    { label: "10 - 100 nghìn", min: 10000, max: 100000 },
    { label: "100 - 200 nghìn", min: 100000, max: 200000 },
    { label: "Trên 200 nghìn", min: 200000, max: 999999999 },
  ];
  return (
    <Sidebar>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <button
            className={cx("addBtn")}
            onClick={() => navigate(`/home/product/create-product/${shop_id}`)}
          >
            + Thêm sản phẩm
          </button>
        </div>
        <div className={cx("filter-bar")}>
          <input
            type="text"
            value={filterKeyword}
            placeholder="🔍 Tìm theo tên sản phẩm..."
            className={cx("filter-input")}
            onChange={(e) => setFilterKeyword(e.target.value)}
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={cx("filter-select")}
          >
            <option value="all">Tất cả danh mục</option>
            {category.length > 0 &&
              category.map((item, i) => {
                return (
                  <option key={i} value={item.category_id}>
                    {item.category_name}
                  </option>
                );
              })}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={cx("filter-select")}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="1">✅ Đã duyệt</option>
            <option value="0">⏳ Chưa duyệt</option>
          </select>

          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className={cx("filter-select")}
          >
            <option value="all">-- Chọn khoảng giá --</option>
            {price.map((item, i) => (
              <option key={i} value={`${item.min}-${item.max}`}>
                {item.label}
              </option>
            ))}
          </select>

          <button className={cx("btn-search")} onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>

        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Ảnh</th>
              <th>Danh mục</th>
              <th>Mô tả</th>
              <th>Giá bán</th>
              <th>Giá khuyến mãi</th>
              <th>Tồn kho</th>
              <th>Đơn vị tính</th>
              <th>Đã bán</th>
              <th>Xác thực</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((item, index) => (
              <tr key={index}>
                <td className={cx("productName")}>
                  <span>{item.product_id}</span>
                </td>
                <td>{item.product_name}</td>
                <td>
                  <img
                    src={
                      baseURL +
                      (Array.isArray(item.product_image)
                        ? item.product_image[0]
                        : JSON.parse(item.product_image)[0])
                    }
                    alt="product"
                    className={cx("image")}
                  />
                </td>
                <td>{item.categories?.category_name}</td>
                <td className={cx("descriptionCell")}>
                  <div className={cx("descriptionWrapper")}>
                    <EyeOutlined className={cx("eyeIcon")} />
                    <div className={cx("popupDescription")}>
                      {item.product_description}
                    </div>
                  </div>
                </td>

                <td>{item.price.toLocaleString("vi", "VN")} đ</td>
                <td>
                  {item.product_sale > 0
                    ? item.product_sale.toLocaleString("vi", "VN") + " đ"
                    : "Chưa giảm giá"}
                </td>
                <td>{item.product_inventory}</td>
                <td>{item.unit}</td>
                <td>{item.product_purchases}</td>
                <td>
                  <EyeOutlined onClick={() => handleViewProof(item.proofs)} />
                </td>
                <td>
                  {item.product_status === 1
                    ? "Đã duyệt"
                    : item.product_status === 0
                    ? "Chưa duyệt"
                    : "Đã ẩn"}
                </td>
                <td className={cx("btn-manager")}>
                  {item.product_status !== 2 && (
                    <button title="Sửa sản phẩm" className={cx("btn-edit")}>
                      <EditOutlined onClick={() => handleEdit(item)} />
                    </button>
                  )}
                  {item.product_status === 1 && (
                    <button
                      title="Ẩn sản phẩm"
                      onClick={() => handleHide(item.product_id)}
                      className={cx("btn-delete")}
                    >
                      <EyeInvisibleOutlined />
                    </button>
                  )}

                  {item.product_status == 2 && (
                    <button
                      title="Hiện sản phẩm"
                      onClick={() => handleShow(item.product_id)}
                      className={cx("btn-delete")}
                    >
                      <EyeOutlined />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={cx("pagination")}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trang trước
          </button>

          {[...Array(totalPages).keys()].map((_, index) => (
            <button
              key={index}
              className={cx({ active: currentPage === index + 1 })}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Trang sau
          </button>
        </div>
        <ToastContainer />
      </div>
      {isPopup && <ModalProof data={data} onClose={() => setIsPopup(false)} />}
      {isOpen && <ModalView data={products} onClose={() => setIsOpen(false)} />}
    </Sidebar>
  );
};

export default ListProduct;
