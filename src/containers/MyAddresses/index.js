import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import styles from "./styles";
import { lightTheme, theme } from "../../common/colors";
import Alert from "../../components/Alert";
import { ANDROID, ARABIC, BASE_URL, WIDTH } from "../../common/constants";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { Text as NativeBaseText } from "native-base";
import { EvilIcons, Feather } from "../../common/icons";
import { FAB } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";
import { deleteAddressAction } from "../../redux/actions/user";
import Axios from "axios";
import NoInternet from "../../components/NoInternet";

const ListItem = ({ isArabic, data, navigation, onDeletePress }) => (
  <View icon style={styles.listItem(isArabic)}>
    <View style={styles.listItemLeft(isArabic)}>
      <EvilIcons size={25} color={theme} name="location" />
    </View>
    <View style={styles.listItemCenter(isArabic)}>
      <NativeBaseText style={styles.listTitle(isArabic)}>
        {data.name}
      </NativeBaseText>
      <NativeBaseText style={styles.listSubTitle(isArabic)}>
        {data.city}
      </NativeBaseText>
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
        onPress={() => onDeletePress(data.id)}
      >
        <EvilIcons size={25} color={theme} name="trash" />
      </TouchableOpacity>
    </View>
  </View>
);

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [internet, setInternet] = useState(true);
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    app: { language },
    user: { addresses: storeAddresses }
  } = useSelector(state => state);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
    checkConnection();
  }, []);

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setLoading(false);
        setInternet(false);
      } else {
        setInternet(true);
        getAddresses();
      }
    });
  };

  const getAddresses = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get(`${BASE_URL}/Locations`);
      if (data && data.length > 0) {
        setCities([...data]);
        makeCities(data);
      }
      console.log(data);
    } catch (error) {
      console.log(error, " error in getting cities");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirm = id => {
    setAlert({
      alert: true,
      error: false,
      btnPress: () => onDeletePress(id),
      alertText: isArabic
        ? "هل أنت متأكد من حذف العنوان؟"
        : "Are you sure to delete the address?"
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

  const onDeletePress = id => {
    dispatch(deleteAddressAction(id));
    alertClose();
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
          btnText={isArabic ? "حسنا" : "OK"}
          cancelText={isArabic ? "إلغاء" : "Cancel"}
          onBtnPress={alert.btnPress || alertClose}
        />
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
          <View style={styles.listWrapper}>
            {addresses.map((v, i) => (
              <ListItem
                key={i}
                data={v}
                isArabic={isArabic}
                navigation={navigation}
                onDeletePress={handleConfirm}
              />
            ))}
          </View>
        ) : (
          <View style={styles.loaderWrapper}>
            <LottieView
              loop
              autoPlay
              style={{ width: WIDTH * 0.75 }}
              source={require("../../../assets/animations/notfoundaddress.json")}
            />
            <Text style={styles.emptyText(isArabic)}>
              {isArabic ? "لم يتم العثور على نتائج" : "No results found"}
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
