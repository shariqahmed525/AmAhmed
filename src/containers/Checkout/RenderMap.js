import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import styles from "./styles";
import { theme } from "../../common/colors";
import { Entypo } from "../../common/icons";
import { ActivityIndicator } from "react-native-paper";
import MapView, { MarkerAnimated } from "react-native-maps";
import { BASE_URL, HEIGHT, WIDTH } from "../../common/constants";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

let _isMounted = false;

const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (WIDTH / HEIGHT);

export default ({ isArabic, city, navigation }) => {
  const mapRef = useRef(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const locationObj = {
    latitude:
      typeof city?.latitude === "string"
        ? parseFloat(city?.latitude)
        : city?.latitude || 21.553596,
    longitude:
      typeof city?.longitude === "string"
        ? parseFloat(city?.longitude)
        : city?.longitude || 39.194024,
    latitudeDelta:
      typeof city?.latitudeDelta === "string"
        ? parseFloat(city?.latitudeDelta)
        : city?.latitudeDelta || LATITUDE_DELTA,
    longitudeDelta:
      typeof city?.longitudeDelta === "string"
        ? parseFloat(city?.longitudeDelta)
        : city?.longitudeDelta || LONGITUDE_DELTA
  };
  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      const fetchingDetails = async () => {
        try {
          setLoading(true);
          const { data } = await Axios.get(
            `${BASE_URL}/stores/loc/${city?.id}`
          );
          if (data && data.length > 0) {
            setStores([...data]);
            setTimeout(() => {
              if (
                mapRef &&
                mapRef.current &&
                mapRef.current.fitToSuppliedMarkers
              ) {
                mapRef.current.fitToElements(true);
              }
            }, 100);
          }
        } catch (error) {
          console.log("error in fetchingDetails");
        } finally {
          setLoading(false);
        }
      };
      if (city?.id) {
        fetchingDetails();
      }
    }
  }, []);
  return (
    <>
      <View style={styles.headingWrapper(isArabic)}>
        <Text style={styles.heading(isArabic)}>
          {isArabic ? "موقع المتاجر" : "Stores Location"}
        </Text>
        {!loading && stores.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.secondaryWrapper(isArabic)}
            onPress={() => {
              navigation.navigate("ShowStores", {
                stores,
                location: {
                  ...locationObj
                }
              });
            }}
          >
            <Text style={styles.secondaryWrapperText(isArabic)}>
              {isArabic ? "عرض كامل" : "Full View"}
            </Text>
            <Entypo
              size={18}
              style={{ paddingRight: isArabic ? 5 : 0 }}
              name={`chevron-thin-${isArabic ? "left" : "right"}`}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.mapBox(isArabic)}>
        {loading && (
          <View style={styles.activityLoader}>
            <ActivityIndicator size="large" color={theme} />
          </View>
        )}
        {loading || !stores || stores.length < 1 ? (
          <MapView style={StyleSheet.absoluteFillObject} />
        ) : (
          <MapView
            ref={mapRef}
            zoomEnabled={false}
            region={locationObj}
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
                    style={{ width: 45, height: 45 }}
                    source={require("../../../assets/images/logo.png")}
                  />
                </MarkerAnimated>
              );
            })}
          </MapView>
        )}
      </View>
    </>
  );
};
