import React, { useMemo, useState } from "react";
import styles from "./styles";
import { View, Text, TouchableOpacity } from "react-native";
import {
  FontAwesome5,
  AntDesign,
  Entypo,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  Icon
} from "../../common/icons";
import Alert from "../Alert";
import { SafeAreaView } from "react-navigation";
import { gray } from "../../common/colors";
import { useSelector } from "react-redux";
import { ARABIC } from "../../common/constants";

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
  const {
    user: { userData },
    app: { language }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;
  const [alert, setAlert] = useState({
    error: false,
    alert: false,
    btnText: "OK",
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });

  const alertClose = () => {
    setAlert({
      error: false,
      alert: false,
      btnText: "OK",
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });
  };

  const confirmation = () => {};

  const memo = useMemo(
    () => (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never" }}
      >
        <Alert
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          cancelText={"Cancel"}
          text={alert.alertText}
          btnText={alert.btnText}
          title={alert.alertTitle}
          onCancelPress={alertClose}
        />
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.profileWrapper(isArabic)}
          >
            <View style={styles.iconWrapper(isArabic)}>
              <FontAwesome5 name="user-alt" size={20} />
            </View>
            <View style={styles.nameWrapper(isArabic)}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.profileName(isArabic)}
              >
                {isArabic ? "حساب زائر" : "Guest User"}
              </Text>
              <Text style={styles.listText(isArabic, false)}>
                {isArabic ? "الملف الشخصي" : "Profile"}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.line} />

          <View style={styles.listWrapper}>
            <List
              isArabic={isArabic}
              text={isArabic ? "طلباتي" : "My Orders"}
              onPress={() => navigation.navigate("MyOrdersScreen")}
              icon={<MaterialIcons size={25} color={gray} name="restore" />}
            />
            <List
              isArabic={isArabic}
              text={isArabic ? "عناويني" : "My Addresses"}
              onPress={() => {
                drawerClose();
                // navigation.closeDrawer();
                setTimeout(() => {
                  navigation.navigate("Address", {
                    myAddresses: true
                  });
                }, 0);
              }}
              icon={
                <MaterialCommunityIcons
                  size={25}
                  color={gray}
                  name="map-marker-multiple-outline"
                />
              }
            />
            <List
              isArabic={isArabic}
              text={isArabic ? "لغة" : "Language"}
              onPress={() => navigation.navigate("Language")}
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
                // navigation.closeDrawer();
                setTimeout(() => {}, 0);
              }}
              icon={<Icon name="share-social-outline" size={25} color={gray} />}
            />
            <List
              isArabic={isArabic}
              text={isArabic ? "معلومات عنا" : "About Us"}
              onPress={() => navigation.navigate("AboutUs")}
              icon={<Entypo name="info" size={20} color={gray} />}
            />
            <List
              isArabic={isArabic}
              text={isArabic ? "اتصل بنا" : "Contact Us"}
              onPress={() => navigation.navigate("ContactUs")}
              icon={<Feather name="message-circle" size={20} color={gray} />}
            />
          </View>

          <View style={[styles.line, { height: 0.5 }]} />

          <View style={[styles.listWrapper, styles.bottomIcons]}>
            <List
              isArabic={isArabic}
              onPress={confirmation}
              text={isArabic ? "" : "Logout"}
              icon={<AntDesign name="poweroff" size={20} color={gray} />}
            />
          </View>
        </View>
      </SafeAreaView>
    ),
    [userData, alert, language]
  );

  return memo;
};
