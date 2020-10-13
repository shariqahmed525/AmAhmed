import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import { ANDROID, ARABIC, LANGUAGES } from "../../common/constants";
import Header from "../../components/Header";
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
          title={isArabic ? "عنوان" : "Address"}
          titleAlign={isArabic ? "right" : "left"}
        />
      </View>
    </SafeAreaView>
  );
};
