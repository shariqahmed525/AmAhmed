import React, { useState, useEffect, useRef, useMemo } from "react";
import { SafeAreaView } from "react-navigation";
import { Entypo, MaterialCommunityIcons } from "../../common/icons";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import { theme, lightTheme } from "../../common/colors";
import Header from "../../components/Header";
import { Menu, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  ANDROID,
  ARABIC,
  WIDTH,
  addresses,
  payments,
  markers
} from "../../common/constants";
import MapView, { MarkerAnimated } from "react-native-maps";

const DropdownSection = ({
  title,
  isAddress,
  btnText,
  isArabic,
  onPress,
  selected,
  data = []
}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleListItem = (isNew, item) => {
    if (isAddress) {
      onPress(isNew, item);
    } else {
      onPress(item);
    }
    closeMenu();
  };
  return (
    <>
      <Text style={styles.heading(isArabic)}>{title}</Text>
      <Menu
        visible={visible}
        contentStyle={{
          width: WIDTH - 20
        }}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity
            onPress={openMenu}
            activeOpacity={0.7}
            style={styles.option(isArabic)}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.optionText(isArabic)}
            >
              {(selected && selected.name) || btnText}
            </Text>
            <Entypo name="chevron-thin-down" size={18} color={theme} />
          </TouchableOpacity>
        }
      >
        {isAddress && (
          <>
            <Menu.Item
              title={
                <View style={styles.listItem(isArabic)}>
                  <View style={styles.listIcon}>
                    <MaterialCommunityIcons
                      size={25}
                      color={theme}
                      name="map-marker-plus-outline"
                    />
                  </View>
                  <View style={styles.textWrapper(isArabic)}>
                    <Text style={styles.listItemText(isArabic)}>
                      New Address
                    </Text>
                  </View>
                </View>
              }
              onPress={() => handleListItem(true)}
              style={styles.menuItem(isArabic)}
            />
            <Divider />
          </>
        )}
        <ScrollView bounces={false} style={{ maxHeight: 200 }}>
          {data.map((v, i) => (
            <View key={i}>
              <Menu.Item
                title={
                  <View style={styles.listItem(isArabic)}>
                    {v.icon && <View style={styles.listIcon}>{v.icon}</View>}
                    <View style={styles.textWrapper(isArabic)}>
                      <Text style={styles.listItemText(isArabic)}>
                        {v.name}
                      </Text>
                    </View>
                  </View>
                }
                onPress={() => handleListItem(false, v)}
                style={styles.menuItem(
                  isArabic,
                  selected && selected.name === v.name
                )}
              />
              {v.isDivider && <Divider />}
            </View>
          ))}
        </ScrollView>
      </Menu>
    </>
  );
};

export default () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
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

  const handleAddressListItem = (isNew, address) => {
    if (isNew) {
      setSelectedAddress(null);
      // naviate on new address screen
      return;
    }
    if (!address) setSelectedAddress(null);
    setSelectedAddress({ ...address });
  };

  const handlePaymentListItem = paymentOption => {
    if (!paymentOption) return;
    setSelectedPayment({ ...paymentOption });
  };

  const mapMemo = useMemo(
    () => (
      <View style={styles.mapBox(isArabic)}>
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
                  style={{ width: 45, height: 45 }}
                  source={require("../../../assets/images/logo.png")}
                />
              </MarkerAnimated>
            );
          })}
        </MapView>
      </View>
    ),
    [isArabic]
  );

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          title={isArabic ? "الدفع" : "Checkout"}
          titleAlign={isArabic ? "right" : "left"}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headingWrapper(isArabic)}>
            <Text style={styles.heading(isArabic)}>
              {isArabic ? "موقع المتاجر" : "Stores Location"}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.secondaryWrapper(isArabic)}
              onPress={() => navigation.navigate("ShowStores")}
            >
              <Text style={styles.secondaryText(isArabic)}>
                {isArabic ? "عرض كامل" : "Full View"}
              </Text>
              <Entypo
                size={18}
                style={{ paddingRight: isArabic ? 5 : 0 }}
                name={`chevron-thin-${isArabic ? "left" : "right"}`}
              />
            </TouchableOpacity>
          </View>
          {mapMemo}
          <DropdownSection
            isAddress
            data={addresses}
            isArabic={isArabic}
            selected={selectedAddress}
            onPress={handleAddressListItem}
            btnText={isArabic ? "حدد العنوان" : "Select Address"}
            title={isArabic ? "الرأس والساقين" : "Delivery Address"}
          />
          <DropdownSection
            data={payments}
            isArabic={isArabic}
            selected={selectedPayment}
            onPress={handlePaymentListItem}
            title={isArabic ? "طريقة الدفع" : "Payment Method"}
            btnText={isArabic ? "اختار طريقة الدفع" : "Select Payment Method"}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
