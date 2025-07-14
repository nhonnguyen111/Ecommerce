import {
  UserOutlined,
  SecurityScanOutlined,
  NotificationOutlined,
  NotificationFilled,
  HeartOutlined,
} from "@ant-design/icons";

export const sidebar = [
  {
    i: 1,
    name: "Thông tin tài khoản",
    icon: <UserOutlined />,
    path: "member/home",
  },
  {
    i: 2,
    name: "Bảo mật tài khoản",
    icon: <SecurityScanOutlined />,
    path: "member/security",
  },
  {
    i: 3,
    name: "Quản lý thanh toán",
    icon: <NotificationOutlined />,
    path: "member/payments",
  },
  {
    i: 4,
    name: "Thông báo",
    icon: <NotificationFilled />,
    path: "member/notification",
  },
];
