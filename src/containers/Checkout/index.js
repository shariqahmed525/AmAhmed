import React, { useState, useEffect, useRef, useMemo, forwardRef } from "react";
import { SafeAreaView } from "react-navigation";
import { Entypo, Fontisto, MaterialCommunityIcons } from "../../common/icons";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import { Menu, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  IOS,
  WIDTH,
  ARABIC,
  ANDROID,
  markers,
  payments
} from "../../common/constants";
import * as Animatable from "react-native-animatable";
import MapView, { MarkerAnimated } from "react-native-maps";
import { ShowToastWithScroll } from "../../common/functions";
import { RNSlidingButton, SlideDirection } from "rn-sliding-button";

export const DropdownSection = forwardRef(
  (
    {
      title,
      isAddress,
      btnText,
      isArabic,
      onPress,
      selected,
      data = [],
      noIcon
    },
    ref
  ) => {
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
        <Text ref={ref} style={styles.heading(isArabic)}>
          {title}
        </Text>
        <Menu
          visible={visible}
          contentStyle={{
            width: WIDTH - 22
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
                {selected && selected.name ? selected.name(isArabic) : btnText}
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
                    <View style={styles.listIcon(isArabic)}>
                      <MaterialCommunityIcons
                        size={25}
                        color={theme}
                        name="map-marker-plus-outline"
                      />
                    </View>
                    <View style={styles.textWrapper(isArabic)}>
                      <Text style={styles.listItemText(isArabic)}>
                        {isArabic ? "عنوان جديد" : "New Address"}
                      </Text>
                    </View>
                  </View>
                }
                titleStyle={{ width: WIDTH - 52 }}
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
                      {isAddress ? (
                        <Fontisto size={20} name="navigate" color={theme} />
                      ) : (
                        !noIcon &&
                        v.icon && (
                          <View style={styles.listIcon(isArabic)}>
                            {v.icon}
                          </View>
                        )
                      )}
                      <View style={styles.textWrapper(isArabic)}>
                        <Text style={styles.listItemText(isArabic)}>
                          {v.name(isArabic)}
                        </Text>
                      </View>
                    </View>
                  }
                  onPress={() => handleListItem(false, v)}
                  titleStyle={{ width: WIDTH - 52 }}
                  style={styles.menuItem(
                    isArabic,
                    selected && selected.name(isArabic) === v.name(isArabic)
                  )}
                />
                {v.isDivider && <Divider />}
              </View>
            ))}
          </ScrollView>
        </Menu>
      </>
    );
  }
);

const LIST = ({
  isArabic,
  primaryText,
  secondaryText,
  bold,
  secondaryBold
}) => (
  <View style={styles.orderList(isArabic)}>
    <Text style={styles.primaryText(isArabic, bold)}>{primaryText}</Text>
    <Text style={styles.secondaryText(isArabic, secondaryBold)}>
      {secondaryText}
    </Text>
  </View>
);

