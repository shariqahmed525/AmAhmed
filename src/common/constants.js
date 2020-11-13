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

export const DEBUG_SMS_RETRIVER_CODE = "mMRYfuE6HNj";
export const RELEASE_SMS_RETRIVER_CODE = "+UDWuAiZExX";
export const UPLOAD_SMS_RETRIVER_CODE = "p6fSjQ27LrD";

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
    nameAr: "بطاقه",
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
    nameAr: "التحويل البنكي",
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

export const DELIVERY_SLOTS = [
  {
    id: "1",
    mainTextAr: "الفترة الأولى",
    mainTextEn: "First Slot-Morning",
    secondaryTextEn: "From 10:00 AM to 02:00 PM",
    secondaryTextAr: "من ١٠:٠٠ صباحا الي ٠٢:٠٠ مساء",
    startTime: "10am",
    endTime: "2pm"
  },
  {
    id: "2",
    mainTextAr: "الفترة الثانية",
    mainTextEn: "Second Slot-Evening",
    secondaryTextEn: "From 05:00 PM to 09:00 PM",
    secondaryTextAr: "من ٠٥:٠٠ مساء  الي ٠٩:٠٠ مساء",
    startTime: "5pm",
    endTime: "9pm"
  }
];
