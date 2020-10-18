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
    paddingHorizontal: 10,
    height: HEIGHT * 0.25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: "transparent"
  },
  swiperWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderColor: backgroundColor
  },
  sliderImageWrapper: {
    width: "100%",
    maxHeight: 180,
    height: HEIGHT * 0.25,
    backgroundColor: "#fff"
  },
  sliderImage: {
    width: "100%",
    height: "100%"
  },
  rotateIcon: isArabic => ({
    transform: [{ rotateY: isArabic ? "0deg" : "180deg" }]
  }),
  titleWrapper: isArabic => ({
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  title: isArabic => ({
    color: "#fff",
    fontSize: isArabic ? 20 : 18,
    paddingLeft: isArabic ? 10 : 0,
    paddingRight: isArabic ? 0 : 7,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
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
