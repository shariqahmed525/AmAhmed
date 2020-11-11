import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  Clipboard,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import { Toast } from "native-base";
import { useSelector } from "react-redux";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import { AntDesign } from "../../common/icons";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import { ANDROID, ARABIC } from "../../common/constants";

let _isMounted = false;

export default ({ route: { params } }) => {
  const navigation = useNavigation();
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
    }
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCopy = (copyText, text) => {
    Clipboard.setString(copyText);
    Toast.show({
      text,
      style: {
        transform: [
          {
            scaleX: isArabic ? -1 : 1
          }
        ]
      },
      textStyle: {
        transform: [
          {
            rotateY: isArabic ? "180deg" : "0deg"
          }
        ],
        textAlign: isArabic ? "right" : "left"
      }
    });
  };

  const handleDone = () => {
    navigation.goBack();
    params?.handleOnlineTransferCallBack &&
      params?.handleOnlineTransferCallBack();
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "معلومات التحويل البنكي" : "Online Transfer"}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={require("../../../assets/images/banks/card.png")}
          />
          <View style={styles.center}>
            <Text
              style={{
                ...styles.heading(isArabic),
                marginTop: isArabic ? 7 : 20,
                marginLeft: isArabic ? 0 : 3,
                marginRight: isArabic ? 3 : 0
              }}
            >
              {isArabic ? "رقم الحساب:" : "Account Number:"}
            </Text>
            <View style={styles.textWithIconWrapper(isArabic)}>
              <Text style={{ ...styles.description(isArabic), flex: 1 }}>
                2621085259940
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  handleCopy(
                    "2621085259940",
                    isArabic ? "نسخ رقم الحساب!" : "Copied Account Number!"
                  )
                }
              >
                <AntDesign size={25} name="copy1" color={theme} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                ...styles.heading(isArabic),
                marginTop: isArabic ? 7 : 20,
                marginLeft: isArabic ? 0 : 3,
                marginRight: isArabic ? 3 : 0
              }}
            >
              {isArabic ? "رقم البيان:" : "IBAN Number:"}
            </Text>
            <View style={styles.textWithIconWrapper(isArabic)}>
              <Text style={{ ...styles.description(isArabic), flex: 1 }}>
                SA4520000002621085259940
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  handleCopy(
                    "SA4520000002621085259940",
                    isArabic ? "نسخ رقم الايبان!" : "Copied IBAN Number!"
                  )
                }
              >
                <AntDesign size={25} name="copy1" color={theme} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                ...styles.heading(isArabic),
                marginTop: isArabic ? 7 : 20,
                marginLeft: isArabic ? 0 : 3,
                marginRight: isArabic ? 3 : 0
              }}
            >
              {isArabic ? "ملاحظة:" : "Note:"}
            </Text>
            <Text style={styles.description(isArabic)}>
              {isArabic
                ? "عند إجراء التحويل ، يرجى إرسال إيصال الدفع الخاص بك على رقم الواتساب التالي 966568042000 ، \n وسوف نؤكد الدفع الخاص بك."
                : "When you make transfer,  please send your payment slip on following whatsapp number 966568042000, \nWe will confirm your payment."}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn("100%")}
            onPress={handleDone}
          >
            <Text style={styles.btnText(isArabic)}>
              {isArabic ? "تم" : "DONE"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
