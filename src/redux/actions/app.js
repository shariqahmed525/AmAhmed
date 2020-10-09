import { CITY, SHOW_ALERT, CATEGORY, LANGUAGE } from "../types/app";

export const onCityAction = city => {
  return {
    type: CITY,
    payload: city
  };
};

export const onLanguageAction = language => {
  return {
    type: LANGUAGE,
    payload: language
  };
};

export const onCategoryAction = category => {
  return {
    type: CATEGORY,
    payload: category
  };
};

export const showAlert = (
  alert = false,
  alertTitle = "",
  alertText = "",
  alertImg = "",
  error = false,
  callBack = false
) => {
  return {
    type: SHOW_ALERT,
    payload: {
      alert,
      error,
      callBack,
      alertImg,
      alertText,
      alertTitle
    }
  };
};
