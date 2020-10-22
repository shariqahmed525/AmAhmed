import {
  SELECTED_CITY,
  SELECTED_CAT,
  CITIES,
  SHOW_ALERT,
  CATEGORY,
  ADDRESSES,
  LANGUAGE,
  TOKEN,
  SELECTED_ADDRESS
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

export const onSelectedAddressAction = address => {
  return {
    type: SELECTED_ADDRESS,
    payload: address
  };
};

export const onCitiesAction = cities => {
  return {
    type: CITIES,
    payload: cities
  };
};

export const onSaveUserTokenAction = token => {
  return {
    type: TOKEN,
    payload: token
  };
};

export const onAddressesAction = addresses => {
  return {
    type: ADDRESSES,
    payload: addresses
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
