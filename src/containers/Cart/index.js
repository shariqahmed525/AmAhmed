import React, { useEffect, useState } from "react";
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
import Alert from "../../components/Alert";
import { theme } from "../../common/colors";
import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import { MaterialIcons } from "../../common/icons";
import CartListItem from "../../components/CartListItem";
import { useNavigation } from "@react-navigation/native";
import { ANDROID, ARABIC, ERROR_IMG } from "../../common/constants";

export default () => {
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
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
    if (!cart || cart.length < 1) return 0;
    const makeSumArr = cart.map(val => {
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
      return totalItemCost * val.quantity;
    });
    const sum = makeSumArr.reduce((partialSum, o) => {
      return partialSum + o;
    }, 0);
    return sum;
  };

  const handleCheckout = () => {
    const arr = cart.map(v => {
      if (v?.minOrderQty) {
        const qty = v?.quantity;
        const minQty = v?.minOrderQty;
        if (qty && minQty) {
          return qty >= minQty;
        } else {
          return true;
        }
      } else {
        return true;
      }
    });
    if (arr.every(o => o)) {
      navigation.navigate("Checkout");
    } else {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "عذرا، بعض العناصر لها حد أدنى للكمية"
          : "Sorry, some items have a minimum quantity limit"
      });
    }
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        {header}
        <Alert
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          text={alert.alertText}
          title={alert.alertTitle}
          btnText={isArabic ? "حسنا" : "OK"}
          onBtnPress={alert.btnPress || alertClose}
        />
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
                onPress={handleCheckout}
                style={styles.btn(isArabic)}
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
