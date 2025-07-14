import {
  apiCreateOrder,
  apigetOrderCustomer,
  apigetOrderDetail,
  apigetOrderShop,
  apiupdateOrderShop,
} from "../../services/order";
import { actionType } from "./actionType/actionType";

export const CreateOrder = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateOrder(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.CREATE_ORDER,
        order: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.CREATE_ORDER,
        data: response.data.msg,
        order: null,
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: actionType.CREATE_ORDER,
      order: null,
    });
  }
};
export const getOrderCustomer = () => async (dispatch) => {
  try {
    const response = await apigetOrderCustomer();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_ORDER_CUSTOMER,
        order: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_ORDER_CUSTOMER,
        data: response.data.msg,
        order: null,
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: actionType.GET_ORDER_CUSTOMER,
      order: null,
    });
  }
};
export const getOrderDetail = (payload) => async (dispatch) => {
  try {
    const response = await apigetOrderDetail(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_ORDER_DETAIL_CUSTOMER,
        orderdetail: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_ORDER_DETAIL_CUSTOMER,
        data: response.data.msg,
        orderdetail: null,
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: actionType.GET_ORDER_DETAIL_CUSTOMER,
      orderdetail: null,
    });
  }
};
export const getOrderShop = (payload) => async (dispatch) => {
  try {
    const response = await apigetOrderShop(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_ORDER_SHOP,
        order: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_ORDER_SHOP,
        data: response.data.msg,
        order: null,
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: actionType.GET_ORDER_SHOP,
      order: null,
    });
  }
};
export const updateOrderShop = (payload) => async (dispatch) => {
  try {
    const response = await apiupdateOrderShop(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.UPDATE_ORDER_STATUS,
        orderstatus: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.UPDATE_ORDER_STATUS,
        data: response.data.msg,
        orderstatus: null,
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: actionType.UPDATE_ORDER_STATUS,
      orderstatus: null,
    });
  }
};
