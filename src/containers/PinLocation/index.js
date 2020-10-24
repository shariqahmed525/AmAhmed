import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import MapView from "react-native-maps";
import Alert from "../../components/Alert";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import { DropdownSection } from "../Checkout";
import { FontAwesome } from "../../common/icons";
import { ERROR_IMG } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import { ANDROID, ARABIC, CITIES, HEIGHT, WIDTH } from "../../common/constants";

const LATITUDE = 40.74333; // Korea Town, New York, NY 10001
const LONGITUDE = -73.99033; // Korea Town, New York, NY 10001
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (WIDTH / HEIGHT);

export default () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { params } = useRoute();
  const navigation = useNavigation();
  const [coords, setCoords] = useState(null);
  const [denied, setDenied] = useState(null);
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [selectedCity, setSelectedCity] = useState(null);
  const { language, cities } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    // if (params?.latitude && params?.longitude) {
    //   setCoords({
    //     latitude: params?.latitude,
    //     longitude: params?.longitude,
    //     latitudeDelta: params?.latitudeDelta,
    //     longitudeDelta: params?.longitudeDelta
    //   });
    // }
    // else {
    //   if (ANDROID) {
    //     // AskLocationPopup();
    //   } else {
    //     Geolocation.getCurrentPosition(info => {
    //       if (info?.coords) {
    //         setCoords({ ...info?.coords });
    //       }
    //     });
    //   }
    // }
    // if (params?.cityCode) {
    //   const code = params.cityCode;
    //   setSelectedCity(CITIES.find(o => o.code === code));
    // }
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const AskLocationPopup = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    })
      .then(() => {
        setDenied(null);
        Geolocation.getCurrentPosition(info => {
          if (info?.coords) {
            setCoords({ ...info?.coords });
          }
        });
      })
      .catch(err => {
        if (err && err.code === "ERR00") {
          setDenied(true);
          return;
        }
        Geolocation.getCurrentPosition(info => {
          if (info?.coords) {
            setCoords({ ...info?.coords });
          }
        });
      });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCity = city => {
    if (!city) return;
    setSelectedCity({ ...city });
    if (city?.latitude && city?.longitude) {
      setCoords({
        latitude: city?.latitude,
        longitude: city?.longitude
      });
    } else {
      setCoords(null);
    }
  };

  const handleNext = () => {
    if (!selectedCity) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic ? "الرجاء تحديد المدينة" : "Please select city"
      });
      return;
    }
    if (!coords) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء تحديد موقع دبوس الخاص بك"
          : "Please set your pin location"
      });
      return;
    }
    navigation.navigate("NewAddress", {
      ...params,
      coords,
      city: selectedCity
    });
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  const handleRegionChange = e => {
    if (coords) {
      const coordsStringfy = JSON.stringify(coords);
      const newCoordsStringfy = JSON.stringify(e);
      if (newCoordsStringfy !== coordsStringfy) {
        setCoords({ ...e });
      }
    }
  };

  const markerRender = () => (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
      }}
    >
      <FontAwesome name="map-pin" size={30} color={theme} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "عنوان جديد" : "New Address"}
        />
        <Alert
          btnText={"OK"}
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          text={alert.alertText}
          onBtnPress={alertClose}
          title={alert.alertTitle}
        />
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <DropdownSection
              noIcon
              ref={ref}
              data={cities}
              isArabic={isArabic}
              onPress={handleCity}
              selected={selectedCity}
              title={isArabic ? "مدينة" : "City"}
              btnText={isArabic ? "اختر مدينة" : "Select City"}
            />
          </View>
          <View style={styles.mapBox}>
            {coords?.latitude && coords?.longitude ? (
              <View style={StyleSheet.absoluteFillObject}>
                <MapView
                  zoomEnabled
                  zoomControlEnabled
                  showsCompass={true}
                  moveOnMarkerPress={true}
                  showsUserLocation={true}
                  showsPointsOfInterest={true}
                  region={{
                    latitude: coords?.latitude || 21.553596,
                    longitude: coords?.longitude || 39.194024,
                    latitudeDelta: coords?.latitudeDelta || LATITUDE_DELTA,
                    longitudeDelta: coords?.longitudeDelta || LONGITUDE_DELTA
                  }}
                  loadingEnabled={true}
                  loadingIndicatorColor={theme}
                  loadingBackgroundColor={"#fafafa"}
                  style={StyleSheet.absoluteFillObject}
                  onRegionChangeComplete={handleRegionChange}
                />
                {markerRender()}
              </View>
            ) : (
              <MapView style={StyleSheet.absoluteFillObject} />
            )}
          </View>
          <View style={styles.footer(isArabic)}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleNext}
              style={styles.btn(isArabic)}
            >
              <Text style={styles.btnText(isArabic)}>
                {isArabic ? "التالى" : "NEXT"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
