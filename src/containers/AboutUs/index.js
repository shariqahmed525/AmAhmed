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
          <Text style={styles.text(isArabic, 20, "center")}>
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
          </Text>

          <Text
            style={styles.heading(
              isArabic,
              isArabic ? 20 : 25,
              isArabic ? 10 : 25,
              "center",
              isArabic ? 32 : 30
            )}
          >
            {isArabic ? "لماذا نحن" : "WHY US"}
          </Text>
          <Text
            style={styles.heading(
              isArabic,
              5,
              0,
              isArabic ? "right" : "left",
              isArabic ? 28 : 22
            )}
          >
            {isArabic ? "راحة كبيرة" : "GREAT CONVENIENCE"}
          </Text>
          <Text style={styles.text(isArabic, 20, isArabic ? "right" : "left")}>
            {isArabic
              ? "نفكر في الراحة التي تختارها. التسوق عبر الإنترنت مريح وخالٍ من المتاعب وسريع وسهل وموفر للمال. علاوة على ذلك ، يمكنك البحث في موقعنا إذا كنت تعرف بالضبط ما تبحث عنه أو تستخدم مجموعة من الفلاتر المختلفة التي ستوفر وقتك وجهودك بشكل كبير."
              : "We think about the convenience of your choice. Online shopping is convenient, hassle-free, and offers fast, easy, and money-saving. What’s more, you can search our site if you know exactly what you are looking for or use a bunch of different filters that will considerably save your time and efforts."}
          </Text>
          <Text
            style={styles.heading(
              isArabic,
              isArabic ? 20 : 30,
              0,
              isArabic ? "right" : "left",
              isArabic ? 28 : 22
            )}
          >
            {isArabic ? "افضل اسعار" : "BETTER PRICES"}
          </Text>
          <Text style={styles.text(isArabic, 20, isArabic ? "right" : "left")}>
            {isArabic
              ? "نحن نقدم الفواكه والخضروات بأسعار أفضل مما ستجده في أي مكان آخر."
              : "We offer fruits and vegetables at better prices than what you will find anywhere else."}
          </Text>
          <Text
            style={styles.heading(
              isArabic,
              isArabic ? 20 : 30,
              0,
              isArabic ? "right" : "left",
              isArabic ? 28 : 22
            )}
          >
            {isArabic ? "ردفعل سريع" : "FAST RESPONSE"}
          </Text>
          <Text style={styles.text(isArabic, 20, isArabic ? "right" : "left")}>
            {isArabic
              ? "نقوم بتسليم بضائعنا إلى مكانك. بغض النظر عن المكان الذي تعيش فيه ، سيتم شحن طلبك في الوقت المناسب وتسليمه مباشرة إلى باب منزلك أو إلى أي مكان آخر ذكرته. يتم التعامل مع العبوات الطازجة بعناية فائقة ، لذلك سيتم تسليم المنتجات المطلوبة إليك بأمان وسليمة ، تمامًا كما تتوقعها. يعمل فريقنا يوميًا من الساعة 9 صباحًا حتى 9 مساءً لتلبية توقعاتك. يمكنك اختيار وقت التسليم المفضل لديك بين أربع فترات زمنية يوميًا ، وسيتم توصيله إلى باب منزلك."
              : "We deliver our goods to your place. No matter where you live, your order will be shipped in time and delivered right to your door or to any other location you have stated. The fresh packages are handled with the utmost care, so the ordered products will be handed to you safely and sound, just like you expect them to be. Our team is working every day from 9 am to 9 pm to meet your expectations. You can choose your preferred delivery time between a daily four time slots, and it will be delivered to your doorstep."}
          </Text>
          <Text
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
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
