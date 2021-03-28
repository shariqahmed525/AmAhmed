import React, { useEffect } from "react";
import styles from "./styles";
import { useSelector } from "react-redux";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import { ANDROID, ARABIC } from "../../common/constants";
import { View, Text, StatusBar, ScrollView } from "react-native";

let _isMounted = false;

export default () => {
  const navigation = useNavigation();
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
    }
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "معلومات عم احمد" : "About AmAhmed"}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer(isArabic)}>
          <View style={styles.imageWrapper}>
            <FastImage
              style={styles.image}
              resizeMode={FastImage.resizeMode.contain}
              source={require("../../../assets/images/logo.png")}
            />
          </View>
          {/* <Text style={styles.text(isArabic, 20, "center")}>
            {isArabic
              ? " نلاحظ أن الهندسة التي يتم إجراؤها تبدو وكأنها طاردة وخطورة شبيهة بالحيوية ، وألام قيسم بياتي. من السهل جدًا ."
              : "AmAhmed provides you with your daily needs of fresh quality fruits and vegetables at the comfort of your doorstep."}
          </Text>
          <Text style={styles.text(isArabic, 20, isArabic ? "right" : "left")}>
            {isArabic
              ? " نلاحظ أن الهندسة التي يتم إجراؤها تبدو وكأنها طاردة وخطورة شبيهة بالحيوية ، وألام قيسم بياتي. من السهل جدًا ."
              : "We, as a company, have many years of experience in dealing with (goat & meat), (fruits & vegetables). Our staff is very well trained in selecting and packing your meats, fruits and vegetables. You will shop more once you tried our products!"}
          </Text>
          <Text style={styles.text(isArabic, 20, isArabic ? "right" : "left")}>
            {isArabic
              ? " نلاحظ أن الهندسة التي يتم إجراؤها تبدو وكأنها طاردة وخطورة شبيهة بالحيوية ، وألام قيسم بياتي. من السهل جدًا ."
              : "Our promise is to bring you the freshest produce available with the most affordable prices."}
          </Text>
          <Text style={styles.text(isArabic, 20, isArabic ? "right" : "left")}>
            {isArabic
              ? " نلاحظ أن الهندسة التي يتم إجراؤها تبدو وكأنها طاردة وخطورة شبيهة بالحيوية ، وألام قيسم بياتي. من السهل جدًا ."
              : "We can always be reached out with comments, questions or suggestions. We love hearing from our customers to improve our service as possible."}
          </Text> */}

          {/* <Text
            style={styles.heading(
              isArabic,
              isArabic ? 20 : 25,
              isArabic ? 5 : 25,
              "center",
              isArabic ? 32 : 30
            )}
          >
            {isArabic ? "من نحن" : "WHO WE ARE"}
          </Text> */}
          <Text
            style={styles.heading(
              isArabic,
              isArabic ? 20 : 30,
              isArabic ? 5 : 10,
              "center",
              28
            )}
          >
            {isArabic ? "من نحن" : "WHO WE ARE"}
          </Text>
          <Text style={styles.text(isArabic, 20, "center")}>
            {isArabic
              ? "تطبيق عم احمد يعتبر احد الخدمات التسويقية التي أطلقتها شركة التيسير الماسي للتطوير والاستثمار التجاري وهي شركة سعودية متخصصة في مجال استيراد المواشي وتربيتها ولديها العديد من الأنشطة الأخرى."
              : "AmAhmed's application is considered one of the marketing services launched by Al-Tayseer Al-Masi Company for Development and Commercial Investment, a Saudi company specialized in the field of livestock import and breeding, and it has many other activities."}
          </Text>
          <Text
            style={styles.heading(
              isArabic,
              isArabic ? 30 : 35,
              isArabic ? 5 : 15,
              "center",
              28
            )}
          >
            {isArabic ? "اللحوم و الفواكه والخضروات" : "Meat, Fruits and Vegetables"}
          </Text>
          <Text style={styles.text(isArabic, 20, "center")}>
            {isArabic
              ? "نقوم بالعمل على أدق التفاصيل من ناحية الجودة والنوعية والنظافة وتقديم منتج منافس لكسب ثقة عملائنا."
              : "We work on the smallest details in terms of quality, quality and cleanliness and provide a competitive product to win the confidence of our customers."}
          </Text>
          <Text
            style={styles.heading(
              isArabic,
              isArabic ? 30 : 30,
              isArabic ? 0 : 10,
              "center",
              28
            )}
          >
            {isArabic ? "خدماتنا" : "Our Services"}
          </Text>
          <Text style={styles.text(isArabic, 20, "center")}>
            {isArabic
              ? "لا تقتصر خدماتنا فقط على تقديم الخدمات فقط للمنازل حيث بإمكاننا التوريد لشركات الإعاشة والمطاعم والمناسبات."
              : "Our services are not limited to providing services only to homes, as we can supply to catering companies, restaurants and events."}
          </Text>
          {/* <Text
            style={styles.heading(
              isArabic,
              isArabic ? 20 : 30,
              0,
              isArabic ? "right" : "left",
              isArabic ? 28 : 22
            )}
          >
            {isArabic
              ? "ضمان الجودة والجودة لدينا"
              : "OUR QUALITY AND FRESHNESS GUARANTEE"}
          </Text>
          <Text
            style={styles.text(isArabic, 20, isArabic ? "right" : "left", 30)}
          >
            {isArabic
              ? "نحن نضمن أعلى جودة للمنتجات التي نبيعها. نحن صعب الإرضاء مثلك يمكنك الوثوق بموظفينا المدربين لاختيار الفواكه والخضروات كما تريد."
              : "We guarantee the highest quality of the products we sell. We are as picky as you are. You can trust our trained staff for choosing your goats, meat, fruits and vegetables as you would."}
          </Text> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
