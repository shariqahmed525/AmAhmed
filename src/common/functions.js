import _ from "lodash";
import { Toast } from "native-base";
import { Platform } from "react-native";
import {
  DEBUG_SMS_RETRIVER_CODE,
  RELEASE_SMS_RETRIVER_CODE,
  HEIGHT,
  IOS,
  WIDTH
} from "./constants";
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

export const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = phone => {
  const re = /^(5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  return re.test(phone);
};

export const isIphoneXorAbove = () => {
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (HEIGHT === 812 || WIDTH === 812 || HEIGHT === 896 || WIDTH === 896)
  );
};

export const removePreviousRoutes = (
  navigation,
  route,
  removeRoute = [],
  params = {}
) => {
  navigation.navigate(route, params);
  navigation.dispatch(state => {
    const routes = state.routes.filter(r => !removeRoute.includes(r.name));
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1
    });
  });
};

export const calculatePercentage = (price, discount) => {
  const percentage = Math.round((discount / price) * 100);
  return 100 - percentage;
};

export const toastOptions = (isArabic, top) => ({
  style: {
    transform: [
      {
        scaleX: isArabic ? -1 : 1
      }
    ],
    top: top - 85
  },
  textStyle: {
    transform: [
      {
        rotateY: isArabic ? "180deg" : "0deg"
      }
    ],
    textAlign: isArabic ? "right" : "left"
  },
  buttonTextStyle: {
    transform: [
      {
        rotateY: isArabic ? "180deg" : "0deg"
      }
    ]
  },
  buttonText: isArabic ? "حسنا" : "Okay",
  type: "danger",
  position: "top",
  duration: 2000
});

export const ShowToastWithScroll = (
  scrollRef,
  y = 0,
  end,
  componentRef,
  text,
  isArabic
) => {
  if (scrollRef) {
    if (end) {
      scrollRef.current.scrollToEnd({ animated: true });
    } else {
      scrollRef.current.scrollTo({ x: 0, y, animated: true });
    }
  }
  if (componentRef) {
    setTimeout(() => {
      if (componentRef && componentRef.current) {
        componentRef.current.measure((fx, fy, width, height, px, py) => {
          Toast.show({
            text,
            ...toastOptions(isArabic, py)
          });
        });
      }
    }, 500);
  } else {
    Toast.show({
      text,
      ...toastOptions(isArabic, 0)
    });
  }
  return;
};

export const convertSecondstoTime = sec => {
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;
  let timeString =
    hours > 0
      ? hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0")
      : minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0");
  return timeString;
};

export const generateCode = () => Math.floor(100000 + Math.random() * 900000);
export const getRandom = length => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
};

export const makeOtpCode = isArabic => {
  const vfCode = getRandom(4);
  if (IOS) {
    const msg = isArabic
      ? `رمز التعريف: ${vfCode}`
      : `Your verification code is: ${vfCode}`;
    return msg;
  }
  const msg = isArabic
    ? `رمز التعريف: ${vfCode}\n${RELEASE_SMS_RETRIVER_CODE}`
    : `<#> Your verification code is: ${vfCode}\n${RELEASE_SMS_RETRIVER_CODE}`;
  return {
    msg,
    vfCode
  };
};
