import _ from "lodash";
import { Platform } from "react-native";
import { HEIGHT, WIDTH } from "./constants";
import { CommonActions } from "@react-navigation/native";

export const Random = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const mergeArr = arr => {
  return _.flatten(arr);
};

export const trimSpace = str => {
  return str.replace(/\s\s+/g, " ");
};

export const isIphoneXorAbove = () => {
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (HEIGHT === 812 || WIDTH === 812 || HEIGHT === 896 || WIDTH === 896)
  );
};

export const removePreviousRoute = (
  navigation,
  route,
  removeRoute,
  params = {}
) => {
  navigation.navigate(route, params);
  navigation.dispatch(state => {
    const routes = state.routes.filter(r => r.name !== removeRoute);
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1
    });
  });
};
