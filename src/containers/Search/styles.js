import { StyleSheet } from "react-native";
import {
  backgroundColor,
  black,
  darkGray,
  secondaryHeader,
  theme
} from "../../common/colors";
import { IOS, WIDTH } from "../../common/constants";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor
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
  inputContainer: () => ({
    width: "100%",
    zIndex: 100,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme,
    paddingHorizontal: WIDTH * 0.03
  }),
  input: isArabic => ({
    flex: 1,
    height: 47,
    color: black,
    fontSize: 15,
    paddingVertical: 0,
    paddingLeft: isArabic ? 5 : 20,
    paddingRight: isArabic ? 20 : 5,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  inputWrapper: isArabic => ({
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: IOS ? 0 : 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
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
    alignItems: "center",
    justifyContent: "center"
  },
  itemContainer: isArabic => ({
    flexGrow: 1,
    backgroundColor,
    flexWrap: "wrap",
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  lottie: {
    width: WIDTH * 0.75
  },
  searchIconWrapper: isArabic => ({
    flex: 1,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: secondaryHeader,
    transform: [
      {
        rotateY: isArabic ? "180deg" : "0deg"
      }
    ]
  })
});

export default styles;
