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
import { theme, lightTheme, lightGray } from "../../common/colors";
import { ANDROID, ARABIC, markers } from "../../common/constants";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { Entypo } from "../../common/icons";
import MapView, { MarkerAnimated } from "react-native-maps";
import { SafeAreaView } from "react-navigation";

export default () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
    setTimeout(() => {
      if (mapRef && mapRef.current && mapRef.current.fitToSuppliedMarkers) {
        mapRef.current.fitToElements(true);
      }
    }, 0);
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
          region={{
            latitude: 21.4858,
            longitude: 39.1925,
            latitudeDelta: 0.009,
            longitudeDelta: 0.005
          }}
          loadingEnabled={true}
          loadingIndicatorColor={theme}
          loadingBackgroundColor={"#fafafa"}
          style={StyleSheet.absoluteFillObject}
        >
          {markers.map((v, i) => {
            return (
              <MarkerAnimated
                key={i}
                title={v.name}
                coordinate={{
                  latitude: v.lat,
                  longitude: v.lng
                }}
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
