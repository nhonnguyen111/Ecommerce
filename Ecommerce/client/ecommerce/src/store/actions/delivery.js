import { apiCreateDelivery, apigetDelivery } from "../../services/delivery";
import { actionType } from "./actionType/actionType";

export const createDelivery = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateDelivery(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.CREATE_DELIVERY,
        delivery: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.CREATE_DELIVERY,
        data: response.data.msg,
        delivery: null,
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: actionType.CREATE_DELIVERY,
      delivery: null,
    });
  }
};
export const getDelivery = () => async (dispatch) => {
  try {
    const response = await apigetDelivery();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_DELIVERY,
        delivery: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_DELIVERY,
        msg: response.data.msg,
        delivery: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_DELIVERY,
      delivery: null,
    });
  }
};
