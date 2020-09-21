import { StyleSheet } from "react-native";
import { backgroundColor, theme } from "../../../common/colors";
import { HEIGHT, CONTAINER_PADDING } from "../../../common/constants";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  container: {
    flexGrow: 1,
    backgroundColor: backgroundColor
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fefefe",
    paddingBottom: HEIGHT * 0.04
  },
  heading: isArabic => ({
    color: theme,
    height: 35,
    textAlign: "center",
    marginBottom: HEIGHT * 0.03,
    fontSize: isArabic ? 23 : 22,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  centerContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: CONTAINER_PADDING
  },
  loaderWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loader: {
    width: 120
  }
});

export default styles;