export default () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const animatedRef = useRef(null);
  const addressRef = useRef(null);
  const paymentRef = useRef(null);
  const contactRef = useRef(null);
  const [text, setText] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigation = useNavigation();
  const {
    app: { language },
    user: { userData, addresses }
  } = useSelector(state => state);
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

  const onVerification = () => {
    const trimText = text.trim();
    if (!selectedAddress) {
      ShowToastWithScroll(
        scrollRef,
        0,
        false,
        addressRef,
        isArabic ? "الرجاء تحديد العنوان" : "Please select address",
        isArabic
      );
      return;
    }
    if (!selectedPayment) {
      ShowToastWithScroll(
        scrollRef,
        100,
        false,
        paymentRef,
        isArabic
          ? "الرجاء تحديد طريقة الدفع"
          : "Please select the payment method",
        isArabic
      );
      return;
    }
    if (!trimText) {
      ShowToastWithScroll(
        scrollRef,
        0,
        true,
        contactRef,
        isArabic
          ? "الرجاء إدخال رقم الاتصال الخاص بك"
          : "Please enter your contact number",
        isArabic
      );
      setTimeout(() => {
        focusInput();
      }, 1000);
      return;
    }
    navigation.navigate("Verification", {
      phone: trimText,
      focusInput,
      animateButton
    });
  };

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };

  const animateButton = () => {
    setTimeout(() => {
      if (userData?.isVerify) {
        scrollRef.current.scrollToEnd({ animated: true });
        setTimeout(() => {
          animatedRef.current.bounceIn(1000);
        }, 500);
      }
    }, 100);
  };

  const handlePlaceOrder = () => {};

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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={IOS && "padding"}>
      <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
        <View style={styles.container}>
          <Header
            back
            onBackPress={handleBack}
            title={isArabic ? "الدفع" : "Checkout"}
            titleAlign={isArabic ? "right" : "left"}
          />
          <ScrollView
            ref={scrollRef}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
          >
            <DropdownSection
              isAddress
              ref={addressRef}
              data={addresses}
              isArabic={isArabic}
              selected={selectedAddress}
              onPress={handleAddressListItem}
              btnText={isArabic ? "حدد العنوان" : "Select Address"}
              title={isArabic ? "الرأس والساقين" : "Delivery Address"}
            />
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
              data={payments}
              ref={paymentRef}
              isArabic={isArabic}
              selected={selectedPayment}
              onPress={handlePaymentListItem}
              title={isArabic ? "طريقة الدفع" : "Payment Method"}
              btnText={isArabic ? "اختار طريقة الدفع" : "Select Payment Method"}
            />
            <Text ref={contactRef} style={styles.heading(isArabic)}>
              {isArabic ? "تفاصيل الطلب" : "Order Details"}
            </Text>
            <View style={styles.orderCard(isArabic)}>
              <LIST
                bold
                isArabic={isArabic}
                primaryText={
                  isArabic ? "طريقة الدفع او السداد" : "Payment Method"
                }
                secondaryText={
                  selectedPayment && selectedPayment.name
                    ? selectedPayment.name(isArabic)
                    : "-----"
                }
              />
              {selectedPayment &&
                selectedPayment.name &&
                selectedPayment.name(false) === "Credit/Debit Card" && (
                  <LIST
                    isArabic={isArabic}
                    secondaryText={"8989xxxxxx"}
                    primaryText={isArabic ? "رقم البطاقة" : "Card Number"}
                  />
                )}
              <View style={styles.pd10}>
                <Divider />
              </View>
              <LIST
                isArabic={isArabic}
                secondaryText={190}
                primaryText={isArabic ? "المجموع الفرعي" : "Sub Total"}
              />
              <LIST
                secondaryText={0}
                isArabic={isArabic}
                primaryText={isArabic ? "رسوم التوصيل" : "Delivery Fee"}
              />
              <LIST
                secondaryText={0}
                isArabic={isArabic}
                primaryText={isArabic ? "ضريبة المبيعات" : "Sales Tax"}
              />
              <LIST
                bold
                secondaryBold
                secondaryText={190}
                isArabic={isArabic}
                primaryText={
                  isArabic
                    ? "الإجمالي (بما في ذلك ضريبة السلع والخدمات)"
                    : "Total (Including GST)"
                }
              />
            </View>
            {!userData?.isVerify && (
              <>
                <Text ref={contactRef} style={styles.heading(isArabic)}>
                  {isArabic ? "رقم الاتصال" : "Contact Number"}
                </Text>
                <TextInput
                  blurOnSubmit
                  value={text}
                  ref={inputRef}
                  spellCheck={false}
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  style={styles.input(isArabic)}
                  onSubmitEditing={onVerification}
                  onChangeText={text => setText(text)}
                  placeholder={
                    isArabic
                      ? "أدخل رقم الاتصال (0561234567)"
                      : "Enter contact number (0561234567)"
                  }
                />
              </>
            )}
          </ScrollView>
          <View style={styles.footer(isArabic)}>
            {userData?.isVerify ? (
              <Animatable.View
                useNativeDriver
                ref={animatedRef}
                style={styles.animtedButton}
              >
                <RNSlidingButton
                  height={50}
                  activeOpacity={0.7}
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderRadius: 100,
                    borderColor: theme,
                    paddingHorizontal: 15,
                    backgroundColor: theme
                  }}
                  onSlidingSuccess={handlePlaceOrder}
                  slideDirection={
                    isArabic ? SlideDirection.LEFT : SlideDirection.RIGHT
                  }
                >
                  <Text
                    style={{
                      ...styles.btnText(isArabic),
                      fontSize: isArabic ? WIDTH * 0.05 : WIDTH * 0.045
                    }}
                  >
                    {isArabic
                      ? "مزلاق لوضع النظام >>>"
                      : "SLIDE TO PLACE ORDER >>>"}
                  </Text>
                </RNSlidingButton>
              </Animatable.View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn(isArabic)}
                onPress={onVerification}
              >
                <Text style={styles.btnText(isArabic)}>
                  {isArabic ? "إرسال التحقق" : "SEND VERIFICATION"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
