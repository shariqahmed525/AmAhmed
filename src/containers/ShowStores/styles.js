import { StyleSheet } from "react-native";
import { backgroundColor, theme } from "../../common/colors";
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
  mapBox: {
    flex: 1,
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
    elevation: 1
  },
  back: isArabic => {
    let obj = {};
    obj[isArabic ? "right" : "left"] = 10;
    return {
      ...obj,
      top: 10,
      width: 45,
      height: 45,
      zIndex: 1000,
      borderRadius: 100,
      alignItems: "center",
      position: "absolute",
      justifyContent: "center",
      transform: [
        {
          rotateY: isArabic ? "180deg" : "0deg"
        }
      ],
      backgroundColor: "rgba(0,0,0,0.2)"
      // backgroundColor: "#000"
    };
  }
});

export default styles;
