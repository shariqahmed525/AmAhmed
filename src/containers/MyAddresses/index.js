import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  ARABIC,
  ANDROID,
  BASE_URL,
  INFO_IMG,
  ERROR_IMG
} from "../../common/constants";
import Axios from "axios";
import styles from "./styles";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import LottieView from "lottie-react-native";
import NoInternet from "../../components/NoInternet";
import { Text as NativeBaseText } from "native-base";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { lightTheme, theme } from "../../common/colors";
import { EvilIcons, Feather } from "../../common/icons";
import { ActivityIndicator, FAB } from "react-native-paper";
import {
  onAddressesAction,
  onDeleteAddressAction,
  onSelectedAddressAction
} from "../../redux/actions/user";

let _isMounted = false;

const ListItem = ({ isArabic, data, cities, navigation, onDeletePress }) => {
  const city = data.locationID && cities.find(o => o.id === data.locationID);
  return (
    <TouchableOpacity
      onLongPress={() => onDeletePress(data)}
      activeOpacity={1}
      style={styles.listItem(isArabic)}
    >
      <View style={styles.listItemLeft(isArabic)}>
        <EvilIcons size={25} color={theme} name="location" />
      </View>
      <View style={styles.listItemCenter(isArabic)}>
        <NativeBaseText style={styles.listTitle(isArabic)}>
          {data.area}
        </NativeBaseText>
        {data.locationID !== null && (city?.nameEn || city?.nameAr) && (
          <NativeBaseText style={styles.listSubTitle(isArabic)}>
            {isArabic ? city?.nameAr : city?.nameEn}
          </NativeBaseText>
        )}
        <NativeBaseText
          note
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.noteText(isArabic)}
        >
          {data.address}
        </NativeBaseText>
      </View>
      <View style={styles.listItemRight(isArabic)}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("PinLocation", {
              ...data,
              isEdit: true
            });
          }}
          style={{
            transform: [
              {
                rotateY: isArabic ? "180deg" : "0deg"
              }
            ]
          }}
        >
          <Feather
            size={18}
            color={theme}
            name="edit-2"
            style={{ paddingHorizontal: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onDeletePress(data)}
        >
          <EvilIcons size={25} color={theme} name="trash" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [internet, setInternet] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: "",
    cancelText: ""
  });
  const {
    app: { language, cities },
    user: { userData, selectedAddress, random }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
    }
  }, []);

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      checkConnection(getAddresses);
    }
  }, [random]);

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

  const getAddresses = async () => {
    try {
      setLoading(true);
      const phone = userData?.phone;
      const { data } = await Axios.get(
        `${BASE_URL}/UserAddresses/get/mob/${phone}`
      );
      if (data && data.length > 0) {
        setAddresses([...data]);
        dispatch(onAddressesAction(data));
        checkSelectedAddressExists(data);
      }
      console.log(data);
    } catch (error) {
      console.log(error, " error in getting cities");
    } finally {
      setLoading(false);
    }
  };

  const checkSelectedAddressExists = data => {
    if (selectedAddress && selectedAddress.id) {
      const find = data.find(o => o.id === selectedAddress.id);
      if (!find) {
        dispatch(onSelectedAddressAction(null));
      }
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirm = obj => {
    setAlert({
      alert: true,
      error: false,
      cancelText: isArabic ? "إلغاء" : "Cancel",
      btnPress: () => onDeletePress(obj),
      alertText: isArabic
        ? `هل أنت متأكد من حذف العنوان ${obj.area}؟`
        : `Are you sure to delete ${obj.area}'s address?`
    });
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  const onDeletePress = obj => {
    checkConnection(() => deleteAddress(obj));
    alertClose();
  };

  const deleteAddress = async obj => {
    try {
      setDeleteLoading(true);
      await Axios.get(`${BASE_URL}/UserAddresses/delete/${obj.id}`);
      setAddresses(res => [...res.filter(o => o.id !== obj.id)]);
      dispatch(onDeleteAddressAction(obj.id));
      setAlert({
        alert: true,
        error: false,
        alertImg: INFO_IMG,
        alertText: isArabic
          ? "تم حذف العنوان بنجاح!"
          : "Address deleted successfully!"
      });
    } catch (error) {
      console.log(error, " error in deleting address");
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "عذرا، هناك خطأ ما. حاول مرة اخرى!"
          : "Sorry, something went wrong. Please try again!"
      });
    } finally {
      setDeleteLoading(false);
    }
  };

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
          title={isArabic ? "عناويني" : "My Addresses"}
        />
        <Alert
          error={alert.error}
          alert={alert.alert}
          img={alert.alertImg}
          btnColor={lightTheme}
          text={alert.alertText}
          title={alert.alertTitle}
          onCancelPress={alertClose}
          cancelText={alert.cancelText}
          btnText={isArabic ? "حسنا" : "OK"}
          onBtnPress={alert.btnPress || alertClose}
        />
        {deleteLoading && (
          <View style={styles.activityLoader}>
            <ActivityIndicator size="large" color={theme} />
          </View>
        )}
        {internet && !loading && (
          <FAB
            icon="plus"
            color="#fff"
            style={styles.fab}
            onPress={() => navigation.navigate("PinLocation")}
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
              source={require("../../../assets/animations/loader.json")}
            />
          </View>
        ) : addresses && addresses.length > 0 ? (
          <ScrollView contentContainerStyle={styles.listWrapper}>
            {addresses.map((v, i) => (
              <ListItem
                key={i}
                data={v}
                cities={cities}
                isArabic={isArabic}
                navigation={navigation}
                onDeletePress={handleConfirm}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.loaderWrapper}>
            <LottieView
              loop
              autoPlay
              style={{ width: 200, height: 200 }}
              source={require("../../../assets/animations/notfoundaddress.json")}
            />
            <Text style={styles.emptyText(isArabic)}>
              {isArabic ? "لم يتم العثور على نتائج" : "No Results Found"}
            </Text>
            <Text style={styles.emptySubText(isArabic)}>
              {isArabic
                ? "لم تقم بإضافة أي عنوان"
                : "You didn't add any address"}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
