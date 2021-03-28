import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Linking,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  IOS,
  ARABIC,
  ANDROID,
  BASE_URL,
  ERROR_IMG,
  THUMB_IMG,
  PLACEHOLDER_TEXT_COLOR
} from "../../common/constants";
import Axios from "axios";
import styles from "./styles";
import { useSelector } from "react-redux";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import { lightTheme, theme } from "../../common/colors";
import { validateEmail, validatePhone } from "../../common/functions";
import { MaterialCommunityIcons } from "../../common/icons";

let _isMounted = false;

export default () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);
  const navigation = useNavigation();
  const [alert, setAlert] = useState({
    alert: false,
    error: false,
    alertImg: "",
    alertText: "",
    alertTitle: ""
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
    }
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    const trimName = name.trim();
    const trimEmail = email.trim();
    const trimPhone = phone.trim();
    const trimSubject = subject.trim();
    const trimMessage = message.trim();
    if (!trimName) {
      nameRef.current.focus();
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء ادخل اسمك الكامل"
          : "Please enter your full name"
      });
      return;
    }
    if (!trimEmail) {
      emailRef.current.focus();
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء أدخل عنوان بريدك الالكتروني"
          : "Please enter your email address"
      });
      return;
    }
    if (trimEmail && !validateEmail(trimEmail)) {
      emailRef.current.focus();
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء أدخل عنوان بريد إلكتروني صالح"
          : "Please enter a valid email address"
      });
      return;
    }
    if (!trimPhone) {
      phoneRef.current.focus();
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء إدخال رقم الهاتف الخاص بك"
          : "Please enter your phone number"
      });
      return;
    }
    if (trimPhone && !validatePhone(trimPhone)) {
      emailRef.current.focus();
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء إدخال رقم هاتف صالح"
          : "Please enter a valid phone number"
      });
      return;
    }
    if (!trimSubject) {
      subjectRef.current.focus();
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic ? "الرجاء أدخل الموضوع" : "Please enter subject"
      });
      return;
    }
    if (!trimMessage) {
      messageRef.current.focus();
      setAlert({
        alert: true,
        error: true,
        alertImg: ERROR_IMG,
        alertTitle: isArabic ? "خطأ" : "Error",
        alertText: isArabic
          ? "الرجاء أدخل الرسالة ما تريد"
          : "Please enter message what you want"
      });
      return;
    }
    makeRequest();
  };

  const makeRequest = async () => {
    const trimName = name.trim();
    const trimEmail = email.trim();
    const trimPhone = phone.trim();
    const trimSubject = subject.trim();
    const trimMessage = message.trim();
    try {
      setLoading(true);
      const obj = {
        Name: trimName,
        Email: trimEmail,
        Phone: trimPhone,
        Subject: trimSubject,
        Message: trimMessage
      };
      await Axios.post(`${BASE_URL}/ContactUs/submit`, obj);
      setAlert({
        alert: true,
        error: false,
        btnPress: btnPress,
        alertImg: THUMB_IMG,
        alertTitle: isArabic ? "أرسلت" : "SENT",
        alertText: isArabic
          ? "تم متابعة طلبك وسنقوم بالرد عليك في أقرب وقت ممكن"
          : "Your request has been proceed we'll response you as soon as possible"
      });
    } catch (error) {
      console.log(error, " error in contact us");
    } finally {
      setLoading(false);
    }
  };

  const btnPress = () => {
    navigation.goBack();
    navigation.navigate("Home");
  };

  const alertClose = () =>
    setAlert({
      alert: false,
      error: false,
      alertImg: "",
      alertText: "",
      alertTitle: ""
    });

  const handleNumber = () => {
    Linking.openURL("tel:0566951999");
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          titleAlign={isArabic ? "right" : "left"}
          title={isArabic ? "اتصل بنا" : "Contact Us"}
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
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.textWrapper(isArabic)}>
            <View style={styles.iconWrapper(isArabic)}>
              <View style={styles.rotateIcon(isArabic)}>
                <MaterialCommunityIcons size={30} name="phone" color={theme} />
              </View>
              <Text style={styles.text(isArabic)}>
                {isArabic ? " الاتصال بنا:" : "Call us at: "}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={handleNumber}>
              <Text style={styles.link(isArabic)}>
                0566951999
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrapper(isArabic)}>
            <Text style={styles.heading(isArabic)}>
              {isArabic ? "عنوان" : "Full Name"}
            </Text>
            <TextInput
              value={name}
              ref={nameRef}
              editable={!loading}
              spellCheck={false}
              autoCorrect={false}
              keyboardType="default"
              style={styles.input(isArabic)}
              onChangeText={text => setName(text)}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              placeholder={isArabic ? "أدخل الاسم الكامل" : "Enter full name"}
            />
          </View>
          <View style={styles.inputWrapper(isArabic)}>
            <Text style={styles.heading(isArabic)}>
              {isArabic ? "البريد الإلكتروني" : "Email"}
            </Text>
            <TextInput
              value={email}
              ref={emailRef}
              editable={!loading}
              spellCheck={false}
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.input(isArabic)}
              onChangeText={text => setEmail(text)}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              placeholder={
                isArabic ? "أدخل عنوان بريدك الالكتروني" : "Enter email address"
              }
            />
          </View>
          <View style={styles.inputWrapper(isArabic)}>
            <Text style={styles.heading(isArabic)}>
              {isArabic ? "رقم الهاتف" : "Phone Number"}
            </Text>
            <TextInput
              value={phone}
              maxLength={9}
              ref={phoneRef}
              editable={!loading}
              spellCheck={false}
              autoCorrect={false}
              keyboardType="number-pad"
              placeholder={"501234567"}
              style={styles.input(isArabic)}
              onChangeText={text => setPhone(text)}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            />
          </View>
          <View style={styles.inputWrapper(isArabic)}>
            <Text style={styles.heading(isArabic)}>
              {isArabic ? "موضوع" : "Subject"}
            </Text>
            <TextInput
              value={subject}
              ref={subjectRef}
              editable={!loading}
              spellCheck={false}
              autoCorrect={false}
              keyboardType="default"
              style={styles.input(isArabic)}
              onChangeText={text => setSubject(text)}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              placeholder={isArabic ? "أدخل الموضوع" : "Enter subject"}
            />
          </View>
          <View style={styles.inputWrapper(isArabic)}>
            <Text style={styles.heading(isArabic)}>
              {isArabic ? "رسالة" : "Message"}
            </Text>
            <TextInput
              multiline
              value={message}
              ref={messageRef}
              editable={!loading}
              numberOfLines={12}
              spellCheck={false}
              autoCorrect={false}
              keyboardType="default"
              style={{
                ...styles.input(isArabic),
                textAlignVertical: "top",
                paddingTop: 15,
                height: IOS ? 200 : undefined
              }}
              onChangeText={text => setMessage(text)}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              placeholder={
                isArabic ? "اكتب الرسالة هنا ..." : "Write message here..."
              }
            />
          </View>
          <TouchableOpacity
            disabled={loading}
            activeOpacity={0.7}
            onPress={handleSubmit}
            style={styles.btn(isArabic)}
          >
            {loading ? (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator size="small" color="#fff" />
              </View>
            ) : (
              <Text style={styles.btnText(isArabic)}>
                {isArabic ? "إرسال" : "SUBMIT"}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
