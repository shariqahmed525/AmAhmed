import { StyleSheet } from "react-native";
import { backgroundColor, theme, darkGray, black } from "../../common/colors";
import { CONTAINER_PADDING, HEIGHT, WIDTH } from "../../common/constants";
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: backgroundColor
  },
  heading: (isArabic, isCenter) => ({
    color: theme,
    marginBottom: 10,
    fontSize: isArabic ? 23 : 22,
    textAlign: isCenter ? "center" : isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-SemiBold"
  }),
  option: isArabic => ({
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    flexDirection: isArabic ? "row-reverse" : "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
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
    marginBottom: isArabic ? 20 : 20,
    justifyContent: "space-between"
  }),
  optionText: isArabic => ({
    flex: 1,
    color: black,
    fontSize: isArabic ? 18 : 16,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  listItem: isArabic => ({
    width: "100%",
    width: WIDTH - 52,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  listItemText: isArabic => ({
    fontSize: 15,
    paddingVertical: 0,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  textWrapper: isArabic => ({
    flex: 1
  }),
  listIcon: isArabic => ({
    width: 40,
    transform: [
      {
        rotateY: isArabic ? "180deg" : "0deg"
      }
    ]
  }),
  optionRight: isArabic => ({
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end"
  }),
  optionSecondaryText: isArabic => ({
    flex: 1,
    fontSize: 17,
    color: black,
    textAlign: "right",
    paddingLeft: isArabic ? 10 : 0,
    paddingRight: isArabic ? 0 : 10,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  menuItem: (isArabic, isSelected) => ({
    width: "100%",
    maxWidth: WIDTH,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Regular",
    backgroundColor: isSelected ? "#e5e5e5" : "transparent"
  }),
  mapBox: isArabic => ({
    width: "100%",
    height: HEIGHT * 0.35,
    maxHeight: 300,
    borderRadius: 4,
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
    marginBottom: isArabic ? 20 : 20
  }),
  headingWrapper: isArabic => ({
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  secondaryWrapper: isArabic => ({
    marginBottom: isArabic ? 5 : 10,
    alignItems: "center",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  secondaryWrapperText: isArabic => ({
    color: black,
    fontSize: 16,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
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
    marginBottom: 20,
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    paddingHorizontal: 15,
    borderRadius: 4,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  footer: () => ({
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: CONTAINER_PADDING,
    paddingHorizontal: CONTAINER_PADDING
  }),
  total: {
    width: 100
  },
  totalText: isArabic => ({
    fontSize: 17,
    color: darkGray,
    textAlign: "center",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-SemiBold"
  }),
  totalSign: isArabic => ({
    fontSize: isArabic ? 15 : 13,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Bold"
  }),
  totalPrice: () => ({
    fontSize: 30,
    color: theme,
    marginTop: 3,
    textAlign: "center",
    fontFamily: "Rubik-Bold"
  }),
  btn: () => ({
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: theme,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: theme,
    justifyContent: "center"
  }),
  animtedButton: {
    height: 50,
    width: "100%"
  },
  btnText: isArabic => ({
    color: "#fff",
    textAlign: "center",
    marginTop: isArabic ? -5 : 0,
    fontSize: isArabic ? 22 : 19,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  rotateIcon: isArabic => ({
    transform: [
      {
        rotateY: isArabic ? "180deg" : "0deg"
      }
    ]
  }),
  orderCard: isArabic => ({
    backgroundColor: "#ffffff",
    borderColor: "#fff",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    marginBottom: 20,
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4
  }),
  orderList: isArabic => ({
    width: "100%",
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  primaryText: (isArabic, bold) => ({
    color: black,
    maxWidth: "60%",
    textAlign: isArabic ? "right" : "left",
    fontSize: isArabic ? WIDTH * 0.042 : WIDTH * 0.04,
    fontFamily: isArabic
      ? bold
        ? "Cairo-Bold"
        : "Cairo-SemiBold"
      : bold
      ? "Rubik-SemiBold"
      : "Rubik-Regular"
  }),
  secondaryText: (isArabic, bold) => ({
    color: darkGray,
    maxWidth: "39%",
    textAlign: isArabic ? "right" : "left",
    fontSize: isArabic ? WIDTH * 0.042 : WIDTH * 0.04,
    fontFamily: isArabic
      ? bold
        ? "Cairo-Bold"
        : "Cairo-SemiBold"
      : bold
      ? "Rubik-SemiBold"
      : "Rubik-Regular"
  }),
  pd10: {
    width: "100%",
    paddingVertical: 10
  }
});

export default styles;
