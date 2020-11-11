import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
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
  MAP_API_KEY,
  DELIVERY_SLOTS
} from "../../common/constants";
import "moment/locale/ar";
import Axios from "axios";
import styles from "./styles";
import RenderMap from "./RenderMap";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import { SafeAreaView } from "react-navigation";
import NoInternet from "../../components/NoInternet";
import SlotButton from "../../components/SlotButton";
import NetInfo from "@react-native-community/netinfo";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Divider, RadioButton } from "react-native-paper";
import Geolocation from "@react-native-community/geolocation";
import DropdownSection from "../../components/DropdownSection";
import { getRandom, validatePhone } from "../../common/functions";
import { lightGray, lightTheme, theme } from "../../common/colors";
import { clearCart, onAddressesAction } from "../../redux/actions/user";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import moment from "moment";

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

export default props => {
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
  const [ref, setRef] = useState("");
  const [text, setText] = useState("");
  const [dates, setDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [internet, setInternet] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [fetchingLoading, setFetchingLoading] = useState(false);
  const [callBeforeDelivery, setCallBeforeDelivery] = useState(false);
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
      makeDates();
      handleCurrentLocation(true);
    }
  }, []);

  // fetching purpose
  useEffect(() => {
    _isMounted = true;
    const trimText = text.trim();
    if (_isMounted && (trimText || userData?.phone)) {
      fetchingDetails(trimText || userData?.phone);
    }
  }, [randomCheckout]);

  const makeDates = () => {
    moment.locale(isArabic ? "ar" : "en");
    const dates = new Array(7).fill("days").map((_, i) => ({
      id: i + 1,
      name: moment()
        .add(i, "d")
        .format("dddd"),
      fullDate: moment()
        .add(i, "d")
        .format(),
      date: moment()
        .add(i, "d")
        .format("DD-MM-YYYY")
    }));
    moment.locale("en");
    const arr = [];
    DELIVERY_SLOTS.map(v => {
      const currentTime = moment().format("HH");
      const endTime = moment(v.endTime, "ha").format("HH");
      if (currentTime >= endTime) {
        arr.push(false);
      } else {
        arr.push(true);
      }
      return v;
    });

    setDates([...dates]);
    setSlots([...DELIVERY_SLOTS]);

    if (arr.every(Boolean)) {
      setSelectedDate({ ...dates[0] });
      setSelectedSlot({ ...DELIVERY_SLOTS[0] });
      return;
    }
    if (arr.every(o => !o)) {
      setSelectedDate({ ...dates[1] });
      setSelectedSlot({ ...DELIVERY_SLOTS[0] });
      return;
    }
    if (!arr[0]) {
      setSelectedDate({ ...dates[0] });
      setSelectedSlot({ ...DELIVERY_SLOTS[1] });
      return;
    }

    setSelectedDate({ ...dates[0] });
    setSelectedSlot({ ...DELIVERY_SLOTS[0] });
  };

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
      const msg = isArabic
        ? `رمز التعريف : ${verificationCode}`
        : `Your verification code is: ${verificationCode}`;
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

  const paymentError = (
    text = isArabic
      ? "عذرا ، حدث خطأ ما في عملية الدفع. حاول مرة اخرى!"
      : "Sorry, Something went wrong in payment proccess. Please try again!"
  ) => {
    setAlert({
      alert: true,
      error: true,
      alertText: text,
      alertImg: ERROR_IMG,
      alertTitle: isArabic ? "خطأ" : "Error"
    });
  };

  const getPaymentGatewayLink = async () => {
    try {
      const amount = (total() + calculateVat() + calculateShipping()).toFixed(
        2
      );
      const gatewayURL = `https://amahmed.com/api/pay/generate?test=0&amount=1&currency=SAR&description=For payment purpose&authorisedUrl=https://www.amahmed.com/done/&declinedUrl=https://www.amahmed.com/declined/&cancelledUrl=https://www.amahmed.com/cancelled/`;
      setCurrentLocatioLoading(true);
      const { data } = await Axios.get(gatewayURL);
      if (data && data?.order && data?.order?.url) {
        setRef(data?.order?.refs);
        navigation.navigate("Payment", {
          handleCardCallBack,
          paymentGatewayLink: data?.order?.url
        });
        return;
      }
      if (data && data?.error) {
        paymentError();
        return;
      }
    } catch (error) {
      paymentError();
      console.log(error, " error in getting payment gateway link");
    } finally {
      setCurrentLocatioLoading(false);
    }
  };

  const handleAddressListItem = (
    isNew,
    address,
    currentLocation,
    giftAddress
  ) => {
    if (isNew || giftAddress) {
      navigation.navigate("PinLocation", {
        fromCheckout: true,
        textEn: giftAddress ? "Gift Address" : "New Address",
        textAr: giftAddress ? "إرسال هدية" : "موقع جديد"
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
      setTimeout(() => {
        animatedRef.current.bounceIn(1000);
      }, 500);
    }
  };

  const handleCardCallBack = status => {
    if (status === "declined") {
      paymentError(isArabic ? "بطاقة غير صالحة!" : "Invalid Card!");
      setSelectedPayment(null);
      return;
    }
    setSelectedPayment({ ...payments.find(o => o.id === "p-2") });
    setTimeout(() => {
      animatedRef.current.bounceIn(1000);
    }, 500);
  };

  const handleOnlineTransferCallBack = () => {
    if (!selectedAddress || !selectedAddress?.address) {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    } else {
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
        items: cartItems,
        status: "pending",
        phone: userData?.phone,
        subTotal: total().toFixed(2),
        locationId: selectedCity?.id,
        vat: calculateVat().toFixed(2),
        comments: comments,
        deliveryDate: selectedDate.fullDate,
        deliverySlot: selectedSlot,
        callBeforeDelivery: callBeforeDelivery,
        shippingCost: calculateShipping().toFixed(2),
        paymentType: paymentMethod(selectedPayment?.id),
        total: (total() + calculateVat() + calculateShipping()).toFixed(2),
        payment: {
          ref: ref
          // cvv: cardDetails?.cvv,
          // expiry: cardDetails?.expiry,
          // cardNumber: cardDetails?.cardNumber,
          // cardHolderName: cardDetails?.cardHolderName
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
    setTimeout(() => {
      navigation.navigate("MyOrders");
    }, 0);
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

  const getAddressDetails = async (lat, lng, fromStart) => {
    try {
      if (!fromStart) setCurrentLocatioLoading(true);
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
      }
    } catch (error) {
      console.log(error, " error in getting address");
    } finally {
      setCurrentLocatioLoading(false);
    }
  };

  const getLocation = fromStart => {
    Geolocation.getCurrentPosition(
      info => {
        if (info?.coords) {
          const coords = info?.coords;
          getAddressDetails(coords.latitude, coords.longitude, fromStart);
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

  const handleCurrentLocation = fromStart => {
    if (IOS) {
      getLocation(fromStart);
      return;
    }
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    })
      .then(() => {
        getLocation(fromStart);
      })
      .catch(err => {
        if (err && err.code === "ERR00") {
          return;
        }
        getLocation();
      });
  };

  const keyExtractor = (item, index) => item + index;

  const handleSelectedDate = date => {
    if (selectedDate?.id === date?.id) {
      return;
    }
    if (date?.id === 1) {
      moment.locale("en");
      const arr = [];
      DELIVERY_SLOTS.map(v => {
        const currentTime = moment().format("HH");
        const endTime = moment(v.endTime, "ha").format("HH");
        if (currentTime >= endTime) {
          arr.push(false);
        } else {
          arr.push(true);
        }
        return v;
      });
      if (arr.every(Boolean)) {
        setSelectedDate({ ...date });
        return;
      }
      if (arr.every(o => !o)) {
        setAlert({
          alert: true,
          error: true,
          alertImg: ERROR_IMG,
          alertTitle: isArabic ? "خطأ" : "Error",
          alertText: isArabic
            ? "عذرًا ، لا يمكنك تحديد تاريخ لا تتوفر فيه فترة زمنية"
            : "Sorry, you cannot select a date for which no slot is available"
        });
        return;
      }
      if (!arr[0]) {
        setSelectedDate({ ...date });
        setSelectedSlot({ ...DELIVERY_SLOTS[1] });
        return;
      }
      setSelectedDate({ ...date });
      return;
    }
    setSelectedDate({ ...date });
  };

  const handleSelectedSlot = slot => {
    if (selectedSlot?.id === slot?.id) {
      return;
    }
    if (selectedDate?.id === 1) {
      const currentTime = moment().format("HH");
      const endTime = moment(slot.endTime, "ha").format("HH");
      if (currentTime >= endTime) {
        setAlert({
          alert: true,
          error: true,
          alertImg: ERROR_IMG,
          alertTitle: isArabic ? "خطأ" : "Error",
          alertText: isArabic
            ? "عذرًا ، لا يمكنك تحديد فترة زمنية سابقة"
            : "Sorry, you can't select a past slot"
        });
      } else {
        setSelectedSlot({ ...slot });
      }
      return;
    }
    setSelectedSlot({ ...slot });
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
                      title={isArabic ? "عنوان التوصيل" : "Delivery Address"}
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
                        isArabic ? "اختر طريقة الدفع" : "Select Payment Method"
                      }
                    />
                    <Text ref={contactRef} style={styles.heading(isArabic)}>
                      {isArabic ? "ايام التوصيل" : "Delivery Days"}
                    </Text>
                    <FlatList
                      horizontal
                      data={dates}
                      extraData={props}
                      inverted={isArabic}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.verticalScroll}
                      renderItem={({ item }) => (
                        <SlotButton
                          isArabic={isArabic}
                          mainText={item.name}
                          secondaryText={item.date}
                          isActive={item.id === selectedDate?.id}
                          onPress={() => handleSelectedDate(item)}
                        />
                      )}
                      keyExtractor={keyExtractor}
                    />

                    <Text ref={contactRef} style={styles.heading(isArabic)}>
                      {isArabic ? "وقت التوصيل" : "Delivery Slots"}
                    </Text>
                    <FlatList
                      horizontal
                      data={slots}
                      extraData={props}
                      inverted={isArabic}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.verticalScroll}
                      renderItem={({ item }) => (
                        <SlotButton
                          isArabic={isArabic}
                          onPress={() => handleSelectedSlot(item)}
                          isActive={item.id === selectedSlot?.id}
                          mainText={
                            isArabic ? item?.mainTextAr : item?.mainTextEn
                          }
                          secondaryText={
                            isArabic
                              ? item?.secondaryTextAr
                              : item?.secondaryTextEn
                          }
                        />
                      )}
                      keyExtractor={keyExtractor}
                    />

                    <RadioButton.Group
                      value={true}
                      onValueChange={() =>
                        setCallBeforeDelivery(!callBeforeDelivery)
                      }
                    >
                      <RadioButton.Item
                        value={true}
                        disabled={orderLoading}
                        style={styles.radioItem(isArabic)}
                        labelStyle={styles.radioItemText(isArabic)}
                        color={callBeforeDelivery ? theme : lightGray}
                        label={
                          isArabic
                            ? "الاتصال قبل التوصيل"
                            : "Call before delivery"
                        }
                      />
                    </RadioButton.Group>
                    <TextInput
                      multiline
                      value={comments}
                      numberOfLines={12}
                      spellCheck={false}
                      editable={!orderLoading}
                      autoCorrect={false}
                      keyboardType="default"
                      style={{
                        ...styles.input(isArabic),
                        marginTop: 5,
                        textAlignVertical: "top",
                        paddingTop: 15,
                        height: IOS ? 150 : undefined
                      }}
                      onChangeText={text => setComments(text)}
                      placeholder={isArabic ? "تعليقات..." : "Any comment..."}
                    />
                    <Text ref={contactRef} style={styles.heading(isArabic)}>
                      {isArabic ? "تفاصيل الطلب" : "Order Details"}
                    </Text>
                    <View style={styles.orderCard(isArabic)}>
                      <LIST
                        bold
                        isArabic={isArabic}
                        primaryText={
                          isArabic ? "طريقة الدفع" : "Payment Method"
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
                      {isArabic ? "أدخل رقم الجوال" : "Enter Phone Number"}
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
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={handleSubmit}
                      style={styles.btn(isArabic)}
                      disabled={orderLoading || loading}
                    >
                      <Text
                        style={{
                          ...styles.btnText(isArabic),
                          fontSize: isArabic ? WIDTH * 0.05 : WIDTH * 0.045
                        }}
                      >
                        {isArabic ? "إنهاء الطلب" : "PLACE ORDER"}
                      </Text>
                    </TouchableOpacity>
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
                          {isArabic ? "إرسال رمز التحقق" : "SEND VERIFICATION"}
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
