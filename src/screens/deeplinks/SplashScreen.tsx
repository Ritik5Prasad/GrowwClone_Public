import { View, StyleSheet } from "react-native";
import React, { FC, useEffect } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import LottieView from "lottie-react-native";
import Anim from "../../assets/animations/loader.json";
import { token_storage } from "../../redux/storage";
import { jwtDecode } from "jwt-decode";
import { resetAndNavigate } from "../../utils/NavigationUtil";
import Toast from "react-native-toast-message";
import { refresh_tokens } from "../../redux/apiConfig";
import { useAppDispatch } from "../../redux/reduxHook";
import { CheckProfile } from "../../redux/actions/userAction";

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const dispatch = useAppDispatch();
  const tokenCheck = async () => {
    const app_access_token = token_storage.getString(
      "app_access_token"
    ) as string;
    const app_refresh_token = token_storage.getString(
      "app_refresh_token"
    ) as string;

    if (app_access_token) {
      const decodedAccessToken = jwtDecode<DecodedToken>(app_access_token);
      const decodedRefreshToken = jwtDecode<DecodedToken>(app_refresh_token);

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate("LoginScreen");
        Toast.show({
          type: "warningToast",
          props: { msg: "Session Expired, please login again" },
        });
        return;
      }

      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_tokens("app", true);
          await dispatch(CheckProfile());
        } catch (error) {
          console.log(error);
          Toast.show({
            type: "warningToast",
            props: { msg: "Session Expired, please login again" },
          });
          return;
        }
      } else {
        await dispatch(CheckProfile());
      }
      return;
    }

    resetAndNavigate("LoginScreen");
  };

  useEffect(() => {
    async function deeplinks() {
      await tokenCheck();
    }
    deeplinks();
  }, []);

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop
          speed={0.9}
          source={Anim}
          style={{ width: 250, height: 250 }}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
