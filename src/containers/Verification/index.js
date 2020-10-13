import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import styles from "./styles";
import { convertSecondstoTime, generateCode } from "../../common/functions";
import { theme } from "../../common/colors";
import { ANDROID, ARABIC } from "../../common/constants";
import Header from "../../components/Header";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../../redux/actions/user";

let _interval = null;

export default () => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [disabled, setDisabled] = useState(false);
  const navigation = useNavigation();
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
    timerHandler();
  }, []);

  const handleVerification = () => {
    if (params && params.phone) {
      // Save this after verification
      dispatch(
        saveUserData({
          isVerify: true,
          phone: params.phone
        })
      );
      setTimeout(() => {
        if (params?.animateButton) {
          params.animateButton();
        }
        handleBack();
      }, 100);
    }
  };

  const handleResend = () => {
    timerHandler();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const timerHandler = () => {
    setDisabled(true);
    _interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer => timer - 1);
      } else {
        clearInterval(_interval);
        setTimer(0);
        setDisabled(false);
      }
    }, 1000);
    setTimeout(() => {
      setCode("567589");
      // setCode(generateCode().toString());
    }, 1500);
  };

  const handleWrongNumber = () => {
    if (params?.focusInput) {
      params.focusInput();
    }
    handleBack();
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          title={isArabic ? "التحقق" : "Verification"}
          titleAlign={isArabic ? "right" : "left"}
        />
        <View style={styles.mainContainer}>
          <View style={styles.descriptionWrapper(isArabic)}>
            <Text style={styles.description(isArabic)}>
              {`${
                isArabic
                  ? "أدخل الرمز المكون من 6 أرقام المرسل إلى"
                  : "Enter the 6-digit code sent to\n"
              }`}
            </Text>
            <View style={styles.secondLineDesc(isArabic)}>
              <Text style={styles.description(isArabic)}>
                {params && params.phone ? params.phone : "-----------"}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleWrongNumber}>
                <Text
                  style={[
                    styles.resend(isArabic),
                    {
                      marginLeft: isArabic ? 0 : 5,
                      marginRight: isArabic ? 5 : 0
                    }
                  ]}
                >
                  {isArabic ? "رقم غير صحيح؟" : "Wrong number?"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <OTPInputView
            code={code}
            pinCount={6}
            autoFocusOnLoad={false}
            style={styles.otpWrapper}
            codeInputFieldStyle={styles.input}
            onCodeChanged={text => setCode(text)}
          />
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              disabled={disabled}
              activeOpacity={0.7}
              style={styles.timer}
              onPress={handleResend}
            >
              <Text
                style={
                  disabled
                    ? { ...styles.timerText(isArabic) }
                    : { ...styles.resend(isArabic) }
                }
              >
                {disabled
                  ? `${
                      isArabic
                        ? ` أعد إرسال رمز التحقق في ${" "}${convertSecondstoTime(
                            timer
                          )}`
                        : `Resend verification code in ${convertSecondstoTime(
                            timer
                          )}`
                    }`
                  : isArabic
                  ? "إعادة التحقق"
                  : "Resend Verification"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={handleVerification}
            >
              <Text style={styles.btnText(isArabic)}>
                {isArabic ? "تحقق" : "VERIFY"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
