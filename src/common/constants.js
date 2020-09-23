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

export const SLIDER_IMAGES = [
  require("../../assets/images/sliders/1.jpeg"),
  require("../../assets/images/sliders/2.jpeg"),
  require("../../assets/images/sliders/3.jpeg"),
  require("../../assets/images/sliders/4.jpeg"),
  require("../../assets/images/sliders/6.jpeg"),
  require("../../assets/images/sliders/7.jpeg")
];

const GOATS_ITEMS = [
  {
    id: "1",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الماعز" : "Goat"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/g1.jpeg")
  },
  {
    id: "2",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الأغنام" : "Sheeps"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/g3.jpeg")
  },
  {
    id: "3",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الماعز" : "Goat"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/g5.jpeg")
  },
  {
    id: "4",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الأغنام" : "Sheeps"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/g6.jpeg")
  },
  {
    id: "5",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الماعز" : "Goat"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/g8.jpeg")
  },
  {
    id: "6",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الأغنام" : "Sheeps"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/g9.jpeg")
  }
];

const MEAT_ITEMS = [
  {
    id: "7",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "اللحوم" : "MEATS"),
    name: isArabic => (isArabic ? "لحم الضأن" : "Mutton"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/m1.jpeg")
  },
  {
    id: "8",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "اللحوم" : "MEATS"),
    name: isArabic => (isArabic ? "لحم بقري" : "Beef"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/m2.jpeg")
  },
  {
    id: "9",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "اللحوم" : "MEATS"),
    name: isArabic => (isArabic ? "لحم الضأن" : "Mutton"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/m3.jpeg")
  },
  {
    id: "10",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "اللحوم" : "MEATS"),
    name: isArabic => (isArabic ? "لحم بقري" : "Beef"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/m4.jpeg")
  },
  {
    id: "11",
    category: "g/s",
    subcategory: isArabic => (isArabic ? "اللحوم" : "MEATS"),
    name: isArabic => (isArabic ? "لحم الضأن" : "Mutton"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/m5.jpeg")
  }
];

const VEGETABLES_ITEMS = [
  {
    id: "12",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "خضروات" : "VEGETABLES"),
    name: isArabic => (isArabic ? "حبوب ذرة" : "Corn"),
    price: 20.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/v1.jpeg")
  },
  {
    id: "13",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "خضروات" : "VEGETABLES"),
    name: isArabic => (isArabic ? "طماطم" : "Tomato"),
    price: 30.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/v2.jpeg")
  },
  {
    id: "14",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "خضروات" : "VEGETABLES"),
    name: isArabic => (isArabic ? "ثوم" : "Garlic"),
    price: 40.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/v3.jpeg")
  },
  {
    id: "15",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "خضروات" : "VEGETABLES"),
    name: isArabic => (isArabic ? "كالكوت" : "Calçot"),
    price: 15.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/v4.jpeg")
  },
  {
    id: "16",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "خضروات" : "VEGETABLES"),
    name: isArabic => (isArabic ? "الفليفلة" : "Capsicum"),
    price: 25.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/v5.jpeg")
  }
];

const FRUITS_ITEMS = [
  {
    id: "17",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الفواكه" : "FRUITS"),
    name: isArabic => (isArabic ? "العنب" : "Grapes"),
    price: 200.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/f1.jpeg")
  },
  {
    id: "18",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الفواكه" : "VEGETABLES"),
    name: isArabic => (isArabic ? "البطيخ" : "Watermelon"),
    price: 130.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/f2.jpeg")
  },
  {
    id: "19",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الفواكه" : "VEGETABLES"),
    name: isArabic => (isArabic ? "تفاحة" : "Apple"),
    price: 340.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كيلو" : "Kilo"),
    image: require("../../assets/images/items/f3.jpeg")
  }
];

