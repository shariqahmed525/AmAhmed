import React, { useMemo, useState } from "react";
import styles from "./styles";
import { View, Text, TouchableOpacity, Image, Share } from "react-native";
import {
  Entypo,
  Icon,
  Feather,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons
} from "../../common/icons";
import Alert from "../Alert";
import { SafeAreaView } from "react-navigation";
import { gray, lightTheme } from "../../common/colors";
import { useDispatch, useSelector } from "react-redux";
import { ARABIC, IOS } from "../../common/constants";
import { clearUserData, onAddressesAction } from "../../redux/actions/user";

const List = ({ onPress, text, icon, isArabic }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={styles.list(isArabic)}
  >
    <View style={styles.listIconWrapper(isArabic)}>{icon}</View>
    <Text style={styles.listText(isArabic)}>{text}</Text>
  </TouchableOpacity>
);

export default ({ navigation, drawerClose }) => {
  const dispatch = useDispatch();
  const {
    user: { userData },
    app: { language }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;
  const [alert, setAlert] = useState({
    error: false,
    alert: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });

  const alertClose = () => {
    setAlert({
      error: false,
      alert: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });
  };

  const confirmation = () => {
    drawerClose();
    setAlert({
      alert: true,
      error: false,
      btnPress: logout,
      alertText: isArabic
        ? "هل أنت متأكد من تسجيل الخروج من هذا؟"
        : "Are you sure to logout from this?"
    });
  };

  const logout = () => {
    dispatch(clearUserData());
    dispatch(onAddressesAction([]));
    alertClose();
  };

  const handleListItem = (route, params) => {
    navigation.navigate(route, params);
    setTimeout(() => {
      drawerClose();
    }, 300);
  };

  const onShare = async () => {
    const AndroidURL =
      "https://play.google.com/store/apps/details?id=com.amahmedapp";
    const IosURL = "https://apps.apple.com/sa/app/amahmed/id1535201763";
    try {
      await Share.share(
        {
          title: "AmAhmed",
          message: isArabic
            ? `قم بتحميل تطبيق عم احمد باستخدام الرابط: \n${
                IOS ? IosURL : AndroidURL
              }`
            : `Download the AmAhmed's app using given link: \n${
                IOS ? IosURL : AndroidURL
              }`
        },
        {
          dialogTitle: isArabic ? "شارك عم احمد التطبيق" : "Share AmAhmed's App"
        }
      );
    } catch (error) {
      console.log("error ", error);
    }
  };

  const memo = useMemo(
    () => (
      <SafeAreaView
        forceInset={{ bottom: "never" }}
        style={styles.safeAreaView(isArabic)}
      >
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

        <View style={styles.main(isArabic)}>
          <View style={styles.container(isArabic)}>
            <View style={styles.profileWrapper(isArabic)}>
              <Image
                resizeMode="contain"
                style={styles.iconWrapper(isArabic)}
                source={require("../../../assets/images/logo.png")}
              />
              <View style={styles.nameWrapper(isArabic)}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.profileName(isArabic)}
                >
                  {isArabic ? "عم احمد" : "AmAhmed"}
                </Text>
              </View>
            </View>
            <View style={styles.line} />

            <View style={styles.listWrapper}>
              {userData && (
                <>
                  <List
                    isArabic={isArabic}
                    text={isArabic ? "طلباتي" : "My Orders"}
                    onPress={() => handleListItem("MyOrders")}
                    icon={
                      <MaterialIcons size={25} color={gray} name="restore" />
                    }
                  />
                  <List
                    isArabic={isArabic}
                    text={isArabic ? "عناويني" : "My Addresses"}
                    onPress={() => handleListItem("MyAddresses")}
                    icon={
                      <MaterialCommunityIcons
                        size={25}
                        color={gray}
                        name="map-marker-multiple-outline"
                      />
                    }
                  />
                </>
              )}
              <List
                isArabic={isArabic}
                onPress={() =>
                  handleListItem("City", {
                    fromHome: true
                  })
                }
                text={isArabic ? "مدينة التبديل" : "Switch City"}
                icon={
                  <MaterialCommunityIcons
                    size={25}
                    color={gray}
                    name="home-city-outline"
                  />
                }
              />
              <List
                isArabic={isArabic}
                text={isArabic ? "لغة" : "Language"}
                onPress={() => handleListItem("Language")}
                icon={
                  <MaterialCommunityIcons
                    size={25}
                    color={gray}
                    name="translate"
                  />
                }
              />
              <List
                isArabic={isArabic}
                text={isArabic ? "شارك التطبيق" : "Share App"}
                onPress={() => {
                  drawerClose();
                  onShare();
                }}
                icon={
                  <Icon name="share-social-outline" size={25} color={gray} />
                }
              />
              <List
                isArabic={isArabic}
                text={isArabic ? "معلومات عم احمد" : "About AmAhmed"}
                onPress={() => handleListItem("AboutUs")}
                icon={<Entypo name="info" size={20} color={gray} />}
              />
              <List
                isArabic={isArabic}
                text={isArabic ? "اتصل بنا" : "Contact Us"}
                onPress={() => handleListItem("ContactUs")}
                icon={<Feather name="message-circle" size={20} color={gray} />}
              />
            </View>

            <View style={[styles.line, { height: 0.5 }]} />
            {userData && (
              <View style={[styles.listWrapper, styles.bottomIcons]}>
                <List
                  isArabic={isArabic}
                  onPress={confirmation}
                  text={isArabic ? "تسجيل خروج" : "Logout"}
                  icon={<AntDesign name="poweroff" size={20} color={gray} />}
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    ),
    [userData, alert, language]
  );

  return memo;
};
