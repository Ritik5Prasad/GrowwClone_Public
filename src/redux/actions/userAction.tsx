import axios from "axios";
import {
  CHECK_EMAIL,
  EMAIL_LOGIN,
  REGISTER,
  SEND_OTP,
  VERIFY_OTP,
} from "../API";
import { navigate, resetAndNavigate } from "../../utils/NavigationUtil";
import { token_storage } from "../storage";
import { appAxios } from "../apiConfig";
import Toast from "react-native-toast-message";
import { setUser } from "../reducers/userSlice";
import { deleteBiometricPublicKey } from "../../utils/BiometricsUtils";

interface CheckEmail {
  email: string;
}
interface EmailLogin {
  email: string;
  password: string;
}
interface Profile {
  name: string;
  gender: string;
  date_of_birth: string;
}
interface VerifyOTP {
  otp_type: string;
  email: string;
  otp: string;
  data?: string | null;
}
interface SendOTP {
  otp_type: string;
  email: string;
}
interface Register {
  email: string;
  password: string;
  register_token: string;
}
interface LoginPin {
  login_pin: string;
}

export const CheckEmail = (data: CheckEmail) => async (dispatch: any) => {
  try {
    const res = await axios.post(CHECK_EMAIL, data);
    console.log("CHECK EMAIL-->", res.data);
    let path = res.data.isExist ? "EmailPasswordScreen" : "EmailOtpScreen";
    navigate(path, { email: data.email });
  } catch (error) {
    Toast.show({
      type: "warningToast",
      props: {
        msg: "We are not able to connect to our server, please try again later.",
      },
    });
    console.log("CHECK EMAIL ERROR-->", error);
  }
};

export const EmailLogin = (data: EmailLogin) => async (dispatch: any) => {
  try {
    const res = await axios.post(EMAIL_LOGIN, data);
    console.log("EMAIL LOGIN-->", res.data);
    token_storage.set("app_access_token", res.data.tokens.access_token);
    token_storage.set("app_refresh_token", res.data.tokens.refresh_token);
    await dispatch(setUser(res.data.user));
    const { userId, email, login_pin_exist, phone_exist, name } = res.data.user;
    if (!phone_exist) {
      resetAndNavigate("PhoneScreen");
    } else if (!name) {
      resetAndNavigate("PersonalDetailScreen");
    } else if (!login_pin_exist) {
      resetAndNavigate("PinScreen");
    } else {
      resetAndNavigate("AuthVerificationScreen");
    }
  } catch (error: any) {
    Toast.show({
      type: "normalToast",
      props: {
        msg: error?.response?.data?.msg,
      },
    });
    console.log("EMAIL LOGIN ERROR-->", error);
  }
};

export const VerifyOTP = (data: VerifyOTP) => async (dispatch: any) => {
  try {
    console.log(data);
    const res = await axios.post(VERIFY_OTP, data);
    console.log("VERIFY OTP ->", res.data);

    if (data.otp_type == "phone") {
      resetAndNavigate("PersonalDetailScreen");
    }
    if (data.otp_type == "email") {
      navigate("RegisterScreen", {
        email: data.email,
        register_token: res.data?.register_token,
      });
    }
    if (data.otp_type == "reset_password") {
      Toast.show({
        type: "successToast",
        props: {
          msg: "Password reset successfully! Login Again",
        },
      });

      resetAndNavigate("LoginScreen");
    }
    if (data.otp_type == "reset_pin") {
      Toast.show({
        type: "successToast",
        props: {
          msg: "PIN Reset successfully! Login Again",
        },
      });

      resetAndNavigate("AuthVerificationScreen");
    }
  } catch (error: any) {
    Toast.show({
      type: "normalToast",
      props: {
        msg: error?.response?.data?.msg,
      },
    });
    console.log("VERIFY OTP ->", error);
  }
};

export const SendOTP = (data: SendOTP) => async (dispatch: any) => {
  try {
    console.log(data);
    const res = await axios.post(SEND_OTP, data);
    console.log("SEND OTP ->", res.data);

    Toast.show({
      type: "normalToast",
      props: {
        msg: res?.data?.msg,
      },
    });
  } catch (error: any) {
    Toast.show({
      type: "normalToast",
      props: {
        msg: error?.response?.data?.msg,
      },
    });
    console.log("SEND OTP ->", error);
  }
};

export const Register = (data: Register) => async (dispatch: any) => {
  try {
    const res = await axios.post(REGISTER, data);
    token_storage.set("app_access_token", res.data.tokens.access_token);
    token_storage.set("app_refresh_token", res.data.tokens.refresh_token);
    const user = await dispatch(setUser(res.data.user));
    resetAndNavigate("PhoneScreen");
    console.log("REGISTER ->", res.data);
  } catch (error: any) {
    Toast.show({
      type: "normalToast",
      props: {
        msg: error?.response?.data?.msg,
      },
    });
    console.log("REGISTER ->", error);
  }
};

export const UpdateProfile = (data: Profile) => async (dispatch: any) => {
  try {
    const res = await appAxios.put("/auth/profile", data);
    console.log("PROFILE ->", res.data);
    resetAndNavigate("PinScreen");
  } catch (error: any) {
    console.log("PROFILE ->", error);
  }
};

export const SetLoginPin = (data: LoginPin) => async (dispatch: any) => {
  try {
    const res = await appAxios.post("/auth/set-pin", data);
    console.log(res.data);
    token_storage.set(
      "socket_access_token",
      res.data.socket_tokens.socket_access_token
    );
    token_storage.set(
      "socket_refresh_token",
      res.data.socket_tokens.socket_refresh_token
    );
    resetAndNavigate("AccountProtectedScreen");
  } catch (error: any) {
    console.log("SET LOGIN PIN ->", error);
  }
};

export const VerifyPin = (data: LoginPin) => async (dispatch: any) => {
  try {
    const res = await appAxios.post("/auth/verify-pin", data);
    console.log(res.data);
    token_storage.set(
      "socket_access_token",
      res.data.socket_tokens.socket_access_token
    );
    token_storage.set(
      "socket_refresh_token",
      res.data.socket_tokens.socket_refresh_token
    );
    return { msg: "Success", result: true };
  } catch (error: any) {
    console.log("VERIFY PIN ->", error);
    return { msg: error?.response?.data?.msg, result: false };
  }
};

export const CheckProfile = () => async (dispatch: any) => {
  try {
    const res = await appAxios.get("/auth/profile");
    const { userId, email, login_pin_exist, phone_exist, name } = res.data;
    await dispatch(setUser(res.data));
    if (!phone_exist) {
      resetAndNavigate("PhoneScreen");
    } else if (!name) {
      resetAndNavigate("PersonalDetailScreen");
    } else if (!login_pin_exist) {
      resetAndNavigate("PinScreen");
    } else {
      resetAndNavigate("AuthVerificationScreen");
    }
  } catch (error: any) {
    console.log("PROFILE ->", error);
  }
};

export const Logout = () => async (dispatch: any) => {
  try {
    const res = await appAxios.post("/auth/logout");
    token_storage.clearAll();
    resetAndNavigate("LoginScreen");
    await deleteBiometricPublicKey();
  } catch (error: any) {
    token_storage.clearAll();
    resetAndNavigate("LoginScreen");
    console.log("LOG OUT ->", error);
  }
};
