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
  DELIVERY_SLOTS,
  PLACEHOLDER_TEXT_COLOR
} from "../../common/constants";
import "moment/locale/ar";
import Axios from "axios";
import moment from "moment";
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
import {
  findCityName,
  makeOtpCode,
  paymentMethod,
  validatePhone
} from "../../common/functions";
import { lightGray, lightTheme, theme } from "../../common/colors";
import { clearCart, onAddressesAction } from "../../redux/actions/user";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

let _isMounted = false;

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
  const [voucher, setVoucher] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [internet, setInternet] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [fetchingLoading, setFetchingLoading] = useState(false);
  const [callBeforeDelivery, setCallBeforeDelivery] = useState(false);
  const [currentLocatioLoading, setCurrentLocatioLoading] = useState(false);
  const {
    app: { language, selectedCity, vouchers = [] },
    user: { userData, addresses, randomCheckout, token, cart }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  console.log(vouchers, " vouchers")

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
    const generateDates = new Array(7).fill("days").map((_, i) => ({
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
    const dates = generateDates.map((v, i) => {
      return {
        ...v,
        enDate: moment()
          .add(i, "d")
          .format()
      };
    });
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
      const otp = makeOtpCode(isArabic);
      console.log(otp.msg, " msg");
      await Axios.post(`${BASE_URL}/sms/send`, {
        text: otp.msg,
        number: `966${text}`
      });
      navigation.navigate("Verification", {
        focusInput,
        animateButton,
        phone: trimText,
        verificationCode: otp.vfCode
      });
    } catch (error) {
      console.log(error, " error in send verification");
      errorMessage();
    } finally {
      setLoading(false);
    }
  };

  const errorMessage = () => {
    setAlert({
      alert: true,
      error: true,
      alertImg: ERROR_IMG,
      alertTitle: isArabic ? "خطأ" : "Error",
      alertText: isArabic
        ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
        : "Sorry, something went wrong. Please try again!"
    });
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
      const amount = total();
      const gatewayURL = `${BASE_URL}/pay/generate?test=0&amount=${amount}&currency=SAR&description=For payment purpose&authorisedUrl=https://www.amahmed.com/done/&declinedUrl=https://www.amahmed.com/declined/&cancelledUrl=https://www.amahmed.com/cancelled/`;
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
      return;
    }
    if (paymentOption?.id === "p-3") {
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
        subTotal: productTotal(),
        locationId: selectedCity?.id,
        vat: calculateVat(),
        comments: comments,
        deliveryDate: selectedDate.enDate,
        deliverySlot: `${selectedSlot.mainTextEn} -- ${selectedSlot.secondaryTextEn}, ${selectedSlot.mainTextAr} -- ${selectedSlot.secondaryTextAr}`,
        callBeforeDelivery: callBeforeDelivery,
        shippingCost: calculateShipping(),
        paymentType: paymentMethod(selectedPayment?.id),
        total: total(),
        discount: calculateDiscount() || 0,
        promoId: selectedVoucher?.code || "",
        payment: {
          paymentRef: ref
        },
        shippingDetails: {
          address: selectedAddress?.address,
          latitude: selectedAddress?.latitude,
          longitude: selectedAddress?.longitude,
          addressId: selectedAddress?.id
        }
      };
      console.log(obj, " place order object");
      const { data } = await Axios.post(`${BASE_URL}/PlaceOrder/submit`, obj);
      console.log(data, " place order response");
      if (data.isError) {
        errorMessage();
        return;
      }
      setSelectedVoucher(null);
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
      errorMessage();
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

  const productTotal = () => {
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
    return parseFloat(sum.toFixed(2));
  };

  const calculateDiscount = () => {
    const subTotal = productTotal() + calculateShipping();
    const value = selectedVoucher?.value;
    const promoType = selectedVoucher?.promoType;
    if (promoType && value) {
      if (promoType == 1) {
        const lessPercentage = subTotal / 100 * parseInt(value);
        return parseFloat(lessPercentage.toFixed(2));
      } else {
        return parseFloat(value.toFixed(2));
      }
    } else {
      return parseInt(0);
    }
  }

  const calculateVat = () => {
    return parseFloat(
      (
        ((productTotal() + calculateShipping()) - calculateDiscount()) * 0.15
      ).toFixed(2)
    );
  };

  const calculateShipping = () => {
    return parseInt(15.0);
  };

  const total = () => {
    return parseFloat(
      (
        (productTotal() + calculateShipping() + calculateVat()) - calculateDiscount()
      ).toFixed(2)
    );
  }

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
        checkCityAddress(data.results[0].formatted_address, lat, lng);
      }
    } catch (error) {
      console.log(error, " error in getting address");
    } finally {
      setCurrentLocatioLoading(false);
    }
  };

  const checkCityAddress = (formattedAddress, lat, lng) => {
    if (!formattedAddress) return;
    const lowerCaseAddress = formattedAddress.toLowerCase();
    const getCityNames = findCityName("");
    const cond = getCityNames.some(element =>
      lowerCaseAddress.includes(element)
    );
    if (!cond) return;
    const obj = {
      latitude: lat,
      longitude: lng,
      address: formattedAddress,
      area: isArabic ? "الموقع الحالي" : "Current Location"
    };

    setSelectedAddress({ ...obj });
    console.log(formattedAddress, " formattedAddress");
    console.log(lowerCaseAddress, " lowerCaseAddress");
    console.log(getCityNames, " getCityNames");
    console.log(cond, " cond");
    console.log(obj, " obj");
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

  const handleVoucher = () => {
    if (!voucher) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic ? "الرجاء إدخال رقم الكود" : "Please enter promo code"
      });
      setSelectedVoucher(null);
      return;
    }
    const find = vouchers.find(o => o.code === voucher);
    if (!find || !find?.isActive || find?.isDeleted) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic ? "رقم الكود غير صحيح!" : "Invalid promo code!"
      });
      setSelectedVoucher(null);
      return;
    }
    const currentTime = new Date().getTime();
    const validTill = new Date(find?.validTill).getTime();
    const diff = validTill - currentTime;
    if (diff < 1) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic ? "انتهت صلاحية رقم الكود!" : "Promo code has been expired!"
      });
      setSelectedVoucher(null);
      return;
    }
    setSelectedVoucher({ ...find });
    console.log("diff ==> ", diff);
    console.log(find, "  voucher");
    console.log(vouchers, "  vouchers");
  }

  console.log(productTotal(), " productTotal");
  console.log(calculateShipping(), " calculateShipping");
  console.log(calculateDiscount(), " calculateDiscount");
  console.log((productTotal() + calculateShipping()) - calculateDiscount(), " Balance");

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

                    {/* Delivery Days Section */}

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

                    {/* Delivery Slots Section */}

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

                    {/* Call before delivery Section */}

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

                    {/* Comment Section */}

                    <TextInput
                      multiline
                      value={comments}
                      numberOfLines={7}
                      spellCheck={false}
                      editable={!orderLoading}
                      autoCorrect={false}
                      keyboardType="default"
                      style={{
                        ...styles.input(isArabic),
                        marginTop: 5,
                        paddingTop: 15,
                        textAlignVertical: "top",
                        height: IOS ? 150 : undefined
                      }}
                      onChangeText={text => setComments(text)}
                      placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                      placeholder={isArabic ? "تعليقات..." : "Any comment..."}
                    />

                    {/* Promo Section */}

                    <Text ref={contactRef} style={styles.heading(isArabic)}>
                      {isArabic ? "رقم الكود" : "Promo Code"}
                    </Text>
                    <View style={styles.voucherWrapper(isArabic)}>
                      <TextInput
                        blurOnSubmit
                        value={voucher}
                        onSubmitEditing={handleVoucher}
                        style={styles.voucherInput(isArabic)}
                        onChangeText={text => setVoucher(text)}
                        placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                        placeholder={isArabic ? "ادخل رقم الكود" : "Enter promo code"}
                      />
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleVoucher}
                        style={styles.voucherBtn}
                      >
                        <Text style={styles.voucherBtnText(isArabic)}>
                          {isArabic ? "تفعيل" : "Apply"}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Order Details Section */}

                    <Text ref={contactRef} style={styles.heading(isArabic)}>
                      {isArabic ? "مخلص الطلب" : "Request sincere"}
                    </Text>
                    <View style={styles.orderCard(isArabic)}>
                      <LIST
                        bold
                        isArabic={isArabic}
                        primaryText={
                          isArabic ? "طريقة الدفع" : "Payment Method"
                        }
                        secondaryText={
                          selectedPayment
                            ? isArabic
                              ? selectedPayment?.nameAr
                              : selectedPayment?.nameEn
                            : "-----"
                        }
                      />
                      <View style={styles.pd10}>
                        <Divider
                          style={{ backgroundColor: PLACEHOLDER_TEXT_COLOR }}
                        />
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
                        <Divider
                          style={{ backgroundColor: PLACEHOLDER_TEXT_COLOR }}
                        />
                      </View>

                      <LIST
                        isArabic={isArabic}
                        secondaryText={productTotal()}
                        primaryText={
                          isArabic ? "إجمالي قيمة الطلب :" : "Total order value :"
                        }
                      />
                      <LIST
                        secondaryText={calculateShipping()}
                        isArabic={isArabic}
                        primaryText={
                          isArabic ? "رسوم التوصيل" : "Delivery Charges :"
                        }
                      />
                      <LIST
                        primaryText={
                          isArabic ? "خصم :" : "Discount :"
                        }
                        isArabic={isArabic}
                        secondaryText={calculateDiscount() || 0}
                      />
                      <LIST
                        isArabic={isArabic}
                        primaryText={
                          isArabic ? "رصيد :" : "Balance :"
                        }
                        secondaryText={(
                          (productTotal() + calculateShipping()) - calculateDiscount()
                        )}
                      />
                      <LIST
                        secondaryText={calculateVat()}
                        isArabic={isArabic}
                        primaryText={
                          isArabic
                            ? "ضريبية القيمة المضافة :"
                            : "VAT :"
                        }
                      />
                      <LIST
                        bold
                        secondaryBold
                        secondaryText={total()}
                        isArabic={isArabic}
                        primaryText={
                          isArabic ? "المجموع الكلي :" : "Total Summation :"
                        }
                      />
                      {/* <Text style={styles.priceMessage(isArabic)}>
                        {isArabic
                          ? "السعر شامل الضريبة"
                          : "All Prices included VAT"}
                      </Text> */}
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
                      placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
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
