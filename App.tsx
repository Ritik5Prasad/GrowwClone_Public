import "./src/sheets/sheet";
import React from "react";
import Navigation from "./src/navigation/Navigation";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast from "react-native-toast-message";
import { toastConfig } from "./ToastConfig";
import { persistor, store } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

GoogleSignin.configure({
  webClientId:
    "YOUR_WEB_CLIENT_ID",
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId:
    "YOUR_WEB_CLIENT_ID",
});

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
      <Toast
        visibilityTime={2500}
        config={toastConfig}
        bottomOffset={0}
        swipeable={false}
        position="bottom"
      />
    </GestureHandlerRootView>
  );
};

export default App;
