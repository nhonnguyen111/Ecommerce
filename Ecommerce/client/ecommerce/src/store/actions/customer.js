import { apigetCurrentUser } from "../../services/customer";
import { actionType } from "./actionType/actionType";
export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apigetCurrentUser();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CURRENT_USER,
        customerData: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_CURRENT_USER,
        msg: response.data.msg,
        customerData: null,
      });
      dispatch({
        type: actionType.LOGOUT,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CURRENT_USER,
      msg: error,
      customerData: null,
    });
    dispatch({
      type: actionType.LOGOUT,
    });
  }
};
