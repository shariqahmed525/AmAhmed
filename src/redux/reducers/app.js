import { ARABIC } from "../../common/constants";
import { CITY, SHOW_ALERT, CATEGORY, LANGUAGE } from "../types/app";

const initialState = {
  showAlert: {
    error: false,
    alert: false,
    alertImg: "",
    alertText: "",
    alertTitle: "",
    callBack: false
  },
  city: "",
  category: "",
  language: ARABIC
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CITY:
      return {
        ...state,
        city: payload
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
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: payload
      };
    default:
      return state;
  }
};
