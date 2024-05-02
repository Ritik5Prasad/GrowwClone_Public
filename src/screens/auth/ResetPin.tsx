import React, { useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CustomText from "../../components/global/CustomText";
import { StyleSheet, View } from "react-native";
import { FONTS } from "../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import CustomNumberPad from "../../components/inputs/CustomNumberPad";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../constants/Colors";
import OTPInputCentered from "../../components/inputs/OTPInputCentered";
import ResetOTPVerification from "./ResetOTPVerification";
import DotLoading from "../../components/global/DotLoading";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { SendOTP } from "../../redux/actions/userAction";
import { selectUser } from "../../redux/reducers/userSlice";
const initialState = ["", "", "", ""];
const ResetPin = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const user = useAppSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpVerification, setOtpVerification] = useState<boolean>(false);
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

  const handlePressCheckmark = async () => {
    let valid = false;
    otpValues.forEach((i) => {
      if (i === "") {
        valid = true;
        setOtpError("Enter 4 Digit PIN");
        // setOtpError("Wrong PIN Limit Reached. Try after 30 minutes.");
        setOtpValues(initialState);
        setFocusedIndex(0);
      }
    });
    if (!valid) {
      setLoading(true);
      await dispatch(
        SendOTP({ email: user.email || "", otp_type: "reset_pin" })
      );
      setLoading(false);
      // setOtpValues(initialState);
      setFocusedIndex(0);
      setOtpVerification(true);
    }
  };

  if (otpVerification) {
    return <ResetOTPVerification pin={otpValues.join("")} />;
  }

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Icon color={Colors.profit} name="lock" size={RFValue(22)} />
        <CustomText
          variant="h6"
          fontFamily={FONTS.Bold}
          style={{ marginTop: 10 }}
        >
          Reset Groww PIN
        </CustomText>

        <CustomText style={styles.subText}>
          Set a new PIN to keep your investments safe & secure.
        </CustomText>
        {loading ? (
          <View style={styles.dotContainer}>
            <DotLoading />
          </View>
        ) : (
          <OTPInputCentered
            error={otpError}
            focusedIndex={focusedIndex}
            otpValues={otpValues}
          />
        )}
      </View>

      <CustomNumberPad
        customFont
        themeColor
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
    marginBottom: RFValue(10),
  },
  dotContainer: {
    marginTop: 50,
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
    marginTop: 15,
    opacity: 0.8,
  },
  logoutText: {
    fontFamily: FONTS.Regular,
    fontSize: RFValue(10),
  },
});

export default ResetPin;
