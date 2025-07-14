import { actionType } from "../actions/actionType/actionType";

const initState = {
  customerData: {},
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_CURRENT_USER:
      return {
        ...state,
        customerData: action.customerData || {},
      };
    case actionType.LOGOUT:
      return {
        ...state,
        customerData: {},
      };

    default:
      return state;
  }
};

export default userReducer;
