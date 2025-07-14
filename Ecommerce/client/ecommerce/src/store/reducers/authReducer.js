import { actionType } from "../actions/actionType/actionType";
const initState = {
  isLoggedIn: false,
  token: null,
  msg: "",
  update: false,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.REGISTER_SUCCESS:
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
        msg: "success",
      };
    case actionType.REGISTER_FAIL:
    case actionType.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        msg: action.data,
        token: null,
        update: !state.update,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        msg: "",
      };
    default:
      return state;
  }
};

export default authReducer;
