import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet
} from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import { DropdownSection } from "../Checkout";
import Header from "../../components/Header";
import { FontAwesome } from "../../common/icons";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { ANDROID, ARABIC, CITIES } from "../../common/constants";
import { ShowToastWithScroll } from "../../common/functions";

export default () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const navigation = useNavigation();
  const [coords, setCoords] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      if (info?.coords) {
        setCoords({ ...info?.coords });
      }
    });
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCity = city => {
    if (!city) return;
    setSelectedCity({ ...city });
  };

  const handleNext = () => {
    if (!selectedCity) {
      ShowToastWithScroll(
        undefined,
        0,
        false,
        ref,
        isArabic ? "الرجاء تحديد المدينة" : "Please select city",
        isArabic
      );
      return;
    }
    navigation.navigate("NewAddress", {
      city: selectedCity
    });
  };

  const handleRegionChange = e => {
    if (coords) {
      const coordsStringfy = JSON.stringify(coords);
      const newCoordsStringfy = JSON.stringify(e);
      if (newCoordsStringfy !== coordsStringfy) {
        setCoords({ ...e });
      }
    }
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "عنوان جديد" : "New Address"}
        />
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <DropdownSection
              noIcon
              ref={ref}
              data={CITIES}
              isArabic={isArabic}
              onPress={handleCity}
              selected={selectedCity}
              title={isArabic ? "مدينة" : "City"}
              btnText={isArabic ? "اختر مدينة" : "Select City"}
            />
          </View>
          <View style={styles.mapBox}>
            {coords && coords.latitude && coords.longitude ? (
              <MapView
                zoomEnabled
                zoomControlEnabled
                showsCompass={true}
                moveOnMarkerPress={true}
                showsUserLocation={true}
                showsPointsOfInterest={true}
                region={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  latitudeDelta: 0.009,
                  longitudeDelta: 0.005
                }}
                loadingEnabled={true}
                loadingIndicatorColor={theme}
                loadingBackgroundColor={"#fafafa"}
                style={StyleSheet.absoluteFillObject}
                onRegionChangeComplete={handleRegionChange}
              >
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
              </MapView>
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
