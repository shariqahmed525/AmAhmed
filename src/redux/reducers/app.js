import { ARABIC } from "../../common/constants";
import {
  CITIES,
  SHOW_ALERT,
  CATEGORY,
  LANGUAGE,
  SELECTED_CITY,
  SELECTED_CAT,
  VOUCHERS
} from "../types/app";

const initialState = {
  showAlert: {
    error: false,
    alert: false,
    alertImg: "",
    alertText: "",
    alertTitle: "",
    callBack: false
  },
  cities: [],
  vouchers: [],
  category: "",
  language: ARABIC,
  selectedCity: null,
  selectedCategory: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CITIES:
      return {
        ...state,
        cities: payload
      };
    case SELECTED_CITY:
      return {
        ...state,
        selectedCity: payload
      };
    case SELECTED_CAT:
      return {
        ...state,
        selectedCategory: payload
      };
    case LANGUAGE:
      return {
        ...state,
        language: payload
      };
    case CATEGORY:
      return {
        ...state,
        category: payload
      };
    case VOUCHERS:
      return {
        ...state,
        vouchers: payload
      };
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: payload
      };
    default:
      return state;
  }
};
