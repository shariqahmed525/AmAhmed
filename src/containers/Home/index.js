import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-navigation";
import {
  View,
  Image,
  Text,
  Linking,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import _ from "lodash";
import { useSelector } from "react-redux";
import Swiper from "react-native-swiper";
import styles from "./styles";
import { theme } from "../../common/colors";
import {
  ANDROID,
  ARABIC,
  ITEMS,
  GOAT_MEAT_SLIDERS,
  VEGETABLES_FRUITS_SLIDER,
  CATEGORIES,
  IOS
} from "../../common/constants";
import Header from "../../components/Header";
import Drawer from "../../components/Drawer";
import HomeItem from "../../components/Item";
import SideMenu from "react-native-side-menu";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import { Entypo, Icon, MaterialCommunityIcons } from "../../common/icons";

let _isMounted = false;

const CenterComponent = ({ text, isArabic, navigation }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.titleWrapper(isArabic)}
    onPress={() =>
      navigation.navigate("Category", {
        fromHome: true
      })
    }
  >
    <Text style={styles.title(isArabic)}>{text}</Text>
    <Entypo
      size={20}
      color="#fff"
      name="chevron-thin-down"
      style={{ marginBottom: isArabic ? -5 : 0 }}
    />
  </TouchableOpacity>
);

export default () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [internet, setInternet] = useState(true);
  const { language, selectedCategory, selectedCity } = useSelector(
    state => state.app
  );
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
      IOS ? requestPermission() : checkPermission();
    }
  }, []);

  // notification listner
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      const {
        notification: android,
        data: { notification: ios }
      } = remoteMessage;
      let obj = {};
      if (IOS) {
        obj = {
          title: ios.title,
          message: ios.body
        };
      } else {
        obj = {
          title: android.title,
          message: android.body,
          color: android.android.color
        };
      }
      PushNotification.localNotification({
        ...obj,
        smallIcon: "ic_notification"
      });
    });
    return unsubscribe;
  }, []);

  // Api listner
  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      console.log("need to call api");
    }
  }, [selectedCategory]);

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log(fcmToken, " fcmToken");
    await fetch("https://db49e47b5202.ngrok.io/fcm-test", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: fcmToken,
        // apnsToken: apnsToken,
        platform: IOS ? "Ios" : "android"
      })
    });
  };

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if ((ANDROID && authStatus) || (IOS && enabled)) {
        getToken();
      }
    } catch (error) {
      console.log(error, " error in notification request permission ");
    }
  };

  const handleOpenDialer = () => {
    Linking.openURL("tel:+966568042000");
  };

  const _renderSliderMemo = useMemo(() => {
    const SLIDERS =
      selectedCategory === "g/s" ? GOAT_MEAT_SLIDERS : VEGETABLES_FRUITS_SLIDER;
    return (
      <View style={styles.sliderWrapper}>
        <Swiper
          bounces
          autoplay
          horizontal={false}
          activeDotColor={theme}
          removeClippedSubviews={false}
          containerStyle={styles.swiperWrapper}
        >
          {SLIDERS.map((v, i) => (
            <View key={i} style={styles.sliderImageWrapper}>
              <Image
                source={v}
                resizeMode="stretch"
                resizeMethod="resize"
                style={styles.sliderImage}
              />
            </View>
          ))}
        </Swiper>
      </View>
    );
  }, [selectedCategory]);

  const _renderHeader = () => {
    const catName =
      selectedCategory && selectedCategory.nameAr && selectedCategory.nameEn
        ? isArabic
          ? selectedCategory.nameAr
          : selectedCategory.nameEn
        : isArabic
        ? "اختر الفئة"
        : "Select Category";
    return (
      <Header
        leftIcon={() => (
          <Icon name="md-menu-outline" color={"#fff"} size={30} />
        )}
        rightIcon={() => (
          <View style={styles.rotateIcon(isArabic)}>
            <MaterialCommunityIcons size={30} color={"#fff"} name="phone" />
          </View>
        )}
        component={() => (
          <CenterComponent
            text={catName}
            isArabic={isArabic}
            navigation={navigation}
          />
        )}
        leftIconProps={{
          onPress: () => setIsOpen(true)
        }}
        rightIconProps={{
          onPress: handleOpenDialer
        }}
      />
    );
  };

  const _renderItems = () => {
    // const filter = ITEMS.filter(v => v.category === category);
    // const grouped = _.groupBy(filter, o => o.subcategory(isArabic));
    // const keys = Object.keys(grouped);
    return <View />;
    // return keys.map((v, i) => {
    //   return (
    //     <HomeItem
    //       key={i}
    //       name={v}
    //       tabIndex={i}
    //       data={grouped[v]}
    //       isArabic={isArabic}
    //     />
    //   );
    // });
  };

  return (
    <SideMenu
      isOpen={isOpen}
      onChange={e => setIsOpen(e)}
      menu={
        <Drawer navigation={navigation} drawerClose={() => setIsOpen(false)} />
      }
      menuPosition={isArabic ? "right" : "left"}
    >
      <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
        <View style={styles.container}>
          {_renderHeader()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
          >
            {_renderSliderMemo}
            {_renderItems()}
          </ScrollView>
        </View>
      </SafeAreaView>
    </SideMenu>
  );
};
