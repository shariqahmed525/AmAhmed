import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import { ANDROID, ARABIC } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "بطاقة الائتمان/الخصم" : "Credit/Debit Card"}
        />
      </View>
    </SafeAreaView>
  );
};
