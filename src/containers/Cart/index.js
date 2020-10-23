import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-navigation";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";

import styles from "./styles";
import { theme } from "../../common/colors";
import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import { MaterialIcons } from "../../common/icons";
import CartListItem from "../../components/CartListItem";
import { useNavigation } from "@react-navigation/native";
import { ANDROID, ARABIC, WIDTH } from "../../common/constants";

export default () => {
  const {
    app: { language },
    user: { cart }
  } = useSelector(state => state);
  const navigation = useNavigation();
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const header = (
    <Header
      titleHeight={55}
      titleColor={"#fff"}
      titleFontSize={isArabic ? 28 : 30}
      headerStyle={styles.header(isArabic)}
      titleAlign={isArabic ? "right" : "left"}
      titleFontFamily={isArabic ? "Cairo-Bold" : "Rubik-SemiBold"}
      title={
        isArabic
          ? `العربة ${cart && cart.length > 0 ? `(${cart.length})` : ""}`
          : `Cart ${cart && cart.length > 0 ? `(${cart.length})` : ""}`
      }
    />
  );

  const total = () => {
    const sum = cart.reduce((partialSum, val) => {
      const pp = val?.discount > 0 ? val?.discount : val?.price;
      const cuttingWayPrice =
        val?.hasCuttingWay && val?.cuttingWay && val?.cuttingWay?.cost
          ? val?.cuttingWay?.cost
          : 0;
      const headAndLegsPrice =
        val?.hasHeadAndLegs && val?.headAndLeg && val?.headAndLeg?.cost
          ? val?.headAndLeg?.cost
          : 0;
      const packingPrice =
        val?.hasPacking && val?.packing && val?.packing?.cost
          ? val?.packing?.cost
          : 0;
      const totalItemCost =
        pp + cuttingWayPrice + headAndLegsPrice + packingPrice;
      return partialSum + totalItemCost;
    }, 0);
    return sum;
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        {header}
        {cart && cart.length > 0 ? (
          <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {cart.map((v, i) => (
                <CartListItem key={i} item={v} isArabic={isArabic} />
              ))}
            </ScrollView>
            <View style={styles.footer(isArabic)}>
              <View style={styles.total}>
                <Text style={styles.totalText(isArabic)}>
                  {isArabic ? "مجموع" : "TOTAL"}
                </Text>
                <Text style={styles.totalPrice(isArabic)}>
                  {!isArabic && (
                    <Text style={styles.totalSign(isArabic)}>SAR </Text>
                  )}
                  {total()}
                  {isArabic && (
                    <Text style={styles.totalSign(isArabic)}>ر.س </Text>
                  )}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn(isArabic)}
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text style={styles.btnText(isArabic)}>
                  {isArabic ? "الدفع" : "CHECKOUT"}
                </Text>
                <View style={styles.rotateIcon(isArabic)}>
                  <MaterialIcons
                    size={35}
                    color={"#fff"}
                    name="arrow-right-alt"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyWrapper}>
            <LottieView
              loop
              autoPlay
              style={{ width: 200, height: 200 }}
              source={require("../../../assets/animations/emptycart.json")}
            />
            <Text style={styles.emptyText(isArabic)}>
              {isArabic ? "فارغة" : "Empty"}
            </Text>
            <Text style={styles.emptySubText(isArabic)}>
              {isArabic ? "العربة فارغة" : "The cart is empty"}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
