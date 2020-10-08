import React from "react";
import { Dimensions, Platform } from "react-native";

import { theme } from "./colors";
import { Fontisto, MaterialCommunityIcons } from "./icons";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;
export const IOS = Platform.OS === "ios";
export const ANDROID = Platform.OS === "android";
export const CONTAINER_PADDING = WIDTH * 0.07;
export const ARABIC = "ar-sa";
export const ENGLISH = "en";

export const ERROR_IMG = require("../../assets/images/error.png");
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

export const addresses = [
  {
    name: isArabic => (isArabic ? "مكه" : "Makkah"),
    icon: <Fontisto size={20} name="navigate" color={theme} />
  },
  {
    name: isArabic => (isArabic ? "مدينة" : "Madina"),
    icon: <Fontisto size={20} name="navigate" color={theme} />
  },
  {
    name: isArabic => (isArabic ? "جدة" : "Jeddah"),
    icon: <Fontisto size={20} name="navigate" color={theme} />
  },
  {
    name: isArabic => (isArabic ? "رئيسية" : "Home"),
    icon: <Fontisto size={20} name="navigate" color={theme} />
  },
  {
    name: isArabic => (isArabic ? "عمل" : "Work"),
    icon: <Fontisto size={20} name="navigate" color={theme} />
  }
];

export const payments = [
  {
    name: isArabic => (isArabic ? "الدفع عند الاستلام" : "Cash On Delivery"),
    icon: <MaterialCommunityIcons size={27} name="cash" color={theme} />
  },
  {
    name: isArabic =>
      isArabic ? "بطاقة الائتمان / الخصم" : "Credit/Debit Card",
    icon: (
      <MaterialCommunityIcons
        size={27}
        color={theme}
        name="credit-card-multiple-outline"
      />
    )
  }
];

export const markers = [
  {
    name: "Azizyah Store",
    lat: 21.555126,
    lng: 39.194558
  },
  {
    name: "Mishrifah Store",
    lat: 21.540754,
    lng: 39.200643
  },
  {
    name: "Al-Rehab Store",
    lat: 21.549775,
    lng: 39.226393
  },
  {
    name: "Al-Sharafeyah Store",
    lat: 21.524067,
    lng: 39.184507
  },
  {
    name: "Al-Hamara'a Store",
    lat: 21.526862,
    lng: 39.164337
  }
];

