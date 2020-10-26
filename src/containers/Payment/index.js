import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  // TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import { ANDROID, ARABIC, IOS } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { CreditCardInput } from "react-native-credit-card-input";

export default ({ route: { params } }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const postalCodeRef = useRef(null);
  // const cardHolderNameRef = useRef(null);
  const [formDetails, setFormDetails] = useState(null);
  // const [postalCode, setPostalCode] = useState("");
  // const [cardHolderName, setCardHolderName] = useState("");
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

  const handlePayment = () => {
    // navigation.goBack();
    // params?.handleCardCallBack &&
    //   params?.handleCardCallBack({ name: "shariq" });
  };

  const handleScanner = () => {};

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={IOS && "padding"}
      >
        <Header
          back
          onBackPress={handleBack}
          title={isArabic ? "دفع" : "Payment"}
          titleAlign={isArabic ? "right" : "left"}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleScanner}
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
          </TouchableOpacity>
          <View style={styles.line} />
          {/* <TextInput
              spellCheck={false}
              autoCorrect={false}
              value={cardHolderName}
              ref={cardHolderNameRef}
              style={styles.input(isArabic)}
              onChangeText={text => setCardHolderName(text)}
              placeholder={
                isArabic
                  ? "الاسم الكامل لحامل البطاقة"
                  : "CARD HOLDER FULL NAME"
              }
            /> */}
          <CreditCardInput
            onChange={handleCardForm}
            inputContainerStyle={{
              borderBottomWidth: 0
            }}
            labelStyle={{
              marginBottom: 10
            }}
            labels={{
              number: "CARD NUMBER",
              expiry: "EXPIRY",
              cvc: "CVV",
              name: "CARDHOLDER'S NAME",
              postalCode: "POSTAL CODE"
            }}
            allowScroll
            requiresName
            requiresPostalCode
            placeholderColor="#C7C7CD"
            cardFontFamily="Rubik-Regular"
            inputStyle={styles.input(isArabic)}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePayment}
            style={styles.btn("100%")}
          >
            <Text style={styles.btnText(isArabic)}>
              {isArabic ? "إضافة بطاقة" : "ADD CARD"}
            </Text>
          </TouchableOpacity>
          {/* <TextInput
              spellCheck={false}
              autoCorrect={false}
              value={postalCode}
              ref={postalCodeRef}
              style={styles.input(isArabic)}
              onChangeText={text => setPostalCode(text)}
              placeholder={isArabic ? "الرمز البريدي" : "POSTAL CODE"}
            /> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
