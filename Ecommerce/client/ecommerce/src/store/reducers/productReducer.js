import { actionType } from "../actions/actionType/actionType";
const initState = {
  product: [],
  newproduct: [],
  productselling: [],
  msg: "",
};
const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCT:
    case actionType.GET_PRODUCT_ID:
    case actionType.GET_PRODUCT_SHOP:
    case actionType.CREATE_PRODUCT:
    case actionType.GET_PRODUCT_QUERY:
    case actionType.GET_PRODUCT_SELLING:
    case actionType.GET_PRODUCT_SHOP_QUERY:
    case actionType.UPDATE_PRODUCT:
    case actionType.HIDE_PRODUCT:
      return {
        ...state,
        product: action.product || [],
        msg: action.msg || "",
      };
    case actionType.GET_PRODUCT_NEW:
      return {
        ...state,
        newproduct: action.newproduct || [],
        msg: action.msg || "",
      };
    case actionType.GET_PRODUCT_SELLING_SHOP:
      return {
        ...state,
        productselling: action.productselling || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default productReducer;
