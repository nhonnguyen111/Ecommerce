import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./HomeStore.module.scss";
import Sidebar from "../components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/actions";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);

const lineData = [
  { name: "Jan", revenue: 500 },
  { name: "Feb", revenue: 700 },
  { name: "Mar", revenue: 800 },
  { name: "Apr", revenue: 1100 },
  { name: "May", revenue: 1400 },
  { name: "Jun", revenue: 1800 },
  { name: "Jul", revenue: 2200 },
  { name: "Aug", revenue: 2000 },
  { name: "Sep", revenue: 1700 },
  { name: "Oct", revenue: 1200 },
  { name: "Nov", revenue: 900 },
  { name: "Dec", revenue: 600 },
];

const pieData = [
  { name: "Hoàn tất", value: 40 },
  { name: "Đang vận chuyển", value: 25 },
  { name: "Hủy bỏ", value: 10 },
  { name: "Chờ xác nhận", value: 25 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

const HomeStore = () => {
  const { shop_id } = useParams();
  const product = useSelector((state) => state.product.product);
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getProductByShop({ id: shop_id }));
    dispatch(actions.getOrderShop({ id: shop_id }));
  }, [shop_id]);
  const totalPrice = order.reduce((sum, item) => {
    return sum + item.order_total;
  }, 0);
  const totalOrderSuccess = order.reduce((sum, item) => {
    return item.order_status === 2 ? sum + 1 : sum;
  }, 0);

  return (
    <Sidebar>
      <div className={cx("revenue-container")}>
        <div className={cx("stats")}>
          <div className={cx("card", "blue")}>
            <p>Tổng đơn hàng</p>
            <h3>{order.length}</h3>
          </div>
          <div className={cx("card", "green")}>
            <p>Tổng doanh thu</p>
            <h3>{totalPrice.toLocaleString("vi", "VN")}đ</h3>
          </div>
          <div className={cx("card", "orange")}>
            <p>Sản phẩm</p>
            <h3>{product.length}</h3>
          </div>
          <div className={cx("card", "red")}>
            <p>Đơn hàng hoàn thành</p>
            <h3>{totalOrderSuccess}</h3>
          </div>
        </div>

        <div className={cx("charts")}>
          <div className={cx("chart-box")}>
            <h4>Doanh thu theo tháng</h4>
            <LineChart width={500} height={300} data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>

          <div className={cx("chart-box")}>
            <h4>Thống kê trạng thái đơn hàng</h4>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default HomeStore;
