import React, { useEffect, useRef, useMemo, useState } from "react";
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
import MapView, { MarkerAnimated, Polygon } from "react-native-maps";
import { ANDROID, ARABIC, HEIGHT, WIDTH } from "../../common/constants";

const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (WIDTH / HEIGHT);

const POl_ARR = "";
// setTimeout(() => {
//   const ARR = POl_ARR.map(v => ({
//     latitude: v[1],
//     longitude: v[0]
//   }));

//   console.log(ARR, " ARR");
// }, 1000);

let _isMounted = false;

export default ({ route: { params } }) => {
  const mapRef = useRef(null);
  const [Arr, setUU] = useState([]);
  const navigation = useNavigation();
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;
  const stores = params?.stores;
  const location = params?.location;

  const locationObj = {
    latitude:
      typeof location?.latitude === "string"
        ? parseFloat(location?.latitude)
        : location?.latitude || 21.553596,
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
        const ARR = POl_ARR.map(v => ({
          latitude: v[1],
          longitude: v[0]
        }));
        handleBack(ARR);
      }, 1000);
      setTimeout(() => {
        if (mapRef && mapRef.current && mapRef.current.fitToSuppliedMarkers) {
          // mapRef.current.fitToElements(true);
        }
      }, 0);
    }
  }, []);

  const handleBack = ar => {
    console.log(ar, "s");
    setTimeout(() => {
      setUU([...ar]);
    }, 2000);

    // navigation.goBack();
  };

  const mapMemo = useMemo(
    () => (
      <View style={styles.mapBox}>
        <MapView
          ref={mapRef}
          zoomEnabled={false}
          region={locationObj}
          loadingEnabled={true}
          loadingIndicatorColor={theme}
          loadingBackgroundColor={"#fafafa"}
          style={StyleSheet.absoluteFillObject}
        >
          {stores?.map((v, i) => {
            return (
              <MarkerAnimated
                key={i}
                coordinate={{
                  latitude:
                    typeof v?.latitude === "string"
                      ? parseFloat(v?.latitude)
                      : v?.latitude,
                  longitude:
                    typeof v?.longitude === "string"
                      ? parseFloat(v?.longitude)
                      : v?.latitude
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
        <View style={styles.mapBox}>
          <MapView
            ref={mapRef}
            zoomEnabled={true}
            region={locationObj}
            loadingEnabled={true}
            loadingIndicatorColor={theme}
            loadingBackgroundColor={"#fafafa"}
            style={StyleSheet.absoluteFillObject}
          >
            {Arr.length > 0 && (
              <>
                <Polygon
                  strokeWidth={2}
                  coordinates={Arr}
                  // coordinates={[
                  //   { latitude: 23.3917704, longitude: 38.6597669 },
                  //   { latitude: 23.3915798, longitude: 38.6601765 },
                  //   { latitude: 23.3912197, longitude: 38.660413 },
                  //   { latitude: 23.3908015, longitude: 38.6608918 },
                  //   { latitude: 23.3840495, longitude: 38.6603475 },
                  //   { latitude: 23.3824144, longitude: 38.6608688 },
                  //   { latitude: 23.381366, longitude: 38.6610015 },
                  //   { latitude: 23.3786125, longitude: 38.6615495 },
                  //   { latitude: 23.3776594, longitude: 38.6623571 },
                  //   { latitude: 23.3773955, longitude: 38.6625703 },
                  //   { latitude: 23.3772537, longitude: 38.6631516 },
                  //   { latitude: 23.3777291, longitude: 38.6633727 },
                  //   { latitude: 23.3784419, longitude: 38.6642949 },
                  //   { latitude: 23.378372, longitude: 38.664939 },
                  //   { latitude: 23.3774973, longitude: 38.6663605 },
                  //   { latitude: 23.3771125, longitude: 38.6667793 },
                  //   { latitude: 23.3770786, longitude: 38.6670791 },
                  //   { latitude: 23.3771775, longitude: 38.6672461 },
                  //   { latitude: 23.3773714, longitude: 38.6673668 },
                  //   { latitude: 23.3780132, longitude: 38.6677803 },
                  //   { latitude: 23.3790228, longitude: 38.6676249 },
                  //   { latitude: 23.3807173, longitude: 38.6670492 },
                  //   { latitude: 23.3814895, longitude: 38.6670471 },
                  //   { latitude: 23.3816466, longitude: 38.6671971 },
                  //   { latitude: 23.3821497, longitude: 38.6674106 },
                  //   { latitude: 23.383124, longitude: 38.6676355 },
                  //   { latitude: 23.3842677, longitude: 38.6672663 },
                  //   { latitude: 23.386379, longitude: 38.6661983 },
                  //   { latitude: 23.3875611, longitude: 38.6663433 },
                  //   { latitude: 23.3888001, longitude: 38.6657607 },
                  //   { latitude: 23.3899811, longitude: 38.6652137 },
                  //   { latitude: 23.3908792, longitude: 38.6640957 },
                  //   { latitude: 23.3911827, longitude: 38.6629167 },
                  //   { latitude: 23.3926753, longitude: 38.6613021 },
                  //   { latitude: 23.3926728, longitude: 38.6601864 },
                  //   { latitude: 23.3920775, longitude: 38.6597727 },
                  //   { latitude: 23.3917704, longitude: 38.6597669 }
                  // ]}
                  strokeColor="red"
                  fillColor="green"
                />
              </>
            )}
            {stores?.map((v, i) => {
              return (
                <MarkerAnimated
                  key={i}
                  coordinate={{
                    latitude:
                      typeof v?.latitude === "string"
                        ? parseFloat(v?.latitude)
                        : v?.latitude,
                    longitude:
                      typeof v?.longitude === "string"
                        ? parseFloat(v?.longitude)
                        : v?.latitude
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
        {/* {mapMemo} */}
      </View>
    </SafeAreaView>
  );
};
