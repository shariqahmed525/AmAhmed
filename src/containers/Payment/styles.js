import { StyleSheet } from "react-native";
import {
  backgroundColor,
  black,
  darkGray,
  lightGray,
  theme
} from "../../common/colors";
import { CONTAINER_PADDING, HEIGHT } from "../../common/constants";
import { isIphoneXorAbove } from "../../common/functions";
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
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: isIphoneXorAbove() ? 30 : 20,
    backgroundColor: backgroundColor
  },
  scannerWrapper: {
    height: 180,
    width: "95%",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  scannerImg: {
    width: "100%",
    height: 110
  },
  scannerText: isArabic => ({
    color: theme,
    marginTop: 12,
    textTransform: "uppercase",
    fontSize: isArabic ? 18 : 17,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  }),
  line: {
    height: 1,
    width: "100%",
    marginVertical: 30,
    backgroundColor: "#e0e0e0"
  },
  input: isArabic => ({
    width: "100%",
    marginTop: 0,
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
    textTransform: "uppercase",
    height: 53,
    borderRadius: 4,
    paddingHorizontal: 15,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  btn: width => ({
    height: 50,
    marginTop: 40,
    width: width || "100%",
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
  })
});

export default styles;
