import React from "react";
import { theme, black } from "../common/colors";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default ({ mainText, secondaryText, onPress, isActive }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.btnWrapper(isActive)}
    >
      <Text style={styles.mainText(isActive)}>{mainText}</Text>
      {secondaryText !== "" && (
        <Text style={styles.secondaryText(isActive)}>{secondaryText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnWrapper: isActive => ({
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 5,
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
    borderColor: isActive ? theme : "#e6e6e6",
    backgroundColor: isActive ? theme : "#e6e6e6"
  }),
  mainText: isActive => ({
    textAlign: "center",
    color: isActive ? "#fff" : black,
    fontFamily: isActive ? "Rubik-Medium" : "Rubik-Regular"
  }),
  secondaryText: isActive => ({
    paddingTop: 5,
    textAlign: "center",
    color: isActive ? "#fff" : black,
    fontFamily: isActive ? "Rubik-Medium" : "Rubik-Regular"
  })
});
