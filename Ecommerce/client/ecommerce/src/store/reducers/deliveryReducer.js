import { actionType } from "../actions/actionType/actionType";
const initState = {
  delivery: [],
  msg: "",
};
const deliveryReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.CREATE_DELIVERY:
    case actionType.GET_DELIVERY:
      return {
        ...state,
        delivery: action.delivery || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default deliveryReducer;
