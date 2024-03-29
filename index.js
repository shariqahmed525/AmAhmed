import "react-native-gesture-handler";
import App from "./App";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background!", remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

// AmAhmed is an e-commerce application to purchase things online easily.

// تطبيق عم احمد لبيع الأغنام واللحوم والفواكة والخضروات الطازجة عن طريق الانترنت.