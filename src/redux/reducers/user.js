import {
  CLEAR_CART,
  DELETE_ADDRESS,
  SAVE_ADDRESS,
  UPDATE_ADDRESS,
  SAVE_USER_DATA,
  CLEAR_USER_DATA,
  ADD_ITEM_TO_CART
} from "../types/user";

const initialState = {
  cart: [],
  addresses: [],
  userData: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_USER_DATA:
      return {
        ...state,
        userData: payload
      };
    case SAVE_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, payload]
      };
    case UPDATE_ADDRESS:
      const findAddressIndex = state.addresses.findIndex(
        o => o.id === payload.id
      );
      state.addresses[findAddressIndex] = payload.data;
      return {
        ...state
      };
    case DELETE_ADDRESS:
      const addresses = state.addresses.filter(o => o.id !== payload);
      return {
        ...state,
        addresses
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        userData: null
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    case ADD_ITEM_TO_CART:
      let { cart } = state;
      const id = payload.item.id;
      if (cart.some(v => v.id === id)) {
        const findIndex = cart.findIndex(v => v.id === id);
        const quantity = cart[findIndex].quantity;
        if (payload.action == "+") {
          cart[findIndex].quantity = quantity + 1;
        }
        if (payload.action == "-") {
          if (quantity < 2) {
            cart.splice(findIndex, 1);
          } else {
            cart[findIndex].quantity = quantity - 1;
          }
        }
        if (payload.action == "x") {
          cart.splice(findIndex, 1);
        }
      } else {
        if (payload.action == "+") {
          cart.push({
            ...payload.item,
            quantity: 1
          });
        }
      }
      return {
        ...state,
        cart
      };
    default:
      return state;
  }
};
