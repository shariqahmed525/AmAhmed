import React from "react";
import Modal from "react-native-modal";
import { WIDTH } from "../common/constants";
import { theme } from "../common/colors";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

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
          <Text style={styles.title}>{title}</Text>
        )}
        {text !== undefined && text !== "" && (
          <Text style={styles.text}>{text}</Text>
        )}
        {children}
        <View style={styles.btnWrapper}>
          {cancelText !== undefined && cancelText !== "" && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onCancelPress}
              style={styles.btn(cancelBtnColor || "#b4b4b4")}
            >
              <Text style={styles.btnText(cancelBtnTextColor || "#fff")}>
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
                style={styles.btnText(error ? "#fff" : btnTextColor || theme)}
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
  title: {
    color: "#000",
    fontSize: 22,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "Montserrat-Bold"
  },
  text: {
    color: "#000",
    fontSize: 15,
    marginTop: 14,
    textAlign: "center",
    fontFamily: "Montserrat-Regular"
  },
  btnWrapper: {
    width: "100%",
    flexDirection: "row",
    marginTop: WIDTH * 0.06,
    marginBottom: WIDTH * 0.04,
    justifyContent: "space-evenly"
  },
  btn: color => ({
    borderRadius: 30,
    width: WIDTH * 0.33,
    backgroundColor: color,
    paddingVertical: WIDTH * 0.028,
    paddingHorizontal: WIDTH * 0.028
  }),
  btnText: color => ({
    textAlign: "center",
    fontSize: 12.5,
    color: color
  })
});
