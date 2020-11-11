import { StyleSheet } from "react-native";
import {
  backgroundColor,
  black,
  theme,
  darkestGray,
  link,
  darkGray
} from "../../common/colors";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor,
    paddingVertical: 20,
    paddingHorizontal: 12
  },
  inputWrapper: isArabic => ({
    width: "100%",
    paddingVertical: isArabic ? 7 : 10
  }),
  heading: isArabic => ({
    color: theme,
    fontSize: isArabic ? 23 : 22,
    marginBottom: isArabic ? 10 : 7,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-SemiBold"
  }),
  input: isArabic => ({
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    color: black,
    fontSize: 16,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderColor: "#fff",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    maxHeight: 200,
    paddingHorizontal: 15,
    borderRadius: 4,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  btn: () => ({
    height: 50,
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: theme,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: theme,
    justifyContent: "center"
  }),
  btnText: isArabic => ({
    color: "#fff",
    textAlign: "center",
    marginTop: isArabic ? -5 : 0,
    fontSize: isArabic ? 22 : 19,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  textWrapper: isArabic => ({
    width: "100%",
    marginBottom: isArabic ? 8 : 10,
    paddingVertical: 15,
    borderColor: "#fff",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  text: isArabic => ({
    color: darkGray,
    fontSize: isArabic ? 20 : 19,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  numberWrapper: {},
  link: isArabic => ({
    color: link,
    fontSize: isArabic ? 20 : 19,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  rotateIcon: isArabic => ({
    marginRight: 10,
    transform: [{ rotateY: isArabic ? "180deg" : "0deg" }]
  }),
  iconWrapper: isArabic => ({
    alignItems: "center",
    flexDirection: isArabic ? "row-reverse" : "row"
  })
});

export default styles;
