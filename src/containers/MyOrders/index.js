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
import styles from "./styles";
import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { ANDROID, ARABIC } from "../../common/constants";
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

const _renderItems = ({ items, index, isArabic, lastIndex, isPast }) => {
  return (
    <View style={styles.orderListWrapper(isArabic)}>
      <View style={styles.orderListHeader(isArabic)}>
        <Text style={styles.title(isArabic)}>
          {isArabic ? "مكه" : "Makkah"}
        </Text>
        <Text style={styles.totalPrice(isArabic)}>
          {!isArabic && "SAR "}
          <Text style={styles.price(isArabic)}>340 </Text>
          {isArabic && "ر.س "}
        </Text>
      </View>
      <View style={styles.orderListBody}>
        <View style={styles.orderListItemWrapper(false)}>
          <Text style={styles.orderListItem(isArabic)}>
            {isArabic ? "كلوب ساندوتش" : "Club Sandwich"}
          </Text>
        </View>
        <View style={styles.orderListItemWrapper(false)}>
          <Text style={styles.orderListItem(isArabic)}>
            {isArabic ? "شواية ساندوتش" : "Grill Sandwich"}
          </Text>
        </View>
        <View style={styles.orderListItemWrapper(true)}>
          <Text style={styles.orderListItem(isArabic)}>
            {isArabic ? "برجر زنجر" : "Zinger Burger"}
          </Text>
        </View>
      </View>
      <View style={styles.orderListFooter(isArabic)}>
        <View style={styles.orderListItemDateWrapper(isArabic)}>
          <Text style={styles.orderListItemDate(isArabic)}>
            {isArabic ? "17 مارس" : "17 March"}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.orderListItemDate(isArabic)}>
            {isArabic ? "06:56 مساءً" : "06:56 PM"}
          </Text>
        </View>
        <View
          style={styles.orderListItemStatus(
            isPast ? (index === 0 ? cancelled : delivered) : pending
          )}
        >
          <Text style={styles.orderListStatusText(isArabic)}>
            {isPast
              ? index === 0
                ? isArabic
                  ? "ألغيت"
                  : "Cancelled"
                : isArabic
                ? "تم التوصيل"
                : "Delivered"
              : isArabic
              ? "قيد الانتظار"
              : "Pending"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const keyExtractor = (item, index) => item + index;

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          title={isArabic ? "طلباتي" : "My Orders"}
          titleAlign={isArabic ? "right" : "left"}
        />
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
                <Text style={styles.tabItemText(isArabic, i === currentIndex)}>
                  {v.name(isArabic)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {loading ? (
          <View style={styles.loaderWrapper}>
            <LottieView
              loop
              autoPlay
              style={styles.loader}
              source={require("../../../assets/animations/loader.json")}
            />
          </View>
        ) : (
          TABS.map((v, i) => {
            return (
              i === currentIndex && (
                <FlatList
                  key={i}
                  data={v.data}
                  extraData={props}
                  keyExtractor={keyExtractor}
                  contentContainerStyle={styles.orderList}
                  renderItem={props =>
                    _renderItems({
                      ...props,
                      isArabic,
                      isPast: v.code === "pst",
                      lastIndex: v.data.length - 1
                    })
                  }
                />
              )
            );
          })
        )}
      </View>
    </SafeAreaView>
  );
};
