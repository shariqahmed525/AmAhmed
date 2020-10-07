import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { ANDROID, ARABIC } from "../../common/constants";
import { ShowToastWithScroll } from "../../common/functions";

export default () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { params } = useRoute();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddAddress = () => {
    // if (!selectedCity) {
    //   ShowToastWithScroll(
    //     undefined,
    //     0,
    //     false,
    //     ref,
    //     isArabic ? "الرجاء تحديد المدينة" : "Please select city",
    //     isArabic
    //   );
    //   return;
    // }
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "عنوان جديد" : "New Address"}
        />
        <ScrollView contentContainerStyle={styles.mainContainer}>
          <Text style={styles.heading(isArabic)}>
            {isArabic ? "اسم" : "Name"}
          </Text>
          <TextInput
            value={name}
            spellCheck={false}
            autoCorrect={false}
            style={styles.input(isArabic)}
            onChangeText={e => setName(e)}
            placeholder={isArabic ? "أدخل اسم" : "Enter name"}
          />
          <Text style={styles.heading(isArabic)}>
            {isArabic ? "رقم الاتصال" : "City"}
          </Text>
          <TextInput
            spellCheck={false}
            autoCorrect={false}
            style={styles.input(isArabic)}
            value={params?.city?.name(isArabic)}
          />
          <Text style={styles.heading(isArabic)}>
            {isArabic ? "عنوان" : "Address"}
          </Text>
          <TextInput
            value={address}
            spellCheck={false}
            autoCorrect={false}
            style={styles.input(isArabic)}
            onChangeText={e => setAddress(e)}
            placeholder={
              isArabic
                ? "أدخل عنوانك الكامل هنا ..."
                : "Enter your complete address here..."
            }
          />
        </ScrollView>
        <View style={styles.footer(isArabic)}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleAddAddress}
            style={styles.btn("100%")}
          >
            <Text style={styles.btnText(isArabic)}>
              {isArabic ? "أضف" : "ADD"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
