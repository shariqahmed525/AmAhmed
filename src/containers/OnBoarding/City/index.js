import React, { useState, useEffect } from "react";
import styles from "./styles";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-navigation";
import { View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ImageButton from "../../../components/ImageButton";
import OnBoardHeader from "../../../components/OnBoardHeader";
import { ARABIC, CITIES, ENGLISH } from "../../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { onCityAction, onLanguageAction } from "../../../redux/actions/app";
import { backgroundColor, theme } from "../../../common/colors";
import Header from "../../../components/Header";
import Alert from "../../../components/Alert";
import { clearCart } from "../../../redux/actions/user";
import NoInternet from "../../../components/NoInternet";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import Axios from "axios";

export default () => {
  const netInfo = useNetInfo();
  const { params } = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [alert, setAlert] = useState({
    alert: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [internet, setInternet] = useState(true);
  const [loading, setLoading] = useState(!params?.fromHome);
  const {
    user: { cart },
    app: { language, city }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    checkConnection();
    if (!params?.fromHome) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setLoading(false);
        setInternet(false);
      } else {
        setInternet(true);
        getCities();
      }
    });
  };

  const getCities = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get("http://api.amahmed.com/Locations");
      console.log(data, " res");
    } catch (error) {
      console.log(error, " error in getting cities");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLanguage = () => {
    dispatch(onLanguageAction(isArabic ? ENGLISH : ARABIC));
  };

  const handleListItem = code => {
    if (code === city) {
      alertClose();
      if (params?.fromHome) {
        handleBack();
      } else {
        navigation.navigate("OnBoardingCategory");
      }
      return;
    }
    if (cart && cart.length > 0) {
      handleConfirm(code);
      return;
    } else {
      dispatch(onCityAction(code));
      if (params?.fromHome) {
        handleBack();
      } else {
        navigation.navigate("OnBoardingCategory");
      }
    }
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  const handleConfirm = code => {
    setAlert({
      alert: true,
      error: false,
      btnPress: () => handleAccept(code),
      alertText: isArabic
        ? "إذا قمت بتغيير المدينة ، ستكون عربة التسوق الخاصة بك فارغة. هل توافق؟"
        : "If you change the city, your cart will be empty. Do you agree?"
    });
  };

  const handleAccept = code => {
    alertClose();
    dispatch(clearCart());
    dispatch(onCityAction(code));
    if (params?.fromHome) {
      handleBack();
    } else {
      navigation.navigate("OnBoardingCategory");
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRetry = () => {
    checkConnection();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: params?.fromHome ? theme : backgroundColor
      }}
      forceInset={{ bottom: "never" }}
    >
      <View style={styles.wrapper}>
        {params?.fromHome && (
          <Header
            back
            onBackPress={handleBack}
            titleAlign={isArabic ? "right" : "left"}
            title={isArabic ? "مدينة التبديل" : "Switch City"}
          />
        )}
        <Alert
          btnColor={theme}
          alert={alert.alert}
          btnTextColor={"#fff"}
          img={alert.alertImg}
          text={alert.alertText}
          title={alert.alertTitle}
          onCancelPress={alertClose}
          btnText={isArabic ? "حسنا" : "OK"}
          onBtnPress={alert.btnPress || alertClose}
          cancelText={isArabic ? "إلغاء" : "Cancel"}
        />
        <ScrollView
          scrollEnabled={internet}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.mainContainer}>
            {!params?.fromHome && (
              <OnBoardHeader
                isArabic={isArabic}
                onPress={handleToggleLanguage}
              />
            )}
            {loading ? (
              <View style={styles.loaderWrapper}>
                <LottieView
                  loop
                  autoPlay
                  style={styles.loader}
                  source={require("../../../../assets/animations/loader.json")}
                />
              </View>
            ) : internet ? (
              <View style={styles.centerContainer}>
                <Text style={styles.heading(isArabic)}>
                  {isArabic
                    ? "اختر مدينتك، من فضلك"
                    : "Choose your city, please"}
                </Text>
                {CITIES.map((v, i) => (
                  <ImageButton
                    isCity
                    key={i}
                    source={v.icon}
                    isArabic={isArabic}
                    selected={v.code === city}
                    onPress={() => handleListItem(v.code)}
                    text={`${v.name(isArabic)}${isArabic ? "؟" : "?"}`}
                    primaryText={isArabic ? "هل انت من" : "Are you from"}
                  />
                ))}
              </View>
            ) : (
              <NoInternet isArabic={isArabic} onPress={handleRetry} />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
