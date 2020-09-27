import React, { useEffect } from "react";
import Route from "./src/routes";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import { store, persistor } from "./src/redux";
import { ANDROID } from "./src/common/constants";
import { backgroundColor } from "./src/common/colors";
import SplashScreen from "react-native-splash-screen";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";

export default () => {
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    ANDROID && StatusBar.setBackgroundColor(backgroundColor);
    SplashScreen.hide();
  }, []);

  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <Route />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};
