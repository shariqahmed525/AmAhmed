import React, { useEffect } from "react";
import Route from "./src/routes";
import { Root } from "native-base";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import { store, persistor } from "./src/redux";
import { ANDROID } from "./src/common/constants";
import { backgroundColor } from "./src/common/colors";
import SplashScreen from "react-native-splash-screen";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";

let _isMounted = false;

export default () => {
  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("dark-content");
      ANDROID && StatusBar.setBackgroundColor(backgroundColor);
      SplashScreen.hide();
    }
  }, []);

  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <Root>
            <Route />
          </Root>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};
