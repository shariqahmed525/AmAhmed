import { StyleSheet } from "react-native";
import { backgroundColor, black, theme } from "../../common/colors";
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
    paddingHorizontal: 12,
    paddingBottom: isArabic ? 20 : 10
  }),
  heading: isArabic => ({
    color: theme,
    fontSize: isArabic ? 23 : 22,
    marginBottom: isArabic ? 10 : 7,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-SemiBold"
  }),
  text: isArabic => ({
    fontSize: isArabic ? 16 : 14,
    color: black,
    paddingVertical: 2,
    textAlign: isArabic ? "right" : "left"
  })
});

export default styles;
