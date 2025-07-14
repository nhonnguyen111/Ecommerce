import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DeliveryPage.module.scss";
import SidebarProfile from "./component/SidebarProfile";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { apideleteDelivery } from "../../services/delivery";
import AddressModal from "./component/AddressModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);

const DeliveryPage = () => {
  const delivery = useSelector((state) => state.delivery.delivery);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  console.log(delivery);
  const handleEdit = (address) => {
    setSelectedAddress(address);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedAddress(null);
    setShowModal(true);
  };

  const handleSave = (formData) => {
    if (selectedAddress) {
      dispatch(actions.updateDelivery(selectedAddress.delivery_id, formData));
    } else {
      dispatch(actions.createDelivery(formData));
    }
    setShowModal(false);
  };
  useEffect(() => {
    dispatch(actions.getDelivery());
  }, []);
  const handleDelete = async (deliveryId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa địa chỉ này?"
    );
    if (!confirmDelete) return;

    try {
      const response = await apideleteDelivery({ delivery_id: deliveryId });
      if (response?.data?.err === 0) {
        toast.success("Xóa địa chỉ vận chuyển thành công");
        dispatch(actions.getDelivery());
      } else {
        toast.error("Không thể xóa địa chỉ");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xóa địa chỉ");
    }
  };

  return (
    <SidebarProfile>
      <div className={cx("delivery-container")}>
        <div className={cx("header")}>
          <div></div>
          <button onClick={handleAdd} className={cx("add-button")}>
            + Thêm địa chỉ mới
          </button>
        </div>

        {delivery?.length > 0 ? (
          delivery.map((item, idx) => (
            <div key={idx} className={cx("address-card")}>
              <div className={cx("info")}>
                <strong>{item.username}</strong> • {item.phone}
                <div className={cx("address")}>{item.address}</div>
              </div>
              <div className={cx("actions")}>
                <EditOutlined
                  className={cx("icon", "edit")}
                  title="Chỉnh sửa"
                  onClick={() => handleEdit(item)}
                />
                <DeleteOutlined
                  onClick={() => handleDelete(item.delivery_id)}
                  className={cx("icon", "delete")}
                  title="Xoá"
                />
              </div>
            </div>
          ))
        ) : (
          <p>Không có địa chỉ nào.</p>
        )}
      </div>
      {showModal && (
        <AddressModal
          data={selectedAddress}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
      <ToastContainer />
    </SidebarProfile>
  );
};

export default DeliveryPage;
