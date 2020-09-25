import {
  CLEAR_CART,
  SAVE_USER_DATA,
  CLEAR_USER_DATA,
  ADD_ITEM_TO_CART
} from "../types/user";

export const saveUserData = payload => {
  return {
    type: SAVE_USER_DATA,
    payload
  };
};

export const clearUserData = () => {
  return {
    type: CLEAR_USER_DATA
  };
};

export const addItemToCart = (item, action) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: {
      item,
      action
    }
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART
  };
};
