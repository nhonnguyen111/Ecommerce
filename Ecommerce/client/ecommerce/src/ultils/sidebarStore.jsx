import {
  DashboardOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  LikeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const sidebarSotre = [
  {
    i: 1,
    name: "Tổng quan",
    icon: <DashboardOutlined />,
    path: "home/store/:shop_id/",
  },
  {
    i: 2,
    name: "Danh sách sản phẩm",
    icon: <ProductOutlined />,
    path: "home/product/:shop_id/",
  },
  {
    i: 3,
    name: "Đơn hàng",
    icon: <ShoppingCartOutlined />,
    path: "home/order/:shop_id/",
  },
  {
    i: 4,
    name: "Đánh giá sản phẩm",
    icon: <LikeOutlined />,
    path: "home/evaluate/:shop_id/",
  },
  {
    i: 5,
    name: "Cài đặt cửa hàng",
    icon: <SettingOutlined />,
    path: "home/setting/:shop_id/",
  },
];
