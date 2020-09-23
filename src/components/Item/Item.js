import React from "react";
import { backgroundColor, theme } from "../../common/colors";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
// import Modal from "react-native-modal";
// import SingleItemModal from "../../ItemsTabs/SingleItemModal";

export default ({ product, isArabic }) => {
  // const setModalVisible = modalVisible => {
  //   this.setState({ modalVisible });
  // };

  const {
    image,
    name,
    price = 0,
    id,
    offer = 0,
    quantityType = {},
    inStock = true
  } = product;
  let checkKey = false;
  return (
    <View>
      {/* <Modal
          useNativeDriver
          transparent={true}
          animationType="slide"
          style={styles.modal}
          visible={modalVisible}
          backdropColor="transparent"
          onRequestClose={() => setModalVisible(false)}
        >
          <SingleItemModal
            product={product}
            modalVisible={modalVisible}
            setModalVisible={res => setModalVisible(res)}
          />
        </Modal> */}
      <TouchableOpacity
        activeOpacity={0.5}
        // onPress={() => setModalVisible(true)}
      >
        <View style={styles.itemWrapper(isArabic)}>
          {offer > 0 && (
            <View style={styles.labelWrapper(inStock)}>
              <Text style={styles.label(isArabic)}>
                {/* {`${calculatePercentage(price, offer)}% OFF`} */}
              </Text>
            </View>
          )}
          {!inStock && (
            <View style={styles.outOfStocklabelWrapper()}>
              <Text style={styles.outOfStocklabel(isArabic)}>Out of Stock</Text>
            </View>
          )}
          <View style={styles.firstSection}>
            <View style={styles.imageWrapper}>
              <Image
                source={image}
                resizeMode="center"
                style={styles.imageStyle}
              />
            </View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                ...styles.name(isArabic),
                textAlign: "left"
              }}
            >
              {name()}
            </Text>
          </View>
          <View style={styles.secondSection}>
            <Text style={styles.perQuantity}>{quantityType.sign}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceWrapper(isArabic)}>
                SR <Text style={styles.price(isArabic)}>{price}</Text>
              </Text>
              {offer > 0 && (
                <Text style={styles.offerWrapper(isArabic)}>
                  SR <Text>{price + offer}</Text>
                </Text>
              )}
            </View>
            {checkKey ? (
              <View style={styles.cartActionsWrapper}>
                <View style={styles.cartActionsContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.cartLeftAction}
                    // onPress={() => addItemToCart(id, "-")}
                  >
                    <Text style={styles.cartLeftActionText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityWithUnit(isArabic)}>{12}</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.cartRightAction}
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
                <Text style={styles.cartBtnText(isArabic)}>ADD TO CART</Text>
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
    borderColor: backgroundColor,
    justifyContent: "space-between",
    backgroundColor: backgroundColor,
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
    color: theme,
    fontSize: 12,
    width: "100%",
    paddingTop: 5,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  }),
  perQuantity: {
    color: "#4d4d4d",
    fontSize: 11,
    marginBottom: 5
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  priceWrapper: isArabic => ({
    color: theme,
    fontSize: 12,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  }),
  price: isArabic => ({
    color: theme,
    fontSize: 17,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  }),
  cartBtn: {
    marginTop: 7,
    height: 30,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: theme
  },
  cartBtnText: isArabic => ({
    fontSize: 11,
    color: "#fff",
    textAlign: "center",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  }),
  modal: {
    margin: 0
  },
  imageWrapper: {
    width: 100,
    height: 100,
    alignSelf: "center"
  },
  labelWrapper: inStock => ({
    top: inStock ? 5 : 28,
    right: 5,
    zIndex: 1,
    height: 20,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 6,
    justifyContent: "center",
    backgroundColor: "#fe0100",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5
  }),
  outOfStocklabelWrapper: () => ({
    top: 5,
    right: 5,
    paddingHorizontal: 6,
    zIndex: 1,
    height: 20,
    position: "absolute",
    alignItems: "center",
    backgroundColor: "#fe0100",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5
  }),
  label: isArabic => ({
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  }),
  outOfStocklabel: isArabic => ({
    color: "#fff",
    fontSize: 11,
    textAlign: "center",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  }),

  //

  cartActionsWrapper: {
    height: 30,
    width: "90%",
    marginTop: 7,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  cartActionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cartLeftAction: {
    width: 26,
    height: 26,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#cccccc"
  },
  cartLeftActionText: {
    fontSize: 25,
    color: "#ffffff",
    marginTop: -4
  },
  quantityWithUnit: isArabic => ({
    fontSize: 16,
    color: "#48474c",
    textAlignVertical: "center",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  }),
  cartRightAction: {
    width: 26,
    height: 26,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#cccccc"
  },
  cartRightActionText: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: -2
  },
  offerWrapper: isArabic => ({
    fontSize: 10,
    marginLeft: 7,
    color: "#48474c",
    alignSelf: "flex-end",
    marginBottom: 3,
    textDecorationLine: "line-through",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Medium"
  })
});
