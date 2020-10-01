import React, { useState, useEffect } from "react";
import styles from "./styles";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-navigation";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ImageButton from "../../../components/ImageButton";
import OnBoardHeader from "../../../components/OnBoardHeader";
import {
  CommonActions,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { ARABIC, CATEGORIES, ENGLISH } from "../../../common/constants";
import { onCategoryAction, onLanguageAction } from "../../../redux/actions/app";
import Header from "../../../components/Header";
import { backgroundColor, theme } from "../../../common/colors";

export default () => {
  const { params } = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(!params?.fromHome);
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    if (!params?.fromHome) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  const handleToggleLanguage = () => {
    dispatch(onLanguageAction(isArabic ? ENGLISH : ARABIC));
  };

  const handleListItem = code => {
    dispatch(onCategoryAction(code));
    if (params?.fromHome) {
      handleBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainStack" }]
        })
      );
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: params?.fromHome ? theme : backgroundColor
      }}
      forceInset={{ bottom: "never" }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.mainContainer}>
          {params?.fromHome ? (
            <Header
              back
              onBackPress={handleBack}
              title={isArabic ? "الفئة" : "Category"}
              titleAlign={isArabic ? "right" : "left"}
            />
          ) : (
            <OnBoardHeader
              back
              isArabic={isArabic}
              showLanguageToggle={false}
              onPress={handleToggleLanguage}
            />
          )}
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
                {isArabic ? "اختر الفئة" : "Choose Category"}
              </Text>
              {CATEGORIES.map((v, i) => (
                <ImageButton
                  key={i}
                  isArabic={isArabic}
                  source={v.icon}
                  onPress={() => handleListItem(v.code)}
                  text={`${v.name(isArabic)}${isArabic ? "؟" : "?"}`}
                  primaryText={
                    isArabic ? "عما تبحث" : "What are you looking for"
                  }
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
