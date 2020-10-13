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
  scrollContainer: {
    flexGrow: 1,
    backgroundColor,
    paddingHorizontal: 12
  },
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
