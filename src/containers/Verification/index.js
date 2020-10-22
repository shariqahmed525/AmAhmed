import React, { useState, useEffect } from "react";
import styles from "./styles";
import Alert from "../../components/Alert";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-navigation";
import NoInternet from "../../components/NoInternet";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { onAddressesAction } from "../../redux/actions/app";
import { saveUserData } from "../../redux/actions/user";
import { useNavigation } from "@react-navigation/native";
import { convertSecondstoTime, getRandom } from "../../common/functions";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { ANDROID, ARABIC, BASE_URL, ERROR_IMG } from "../../common/constants";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Axios from "axios";

const TIMER = 10;

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
  const navigation = useNavigation();
  const { language, token } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

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
    if (text != verificationCode) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic ? "الرمز غير صحيح!" : "Invalid code!"
      });
      return;
    }
    setLoading(true);
    try {
      await Axios.get(`${BASE_URL}/Users/register/${params?.phone}`);
      // await Axios.get(
      //   `${BASE_URL}/Users/update/id/${params?.phone}/Token/${token}`
      // );
      const { data } = await Axios.get(
        `${BASE_URL}/UserAddresses/get/mob/${params?.phone}`
      );
      if (data && data.length > 0) {
        dispatch(onAddressesAction([...data]));
      } else {
        dispatch(onAddressesAction([]));
      }
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
      const vfCode = getRandom(4);
      const msg = isArabic
        ? `رمز التحقق الخاص بـعم أحمد الخاص بك هو: ${vfCode}`
        : `Your AmAhmed's verification code is: ${vfCode}`;
      await Axios.post(`${BASE_URL}/sms/send`, {
        text: msg,
        number: `966${params?.phone}`
      });
      setTimer(TIMER);
      setVerificationCode(vfCode);
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
          title={isArabic ? "التحقق" : "Verification"}
          titleAlign={isArabic ? "right" : "left"}
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
                    ? "أدخل الرمز المكون من 4 أرقام المرسل إلى"
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
                    {isArabic ? "رقم غير صحيح؟" : "Wrong number?"}
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
              {/* <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={handleVerification}
            >
              <Text style={styles.btnText(isArabic)}>
                {isArabic ? "تحقق" : "VERIFY"}
              </Text>
            </TouchableOpacity> */}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
