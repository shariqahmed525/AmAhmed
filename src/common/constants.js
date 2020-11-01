import React from "react";
import { Dimensions, Platform } from "react-native";

import { theme } from "./colors";
import { MaterialCommunityIcons } from "./icons";

// export const BASE_URL = "http://api.amahmed.com";
export const BASE_URL = "https://amahmed.com/api";
export const MAP_API_KEY = "AIzaSyA3X_iki3k_oSwkrDp3zbLeTTKTAnlAX80";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;
export const IOS = Platform.OS === "ios";
export const ANDROID = Platform.OS === "android";
export const CONTAINER_PADDING = WIDTH * 0.07;
export const ARABIC = "ar-sa";
export const ENGLISH = "en";

export const INFO_IMG = require("../../assets/images/info.png");
export const ERROR_IMG = require("../../assets/images/error.png");
export const THUMB_IMG = require("../../assets/images/like.png");
export const THANKS_IMG = require("../../assets/images/thanks.jpg");

export const LANGUAGES = [
  {
    code: ARABIC,
    name: code => (code === ARABIC ? "عربي" : "Arabic"),
    icon: require("../../assets/images/SA-flag.jpg")
  },
  {
    code: ENGLISH,
    name: code => (code === ARABIC ? "الإنجليزية" : "English"),
    icon: require("../../assets/images/UK-flag.jpg")
  }
];

export const payments = [
  {
    id: "p-1",
    nameAr: "الدفع عند الاستلام",
    nameEn: "Cash On Delivery",
    icon: <MaterialCommunityIcons size={27} name="cash" color={theme} />
  },
  {
    id: "p-2",
    nameAr: "بطاقة الائتمان/الخصم",
    nameEn: "Credit/Debit Card",
    icon: (
      <MaterialCommunityIcons
        size={27}
        color={theme}
        name="credit-card-multiple-outline"
      />
    )
  },
  {
    id: "p-3",
    nameAr: "تحویل آن لائن",
    nameEn: "Online Transfer",
    icon: <MaterialCommunityIcons size={27} name="bank" color={theme} />
  }
];

export const TABS = [
  {
    code: "act",
    name: isArabic => (isArabic ? "تيار" : "CURRENT"),
    data: [0, 1, 2, 3, 4, 5, 6, 7]
  },
  {
    code: "pst",
    name: isArabic => (isArabic ? "التاريخ" : "HISTORY"),
    data: [0, 1, 2, 3, 4, 5, 6, 7]
  }
];
