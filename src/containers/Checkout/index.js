import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import {
  IOS,
  WIDTH,
  ARABIC,
  ANDROID,
  payments,
  BASE_URL,
  ERROR_IMG,
  THANKS_IMG,
  MAP_API_KEY
} from "../../common/constants";
import Axios from "axios";
import styles from "./styles";
import RenderMap from "./RenderMap";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import NoInternet from "../../components/NoInternet";
import NetInfo from "@react-native-community/netinfo";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { lightTheme, theme } from "../../common/colors";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import DropdownSection from "../../components/DropdownSection";
import { getRandom, validatePhone } from "../../common/functions";
import { RNSlidingButton, SlideDirection } from "rn-sliding-button";
import { clearCart, onAddressesAction } from "../../redux/actions/user";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

let _isMounted = false;

const paymentMethod = id => {
  switch (id) {
    case "p-2":
      return "card";
    case "p-3":
      return "online";
    default:
      return "cod";
  }
};

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
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
  const [cardDetails, setCardDetails] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [fetchingLoading, setFetchingLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentLocatioLoading, setCurrentLocatioLoading] = useState(false);
  const {
    app: { language, selectedCity },
    user: { userData, addresses, randomCheckout, token, cart }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
    }
  }, []);

  // fetching purpose
  useEffect(() => {
    _isMounted = true;
    if (_isMounted && userData) {
      fetchingDetails(userData.phone);
    }
  }, [randomCheckout]);

  const fetchingDetails = async phone => {
    try {
      setFetchingLoading(true);
      await Axios.post(`${BASE_URL}/users/update`, {
        id: phone,
        Token: token
      });
      const { data } = await Axios.get(
        `${BASE_URL}/UserAddresses/get/mob/${phone}`
      );
      if (data && data.length > 0) {
        dispatch(onAddressesAction([...data]));
      } else {
        dispatch(onAddressesAction([]));
      }
    } catch (error) {
      console.log(error, " error in fetchingDetails");
    } finally {
      setFetchingLoading(false);
    }
  };

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
      // const msg = isArabic
      //   ? `رمز التحقق الخاص بـعم أحمد الخاص بك هو: ${verificationCode}`
      //   : `Your AmAhmed's verification code is: ${verificationCode}`;
      const msg = isArabic
        ? `استخدم OTP هذا: ${verificationCode}`
        : `Use this OTP: ${verificationCode}`;
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

  const getPaymentGatewayLink = async () => {
    try {
      const { data } = await Axios.post(
        `https://secure.telr.com/gateway/order.json`,
        {
          method: "create",
          store: 23837,
          authkey: "Jcv9^NQJPW@6vh73",
          order: {
            cartid: `${getRandom(10)}-${getRandom(1)}`,
            test: "0",
            amount: "1",
            // amount: `${(total() + calculateVat() + calculateShipping()).toFixed(
            //   2
            // )}`,
            currency: "SAR",
            description: "Test Transaction",
            trantype: "ecom"
          },
          customer: {
            ref: `${new Date().getFullYear()}`,
            email: "sales@amahmed.com",
            name: {
              forenames: "Ahmed",
              surname: "Am"
            },
            address: {
              line1: selectedAddress?.address,
              city: selectedCity?.nameEn,
              country: "SA"
            },
            phone: `966${userData?.phone}`
          },
          return: {
            authorised: "https://www.amahmed.com/done/",
            declined: "https://www.amahmed.com/declined/",
            cancelled: "https://www.amahmed.com/cancelled/"
          }
        }
      );
      console.log(data, " response");
      if (data && data?.order && data?.order?.url) {
        navigation.navigate("Payment", {
          handleCardCallBack,
          paymentGatewayLink: data?.order?.url
        });
      }
    } catch (error) {
      console.log(error, " error in getting payment gateway link");
    }
  };

  const handleAddressListItem = (isNew, address, currentLocation) => {
    if (isNew) {
      navigation.navigate("PinLocation", {
        fromCheckout: true
      });
      return;
    }
    if (currentLocation) {
      handleCurrentLocation();
      return;
    }
    if (!address) {
      setSelectedAddress(null);
      return;
    }
    setSelectedAddress({ ...address });
    scrollRef.current.scrollToEnd({ animated: true });
    if (
      (selectedPayment &&
        selectedPayment?.id === "p-2" &&
        cardDetails &&
        cardDetails?.cardNumber) ||
      selectedPayment
    ) {
      setTimeout(() => {
        animatedRef.current.bounceIn(1000);
      }, 500);
    }
  };

  const handlePaymentListItem = paymentOption => {
    if (!paymentOption) return;
    if (paymentOption?.id === "p-1") {
      setCardDetails(null);
      setSelectedPayment({ ...paymentOption });
    }
    if (paymentOption?.id === "p-2") {
      if (!selectedAddress || !selectedAddress?.address) {
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
      getPaymentGatewayLink();
      // navigation.navigate("Payment", {
      //   handleCardCallBack
      // });
      return;
    }
    if (paymentOption?.id === "p-3") {
      setCardDetails(null);
      setSelectedPayment({ ...paymentOption });
      navigation.navigate("OnlineTransfer", {
        handleOnlineTransferCallBack
      });
      return;
    }
    if (!selectedAddress || !selectedAddress?.address) {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    } else {
      scrollRef.current.scrollToEnd({ animated: true });
      setTimeout(() => {
        animatedRef.current.bounceIn(1000);
      }, 500);
    }
  };

  const handleCardCallBack = status => {
    if (status === "other") {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "عذرا ، حدث خطأ ما في عملية الدفع. حاول مرة اخرى!"
          : "Sorry, Something went wrong in payment proccess. Please try again!"
      });
      setSelectedPayment(null);
      return;
    }
    setSelectedPayment({ ...payments.find(o => o.id === "p-2") });
    scrollRef.current.scrollToEnd({
      animated: true
    });
    setTimeout(() => {
      animatedRef.current.bounceIn(1000);
    }, 500);
    // if (!cardDetails) return;
    // setCardDetails({ ...cardDetails });
    // if (!selectedAddress || !selectedAddress?.address) {
    //   scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    // } else {
    //   scrollRef.current.scrollToEnd({ animated: true });
    //   setTimeout(() => {
    //     animatedRef.current.bounceIn(1000);
    //   }, 500);
    // }
  };

  const handleOnlineTransferCallBack = () => {
    if (!selectedAddress || !selectedAddress?.address) {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    } else {
      scrollRef.current.scrollToEnd({ animated: true });
      setTimeout(() => {
        animatedRef.current.bounceIn(1000);
      }, 500);
    }
  };

  const handleSubmit = () => {
    if (!selectedAddress || !selectedAddress?.address) {
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
      scrollRef.current.scrollToEnd({ animated: true });
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
    if (
      selectedPayment &&
      selectedPayment?.id === "p-2" &&
      (!cardDetails ||
        !cardDetails?.cardNumber ||
        !cardDetails?.expiry ||
        !cardDetails?.cvv ||
        !cardDetails?.cardHolderName)
    ) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء استكمال تفاصيل البطاقة"
          : "Please complete card details"
      });
      return;
    }
    placeOrder();
  };

  const placeOrder = async () => {
    try {
      setOrderLoading(true);
      const cartItems = cart.map(v => {
        return {
          productId: v.id,
          quantity: v.quantity,
          packingId: v.hasPacking ? v?.packing?.id : null,
          cuttingWayId: v.hasCuttingWay ? v?.cuttingWay?.id : null,
          headAndLegId: v.hasHeadAndLegs ? v?.headAndLeg?.id : null
        };
      });
      const obj = {
        phone: userData?.phone,
        locationId: selectedCity?.id,
        items: cartItems,
        status: "pending",
        subTotal: total().toFixed(2),
        vat: calculateVat().toFixed(2),
        shippingCost: calculateShipping().toFixed(2),
        total: (total() + calculateVat() + calculateShipping()).toFixed(2),
        paymentType: paymentMethod(selectedPayment?.id),
        payment: {
          postalCode: "",
          cvv: cardDetails?.cvv,
          expiry: cardDetails?.expiry,
          cardNumber: cardDetails?.cardNumber,
          cardHolderName: cardDetails?.cardHolderName
        },
        shippingDetails: {
          address: selectedAddress?.address,
          latitude: selectedAddress?.latitude,
          longitude: selectedAddress?.longitude
        }
      };
      console.log(obj, " place order object");
      await Axios.post(`${BASE_URL}/PlaceOrder/submit`, obj);
      dispatch(clearCart());
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
    } catch (error) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
          : "Sorry, something went wrong. Please try again!"
      });
      console.log(error, " error in place order");
    } finally {
      setOrderLoading(false);
    }
  };

  const btnPress = () => {
    navigation.goBack();
    navigation.navigate("Home");
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
      <RenderMap
        navigation={navigation}
        isArabic={isArabic}
        city={selectedCity}
      />
    ),
    [isArabic, selectedCity, randomCheckout]
  );

  const total = () => {
    if (!cart || cart.length < 1) return 0;
    const makeSumArr = cart.map(val => {
      const pp = val?.discount > 0 ? val?.discount : val?.price;
      const cuttingWayPrice =
        val?.hasCuttingWay && val?.cuttingWay && val?.cuttingWay?.cost
          ? val?.cuttingWay?.cost
          : 0;
      const headAndLegsPrice =
        val?.hasHeadAndLegs && val?.headAndLeg && val?.headAndLeg?.cost
          ? val?.headAndLeg?.cost
          : 0;
      const packingPrice =
        val?.hasPacking && val?.packing && val?.packing?.cost
          ? val?.packing?.cost
          : 0;
      const totalItemCost =
        pp + cuttingWayPrice + headAndLegsPrice + packingPrice;
      return totalItemCost * val.quantity;
    });
    const sum = makeSumArr.reduce((partialSum, o) => {
      return partialSum + o;
    }, 0);
    return sum;
  };

  const calculateVat = () => {
    return total() * 0.15;
  };

  const calculateShipping = () => {
    return total() < 200 ? 40 : 0;
  };

  const getAddressDetails = async (lat, lng) => {
    try {
      setCurrentLocatioLoading(true);
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
        const formattedAddress = data.results[0].formatted_address;
        const obj = {
          latitude: lat,
          longitude: lng,
          address: formattedAddress,
          area: isArabic ? "الموقع الحالي" : "Current Location"
        };
        setSelectedAddress({ ...obj });
        scrollRef.current.scrollToEnd({ animated: true });
        if (
          (selectedPayment &&
            selectedPayment?.id === "p-2" &&
            cardDetails &&
            cardDetails?.cardNumber) ||
          selectedPayment
        ) {
          setTimeout(() => {
            animatedRef.current.bounceIn(1000);
          }, 500);
        }
      }
    } catch (error) {
      console.log(error, " error in getting address");
    } finally {
      setCurrentLocatioLoading(false);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        if (info?.coords) {
          const coords = info?.coords;
          getAddressDetails(coords.latitude, coords.longitude);
        } else {
          setAlert({
            alert: true,
            error: true,
            alertImg: ERROR_IMG,
            alertTitle: isArabic ? "خطأ" : "Error",
            alertText: isArabic
              ? "عذرا ، هناك مشكلة في الحصول على الموقع. يرجى محاولة إضافة العنوان يدويًا"
              : "Sorry, there is a problem in getting location. Please try to add address manually"
          });
        }
      },
      error => {
        console.log(error, " error in getting location");
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };

  const handleCurrentLocation = () => {
    if (IOS) {
      getLocation();
      return;
    }
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    })
      .then(() => {
        getLocation();
      })
      .catch(err => {
        if (err && err.code === "ERR00") {
          return;
        }
        getLocation();
      });
  };

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
          {currentLocatioLoading && (
            <View style={styles.activityLoader}>
              <ActivityIndicator size="large" color={theme} />
            </View>
          )}
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
                      loading={fetchingLoading}
                      selected={selectedAddress}
                      onPress={handleAddressListItem}
                      btnText={isArabic ? "حدد العنوان" : "Select Address"}
                      title={isArabic ? "الرأس والساقين" : "Delivery Address"}
                    />

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
                          isArabic
                            ? selectedPayment?.nameAr
                            : selectedPayment?.nameEn
                        }
                      />
                      {selectedPayment &&
                        selectedPayment?.id === "p-2" &&
                        cardDetails &&
                        cardDetails?.cardNumber && (
                          <LIST
                            isArabic={isArabic}
                            secondaryText={cardDetails?.cardNumber}
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
                        secondaryText={total().toFixed(2)}
                        primaryText={
                          isArabic
                            ? "المبلغ قبل الضريبة :"
                            : "Total (Exculding VAT) :"
                        }
                      />
                      <LIST
                        secondaryText={calculateVat().toFixed(2)}
                        isArabic={isArabic}
                        primaryText={
                          isArabic
                            ? "الضريبة قيمة المضافة 15% :"
                            : "VAT (15%) :"
                        }
                      />
                      <LIST
                        secondaryText={calculateShipping().toFixed(2)}
                        isArabic={isArabic}
                        primaryText={
                          isArabic ? "تكلفة الشحن :" : "Shipping Cost :"
                        }
                      />
                      <LIST
                        bold
                        secondaryBold
                        secondaryText={(
                          total() +
                          calculateVat() +
                          calculateShipping()
                        ).toFixed(2)}
                        isArabic={isArabic}
                        primaryText={
                          isArabic
                            ? "المبلغ بعدالضريبة المضافة :"
                            : "Total (Including VAT) :"
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
