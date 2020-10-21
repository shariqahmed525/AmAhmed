import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import SoundPlayer from "react-native-sound-player";
import * as Animatable from "react-native-animatable";
import FastImage from "react-native-fast-image";
import {
  theme,
  black,
  darkGray,
  lightTheme,
  mediumGray,
  lightGray
} from "../common/colors";
import { addItemToCart } from "../redux/actions/user";

const PriceRender = ({ price, isArabic, discount, unitType }) => (
  <View style={styles.priceContainer(isArabic)}>
    <Text style={styles.priceWrapper(isArabic)}>
      {!isArabic && "SAR "}
      <Text style={styles.price(isArabic)}>
        {discount > 0 ? discount : price}{" "}
      </Text>
      {isArabic && discount < 1 && "ر.س "}
      {discount > 0 && <Text style={styles.offerWrapper}>{price} </Text>}
      {isArabic && discount > 1 && "ر.س "}
      <Text style={{ fontSize: 15 }}>/ </Text>
      {unitType}
    </Text>
  </View>
);

let timeOut = null;

export default ({ item, isArabic }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [animatedObj, setAnimatedObj] = useState(null);
  const playSound = sound => {
    try {
      SoundPlayer.playSoundFile(sound, "mp3");
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  const cartAction = (item, sign) => {
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

  const productTotal = () => {
    const pp = item?.discount > 0 ? item?.discount : item?.price;
    const cuttingWayPrice =
      item?.hasCuttingWay && item?.cuttingWay && item?.cuttingWay?.cost
        ? item?.cuttingWay?.cost
        : 0;
    const headAndLegsPrice =
      item?.hasHeadAndLegs && item?.headAndLeg && item?.headAndLeg?.cost
        ? item?.headAndLeg?.cost
        : 0;
    const packingPrice =
      item?.hasPacking && item?.packing && item?.packing?.cost
        ? item?.packing?.cost
        : 0;
    return pp + cuttingWayPrice + headAndLegsPrice + packingPrice;
  };

  return (
    <View style={styles.cartItemWrapper(isArabic)}>
      <View style={styles.cartItem(isArabic)}>
        <View style={styles.cartImageWrapper(isArabic)}>
          <FastImage
            style={styles.cartImage}
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: item?.thumbnailPictureUrl }}
          />
          {animatedObj && (
            <Animatable.View
              ref={ref}
              useNativeDriver
              animation="fadeOut"
              style={styles.animatedView(animatedObj?.bgColor, isArabic)}
            >
              <Text style={styles.animatedViewText}>
                {animatedObj?.quantityUnit}
              </Text>
            </Animatable.View>
          )}
        </View>
        <View style={styles.cartDetailsWrapper(isArabic)}>
          <View style={styles.cartDetails(isArabic)}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={isArabic ? 1 : 2}
              style={styles.cartItemTitle(isArabic)}
            >
              {isArabic ? item?.nameAr : item?.nameEn}
            </Text>
            <PriceRender
              price={item.price}
              isArabic={isArabic}
              discount={item.discount}
              unitType={isArabic ? item?.unitTypeAr : item?.unitTypeEn}
            />
          </View>
          {item?.hasCuttingWay && item?.cuttingWay && (
            <View style={styles.cartSubItemWrapper(1, 1)}>
              <Text style={styles.cartSubItemTitle(isArabic)}>
                {isArabic ? item?.cuttingWay?.nameAr : item?.cuttingWay?.nameEn}
              </Text>
              <Text style={styles.cartSubItemTotalText(isArabic)}>
                {!isArabic && "SAR "}
                <Text style={styles.cartSubItemTotalPriceText(isArabic)}>
                  {item?.cuttingWay?.cost}
                </Text>
                {isArabic && " ر.س"}
              </Text>
            </View>
          )}
          {item?.hasHeadAndLegs && item?.headAndLeg && (
            <View style={styles.cartSubItemWrapper(1)}>
              <Text style={styles.cartSubItemTitle(isArabic)}>
                {isArabic ? item?.headAndLeg?.nameAr : item?.headAndLeg?.nameEn}
              </Text>
              <Text style={styles.cartSubItemTotalText(isArabic)}>
                {!isArabic && "SAR "}
                <Text style={styles.cartSubItemTotalPriceText(isArabic)}>
                  {item?.headAndLeg?.cost}
                </Text>
                {isArabic && " ر.س"}
              </Text>
            </View>
          )}
          {item?.hasPacking && item?.packing && (
            <View style={{ ...styles.cartSubItemWrapper(0) }}>
              <Text style={styles.cartSubItemTitle(isArabic)}>
                {isArabic ? item?.packing?.nameAr : item?.packing?.nameEn}
              </Text>
              <Text style={styles.cartSubItemTotalText(isArabic)}>
                {!isArabic && "SAR "}
                <Text style={styles.cartSubItemTotalPriceText(isArabic)}>
                  {item?.packing?.cost}
                </Text>
                {isArabic && " ر.س"}
              </Text>
            </View>
          )}
          <View style={styles.cartActionWrapper(isArabic)}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => cartAction(item, "-")}
              style={styles.cartAction(isArabic)}
            >
              <Text style={styles.cartDifferenceAction}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cartAction(isArabic)}
              onPress={() => cartAction(item, "+")}
            >
              <Text style={styles.cartSumAction}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.cartItemTotal(isArabic)}>
        {item?.hasCuttingWay &&
          item?.cuttingWay?.cost &&
          item?.cuttingWay?.cost > 0 && (
            <View style={styles.costWrapper}>
              <Text style={styles.cost}>{item?.cuttingWay?.cost}</Text>
              <Text style={styles.plus}>+</Text>
            </View>
          )}
        {item?.hasHeadAndLegs &&
          item?.headAndLeg?.cost &&
          item?.headAndLeg?.cost > 0 && (
            <View style={styles.costWrapper}>
              <Text style={styles.cost}>{item?.headAndLeg?.cost}</Text>
              <Text style={styles.plus}>+</Text>
            </View>
          )}
        {item?.hasPacking && item?.packing?.cost && item?.packing?.cost > 0 && (
          <View style={styles.costWrapper}>
            <Text style={styles.cost}>{item?.packing?.cost}</Text>
            <Text style={styles.plus}>+</Text>
          </View>
        )}
        <Text style={styles.cartItemTotalText(isArabic)}>
          {!isArabic && "SAR "}
          <Text style={styles.cartItemTotalPriceText(isArabic)}>
            {productTotal()}
          </Text>
          {isArabic && " ر.س"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemWrapper: isArabic => ({
    width: "100%",
    marginBottom: 15,
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  cartItem: isArabic => ({
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.22,
    borderRadius: 7,
    elevation: 3,
    flexDirection: isArabic ? "row-reverse" : "row",
    backgroundColor: "#fafafc"
  }),
  cartImageWrapper: isArabic => ({
    width: 120,
    height: 120,
    overflow: "hidden",
    borderTopLeftRadius: isArabic ? 0 : 7,
    borderBottomLeftRadius: isArabic ? 0 : 7,
    borderTopRightRadius: isArabic ? 7 : 0,
    borderBottomRightRadius: isArabic ? 7 : 0,
    backgroundColor: "#fff"
  }),
  cartImage: {
    width: "100%",
    height: "100%"
  },
  cartDetailsWrapper: isArabic => ({
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingTop: isArabic ? 2 : 10,
    justifyContent: "space-between"
  }),
  cartItemTitle: isArabic => ({
    fontSize: isArabic ? 19 : 16,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  cartDetails: isArabic => ({
    width: "100%",
    paddingBottom: 10
  }),
  cartActionWrapper: isArabic => ({
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }),
  cartAction: isArabic => ({
    width: 45,
    height: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lightTheme
  }),
  cartItemTotal: () => ({
    width: 80,
    paddingLeft: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center"
  }),
  cartItemTotalText: isArabic => ({
    fontSize: 13,
    textAlign: "center",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  cartItemTotalPriceText: () => ({
    fontSize: 21,
    fontFamily: "Rubik-Medium"
  }),
  priceContainer: isArabic => ({
    marginTop: isArabic ? 0 : 7
  }),
  priceWrapper: isArabic => ({
    color: "#707070",
    fontSize: isArabic ? 13 : 11.5,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  price: isArabic => ({
    fontSize: isArabic ? 18 : 16,
    color: darkGray,
    fontFamily: "Rubik-Medium"
  }),
  quantity: {
    fontSize: 16,
    color: darkGray,
    fontFamily: "Rubik-Medium"
  },
  offerWrapper: {
    fontSize: 11.5,
    color: "#707070",
    fontFamily: "Rubik-Regular",
    textDecorationLine: "line-through",
    textDecorationColor: theme
  },
  cartDifferenceAction: {
    color: theme,
    fontSize: 25,
    marginTop: -4
  },
  cartSumAction: {
    color: theme,
    fontSize: 20,
    marginTop: -4
  },
  animatedView: (backgroundColor, isArabic) => ({
    width: 120,
    zIndex: 2000,
    backgroundColor,
    alignItems: "center",
    position: "absolute",
    paddingHorizontal: 10,
    justifyContent: "center",
    height: 120,
    borderTopLeftRadius: isArabic ? 0 : 7,
    borderBottomLeftRadius: isArabic ? 0 : 7,
    borderTopRightRadius: isArabic ? 7 : 0,
    borderBottomRightRadius: isArabic ? 7 : 0
  }),
  animatedViewText: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Rubik-SemiBold"
  },
  cartSubItemWrapper: (borderBottomWidth = 1, borderTopWidth = 0) => ({
    paddingVertical: 10,
    borderTopWidth,
    borderBottomWidth,
    borderColor: lightGray
  }),
  cartSubItemTitle: isArabic => ({
    color: black,
    fontSize: 14,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  cartSubItemTotalText: isArabic => ({
    fontSize: 9,
    color: "#707070",
    marginTop: isArabic ? 2 : 5,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  cartSubItemTotalPriceText: isArabic => ({
    fontSize: 14,
    color: darkGray,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  }),
  plus: {
    fontSize: 25,
    color: mediumGray,
    marginVertical: 5,
    textAlign: "center",
    fontFamily: "Rubik-Regular"
  },
  cost: {
    fontSize: 17,
    color: theme,
    fontFamily: "Rubik-Medium"
  }
});
