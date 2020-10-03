import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import { View, StatusBar, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import styles from "./styles";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import { ANDROID, ARABIC } from "../../common/constants";
import CartListItem from "../../components/CartListItem";

export default () => {
  const {
    app: { language },
    user: { cart }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  console.log(cart, " cart");

  const header = (
    <Header
      titleHeight={55}
      titleColor={"#fff"}
      titleFontSize={isArabic ? 28 : 30}
      title={isArabic ? "السلة" : "Cart"}
      headerStyle={styles.header(isArabic)}
      titleAlign={isArabic ? "right" : "left"}
      titleFontFamily={isArabic ? "Cairo-Bold" : "Rubik-SemiBold"}
    />
  );

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        {header}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {cart.map((v, i) => (
            <CartListItem key={i} item={v} isArabic={isArabic} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
