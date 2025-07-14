import { actionType } from "../actions/actionType/actionType";

const initState = {
  cartItems: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product_id === newItem.product_id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product_id === newItem.product_id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { ...newItem, quantity: newItem.quantity },
          ],
        };
      }
    case actionType.GET_CART:
      return {
        ...state,
      };
    case actionType.REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product_id !== action.payload
        ),
      };
    case actionType.REMOVE_MULTIPLE_ITEMS_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => !action.payload.includes(item.product_id)
        ),
      };
    case actionType.EDIT_ITEMS_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
