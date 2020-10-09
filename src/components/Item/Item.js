import React, { useRef, useState } from "react";
import SoundPlayer from "react-native-sound-player";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/actions/user";
import { calculatePercentage } from "../../common/functions";
import { theme, redColor, greenColor, lightTheme } from "../../common/colors";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { WIDTH } from "../../common/constants";
import { useNavigation } from "@react-navigation/native";
const ITEM_WIDTH = WIDTH / 2 - 17.5;
const ITEM_HEIGHT = (270 / 160) * ITEM_WIDTH;
const IMAGE_WIDTH = ITEM_WIDTH - 20;

let timeOut = null;

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
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [animatedObj, setAnimatedObj] = useState(null);
  const {
    user: { cart }
  } = useSelector(state => state);
  let findItem = cart.find(v => v.id === id);

  const playSound = sound => {
    try {
      SoundPlayer.playSoundFile(sound, "mp3");
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  const cartAction = sign => {
    setAnimatedObj(null);
    if (timeOut) {
      clearTimeout(timeOut);
      timeOut = null;
    }
    const redColor = "rgba(227, 10, 43, 0.8)";
    const greenColor = "rgba(143, 201, 77, 0.8)";
    setAnimatedObj(
      sign === "+"
        ? { bgColor: greenColor, quantityUnit: 1 }
        : { bgColor: redColor, quantityUnit: 1 }
    );
    dispatch(addItemToCart(item, sign));
    playSound(sign === "+" ? "addtocart" : "removefromcart");
    if (ref && ref.current) {
      ref.current.stopAnimation();
      ref.current.fadeIn(500);
      timeOut = setTimeout(() => {
        setAnimatedObj(null);
      }, 500);
    }
  };

  const handleItemPress = () => {
    if (
      item.hasCuttingWay ||
      item.hasHeadAndLegs ||
      item.hasPacking ||
      item.description
    ) {
      navigation.navigate("ItemDetail", {
        item
      });
      return;
    }
    cartAction("+");
  };

  const handleAddToCart = () => {
    if (item.hasCuttingWay || item.hasHeadAndLegs || item.hasPacking) {
      navigation.navigate("ItemDetail", {
        item
      });
      return;
    }
    cartAction("+");
  };

  return (
    <View style={styles.container}>
      {!inStock && (
        <View style={styles.outOfStockWrapper}>
          <Text style={styles.outOfStockWrapperLabel(isArabic)}>
            {isArabic ? "إنتهى من المخزن" : "OUT OF STOCK"}
          </Text>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleItemPress}
        style={styles.itemWrapper(inStock)}
      >
        {animatedObj && (
          <Animatable.View
            ref={ref}
            useNativeDriver
            animation="fadeOut"
            style={styles.animatedView(animatedObj?.bgColor)}
          >
            <Text style={styles.animatedViewText}>
              {animatedObj?.quantityUnit}
            </Text>
          </Animatable.View>
        )}
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
            numberOfLines={2}
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
                  activeOpacity={0.7}
                  style={styles.cartAction}
                  onPress={() => cartAction("-")}
                >
                  <Text style={styles.cartLeftActionText}>-</Text>
                </TouchableOpacity>
                <View style={styles.quantityWrappper}>
                  <Text style={styles.quantityWithUnit(isArabic)}>
                    {findItem?.quantity || 0}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cartAction}
                  onPress={() => cartAction("+")}
                >
                  <Text style={styles.cartRightActionText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleAddToCart}
              style={styles.cartBtn(isArabic)}
            >
              <Text style={styles.cartBtnText(isArabic)}>
                {isArabic ? "أضف إلى العربة" : "ADD TO CART"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginVertical: 5,
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
    fontSize: isArabic ? 15 : 15,
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
    fontSize: isArabic ? 15 : 12,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  price: isArabic => ({
    fontSize: 20,
    color: greenColor,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  cartBtn: isArabic => ({
    height: 30,
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
    width: IMAGE_WIDTH,
    height: (110 / 150) * IMAGE_WIDTH,
    alignSelf: "center",
    position: "relative"
  },
  labelWrapper: () => ({
    top: 1,
    right: 1,
    zIndex: 1,
    width: 60,
    height: 60,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Rubik-SemiBold"
  }),
  outOfStockWrapper: {
    zIndex: 10,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
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
    height: 30,
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
    width: 37,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: lightTheme,
    justifyContent: "center"
  },
  cartLeftActionText: {
    color: theme,
    fontSize: 25,
    marginTop: -4
  },
  cartRightActionText: {
    color: theme,
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
  }),
  animatedView: backgroundColor => ({
    zIndex: 2000,
    backgroundColor,
    width: ITEM_WIDTH,
    alignItems: "center",
    position: "absolute",
    paddingHorizontal: 10,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    justifyContent: "center",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    height: IMAGE_WIDTH + 30
  }),
  animatedViewText: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Rubik-SemiBold"
  }
});
