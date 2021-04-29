import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-navigation";
import {
  View,
  Text,
  Linking,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import _ from "lodash";
import Axios from "axios";
import styles from "./styles";
import Swiper from "react-native-swiper";
import Header from "../../components/Header";
import Drawer from "../../components/Drawer";
import HomeItem from "../../components/Item";
import LottieView from "lottie-react-native";
import SideMenu from "react-native-side-menu";
import FastImage from "react-native-fast-image";
import NotFound from "../../components/NotFound";
import NoInternet from "../../components/NoInternet";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import ProgressImage from "react-native-image-progress";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import { theme, backgroundColor } from "../../common/colors";
import PushNotification from "react-native-push-notification";
import { onSaveUserTokenAction } from "../../redux/actions/user";
import { IOS, ANDROID, ARABIC, BASE_URL } from "../../common/constants";
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
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [sliders, setSliders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [internet, setInternet] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [sliderLoading, setSliderLoading] = useState(true);
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
      if (typeof getSubCategories === "function") {
        checkConnection(getSliders);
        checkConnection(getSubCategories);
      }
    }
  }, [selectedCategory]);

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log(fcmToken, " fcmToken");
    dispatch(onSaveUserTokenAction(fcmToken));
  };

  const checkConnection = func => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setLoading(false);
        setSliderLoading(false);
        setInternet(false);
      } else {
        setInternet(true);
        func();
      }
    });
  };

  const getSliders = async () => {
    try {
      const categoryId = selectedCategory?.id;
      setSliderLoading(true);
      const { data } = await Axios.get(`${BASE_URL}/sliders/cat/${categoryId}`);
      if (data && data.length > 0) {
        setSliders([...data]);
      }
    } catch (error) {
      console.log(error, " error in getting sliders");
    } finally {
      setSliderLoading(false);
    }
  };

  const getSubCategories = async () => {
    const locationId = selectedCity?.id;
    const categoryId = selectedCategory?.id;
    try {
      setLoading(true);
      const { data } = await Axios.get(
        `${BASE_URL}/Categories/loc/${locationId}/cat/${categoryId}/sub`
      );
      if (data && data.length > 0) {
        setSubCategories([...data]);
      } else {
        setSubCategories([]);
      }
    } catch (error) {
      console.log(error, " error in getting sub categories");
    } finally {
      setLoading(false);
    }
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
    Linking.openURL("tel:0566951999");
  };

  const _renderSliderLoadingOrNotGetting = (loading = true) => (
    <View style={styles.sliderWrapper}>
      <View
        style={{
          ...styles.sliderImageWrapper,
          borderWidth: 1,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: "#fff",
          justifyContent: "center",
          borderColor: backgroundColor
        }}
      >
        {loading ? (
          <LottieView
            loop
            autoPlay
            style={styles.loader}
            source={require("../../../assets/animations/loader.json")}
          />
        ) : (
          <FastImage
            style={styles.loader}
            resizeMode={FastImage.resizeMode.contain}
            source={require("../../../assets/images/logo.png")}
          />
        )}
      </View>
    </View>
  );

  const _renderSliderMemo = useMemo(() => {
    if (sliderLoading) {
      return _renderSliderLoadingOrNotGetting();
    } else if (sliders && sliders.length > 0) {
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
            {sliders.map((v, i) => (
              <View key={i} style={styles.sliderImageWrapper}>
                <ProgressImage
                  style={styles.sliderImage}
                  source={{ uri: v.value }}
                  resizeMode={"stretch"}
                  renderIndicator={() => (
                    <FastImage
                      style={{
                        width: 120,
                        height: 120
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                      source={require("../../../assets/images/logo.png")}
                    />
                  )}
                />
              </View>
            ))}
          </Swiper>
        </View>
      );
    } else {
      return _renderSliderLoadingOrNotGetting(false);
    }
  }, [internet, sliderLoading, sliders]);

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
    const locationId = selectedCity?.id;
    return subCategories.map((v, i) => (
      <HomeItem
        key={i}
        tabIndex={i}
        isArabic={isArabic}
        subCategoryId={v.id}
        locationId={locationId}
        name={isArabic ? v.nameAr : v.nameEn}
      />
    ));
  };

  const handleRetry = () => {
    checkConnection(getSliders);
    checkConnection(getSubCategories);
  };

  return (
    <SideMenu
      isOpen={isOpen}
      onChange={e => setIsOpen(e)}
      bounceBackOnOverdraw={false}
      menu={
        <Drawer navigation={navigation} drawerClose={() => setIsOpen(false)} />
      }
      menuPosition={isArabic ? "right" : "left"}
    >
      <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
        <View style={styles.container}>
          {_renderHeader()}
          {!internet ? (
            <NoInternet isArabic={isArabic} onPress={handleRetry} />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}
              scrollEnabled={
                !loading && subCategories && subCategories.length > 0
              }
            >
              {_renderSliderMemo}
              {loading ? (
                <View style={styles.loaderWrapper}>
                  <LottieView
                    loop
                    autoPlay
                    style={styles.loader}
                    source={require("../../../assets/animations/loader.json")}
                  />
                </View>
              ) : subCategories && subCategories.length > 0 ? (
                _renderItems()
              ) : (
                <NotFound
                  isArabic={isArabic}
                  text={
                    isArabic ? "لم يتم العثور على نتائج" : "No Results Found"
                  }
                  secondaryText={
                    isArabic
                      ? "عذرا ، لم نتمكن من العثور على أي بيانات"
                      : "Sorry, we couldn't find any data"
                  }
                />
              )}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </SideMenu>
  );
};
