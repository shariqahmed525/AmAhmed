import React, { useState, useEffect, useRef, forwardRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import CartIcon from "../../components/CartIcon";
import { RadioButton } from "react-native-paper";
import SoundPlayer from "react-native-sound-player";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/actions/user";
import NetInfo from "@react-native-community/netinfo";
import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image";
import { backgroundColor, gray, theme } from "../../common/colors";
import {
  ANDROID,
  ARABIC,
  PACKING,
  ERROR_IMG,
  CUTTINGWAY,
  HEAD_AND_LEGS,
  BASE_URL
} from "../../common/constants";
import Axios from "axios";
import NoInternet from "../../components/NoInternet";
import { calculatePercentage } from "../../common/functions";

let timeOut = null;

const ImageRender = forwardRef(({ animatedObj, item, isArabic }, ref) => (
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
    {item?.discount > 0 && (
      <View style={styles.labelWrapper(isArabic)}>
        <Text style={styles.label()}>
          {calculatePercentage(item?.price, item?.discount)}%
          {isArabic ? "\nخصم" : "\nOFF"}
        </Text>
      </View>
    )}
    <View style={styles.imageWrapper}>
      <FastImage
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
        source={{ uri: item?.thumbnailPictureUrl }}
      />
    </View>
  </>
));

const TitleRender = ({ isArabic, item }) => (
  <View style={styles.nameWrapper(isArabic)}>
    <Text style={styles.name(isArabic)}>
      {isArabic ? item?.nameAr : item?.nameEn}
    </Text>
  </View>
);

const PriceRender = ({ isArabic, item }) => (
  <View style={styles.priceAndUnitWrapper(isArabic)}>
    <View style={styles.priceContainer(isArabic)}>
      <Text style={styles.priceWrapper(isArabic)}>
        {!isArabic && "SAR "}
        <Text style={styles.price(isArabic)}>
          {item?.discount > 0 ? item?.discount : item?.price}{" "}
        </Text>
        {isArabic && "ر.س "}
        {item?.discount > 0 && (
          <Text style={styles.offerWrapper(isArabic)}>
            {!isArabic && "SAR "}
            <Text>{item?.price}</Text>
            {isArabic && " ر.س"}
          </Text>
        )}
      </Text>
    </View>
    <Text style={styles.perQuantity(isArabic)}>
      {/* {item?.quantityType(isArabic)} */}
    </Text>
  </View>
);

export default () => {
  const {
    params: { item }
  } = useRoute();
  const hasPacking = item?.hasPacking;
  const hasCuttingWay = item?.hasCuttingWay;
  const hasHeadAndLegs = item?.hasHeadAndLegs;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    app: { language },
    user: { cart }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;
  let findItem = cart.find(v => v.id === item.id);

  const ref = useRef(null);
  const scrollRef = useRef(null);
  const cuttingRef = useRef(null);
  const packingRef = useRef(null);

  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [checked1, setChecked1] = useState(null);
  const [checked2, setChecked2] = useState(1);
  const [checked3, setChecked3] = useState(null);
  const [animatedObj, setAnimatedObj] = useState(null);
  const [internet, setInternet] = useState(true);
  const [cuttingLoading, setCuttingLoading] = useState(
    !findItem && hasCuttingWay
  );
  const [cuttingWays, setCuttingWays] = useState([]);
  const [packingLoading, setPackingLoading] = useState(!findItem && hasPacking);
  const [packings, setPackings] = useState([]);
  const [headAndLegsLoading, setHeadAndLegsLoading] = useState(
    !findItem && hasHeadAndLegs
  );
  const [headAndLegs, setHeadAndLegs] = useState([]);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
    if (!findItem) {
      if (hasCuttingWay) checkConnection(getCuttingWays);
      if (hasHeadAndLegs) checkConnection(getHeadAndLegs);
      if (hasPacking) checkConnection(getPackings);
    }
  }, []);

  const checkConnection = func => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setInternet(false);
      } else {
        setInternet(true);
        func();
      }
    });
  };

  const getCuttingWays = async () => {
    try {
      setCuttingLoading(true);
      const { data } = await Axios.get(`${BASE_URL}/CuttingWays/${item.id}`);
      if (data && data.length > 0) {
        setCuttingWays([...data]);
      }
      console.log(data, " getCuttingWays");
    } catch (error) {
      console.log(error, " error in getting cutting ways");
    } finally {
      setCuttingLoading(false);
    }
  };

  const getHeadAndLegs = async () => {
    try {
      setHeadAndLegsLoading(true);
      const { data } = await Axios.get(`${BASE_URL}/HeadAndLegs/${item.id}`);
      if (data && data.length > 0) {
        setHeadAndLegs([...data]);
      }
      console.log(data, " getHeadAndLegs");
    } catch (error) {
      console.log(error, " error in getting head and legs");
    } finally {
      setHeadAndLegsLoading(false);
    }
  };

  const getPackings = async () => {
    try {
      setPackingLoading(true);
      const { data } = await Axios.get(`${BASE_URL}/packings/${item.id}`);
      if (data && data.length > 0) {
        setPackings([...data]);
      }
      console.log(data, " getPackings");
    } catch (error) {
      console.log(error, " error in getting packing");
    } finally {
      setPackingLoading(false);
    }
  };

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
  };

  const handlePacking = id => {
    setChecked3(id);
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  const handleAddToCart = () => {
    if (item.hasCuttingWay && !checked1) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء تحديد طريقة القطع"
          : "Please select cutting way"
      });
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
      return;
    }
    if (item.hasPacking && !checked3) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء تحديد نوع التعبئة"
          : "Please select packing type"
      });
      scrollRef.current.scrollToEnd({ animated: true });
      return;
    }
    cartAction("+");
  };

  const handleRetry = () => {
    if (hasCuttingWay) checkConnection(getCuttingWays);
    if (hasHeadAndLegs) checkConnection(getHeadAndLegs);
    if (hasPacking) checkConnection(getPackings);
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          title={isArabic ? item?.categoryNameAr : item?.categoryNameEn}
          titleAlign={isArabic ? "right" : "left"}
          rightIcon={() =>
            internet && <CartIcon cirlceColor={gray} color={backgroundColor} />
          }
          rightIconProps={{
            style: {
              width: 40,
              alignItems: "center",
              justifyContent: "center"
            },
            onPress: () => {
              navigation.goBack();
              navigation.navigate("Cart");
            }
          }}
        />
        <Alert
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          text={alert.alertText}
          title={alert.alertTitle}
          btnText={isArabic ? "حسنا" : "OK"}
          onBtnPress={alert.btnPress || alertClose}
        />
        {!internet ? (
          <NoInternet isArabic={isArabic} onPress={handleRetry} />
        ) : (
          <>
            <ScrollView
              ref={scrollRef}
              contentContainerStyle={styles.scrollContainer}
            >
              <ImageRender
                ref={ref}
                item={item}
                isArabic={isArabic}
                animatedObj={animatedObj}
              />
              <TitleRender isArabic={isArabic} item={item} />
              <PriceRender isArabic={isArabic} item={item} />
              {hasCuttingWay && (
                <View style={styles.boxWrapper} ref={cuttingRef}>
                  <Text style={styles.heading(isArabic)}>
                    {isArabic ? "طريقة القطع" : "Cutting Way"}
                  </Text>
                  {cuttingLoading ? (
                    <View style={styles.miniLoaderWrapper}>
                      <LottieView
                        loop
                        autoPlay
                        style={styles.miniLoader}
                        source={require("../../../assets/animations/loader.json")}
                      />
                    </View>
                  ) : (
                    <RadioButton.Group
                      value={checked1}
                      onValueChange={value => handleCuttingWay(value)}
                    >
                      {CUTTINGWAY.map((v, i) => (
                        <RadioButton.Item
                          key={i}
                          value={v.id}
                          color={theme}
                          label={v.name(isArabic)}
                          style={styles.radioItem(isArabic)}
                          labelStyle={styles.radioItemText(isArabic)}
                        />
                      ))}
                    </RadioButton.Group>
                  )}
                </View>
              )}
              {hasHeadAndLegs && (
                <View style={styles.boxWrapper}>
                  <Text style={styles.heading(isArabic)}>
                    {isArabic ? "الرأس والساقين" : "Head & Legs"}
                  </Text>
                  {headAndLegsLoading ? (
                    <View style={styles.miniLoaderWrapper}>
                      <LottieView
                        loop
                        autoPlay
                        style={styles.miniLoader}
                        source={require("../../../assets/animations/loader.json")}
                      />
                    </View>
                  ) : (
                    <RadioButton.Group
                      value={checked2}
                      onValueChange={value => handleHeadAndLegs(value)}
                    >
                      {HEAD_AND_LEGS.map((v, i) => (
                        <RadioButton.Item
                          key={i}
                          value={v.id}
                          color={theme}
                          label={v.name(isArabic)}
                          style={styles.radioItem(isArabic)}
                          labelStyle={styles.radioItemText(isArabic)}
                        />
                      ))}
                    </RadioButton.Group>
                  )}
                </View>
              )}
              {hasPacking && (
                <View style={styles.boxWrapper} ref={packingRef}>
                  <Text style={styles.heading(isArabic)}>
                    {isArabic ? "التعبئة" : "Packing"}
                  </Text>
                  {packingLoading ? (
                    <View style={styles.miniLoaderWrapper}>
                      <LottieView
                        loop
                        autoPlay
                        style={styles.miniLoader}
                        source={require("../../../assets/animations/loader.json")}
                      />
                    </View>
                  ) : (
                    <RadioButton.Group
                      value={checked3}
                      onValueChange={value => handlePacking(value)}
                    >
                      {PACKING.map((v, i) => (
                        <RadioButton.Item
                          key={i}
                          style={styles.radioItem(isArabic)}
                          labelStyle={{
                            color: "#111111",
                            fontFamily: isArabic
                              ? "Cairo-SemiBold"
                              : "Rubik-Regular"
                          }}
                          value={v.id}
                          color={theme}
                          label={v.name(isArabic)}
                        />
                      ))}
                    </RadioButton.Group>
                  )}
                </View>
              )}
              {(item?.summaryEn || item?.summaryAr) && (
                <>
                  <Text
                    style={{
                      ...styles.heading(isArabic),
                      marginTop: isArabic ? 7 : 15,
                      marginLeft: isArabic ? 0 : 3,
                      marginRight: isArabic ? 3 : 0
                    }}
                  >
                    {isArabic ? "التعبئة" : "Description"}
                  </Text>
                  <Text style={styles.description(isArabic)}>
                    {isArabic ? item?.summaryAr : item?.summaryEn}
                  </Text>
                </>
              )}
            </ScrollView>
            <View style={styles.bottomView}>
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
                  style={styles.btn}
                  activeOpacity={0.7}
                  onPress={handleAddToCart}
                  disabled={
                    cuttingLoading || headAndLegsLoading || packingLoading
                  }
                >
                  <Text style={styles.btnText(isArabic)}>
                    {isArabic ? "أضف إلى العربة" : "ADD TO CART"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
