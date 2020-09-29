import { StyleSheet } from "react-native";
import { black, greenColor, theme } from "../../common/colors";
import { CONTAINER_PADDING, HEIGHT, WIDTH } from "../../common/constants";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10
  },
  image: {
    height: 350,
    width: "100%",
    borderRadius: 10,
    marginVertical: 10,
    maxHeight: HEIGHT / 4
  },
  boxWrapper: {
    marginTop: 20,
    marginHorizontal: 5
  },
  heading: isArabic => ({
    color: theme,
    marginBottom: 10,
    fontSize: isArabic ? 23 : 22,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-SemiBold"
  }),
  bottomView: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    paddingVertical: CONTAINER_PADDING,
    paddingHorizontal: CONTAINER_PADDING
  },
  btn: {
    height: 50,
    width: "100%",
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: theme,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  btnText: isArabic => ({
    color: "#fff",
    fontSize: isArabic ? 22 : 19,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  centerContainer: {
    marginBottom: 40
  },
  cartActionsWrapper: () => ({
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }),
  cartActionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cartAction: {
    height: 50,
    width: "30%",
    borderRadius: 100,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: theme,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  cartLeftActionText: {
    color: "#fff",
    fontSize: 35,
    marginTop: -4
  },
  cartRightActionText: {
    color: "#fff",
    fontSize: 30,
    marginTop: -4
  },
  quantityWrappper: {
    justifyContent: "center"
  },
  quantityWithUnit: () => ({
    fontSize: 23,
    color: "#48474c",
    fontFamily: "Rubik-SemiBold"
  }),
  animatedView: backgroundColor => ({
    zIndex: 2000,
    backgroundColor,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 10,
    height: 350,
    left: 10,
    marginVertical: 10,
    maxHeight: HEIGHT / 4
  }),
  animatedViewText: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Rubik-SemiBold"
  },
  nameWrapper: isArabic => ({
    width: "100%",
    paddingHorizontal: 5,
    paddingTop: isArabic ? 2 : 5
  }),
  name: isArabic => ({
    flex: 1,
    color: black,
    fontSize: isArabic ? 30 : 28,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Bold"
  }),
  priceAndUnitWrapper: isArabic => ({
    width: "100%",
    paddingHorizontal: 5,
    alignItems: "center",
    paddingTop: isArabic ? 0 : 15,
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  priceContainer: isArabic => ({
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: isArabic ? "flex-end" : "flex-start"
  }),
  priceWrapper: isArabic => ({
    color: greenColor,
    fontSize: isArabic ? 18 : 15,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  price: isArabic => ({
    color: greenColor,
    fontSize: isArabic ? 30 : 27,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-SemiBold"
  }),
  offerWrapper: isArabic => ({
    color: "#707070",
    alignSelf: "flex-end",
    fontSize: isArabic ? 18 : 15,
    textDecorationLine: "line-through",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  perQuantity: isArabic => ({
    color: theme,
    fontSize: isArabic ? 24 : 20,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  })
});

export default styles;
