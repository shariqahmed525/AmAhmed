import { StyleSheet } from "react-native";
import {
  theme,
  darkGray,
  greenColor,
  backgroundColor
} from "../../common/colors";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  loaderWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loader: {
    width: 120
  },
  tabs: isArabic => ({
    width: "100%",
    marginVertical: 15,
    justifyContent: "center",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  tabItem: (isArabic, isActive, first, last) => ({
    width: "40%",
    borderWidth: 1,
    borderColor: theme,
    paddingVertical: isArabic ? 3 : 10,
    borderTopLeftRadius: first ? (isArabic ? 0 : 100) : isArabic ? 100 : 0,
    borderBottomLeftRadius: first ? (isArabic ? 0 : 100) : isArabic ? 100 : 0,
    borderTopRightRadius: last ? (isArabic ? 0 : 100) : isArabic ? 100 : 0,
    borderBottomRightRadius: last ? (isArabic ? 0 : 100) : isArabic ? 100 : 0,
    backgroundColor: isActive ? theme : "transparent"
  }),
  tabItemText: (isArabic, isActive) => ({
    textAlign: "center",
    fontSize: isArabic ? 16 : 14,
    color: isActive ? "#fff" : theme,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  orderList: {
    flexGrow: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    justifyContent: "flex-start"
  },
  orderListWrapper: isArabic => ({
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: isArabic ? 12 : 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }),
  orderListHeader: isArabic => ({
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  title: isArabic => ({
    flex: 1,
    fontSize: 20,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  totalPrice: isArabic => ({
    color: greenColor,
    fontSize: isArabic ? 15 : 12,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  price: isArabic => ({
    fontSize: 20,
    color: greenColor,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  orderListBody: {
    width: "100%",
    paddingVertical: 10
  },
  orderListItemWrapper: lastIndex => ({
    width: "100%",
    paddingVertical: 7,
    borderColor: "rgba(34,34,34,0.12)",
    borderBottomWidth: lastIndex ? 0 : 1
  }),
  orderListItem: isArabic => ({
    fontSize: 15,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  orderListFooter: isArabic => ({
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "flex-end",
    // justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  orderListItemDateWrapper: isArabic => ({
    paddingVertical: 5,
    alignItems: "center",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  orderListItemDate: isArabic => ({
    color: darkGray,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  dot: {
    width: 4,
    height: 4,
    borderRadius: 100,
    marginHorizontal: 7,
    backgroundColor: darkGray
  },
  orderListItemStatus: color => ({
    height: 30,
    borderRadius: 100,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: color
  }),
  orderListStatusText: isArabic => ({
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  notFound: isArabic => ({
    fontSize: 18,
    color: darkGray,
    textAlign: "center",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  })
});

export default styles;
