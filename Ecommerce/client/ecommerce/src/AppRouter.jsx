import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";
import { path } from "./ultils/contanst";
import HomePage from "./page/Home/HomePage";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import ProfilePage from "./page/Profile/ProfilePage";
import DetailPage from "./page/Detail/DetailPage";
import CartPage from "./page/cart/CartPage";
import RegisterStorePage from "./page/store/registerstore/RegisterStorePage";
import RegisterSuccess from "./page/store/registerstore/components/RegisterSuccess";
import HomeStore from "./page/store/home/HomeStore";
import ListProduct from "./page/store/listproduct/ListProduct";
import CreateProduct from "./page/store/components/CreateProduct";
import Pay from "./page/pay/Pay";
import OrderPage from "./page/order/OrderPage";
import OrderShop from "./page/store/order/OrderShop";
import ViewStore from "./page/store/viewstore/ViewStore";
import SearchPage from "./page/search/SearchPage";
import DeliveryPage from "./page/Profile/DeliveryPage";
import AccountPage from "./page/Profile/AccountPage";
import RevenuePage from "./page/store/revenue/RevenuePage";
import Payment from "./page/Profile/Payment";
import SettingStorePage from "./page/store/settingstore/SettingStorePage";
import Notification from "./page/Profile/Notification";
import LoginAdmin from "./page/admin/LoginAdmin";
import HomeAdmin from "./page/admin/HomeAdmin";
import AdminLoginRoute from "./page/admin/components/AdminLoginRoute";
import ShopAdmin from "./page/admin/components/ShopAdmin";
import ProductAdmin from "./page/admin/components/ProductAdmin";
import CategoryAdmin from "./page/admin/components/CategoryAdmin";

const AppRouter = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.status);

  useEffect(() => {
    if (status && !location.pathname.includes("admin")) {
      dispatch(actions.logoutadmin());
    }
  }, [location]);

  return (
    <Routes>
      <Route path={path.home} element={<HomePage />} />
      <Route path={path.login} element={<Login />} />
      <Route path={path.register} element={<Register />} />
      <Route path={path.profile} element={<ProfilePage />} />
      <Route path={path.detail} element={<DetailPage />} />
      <Route path={path.cart} element={<CartPage />} />
      <Route path={path.registerstore} element={<RegisterStorePage />} />
      <Route path={path.registersuccess} element={<RegisterSuccess />} />
      <Route path={path.homestore} element={<HomeStore />} />
      <Route path={path.productstore} element={<ListProduct />} />
      <Route path={path.createproduct} element={<CreateProduct />} />
      <Route path={path.pay} element={<Pay />} />
      <Route path={path.notification} element={<Notification />} />
      <Route path={path.order} element={<OrderPage />} />
      <Route path={path.orderstore} element={<OrderShop />} />
      <Route path={path.storedetail} element={<ViewStore />} />
      <Route path={path.search} element={<SearchPage />} />
      <Route path={path.delivery} element={<DeliveryPage />} />
      <Route path={path.account} element={<AccountPage />} />
      <Route path={path.evaluate} element={<RevenuePage />} />
      <Route path={path.payment} element={<Payment />} />
      <Route path={path.settingstore} element={<SettingStorePage />} />
      <Route
        path={path.adminlogin}
        element={
          <AdminLoginRoute>
            <LoginAdmin />
          </AdminLoginRoute>
        }
      />
      <Route path={path.admin} element={<HomeAdmin />} />
      <Route path={path.shopadmin} element={<ShopAdmin />} />
      <Route path={path.productadmin} element={<ProductAdmin />} />
      <Route path={path.categoryadmin} element={<CategoryAdmin />} />
    </Routes>
  );
};

export default AppRouter;
