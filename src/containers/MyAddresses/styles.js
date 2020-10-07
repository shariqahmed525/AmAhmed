import { StyleSheet } from "react-native";
import { backgroundColor, darkGray, theme, black } from "../../common/colors";
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
  fab: {
    right: 0,
    bottom: 0,
    margin: 16,
    zIndex: 100,
    position: "absolute",
    backgroundColor: theme
  },
  listItem: isArabic => ({
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10
  }),
  listItemLeft: isArabic => ({
    paddingRight: 10
  }),
  listItemCenter: isArabic => ({
    flex: 1
  }),
  listTitle: isArabic => ({
    color: black,
    paddingBottom: 5
  }),
  listSubTitle: isArabic => ({
    color: darkGray,
    paddingBottom: 5
  }),
  listItemRight: isArabic => ({
    flexDirection: "row"
    // paddingVertical: CONTAINER_PADDING
  }),
  loaderWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loader: {
    width: 120
  },
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
  })
});

export default styles;
