import {
  apicreateProduct,
  apigetProduct,
  apigetProductById,
  apigetProductByShopId,
  apigetProductNew,
  apigetProductQuery,
  apigetProductSelling,
  apigetProductSellingByShopId,
  apigetProductShopQuery,
  apiHieProduct,
  apiupdateProduct,
} from "../../services/product";
import { actionType } from "./actionType/actionType";

export const getProduct = () => async (dispatch) => {
  try {
    const response = await apigetProduct();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRODUCT,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT,
        msg: response.data.msg,
        product: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT,
      product: null,
    });
  }
};

export const getProductById = (payload) => async (dispatch) => {
  try {
    const response = await apigetProductById(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRODUCT_ID,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT_ID,
        msg: response.data.msg,
        product: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_ID,
      product: null,
    });
  }
};
export const getProductByShop = (payload) => async (dispatch) => {
  try {
    const response = await apigetProductByShopId(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRODUCT_SHOP,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT_SHOP,
        msg: response.data.msg,
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
export const createProduct = (payload) => async (dispatch) => {
  try {
    const response = await apicreateProduct(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.CREATE_PRODUCT,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.CREATE_PRODUCT,
        data: response.data.msg,
        product: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.CREATE_PRODUCT,
      product: null,
    });
  }
};
export const updateProduct = (payload) => async (dispatch) => {
  try {
    const response = await apiupdateProduct(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.UPDATE_PRODUCT,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.UPDATE_PRODUCT,
        data: response.data.msg,
        product: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.UPDATE_PRODUCT,
      product: null,
    });
  }
};
export const hideProduct = (payload) => async (dispatch) => {
  try {
    const response = await apiHieProduct(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.HIDE_PRODUCT,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.HIDE_PRODUCT,
        data: response.data.msg,
        product: null,
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: actionType.HIDE_PRODUCT,
      product: null,
    });
  }
};
export const getProductQuery = (query) => async (dispatch) => {
  try {
    const response = await apigetProductQuery(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRODUCT_QUERY,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT_QUERY,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_QUERY,
      product: null,
    });
  }
};
export const getProductShopQuery = (query) => async (dispatch) => {
  try {
    const response = await apigetProductShopQuery(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRODUCT_SHOP_QUERY,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT_SHOP_QUERY,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_SHOP_QUERY,
      product: null,
    });
  }
};
export const getProductSelling = () => async (dispatch) => {
  try {
    const response = await apigetProductSelling();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRODUCT_SELLING,
        product: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT_SELLING,
        msg: response.data.msg,
        product: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_SELLING,
      product: null,
    });
  }
};
export const getProductNew = () => async (dispatch) => {
  try {
    const response = await apigetProductNew();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRODUCT_NEW,
        newproduct: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT_NEW,
        msg: response.data.msg,
        newproduct: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_NEW,
      newproduct: null,
    });
  }
};
export const getProductSellingByShop = (payload) => async (dispatch) => {
  try {
    const response = await apigetProductSellingByShopId(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRODUCT_SELLING_SHOP,
        productselling: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRODUCT_SELLING_SHOP,
        msg: response.data.msg,
        productselling: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_SELLING_SHOP,
      productselling: null,
    });
  }
};
