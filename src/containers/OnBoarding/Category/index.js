import React, { useState, useEffect } from "react";
import styles from "./styles";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-navigation";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ImageButton from "../../../components/ImageButton";
import OnBoardHeader from "../../../components/OnBoardHeader";
import {
  useRoute,
  CommonActions,
  useNavigation
} from "@react-navigation/native";
import Header from "../../../components/Header";
import NetInfo from "@react-native-community/netinfo";
import { ARABIC, BASE_URL } from "../../../common/constants";
import { onSelectedCategoryAction } from "../../../redux/actions/app";
import { backgroundColor, theme } from "../../../common/colors";
import Axios from "axios";
import NoInternet from "../../../components/NoInternet";
import NotFound from "../../../components/NotFound";

export default () => {
  const { params } = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [alert, setAlert] = useState({
    alert: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [internet, setInternet] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(!params?.fromHome);
  const { language, selectedCity, selectedCategory } = useSelector(
    state => state.app
  );
  const isArabic = language === ARABIC;

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setLoading(false);
        setInternet(false);
      } else {
        setInternet(true);
        getCategories();
      }
    });
  };

  const getCategories = async () => {
    if (!selectedCity) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const { data } = await Axios.get(
        `${BASE_URL}/Categories/loc/${selectedCity.id}`
      );
      if (data && data.length > 0) {
        setCategories([...data]);
        checkCategory(data);
      }
      console.log(data);
    } catch (error) {
      console.log(error, " error in getting cities");
    } finally {
      setLoading(false);
    }
  };

  const checkCategory = data => {
    if (selectedCategory && selectedCategory.id) {
      const find = data.find(o => o.id === selectedCategory.id);
      if (!find) {
        dispatch(onSelectedCategoryAction(null));
      }
    }
  };

  const handleListItem = cat => {
    if (!selectedCategory || selectedCategory.id !== cat.id) {
      dispatch(onSelectedCategoryAction(cat));
    }
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

  const handleRetry = () => {
    checkConnection();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: params?.fromHome ? theme : backgroundColor
      }}
      forceInset={{ bottom: "never" }}
    >
      <View style={styles.wrapper}>
        {params?.fromHome && (
          <Header
            back
            onBackPress={handleBack}
            title={isArabic ? "الفئة" : "Category"}
            titleAlign={isArabic ? "right" : "left"}
          />
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {!params?.fromHome && (
            <OnBoardHeader
              back
              isArabic={isArabic}
              showLanguageToggle={false}
            />
          )}
          {!internet ? (
            <NoInternet isArabic={isArabic} onPress={handleRetry} />
          ) : loading ? (
            <View style={styles.loaderWrapper}>
              <LottieView
                loop
                autoPlay
                style={styles.loader}
                source={require("../../../../assets/animations/loader.json")}
              />
            </View>
          ) : categories && categories.length > 0 ? (
            <View style={styles.centerContainer}>
              <Text style={styles.heading(isArabic)}>
                {isArabic ? "اختر مدينتك، من فضلك" : "Choose your city, please"}
              </Text>
              {categories.map((v, i) => (
                <ImageButton
                  isCity
                  key={i}
                  isArabic={isArabic}
                  source={{ uri: v.pictureUrl }}
                  text={`${isArabic ? v.nameAr : v.nameEn}${
                    isArabic ? "؟" : "?"
                  }`}
                  onPress={() => handleListItem(v)}
                  selected={v.id === selectedCategory?.id}
                  primaryText={
                    isArabic ? "عما تبحث" : "What are you looking for"
                  }
                />
              ))}
            </View>
          ) : (
            <NotFound
              isArabic={isArabic}
              text={isArabic ? "لم يتم العثور على نتائج" : "No results found"}
              secondaryText={
                isArabic
                  ? "عذرا ، لم نتمكن من العثور على أي بيانات"
                  : "Sorry, we couldn't find any بيانات"
              }
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
