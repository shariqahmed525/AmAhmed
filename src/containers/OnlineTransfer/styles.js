import { StyleSheet } from "react-native";
import { backgroundColor, black, theme } from "../../common/colors";
import { WIDTH } from "../../common/constants";
import { isIphoneXorAbove } from "../../common/functions";
const IMG_WIDTH = WIDTH - 20;
const IMG_HEIGHT = Math.round((IMG_WIDTH * 9) / 14.5);

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
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: backgroundColor,
    paddingBottom: isIphoneXorAbove() ? 30 : 20
  },
  imageStyle: {
    width: IMG_WIDTH,
    height: IMG_HEIGHT
  },
  heading: isArabic => ({
    color: theme,
    marginBottom: 10,
    marginLeft: isArabic ? 0 : 3,
    marginRight: isArabic ? 3 : 0,
    fontSize: isArabic ? 23 : 22,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-SemiBold"
  }),
  description: isArabic => ({
    color: black,
    fontSize: isArabic ? 19 : 17,
    marginLeft: isArabic ? 0 : 3,
    marginRight: isArabic ? 3 : 0,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  textWithIconWrapper: {
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row"
  },
  btn: width => ({
    height: 50,
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: theme,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: theme,
    width: width || "100%",
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