const OTHER_ITEMS = [
  {
    id: "20",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الآخرين" : "Others"),
    name: isArabic => (isArabic ? "كنور" : "Knorr"),
    price: 180.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "رزمة" : "Pack"),
    image: require("../../assets/images/items/o1.jpeg")
  },
  {
    id: "21",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الآخرين" : "Others"),
    name: isArabic => (isArabic ? "زيت الطهي" : "Cooking Oil"),
    price: 450.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "زجاجة" : "Bottle"),
    image: require("../../assets/images/items/o2.jpeg")
  },
  {
    id: "22",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الآخرين" : "Others"),
    name: isArabic =>
      isArabic ? "مربى الفراولة فيتا" : "Vitac Strawberry Jam",
    price: 340.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "450g" : "450g"),
    image: require("../../assets/images/items/o3.jpeg")
  }
];

const DRINKS_ITEMS = [
  {
    id: "23",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "مشروبات" : "DRINKS"),
    name: isArabic => (isArabic ? "سيفين أب" : "7up"),
    price: 20.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كين" : "Can"),
    image: require("../../assets/images/items/d1.jpeg")
  },
  {
    id: "24",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "مشروبات" : "DRINKS"),
    name: isArabic => (isArabic ? "بيريل" : "Birell"),
    price: 30.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كين" : "Can"),
    image: require("../../assets/images/items/d2.jpeg")
  },
  {
    id: "25",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "مشروبات" : "DRINKS"),
    name: isArabic => (isArabic ? "شويبس" : "Schweppes"),
    price: 40.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كين" : "Can"),
    image: require("../../assets/images/items/d3.jpeg")
  },
  {
    id: "26",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "مشروبات" : "DRINKS"),
    name: isArabic => (isArabic ? "راني" : "Rani"),
    price: 35.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كين" : "Can"),
    image: require("../../assets/images/items/d4.jpeg")
  },
  {
    id: "27",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "مشروبات" : "DRINKS"),
    name: isArabic => (isArabic ? "بيبسي" : "Pepsi"),
    price: 25.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "كين" : "Can"),
    image: require("../../assets/images/items/d6.jpeg")
  }
];

const DAIRY_EGGS_ITEMS = [
  {
    id: "28",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الألبان والبيض" : "DAIRY & EGGS"),
    name: isArabic => (isArabic ? "حليب الفراولة" : "Strawberry milk"),
    price: 20.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "قطعة" : "Piece"),
    image: require("../../assets/images/items/d&e1.jpeg")
  },
  {
    id: "29",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الألبان والبيض" : "DAIRY & EGGS"),
    name: isArabic => (isArabic ? "حليب موز" : "Banana milk"),
    price: 30.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "قطعة" : "Piece"),
    image: require("../../assets/images/items/d&e2.jpeg")
  },
  {
    id: "30",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الألبان والبيض" : "DAIRY & EGGS"),
    name: isArabic => (isArabic ? "حلوى" : "Halwi"),
    price: 40.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "قطعة" : "Piece"),
    image: require("../../assets/images/items/d&e3.jpeg")
  },
  {
    id: "31",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الألبان والبيض" : "DAIRY & EGGS"),
    name: isArabic => (isArabic ? "حليب" : "Haleeb"),
    price: 35.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "قطعة" : "Piece"),
    image: require("../../assets/images/items/d&e4.jpeg")
  },
  {
    id: "32",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الألبان والبيض" : "DAIRY & EGGS"),
    name: isArabic => (isArabic ? "بيض" : "Eggs"),
    price: 18.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "دزينة" : "Dozen"),
    image: require("../../assets/images/items/d&e5.jpeg")
  },
  {
    id: "33",
    category: "v/f",
    subcategory: isArabic => (isArabic ? "الألبان والبيض" : "DAIRY & EGGS"),
    name: isArabic => (isArabic ? "زبادي" : "Yogurt"),
    price: 25.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "رزمة" : "Pack"),
    image: require("../../assets/images/items/d&e6.jpeg")
  }
];

export const ITEMS = [
  ...GOATS_ITEMS,
  ...MEAT_ITEMS,
  ...VEGETABLES_ITEMS,
  ...FRUITS_ITEMS,
  ...DAIRY_EGGS_ITEMS,
  ...DRINKS_ITEMS,
  ...OTHER_ITEMS
];
