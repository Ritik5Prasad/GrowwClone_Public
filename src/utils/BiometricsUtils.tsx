import ReactNativeBiometrics from "react-native-biometrics";
import { appAxios } from "../redux/apiConfig";
import { token_storage } from "../redux/storage";

const rnBiometrics = new ReactNativeBiometrics();

export const checkBiometrics = async () => {
  try {
    const { biometryType } = await rnBiometrics.isSensorAvailable();
    return biometryType;
  } catch (error) {
    return null;
  }
};

export const generateBiometricPublicKey = async () => {
  try {
    const { keysExist } = await rnBiometrics.biometricKeysExist();
    if (keysExist) {
      throw new Error("Biometric Key exists.");
    }
    const { publicKey } = await rnBiometrics.createKeys();
    return publicKey;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteBiometricPublicKey = async () => {
  try {
    const { keysDeleted } = await rnBiometrics.deleteKeys();
    if (!keysDeleted) {
      throw new Error("Can not remove biometrics");
    }
    console.log(keysDeleted);
    // remove from backend
  } catch (error) {
    console.log(error);
  }
};

export const loginWithBiometrics =
  (userID: string) => async (dispatch: any) => {
    try {
      const isBiometricAvailable = await checkBiometrics();
      if (!isBiometricAvailable) {
        throw new Error("Biometric not available");
      }
      const { keysExist } = await rnBiometrics.biometricKeysExist();

      if (!keysExist) {
        const { publicKey } = await rnBiometrics.createKeys();
        const res = await appAxios.post("/auth/upload-biometric", {
          public_key: publicKey,
        });
      }

      const { success, signature } = await rnBiometrics.createSignature({
        promptMessage: "Sign in",
        payload: userID,
      });

      if (!success) {
        throw new Error("Biometrics authentication failed!");
      }
      const res = await appAxios.post("/auth/verify-biometric", {
        signature: signature,
      });
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
      return { msg: error?.response?.data?.msg, result: false };
    }
  };

export default {
  checkBiometrics,
  generateBiometricPublicKey,
  deleteBiometricPublicKey,
  loginWithBiometrics,
};
