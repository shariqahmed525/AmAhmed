import {
  CLEAR_CART,
  SAVE_ADDRESS,
  SAVE_USER_DATA,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
  CLEAR_USER_DATA,
  ADD_ITEM_TO_CART
} from "../types/user";

export const saveUserData = payload => {
  return {
    type: SAVE_USER_DATA,
    payload
  };
};

export const saveAddressAction = payload => {
  return {
    type: SAVE_ADDRESS,
    payload
  };
};

export const deleteAddressAction = payload => {
  return {
    type: DELETE_ADDRESS,
    payload
  };
};

export const updateAddressAction = (data, id) => {
  return {
    type: UPDATE_ADDRESS,
    payload: {
      data,
      id
    }
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
