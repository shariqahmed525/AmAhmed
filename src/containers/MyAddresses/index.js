import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import styles from "./styles";
import { lightTheme, theme } from "../../common/colors";
import Alert from "../../components/Alert";
import { ANDROID, ARABIC, WIDTH } from "../../common/constants";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { Text as NativeBaseText } from "native-base";
import { EvilIcons, Feather } from "../../common/icons";
import { FAB } from "react-native-paper";
import { deleteAddressAction } from "../../redux/actions/user";

const ListItem = ({ isArabic, data, navigation, onDeletePress }) => (
  <View icon style={styles.listItem(isArabic)}>
    <View style={styles.listItemLeft(isArabic)}>
      <EvilIcons size={25} color={theme} name="location" />
    </View>
    <View style={styles.listItemCenter(isArabic)}>
      <NativeBaseText style={styles.listTitle(isArabic)}>
        {data.name}
      </NativeBaseText>
      <NativeBaseText style={styles.listSubTitle(isArabic)}>
        {data.city}
      </NativeBaseText>
      <NativeBaseText
        note
        numberOfLines={1}
        ellipsizeMode="tail"
        style={styles.noteText(isArabic)}
      >
        {data.address}
      </NativeBaseText>
    </View>
    <View style={styles.listItemRight(isArabic)}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("PinLocation", {
            ...data,
            isEdit: true
          });
        }}
        style={{
          transform: [
            {
              rotateY: isArabic ? "180deg" : "0deg"
            }
          ]
        }}
      >
        <Feather
          size={18}
          color={theme}
          name="edit-2"
          style={{ paddingHorizontal: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onDeletePress(data.id)}
      >
        <EvilIcons size={25} color={theme} name="trash" />
      </TouchableOpacity>
    </View>
  </View>
);

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [loading, setLoading] = useState(true);
  const {
    app: { language },
    user: { addresses }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirm = id => {
    setAlert({
      alert: true,
      error: false,
      btnPress: () => onDeletePress(id),
      alertText: isArabic
        ? "هل أنت متأكد من حذف العنوان؟"
        : "Are you sure to delete the address?"
    });
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  const onDeletePress = id => {
    dispatch(deleteAddressAction(id));
    alertClose();
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "عناويني" : "My Addresses"}
        />
        <Alert
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          btnColor={lightTheme}
          text={alert.alertText}
          title={alert.alertTitle}
          onCancelPress={alertClose}
          btnText={isArabic ? "حسنا" : "OK"}
          cancelText={isArabic ? "إلغاء" : "Cancel"}
          onBtnPress={alert.btnPress || alertClose}
        />
        <FAB
          icon="plus"
          color="#fff"
          style={styles.fab}
          onPress={() => navigation.navigate("PinLocation")}
        />
        {loading ? (
          <View style={styles.loaderWrapper}>
            <LottieView
              loop
              autoPlay
              style={styles.loader}
              source={require("../../../assets/animations/loader.json")}
            />
          </View>
        ) : !addresses || addresses.length < 1 ? (
          <View style={styles.loaderWrapper}>
            <LottieView
              loop
              autoPlay
              style={{ width: WIDTH * 0.75 }}
              source={require("../../../assets/animations/notfoundaddress.json")}
            />
            <Text style={styles.emptyText(isArabic)}>
              {isArabic ? "لا يوجد عنوان" : "No Address"}
            </Text>
            <Text style={styles.emptySubText(isArabic)}>
              {isArabic
                ? "لم تقم بإضافة أي عنوان"
                : "You didn't add any address"}
            </Text>
          </View>
        ) : (
          <View style={styles.listWrapper}>
            {addresses.map((v, i) => (
              <ListItem
                key={i}
                data={v}
                isArabic={isArabic}
                navigation={navigation}
                onDeletePress={handleConfirm}
              />
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
