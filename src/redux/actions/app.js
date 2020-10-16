import {
  SELECTED_CITY,
  SELECTED_CAT,
  CITIES,
  SHOW_ALERT,
  CATEGORY,
  LANGUAGE
} from "../types/app";

export const onSelectedCityAction = city => {
  return {
    type: SELECTED_CITY,
    payload: city
  };
};

export const onSelectedCategoryAction = cat => {
  return {
    type: SELECTED_CAT,
    payload: cat
  };
};

export const onCitiesAction = cities => {
  return {
    type: CITIES,
    payload: cities
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
