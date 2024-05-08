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
    "320736144886-bh8rfr3gdudlcm5h55v9g3bujlhffj46.apps.googleusercontent.com",
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId:
    "320736144886-bhtrdr693ecb53ddmim0chajgsr5b921.apps.googleusercontent.com",
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
