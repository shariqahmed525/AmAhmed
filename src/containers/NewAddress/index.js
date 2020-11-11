import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  onReCallCheckout,
  onReCallMyAddresses,
  onUpdateAddressAction
} from "../../redux/actions/user";
import Axios from "axios";
import styles from "./styles";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import NoInternet from "../../components/NoInternet";
import NetInfo from "@react-native-community/netinfo";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { theme, lightTheme } from "../../common/colors";
import { removePreviousRoutes } from "../../common/functions";
import { ANDROID, ARABIC, MAP_API_KEY } from "../../common/constants";
import { BASE_URL, ERROR_IMG, INFO_IMG } from "../../common/constants";

let _isMounted = false;

export default ({ route: { params } }) => {
  const dispatch = useDispatch();
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
  const [internet, setInternet] = useState(true);
  const {
    app: { language },
    user: { userData }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      if (!params?.isEdit) {
        getAddressDetails();
      } else {
        setLoading(false);
      }
      if (params?.area) setName(params?.area);
      if (params?.address) setAddress(params?.address);
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
    }
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

  const handleAddressUpdate = async () => {
    const trimName = name.trim();
    const trimAddress = address.trim();
    const cityId = params?.city?.id;
    const phone = userData?.phone;
    const id = params?.id;
    if (!cityId) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "يجب أن يكون اسم المدينة مطلوبًا"
          : "City name must be required"
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
    if (
      !phone ||
      !id ||
      !params?.coords?.latitude ||
      !params?.coords?.longitude
    ) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
          : "Sorry, something went wrong. Please try again!"
      });
      return;
    }
    try {
      setLoading(true);
      await Axios.post(`${BASE_URL}/UserAddresses/update`, {
        id,
        area: trimName || (isArabic ? "لا شيء" : "None"),
        mobileNo: phone,
        locationID: cityId,
        address: trimAddress,
        latitude: params?.coords?.latitude,
        longitude: params?.coords?.longitude
      });
      const obj = { ...params };
      delete params.city;
      delete params.coords;
      delete params.isEdit;
      dispatch(onUpdateAddressAction(obj, params?.id));
      dispatch(onReCallMyAddresses());
      setAlert({
        alert: true,
        error: false,
        alertImg: INFO_IMG,
        btnPress: () => navigate(),
        alertText: isArabic
          ? "تمت تحديث العنوان بنجاح!"
          : "Address updated successfully!"
      });
    } catch (error) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
          : "Sorry, something went wrong. Please try again!"
      });
      console.log(error, " error in add address");
    } finally {
      setLoading(false);
    }
  };

  const checkConnection = func => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setLoading(false);
        setInternet(false);
      } else {
        setInternet(true);
        func();
      }
    });
  };

  const handleAddressAdd = async () => {
    const trimName = name.trim();
    const trimAddress = address.trim();
    const cityId = params?.city?.id;
    const phone = userData?.phone;
    if (!cityId) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "يجب أن يكون اسم المدينة مطلوبًا"
          : "City name must be required"
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
    if (!phone || !params?.coords?.latitude || !params?.coords?.longitude) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
          : "Sorry, something went wrong. Please try again!"
      });
      return;
    }
    try {
      setLoading(true);
      await Axios.post(`${BASE_URL}/UserAddresses/register`, {
        area: trimName || (isArabic ? "لا شيء" : "None"),
        mobileNo: phone,
        locationID: cityId,
        address: trimAddress,
        latitude: params?.coords?.latitude,
        longitude: params?.coords?.longitude
      });
      if (params?.fromCheckout) {
        dispatch(onReCallCheckout());
      } else {
        dispatch(onReCallMyAddresses());
      }
      setAlert({
        alert: true,
        error: false,
        alertImg: INFO_IMG,
        btnPress: () => navigate(),
        alertText: isArabic
          ? "تمت إضافة العنوان بنجاح!"
          : "Address added successfully!"
      });
    } catch (error) {
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
          : "Sorry, something went wrong. Please try again!"
      });
      console.log(error, " error in add address");
    } finally {
      setLoading(false);
    }
  };

  const navigate = () => {
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

  const handleRetry = () => {
    checkConnection();
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={
            isArabic
              ? params?.textAr
                ? params?.textAr
                : params?.isEdit
                ? "تحديث العنوان"
                : "موقع جديد"
              : params?.textEn
              ? params?.textEn
              : params?.isEdit
              ? "Update Address"
              : "New Address"
          }
        />
        <Alert
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          btnColor={lightTheme}
          text={alert.alertText}
          title={alert.alertTitle}
          btnText={isArabic ? "حسنا" : "OK"}
          onBtnPress={alert.btnPress || alertClose}
        />
        {loading && (
          <View style={styles.activityLoader}>
            <ActivityIndicator size="large" color={theme} />
          </View>
        )}
        {!internet ? (
          <NoInternet isArabic={isArabic} onPress={handleRetry} />
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.mainContainer}>
              <Text style={styles.heading(isArabic)}>
                {isArabic ? "الاسم (اختياري)" : "Name (Optional)"}
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
                style={styles.input(isArabic)}
                value={isArabic ? params?.city?.nameAr : params?.city?.nameEn}
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
                style={styles.btn("100%")}
                onPress={() =>
                  checkConnection(
                    params?.isEdit ? handleAddressUpdate : handleAddressAdd
                  )
                }
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
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
