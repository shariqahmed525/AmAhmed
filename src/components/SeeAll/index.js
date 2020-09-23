import React from "react";
import { backgroundColor, theme } from "../../common/colors";
import { MaterialIcons } from "../../common/icons";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const SeeAll = ({ isArabic }) => {
  return (
    <TouchableOpacity
      style={styles.itemWrapper()}
      onPress={() => {
        // RouterActions.itemstabsoffers();
      }}
    >
      <MaterialIcons size={40} color={theme} name="more-horiz" />
      <Text style={styles.text(isArabic)}>SEE ALL</Text>
    </TouchableOpacity>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  itemWrapper: () => ({
    width: 150,
    height: 250,
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    borderColor: backgroundColor,
    backgroundColor: backgroundColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.22,
    elevation: 3
  }),
  text: isArabic => ({
    fontSize: 18,
    color: theme,
    textAlign: "center",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  })
});
