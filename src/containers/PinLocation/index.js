import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import styles from "./styles";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";
import Alert from "../../components/Alert";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import { SafeAreaView } from "react-navigation";
import {
  IOS,
  ERROR_IMG,
  MAP_API_KEY,
  PLACEHOLDER_TEXT_COLOR
} from "../../common/constants";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import { FontAwesome, MaterialIcons } from "../../common/icons";
import DropdownSection from "../../components/DropdownSection";
import { ANDROID, ARABIC, HEIGHT, WIDTH } from "../../common/constants";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import Axios from "axios";
import { findCityName } from "../../common/functions";

let _isMounted = false;

const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (WIDTH / HEIGHT);

export default ({ route: { params } }) => {
  const ref = useRef(null);
  const navigation = useNavigation();
  const [next, setNext] = useState(false);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);
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
    _isMounted = true;
    if (_isMounted) {
      if (params?.latitude && params?.longitude) {
        setCoords({
          latitude: params?.latitude,
          longitude: params?.longitude,
          latitudeDelta: params?.latitudeDelta,
          longitudeDelta: params?.longitudeDelta
        });
      }
      if (params?.address) {
        setAddress(params?.address);
      }
      if (
        params?.locationID &&
        cities &&
        cities.find(o => o.id === params?.locationID)
      ) {
        const city = cities.find(o => o.id === params?.locationID);
        setSelectedCity({ ...city });
      }
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
    }
  }, []);

  const AskLocationPopup = () => {
    if (IOS) {
      Geolocation.getCurrentPosition(
        info => {
          if (info?.coords) {
            setCoords({ ...info?.coords });
          }
        },
        error => {
          console.log(error, " error in getting location");
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
      );
      return;
    }
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    })
      .then(() => {
        Geolocation.getCurrentPosition(
          info => {
            if (info?.coords) {
              setCoords({ ...info?.coords });
            }
          },
          error => {
            console.log(error, " error in getting location");
          },
          { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
        );
      })
      .catch(err => {
        if (err && err.code === "ERR00") {
          return;
        }
        Geolocation.getCurrentPosition(
          info => {
            if (info?.coords) {
              setCoords({ ...info?.coords });
            }
          },
          error => {
            console.log(error, " error in getting location");
          },
          { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
        );
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
        latitude: parseFloat(city?.latitude),
        longitude: parseFloat(city?.longitude)
      });
    } else {
      setCoords(null);
    }
  };

  const handleNext = () => {
    if (!next) {
      addressError(
        isArabic
          ? ""
          : "The location selected does not match the chosen city. Select a delivery location within the chosen city or change the city."
      );
      return;
    }
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
      address,
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
        getAddressDetails(e.latitude, e.longitude);
      }
    }
  };

  const getAddressDetails = async (lat, lng) => {
    try {
      const { data } = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_API_KEY}`
      );
      if (
        data &&
        data.results &&
        data.results.length > 0 &&
        data.results[0] &&
        data.results[0].formatted_address
      ) {
        setAddress(data.results[0].formatted_address);
        checkCityAddress(data.results[0].formatted_address);
      } else {
        addressError();
      }
    } catch (error) {
      console.log(error, " error in getting address");
      addressError();
    }
  };

  const addressError = (
    addressError = isArabic
      ? "حصل خطاء الرجاء إختيار الموقع المناسب."
      : "Something went wrong, Please set marker again."
  ) => {
    setAlert({
      alert: true,
      error: true,
      alertImg: ERROR_IMG,
      alertText: addressError,
      alertTitle: isArabic ? "خطأ" : "Error"
    });
    setNext(false);
  };

  const checkCityAddress = formattedAddress => {
    if (!formattedAddress) {
      addressError();
      return;
    }
    const lowerCaseAddress = formattedAddress.toLowerCase();
    const getCityNames = findCityName(selectedCity?.nameEn);
    const cond = getCityNames.some(element =>
      lowerCaseAddress.includes(element)
    );
    if (!cond) {
      addressError(
        isArabic
          ? "عذرا الموقع خارج نطاق الخدمة."
          : "The location selected does not match the chosen city. Select a delivery location within the chosen city or change the city."
      );
      return;
    }
    setNext(true);
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
          rightIcon={() =>
            selectedCity && (
              <MaterialIcons name="my-location" size={28} color={"#fff"} />
            )
          }
          rightIconProps={{
            onPress: AskLocationPopup
          }}
          memoObj={[selectedCity]}
          titleAlign={isArabic ? "right" : "left"}
          title={
            isArabic
              ? params?.textAr
                ? params?.textAr
                : params?.isEdit
                ? "تحديث العنوان"
                : "موقع جديد"
              : params?.textEn
              ? params?.textEn
              : params?.isEdit
              ? "Update Address"
              : "New Address"
          }
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
              marginBottom={10}
              isArabic={isArabic}
              onPress={handleCity}
              selected={selectedCity}
              title={isArabic ? "مدينة" : "City"}
              btnText={isArabic ? "اختر مدينة" : "Select City"}
            />
            <TextInput
              value={address}
              keyboardType="default"
              style={styles.input(isArabic)}
              placeholder={"---------------------"}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
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
