import React, { useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { View, StatusBar } from "react-native";
import { useSelector } from "react-redux";

import styles from "./styles";
import { theme } from "../../common/colors";
import { ANDROID, ARABIC } from "../../common/constants";
import ItemsTabs from "./ItemsTabs";
import Header from "../../components/Header";

export default () => {
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const header = (
    <Header
      titleHeight={55}
      titleColor={"#fff"}
      titleFontSize={isArabic ? 28 : 30}
      headerStyle={styles.header(isArabic)}
      titleAlign={isArabic ? "right" : "left"}
      title={isArabic ? "التصنيفات" : "Categories"}
      titleFontFamily={isArabic ? "Cairo-Bold" : "Rubik-SemiBold"}
    />
  );

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        {header}
        <ItemsTabs />
      </View>
    </SafeAreaView>
  );
};
