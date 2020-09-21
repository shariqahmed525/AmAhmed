import React, { useState, useEffect } from "react";
import styles from "./styles";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-navigation";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageButton from "../../../components/ImageButton";
import OnBoardHeader from "../../../components/OnBoardHeader";
import { ARABIC, CITIES, ENGLISH } from "../../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { onCityAction, onLanguageAction } from "../../../redux/actions/app";

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const handleToggleLanguage = () => {
    dispatch(onLanguageAction(isArabic ? ENGLISH : ARABIC));
  };

  const handleListItem = code => {
    dispatch(onCityAction(code));
    navigation.navigate("OnBoardingCategory");
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.mainContainer}>
          <OnBoardHeader isArabic={isArabic} onPress={handleToggleLanguage} />
          {loading ? (
            <View style={styles.loaderWrapper}>
              <LottieView
                loop
                autoPlay
                style={styles.loader}
                source={require("../../../../assets/animations/loader.json")}
              />
            </View>
          ) : (
            <View style={styles.centerContainer}>
              <Text style={styles.heading(isArabic)}>
                {isArabic ? "اختر مدينتك، من فضلك" : "Choose your city, please"}
              </Text>
              {CITIES.map((v, i) => (
                <ImageButton
                  isCity
                  key={i}
                  source={v.icon}
                  isArabic={isArabic}
                  onPress={() => handleListItem(v.code)}
                  text={`${v.name(isArabic)}${isArabic ? "؟" : "?"}`}
                  primaryText={isArabic ? "هل انت من" : "Are you from"}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
