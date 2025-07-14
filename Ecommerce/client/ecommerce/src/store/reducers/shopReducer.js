import { actionType } from "../actions/actionType/actionType";

const initState = {
  shop: [],
  product: [],
};
const shopReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.CREATE_SHOP:
    case actionType.GET_SHOP:
    case actionType.EDIT_SHOP_NAME:
    case actionType.UPDATE_AVT_SHOP:
      return {
        ...state,
        shop: action.shop || null,
        msg: action.msg || "",
      };
    case actionType.GET_PRODUCT_SHOP:
      return {
        ...state,
        product: action.product || null,
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default shopReducer;
