import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Payment.module.scss";
import SidebarProfile from "./component/SidebarProfile";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

const cx = classNames.bind(styles);

const Payment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const pay = useSelector((state) => state.pay.pay);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getPayment());
  }, []);

  const totalPages = Math.ceil(pay.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = pay.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <SidebarProfile>
      <div className={cx("payment-container")}>
        {pay.length === 0 ? (
          <p className={cx("no-payment")}>Chưa có đơn thanh toán nào.</p>
        ) : (
          <>
            {currentPayments.map((payment) => (
              <div key={payment.id} className={cx("payment-card")}>
                <div className={cx("row")}>
                  <strong>Mã giao dịch:</strong> {payment.orderId}
                </div>
                <div className={cx("row")}>
                  <strong>Số tiền:</strong> {payment.amount.toLocaleString()}{" "}
                  VNĐ
                </div>
                <div className={cx("row")}>
                  <strong>Phương thức:</strong> {payment.methodPay}
                </div>
                <div className={cx("row")}>
                  <strong>Link thanh toán:</strong>{" "}
                  <a
                    href={payment.urlPay}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Truy cập link
                  </a>
                </div>
                <div className={cx("row")}>
                  <strong>Trạng thái:</strong>{" "}
                  {payment.statusCode === 0
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </div>
                <div className={cx("row")}>
                  <strong>Thời gian tạo:</strong>{" "}
                  {new Date(payment.createdAt).toLocaleString()}
                </div>
                <div className={cx("row")}>
                  <strong>Cập nhật lần cuối:</strong>{" "}
                  {new Date(payment.updatedAt).toLocaleString()}
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <div className={cx("pagination")}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={cx("page-button", {
                      active: currentPage === index + 1,
                    })}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </SidebarProfile>
  );
};

export default Payment;
