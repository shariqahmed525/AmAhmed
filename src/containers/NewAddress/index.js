import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Axios from "axios";
import styles from "./styles";
import Alert from "../../components/Alert";
import { theme } from "../../common/colors";
import Header from "../../components/Header";
import { ERROR_IMG } from "../../common/constants";
import { generateCode, removePreviousRoutes } from "../../common/functions";
import { useDispatch, useSelector } from "react-redux";
import { ANDROID, ARABIC, MAP_API_KEY } from "../../common/constants";
import {
  saveAddressAction,
  updateAddressAction
} from "../../redux/actions/user";

export default () => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    if (!params?.isEdit) {
      getAddressDetails();
    } else {
      setLoading(false);
    }
    if (params?.name) setName(params?.name);
    if (params?.address) setAddress(params?.address);
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const getAddressDetails = async () => {
    try {
      const lat = params?.coords?.latitude;
      const lng = params?.coords?.longitude;
      const { data } = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_API_KEY}`
      );
      if (
        data &&
        data.results &&
        data.results.length > 0 &&
        data.results[0] &&
        data.results[0].formatted_address
      ) {
        console.log(data.results[0], " res");
        setAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.log(error, " error in getting address");
    } finally {
      setLoading(false);
    }
  };

  const handleAddress = () => {
    const trimName = name.trim();
    const trimAddress = address.trim();
    if (!trimName) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء إدخال اسم العنوان"
          : "Please enter address name"
      });
      return;
    }
    if (!trimAddress) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء إدخال عنوانك الكامل"
          : "Please enter your complete address"
      });
      return;
    }
    const obj = {
      id: params?.isEdit && params?.id ? params?.id : generateCode(),
      name: trimName,
      city: params?.city,
      cityCode: params?.cityCode,
      address: trimAddress,
      ...params?.coords
    };
    if (params?.isEdit && params?.id) {
      dispatch(updateAddressAction(obj, params?.id));
    } else {
      dispatch(saveAddressAction(obj));
    }
    removePreviousRoutes(
      navigation,
      params?.fromCheckout ? "Checkout" : "MyAddresses",
      ["PinLocation", "NewAddress"]
    );
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "عنوان جديد" : "New Address"}
        />
        <Alert
          btnText={"OK"}
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          text={alert.alertText}
          onBtnPress={alertClose}
          title={alert.alertTitle}
        />
        {loading && (
          <View style={styles.activityLoader}>
            <ActivityIndicator size="large" color={theme} />
          </View>
        )}
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
            editable={false}
            spellCheck={false}
            autoCorrect={false}
            value={params?.city}
            style={styles.input(isArabic)}
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
            onPress={handleAddress}
            style={styles.btn("100%")}
          >
            {params?.isEdit ? (
              <Text style={styles.btnText(isArabic)}>
                {isArabic ? "تحديث" : "UPDATE"}
              </Text>
            ) : (
              <Text style={styles.btnText(isArabic)}>
                {isArabic ? "أضف" : "ADD"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
