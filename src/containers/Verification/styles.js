import { StyleSheet } from "react-native";
import { backgroundColor, theme, black } from "../../common/colors";
import { CONTAINER_PADDING, HEIGHT } from "../../common/constants";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  mainContainer: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    paddingBottom: HEIGHT * 0.04,
    justifyContent: "space-between",
    backgroundColor: backgroundColor,
    paddingHorizontal: CONTAINER_PADDING
  },
  logo: {
    width: 115,
    height: 115
  },
  heading: isArabic => ({
    height: 45,
    color: theme,
    marginBottom: 20,
    textAlign: "center",
    fontSize: isArabic ? 25 : 20,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  list: (checked, isArabic) => ({
    height: 75,
    width: "100%",
    marginBottom: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: isArabic ? "row-reverse" : "row",
    borderColor: checked ? theme : "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10
  }),
  listIcon: {
    width: 40,
    height: 23
  },
  listText: isArabic => ({
    flex: 1,
    color: "#000",
    alignItems: "center",
    paddingHorizontal: 12,
    fontSize: isArabic ? 20 : 19,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  listSelected: {
    width: 30
  },
  btn: {
    height: 50,
    width: "100%",
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: theme,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  btnText: isArabic => ({
    color: "#fff",
    fontSize: isArabic ? 22 : 18,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  input: {
    fontSize: 15,
    color: "#000",
    borderRadius: 10,
    borderColor: theme,
    fontFamily: "Rubik-Medium"
  },
  otpWrapper: {
    height: 100,
    width: "100%",
    paddingHorizontal: 10
  },
  btnWrapper: {
    width: "100%"
  },
  timer: {
    alignItems: "center",
    marginBottom: 10
  },
  timerText: isArabic => ({
    fontSize: 16,
    color: black,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  description: isArabic => ({
    fontSize: 19,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  descriptionWrapper: () => ({
    width: "100%"
  }),
  secondLineDesc: isArabic => ({
    width: "100%",
    alignItems: "center",
    marginTop: isArabic ? 0 : -12,
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  resend: isArabic => ({
    fontSize: 16,
    color: "#4287f5",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  })
});

export default styles;
