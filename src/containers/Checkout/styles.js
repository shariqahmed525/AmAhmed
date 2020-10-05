import { StyleSheet } from "react-native";
import { backgroundColor, theme, darkGray, black } from "../../common/colors";
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
  heading: isArabic => ({
    color: theme,
    marginBottom: 10,
    fontSize: isArabic ? 23 : 22,
    textAlign: isArabic ? "right" : "left",
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
    marginBottom: isArabic ? 15 : 10,
    justifyContent: "space-between"
  }),
  optionText: isArabic => ({
    flex: 1,
    color: black,
    fontSize: 16,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  listItem: isArabic => ({
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  listItemText: isArabic => ({
    fontSize: 15,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular",
    paddingVertical: 0
  }),
  textWrapper: isArabic => ({
    flex: 1
  }),
  listIcon: {
    width: 40
  },
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
    maxWidth: "100%",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Regular",
    backgroundColor: isSelected ? "#e5e5e5" : "transparent"
  }),
  mapBox: isArabic => ({
    width: "100%",
    height: 250,
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
    marginBottom: isArabic ? 15 : 10
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
  secondaryText: isArabic => ({
    color: black,
    fontSize: 16,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  })
});

export default styles;
