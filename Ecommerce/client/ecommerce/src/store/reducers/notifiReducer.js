import { actionType } from "../actions/actionType/actionType";
const initState = {
  notifi: [],
  msg: "",
};
const notifiReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.CREATE_NOTIFICATION:
    case actionType.GET_NOTIFICATION:
      return {
        ...state,
        notifi: action.notifi || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default notifiReducer;
