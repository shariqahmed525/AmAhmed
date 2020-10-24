import React, { useState, useEffect, useRef, useMemo, forwardRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import {
  Entypo,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons
} from "../../common/icons";
import {
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import { Menu, Divider } from "react-native-paper";
import { lightTheme, theme } from "../../common/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  IOS,
  WIDTH,
  HEIGHT,
  ARABIC,
  ANDROID,
  markers,
  payments,
  ERROR_IMG,
  THANKS_IMG,
  BASE_URL
} from "../../common/constants";
import Axios from "axios";
import Alert from "../../components/Alert";
import { clearCart } from "../../redux/actions/user";
import NetInfo from "@react-native-community/netinfo";
import * as Animatable from "react-native-animatable";
import MapView, { MarkerAnimated } from "react-native-maps";
import { RNSlidingButton, SlideDirection } from "rn-sliding-button";
import { getRandom, validatePhone } from "../../common/functions";
import NoInternet from "../../components/NoInternet";

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
            width: WIDTH - 22,
            backgroundColor: "#fff"
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
                {selected
                  ? isArabic
                    ? selected?.nameAr
                    : selected?.nameEn
                  : btnText}
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
                      <MaterialIcons
                        size={25}
                        color={theme}
                        name="my-location"
                      />
                    </View>
                    <View style={styles.textWrapper(isArabic)}>
                      <Text style={styles.listItemText(isArabic)}>
                        {isArabic ? "الموقع الحالي" : "Current Location"}
                      </Text>
                    </View>
                  </View>
                }
                titleStyle={{ width: WIDTH - 52 }}
                onPress={() => handleListItem(true)}
                style={styles.menuItem(isArabic)}
              />
              <Divider />
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
                    <View style={styles.listIconRight(isArabic)}>
                      <Entypo
                        size={20}
                        color={theme}
                        name="chevron-thin-right"
                      />
                    </View>
                  </View>
                }
                titleStyle={{ width: WIDTH - 52 }}
                onPress={() => handleListItem(true)}
                style={styles.menuItem(isArabic)}
              />
              {data && data.length > 0 && <Divider />}
            </>
          )}
          <ScrollView bounces={false} style={{ maxHeight: 200 }}>
            {data.map((v, i) => (
              <View key={i}>
                <Menu.Item
                  title={
                    <View style={styles.listItem(isArabic)}>
                      {isAddress ? (
                        <View style={styles.listIcon(isArabic)}>
                          <Fontisto size={20} name="navigate" color={theme} />
                        </View>
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
                          {isArabic ? v.nameAr : v.nameEn}
                        </Text>
                      </View>
                    </View>
                  }
                  onPress={() => handleListItem(false, v)}
                  titleStyle={{ width: WIDTH - 52 }}
                  style={styles.menuItem(
                    isArabic,
                    selected?.id == v.id
                    // &&
                    //   selected.name &&
                    //   (typeof selected.name === "function"
                    //     ? selected.name(isArabic)
                    //     : selected.name) ===
                    //     (typeof v.name === "function"
                    //       ? v.name(isArabic)
                    //       : v.name)
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
  const addressRef = useRef(null);
  const paymentRef = useRef(null);
  const contactRef = useRef(null);
  const animatedRef = useRef(null);
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [internet, setInternet] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
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

  const checkConnection = func => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setInternet(false);
      } else {
        setInternet(true);
        if (func) {
          func();
        }
      }
    });
  };

  const makeVerification = () => {
    const trimText = text.trim();
    if (!trimText) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء إدخال رقم الهاتف الخاص بك"
          : "Please enter your phone number"
      });
      setTimeout(() => {
        focusInput();
      }, 1000);
      return;
    }
    if (!validatePhone(text)) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء إدخال رقم الهاتف الخاص صحيح"
          : "Please enter valid phone number"
      });
      setTimeout(() => {
        focusInput();
      }, 1000);
      return;
    }
    checkConnection(sendVerification);
  };

  const sendVerification = async () => {
    const trimText = text.trim();
    try {
      setLoading(true);
      const verificationCode = getRandom(4);
      const msg = isArabic
        ? `رمز التحقق الخاص بـعم أحمد الخاص بك هو: ${verificationCode}`
        : `Your AmAhmed's verification code is: ${verificationCode}`;
      await Axios.post(`${BASE_URL}/sms/send`, {
        text: msg,
        number: `966${text}`
      });
      navigation.navigate("Verification", {
        focusInput,
        animateButton,
        phone: trimText,
        verificationCode
      });
    } catch (error) {
      console.log(error, " error in send verification");
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
          : "Sorry, something went wrong. Please try again!"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddressListItem = (isNew, address) => {
    if (isNew) {
      navigation.navigate("PinLocation", {
        fromCheckout: true
      });
      return;
    }
    if (!address) setSelectedAddress(null);
    setSelectedAddress({ ...address });
  };

  const handlePaymentListItem = paymentOption => {
    if (!paymentOption) return;
    setSelectedPayment({ ...paymentOption });
  };

  const handleSubmit = verification => {
    const trimText = text.trim();
    if (verification) {
      if (!trimText) {
        scrollRef.current.scrollToEnd({ animated: true });
        setAlert({
          alert: true,
          error: true,
          alertImg: ERROR_IMG,
          alertTitle: isArabic ? "خطأ" : "Error",
          alertText: isArabic
            ? "الرجاء إدخال رقم الاتصال الخاص بك"
            : "Please enter your contact number"
        });
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
    } else {
      if (!selectedAddress) {
        setAlert({
          alert: true,
          error: true,
          alertImg: ERROR_IMG,
          alertTitle: isArabic ? "خطأ" : "Error",
          alertText: isArabic ? "الرجاء تحديد العنوان" : "Please select address"
        });
        scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
        return;
      }
      if (!selectedPayment) {
        scrollRef.current.scrollTo({ x: 0, y: HEIGHT * 0.35, animated: true });
        setAlert({
          alert: true,
          error: true,
          alertImg: ERROR_IMG,
          alertTitle: isArabic ? "خطأ" : "Error",
          alertText: isArabic
            ? "الرجاء تحديد طريقة الدفع"
            : "Please select the payment method"
        });
        return;
      }
      setOrderLoading(true);
      setTimeout(() => {
        setAlert({
          alert: true,
          error: false,
          btnPress: btnPress,
          alertImg: THANKS_IMG,
          alertTitle: isArabic ? "شكرا جزيلا!" : "Thank you!",
          alertText: isArabic
            ? "شكرًا على الطلب ، سيتم توصيل طلبك قريبًا جدًا"
            : "Thank you for ordering, your order will be delivered very soon"
        });
        setOrderLoading(false);
      }, 1000);
    }
  };

  const btnPress = () => {
    navigation.goBack();
    navigation.navigate("Home");
    dispatch(clearCart());
  };

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

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

  const handleRetry = () => {
    checkConnection();
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={IOS && "padding"}>
      <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
        <View style={styles.container}>
          <Header
            back
            onBackPress={handleBack}
            title={isArabic ? "الدفع" : "Checkout"}
            titleAlign={isArabic ? "right" : "left"}
          />
          <Alert
            error={alert.error}
            alert={alert.alert}
            img={alert.alertImg}
            btnColor={lightTheme}
            text={alert.alertText}
            title={alert.alertTitle}
            btnText={isArabic ? "حسنا" : "OK"}
            onBtnPress={alert.btnPress || alertClose}
          />
          {!internet ? (
            <NoInternet isArabic={isArabic} onPress={handleRetry} />
          ) : (
            <>
              <ScrollView
                ref={scrollRef}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  ...styles.scrollContainer,
                  justifyContent: userData?.isVerify ? "flex-start" : "center"
                }}
              >
                {userData?.isVerify ? (
                  <>
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
                        <Text style={styles.secondaryWrapperText(isArabic)}>
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
                      btnText={
                        isArabic ? "اختار طريقة الدفع" : "Select Payment Method"
                      }
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
                            primaryText={
                              isArabic ? "رقم البطاقة" : "Card Number"
                            }
                          />
                        )}
                      <View style={styles.pd10}>
                        <Divider />
                      </View>
                      <LIST
                        bold
                        isArabic={isArabic}
                        primaryText={isArabic ? "عنوان" : "Address"}
                        secondaryText={
                          selectedAddress && selectedAddress.address
                            ? selectedAddress.address
                            : "-----"
                        }
                      />
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
                  </>
                ) : (
                  <>
                    <Text
                      ref={contactRef}
                      style={styles.heading(isArabic, true)}
                    >
                      {isArabic ? "أدخل رقم الهاتف" : "Enter Phone Number"}
                    </Text>
                    <TextInput
                      blurOnSubmit
                      value={text}
                      maxLength={9}
                      ref={inputRef}
                      spellCheck={false}
                      autoCorrect={false}
                      keyboardType="phone-pad"
                      placeholder={"501234567"}
                      style={styles.input(isArabic)}
                      onSubmitEditing={makeVerification}
                      onChangeText={text => setText(text)}
                    />
                  </>
                )}
              </ScrollView>
              <View style={styles.footer(isArabic)}>
                <Animatable.View
                  useNativeDriver
                  ref={animatedRef}
                  style={styles.animtedButton}
                >
                  {userData?.isVerify && !orderLoading ? (
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
                      onSlidingSuccess={handleSubmit}
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
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={makeVerification}
                      style={styles.btn(isArabic)}
                      disabled={orderLoading || loading}
                    >
                      {orderLoading || loading ? (
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <ActivityIndicator size="small" color="#fff" />
                        </View>
                      ) : (
                        <Text style={styles.btnText(isArabic)}>
                          {isArabic ? "إرسال التحقق" : "SEND VERIFICATION"}
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                </Animatable.View>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
