import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalView.module.scss";
import * as action from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);

const CANCEL_REASONS = [
  "Thay đổi địa chỉ giao hàng",
  "Thời gian giao hàng quá lâu",
  "Tìm thấy sản phẩm rẻ hơn ở nơi khác",
  "Không còn nhu cầu",
  "Lý do khác",
];

const ModalView = ({ onClose, data }) => {
  const dispatch = useDispatch();
  const [selectedReason, setSelectedReason] = useState("");

  const handleConfirm = async () => {
    if (!selectedReason) {
      toast.warning("Vui lòng chọn một lý do huỷ đơn hàng!");
      return;
    }
    try {
      const response = await dispatch(
        action.updateOrderShop({
          id: data,
          order_status: 3,
          cancel: selectedReason,
        })
      );
      if (response?.data?.err === 0) {
        toast.success("Cập nhật trạng thái đơn hàng thành công");
        window.location.reload();
      } else {
        toast.error("Cập nhật trạng thái thất bại");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal-container")}>
        <h3 className={cx("modal-title")}>
          Bạn muốn huỷ đơn hàng vì lý do gì?
        </h3>

        <ul className={cx("reason-list")}>
          {CANCEL_REASONS.map((reason, index) => (
            <li key={index} className={cx("reason-item")}>
              <label className={cx("radio")}>
                <input
                  type="radio"
                  name="cancelReason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                {reason}
              </label>
            </li>
          ))}
        </ul>

        <div className={cx("modal-actions")}>
          <button
            className={cx("cancel-button")}
            onClick={handleConfirm}
            disabled={!selectedReason}
          >
            Huỷ đơn
          </button>

          <button className={cx("close-button")} onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalView;
