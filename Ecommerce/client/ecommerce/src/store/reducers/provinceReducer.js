import { actionType } from "../actions/actionType/actionType";

const initState = {
  msg: "",
  province: [],
  districts: [],
  ward: [],
};
const provinceReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_PROVINCE:
      return {
        ...state,
        province: action.province || [],
        msg: action.msg || "",
      };
    case actionType.GET_DISTRICTS:
      return {
        ...state,
        districts: action.districts || [],
        msg: action.msg || "",
      };
    case actionType.GET_WARD:
      return {
        ...state,
        ward: action.ward || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default provinceReducer;
