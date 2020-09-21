import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { Feather } from "../../../common/icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { store } from "../../../redux";
import styles from "./styles";
import { theme } from "../../../common/colors";
import { ARABIC, LANGUAGES } from "../../../common/constants";
import Header from "../../../components/Header";

const List = ({ text, selected, code, source, ...rest }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.list(selected, code)}
    {...rest}
  >
    <Image style={styles.listIcon} source={source} />
    <Text style={styles.listText(code)}>{text}</Text>
    <View style={styles.listSelected}>
      {selected && <Feather size={20} color={theme} name="check-circle" />}
    </View>
  </TouchableOpacity>
);

export default () => {
  const navigation = useNavigation();
  const [language, setLanguage] = useState();

  useEffect(() => {
    const {
      app: { language }
    } = store.getState();
    setLanguage(language);
  }, []);

  const handleListItem = async code => {
    setLanguage(code);
  };

  const handleContinue = () => {
    navigation.goBack();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header transparent back onBackPress={handleBack} />
        <View style={styles.mainContainer}>
          <View>
            <Image
              style={styles.logo}
              source={require("../../../../assets/images/logo.png")}
            />
          </View>
          <View style={styles.centerContainer}>
            <Text style={styles.heading(language)}>
              {language === ARABIC ? "اختر اللغة" : "CHOOSE LANGUAGE"}
            </Text>
            {LANGUAGES.map((v, i) => (
              <List
                key={i}
                source={v.icon}
                code={language}
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
            <Text style={styles.btnText(language)}>
              {language === ARABIC ? "استمر" : "CONTINUE"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
