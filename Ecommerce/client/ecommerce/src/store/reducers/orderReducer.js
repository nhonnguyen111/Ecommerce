import { actionType } from "../actions/actionType/actionType";
const initState = {
  order: [],
  msg: "",
  orderdetail: [],
  orderstatus: [],
};
const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.CREATE_ORDER:
    case actionType.GET_ORDER_CUSTOMER:
    case actionType.GET_ORDER_SHOP:
      return {
        ...state,
        order: action.order || [],
        msg: action.msg || "",
      };
    case actionType.GET_ORDER_DETAIL_CUSTOMER:
      return {
        ...state,
        orderdetail: action.orderdetail || [],
        msg: action.msg || "",
      };
    case actionType.UPDATE_ORDER_STATUS:
      return {
        ...state,
        orderstatus: action.orderstatus || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default orderReducer;