const GOATS_ITEMS = [
  {
    id: "1",
    category: "g/s",
    hasCuttingWay: true,
    hasHeadAndLegs: true,
    hasPacking: true,
    description: isArabic =>
      isArabic
        ? "من السهل جدًا أن نلاحظ أن الهندسة المعمارية التي يتم إجراؤها تبدو وكأنها طاردة للعيان ، وخطورة شبيهة بالحيوية ، وألام قيسم بياتي."
        : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab esse eum enim illo maiores architecto obcaecati tenetur incidunt eos quasi repellendus quam, nostrum porro sunt quidem, ullam quisquam beatae quod.",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الماعز" : "Goat"),
    price: 500,
    offerPrice: 300,
    inStock: false,
    quantityType: isArabic => (isArabic ? "وحدة" : "Unit"),
    image: require("../../assets/images/items/g1.jpeg")
  },
  {
    id: "2",
    category: "g/s",
    hasCuttingWay: true,
    hasHeadAndLegs: true,
    hasPacking: true,
    description: isArabic =>
      isArabic
        ? "من السهل جدًا أن نلاحظ أن الهندسة المعمارية التي يتم إجراؤها تبدو وكأنها طاردة للعيان ، وخطورة شبيهة بالحيوية ، وألام قيسم بياتي."
        : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab esse eum enim illo maiores architecto obcaecati tenetur incidunt eos quasi repellendus quam, nostrum porro sunt quidem, ullam quisquam beatae quod.",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الأغنام" : "Sheeps"),
    price: 500.0,
    offerPrice: 220,
    inStock: true,
    quantityType: isArabic => (isArabic ? "وحدة" : "Unit"),
    image: require("../../assets/images/items/g3.jpeg")
  },
  {
    id: "3",
    category: "g/s",
    hasCuttingWay: true,
    hasHeadAndLegs: true,
    hasPacking: true,
    description: isArabic =>
      isArabic
        ? "من السهل جدًا أن نلاحظ أن الهندسة المعمارية التي يتم إجراؤها تبدو وكأنها طاردة للعيان ، وخطورة شبيهة بالحيوية ، وألام قيسم بياتي."
        : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab esse eum enim illo maiores architecto obcaecati tenetur incidunt eos quasi repellendus quam, nostrum porro sunt quidem, ullam quisquam beatae quod.",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الماعز" : "Goat"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "وحدة" : "Unit"),
    image: require("../../assets/images/items/g5.jpeg")
  },
  {
    id: "4",
    category: "g/s",
    hasCuttingWay: true,
    hasHeadAndLegs: true,
    hasPacking: true,
    description: isArabic =>
      isArabic
        ? "من السهل جدًا أن نلاحظ أن الهندسة المعمارية التي يتم إجراؤها تبدو وكأنها طاردة للعيان ، وخطورة شبيهة بالحيوية ، وألام قيسم بياتي."
        : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab esse eum enim illo maiores architecto obcaecati tenetur incidunt eos quasi repellendus quam, nostrum porro sunt quidem, ullam quisquam beatae quod.",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الأغنام" : "Sheeps"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "وحدة" : "Unit"),
    image: require("../../assets/images/items/g6.jpeg")
  },
  {
    id: "5",
    category: "g/s",
    hasCuttingWay: true,
    hasHeadAndLegs: true,
    hasPacking: true,
    description: isArabic =>
      isArabic
        ? "من السهل جدًا أن نلاحظ أن الهندسة المعمارية التي يتم إجراؤها تبدو وكأنها طاردة للعيان ، وخطورة شبيهة بالحيوية ، وألام قيسم بياتي."
        : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab esse eum enim illo maiores architecto obcaecati tenetur incidunt eos quasi repellendus quam, nostrum porro sunt quidem, ullam quisquam beatae quod.",
    subcategory: isArabic => (isArabic ? "الماعز والأغنام" : "GOAT / SHEEPS"),
    name: isArabic => (isArabic ? "الماعز" : "Goat"),
    price: 500.0,
    offerPrice: 0,
    inStock: true,
    quantityType: isArabic => (isArabic ? "وحدة" : "Unit"),
    image: require("../../assets/images/items/g8.jpeg")
  },
  {
    id: "6",
    category: "g/s",
    hasCuttingWay: true,
    hasHeadAndLegs: true,
    hasPacking: true,
    description: isArabic =>
      isArabic
        ? "من السهل جدًا أن نلاحظ أن الهندسة المعمارية التي يتم إجراؤها تبدو وكأنها طاردة للعيان ، وخطورة شبيهة بالحيوية ، وألام قيسم بياتي."
        : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab esse eum enim illo maiores architecto obcaecati tenetur incidunt eos quasi repellendus quam, nostrum porro sunt quidem, ullam quisquam beatae quod.",
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
    description: isArabic =>
      isArabic
        ? "من السهل جدًا أن نلاحظ أن الهندسة المعمارية التي يتم إجراؤها تبدو وكأنها طاردة للعيان ، وخطورة شبيهة بالحيوية ، وألام قيسم بياتي."
        : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab esse eum enim illo maiores architecto obcaecati tenetur incidunt eos quasi repellendus quam, nostrum porro sunt quidem, ullam quisquam beatae quod.",
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
    subcategory: isArabic => (isArabic ? "الفواكه" : "FRUITS"),
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
    subcategory: isArabic => (isArabic ? "الفواكه" : "FRUITS"),
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
    subcategory: isArabic => (isArabic ? "الآخرين" : "OTHERS"),
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
    subcategory: isArabic => (isArabic ? "الآخرين" : "OTHERS"),
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
    subcategory: isArabic => (isArabic ? "الآخرين" : "OTHERS"),
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

export const CUTTINGWAY = [
  {
    id: 1,
    price: 0,
    name: isArabic => (isArabic ? "خروف كامل" : "Full Sheep")
  },
  {
    id: 2,
    price: 10,
    name: isArabic => (isArabic ? "أنصاف" : "Halves")
  },
  {
    id: 3,
    price: 20,
    name: isArabic => (isArabic ? "ربع" : "Quarter")
  },
  {
    id: 4,
    price: 30,
    name: isArabic => (isArabic ? "قطع صغيرة" : "Small Pieces")
  }
];

export const HEAD_AND_LEGS = [
  {
    id: 1,
    price: 0,
    name: isArabic => (isArabic ? "غير مطلوب" : "Not Required")
  },
  {
    id: 2,
    price: 0,
    name: isArabic => (isArabic ? "مع الرأس والساقين" : "With Head & Legs")
  },
  {
    id: 3,
    price: 0,
    name: isArabic => (isArabic ? "بدون الرأس والساقين" : "Without Head & Legs")
  }
];

export const PACKING = [
  {
    id: 1,
    price: 20,
    name: isArabic =>
      isArabic ? "حقيبة عادية بدون تغليف" : "Normal Bag Without Packing"
  },
  {
    id: 2,
    price: 40,
    name: isArabic => (isArabic ? "أطباق بلاستيكية" : "Plastic Plates")
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

export const GOAT_MEAT_SLIDERS = [
  require("../../assets/images/sliders/g1.jpeg"),
  require("../../assets/images/sliders/g2.jpeg"),
  require("../../assets/images/sliders/g3.jpeg"),
  require("../../assets/images/sliders/g4.jpeg"),
  require("../../assets/images/sliders/m1.jpeg"),
  require("../../assets/images/sliders/m2.jpeg"),
  require("../../assets/images/sliders/m3.jpeg")
];

export const VEGETABLES_FRUITS_SLIDER = [
  require("../../assets/images/sliders/v1.jpg"),
  require("../../assets/images/sliders/v2.jpeg"),
  require("../../assets/images/sliders/v3.jpeg"),
  require("../../assets/images/sliders/v4.jpeg"),
  require("../../assets/images/sliders/v6.jpeg"),
  require("../../assets/images/sliders/v7.jpeg")
];

export const MAP_API_KEY = "AIzaSyA3X_iki3k_oSwkrDp3zbLeTTKTAnlAX80";
