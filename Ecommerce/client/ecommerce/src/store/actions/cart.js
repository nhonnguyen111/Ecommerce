import { actionType } from "./actionType/actionType";

export const addToCart = (product, quantity) => {
  return {
    type: actionType.ADD_TO_CART,
    payload: {
      ...product,
      quantity,
    },
  };
};
export const getCart = () => {
  return {
    type: actionType.GET_CART,
  };
};
export const removeItemCart = (product_id) => {
  return {
    type: actionType.REMOVE_ITEM_CART,
    payload: product_id,
  };
};
export const removeMultipleItemsCart = (ids) => {
  return {
    type: actionType.REMOVE_MULTIPLE_ITEMS_CART,
    payload: ids,
  };
};
export const eidtItemCart = (product_id, quantity) => {
  return {
    type: actionType.EDIT_ITEMS_CART,
    payload: {
      product_id,
      quantity,
    },
  };
};
