import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import { ANDROID, ARABIC, WIDTH } from "../../common/constants";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { Text as NativeBaseText } from "native-base";
import { EvilIcons, Feather } from "../../common/icons";
import { FAB } from "react-native-paper";

const ListItem = ({ isArabic }) => (
  <View icon style={styles.listItem(isArabic)}>
    <View style={styles.listItemLeft(isArabic)}>
      <EvilIcons size={25} color={theme} name="location" />
    </View>
    <View style={styles.listItemCenter(isArabic)}>
      <NativeBaseText style={styles.listTitle(isArabic)}>Home</NativeBaseText>
      <NativeBaseText style={styles.listSubTitle(isArabic)}>
        Jeddah
      </NativeBaseText>
      <NativeBaseText note numberOfLines={1}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde cupiditate
        minus rem debitis delectus tempore sunt esse beatae voluptatibus
        perspiciatis incidunt, aspernatur quo aliquam. Ullam rerum provident
        consequuntur sit exercitationem!
      </NativeBaseText>
    </View>
    <View style={styles.listItemRight(isArabic)}>
      <TouchableOpacity
        activeOpacity={0.7}
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
      <TouchableOpacity activeOpacity={0.7}>
        <EvilIcons size={25} color={theme} name="trash" />
      </TouchableOpacity>
    </View>
  </View>
);

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "عناويني" : "My Addresses"}
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
              source={require("../../../assets/animations/notfound.json")}
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
            {[0, 1, 2, 3].map((v, i) => (
              <ListItem key={i} isArabic={isArabic} />
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
