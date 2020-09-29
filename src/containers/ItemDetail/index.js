import React, { useState, useEffect, useRef, forwardRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import { RadioButton } from "react-native-paper";
import SoundPlayer from "react-native-sound-player";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/actions/user";
import {
  ANDROID,
  ARABIC,
  PACKING,
  CATEGORIES,
  CUTTINGWAY,
  HEAD_AND_LEGS
} from "../../common/constants";

let timeOut = null;

const ImageRender = forwardRef(({ animatedObj, item }, ref) => (
  <>
    {animatedObj && (
      <Animatable.View
        ref={ref}
        useNativeDriver
        animation="fadeOut"
        style={styles.animatedView(animatedObj?.bgColor)}
      >
        <Text style={styles.animatedViewText}>{animatedObj?.quantityUnit}</Text>
      </Animatable.View>
    )}
    <Image resizeMode="stretch" source={item.image} style={styles.image} />
  </>
));

const TitleRender = ({ isArabic, item }) => (
  <View style={styles.nameWrapper(isArabic)}>
    <Text style={styles.name(isArabic)}>{item.name(isArabic)}</Text>
  </View>
);

const PriceRender = ({ isArabic, item }) => (
  <View style={styles.priceAndUnitWrapper(isArabic)}>
    <View style={styles.priceContainer(isArabic)}>
      <Text style={styles.priceWrapper(isArabic)}>
        {!isArabic && "SAR "}
        <Text style={styles.price(isArabic)}>{item.price} </Text>
        {isArabic && "ر.س "}
        {item.offerPrice > 0 && (
          <Text style={styles.offerWrapper(isArabic)}>
            {!isArabic && "SAR "}
            <Text>{item.price + item.offerPrice}</Text>
            {isArabic && " ر.س"}
          </Text>
        )}
      </Text>
    </View>
    <Text style={styles.perQuantity(isArabic)}>
      {item.quantityType(isArabic)}
    </Text>
  </View>
);

export default () => {
  const {
    params: { item }
  } = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    app: { language },
    user: { cart }
  } = useSelector(state => state);
  const ref = useRef(null);
  const [checked1, setChecked1] = useState(null);
  const [checked2, setChecked2] = useState(1);
  const [checked3, setChecked3] = useState(null);
  const [animatedObj, setAnimatedObj] = useState(null);
  const isArabic = language === ARABIC;
  const category = CATEGORIES.find(o => o.code === item.category);

  let findItem = cart.find(v => v.id === item.id);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

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

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCuttingWay = id => {
    setChecked1(id);
  };

  const handleHeadAndLegs = id => {
    setChecked2(id);
    // setChecked2(checked2 === id ? null : id);
  };

  const handlePacking = id => {
    setChecked3(id);
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          title={category.name(isArabic)}
          titleAlign={isArabic ? "right" : "left"}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ImageRender animatedObj={animatedObj} item={item} ref={ref} />
          <TitleRender isArabic={isArabic} item={item} />
          <PriceRender isArabic={isArabic} item={item} />
          <View style={styles.boxWrapper}>
            <Text style={styles.heading(isArabic)}>
              {isArabic ? "طريقة القطع" : "Cutting Way"}
            </Text>
            <RadioButton.Group
              value={checked1}
              onValueChange={value => handleCuttingWay(value)}
            >
              {CUTTINGWAY.map((v, i) => (
                <RadioButton.Item
                  key={i}
                  style={{
                    marginBottom: 10,
                    borderRadius: 10,
                    backgroundColor: "#efefef",
                    flexDirection: isArabic ? "row-reverse" : "row"
                  }}
                  labelStyle={{
                    color: "#111111",
                    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
                  }}
                  value={v.id}
                  color={theme}
                  label={v.name(isArabic)}
                />
              ))}
            </RadioButton.Group>
          </View>
          <View style={styles.boxWrapper}>
            <Text style={styles.heading(isArabic)}>
              {isArabic ? "الرأس والساقين" : "Head & Legs"}
            </Text>
            <RadioButton.Group
              value={checked2}
              onValueChange={value => handleHeadAndLegs(value)}
            >
              {HEAD_AND_LEGS.map((v, i) => (
                <RadioButton.Item
                  key={i}
                  style={{
                    marginBottom: 10,
                    borderRadius: 10,
                    backgroundColor: "#efefef",
                    flexDirection: isArabic ? "row-reverse" : "row"
                  }}
                  labelStyle={{
                    color: "#111111",
                    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
                  }}
                  value={v.id}
                  color={theme}
                  label={v.name(isArabic)}
                />
              ))}
            </RadioButton.Group>
          </View>
          <View style={styles.boxWrapper}>
            <Text style={styles.heading(isArabic)}>
              {isArabic ? "التعبئة" : "Packing"}
            </Text>
            <RadioButton.Group
              value={checked3}
              onValueChange={value => handlePacking(value)}
            >
              {PACKING.map((v, i) => (
                <RadioButton.Item
                  key={i}
                  style={{
                    marginBottom: 10,
                    borderRadius: 10,
                    backgroundColor: "#efefef",
                    flexDirection: isArabic ? "row-reverse" : "row"
                  }}
                  labelStyle={{
                    color: "#111111",
                    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
                  }}
                  value={v.id}
                  color={theme}
                  label={v.name(isArabic)}
                />
              ))}
            </RadioButton.Group>
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          {findItem ? (
            <View style={styles.cartActionsWrapper(isArabic)}>
              <View style={styles.cartActionsContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
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
                  activeOpacity={0.8}
                  style={styles.cartAction}
                  onPress={() => cartAction("+")}
                >
                  <Text style={styles.cartRightActionText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={() => cartAction("+")}
            >
              <Text style={styles.btnText(isArabic)}>
                {isArabic ? "أضف إلى السلة" : "ADD TO CART"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
