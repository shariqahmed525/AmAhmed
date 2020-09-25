import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/actions/user";
import { calculatePercentage } from "../../common/functions";
import { theme, black, redColor, greenColor } from "../../common/colors";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

export default ({ item, isArabic }) => {
  const {
    id,
    name,
    image,
    price = 0,
    quantityType,
    offerPrice = 0,
    inStock = true
  } = item;
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.user);
  let findItem = cart.find(v => v.id === id);
  const memo = useMemo(
    () => (
      <View style={styles.container}>
        {!inStock && (
          <View style={styles.outOfStockWrapper}>
            <Text style={styles.outOfStockWrapperLabel(isArabic)}>
              {isArabic ? "إنتهى من المخزن" : "OUT OF STOCK"}
            </Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.itemWrapper(inStock)}
        >
          {offerPrice > 0 && inStock && (
            <View style={styles.labelWrapper()}>
              <Text style={styles.label()}>
                {calculatePercentage(price, offerPrice)}%
                {isArabic ? "\nخصم" : "\nOFF"}
              </Text>
            </View>
          )}
          <View style={styles.firstSection}>
            <View style={styles.imageWrapper}>
              <Image
                source={image}
                resizeMode="contain"
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
            {findItem ? (
              <View style={styles.cartActionsWrapper(isArabic)}>
                <View style={styles.cartActionsContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.cartAction}
                    onPress={() => dispatch(addItemToCart(item, "-"))}
                  >
                    <Text style={styles.cartLeftActionText}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.quantityWrappper}>
                    <Text style={styles.quantityWithUnit(isArabic)}>
                      {findItem?.quantity || 0}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.cartAction}
                    onPress={() => dispatch(addItemToCart(item, "+"))}
                  >
                    <Text style={styles.cartRightActionText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.cartBtn(isArabic)}
                onPress={() => dispatch(addItemToCart(item, "+"))}
              >
                <Text style={styles.cartBtnText(isArabic)}>
                  {isArabic ? "أضف إلى السلة" : "ADD TO CART"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
    ),
    [isArabic, findItem?.quantity]
  );
  return memo;
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 270,
    marginHorizontal: 5
  },
  itemWrapper: inStock => {
    let obj = {};
    if (inStock) {
      obj = {
        borderWidth: 1,
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.22,
        elevation: 3
      };
    }
    return {
      width: "100%",
      height: "100%",
      borderRadius: 7,
      paddingVertical: 10,
      position: "relative",
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      justifyContent: "space-between",
      ...obj
    };
  },
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
    width: "100%",
    color: "#707070",
    textAlign: "center",
    fontSize: isArabic ? 16 : 17,
    paddingTop: isArabic ? 5 : 10,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  perQuantity: isArabic => ({
    color: theme,
    fontSize: isArabic ? 13 : 14,
    marginBottom: isArabic ? 3 : 10,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  priceContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  priceWrapper: isArabic => ({
    color: greenColor,
    width: "100%",
    fontSize: isArabic ? 13 : 11,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  price: isArabic => ({
    color: greenColor,
    fontSize: 18,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  cartBtn: isArabic => ({
    height: 28,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: isArabic ? 7 : 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme,
    backgroundColor: theme
  }),
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
    height: 110,
    alignSelf: "center"
  },
  labelWrapper: () => ({
    top: 1,
    right: 1,
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
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
  label: () => ({
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Rubik-SemiBold"
  }),
  outOfStockWrapper: {
    zIndex: 10,
    width: 160,
    height: 270,
    borderRadius: 7,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20, 20, 20, 0.5)"
  },
  outOfStockWrapperLabel: isArabic => ({
    color: "#fff",
    textAlign: "center",
    fontSize: isArabic ? 25 : 27,
    fontFamily: isArabic ? "Cairo-Black" : "Rubik-Bold"
  }),
  cartActionsWrapper: isArabic => ({
    height: 28,
    width: "100%",
    marginTop: isArabic ? 7 : 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  }),
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
    color: "#707070",
    alignSelf: "flex-end",
    fontSize: isArabic ? 12 : 11,
    textDecorationLine: "line-through",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  })
});
