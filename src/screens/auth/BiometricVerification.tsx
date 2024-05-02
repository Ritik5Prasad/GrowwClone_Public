import React, { FC, useEffect, useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CustomText from "../../components/global/CustomText";
import { Image, StyleSheet, View } from "react-native";
import { FONTS } from "../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { resetAndNavigate } from "../../utils/NavigationUtil";
import CustomNumberPad from "../../components/inputs/CustomNumberPad";
import Logo from "../../assets/images/logo.png";
import TouchableText from "../../components/auth/TouchableText";
import RoundOTPInput from "../../components/inputs/RoundOTPInput";
import { loginWithBiometrics } from "../../utils/BiometricsUtils";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { Logout, VerifyPin } from "../../redux/actions/userAction";
import { selectUser } from "../../redux/reducers/userSlice";

const initialState = ["", "", "", ""];

interface BiometricProp {
  onForgotPin: () => void;
}

const BiometricVerification: FC<BiometricProp> = ({ onForgotPin }) => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const user = useAppSelector(selectUser);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handlePressNumber = (number: number | string) => {
    if (focusedIndex < otpValues.length) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex] = number.toString();
      setOtpError(null);
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex + 1);
    }
  };

  const handlePressBackspace = () => {
    if (focusedIndex > 0) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex - 1] = "";
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex - 1);
    }
  };
  const handleBiometricVerification = async () => {
    const { msg, result } = await dispatch(
      loginWithBiometrics(user.userId || "")
    );
    if (!result) {
      setOtpError(msg);
      return;
    }

    if (result) {
      setOtpValues(["B", "I", "O", "P"]);
      resetAndNavigate("BottomTab");
    }
  };

  const handlePressCheckmark = async () => {
    let valid = false;
    if (otpValues.join("") == "BIOP") {
      return;
    }
    otpValues.forEach((i) => {
      if (i === "") {
        valid = true;
        setOtpError("Enter PIN");
        setOtpValues(initialState);
        setFocusedIndex(0);
      }
    });
    if (!valid) {
      setLoading(true);
      const { result, msg } = await dispatch(
        VerifyPin({ login_pin: otpValues.join("") })
      );
      if (!result) {
        setOtpError(msg);
      } else {
        resetAndNavigate("BottomTab");
      }
      setOtpValues(initialState);
      setFocusedIndex(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    const allFilled = otpValues.every((value) => value !== "");
    if (allFilled) {
      handlePressCheckmark();
    }
  }, [otpValues]);

  useEffect(() => {
    handleBiometricVerification();
  }, []);
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <CustomText variant="h6" fontFamily={FONTS.Bold}>
          Enter Groww PIN
        </CustomText>
        <View style={styles.emailContainer}>
          <CustomText style={styles.subText}>{user?.email}</CustomText>
          <TouchableText
            firstText="Logout"
            style={styles.logoutText}
            onPress={() => dispatch(Logout())}
          />
        </View>
      </View>

      <RoundOTPInput
        onForgotPin={onForgotPin}
        loading={loading}
        otpValues={otpValues}
        error={otpError}
      />

      <CustomNumberPad
        customFont
        onPressBiometric={handleBiometricVerification}
        isBiometric={true}
        onPressNumber={handlePressNumber}
        onPressBackspace={handlePressBackspace}
        onPressCheckmark={handlePressCheckmark}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(25),
    marginBottom: RFValue(10),
  },
  logo: {
    height: RFValue(25),
    width: RFValue(25),
    alignSelf: "center",
    marginBottom: 8,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 15,
  },
  subText: {
    fontSize: RFValue(10),
  },
  logoutText: {
    fontFamily: FONTS.Regular,
    fontSize: RFValue(10),
  },
});

export default BiometricVerification;
