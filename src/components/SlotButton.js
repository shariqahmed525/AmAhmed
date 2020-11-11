import React from "react";
import { theme, black } from "../common/colors";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default ({ mainText, secondaryText, onPress, isActive, isArabic }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.btnWrapper(isActive, isArabic)}
    >
      <Text style={styles.mainText(isActive, isArabic)}>{mainText}</Text>
      {secondaryText !== "" && (
        <Text style={styles.secondaryText(isActive, isArabic)}>
          {secondaryText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnWrapper: (isActive, isArabic) => ({
    marginRight: 10,
    paddingTop: isArabic ? 5 : 10,
    paddingBottom: isArabic ? 3 : 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: isActive ? theme : "#f0f0f0",
    backgroundColor: isActive ? theme : "#f0f0f0"
  }),
  mainText: (isActive, isArabic) => ({
    textAlign: "center",
    color: isActive ? "#fff" : black,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  secondaryText: (isActive, isArabic) => ({
    textAlign: "center",
    paddingTop: isArabic ? 0 : 5,
    color: isActive ? "#fff" : black,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  })
});
