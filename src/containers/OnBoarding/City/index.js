import React, { useState, useEffect } from "react";
import {
  onCitiesAction,
  onLanguageAction,
  onSelectedCityAction,
  onSelectedCategoryAction
} from "../../../redux/actions/app";
import Axios from "axios";
import styles from "./styles";
import LottieView from "lottie-react-native";
import Alert from "../../../components/Alert";
import Header from "../../../components/Header";
import { SafeAreaView } from "react-navigation";
import NotFound from "../../../components/NotFound";
import NetInfo from "@react-native-community/netinfo";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/actions/user";
import NoInternet from "../../../components/NoInternet";
import ImageButton from "../../../components/ImageButton";
import OnBoardHeader from "../../../components/OnBoardHeader";
import { backgroundColor, theme } from "../../../common/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ARABIC, BASE_URL, ENGLISH } from "../../../common/constants";

let _isMounted = false;

export default () => {
  const { params } = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [alert, setAlert] = useState({
    alert: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [cities, setCities] = useState([]);
  const [internet, setInternet] = useState(true);
  const [loading, setLoading] = useState(!params?.fromHome);
  const {
    user: { cart },
    app: { language, selectedCity }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      checkConnection();
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
      const { data } = await Axios.get(`${BASE_URL}/Locations`);
      if (data && data.length > 0) {
        setCities([...data]);
        makeCities(data);
      }
    } catch (error) {
      console.log(error, " error in getting cities");
    } finally {
      setLoading(false);
    }
  };

  const makeCities = data => {
    if (selectedCity && selectedCity.id) {
      const find = data.find(o => o.id === selectedCity.id);
      if (!find) {
        dispatch(onSelectedCityAction(null));
        dispatch(onSelectedCategoryAction(null));
      }
    }
    dispatch(onCitiesAction([...data]));
  };

  const handleToggleLanguage = () => {
    dispatch(onLanguageAction(isArabic ? ENGLISH : ARABIC));
  };

  const navigate = () => {
    if (params?.fromHome) {
      handleBack();
    } else {
      navigation.navigate("OnBoardingCategory");
    }
  };

  const handleListItem = city => {
    if (selectedCity && selectedCity.id === city.id) {
      alertClose();
      navigate();
    } else if (
      selectedCity &&
      selectedCity.id !== city.id &&
      cart &&
      cart.length > 0
    ) {
      handleConfirm(city);
    } else {
      dispatch(onSelectedCityAction(city));
      navigate();
    }
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  const handleConfirm = city => {
    setAlert({
      alert: true,
      error: false,
      btnPress: () => handleAccept(city),
      alertText: isArabic
        ? "إذا قمت بتغيير المدينة ، ستكون عربة التسوق الخاصة بك فارغة. هل توافق؟"
        : "If you change the city, your cart will be empty. Do you agree?"
    });
  };

  const handleAccept = city => {
    alertClose();
    dispatch(clearCart());
    dispatch(onSelectedCategoryAction(null));
    dispatch(onSelectedCityAction(city));
    navigate();
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
            {!internet ? (
              <NoInternet isArabic={isArabic} onPress={handleRetry} />
            ) : loading ? (
              <View style={styles.loaderWrapper}>
                <LottieView
                  loop
                  autoPlay
                  style={styles.loader}
                  source={require("../../../../assets/animations/loader.json")}
                />
              </View>
            ) : cities && cities.length > 0 ? (
              <View style={styles.centerContainer}>
                {cities.map((v, i) => (
                  <ImageButton
                    key={i}
                    isArabic={isArabic}
                    source={{ uri: v.pictureUrl }}
                    onPress={() => handleListItem(v)}
                    selected={v.id === selectedCity?.id}
                    text={isArabic ? v.nameAr : v.nameEn}
                  />
                ))}
              </View>
            ) : (
              <NotFound
                isArabic={isArabic}
                text={isArabic ? "لم يتم العثور على نتائج" : "No Results Found"}
                secondaryText={
                  isArabic
                    ? "عذرا ، لم نتمكن من العثور على أي بيانات"
                    : "Sorry, we couldn't find any data"
                }
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
