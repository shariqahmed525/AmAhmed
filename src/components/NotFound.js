import React from "react";
import LottieView from "lottie-react-native";
import { View, Text, StyleSheet } from "react-native";
import { darkGray, theme } from "../common/colors";
import { WIDTH } from "../common/constants";

export default ({ isArabic, text, secondaryText }) => {
  return (
    <View style={styles.emptyWrapper}>
      <LottieView
        loop
        autoPlay
        style={{
          width: WIDTH * 0.75
        }}
        source={require("../../assets/animations/not-found.json")}
      />
      <Text style={styles.emptyText(isArabic)}>{text}</Text>
      <Text style={styles.emptySubText(isArabic)}>{secondaryText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyText: (isArabic, color) => ({
    marginTop: 20,
    textAlign: "center",
    color: color || theme,
    paddingTop: isArabic ? 0 : 5,
    fontSize: isArabic ? 25 : 27,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  emptySubText: isArabic => ({
    marginTop: isArabic ? 1 : 8,
    color: darkGray,
    textAlign: "center",
    paddingHorizontal: 12,
    fontSize: isArabic ? 16 : 18,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  emptyWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  lottie: {
    width: WIDTH * 0.75
  }
});
