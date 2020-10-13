import React, { useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StatusBar, ScrollView } from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import { ANDROID, ARABIC } from "../../common/constants";
import Header from "../../components/Header";
import { useSelector } from "react-redux";

export default () => {
  const navigation = useNavigation();
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
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
          title={isArabic ? "معلومات عنا" : "About Us"}
          titleAlign={isArabic ? "right" : "left"}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => (
            <View
              key={i}
              style={{ width: "100%", paddingVertical: isArabic ? 7 : 12 }}
            >
              <Text style={styles.heading(isArabic)}>
                {isArabic ? "عنوان" : "Heading"}
              </Text>
              <Text style={styles.text(isArabic)}>
                {isArabic
                  ? "من السهل جدًا أن نلاحظ أن الهندسة المعمارية التي يتم إجراؤها تبدو وكأنها طاردة للعيان ، وخطورة شبيهة بالحيوية ، وألام قيسم بياتي."
                  : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab esse eum enim illo maiores architecto obcaecati tenetur incidunt eos quasi repellendus quam, nostrum porro sunt quidem, ullam quisquam beatae quod."}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
