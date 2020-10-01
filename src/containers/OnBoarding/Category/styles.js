import { StyleSheet } from "react-native";
import { backgroundColor, theme } from "../../../common/colors";
import { CONTAINER_PADDING, HEIGHT } from "../../../common/constants";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor
  },
  mainContainer: {
    flex: 1,
    backgroundColor,
    alignItems: "center",
    paddingBottom: HEIGHT * 0.04
  },
  logo: {
    width: 115,
    height: 115,
    marginTop: HEIGHT * 0.05
  },
  heading: isArabic => ({
    color: theme,
    height: 40,
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
