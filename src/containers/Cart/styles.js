import { StyleSheet } from "react-native";
import { theme, darkGray, backgroundColor } from "../../common/colors";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  itemWrapper: {
    flex: 1,
    backgroundColor,
    paddingVertical: 10
  },
  header: isArabic => ({
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  emptyText: (isArabic, color) => ({
    paddingTop: 20,
    textAlign: "center",
    color: color || theme,
    fontSize: isArabic ? 22 : 20,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  emptySubText: isArabic => ({
    marginTop: 5,
    color: darkGray,
    textAlign: "center",
    fontSize: isArabic ? 15 : 13,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  emptyWrapper: {
    flex: 1,
    backgroundColor,
    alignItems: "center",
    justifyContent: "center"
  },
  footer: isArabic => ({
    width: "100%",
    paddingBottom: 15,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    paddingTop: isArabic ? 5 : 15,
    justifyContent: "space-between",
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
    flexDirection: isArabic ? "row-reverse" : "row"
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
  btn: isArabic => ({
    height: 46,
    width: 180,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: theme,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: theme,
    marginTop: isArabic ? 10 : 0,
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  btnText: isArabic => ({
    color: "#fff",
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
  })
});

export default styles;
