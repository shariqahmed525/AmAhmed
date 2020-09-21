import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-navigation";
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Swiper from "react-native-swiper";
import styles from "./styles";
import { black, darkGray, gray, theme } from "../../common/colors";
import { ANDROID, ARABIC, CATEGORIES, ENGLISH } from "../../common/constants";
import {
  Feather,
  Icon,
  MaterialCommunityIcons,
  SimpleLineIcons
} from "../../common/icons";
import Header from "../../components/Header";
import { onLanguageAction } from "../../redux/actions/app";

const SLIDER_IMAGES = [
  require("../../../assets/images/slider/1.jpeg"),
  require("../../../assets/images/slider/2.jpeg"),
  require("../../../assets/images/slider/3.jpeg"),
  require("../../../assets/images/slider/4.jpeg"),
  require("../../../assets/images/slider/6.jpeg"),
  require("../../../assets/images/slider/7.jpeg")
];

export default ({ drawerRef }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  const handleToggleLanguage = () => {
    dispatch(onLanguageAction(isArabic ? ENGLISH : ARABIC));
  };

  const sliderMemo = useMemo(
    () => (
      <View style={styles.sliderWrapper}>
        <Swiper
          bounces
          autoplay
          horizontal={false}
          activeDotColor={theme}
          containerStyle={styles.swiperWrapper}
        >
          {SLIDER_IMAGES.map((v, i) => (
            <Image
              key={i}
              source={v}
              resizeMode="stretch"
              resizeMethod="resize"
              style={styles.sliderImage}
            />
          ))}
        </Swiper>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          leftIcon={() => (
            <Icon name="md-menu-outline" color={"#fff"} size={30} />
          )}
          rightIcon={() => (
            <MaterialCommunityIcons size={30} color={"#fff"} name="translate" />
          )}
          title={isArabic ? "الرئيسية" : "Home"}
          titleColor={"#fff"}
          leftIconProps={{
            onPress: () => navigation.openDrawer()
          }}
          rightIconProps={{
            onPress: handleToggleLanguage
          }}
        />
        <ScrollView bounces={false} contentContainerStyle={styles.scrollView}>
          {sliderMemo}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
