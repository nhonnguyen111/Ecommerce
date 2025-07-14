import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import persistReducer from "redux-persist/es/persistReducer";
import appReducer from "./appReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import shopReducer from "./shopReducer";
import deliveryReducer from "./deliveryReducer";
import provinceReducer from "./provinceReducer";
import orderReducer from "./orderReducer";
import paymentReducer from "./paymentReducer";
import voteReducer from "./voteReducer";
import notiReducer from "./notifiReducer";
import adminReducer from "./adminReducer";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};
const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "token"],
};
const adminConfig = {
  ...commonConfig,
  key: "admin",
  whitelist: ["status"],
};
const cartConfig = {
  ...commonConfig,
  key: "cart",
  whitelist: ["cartItems"],
};
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
  app: appReducer,
  product: productReducer,
  shop: shopReducer,
  cart: persistReducer(cartConfig, cartReducer),
  delivery: deliveryReducer,
  province: provinceReducer,
  order: orderReducer,
  pay: paymentReducer,
  vote: voteReducer,
  notifi: notiReducer,
  status: persistReducer(adminConfig, adminReducer),
});
export default rootReducer;
