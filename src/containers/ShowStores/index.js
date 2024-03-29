import React, { useEffect, useRef, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import { useSelector } from "react-redux";
import { Entypo } from "../../common/icons";
import { SafeAreaView } from "react-navigation";
import MapView, { MarkerAnimated } from "react-native-maps";
import { ANDROID, ARABIC, HEIGHT, WIDTH } from "../../common/constants";

const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (WIDTH / HEIGHT);

let _isMounted = false;

export default ({ route: { params } }) => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;
  const stores = params?.stores;
  const location = params?.location;

  const locationObj = {
    latitude:
      typeof location.latitude === "string"
        ? parseFloat(location.latitude)
        : location.latitude || 21.553596,
    longitude:
      typeof location?.longitude === "string"
        ? parseFloat(location?.longitude)
        : location?.longitude || 39.194024,
    latitudeDelta:
      typeof location?.latitudeDelta === "string"
        ? parseFloat(location?.latitudeDelta)
        : location?.latitudeDelta || LATITUDE_DELTA,
    longitudeDelta:
      typeof location?.longitudeDelta === "string"
        ? parseFloat(location?.longitudeDelta)
        : location?.longitudeDelta || LONGITUDE_DELTA
  };

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
      setTimeout(() => {
        if (mapRef && mapRef.current && mapRef.current.fitToSuppliedMarkers) {
          mapRef.current.fitToElements(true);
        }
      }, 0);
    }
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const mapMemo = useMemo(
    () => (
      <View style={styles.mapBox}>
        <MapView
          zoomEnabled={false}
          ref={mapRef}
          region={locationObj}
          loadingEnabled={true}
          loadingIndicatorColor={theme}
          loadingBackgroundColor={"#fafafa"}
          style={StyleSheet.absoluteFillObject}
        >
          {stores.map((v, i) => {
            return (
              <MarkerAnimated
                key={i}
                coordinate={{
                  latitude:
                    typeof v.latitude === "string"
                      ? parseFloat(v.latitude)
                      : v.latitude,
                  longitude:
                    typeof v.longitude === "string"
                      ? parseFloat(v.longitude)
                      : v.latitude
                }}
                title={isArabic ? v.nameAr : v.nameEn}
              >
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../../../assets/images/logo.png")}
                />
              </MarkerAnimated>
            );
          })}
        </MapView>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={styles.back(isArabic)}
        >
          <Entypo size={25} name="chevron-thin-left" color={"#fff"} />
        </TouchableOpacity>
        {mapMemo}
      </View>
    </SafeAreaView>
  );
};
