import React from "react";
import Modal from "react-native-modal";
import { ARABIC, WIDTH } from "../common/constants";
import { black, theme } from "../common/colors";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

export default ({
  img,
  text,
  alert,
  title,
  error,
  btnText,
  btnColor,
  children,
  cancelText,
  onBtnPress,
  btnTextColor,
  onCancelPress,
  cancelBtnColor,
  onBackButtonPress,
  cancelBtnTextColor
}) => {
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;
  return (
    <Modal
      useNativeDriver
      isVisible={alert}
      style={styles.modal}
      animationIn="fadeInDown"
      backdropColor="rgba(0,0,0,0.8)"
      onBackButtonPress={onBackButtonPress}
    >
      <View style={styles.container}>
        {img !== undefined && img !== "" && (
          <Image source={img} style={styles.img} />
        )}
        {title !== undefined && title !== "" && (
          <Text style={styles.title(isArabic)}>{title}</Text>
        )}
        {text !== undefined && text !== "" && (
          <Text style={styles.text(isArabic)}>{text}</Text>
        )}
        {children}
        <View style={styles.btnWrapper}>
          {cancelText !== undefined && cancelText !== "" && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onCancelPress}
              style={styles.btn(cancelBtnColor || "#b4b4b4")}
            >
              <Text
                style={styles.btnText(cancelBtnTextColor || "#fff", isArabic)}
              >
                {cancelText}
              </Text>
            </TouchableOpacity>
          )}
          {btnText !== undefined && btnText !== "" && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onBtnPress}
              style={styles.btn(error ? "#e4011c" : btnColor || theme)}
            >
              <Text
                style={styles.btnText(
                  error ? "#fff" : btnTextColor || theme,
                  isArabic
                )}
              >
                {btnText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center",
    zIndex: 10000000000000
  },
  img: {
    width: 55,
    height: 55,
    marginTop: 13
  },
  container: {
    borderRadius: 20,
    width: WIDTH * 0.85,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: WIDTH * 0.03
  },
  title: isArabic => ({
    color: black,
    textAlign: "center",
    fontSize: isArabic ? 23 : 26,
    marginTop: isArabic ? 10 : 20,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  text: isArabic => ({
    color: black,
    textAlign: "center",
    fontSize: isArabic ? 17 : 17,
    marginTop: isArabic ? 7 : 14,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  btnWrapper: {
    width: "100%",
    flexDirection: "row",
    marginTop: WIDTH * 0.06,
    marginBottom: WIDTH * 0.04,
    justifyContent: "space-evenly"
  },
  btn: color => ({
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: WIDTH * 0.33,
    backgroundColor: color,
    paddingHorizontal: WIDTH * 0.028
  }),
  btnText: (color, isArabic) => ({
    color: color,
    textAlign: "center",
    fontSize: isArabic ? 15 : 15,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  })
});
