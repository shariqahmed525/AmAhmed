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
  CATEGORIES
} from "../../common/constants";
import Header from "../../components/Header";
import Drawer from "../../components/Drawer";
import HomeItem from "../../components/Item";
import SideMenu from "react-native-side-menu";
import { Entypo, Icon, MaterialCommunityIcons } from "../../common/icons";
import { useNavigation } from "@react-navigation/native";

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
  const { language, category } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
    }
  }, []);

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      console.log("need to call api");
    }
  }, [category]);

  const handleOpenDialer = () => {
    Linking.openURL("tel:+966568042000");
  };

  const sliderMemo = useMemo(() => {
    const SLIDERS =
      category === "g/s" ? GOAT_MEAT_SLIDERS : VEGETABLES_FRUITS_SLIDER;
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
  }, [category]);

  const catName = CATEGORIES.find(o => o.code === category).name(isArabic);

  const headerMemo = (
    <Header
      leftIcon={() => <Icon name="md-menu-outline" color={"#fff"} size={30} />}
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
          {headerMemo}
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
