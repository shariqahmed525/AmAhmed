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
  })
});

export default styles;
