import { StyleSheet } from "react-native";
import { black, gray } from "../../common/colors";
import { WIDTH } from "../../common/constants";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: WIDTH * 0.05
  },
  iconWrapper: isArabic => ({
    width: 55,
    height: 55,
    borderRadius: 100,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#efefef",
    marginLeft: isArabic ? WIDTH * 0.03 : 0,
    marginRight: isArabic ? 0 : WIDTH * 0.03
  }),
  profileWrapper: isArabic => ({
    marginTop: 30,
    alignItems: "center",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  profileName: isArabic => ({
    color: black,
    fontSize: isArabic ? 20 : 22,
    width: isArabic ? "100%" : "90%",
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Bold"
  }),
  line: {
    height: 0.5,
    backgroundColor: gray,
    marginTop: 20
  },
  listWrapper: {
    marginTop: 20
  },
  listIconWrapper: isArabic => ({
    width: 40,
    transform: [{ rotateY: isArabic ? "180deg" : "0deg" }]
  }),
  list: isArabic => ({
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  listText: (isArabic, fontSize) => ({
    color: gray,
    fontSize: fontSize ? 13 : 16,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  bottomIcons: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: WIDTH * 0.05
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30
  },
  image: {
    height: "100%",
    width: "100%"
  },
  nameWrapper: isArabic => ({
    width: isArabic ? "75%" : "90%"
  })
});
