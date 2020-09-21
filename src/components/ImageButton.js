import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";

export default ({ text, isCity, isArabic, source, primaryText, ...rest }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.list(isArabic)}
      {...rest}
    >
      <ImageBackground
        resizeMode="cover"
        source={source}
        style={styles.listBackground}
      >
        <View style={styles.textWrapper(isCity)}>
          {primaryText && (
            <Text style={styles.primaryText(isArabic, isCity)}>
              {primaryText}
            </Text>
          )}
          <Text style={styles.listText(isArabic)}>{text}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  list: isArabic => ({
    height: 170,
    overflow: "hidden",
    width: "100%",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
    borderRadius: 10,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  listBackground: {
    flex: 1
  },
  primaryText: (isArabic, isCity) => ({
    color: "#fff",
    textAlign: "center",
    paddingTop: isCity ? 10 : 0,
    fontSize: isArabic ? 18 : 18,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  listText: isArabic => ({
    color: "#fff",
    textAlign: "center",
    fontSize: isArabic ? 32 : 23,
    paddingTop: isArabic ? 0 : 13,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Bold"
  }),
  textWrapper: isCity => ({
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: isCity ? "flex-start" : "center"
  })
});
