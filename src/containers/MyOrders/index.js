import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity
} from "react-native";
import {
  TABS,
  ARABIC,
  ANDROID,
  BASE_URL,
  INFO_IMG,
  ERROR_IMG
} from "../../common/constants";
import Axios from "axios";
import "moment/locale/ar";
import moment from "moment";
import styles from "./styles";
import { useSelector } from "react-redux";
import Alert from "../../components/Alert";
import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import { EvilIcons } from "../../common/icons";
import { SafeAreaView } from "react-navigation";
import NoInternet from "../../components/NoInternet";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { theme, delivered, lightTheme } from "../../common/colors";

let _isMounted = false;

const _renderItems = ({ item, isArabic, onDeletePress }) => {
  moment.locale(isArabic ? "ar" : "en");
  return (
    <View style={styles.orderListWrapper(isArabic)}>
      <View style={styles.orderListHeader(isArabic)}>
        <Text style={styles.title(isArabic)}>
          {isArabic
            ? item?.userLocationAr
              ? item?.userLocationAr
              : "الموقع الحالي"
            : item?.userLocationEn
            ? item?.userLocationEn
            : "Current Location"}
        </Text>
        <Text style={styles.totalPrice(isArabic)}>
          {!isArabic && "SAR "}
          <Text style={styles.price(isArabic)}>
            {item?.total}{" "}
          </Text>
          {isArabic && "ر.س "}
        </Text>
      </View>
      <View style={styles.orderListBody}>
        {item?.items?.map((v, i) => (
          <View
            key={i}
            style={styles.orderListItemWrapper(i === item?.items?.length - 1)}
          >
            <Text style={styles.orderListItem(isArabic)}>
              {isArabic ? v.nameAr : v.nameEn}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.orderListFooter(isArabic)}>
        <View style={styles.orderListItemDateWrapper(isArabic)}>
          <Text style={styles.orderListItemDate(isArabic)}>
            {moment(item?.date).format("DD MMM.")}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.orderListItemDate(isArabic)}>
            {moment(item?.date).format("hh:mm A")}
          </Text>
        </View>
        <View style={styles.orderListItemStatus(delivered)}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.orderListStatusText(isArabic)}
          >
            {isArabic ? item?.orderStatusAr : item?.orderStatusEn}
          </Text>
        </View>
      </View>
      <View style={styles.afterFooter(isArabic)}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onDeletePress(item.orderId)}
        >
          <EvilIcons size={25} color={theme} name="trash" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default props => {
  const navigation = useNavigation();
  const [internet, setInternet] = useState(true);
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [pendingLoading, setPendingLoading] = useState(true);
  const {
    app: { language },
    user: { userData }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
      checkConnection(getPendingOrders);
      checkConnection(getHistoryOrders);
    }
  }, []);

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

  const getPendingOrders = async () => {
    if (!userData) {
      setPendingLoading(false);
      return;
    }
    try {
      setPendingLoading(true);
      const { data } = await Axios.get(
        `${BASE_URL}/Orders/customer/${userData.phone}/pending/1`
      );
      console.log("getPendingOrders ===> ", data);
      if (data && data.length > 0) {
        setPendingOrders([...data]);
      }
    } catch (error) {
      console.log(error, " error in getting pending orders");
    } finally {
      setPendingLoading(false);
    }
  };

  const getHistoryOrders = async () => {
    if (!userData) {
      setHistoryLoading(false);
      return;
    }
    try {
      setHistoryLoading(true);
      const { data } = await Axios.get(
        `${BASE_URL}/Orders/customer/${userData.phone}/pending/0`
      );
      console.log("getHistoryOrders ===> ", data);
      if (data && data.length > 0) {
        setHistoryOrders([...data]);
      }
    } catch (error) {
      console.log(error, " error in getting history orders");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const keyExtractor = (item, index) => item + index;

  const handleRetry = () => {
    checkConnection(getPendingOrders);
    checkConnection(getHistoryOrders);
  };

  const handleConfirm = (orderId, isPast) => {
    setAlert({
      alert: true,
      error: false,
      btnPress: () => onDeletePress(orderId, isPast),
      cancelText: isArabic ? "إلغاء" : "Cancel",
      alertText: isArabic
        ? "هل أنت متأكد من حذف هذا الطلب؟"
        : "Are you sure to delete this order?"
    });
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  const onDeletePress = (orderId, isPast) => {
    checkConnection(() => deleteOrder(orderId, isPast));
    alertClose();
  };

  const deleteOrder = async (orderId, isPast) => {
    try {
      setDeleteLoading(true);
      console.log(orderId, " order id");
      await Axios.get(`${BASE_URL}/Orders/hide/orderId/${orderId}`);
      if (isPast) {
        setHistoryOrders(res => [...res.filter(o => o.orderId !== orderId)]);
      } else {
        setPendingOrders(res => [...res.filter(o => o.orderId !== orderId)]);
      }
      setAlert({
        alert: true,
        error: false,
        alertImg: INFO_IMG,
        alertText: isArabic
          ? "تم حذف العنوان بنجاح!"
          : "Order deleted successfully!"
      });
    } catch (error) {
      console.log(error, " error in deleting order");
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
      setDeleteLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          title={isArabic ? "طلباتي" : "My Orders"}
          titleAlign={isArabic ? "right" : "left"}
        />
        <Alert
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          btnColor={lightTheme}
          text={alert.alertText}
          title={alert.alertTitle}
          onCancelPress={alertClose}
          cancelText={alert.cancelText}
          btnText={isArabic ? "حسنا" : "OK"}
          onBtnPress={alert.btnPress || alertClose}
        />

        {!internet ? (
          <NoInternet isArabic={isArabic} onPress={handleRetry} />
        ) : (
          <>
            {deleteLoading && (
              <View style={styles.absoluteLoaderWrapper}>
                <LottieView
                  loop
                  autoPlay
                  style={styles.loader}
                  source={require("../../../assets/animations/loader.json")}
                />
              </View>
            )}
            <View style={styles.tabs(isArabic)}>
              {TABS.map((v, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.7}
                    onPress={() => setCurrentIndex(i)}
                    style={styles.tabItem(
                      isArabic,
                      i === currentIndex,
                      i === 0,
                      i === TABS.length - 1
                    )}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.tabItemText(isArabic, i === currentIndex)}
                    >
                      {v.name(isArabic)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {currentIndex === 0 ? (
              pendingLoading ? (
                <View style={styles.loaderWrapper}>
                  <LottieView
                    loop
                    autoPlay
                    style={styles.loader}
                    source={require("../../../assets/animations/loader.json")}
                  />
                </View>
              ) : !pendingOrders || pendingOrders.length < 1 ? (
                <View style={styles.loaderWrapper}>
                  <Text style={styles.notFound(isArabic)}>
                    {isArabic
                      ? "ليس لديك أي طلب نشط"
                      : "You don't have any active order"}
                  </Text>
                </View>
              ) : (
                <FlatList
                  extraData={props}
                  data={pendingOrders}
                  keyExtractor={keyExtractor}
                  contentContainerStyle={styles.orderList}
                  renderItem={props =>
                    _renderItems({
                      ...props,
                      isArabic,
                      onDeletePress: orderId => handleConfirm(orderId)
                    })
                  }
                />
              )
            ) : historyLoading ? (
              <View style={styles.loaderWrapper}>
                <LottieView
                  loop
                  autoPlay
                  style={styles.loader}
                  source={require("../../../assets/animations/loader.json")}
                />
              </View>
            ) : !historyOrders || historyOrders.length < 1 ? (
              <View style={styles.loaderWrapper}>
                <Text style={styles.notFound(isArabic)}>
                  {isArabic
                    ? "لم يتم العثور على ترتيب محفوظات"
                    : "No history order found"}
                </Text>
              </View>
            ) : (
              <FlatList
                extraData={props}
                data={historyOrders}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.orderList}
                renderItem={props =>
                  _renderItems({
                    ...props,
                    isArabic,
                    onDeletePress: orderId => handleConfirm(orderId, isPast),
                    isPast: true
                  })
                }
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
