import { actionType } from "../actions/actionType/actionType";
const initState = {
  category: [],
  msg: "",
};
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_CATEGORY:
      return {
        ...state,
        category: action.category || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default appReducer;
