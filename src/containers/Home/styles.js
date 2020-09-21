import { StyleSheet } from "react-native";
import { backgroundColor, theme } from "../../common/colors";
import { HEIGHT } from "../../common/constants";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor
  },
  sliderWrapper: {
    width: "100%",
    marginTop: 10,
    maxHeight: 180,
    height: HEIGHT * 0.22,
    paddingHorizontal: 10
  },
  swiperWrapper: {
    borderRadius: 10,
    backgroundColor: "red",
    borderColor: "#fff",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.22,
    elevation: 3,
    overflow: "hidden"
  },
  sliderImage: {
    width: "100%",
    height: HEIGHT * 0.22
  }
});

export default styles;
