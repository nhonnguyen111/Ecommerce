import { actionType } from "../actions/actionType/actionType";
const initState = {
  pay: [],
  msg: "",
  payCustomer: [],
};

const paymentReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.CREATE_PAYMENT:
    case actionType.GET_PAYMENT:
    case actionType.UPDATE_PAYMENT:
      return {
        ...state,
        pay: action.pay || null,
        msg: action.msg || "",
      };
    case actionType.CREATE_PAYMENT_CUSTOMER:
      return {
        ...state,
        payCustomer: action.pay || null,
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default paymentReducer;
