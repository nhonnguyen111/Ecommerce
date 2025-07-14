import { apiCreateNoti, apigetNoti } from "../../services/notification";
import { actionType } from "./actionType/actionType";

export const createNotification = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateNoti(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.CREATE_NOTIFICATION,
        notifi: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.CREATE_NOTIFICATION,
        msg: response.data.msg,
        notifi: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.CREATE_NOTIFICATION,
      notifi: null,
    });
  }
};

export const getNotification = (payload) => async (dispatch) => {
  try {
    const response = await apigetNoti(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_NOTIFICATION,
        notifi: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_NOTIFICATION,
        msg: response.data.msg,
        notifi: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_NOTIFICATION,
      notifi: null,
    });
  }
};
