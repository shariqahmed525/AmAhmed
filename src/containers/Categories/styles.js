import { StyleSheet } from "react-native";
import { backgroundColor, theme } from "../../common/colors";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor
  },
  header: isArabic => ({
    width: "100%",
    alignItems: "center",
    // paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  })
});

export default styles;
