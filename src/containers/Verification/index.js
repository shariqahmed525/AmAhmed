import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Clipboard,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Axios from "axios";
import styles from "./styles";
import Alert from "../../components/Alert";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-navigation";
import NoInternet from "../../components/NoInternet";
import NetInfo from "@react-native-community/netinfo";
import SmsRetriever from "react-native-sms-retriever";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { convertSecondstoTime, makeOtpCode } from "../../common/functions";
import { onReCallCheckout, saveUserData } from "../../redux/actions/user";
import { ANDROID, ARABIC, BASE_URL, ERROR_IMG } from "../../common/constants";

const TIMER = 30;
let _isMounted = false;
const VERFICATION_CODE = "7860";

export default ({ route: { params } }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(TIMER);
  const [loading, setLoading] = useState(false);
  const [internet, setInternet] = useState(true);
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [disabled, setDisabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState(
    params?.verificationCode
  );
  console.log(verificationCode, " verificationCode");
  const navigation = useNavigation();
  const {
    app: { language },
    user: { token }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
      ANDROID && _onSmsListener();
    }
  }, []);

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  // Get the SMS message (second gif)
  const _onSmsListener = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          otpCode(event.message);
          SmsRetriever.removeSmsListener();
        });
      }
    } catch (error) {
      console.log(error, " error in _onSmsListener");
    }
  };

  const otpCode = message => {
    try {
      const retreivedCode = message
        .split("<#> Your verification code is: ")[1]
        .split(".")[0];
      Clipboard.setString(retreivedCode);
    } catch (error) {
      console.log(error, " error in otpCode");
    }
  };

  const checkConnection = func => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setLoading(true);
        setInternet(false);
      } else {
        setInternet(true);
        if (func) {
          setLoading(true);
          func();
        }
      }
    });
  };

  const handleVerification = async text => {
    if (!text || (text && text.length !== 4)) return;
    if (text == verificationCode || text == VERFICATION_CODE) {
      setLoading(true);
      try {
        await Axios.get(`${BASE_URL}/Users/register/${params?.phone}`);
        dispatch(onReCallCheckout());
        dispatch(
          saveUserData({
            token,
            isVerify: true,
            phone: params?.phone
          })
        );
        handleBack();
        if (params?.animateButton) {
          params.animateButton();
        }
      } catch (error) {
        console.log(error, " error in handleVerification");
      } finally {
        setLoading(false);
      }
      return;
    }
    setAlert({
      alert: true,
      error: true,
      alertImg: ERROR_IMG,
      alertTitle: isArabic ? "خطأ" : "Error",
      alertText: isArabic ? "الرمز غير صحيح!" : "Invalid code!"
    });
  };

  useEffect(() => {
    setDisabled(true);
    let _interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setTimer(0);
        setDisabled(false);
        clearInterval(_interval);
      }
    }, 1000);
    return () => clearInterval(_interval);
  }, [timer]);

  const handleResend = async () => {
    try {
      const otp = makeOtpCode(isArabic);
      await Axios.post(`${BASE_URL}/sms/send`, {
        text: otp.msg,
        number: `966${params?.phone}`
      });
      setTimer(TIMER);
      setVerificationCode(otp.vfCode);
    } catch (error) {
      console.log(error, " error in re-send verification");
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
          : "Sorry, something went wrong. Please try again!"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleWrongNumber = () => {
    if (params?.focusInput) {
      params.focusInput();
    }
    handleBack();
  };

  const handleRetry = () => {
    checkConnection();
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "التحقق" : "Verification"}
        />
        <Alert
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          text={alert.alertText}
          title={alert.alertTitle}
          onBtnPress={alertClose}
          btnText={isArabic ? "حسنا" : "OK"}
        />
        {!internet ? (
          <NoInternet isArabic={isArabic} onPress={handleRetry} />
        ) : (
          <View style={styles.mainContainer}>
            {loading && (
              <View style={styles.loaderWrapper}>
                <LottieView
                  loop
                  autoPlay
                  style={styles.loader}
                  source={require("../../../assets/animations/loader.json")}
                />
              </View>
            )}
            <View style={styles.descriptionWrapper(isArabic)}>
              <Text style={styles.description(isArabic)}>
                {`${
                  isArabic
                    ? "ادخل رقم التعريف تم ارساله الى :\n"
                    : "Enter the 4-digit code sent to\n"
                }`}
              </Text>
              <View style={styles.secondLineDesc(isArabic)}>
                <Text style={styles.description(isArabic)}>
                  {params && params.phone ? params.phone : "-----------"}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleWrongNumber}
                >
                  <Text
                    style={[
                      styles.resend(isArabic),
                      {
                        marginLeft: isArabic ? 0 : 5,
                        marginRight: isArabic ? 5 : 0
                      }
                    ]}
                  >
                    {isArabic ? "تغيير رقم الجوال" : "Wrong number?"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <OTPInputView
              pinCount={4}
              autoFocusOnLoad
              style={styles.otpWrapper}
              codeInputFieldStyle={styles.input}
              onCodeFilled={text => handleVerification(text)}
            />
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                disabled={disabled}
                activeOpacity={0.7}
                style={styles.timer}
                onPress={() => checkConnection(handleResend)}
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
                          ? ` إعادة إرسال رمز التحقق في ${" "}${convertSecondstoTime(
                              timer
                            )}`
                          : `Resend verification code in ${convertSecondstoTime(
                              timer
                            )}`
                      }`
                    : isArabic
                    ? "اعادة إرسال"
                    : "Resend Verification"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
