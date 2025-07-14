import {
  apicreatePayment,
  apiCreatePayUser,
  apigetCallback,
  apigetPaymentById,
} from "../../services/payment";
import { actionType } from "./actionType/actionType";
export const createPayment = (amount) => async (dispatch) => {
  try {
    const response = await apicreatePayment(amount);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.CREATE_PAYMENT,
        pay: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.CREATE_PAYMENT,
        msg: response.data.msg,
        pay: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.CREATE_PAYMENT,
      pay: null,
      msg: "Lỗi khi tạo thanh toán",
    });
  }
};
export const createPaymentUser = (payload) => async (dispatch) => {
  try {
    const response = await apiCreatePayUser(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.CREATE_PAYMENT_CUSTOMER,
        pay: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.CREATE_PAYMENT_CUSTOMER,
        msg: response.data.msg,
        pay: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.CREATE_PAYMENT_CUSTOMER,
      pay: null,
      msg: "Lỗi khi tạo thanh toán",
    });
  }
};
export const getPayment = () => async (dispatch) => {
  try {
    const response = await apigetPaymentById();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PAYMENT,
        pay: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PAYMENT,
        msg: response.data.msg,
        pay: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PAYMENT,
      pay: null,
    });
  }
};
export const getCallback = (payload) => async (dispatch) => {
  try {
    const response = await apigetCallback(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.UPDATE_PAYMENT,
        pay: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.UPDATE_PAYMENT,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.UPDATE_PAYMENT,
      pay: null,
    });
  }
};
