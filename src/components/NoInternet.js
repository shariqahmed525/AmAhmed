import React from "react";
import LottieView from "lottie-react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { darkGray, theme } from "../common/colors";
import { WIDTH } from "../common/constants";

export default ({ isArabic, onPress }) => {
  return (
    <View style={styles.emptyWrapper}>
      <LottieView
        loop
        autoPlay
        style={{ width: WIDTH * 0.75 }}
        source={require("../../assets/animations/no-internet.json")}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.emptyText(isArabic)}>
          {isArabic ? "وجه الفتاة!" : "Oops!"}
        </Text>
        <Text style={styles.emptySubText(isArabic)}>
          {isArabic
            ? "لم يتم العثور على اتصال بالإنترنت للتحقق من اتصالك"
            : "No internet connection found to check your connection"}{" "}
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={styles.btn}
          activeOpacity={0.7}
        >
          <Text style={styles.btnText(isArabic)}>
            {isArabic ? "أعد المحاولة" : "Retry"}
          </Text>
        </TouchableOpacity>
      </View>
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
  },
  textWrapper: {
    height: 160,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    width: 130,
    height: 40,
    marginTop: 15,
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: theme,
    justifyContent: "center"
  },
  btnText: isArabic => ({
    fontSize: 17,
    color: "#fff",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  })
});
