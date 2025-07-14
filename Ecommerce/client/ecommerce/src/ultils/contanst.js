export const path = {
  home: "/",
  login: "login",
  register: "register",
  profile: "member/home",
  detail: "detail/:title/:productId/",
  cart: "cart",
  registerstore: "register-store/:userid/",
  registersuccess: "register-success",
  homestore: "home/store/:shop_id/",
  productstore: "home/product/:shop_id/",
  createproduct: "home/product/create-product/:shop_id/",
  settingstore: "home/setting/:shop_id/",
  orderstore: "home/order/:shop_id/",
  pay: "pay",
  order: "member/orders",
  storedetail: "store/:shopId",
  search: "search",
  delivery: "member/address",
  account: "member/security",
  evaluate: "home/evaluate/:shop_id/",
  payment: "member/payments",
  notification: "member/notification",
  adminlogin: "login-admin",
  admin: "admin",
  shopadmin: "admin/shop",
  productadmin: "admin/product",
  categoryadmin: "admin/category",
};
export const formatVietNamtoString = (keyword) => {
  return keyword
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-") //
    .replace(/^-+|-+$/g, "");
};
