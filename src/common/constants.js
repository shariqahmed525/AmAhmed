import { Dimensions, Platform } from "react-native";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;
export const IOS = Platform.OS === "ios";
export const ANDROID = Platform.OS === "android";
export const CONTAINER_PADDING = WIDTH * 0.07;
export const ARABIC = "ar-sa";
export const ENGLISH = "en";

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

export const CITIES = [
  {
    code: "madina",
    name: isArabic => (isArabic ? "مدينة المنورة" : "MADINAH MUNAWWARAH"),
    icon: require("../../assets/images/madina.jpeg")
  },
  {
    code: "makkah",
    name: isArabic => (isArabic ? "مكة المكرمة" : "MAKKAH MUKARRAMAH"),
    icon: require("../../assets/images/makkah.jpg")
  },
  {
    code: "jeddah",
    name: isArabic => (isArabic ? "جدة‎" : "JEDDAH"),
    icon: require("../../assets/images/jeddah.jpeg")
  }
];

export const CATEGORIES = [
  {
    code: "g/s",
    name: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    icon: require("../../assets/images/sheep.jpg")
  },
  {
    code: "v/f",
    name: isArabic => (isArabic ? "الخضروات والفواكه‎" : "VEGETABLES & FRUITS"),
    icon: require("../../assets/images/vegetables.jpeg")
  }
];
