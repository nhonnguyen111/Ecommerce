import { apiLoginAdmin } from "../../services/auth";
import { actionType } from "./actionType/actionType";
export const loginadmin = (payload) => async (dispatch) => {
  try {
    const response = await apiLoginAdmin(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.ADMIN_SUCCESS,
        data: response.data.msg,
      });
    } else {
      dispatch({
        type: actionType.ADMIN_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.ADMIN_FAIL,
      data: null,
    });
  }
};
export const logoutadmin = () => ({
  type: actionType.LOGOUT_ADMIN,
});
