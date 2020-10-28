import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import styles from "./styles";
import { useSelector } from "react-redux";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
// import Cardscan from "react-native-cardscan";
import { black, theme } from "../../common/colors";
import { CreditCardInput } from "react-native-credit-card-input";
import { ANDROID, ARABIC, IOS, ERROR_IMG, WIDTH } from "../../common/constants";

export default ({ route: { params } }) => {
  const postalCodeRef = useRef();
  const cardHolderNameRef = useRef();
  const navigation = useNavigation();
  // const [postalCode, setPostalCode] = useState("");
  const [formDetails, setFormDetails] = useState(null);
  const [cardHolderName, setCardHolderName] = useState("");
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCardForm = form => {
    setFormDetails({ ...form });
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  const handlePayment = details => {
    if (!formDetails) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "يجب أن تكون تفاصيل البطاقة مطلوبة"
          : "Card details must be required"
      });
      return;
    }
    if (!formDetails?.valid) {
      if (formDetails?.status) {
        const { number, cvc, expiry } = formDetails?.status;
        if (number === "incomplete" || number === "invalid") {
          setAlert({
            alert: true,
            error: true,
            alertImg: ERROR_IMG,
            alertTitle: isArabic ? "خطأ" : "Error",
            alertText:
              number === "incomplete"
                ? isArabic
                  ? "رقم البطاقة غير مكتمل"
                  : "Incomplete card number"
                : isArabic
                ? "رقم البطاقة غير صالحة"
                : "Invalid card number"
          });
        } else if (expiry === "incomplete" || expiry === "invalid") {
          setAlert({
            alert: true,
            error: true,
            alertImg: ERROR_IMG,
            alertTitle: isArabic ? "خطأ" : "Error",
            alertText:
              expiry === "incomplete"
                ? isArabic
                  ? "تاريخ انتهاء الصلاحية غير مكتمل"
                  : "Incomplete expiry date"
                : isArabic
                ? "تاريخ انتهاء الصلاحية غير صالح"
                : "Invalid expiry date"
          });
        } else if (cvc === "incomplete" || cvc === "invalid") {
          setAlert({
            alert: true,
            error: true,
            alertImg: ERROR_IMG,
            alertTitle: isArabic ? "خطأ" : "Error",
            alertText:
              cvc === "incomplete"
                ? isArabic
                  ? "رقم كود غير مكتمل"
                  : "Incomplete CVV number"
                : isArabic
                ? "رقم كود غير صالح"
                : "Invalid CVV number"
          });
        }
      } else {
        setAlert({
          alert: true,
          error: true,
          alertImg: ERROR_IMG,
          alertTitle: isArabic ? "خطأ" : "Error",
          alertText: isArabic
            ? "تفاصيل البطاقة غير صحيحة"
            : "Invalid card details"
        });
      }
      return;
    }
    const trimeCardHolderName = cardHolderName.trim();
    // const trimPostalCode = postalCode.trim();
    if (!trimeCardHolderName) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء إدخال اسم صاحب البطاقة"
          : "Please enter the card holder's name"
      });
      return;
    }
    // if (!trimPostalCode) {
    //   setAlert({
    //     alert: true,
    //     error: true,
    //     alertImg: ERROR_IMG,
    //     alertTitle: isArabic ? "خطأ" : "Error",
    //     alertText: isArabic
    //       ? "الرجاء إدخال الرمز البريدي"
    //       : "Please enter the postal code"
    //   });
    //   return;
    // }
    const { number, cvc, expiry } = formDetails?.values;
    const obj = {
      expiry,
      cvv: cvc,
      cardNumber: number,
      // postalCode: trimPostalCode,
      cardHolderName: trimeCardHolderName
    };
    navigation.goBack();
    params?.handleCardCallBack &&
      params?.handleCardCallBack(details || obj, "mn");
  };

  // const handleScanCard = () => {
  //   Cardscan.isSupportedAsync().then(supported => {
  //     if (supported) {
  //       cardScan();
  //     } else {
  //       setAlert({
  //         alert: true,
  //         error: true,
  //         alertImg: ERROR_IMG,
  //         alertTitle: isArabic ? "خطأ" : "Error",
  //         alertText: isArabic
  //           ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
  //           : "Sorry, something went wrong. Please try again!"
  //       });
  //     }
  //   });
  // };

  // const cardScan = () => {
  //   Cardscan.scan().then(({ action, payload, canceled_reason }) => {
  //     if (action === "scanned") {
  //       const { number, expiryMonth, expiryYear } = payload;
  //       if (number && expiryMonth && expiryYear) {
  //         handlePayment(payload, "scan");
  //       }
  //       console.log(payload, " card object");
  //     } else if (action === "canceled") {
  //       if (canceled_reason === "enter_card_manually") {
  //         // the user elected to enter a card manually
  //       } else if (canceled_reason === "camera_error") {
  //         // there was an error with the camera
  //       } else if (canceled_reason === "fatal_error") {
  //         // there was an error during the scan
  //       } else if (canceled_reason === "user_canceled") {
  //         // the user canceled the scan
  //       } else {
  //         // the scan was canceled for an unknown reason
  //       }
  //       setAlert({
  //         alert: true,
  //         error: true,
  //         alertImg: ERROR_IMG,
  //         alertTitle: isArabic ? "خطأ" : "Error",
  //         alertText: isArabic
  //           ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
  //           : "Sorry, something went wrong. Please try again!"
  //       });
  //     } else if (action === "skipped") {
  //       // User skipped
  //       setAlert({
  //         alert: true,
  //         error: true,
  //         alertImg: ERROR_IMG,
  //         alertTitle: isArabic ? "خطأ" : "Error",
  //         alertText: isArabic
  //           ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
  //           : "Sorry, something went wrong. Please try again!"
  //       });
  //     } else if (action === "unknown") {
  //       // Unknown reason for scan canceled
  //       setAlert({
  //         alert: true,
  //         error: true,
  //         alertImg: ERROR_IMG,
  //         alertTitle: isArabic ? "خطأ" : "Error",
  //         alertText: isArabic
  //           ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
  //           : "Sorry, something went wrong. Please try again!"
  //       });
  //     }
  //   });
  // };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={IOS && "padding"}>
      <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
        <Header
          back
          onBackPress={handleBack}
          title={isArabic ? "دفع" : "Payment"}
          titleAlign={isArabic ? "right" : "left"}
        />
        <Alert
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          text={alert.alertText}
          onBtnPress={alertClose}
          title={alert.alertTitle}
          btnText={isArabic ? "حسنا" : "OK"}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleScanCard}
            style={styles.scannerWrapper}
          >
            <Image
              resizeMode="contain"
              style={styles.scannerImg}
              source={require("../../../assets/images/scanner.png")}
            />
            <Text style={styles.scannerText(isArabic)}>
              {isArabic ? "امسح بطاقتك ضوئيًا" : "Scan your card"}
            </Text>
          </TouchableOpacity> */}
          {/* <View style={styles.line} /> */}
          <View style={{ marginBottom: 20 }}>
            <CreditCardInput
              onChange={handleCardForm}
              inputContainerStyle={{
                borderBottomWidth: 0
              }}
              labelStyle={{
                ...styles.label(isArabic),
                marginLeft: 0,
                marginRight: 0
              }}
              labels={{
                number: isArabic ? "رقم البطاقة" : "CARD NUMBER",
                expiry: isArabic ? "انقضاء" : "EXPIRY",
                cvc: "CVV"
              }}
              placeholders={{
                cvc: "CVV",
                expiry: "MM/YY",
                number: "1234 5678 1234 5678"
              }}
              allowScroll
              placeholderColor="#C7C7CD"
              cardFontFamily="Rubik-Regular"
              inputStyle={styles.input(isArabic)}
            />
          </View>
          <Text style={styles.label(isArabic)}>
            {isArabic ? "اسم حامل البطاقة" : "CARD HOLDER'S NAME"}
          </Text>
          <TextInput
            spellCheck={false}
            autoCorrect={false}
            value={cardHolderName}
            ref={cardHolderNameRef}
            style={{
              ...styles.input(isArabic),
              marginBottom: 20,
              width: WIDTH - 60,
              alignSelf: "center"
            }}
            placeholderTextColor="#C7C7CD"
            onChangeText={text => setCardHolderName(text)}
            placeholder={
              isArabic ? "الاسم الكامل لحامل البطاقة" : "Card Holder Full Name"
            }
          />
          {/* <Text style={styles.label(isArabic)}>
            {isArabic ? "الرمز البريدي" : "POSTAL CODE"}
          </Text>
          <TextInput
            spellCheck={false}
            autoCorrect={false}
            value={postalCode}
            ref={postalCodeRef}
            placeholderTextColor="#C7C7CD"
            style={{
              ...styles.input(isArabic),
              width: WIDTH - 60,
              alignSelf: "center"
            }}
            onChangeText={text => setPostalCode(text)}
            placeholder={isArabic ? "الرمز البريدي" : "Postal Code"}
          /> */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handlePayment()}
            style={styles.btn(WIDTH - 60)}
          >
            <Text style={styles.btnText(isArabic)}>
              {isArabic ? "إضافة بطاقة" : "ADD CARD"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
