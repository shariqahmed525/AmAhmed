import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-navigation";
import { View, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles";
import { theme } from "../../common/colors";
import { ANDROID } from "../../common/constants";

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const state = useSelector(state => state.state);

  useEffect(() => {
    // StatusBar.setBarStyle("light-content");
    // ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Text>Categories</Text>
      </View>
    </SafeAreaView>
  );
};
