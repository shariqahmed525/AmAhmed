import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-navigation";
import { View, Image, StatusBar, ScrollView, Linking } from "react-native";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Swiper from "react-native-swiper";
import styles from "./styles";
import { theme } from "../../common/colors";
import { ANDROID, ARABIC, ITEMS, SLIDER_IMAGES } from "../../common/constants";
import Header from "../../components/Header";
import Drawer from "../../components/Drawer";
import HomeItem from "../../components/Item";
import SideMenu from "react-native-side-menu";
import { Icon, MaterialCommunityIcons } from "../../common/icons";

export default ({ navigation }) => {
  // const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const { language, category } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const handleOpenDialer = () => {
    Linking.openURL("tel:+966505513711");
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
    ),
    []
  );

  const header = (
    <Header
      leftIcon={() => <Icon name="md-menu-outline" color={"#fff"} size={30} />}
      rightIcon={() => (
        <View style={styles.rotateIcon(isArabic)}>
          <MaterialCommunityIcons size={30} color={"#fff"} name="phone" />
        </View>
      )}
      title={isArabic ? "الرئيسية" : "Home"}
      titleColor={"#fff"}
      leftIconProps={{
        onPress: () => setIsOpen(true)
      }}
      rightIconProps={{
        onPress: handleOpenDialer
      }}
    />
  );

  const items = () => {
    const filter = ITEMS.filter(v => v.category === category);
    const grouped = _.groupBy(filter, o => o.subcategory(isArabic));
    const keys = Object.keys(grouped);
    return keys.map((v, i) => {
      return (
        <HomeItem
          key={i}
          name={v}
          tabIndex={i}
          data={grouped[v]}
          isArabic={isArabic}
          navigation={navigation}
        />
      );
    });
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
          {header}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
          >
            {sliderMemo}
            {items()}
          </ScrollView>
        </View>
      </SafeAreaView>
    </SideMenu>
  );
};
