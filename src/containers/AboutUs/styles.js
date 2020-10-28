import { StyleSheet } from "react-native";
import { theme, backgroundColor } from "../../common/colors";
const darkestGray = "#47515A";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  scrollContainer: isArabic => ({
    flexGrow: 1,
    paddingTop: 10,
    backgroundColor,
    paddingHorizontal: 15,
    paddingBottom: isArabic ? 20 : 10
  }),
  heading: (
    isArabic,
    marginTop = 0,
    marginBottom = 0,
    textAlign,
    fontSize = isArabic ? 23 : 22
  ) => ({
    color: darkestGray,
    fontSize: fontSize,
    textAlign: textAlign,
    marginTop: marginTop,
    marginBottom: marginBottom,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  imageWrapper: {
    width: "100%",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 120,
    height: 120
  },
  text: (isArabic, marginTop = 0, textAlign, marginBottom = 0) => ({
    color: darkestGray,
    paddingVertical: 2,
    textAlign: textAlign,
    marginTop: marginTop,
    marginBottom: marginBottom,
    fontSize: isArabic ? 16 : 17,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  })
});

export default styles;
