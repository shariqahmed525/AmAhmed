import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Axios from "axios";
import styles from "./styles";
import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import NoInternet from "../../components/NoInternet";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { ANDROID, ARABIC, BASE_URL } from "../../common/constants";
import { theme, delivered, cancelled, pending } from "../../common/colors";

const TABS = [
  {
    code: "act",
    name: isArabic => (isArabic ? "تيار" : "CURRENT"),
    data: [0, 1, 2, 3, 4, 5, 6, 7]
  },
  {
    code: "pst",
    name: isArabic => (isArabic ? "التاريخ" : "HISTORY"),
    data: [0, 1, 2, 3, 4, 5, 6, 7]
  }
];

const _renderItems = ({ item, index, isArabic, isPast }) => {
  return (
    <View style={styles.orderListWrapper(isArabic)}>
      <View style={styles.orderListHeader(isArabic)}>
        <Text style={styles.title(isArabic)}>
          {isArabic ? item?.locationNameAr : item?.locationNameEn}
        </Text>
        <Text style={styles.totalPrice(isArabic)}>
          {!isArabic && "SAR "}
          <Text style={styles.price(isArabic)}>{item?.total} </Text>
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
        {/* <View style={styles.orderListItemDateWrapper(isArabic)}>
          <Text style={styles.orderListItemDate(isArabic)}>
            {isArabic ? "17 مارس" : "17 March"}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.orderListItemDate(isArabic)}>
            {isArabic ? "06:56 مساءً" : "06:56 PM"}
          </Text>
        </View> */}
        <View
          style={styles.orderListItemStatus(delivered)}
          // style={styles.orderListItemStatus(
          //   isPast ? (index === 0 ? cancelled : delivered) : pending
          // )}
        >
          <Text style={styles.orderListStatusText(isArabic)}>
            {isArabic ? item?.orderStatusAr : item?.orderStatusEn}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [internet, setInternet] = useState(true);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [pendingLoading, setPendingLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    app: { language },
    user: { userData }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    checkConnection(getPendingOrders);
    checkConnection(getHistoryOrders);
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
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

  const handleRetry = () => {};

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          title={isArabic ? "طلباتي" : "My Orders"}
          titleAlign={isArabic ? "right" : "left"}
        />
        {!internet ? (
          <NoInternet isArabic={isArabic} onPress={handleRetry} />
        ) : (
          <>
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
                      isArabic
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
