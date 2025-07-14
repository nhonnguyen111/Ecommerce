import {
  apiCreateShop,
  apiEditShopName,
  apigetProductofShop,
  apigetShop,
  apiUpdateAvtShop,
} from "../../services/shop";
import { actionType } from "./actionType/actionType";

export const createShop = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateShop(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.CREATE_SHOP,
        shop: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.CREATE_SHOP,
        data: response.data.msg,
        shop: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.CREATE_SHOP,
      shop: null,
    });
  }
};
export const getShop = (payload) => async (dispatch) => {
  try {
    const response = await apigetShop(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_SHOP,
        shop: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_SHOP,
        data: response.data.msg,
        shop: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_SHOP,
      shop: null,
    });
  }
};
export const getProductofShop = (payload) => async (dispatch) => {
  try {
    const response = await apigetProductofShop(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRODUCT_SHOP,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT_SHOP,
        data: response.data.msg,
        product: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_SHOP,
      product: null,
    });
  }
};
export const EditShopName = (payload) => async (dispatch) => {
  try {
    const response = await apiEditShopName(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.EDIT_SHOP_NAME,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.EDIT_SHOP_NAME,
        data: response.data.msg,
        product: null,
      });
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: actionType.EDIT_SHOP_NAME,
      product: null,
    });
  }
};
export const UpdateAvtShopName = (payload) => async (dispatch) => {
  try {
    const response = await apiUpdateAvtShop(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.UPDATE_AVT_SHOP,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.UPDATE_AVT_SHOP,
        data: response.data.msg,
        product: null,
      });
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: actionType.UPDATE_AVT_SHOP,
      product: null,
    });
  }
};
