import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  ActivityIndicator
} from "react-native";
import styles from "./styles";
import { lightTheme, theme } from "../../common/colors";
import { validateEmail } from "../../common/functions";
import Header from "../../components/Header";
import {
  ANDROID,
  ARABIC,
  ERROR_IMG,
  IOS,
  THUMB_IMG
} from "../../common/constants";
import { useSelector } from "react-redux";
import Alert from "../../components/Alert";

export default () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
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
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    const trimName = name.trim();
    const trimEmail = email.trim();
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
          : "Please enter valid email address"
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
    }, 2000);
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

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <Header
          back
          onBackPress={handleBack}
          title={isArabic ? "اتصل بنا" : "Contact Us"}
          titleAlign={isArabic ? "right" : "left"}
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
              placeholder={
                isArabic ? "أدخل عنوان بريدك الالكتروني" : "Enter email address"
              }
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
