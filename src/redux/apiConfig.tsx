import axios from "axios";
import { BASE_URL, REFRESH_TOKEN } from "./API";
import { token_storage } from "./storage";
import Toast from "react-native-toast-message";
import { resetAndNavigate } from "../utils/NavigationUtil";

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

export const socketAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async (config) => {
  const app_access_token = token_storage.getString("app_access_token");
  if (app_access_token) {
    config.headers.Authorization = `Bearer ${app_access_token}`;
  }
  return config;
});

socketAxios.interceptors.request.use(async (config) => {
  const socket_access_token = token_storage.getString("socket_access_token");
  if (socket_access_token) {
    config.headers.Authorization = `Bearer ${socket_access_token}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_tokens("app");
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log("Error Refreshing token");
      }
    }

    if (error.response && error.response.status != 401) {
      const errorMessage = error.response.data.msg || "Something went wrong";
      Toast.show({
        type: "normalToast",
        props: { msg: errorMessage },
      });
    }
    return Promise.reject(error);
  }
);

socketAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_tokens("socket");
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log("Error Refreshing token");
      }
    }

    if (error.response && error.response.status !== 401) {
      const errorMessage = error.response.data.msg || "Something went wrong";
      Toast.show({
        type: "normalToast",
        props: { msg: errorMessage },
      });
    }

    return Promise.reject(error);
  }
);

export const refresh_tokens = async (type: string, stop?: boolean) => {
  try {
    const refresh_token = token_storage.getString(`${type}_refresh_token`);
    const response = await axios.post(REFRESH_TOKEN, {
      type,
      refresh_token,
    });
    const new_access_token = response.data.access_token;
    const new_refresh_token = response.data.refresh_token;
    token_storage.set(`${type}_access_token`, new_access_token);
    token_storage.set(`${type}_refresh_token`, new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log("REFRESH TOKEN EXPIRED!!");
    Toast.show({
      type: "warningToast",
      props: {
        msg: "Due to technical issue your session expired, login again",
      },
    });
    token_storage.clearAll();

    if (stop) {
      resetAndNavigate(
        type == "app" ? "LoginScreen" : "AuthVerificationScreen"
      );
    }
  }
};
