import { apigetCategory } from "../../services/app";
import { actionType } from "./actionType/actionType";

export const getCategorys = () => async (dispatch) => {
  try {
    const response = await apigetCategory();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CATEGORY,
        category: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_CATEGORY,
        msg: response.data.msg,
        category: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CATEGORY,
      category: null,
    });
  }
};
