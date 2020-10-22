import React from "react";
import { theme } from "../common/colors";
import { Entypo } from "../common/icons";
import { HEIGHT } from "../common/constants";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default ({
  back,
  onPress,
  isArabic,
  showLanguageToggle = true,
  noImage = false
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {back ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.leftIcon}
          onPress={() => navigation.goBack()}
        >
          <Entypo size={25} color={theme} name="chevron-thin-left" />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftIcon} />
      )}
      {noImage ? (
        <View style={styles.noImage} />
      ) : (
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
      )}
      {showLanguageToggle ? (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.rightIcon(isArabic)}
        >
          <Image
            style={styles.languageIcon(isArabic)}
            source={
              isArabic
                ? require("../../assets/images/UK-flag.jpg")
                : require("../../assets/images/SA-flag.jpg")
            }
          />
          <Text style={styles.language(isArabic)}>
            {isArabic ? "English" : "عربي"}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.leftIcon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 12,
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "space-between"
  },
  logo: {
    width: 115,
    height: 115,
    marginTop: HEIGHT * 0.05
  },
  rightIcon: isArabic => ({
    width: 105,
    height: 35,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#DC143C",
    alignItems: "center",
    paddingHorizontal: 8,
    flexDirection: isArabic ? "row" : "row-reverse",
    justifyContent: "center",
    backgroundColor: "transparent"
  }),
  languageIcon: isArabic => ({
    width: isArabic ? 23 : 32,
    height: isArabic ? 13 : 18
  }),
  language: isArabic => ({
    flex: 1,
    color: theme,
    textAlign: "center",
    fontSize: isArabic ? 15 : 15,
    paddingLeft: isArabic ? 5 : 0,
    paddingRight: isArabic ? 0 : 7,
    fontFamily: isArabic ? "Rubik-Regular" : "Cairo-SemiBold"
  }),
  leftIcon: {
    width: 100,
    height: 35
  },
  noImage: {
    width: 115,
    height: 115
  }
});
