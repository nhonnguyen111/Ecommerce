import { actionType } from "../actions/actionType/actionType";
const initState = {
  status: false,
  msg: "",
  update: false,
};
const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.ADMIN_SUCCESS:
      return {
        ...state,
        status: true,
        msg: "success",
      };
    case actionType.ADMIN_FAIL:
      return {
        ...state,
        status: false,
        msg: action.data,
        update: !state.update,
      };
    case actionType.LOGOUT_ADMIN:
      return {
        ...state,
        status: false,
        msg: "",
      };
    default:
      return state;
  }
};

export default adminReducer;
