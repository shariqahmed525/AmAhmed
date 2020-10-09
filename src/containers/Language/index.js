import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { Feather } from "../../common/icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import styles from "./styles";
import { theme } from "../../common/colors";
import { ANDROID, ARABIC, LANGUAGES } from "../../common/constants";
import Header from "../../components/Header";
import { onLanguageAction } from "../../redux/actions/app";
import { useDispatch, useSelector } from "react-redux";

const List = ({ text, selected, isArabic, source, ...rest }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.list(selected, isArabic)}
    {...rest}
  >
    <Image style={styles.listIcon} source={source} />
    <Text style={styles.listText(isArabic)}>{text}</Text>
    <View style={styles.listSelected}>
      {selected && <Feather size={20} color={theme} name="check-circle" />}
    </View>
  </TouchableOpacity>
);

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { language: code } = useSelector(state => state.app);
  const [language, setLanguage] = useState(code);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const handleListItem = async code => {
    setLanguage(code);
  };

  const handleContinue = () => {
    dispatch(onLanguageAction(language));
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          title={isArabic ? "لغة" : "Language"}
          titleAlign={isArabic ? "right" : "left"}
        />
        <View style={styles.mainContainer}>
          <View />
          <View style={styles.centerContainer}>
            <Text style={styles.heading(isArabic)}>
              {isArabic ? "اختر اللغة" : "CHOOSE LANGUAGE"}
            </Text>
            {LANGUAGES.map((v, i) => (
              <List
                key={i}
                source={v.icon}
                isArabic={isArabic}
                text={v.name(language)}
                selected={language === v.code}
                onPress={() => handleListItem(v.code)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.7}
            onPress={handleContinue}
          >
            <Text style={styles.btnText(isArabic)}>
              {isArabic ? "استمر" : "CONTINUE"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
