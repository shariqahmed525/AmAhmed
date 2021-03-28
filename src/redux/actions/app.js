import Axios from 'axios';
import { BASE_URL } from '../../common/constants';
import {
  CITIES,
  CATEGORY,
  LANGUAGE,
  SHOW_ALERT,
  SELECTED_CAT,
  SELECTED_CITY,
  VOUCHERS,
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

export const onVoucherGetting = () => {
  return async (dispatch) => {
    try {
      await Axios.get(`${BASE_URL}/users/update`);
      const { data } = await Axios.get(
        `${BASE_URL}/Promos`
      );
      if (data && data.length > 0) {
        dispatch({
          type: VOUCHERS,
          payload: data
        });
      }
    } catch (error) {
      console.log(error, " error in getting vouchers");
    }
  }
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
