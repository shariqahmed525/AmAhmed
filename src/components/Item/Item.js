import React from "react";
import {
  black,
  greenColor,
  lightGray,
  redColor,
  tabIconColor,
  theme
} from "../../common/colors";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { calculatePercentage } from "../../common/functions";

export default ({ product, isArabic }) => {
  const {
    id,
    name,
    image,
    price = 0,
    quantityType,
    offerPrice = 0,
    inStock = true,
    checkKey
  } = product;
  // let checkKey = false;
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.itemWrapper(isArabic)}>
          {offerPrice > 0 && inStock && (
            <View style={styles.labelWrapper()}>
              <Text style={styles.label()}>
                {calculatePercentage(price, offerPrice)}%
                {isArabic ? "\nخصم" : "\nOFF"}
              </Text>
            </View>
          )}
          {!inStock && (
            <View style={styles.labelWrapper(true)}>
              <Text style={styles.label(isArabic, true)}>
                {isArabic ? "إنتهى من المخزن" : "Out of Stock"}
              </Text>
            </View>
          )}
          <View style={styles.firstSection}>
            <View style={styles.imageWrapper}>
              <Image
                source={image}
                resizeMode="stretch"
                style={styles.imageStyle}
              />
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.name(isArabic)}
            >
              {name(isArabic)}
            </Text>
          </View>
          <View style={styles.secondSection}>
            <Text style={styles.perQuantity(isArabic)}>
              {quantityType(isArabic)}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceWrapper(isArabic)}>
                {!isArabic && "SAR "}
                <Text style={styles.price(isArabic)}>{price} </Text>
                {isArabic && "ر.س "}
                {offerPrice > 0 && inStock && (
                  <Text style={styles.offerWrapper(isArabic)}>
                    {!isArabic && "SAR "}
                    <Text>{price + offerPrice}</Text>
                    {isArabic && " ر.س"}
                  </Text>
                )}
              </Text>
            </View>
            {checkKey ? (
              <View style={styles.cartActionsWrapper}>
                <View style={styles.cartActionsContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.cartAction}
                    // onPress={() => addItemToCart(id, "-")}
                  >
                    <Text style={styles.cartLeftActionText}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.quantityWrappper}>
                    <Text style={styles.quantityWithUnit(isArabic)}>{12}</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.cartAction}
                    // onPress={() => addItemToCart(id, "+")}
                  >
                    <Text style={styles.cartRightActionText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.cartBtn}
                // onPress={() => addItemToCart(id, "+")}
              >
                <Text style={styles.cartBtnText(isArabic)}>
                  {isArabic ? "أضف إلى السلة" : "ADD TO CART"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: () => ({
    width: 150,
    height: 250,
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderColor: "#fff",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.22,
    elevation: 3
  }),
  firstSection: {
    width: "100%",
    overflow: "hidden"
  },
  secondSection: {
    width: "100%"
  },
  imageStyle: {
    padding: 0,
    width: "100%",
    height: "100%"
  },
  name: isArabic => ({
    color: "#707070",
    width: "100%",
    textAlign: "center",
    fontSize: isArabic ? 15 : 17,
    paddingTop: isArabic ? 5 : 7,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  perQuantity: isArabic => ({
    fontSize: 13,
    color: theme,
    marginBottom: isArabic ? 1 : 6,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  priceContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  priceWrapper: isArabic => ({
    color: greenColor,
    fontSize: isArabic ? 13 : 11,
    width: "100%",
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  price: isArabic => ({
    color: greenColor,
    fontSize: 18,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  cartBtn: {
    height: 28,
    marginTop: 7,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme,
    backgroundColor: theme
  },
  cartBtnText: isArabic => ({
    color: "#fff",
    textAlign: "center",
    fontSize: isArabic ? 14 : 12,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  modal: {
    margin: 0
  },
  imageWrapper: {
    width: 150,
    height: 100,
    alignSelf: "center"
  },
  labelWrapper: inStock => ({
    top: 1,
    right: 1,
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: inStock ? 60 : 60,
    height: inStock ? 60 : 60,
    backgroundColor: redColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
    borderRadius: 100,
    shadowRadius: 3.84,
    shadowOpacity: 0.25
  }),
  label: (isArabic, inStock) => ({
    color: "#fff",
    textAlign: "center",
    fontSize: inStock ? (isArabic ? 10 : 13) : 14,
    fontFamily: inStock && isArabic ? "Cairo-Black" : "Rubik-SemiBold"
  }),
  cartActionsWrapper: {
    height: 28,
    width: "100%",
    marginTop: 7,
    // alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  cartActionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cartAction: {
    width: 27,
    height: 27,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#e5e9ec"
  },
  cartLeftActionText: {
    color: black,
    fontSize: 25,
    marginTop: -4
  },
  cartRightActionText: {
    color: black,
    fontSize: 20,
    marginTop: -4
  },
  quantityWrappper: {
    justifyContent: "center"
  },
  quantityWithUnit: isArabic => ({
    fontSize: 16,
    color: "#48474c",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  }),
  offerWrapper: isArabic => ({
    fontSize: 10,
    color: "#707070",
    alignSelf: "flex-end",
    textDecorationLine: "line-through",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  })
});
