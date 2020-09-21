import {
  CLEAR_CART,
  SAVE_USER_DATA,
  CLEAR_USER_DATA,
  ADD_ITEM_TO_CART
} from "../types/user";

const initialState = {
  cart: [{ item: { id: "7777" }, quantity: 10 }],
  userData: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_USER_DATA:
      return {
        ...state,
        userData: payload
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
