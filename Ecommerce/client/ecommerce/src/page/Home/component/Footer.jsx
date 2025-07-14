import React from "react";

import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <div>
      {" "}
      <footer className={cx("footer")}>
        <div className={cx("footer-top")}>
          <div className={cx("footer-info")}>
            <p>TỔNG CÔNG TY BƯU ĐIỆN VIỆT NAM</p>
            <p>Giấy chứng nhận đăng ký doanh nghiệp số: 0102595740...</p>
            <p>Địa chỉ: Số 5, Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm, Hà Nội.</p>
            <p>Tổng đài hỗ trợ: 1900565657</p>
            <p>Email: cskh.buudien@vnpost.vn</p>
          </div>

          <div className={cx("footer-links")}>
            <div className={cx("link-column")}>
              <h4>HỖ TRỢ</h4>
              <ul>
                <li>Quyền và Nghĩa vụ các bên</li>
                <li>Quy định đóng gói hàng hóa</li>
                <li>Đăng ký thành viên</li>
              </ul>
            </div>

            <div className={cx("link-column")}>
              <h4>HƯỚNG DẪN</h4>
              <ul>
                <li>Hướng dẫn bán hàng</li>
                <li>Hướng dẫn mua hàng</li>
              </ul>
            </div>

            <div className={cx("link-column")}>
              <h4>ĐỐI TÁC</h4>
              <ul>
                <li>Quy chế sàn TMĐT Nông sản</li>
                <li>Điều khoản chung</li>
                <li>Đăng ký Ví điện tử Postpay</li>
              </ul>
            </div>

            <div className={cx("link-column")}>
              <h4>CHÍNH SÁCH</h4>
              <ul>
                <li>Chính sách đổi trả và hoàn tiền</li>
                <li>Chính sách giải quyết khiếu nại</li>
                <li>Chính sách bảo hành</li>
                <li>Quy định hàng hóa cấm</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={cx("footer-bottom")}>
          <p>© 2024 buudien.vn . All rights reserved.</p>
          <div className={cx("social-icons")}>
            <i className={cx("icon-facebook")}></i>
            <i className={cx("icon-messenger")}></i>
            <i className={cx("icon-youtube")}></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
