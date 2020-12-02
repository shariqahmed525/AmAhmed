import { StyleSheet } from "react-native";
import { backgroundColor, black, theme } from "../../common/colors";
import { CONTAINER_PADDING } from "../../common/constants";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  topContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    width: "100%"
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  heading: isArabic => ({
    color: theme,
    marginVertical: 10,
    fontSize: isArabic ? 23 : 22,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-SemiBold"
  }),
  mapBox: {
    flex: 1,
    width: "100%",
    borderRadius: 4,
    marginBottom: 30,
    alignSelf: "center",
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
  footer: () => ({
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
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
    paddingVertical: CONTAINER_PADDING,
    paddingHorizontal: CONTAINER_PADDING
  }),
  btn: () => ({
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: theme,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: theme,
    justifyContent: "center"
  }),
  btnText: isArabic => ({
    color: "#fff",
    textAlign: "center",
    marginTop: isArabic ? -5 : 0,
    fontSize: isArabic ? 22 : 19,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  input: isArabic => ({
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    color: black,
    fontSize: 16,
    paddingVertical: 15,
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
    elevation: 1,
    maxHeight: 200,
    borderRadius: 4,
    marginBottom: 15,
    paddingHorizontal: 15,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  })
});

export default styles;
