import {
  TOKEN,
  CLEAR_CART,
  DELETE_ADDRESS,
  SAVE_ADDRESS,
  UPDATE_ADDRESS,
  SAVE_USER_DATA,
  CLEAR_USER_DATA,
  ADD_ITEM_TO_CART,
  SELECTED_ADDRESS,
  ADDRESSES,
  RECALL_MY_ADDRESSES
} from "../types/user";

const initialState = {
  cart: [],
  random: 1,
  token: "",
  addresses: [],
  userData: null,
  selectedAddress: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOKEN:
      return {
        ...state,
        token: payload
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        userData: payload
      };
    case ADDRESSES:
      return {
        ...state,
        addresses: payload
      };
    case SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: payload
      };
    case DELETE_ADDRESS:
      const addresses = state.addresses.filter(o => o.id !== payload);
      return {
        ...state,
        addresses
      };
    case UPDATE_ADDRESS:
      const findAddressIndex = state.addresses.findIndex(
        o => o.id === payload.id
      );
      state.addresses[findAddressIndex] = payload.data;
      return {
        ...state
      };
    case RECALL_MY_ADDRESSES:
      return {
        random: Math.random() * 87,
        ...state
      };
    case SAVE_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, payload]
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
        if (payload.action == "!") {
          // console.log(payload.item, " payload.item");
          cart[findIndex] = { ...payload.item };
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
