import React, { useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CustomText from "../../components/global/CustomText";
import { StyleSheet } from "react-native";
import { FONTS } from "../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import CustomNumberPad from "../../components/inputs/CustomNumberPad";
import OTPInput from "../../components/inputs/OTPInput";
import BackButton from "../../components/global/BackButton";
import { useAppDispatch } from "../../redux/reduxHook";
import { SetLoginPin } from "../../redux/actions/userAction";

const ConfirmPinScreen = ({ route }: any) => {
  const dispatch = useAppDispatch();
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [otpError, setOtpError] = useState<string | null>(null);
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
    const isNotEmpty = otpValues.map((i) => {
      if (i == "") {
        valid = true;
        setOtpError("Enter all PIN");
      }
    });

    if (otpValues.toString() != route.params.pin) {
      valid = true;
      setOtpValues(["", "", "", ""]);
      setFocusedIndex(0);
      setOtpError("PIN not matching");
    }

    if (!valid) {
      await dispatch(SetLoginPin({ login_pin: otpValues.join("") }));
    }
  };

  return (
    <CustomSafeAreaView>
      <BackButton />
      <CustomText
        variant="h5"
        fontFamily={FONTS.Medium}
        style={styles.mainContainer}
      >
        Confirm your Groww PIN
      </CustomText>
      <CustomText style={styles.subText}>
        Re-enter your Groww PIN for confimation.
      </CustomText>
      <OTPInput
        otpValues={otpValues}
        error={otpError}
        focusedIndex={focusedIndex}
      />

      <CustomNumberPad
        onPressNumber={handlePressNumber}
        onPressBackspace={handlePressBackspace}
        onPressCheckmark={handlePressCheckmark}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  subText: {
    opacity: 0.8,
    fontSize: RFValue(9.5),
  },
});

export default ConfirmPinScreen;
