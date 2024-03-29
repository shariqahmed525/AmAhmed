import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import DeviceInfo from "react-native-device-info";
import FastImage from "react-native-fast-image";
import { WIDTH } from "../common/constants";
const ITEM_WIDTH = WIDTH / 2 - 17.5;
const IMAGE_WIDTH = ITEM_WIDTH - 20;
import ProgressImage from "react-native-image-progress";

export default ({
  text,
  isCity,
  selected,
  isArabic,
  source,
  primaryText,
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.list(isArabic)}
      {...rest}
    >
      {selected && (
        <View style={styles.imageWrapper(isArabic)}>
          <Image
            style={styles.image}
            source={require("../../assets/images/check.png")}
          />
        </View>
      )}
      <ProgressImage
        source={source}
        resizeMode={"cover"}
        style={styles.listBackground}
        renderIndicator={() => (
          <FastImage
            style={styles.imageStyle}
            resizeMode={FastImage.resizeMode.contain}
            source={require("../../assets/images/logo.png")}
          />
        )}
      >
        <View style={styles.textWrapper(isCity)}>
          {primaryText && (
            <Text style={styles.primaryText(isArabic, isCity)}>
              {primaryText}
            </Text>
          )}
          <Text style={styles.listText(isArabic)}>{text}</Text>
        </View>
      </ProgressImage>
    </TouchableOpacity>
  );
};

const isTablet = DeviceInfo.isTablet();

const styles = StyleSheet.create({
  list: isArabic => ({
    height: isTablet ? 230 : 170,
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
    flex: 1,
    backgroundColor: "#fff"
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
  }),
  imageWrapper: () => ({
    width: 20,
    height: 20,
    zIndex: 10000,
    position: "absolute",
    top: 10,
    right: 10
  }),
  image: {
    width: "100%",
    height: "100%"
  },
  imageStyle: {
    width: IMAGE_WIDTH,
    alignSelf: "center",
    position: "relative",
    height: (110 / 150) * IMAGE_WIDTH
  }
});
